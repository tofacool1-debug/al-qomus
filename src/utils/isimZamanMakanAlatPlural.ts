/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { DictionaryEntry, PluralIsimZamanMakan, PluralIsimAlat } from "../types";

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
 * Helper to safely substitute root letters into a pattern to avoid sequential replacement collision.
 */
function safeReplaceRoot(pattern: string, cleanFa: string, cleanAin: string, cleanLam: string): string {
  return pattern
    .replace(/ف/g, "___FA___")
    .replace(/ع/g, "___AIN___")
    .replace(/ل/g, "___LAM___")
    .replace(/___FA___/g, cleanFa)
    .replace(/___AIN___/g, cleanAin)
    .replace(/___LAM___/g, cleanLam);
}

/**
 * Universal spelling rules for Hamzah.
 */
function applyImlaHamzah(str: string): string {
  if (!str || str === "—" || str === "-") return str;

  let normalized = str;

  // 1. Bila sebelum alif maka bentuk tulisan (آ)
  normalized = normalized.replace(/[أإءؤئ][\u064b-\u065f]?ا/g, "آ");
  normalized = normalized.replace(/آا/g, "آ");

  // 2. Bila sesudah ya' sukun atau di harokati kasroh maka bentuk penulisan (ئ)
  normalized = normalized.replace(/([ييْىىْ])[\u064b-\u065f]?[أإءؤ]/g, "$1ئ");
  normalized = normalized.replace(/[أإءؤ]ِ/g, "ئِ");
  normalized = normalized.replace(/[أإءؤ]ٍ/g, "ئٍ");

  // 3. Bila sesudah wawu sukun atau di harokati dhommah maka bentuk penulisan (ؤ)
  normalized = normalized.replace(/(و[\u064b-\u065f]?)[أإءئ](?![ٍِ])/g, "$1ؤ");
  normalized = normalized.replace(/[أإء]ُ/g, "ؤُ");
  normalized = normalized.replace(/[أإء]ٌ/g, "ؤٌ");

  // Final hamzah with dhommah/tanwin dhommah spelling rule (kept as isolated hamzah ء)
  normalized = normalized.replace(/[أإؤئء]([ٌُ])(?=$|\s|[\s,;،.?\/()\]}]|@)/g, "ء$1");

  return normalized;
}

/**
 * Smartly replaces pattern weights (F-A-L) with root letters, applying morphological and I'lal rules.
 */
function replaceRootForZamanMakanAlat(pattern: string, fa: string, ain: string, lam: string, binaKey: string): string {
  const cleanFa = fa.replace(/[\u064b-\u065f]/g, "");
  const cleanAin = ain.replace(/[\u064b-\u065f]/g, "");
  const cleanLam = lam.replace(/[\u064b-\u065f]/g, "");

  let result = pattern;

  // Naqis & Lafif special morphing for مَفَاعٍ / مَفَاعِيل:
  if (binaKey === "naqish" || binaKey.startsWith("lafif")) {
    if (pattern === "مَفَاعِ" || pattern === "مَفَاعٍ") {
      result = `مَ${cleanFa}َا${cleanAin}ٍ`; // e.g. مَرَامٍ / مَطَاوٍ / مَوَاقٍ
    } else if (pattern === "مَفَاعِيل") {
      result = `مَ${cleanFa}َا${cleanAin}ِي${cleanLam}`; // e.g. مَكَايِيل
    } else {
      result = safeReplaceRoot(pattern, cleanFa, cleanAin, cleanLam);
    }
  }
  // Muda'af special morphing (Idgham reinforcement):
  else if (binaKey === "mudaaf") {
    if (pattern === "مَفَاعِل") {
      result = `مَ${cleanFa}َا${cleanLam}ّ`; // e.g. مَقَارّ / makhraj contraction
    } else {
      result = safeReplaceRoot(pattern, cleanFa, cleanAin, cleanLam);
    }
  }
  // Mahmuz special adjustments for hamzah seating:
  else if (binaKey === "mahmuz") {
    if (pattern === "مَفَاعِل") {
      if (cleanFa === "أ" || cleanFa === "ء" || cleanFa === "إ") {
        result = `مَآ${cleanAin}ِ${cleanLam}`; // e.g. مَآزِر from مِئْزَر
      } else if (cleanLam === "أ" || cleanLam === "ء" || cleanLam === "أ") {
        result = `مَ${cleanFa}َا${cleanAin}ِئ`; // e.g. مَبْدَأ -> مَبَادِئ
      } else {
        result = safeReplaceRoot(pattern, cleanFa, cleanAin, cleanLam);
      }
    } else {
      result = safeReplaceRoot(pattern, cleanFa, cleanAin, cleanLam);
    }
  }
  // Other binas:
  else {
    result = safeReplaceRoot(pattern, cleanFa, cleanAin, cleanLam);
  }

  // Universal I'lal / corrections for Ajwaf, Naqis, and Lafif:
  if (binaKey === "ajwaf") {
    result = result.replace(/اوِ/g, "ائِ").replace(/ايِ/g, "ائِ");
  }
  if (binaKey === "naqish" || binaKey.startsWith("lafif")) {
    result = result.replace(/ِيْ?[يio]ٌ?$/g, "ِيُّ").replace(/ِيْ?[ييو]ٌ?$/g, "ِيُّ");
  }

  return applyImlaHamzah(result);
}

/**
 * Formats patterns with instantiated roots.
 */
function formatPluralList(patterns: string[], fa: string, ain: string, lam: string, binaKey: string): string {
  if (!patterns || patterns.length === 0) return "—";
  return patterns.map(p => {
    const word = replaceRootForZamanMakanAlat(p, fa, ain, lam, binaKey);
    return word;
  }).join(" / ");
}

/**
 * Smartly replaces pattern weights (F-A-L) with root letters for Isim Alat,
 * applying the precise morphological and I'lal rules requested by the user.
 */
function replaceRootForIsimAlat(pattern: string, fa: string, ain: string, lam: string, binaKey: string): string {
  const cleanFa = fa.replace(/[\u064b-\u065f]/g, "");
  const cleanAin = ain.replace(/[\u064b-\u065f]/g, "");
  const cleanLam = lam.replace(/[\u064b-\u065f]/g, "");

  let result = pattern;
  const cleanPattern = pattern.replace(/[\u064b-\u065f]/g, "");

  // 1. Naqis & Lafif special morphing for Isim Alat:
  if (binaKey === "naqish" || binaKey.startsWith("lafif")) {
    if (cleanPattern === "مفاعil" || cleanPattern === "مفاعيل") {
      // wazan مَفَاعِيْلُ dengan aturan lam fiil di buang, ya' di tasdid dan di harokati dhommah (ِيُّ)
      result = `مَ${cleanFa}َا${cleanAin}ِيُّ`;
    } else if (cleanPattern === "مفاعل") {
      // wazan مَفَاعِلُ dengan aturan lam di buang ain fiil di harokati kasroh tanwin (ٍ)
      result = `مَ${cleanFa}َا${cleanAin}ٍ`;
    } else {
      result = safeReplaceRoot(pattern, cleanFa, cleanAin, cleanLam);
    }
  }
  // 2. Ajwaf special morphing for Isim Alat:
  else if (binaKey === "ajwaf") {
    // aturan ain fiil di ganti hamzah (ئ)
    if (cleanPattern === "مفاعil" || cleanPattern === "مفاعيل") {
      result = `مَ${cleanFa}َائِي${cleanLam}ُ`;
    } else if (cleanPattern === "مفاعل") {
      result = `مَ${cleanFa}َائِمُ`; // Wait! Let's be precise: "m_f_a_i_l" -> مَ + fa + َائِ + lam + ُ
      result = `مَ${cleanFa}َائِ${cleanLam}ُ`;
    } else {
      result = safeReplaceRoot(pattern, cleanFa, "ئِ", cleanLam);
    }
  }
  // 3. Muda'af special morphing (Idgham reinforcement):
  else if (binaKey === "mudaaf") {
    if (cleanPattern === "مفاعل") {
      result = `مَ${cleanFa}َا${cleanLam}ّ`; // e.g. مَقَاصّ
    } else {
      result = safeReplaceRoot(pattern, cleanFa, cleanAin, cleanLam);
    }
  }
  // 4. Mahmuz special adjustments for hamzah seating:
  else if (binaKey === "mahmuz") {
    if (cleanPattern === "مفاعل") {
      if (cleanFa === "أ" || cleanFa === "ء" || cleanFa === "إ") {
        result = `مَآ${cleanAin}ِ${cleanLam}`; // e.g. مَآزِر from مِئْزَر
      } else if (cleanLam === "أ" || cleanLam === "ء" || cleanLam === "أ") {
        result = `مَ${cleanFa}َا${cleanAin}ِئ`; // e.g. مَبْدَأ -> مَبَادِئ
      } else {
        result = safeReplaceRoot(pattern, cleanFa, cleanAin, cleanLam);
      }
    } else {
      result = safeReplaceRoot(pattern, cleanFa, cleanAin, cleanLam);
    }
  }
  // Other binas:
  else {
    result = safeReplaceRoot(pattern, cleanFa, cleanAin, cleanLam);
  }

  return applyImlaHamzah(result);
}

/**
 * Formats Isim Alat patterns with instantiated roots.
 */
function formatPluralListForIsimAlat(patterns: string[], fa: string, ain: string, lam: string, binaKey: string): string {
  if (!patterns || patterns.length === 0) return "—";
  return patterns.map(p => {
    const word = replaceRootForIsimAlat(p, fa, ain, lam, binaKey);
    return word;
  }).join(" / ");
}

/**
 * Highly compliant Jamak Taksir engine for Isim Zaman & Makan (7 Bina x 5 Shigot).
 */
export function analyzeIsimZamanMakanPlural(entry: DictionaryEntry): PluralIsimZamanMakan {
  const { fa, ain, lam } = entry.root;
  const rawBina = entry.bina || "Shohih";
  const binaKey = getPluralBinaKey(rawBina);

  let qillah = "";
  let katsroh = "";
  let muntahal = "";
  let explanation = "";
  let contoh = "";
  let ilalRule = "";

  // Formulate a clean default singular based on Bina
  let defaultMufrod = `مَ${fa}ْ${ain}َ${lam}ٌ`;
  if (entry.root.fa === "و") {
    defaultMufrod = `مَ${fa}ْ${ain}ِ${lam}ٌ`; // e.g. mawyidun
  }

  switch (binaKey) {
    case "sahih":
      qillah = "-";
      katsroh = "-";
      muntahal = formatPluralList(["مَفَاعِل"], fa, ain, lam, binaKey);
      contoh = "مَسْجِد ← مَسَاجِد";
      ilalRule = "Tidak ada I'lal pada Bina Shohih";
      explanation = `Isim Zaman & Makan untuk Bina Shohih berkembang stabil. Jamak Qillah dan Jamak Katsroh tidak ada shigot muntahal jumu berpola 'مَفَاعِل' (seperti مَسَاجِد dari مَسْجَد)`;
      break;

    case "ajwaf":
      qillah = "-";
      katsroh = "-";
      muntahal = formatPluralList(["مَفَاعِل"], fa, ain, lam, binaKey);
      contoh = "مَقَام ← مَقَاوِم";
      ilalRule = "Qalbu alif (kembalinya alif di tengah mufrod menjadi waw atau ya asli dalam pola jamak).";
      explanation = `Isim Zaman & Makan Bina Ajwaf mengurung alif mufrod (morfing) ke huruf asalnya (waw/ya) pada bentuk jamak, seperti 'مَقَاوِم' dari 'مَقَام'. Muntahal jumu' berpola 'مَفَاعِل'.`;
      break;

    case "mitsal":
      qillah = "-";
      katsroh = "-";
      muntahal = formatPluralList(["مَفَاعِل"], fa, ain, lam, binaKey);
      contoh = "مَوْعِد ← مَوَاعِد";
      ilalRule = "Waw tetap (huruf waw fa' fi'il kokoh dan utuh).";
      explanation = `Isim Zaman & Makan Bina Mitsal melestarikan huruf waw asli di Fa fi'il dalam seluruh bentuk muntahal jumu' 'مَفَاعِل' (contoh: مَوَاعِد dari مَوْعِد). Qillah mengikuti wazan 'أَفْعِلَة'.`;
      break;

    case "naqish":
      qillah = "-";
      katsroh = "-";
      muntahal = formatPluralList(["مَفَاعٍ"], fa, ain, lam, binaKey);
      contoh = "مَرْمَى ← مَرَامٍ";
      ilalRule = "Hazf ya (pelepasan huruf akhir penyakit diganti harakat tanwin kasrah).";
      explanation = `Isim Zaman & Makan Bina Naqis dijamakkan langsung melompati Qillah menuju Shighot Muntahal Jumu' dan Jamak Katsroh 'مَفَاعٍ' (seperti makhraj مَرَامٍ dari mufrod مَرْمَى).`;
      break;

    case "mudaaf":
      qillah = "-";
      katsroh = "-";
      muntahal = formatPluralList(["مَفَاعِل"], fa, ain, lam, binaKey);
      contoh = "مَقَرّ ← مَقَارّ";
      ilalRule = "Idgham (peleburan ganda huruf kembar pada akhiran jamak).";
      explanation = `Isim Zaman & Makan Bina Muda'af menggabungkan dua huruf akhirnya (Idgham kokoh) pada Shighot Muntahal Jumu' and Jamak Katsroh 'مَفَاعِل' sehingga berakhiran tasydid (contoh: مَقَارّ dari مَقَرّ).`;
      break;

    case "mahmuz":
      qillah = "-";
      katsroh = "-";
      muntahal = formatPluralList(["مَفَاعِل"], fa, ain, lam, binaKey);
      contoh = "مَبْدَأ ← مَبَادِئ";
      ilalRule = "Hamzah tetap (penulisan diselaraskan dengan makhraj harakat sekitarnya).";
      explanation = `Isim Zaman & Makan Bina Mahmuz melahirkan jamak berpola murni 'مَفَاعِل' dengan hamzah akhir disesuaikan menjadi bentuk duduk di atas ya' tanpa titik (contoh: مَبَادِئ dari مَبْدَأ).`;
      break;

    case "lafif_maqrun":
      qillah = "-";
      katsroh = "-";
      muntahal = formatPluralList(["مَفَاعٍ"], fa, ain, lam, binaKey);
      contoh = "مَطْوَى ← مَطَاوٍ";
      ilalRule = "Hazf 2 illat (peluluhan huruf lemah di lam fi'il).";
      explanation = `Isim Zaman & Makan Bina Lafif Maqrun mengerucut ke jamak puncak 'مَفَاعٍ' (contoh: مَطَاوٍ dari mufrod مَطْوَى).`;
      break;

    case "lafif_mafruq":
      qillah = "-";
      katsroh = "-";
      muntahal = formatPluralList(["مَفَاعٍ"], fa, ain, lam, binaKey);
      contoh = "مَوْقَى ← مَوَاقٍ";
      ilalRule = "Hazf 2 illat (peluluhan akhir kata).";
      explanation = `Isim Zaman & Makan Bina Lafif Mafruq mengalami I'lal nahu di akhir melahirkan jamak muntahal jumu' 'مَفَاعٍ' (contoh: مَوَاقٍ dari مَوْقَى).`;
      break;
  }

  const finalExplanation = `${explanation}\n\n• Kaidah I'lal: ${ilalRule}\n• Contoh Klasik: ${contoh}`;

  return {
    mufrod: defaultMufrod,
    qillah: "—",
    katsroh,
    muntahal,
    reference: "Kamus Lisanul 'Arab, Kitab Sharaf Al-Kafi, Al-Shorof Al-Wadhih (v1.2)",
    explanation: finalExplanation
  };
}

/**
 * Highly compliant Jamak Taksir engine for Isim Alat (7 Bina x 5 Shigot).
 */
export function analyzeIsimAlatPlural(entry: DictionaryEntry): PluralIsimAlat {
  if (entry.babNum === 4) {
    return {
      mufrod: "—",
      qillah: "—",
      katsroh: "—",
      muntahal: "—",
      reference: "—",
      explanation: "Bab 4 tidak memiliki wazan Isim Alat maupun jamak taksirnya."
    };
  }

  if (entry.babNum === 5) {
    return {
      mufrod: "—",
      qillah: "(-)",
      katsroh: "(-)",
      muntahal: "(-)",
      reference: "—",
      explanation: "Isim Alat dan jamaknya dikosongkan untuk Bab 5 sesuai kaidah sharaf kata kerja lazim."
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

  // Formulate a clean default singular based on Bina
  let defaultMufrod = `مِ${fa}ْ${ain}َ${lam}ٌ`;
  if (entry.root.fa === "و") {
    defaultMufrod = `مِ${fa}ْ${ain}َ${lam}ٌ`;
  }

  switch (binaKey) {
    case "sahih":
      qillah = "-";
      katsroh = "-";
      muntahal = formatPluralListForIsimAlat(["مفاعيل", "مَفَاعِل"], fa, ain, lam, binaKey);
      contoh = "مِفْتَاح ← مَفَاتِيح";
      ilalRule = "Tidak ada I'lal pada Bina Shohih";
      explanation = `Isim Alat untuk shigot muntahal jumu Bina Shohih berpola panjang 'مَفَاعِيل' (seperti مَفَاتِيح dari مِفْتَاح), dan Muntahal Jumu' berpola ringkas 'مَفَاعِل'.`;
      break;

    case "ajwaf":
      qillah = "—";
      katsroh = "-";
      muntahal = formatPluralListForIsimAlat(["مفاعيل", "مَفَاعِل"], fa, ain, lam, binaKey);
      contoh = "مِخْيَاط ← مَخَائِيط / مَخَائِط";
      ilalRule = "Ain fi'il diganti hamzah (ئ) pada shighot muntahal jumu'.";
      explanation = `Isim Alat Bina Ajwaf mengganti huruf illat di posisi Ain fi'il menjadi hamzah (ئ) pada shighot muntahal jumu' berpola 'مَفَاعِل' (contoh: مَخَائِط) dan 'مَفَاعِيل' (contoh: مَخَائِيط).`;
      break;

    case "mitsal":
      qillah = "—";
      katsroh = "-";
      muntahal = formatPluralListForIsimAlat(["مفاعيل", "مَفَاعِل"], fa, ain, lam, binaKey);
      contoh = "مِوْزَان ← مَوَازِين";
      ilalRule = "Waw tetap";
      explanation = `Isim Alat Bina Mitsal mempertahankan waw asli Fa fi'il khalayak ramai. Jamak Katsroh berpola 'مَفَاعِيل' (contoh: مَوَازِين) dan Muntahal berpola 'مَفَاعِل' (contoh: مَوَازِن).`;
      break;

    case "naqish":
      qillah = "—";
      katsroh = "-";
      muntahal = formatPluralListForIsimAlat(["مفاعيل", "مَفَاعِل"], fa, ain, lam, binaKey);
      contoh = "مِغْزَى ← مَغَازِيُّ / مَغَازٍ";
      ilalRule = "Wazan مَفَاعِيْلُ: lam fi'il dibuang, ya' ditasydid dhommah (ِيُّ). Wazan مَفَاعِلُ: lam fi'il dibuang, ain fi'il dikasroh tanwin (ٍ).";
      explanation = `Isim Alat Bina Naqis dijamakkan melalui wazan 'مَفَاعِيل' dengan membuang lam fi'il serta mentasydid dhommah ya' (menjadi مَغَازِيُّ), dan wazan 'مَفَاعِل' dengan membuang lam fi'il serta memberikan kasroh tanwin pada ain fi'il (menjadi مَغَازٍ).`;
      break;

    case "mudaaf":
      qillah = "—";
      katsroh = "-";
      muntahal = formatPluralListForIsimAlat(["مفاعيل", "مَفَاعِل"], fa, ain, lam, binaKey);
      contoh = "مِقَصّ ← مَقَاصّ";
      ilalRule = "Idgham (peleburan kembali dua huruf kembar di akhir kata).";
      explanation = `Isim Alat Bina Muda'af meleburkan ganda huruf akhir lewat idgham (pola مَفَاعِل menjadi مَقَاصّ dari mufrod mudo'af مِقَصّ).`;
      break;

    case "mahmuz":
      qillah = "—";
      katsroh = "-";
      muntahal = formatPluralListForIsimAlat(["مفاعيل", "مَفَاعِل"], fa, ain, lam, binaKey);
      contoh = "مِئْزَر ← مَآزِر";
      ilalRule = "Ibdal";
      explanation = `Isim Alat Bina Mahmuz ber-I'lal santun menyatukan hamzah dengan alif mad sehingga tertulis sebagai alif maddah murni (contoh: مَآزِر)`;
      break;

    case "lafif_maqrun":
      qillah = "—";
      katsroh = "-";
      muntahal = formatPluralListForIsimAlat(["مفاعيل", "مَفَاعِل"], fa, ain, lam, binaKey);
      contoh = "مِطْوَى ← مَطَاوِيُّ / مَطَاوٍ";
      ilalRule = "Wazan مَفَاعِيْلُ: lam fi'il dibuang, ya' ditasydid dhommah (ِيُّ). Wazan مَفَاعِلُ: lam fi'il dibuang, ain fi'il dikasroh tanwin (ٍ).";
      explanation = `Isim Alat Bina Lafif Maqrun dijamakkan melalui wazan 'مَفَاعِيل' dengan membuang lam fi'il serta mentasydid dhommah ya' (menjadi مَطَاوِيُّ), dan wazan 'مَفَاعِل' dengan membuang lam fi'il serta memberikan kasroh tanwin pada ain fi'il (menjadi مَطَاوٍ).`;
      break;

    case "lafif_mafruq":
      qillah = "—";
      katsroh = "-";
      muntahal = formatPluralListForIsimAlat(["مفاعيل", "مَفَاعِل"], fa, ain, lam, binaKey);
      contoh = "مِيقَى ← مَوَاقِيُّ / مَوَاقٍ";
      ilalRule = "Wazan مَفَاعِيْلُ: lam fi'il dibuang, ya' ditasydid dhommah (ِيُّ). Wazan مَفَاعِلُ: lam fi'il dibuang, ain fi'il dikasroh tanwin (ٍ).";
      explanation = `Isim Alat Bina Lafif Mafruq dijamakkan melalui wazan 'مَفَاعِيل' dengan membuang lam fi'il serta mentasydid dhommah ya' (menjadi مَوَاقِيُّ), dan wazan 'مَفَاعِل' dengan membuang lam fi'il serta memberikan kasroh tanwin pada ain fi'il (menjadi مَوَاقٍ).`;
      break;
  }

  const finalExplanation = `${explanation}\n\n• Kaidah I'lal: ${ilalRule}\n• Contoh Klasik: ${contoh}`;

  return {
    mufrod: defaultMufrod,
    qillah,
    katsroh,
    muntahal,
    reference: "Kamus Lisanul 'Arab, Kitab Sharaf Al-Kafi, Al-Shorof Al-Wadhih (v1.2)",
    explanation: finalExplanation
  };
}