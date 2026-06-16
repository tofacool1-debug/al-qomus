import express from "express";
import path from "path";
import fs from "fs";
import { createServer as createViteServer } from "vite";
import { Transaction, NotificationLog, SyncConfig } from "./src/types";

// Setup default keys from ENV Vercel
const DEFAULT_CONFIG: SyncConfig = {
  midtransMerchantId: process.env.MIDTRANS_MERCHANT_ID || "",
  midtransClientKey: process.env.MIDTRANS_CLIENT_KEY || "",
  midtransServerKey: process.env.MIDTRANS_SERVER_KEY || "",
  oneSignalAppId: process.env.ONESIGNAL_APP_ID || "",
  oneSignalRestKey: process.env.ONESIGNAL_REST_KEY || ""
};

const DB_FILE = path.join(process.cwd(), "src", "database.json");

// Helper class to safely handle persistent data
class Database {
  private data: {
    config: SyncConfig;
    transactions: Transaction[];
    logs: NotificationLog[];
  };

  constructor() {
    this.data = {
      config: { ...DEFAULT_CONFIG },
      transactions: [],
      logs: []
    };
    this.load();
    if (this.data.transactions.length === 0) {
      this.initSeedData();
    }
  }

  private load() {
    try {
      if (fs.existsSync(DB_FILE)) {
        const raw = fs.readFileSync(DB_FILE, "utf-8");
        this.data = JSON.parse(raw);
        if (!this.data.config) {
          this.data.config = { ...DEFAULT_CONFIG };
        }
      }
    } catch (e) {
      console.error("Gagal membaca database.json:", e);
    }
  }

  public save() {
    try {
      const parentDir = path.dirname(DB_FILE);
      if (!fs.existsSync(parentDir)) {
        fs.mkdirSync(parentDir, { recursive: true });
      }
      fs.writeFileSync(DB_FILE, JSON.stringify(this.data, null, 2), "utf-8");
    } catch (e) {
      console.error("Gagal menyimpan database.json:", e);
    }
  }

  private initSeedData() {
    this.data.transactions = [
      {
        id: "TX-1001",
        amount: 150000,
        customerName: "Budi Santoso",
        customerEmail: "budi@email.com",
        itemDetails: "Paket Premium Course Web Dev",
        status: "settlement",
        paymentType: "gopay",
        createdAt: new Date(Date.now() - 3 * 3600000).toISOString(),
        updatedAt: new Date(Date.now() - 3 * 3600000).toISOString(),
        midtransTransactionId: "mt-9fa157ec-8172-4b2a-8cde-88981df12da3"
      },
      {
        id: "TX-1002",
        amount: 75000,
        customerName: "Siti Rahma",
        customerEmail: "siti@email.com",
        itemDetails: "Sewa Domain .id 1 Tahun",
        status: "pending",
        paymentType: "bank_transfer",
        createdAt: new Date(Date.now() - 1 * 3600000).toISOString(),
        updatedAt: new Date(Date.now() - 1 * 3600000).toISOString()
      },
      {
        id: "TX-1003",
        amount: 320000,
        customerName: "Aditya Wijaya",
        customerEmail: "aditya@email.com",
        itemDetails: "Template Admin Dashboard Tailwind",
        status: "expire",
        paymentType: "credit_card",
        createdAt: new Date(Date.now() - 24 * 3600000).toISOString(),
        updatedAt: new Date(Date.now() - 23 * 3600000).toISOString()
      }
    ];

    this.data.logs = [
      {
        id: "LOG-5001",
        transactionId: "TX-1001",
        status: "sent",
        title: "Pembayaran Sukses! 🎉",
        message: "Transaksi TX-1001 sebesar Rp 150.000 atas nama Budi Santoso berhasil diselesaikan.",
        payload: JSON.stringify({ status: "success", app_id: this.data.config.oneSignalAppId }),
        createdAt: new Date(Date.now() - 3 * 3600000 + 30000).toISOString()
      }
    ];
    this.save();
  }

  public getConfig(): SyncConfig {
    return this.data.config;
  }

  public setConfig(newConfig: SyncConfig) {
    this.data.config = { ...newConfig };
    this.save();
  }

  public getTransactions(): Transaction[] {
    return this.data.transactions;
  }

  public getTransactionById(id: string): Transaction | undefined {
    return this.data.transactions.find(t => t.id === id);
  }

  public addTransaction(tx: Transaction) {
    this.data.transactions.unshift(tx);
    this.save();
  }

  public updateTransactionStatus(id: string, status: Transaction["status"], paymentType?: string, midtransTxId?: string) {
    const tx = this.getTransactionById(id);
    if (tx) {
      tx.status = status;
      if (paymentType) tx.paymentType = paymentType;
      if (midtransTxId) tx.midtransTransactionId = midtransTxId;
      tx.updatedAt = new Date().toISOString();
      this.save();
      return tx;
    }
    return null;
  }

  public getLogs(): NotificationLog[] {
    return this.data.logs;
  }

  public addLog(log: NotificationLog) {
    this.data.logs.unshift(log);
    this.save();
  }
}

const db = new Database();

async function startServer() {
  // CEK KEY WAJIB - biar ga jalan setengah2
  if (!process.env.MIDTRANS_SERVER_KEY || !process.env.ONESIGNAL_REST_KEY) {
    console.error("ERROR: Key Midtrans/OneSignal belum diset di ENV Vercel!")
    process.exit(1)
  }
  
  console.log("✅ Key aman, server jalan...")

  const app = express();
  const PORT = process.env.PORT || 3000; // Port dinamis buat Vercel

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  const triggerOneSignalPush = async (title: string, message: string, transactionId: string): Promise<NotificationLog> => {
    const config = db.getConfig();
    const headers = {
      "Content-Type": "application/json; charset=utf-8",
      "Authorization": `Basic ${config.oneSignalRestKey}`
    };

    const body = {
      app_id: config.oneSignalAppId,
      included_segments: ["Subscribed Users", "Total Subscribed Users"],
      headings: { id: title, en: title },
      contents: { id: message, en: message },
      data: { transactionId }
    };

    let logStatus: 'sent' | 'failed' = 'failed';
    let rawResult = "";

    try {
      const response = await fetch("https://onesignal.com/api/v1/notifications", {
        method: "POST",
        headers,
        body: JSON.stringify(body)
      });
      const data = await response.json();
      rawResult = JSON.stringify(data);
      if (response.ok) {
        logStatus = 'sent';
      }
    } catch (error: any) {
      rawResult = JSON.stringify({ error: error.message || error });
      logStatus = 'failed';
    }

    const newLog: NotificationLog = {
      id: `LOG-${Math.floor(1000 + Math.random() * 9000)}`,
      transactionId,
      status: logStatus,
      title,
      message,
      payload: rawResult,
      createdAt: new Date().toISOString()
    };

    db.addLog(newLog);
    return newLog;
  };

  app.get("/api/config", (req, res) => {
    const config = db.getConfig();
    res.json({
      midtransMerchantId: config.midtransMerchantId,
      midtransClientKey: config.midtransClientKey,
      midtransServerKeyMasked: config.midtransServerKey ? `${config.midtransServerKey.substring(0, 11)}...${config.midtransServerKey.substring(config.midtransServerKey.length - 4)}` : "",
      oneSignalAppId: config.oneSignalAppId,
      oneSignalRestKeyMasked: config.oneSignalRestKey ? `${config.oneSignalRestKey.substring(0, 10)}...${config.oneSignalRestKey.substring(config.oneSignalRestKey.length - 4)}` : "",
      fullConfigForEditing: config
    });
  });

  app.post("/api/config", (req, res) => {
    const { midtransMerchantId, midtransClientKey, midtransServerKey, oneSignalAppId, oneSignalRestKey } = req.body;
    
    if (!midtransMerchantId || !midtransClientKey || !midtransServerKey || !oneSignalAppId || !oneSignalRestKey) {
      return res.status(400).json({ error: "Semua isian konfigurasi harus diisi lengkap." });
    }

    db.setConfig({
      midtransMerchantId,
      midtransClientKey,
      midtransServerKey,
      oneSignalAppId,
      oneSignalRestKey
    });

    res.json({ success: true, message: "Konfigurasi ter-update dengan sukses!" });
  });

  app.get("/api/transactions", (req, res) => {
    res.json(db.getTransactions());
  });

  app.post("/api/transactions", async (req, res) => {
    const { amount, customerName, customerEmail, itemDetails } = req.body;

    if (!amount || !customerName || !customerEmail || !itemDetails) {
      return res.status(400).json({ error: "Isian tidak boleh kosong." });
    }

    const orderId = `TX-${Math.floor(1000 + Math.random() * 9000)}`;
    const config = db.getConfig();

    const newTx: Transaction = {
      id: orderId,
      amount: Number(amount),
      customerName,
      customerEmail,
      itemDetails,
      status: "pending",
      paymentType: "belum_dipilih",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    db.addTransaction(newTx);

    let snapToken = "";
    let snapUrl = "";
    let errorLog = "";

    try {
      const authBase64 = Buffer.from(`${config.midtransServerKey}:`).toString("base64");
      const midtransResponse = await fetch("https://app.sandbox.midtrans.com/snap/v1/transactions", {
        method: "POST",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
          "Authorization": `Basic ${authBase64}`
        },
        body: JSON.stringify({
          transaction_details: {
            order_id: orderId,
            gross_amount: Number(amount)
          },
          customer_details: {
            first_name: customerName,
            email: customerEmail
          },
          item_details: [{
            id: "ITEM-1",
            price: Number(amount),
            quantity: 1,
            name: itemDetails
          }]
        })
      });

      const data = await midtransResponse.json();
      if (midtransResponse.ok && data.token) {
        snapToken = data.token;
        snapUrl = data.redirect_url;
      } else {
        errorLog = JSON.stringify(data);
      }
    } catch (e: any) {
      errorLog = e.message || "Network Error";
    }

    const title = `Transaksi Baru Terbuat: ${orderId} 💸`;
    const message = `Yth. ${customerName}, tagihan sebesar Rp ${(Number(amount)).toLocaleString("id-ID")} untuk '${itemDetails}' sedang menunggu pembayaran.`;
    await triggerOneSignalPush(title, message, orderId);

    res.json({
      success: true,
      transaction: newTx,
      snapToken,
      snapUrl,
      errorLog
    });
  });

  app.post("/api/send-notification", async (req, res) => {
    const { title, message, txId } = req.body;
    if (!title || !message) {
      return res.status(400).json({ error: "Judul dan pesan push notifikasi harus diisi." });
    }

    const log = await triggerOneSignalPush(title, message, txId || "MANUAL");
    res.json({ success: true, log });
  });

  app.post("/api/simulate-status", async (req, res) => {
    const { id, status, paymentType } = req.body;
    
    if (!id || !status) {
      return res.status(400).json({ error: "ID dan status dibutuhkan." });
    }

    const tx = db.updateTransactionStatus(id, status, paymentType || "gopay", "simulated-id-" + Math.floor(Math.random() * 10000));
    if (!tx) {
      return res.status(404).json({ error: "Transaksi tidak ditemukan." });
    }

    let title = "";
    let message = "";

    switch (status) {
      case "settlement":
      case "success":
        title = `Pembayaran Berhasil! 🎉 [${id}]`;
        message = `Terima kasih! Pembayaran sebesar Rp ${tx.amount.toLocaleString("id-ID")} untuk order '${tx.itemDetails}' telah diterima.`;
        break;
      case "expire":
        title = `Transaksi Kedaluwarsa! ⌛ [${id}]`;
        message = `Batas waktu pembayaran untuk order '${tx.itemDetails}' sebesar Rp ${tx.amount.toLocaleString("id-ID")} telah habis.`;
        break;
      case "cancel":
        title = `Transaksi Dibatalkan! ❌ [${id}]`;
        message = `Transaksi order '${tx.itemDetails}' telah berhasil dibatalkan oleh pembeli.`;
        break;
      case "deny":
        title = `Pembayaran Ditolak! ⚠️ [${id}]`;
        message = `Pembayaran untuk order '${tx.itemDetails}' ditolak oleh sistem payment gateway.`;
        break;
      default:
        title = `Status Transaksi Diperbarui: ${id}`;
        message = `Status transaksi untuk order '${tx.itemDetails}' kini adalah ${status}.`;
    }

    const log = await triggerOneSignalPush(title, message, id);

    res.json({ success: true, transaction: tx, log });
  });

  app.post("/api/midtrans-webhook", async (req, res) => {
    const webhookData = req.body;
    console.log("Menerima webhook dari Midtrans:", webhookData);

    const orderId = webhookData.order_id;
    const transactionStatus = webhookData.transaction_status;
    const paymentType = webhookData.payment_type;
    const fraudStatus = webhookData.fraud_status;
    const transactionId = webhookData.transaction_id;

    if (!orderId) {
      return res.status(400).json({ error: "order_id tidak ditemukan dalam data webhook" });
    }

    let localStatus: Transaction["status"] = "pending";

    if (transactionStatus === "capture") {
      if (fraudStatus === "challenge") {
        localStatus = "pending";
      } else if (fraudStatus === "accept") {
        localStatus = "settlement";
      }
    } else if (transactionStatus === "settlement") {
      localStatus = "settlement";
    } else if (transactionStatus === "cancel" || transactionStatus === "deny") {
      localStatus = "cancel";
    } else if (transactionStatus === "expire") {
      localStatus = "expire";
    } else if (transactionStatus === "pending") {
      localStatus = "pending";
    }

    const tx = db.updateTransactionStatus(orderId, localStatus, paymentType, transactionId);

    if (tx) {
      let title = "";
      let message = "";

      if (localStatus === "settlement") {
        title = `Pembayaran Sukses! 🎉 [${orderId}]`;
        message = `Pembayaran Rp ${tx.amount.toLocaleString("id-ID")} untuk '${tx.itemDetails}' diterima via ${paymentType || "Midtrans"}.`;
      } else if (localStatus === "expire") {
        title = `Transaksi Kedaluwarsa ⌛ [${orderId}]`;
        message = `Transaksi order '${tx.itemDetails}' telah kedaluwarsa.`;
      } else if (localStatus === "cancel") {
        title = `Transaksi Dibatalkan ❌ [${orderId}]`;
        message = `Transaksi order '${tx.itemDetails}' dibatalkan.`;
      } else {
        title = `Sinkronisasi Midtrans: ${orderId}`;
        message = `Status pembayaran terbaru: ${transactionStatus}.`;
      }

      await triggerOneSignalPush(title, message, orderId);
    } else {
      await triggerOneSignalPush(
        `Webhook Luar: ${orderId}`,
        `Status Midtrans: ${transactionStatus} (${paymentType || "Lainnya"}).`,
        orderId
      );
    }

    res.json({ success: true, message: "Webhook processed and synced with OneSignal!" });
  });

  app.get("/api/notification-logs", (req, res) => {
    res.json(db.getLogs());
  });

  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa"
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
