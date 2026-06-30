/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import express from "express";
import path from "path";
import fs from "fs";
import dotenv from "dotenv";
import { generateAllDatasets } from "./server/generator";

dotenv.config();

// Pristine classical database setup - no generation step needed to prevent fuzzy files


const app = express();
const PORT = 3000;

app.use(express.json());

// Helper to load only our pre-compiled hand-crafted dictionary dataset in pristine format
function loadAllOfflineDatasets(): any[] {
  const assetsDir = path.join(process.cwd(), "assets");
  let localDbPath = path.join(assetsDir, "data lafadz_db.json");
  if (!fs.existsSync(localDbPath)) {
    localDbPath = path.join(process.cwd(), "src", "utils", "data lafadz_db.json");
  }
  
  let list: any[] = [];
  
  if (fs.existsSync(localDbPath)) {
    try {
      const fileContent = fs.readFileSync(localDbPath, "utf-8");
      const parsed = JSON.parse(fileContent);
      list = parsed.map((item: any, idx: number) => {
        return {
          id: item.id || `db-${item.fa}${item.ain}${item.lam}-${idx}`,
          fa: item.fa,
          ain: item.ain,
          lam: item.lam,
          babNum: Number(item.babNum) || 1,
          translation: item.translation,
          rootWordArabic: `${item.fa}َ${item.ain}َ${item.lam}َ`,
          explanation: item.explanation || item.notes || `Fi'il Mujarrad Bina' ${item.bina || "Shohih"}.`,
          bina: item.bina || "Shohih",
          asal: item.asal || `${item.fa}َ${item.ain}َ${item.lam}َ`,
          masdarSamai: item.masdarSamai || "",
          masdarQiyasi: item.masdarQiyasi || "",
          sifatMusyabihat: item.sifatMusyabihat || "",
          sifatMusyabihatPlural: item.sifatMusyabihatPlural || null,
          isimFailPlural: item.isimFailPlural || null,
          isimMafulPlural: item.isimMafulPlural || null,
          isimZamanMakanPlural: item.isimZamanMakanPlural || null,
          isimAlatPlural: item.isimAlatPlural || null,
          reference: item.reference || "Lisanul 'Arab",
          notes: item.explanation || item.notes || ""
        };
      });
    } catch (e: any) {
      console.error("Gagal membaca database lafadz_db.json:", e);
    }
  }
  return list;
}

// REST GET endpoint for data lafadz db
app.get("/api/lafadz-db", (req, res) => {
  const list = loadAllOfflineDatasets();
  if (list.length > 0) {
    return res.json({ success: true, data: list });
  }
  return res.status(404).json({ success: false, error: "Database lafadz tidak ditemukan." });
});

// REST POST endpoint to generate Midtrans SNAP payment token
app.post("/api/midtrans/token", async (req, res) => {
  try {
    const { gross_amount, item_name, email, plan_id } = req.body;
    if (!gross_amount) {
      return res.status(400).json({ success: false, error: "Jumlah pembayaran (gross_amount) diperlukan" });
    }

    const orderId = `SDR-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
    const serverKey = process.env.MIDTRANS_SERVER_KEY || "";

    const requestBody = {
      transaction_details: {
        order_id: orderId,
        gross_amount: Number(gross_amount)
      },
      item_details: [
        {
          id: plan_id || "premium_plan",
          price: Number(gross_amount),
          quantity: 1,
          name: item_name || "Shorof Digital Pro Premium Upgrade"
        }
      ],
      customer_details: {
        first_name: "Pengguna",
        last_name: "Shorof Pro",
        email: email || "user@example.com"
      },
      credit_card: {
        secure: true
      }
    };

    if (!serverKey) {
      console.warn("MIDTRANS_SERVER_KEY tidak ditemukan di .env. Menggunakan mode Simulasi Pembayaran.");
      return res.json({
        success: true,
        token: `MOCK_TOKEN_${orderId}`,
        orderId: orderId,
        redirect_url: "#",
        isSimulated: true
      });
    }

    // Determine production vs sandbox dynamically
    const midtransUrl = serverKey.startsWith("Mid-")
      ? "https://app.midtrans.com/snap/v1/transactions"
      : "https://app.sandbox.midtrans.com/snap/v1/transactions";

    const authHeader = "Basic " + Buffer.from(serverKey + ":").toString("base64");

    const midtransResponse = await fetch(midtransUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Authorization": authHeader
      },
      body: JSON.stringify(requestBody)
    });

    const responseData = await midtransResponse.json() as any;
    if (responseData && responseData.token) {
      return res.json({
        success: true,
        token: responseData.token,
        orderId: orderId,
        redirect_url: responseData.redirect_url,
        isSimulated: false
      });
    } else {
      console.error("Gagal mendapatkan kunci token Midtrans:", responseData);
      return res.status(400).json({
        success: false,
        error: responseData.error_messages ? responseData.error_messages.join(", ") : "Gagal menginisiasi transaksi di Midtrans."
      });
    }
  } catch (error: any) {
    console.error("Error in Midtrans Charge Endpoint:", error);
    res.status(500).json({ success: false, error: error.message || "Gagal menghubungi server pembayaran Midtrans." });
  }
});

// Server-side Gemini API explanation route
app.get("/api/gemini/explain", async (req, res) => {
  res.json({ success: false, explanation: "Sistem analisis AI dinonaktifkan sepenuhnya atas permintaan pengguna." });
});

// Server-side Gemini API root generator from Indonesian or Arabic query
app.get("/api/gemini/generate-root", async (req, res) => {
  try {
    const { query } = req.query;
    if (!query || typeof query !== "string") {
      return res.status(400).json({ success: false, error: "Missing query parameter" });
    }

    const trimmedQuery = query.trim();

    // Helper functions for matching
    const stripArabicHarakah = (text: string): string => {
      if (!text) return "";
      return text
        .replace(/[\u064B-\u0652\u0670]/g, "") // strip harakah
        .replace(/[أإآ]/g, "ا")             // normalize Hamzah on Alif
        .replace(/ى/g, "ي")                  // normalize Alif Maqshurah to Ya
        .trim();
    };

    const lowercaseQuery = trimmedQuery.toLowerCase();
    const normalizedQuery = stripArabicHarakah(lowercaseQuery);

    // ============================================
    // JALUR 1: DATA LAFADZ DB (Integrated Local Datasets)
    // ============================================
    const localDbEntries = loadAllOfflineDatasets();

    let dbMatches = localDbEntries.filter(entry => {
      // a. Match by translation
      if (entry.translation && entry.translation.toLowerCase().includes(lowercaseQuery)) {
        return true;
      }
      // b. Match by rootWordArabic
      if (entry.rootWordArabic) {
        const normRootWord = stripArabicHarakah(entry.rootWordArabic);
        if (normRootWord.includes(normalizedQuery) || normalizedQuery.includes(normRootWord)) {
          return true;
        }
      }
      // c. Match by individual characters combined
      const rawRoot = `${entry.fa}${entry.ain}${entry.lam}`;
      const normRawRoot = stripArabicHarakah(rawRoot);
      if (normRawRoot.includes(normalizedQuery) || normalizedQuery.includes(normRawRoot)) {
        return true;
      }
      const spacedRoot = `${entry.fa} ${entry.ain} ${entry.lam}`;
      const normSpacedRoot = stripArabicHarakah(spacedRoot);
      if (normSpacedRoot.includes(normalizedQuery) || normalizedQuery.includes(normSpacedRoot)) {
        return true;
      }
      if (entry.asal) {
        const normAsal = stripArabicHarakah(entry.asal);
        if (normAsal.includes(normalizedQuery) || normalizedQuery.includes(normAsal)) {
          return true;
        }
      }
      return false;
    });

    if (dbMatches.length > 0) {
      // Return found database entries with clean markup indicating local database source
      const finalResults = dbMatches.map(m => ({
        ...m,
        explanation: `${m.explanation || ""} (Sumber: Database Offline Utama)`
      }));
      return res.json({ success: true, results: finalResults, source: "database" });
    }

    // ============================================
    // JALUR 2: RUMUS CODING I'LAL ENGINE
    // ============================================
    const isArabic = /[\u0600-\u06FF]/.test(trimmedQuery);
    if (isArabic) {
      // Remove any non-Arabic letters e.g. punctuation, whitespaces
      let arabicLetters = normalizedQuery.replace(/[^\u0621-\u064A]/g, "");

      // Strip common prefixes/suffixes for 4 or 5-letter words to extract the likely trilateral root
      if (arabicLetters.length === 4) {
        const firstLetter = arabicLetters[0];
        // Strip prefixes: Ta (ت), Ya (ي), Nun (ن), Mim (م), Alif/Hamzah (ا)
        if (["ي", "ت", "ن", "م", "ا", "أ"].includes(firstLetter)) {
          arabicLetters = arabicLetters.slice(1);
        }
      }

      if (arabicLetters.length === 3) {
        const fa = arabicLetters[0];
        const ain = arabicLetters[1];
        const lam = arabicLetters[2];

        interface RootCandidate {
          fa: string;
          ain: string;
          lam: string;
          babNum: number;
          translation: string;
          rootWordArabic: string;
          explanation: string;
        }

        const candidates: RootCandidate[] = [];

        if (ain === "ا") {
          // Ajwaf detection: can be original Waw or Ya
          candidates.push({
            fa,
            ain: "و",
            lam,
            babNum: 1,
            rootWordArabic: `${fa}َوَ${lam}َ`,
            translation: `Akar Kata: ${fa}-${ain}-${lam} (Ajwaf Wawi)`,
            explanation: `Hasil analisis algoritma morfologi i'lalEngine untuk lafadz "${trimmedQuery}". Berdasarkan kaidah sharaf, huruf Alif (ا) di tengah dihitung sebagai bentuk I'lal (perubahan) dari radikal huruf Waw.`
          });
          candidates.push({
            fa,
            ain: "ي",
            lam,
            babNum: 2,
            rootWordArabic: `${fa}Target: ${fa}َيَ${lam}َ`,
            translation: `Akar Kata: ${fa}-${ain}-${lam} (Ajwaf Ya'i)`,
            explanation: `Hasil analisis algoritma morfologi i'lalEngine untuk lafadz "${trimmedQuery}". Berdasarkan kaidah sharaf, huruf Alif (ا) di tengah dihitung sebagai bentuk I'lal (perubahan) dari radikal huruf Ya.`
          } as any);
        } else if (lam === "ا" || lam === "ى" || lam === "ي") {
          // Naqis detection: can be original Waw or Ya
          candidates.push({
            fa,
            ain,
            lam: "و",
            babNum: 1,
            rootWordArabic: `${fa}َ${ain}َوَ`,
            translation: `Akar Kata: ${fa}-${ain}-${lam} (Naqis Wawi)`,
            explanation: `Hasil analisis algoritma morfologi i'lalEngine untuk lafadz "${trimmedQuery}". Huruf lemah di akhir kata dideteksi sebagai Naqis Wawi.`
          });
          candidates.push({
            fa,
            ain,
            lam: "ي",
            babNum: 2,
            rootWordArabic: `${fa}َ${ain}َيَ`,
            translation: `Akar Kata: ${fa}-${ain}-${lam} (Naqis Ya'i)`,
            explanation: `Hasil analisis algoritma morfologi i'lalEngine untuk lafadz "${trimmedQuery}". Huruf lemah di akhir kata dideteksi sebagai Naqis Ya'i.`
          });
        } else {
          // Regular Shohih
          candidates.push({
            fa,
            ain,
            lam,
            babNum: 1,
            rootWordArabic: `${fa}َ${ain}َ${lam}َ`,
            translation: `Akar Kata: ${fa}-${ain}-${lam} (Ekstraksi)`,
            explanation: `Hasil analisis algoritma morfologi i'lalEngine untuk lafadz "${trimmedQuery}". Metode coding penelusuran mandiri mendeteksi akar kata tsulatsi mujarrad normal.`
          });
        }

        if (candidates.length > 0) {
          // Clean candidates and fix fields
          const cleanCandidates = candidates.map(c => {
            if (c.rootWordArabic.startsWith(`${fa}Target`)) {
              return {
                ...c,
                rootWordArabic: `${fa}َيَ${lam}َ`
              };
            }
            return c;
          });
          return res.json({ success: true, results: cleanCandidates, source: "iilalEngine" });
        }
      } else if (arabicLetters.length === 2) {
        // Mudho'af geminated
        const fa = arabicLetters[0];
        const ain = arabicLetters[1];
        const lam = ain; // duplicated

        const candidate = {
          fa,
          ain,
          lam,
          babNum: 2,
          rootWordArabic: `${fa}َ${ain}َ${lam}َ`,
          translation: `Akar Kata: ${fa}-${ain}-${lam} (Mudho'af)`,
          explanation: `Hasil analisis algoritma morfologi i'lalEngine untuk lafadz "${trimmedQuery}". Pola geminasi dideteksi: huruf kedua '${ain}' digandakan untuk menyusun 3 radikal penuh.`
        };
        return res.json({ success: true, results: [candidate], source: "iilalEngine" });
      }
    }

    // ============================================
    // JALUR 3: PENELUSURAN AI (GEMINI) - DINONAKTIFKAN
    // ============================================
    return res.json({
      success: false,
      error: "Pencarian offline tidak menemukan akar kata yang cocok."
    });
  } catch (error: any) {
    console.error("Gagal melakukan pencarian:", error);
    res.json({
      success: false,
      error: `Gagal memproses pencarian: ${error.message || error}`
    });
  }
});

// Vite middleware for development or serving assets in production
async function startServer() {
  const distPath = path.join(process.cwd(), 'dist');
  const hasBuild = fs.existsSync(path.join(distPath, 'index.html'));

  if (process.env.NODE_ENV !== "production" || !hasBuild) {
    const { createServer: createViteServer } = await import("vite");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server launched on port ${PORT}`);
  });
}

startServer();
