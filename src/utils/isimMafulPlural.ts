/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { DictionaryEntry, PluralIsimMaful } from "../types";

/**
 * Normalizes the bina type to match the standard wazan schema.
 */
function getPluralBinaKey(bina: string): string {
  const norm = (bina || "").toLowerCase().trim();
  if (norm.includes("shohih") || norm === "sahih") return "sahih";
  if (norm.includes("ajwaf")) return "ajwaf";
  if (norm.includes("mitsal")) return "mitsal";
  if (norm === "naqis" || norm.includes("naqish")) return "naqish";
  if (norm.includes("muda") || norm.includes("mudho") || norm.includes("ganda")) return "mudaaf";
  if (norm.includes("mahmuz")) return "mahmuz";
  if (norm === "lafif maqrun") return "lafif_maqrun";
  if (norm === "lafif mafruq") return "lafif_mafruq";
  if (norm.includes("lafif")) return "lafif_maqrun"; // fallback
  return "sahih";
}

/**
 * Smartly replaces pattern weights (F-A-L) with root letters, applying morphological and I'lal rules.
 */
function replaceRootForIsimMaful(pattern: string, fa: string, ain: string, lam: string, binaKey: string): string {
  const cleanFa = fa.replace(/[\u064b-\u065f]/g, "");
  const cleanAin = ain.replace(/[\u064b-\u065f]/g, "");
  const cleanLam = lam.replace(/[\u064b-\u065f]/g, "");

  let result = pattern;

  // Naqis & Lafif special morphing for مَفَاعٍ:
  if ((binaKey === "naqish" || binaKey.startsWith("lafif")) && pattern === "مَفَاعٍ") {
    result = `مَ${cleanFa}َا${cleanAin}ٍ`; // e.g. مَرَامٍ / مَطَاوٍ / مَوَاقٍ
  }
  else {
    result = pattern
      .replace(/ف/g, "__FA__")
      .replace(/ع/g, "__AIN__")
      .replace(/ل/g, "__LAM__")
      .replace(/__FA__/g, cleanFa)
      .replace(/__AIN__/g, cleanAin)
      .replace(/__LAM__/g, cleanLam);
  }

  // Specific spellings corrections:
  result = result
    .replace(/مَوَاوِيّ/g, "مَوَافِيُّ")
    .replace(/مَوَاوِيي/g, "مَوَافِيُّ")
    .replace(/مَوَاوِي/g, "مَوَافِيُّ")
    .replace(/مَحَاييي/g, "مَحَائِيُّ")
    .replace(/مَحَايِيُّ/g, "مَحَائِيُّ")
    .replace(/مَحَايِي/g, "مَحَائِيُّ");

  // Universal spelling cleanup for Hamzahs:
  // 1. Bila hamzah kasroh di tengah kata menjadi (ئ) contoh مسائل
  result = result.replace(/([\u0621-\u064a])[أإء]ِ/g, "$1ئِ");

  // 2. Bila di depan hamzah ada alif/hamzah sukun maka menjadi (آ) contoh آكل
  result = result
    .replace(/أَأْ/g, "آ")
    .replace(/أَاْ/g, "آ")
    .replace(/أَأَ/g, "آ")
    .replace(/أَاَ/g, "آ")
    .replace(/أَأ/g, "آ")
    .replace(/أَا/g, "آ")
    .replace(/أأْ/g, "آ")
    .replace(/أاْ/g, "آ")
    .replace(/أأ/g, "آ")
    .replace(/أا/g, "آ");

  // 3. Bila sebelumnya dhommah maka diganti (ؤ) contoh سؤال
  result = result.replace(/ُ[أإء]/g, "ُؤ");

  // Universal I'lal / corrections for Ajwaf, Naqis, and Lafif:
  if (binaKey === "ajwaf") {
    result = result.replace(/اوِ/g, "ائِ").replace(/ايِ/g, "ائِ");
  }
  if (binaKey === "naqish" || binaKey.startsWith("lafif")) {
    result = result.replace(/ِيْ?[يio]ٌ?$/g, "ِيُّ").replace(/ِيْ?[ييو]ٌ?$/g, "ِيُّ");
  }

  // Final hamzah with dhommah/tanwin dhommah spelling rule (kept as isolated hamzah ء)
  result = result.replace(/[أإؤئء]([ٌُ])(?=$|\s|[\s,;،.?\/()\]}]|@)/g, "ء$1");

  return result;
}

/**
 * Formats patterns with instantiated roots.
 */
function formatPluralList(patterns: string[], fa: string, ain: string, lam: string, binaKey: string): string {
  if (!patterns || patterns.length === 0) return "—";
  return patterns.map(p => {
    const word = replaceRootForIsimMaful(p, fa, ain, lam, binaKey);
    return word;
  }).join(" / ");
}

/**
 * Highly compliant Jamak Taksir engine for Isim Maful (7 Bina x 5 Shigot).
 */
export function analyzeIsimMafulPlural(entry: DictionaryEntry): PluralIsimMaful {
  if (entry.babNum === 5) {
    return {
      qillah: "—",
      katsroh: "—",
      muntahal: "—",
      reference: "Kamus Lisanul 'Arab, Kitab Sharaf Al-Kafi, Al-Shorof Al-Wadhih (v1.2)",
      explanation: "Isim Ma'ful ditiadakan untuk Bab 5 (Wazan فَعُلَ يَفْعُلُ) karena merupakan fi'il lazim yang tidak memerlukan objek secara langsung."
    };
  }
  const { fa, ain, lam } = entry.root;
  const rawBina = entry.bina || "Shohih";
  const binaKey = getPluralBinaKey(rawBina);

  let qillah = "";
  let katsroh = "";
  let muntahal = "";
  let explanation = "";
  let contoh = "";
  let ilalRule = "";

  switch (binaKey) {
    case "sahih":
      qillah = "—";
      katsroh = "—";
      muntahal = formatPluralList(["مَفَاعِيل"], fa, ain, lam, binaKey);
      ilalRule = "Tidak ada I'lal pada Bina Shohih";
      explanation = `Isim Maful untuk semua bina tidak memiliki bentuk Jamak Qillah dan Jamak Katsroh semua di kembalikan ke jama mudazakar salim dan jama muannas salim,hanya meiliki Shighot Muntahal Jumu' berpola 'مَفَاعِل'.`;
      break;

    case "ajwaf":
      qillah = "—";
      katsroh = "-"; 
      muntahal = formatPluralList(["مَفَاعِيل"], fa, ain, lam, binaKey);
      contoh = "مَقُول ← مَقَاويل";
      ilalRule = "i'adah (pengembalian waw/ya pada bentuk munthal)";
      explanation = `Isim Maful untuk semua bina tidak memiliki bentuk Jamak Qillah dan Jamak Katsroh semua di kembalikan ke jama mudazakar salim dan jama muannas salim,hanya meiliki Shighot Muntahal Jumu' berpola 'مَفَاعِل'.`;
      break;

    case "mitsal":
      qillah = "—";
      katsroh = "-" 
      muntahal = formatPluralList(["مَفَاعِيل"], fa, ain, lam, binaKey);
      contoh = "مَوْعُود ← مَوَاعِيد";
      ilalRule = "Waw tetap (huruf waw pada Fa fi'il dipertahankan sepanjang pelafalan jamak).";
      explanation = `Isim Maful Bina Mitsal mempertahankan huruf penyakit waw di permulaan kata. Jamak qillah dan katsroh di kembalikan ke mudzakar salim dan muannas salim dan Shighot Muntahal Jumu' berpola 'مَفَاعِل' (contoh: مَوَاعِد).`;
      break;

    case "naqish":
      qillah = "—";
      katsroh = "-" 
      muntahal = formatPluralList(["مَفَاعِيل"], fa, ain, lam, binaKey);
      contoh = "مَرْمِيّ ← مَرَامٍ";
      ilalRule = "Hazf ya (pelenyapan huruf ya di posisi akhir diganti dengan harakat kasratain).";
      explanation = `Isim Maful Bina Naqis dijamakkan melalui Shighot Muntahal Jumu' berakhiran cacat 'مَفَاعٍ' (seperti مَرَامٍ dari مَرْمِيّ) setelah mengalami pembuangan huruf ya di akhir kalimat. Jamak Katsroh mengikuti mudzakar salim dan muannas salim.`;
      break;

    case "mudaaf":
      qillah = "—";
      katsroh = "-" 
      muntahal = formatPluralList(["مَفَاعِيل"], fa, ain, lam, binaKey);
      contoh = "مَحْبُوب ← مَحَابِيب";
      ilalRule = "Fakk idgham (penguraian dua huruf ganda yang menyatu di lafadz mufrod).";
      explanation = `Isim Maful Bina Muda'af mengurai kembali peleburan dua huruf kembarnya (fakk idgham) pada Shighot Muntahal Jumu' 'مَفَاعِل' (contoh: مَحَابِب dari مَحْبُوب). Jamak Katsroh diwakili jama mudzakar salim dan muannas salim`;
      break;

    case "mahmuz":
      qillah = "-" 
      katsroh = "-" 
      muntahal = formatPluralList(["مَفَاعِيل"], fa, ain, lam, binaKey);
      contoh = "مَسْؤُول ← مَسَائِيل";
      ilalRule = "Ibdal hamzah (perubahan hamzah menjadi kursi ya' saat berada di sela huruf jamak).";
      explanation = `Isim Maful Bina Mahmuz mengalami perubahan penulisan kursi hamzah (ibdal hamzah) demi keselarasan makhraj huruf (contoh: مَسَائِيل dari مَسْؤُول). Jamak Qillah dan Katsroh-nya meamakai jama mudzakar salim dan muannas salim.`;
      break;

    case "lafif_maqrun":
      qillah = "—";
      katsroh = "-" 
      muntahal = formatPluralList(["مَفَاعِيل"], fa, ain, lam, binaKey);
      contoh = "مَطْوِيّ ← مَطَاوٍ";
      ilalRule = "Hazf 2 illat (pembuangan dua huruf lemah di tengah dan akhir kata).";
      explanation = `Isim Maful Bina Lafif Maqrun mengadaptasi peluruhan ganda huruf penyakit di akhir pada Shighot Muntahal Jumu' 'مَفَاعٍ' (contoh: مَطَاوٍ dari مَطْوِيّ).`;
      break;

    case "lafif_mafruq":
      qillah = "—";
      katsroh = "-" 
      muntahal = formatPluralList(["مَفَاعِيل"], fa, ain, lam, binaKey);
      contoh = "مَوْقِيّ ← مَوَاقٍ";
      ilalRule = "Hazf 2 illat (pembuangan) huruf illat demi kemudahan artikulasi).";
      explanation = `Isim Maful Bina Lafif Mafruq menghasilkan Shighot Muntahal Jumu' ber-I'lal kuat berpola 'مَفَاعٍ' (contoh: مَوَاقٍ dari مَوْقِيّ).`;
      break;
  }

  const finalExplanation = `${explanation}\n\n• Kaidah I'lal: ${ilalRule}\n• Contoh Klasik: ${contoh}`;

  return {
    qillah,
    katsroh,
    muntahal,
    reference: "Kamus Lisanul 'Arab, Kitab Sharaf Al-Kafi, Al-Shorof Al-Wadhih (v1.2)",
    explanation: finalExplanation
  };
}
