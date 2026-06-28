/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { DictionaryEntry, PluralIsimFail } from "../types";

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
function replaceRootForIsimFail(pattern: string, fa: string, ain: string, lam: string, binaKey: string): string {
  const cleanFa = fa.replace(/[\u064b-\u065f]/g, "");
  const cleanAin = ain.replace(/[\u064b-\u065f]/g, "");
  const cleanLam = lam.replace(/[\u064b-\u065f]/g, "");

  let result = "";

  // 1. Rule: jama qillah isim fail bina mitsal, bina ajwaf, bina naqis, bina mahmuz, bina lafif menjadi فاعلون/فاعلون
  if (pattern === "فَاعِلُونَ") {
    if (binaKey === "naqish" || binaKey.startsWith("lafif")) {
      result = `${cleanFa}َا${cleanAin}ُونَ`; // e.g. قَاضُونَ, طَاوُونَ
    } else if (binaKey === "ajwaf") {
      result = `${cleanFa}َائِ${cleanLam}ُونَ`; // e.g. قَائِلُونَ / جَائِدُونَ
    } else if (binaKey === "mudaaf") {
      result = `${cleanFa}َا${cleanLam}ُّونَ`; // e.g. مَادُّونَ
    } else {
      result = `${cleanFa}َا${cleanAin}ِ${cleanLam}ُونَ`; // e.g. كَاتِبُونَ, وَاعِدُونَ
    }
  }
  // 2. Rule: shigot muntahal jumu' (فَوَاعِلُ)
  else if (pattern === "فَوَاعِلُ") {
    // 3. bina mudhoaf menjadi فَواعِلُ dengan aturan lam dan ain fiil di idghomkan
    if (binaKey === "mudaaf") {
      result = `${cleanFa}َوَا${cleanLam}ُّ`; // e.g. مَوَادُّ
    }
    // 4. bina ajwaf menjadi فَواعِلُ dengan aturan huruf wawu/ya di ganti hamazah (ئ)
    else if (binaKey === "ajwaf") {
      result = `${cleanFa}َوَائِ${cleanLam}ُ`; // e.g. قَوَائِلُ, بَوَائِعُ
    }
    // 5. bina mitsal menjadi فَواعِلُ dengan aturan fa' fiil di rubah menjadi hamzah (أ)
    else if (binaKey === "mitsal") {
      result = `أَوَا${cleanAin}ِ${cleanLam}ُ`; // e.g. أَوَاعِدُ
    }
    // 6. bina naqis menjadi فَواعِلُ dengan lam fiil di buang dan ain fill di harokati kasroh tanwin
    else if (binaKey === "naqish") {
      result = `${cleanFa}َوَا${cleanAin}ٍ`; // e.g. قَوَاضٍ
    }
    // 7. bina lafif menjadi فَواعِلُ dengan aturan fa fiil di ganti hamzah (أ), lam fiil di buang dan ain fiil di harokati kasroh tanwin
    else if (binaKey.startsWith("lafif") || binaKey === "lafif_maqrun" || binaKey === "lafif_mafruq") {
      if (binaKey === "lafif_mafruq" || cleanFa === "و") {
        result = `أَوَا${cleanAin}ٍ`; // e.g. أَوَاقٍ
      } else {
        result = `${cleanFa}َوَا${cleanAin}ٍ`; // e.g. شَوَاوٍ
      }
    }
    // 1 & 2. bina shohih & bina mahmuz menjadi فَواعِلُ
    else {
      result = `${cleanFa}َوَا${cleanAin}ِ${cleanLam}ُ`; // e.g. كَوَاتِبُ, سَوَائِلُ
    }
  }
  // Muda'af rules:
  else if (binaKey === "mudaaf") {
    // jama kasroh isim fail bina mudhoaf menjadi فَعَلَةٌ (tanpa idghom), فُعَّل, فُعَّال
    if (pattern === "فَعَلَةٌ") {
      result = `${cleanFa}َ${cleanAin}َ${cleanLam}َةٌ`; // e.g. مَدَةٌ
    } else if (pattern === "فُعَّلٌ") {
      result = `${cleanFa}ُ${cleanAin}َّ${cleanLam}ٌ`; // e.g. مُدَّدٌ
    } else {
      result = pattern
        .replace(/ل/g, cleanLam)
        .replace(/ع/g, cleanAin)
        .replace(/ف/g, cleanFa);
    }
  }
  // Naqis & Lafif jamak katsroh overrides:
  else if (binaKey === "naqish" || binaKey.startsWith("lafif")) {
    if (pattern === "فُعَلَةٌ") {
      result = `${cleanFa}ُ${cleanAin}َاةٌ`; // e.g. قُضَاةٌ
    } else if (pattern === "فُعَّالٌ") {
      result = `${cleanFa}ُ${cleanAin}َّاءٌ`; // e.g. رُمَّاءٌ
    } else if (pattern === "فُعَّلٌ") {
      result = `${cleanFa}ُ${cleanAin}ًّى`; // e.g. رُمًّى
    } else {
      result = pattern
        .replace(/ل/g, cleanLam)
        .replace(/ع/g, cleanAin)
        .replace(/ف/g, cleanFa);
    }
  }
  // Ajwaf overrides for jamak katsroh:
  else if (binaKey === "ajwaf") {
    if (pattern === "فَعَلَةٌ") {
      result = `${cleanFa}َ${cleanAin}َ${cleanLam}َةٌ`; // e.g. قَوَمَةٌ
    } else {
      result = pattern
        .replace(/ل/g, cleanLam)
        .replace(/ع/g, cleanAin)
        .replace(/ف/g, cleanFa);
    }
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
    .replace(/أَحْيَايٌ/g, "أَحْيَاءٌ")
    .replace(/أَحْيَايُ/g, "أَحْيَاءُ")
    .replace(/اْحْيَايُ/g, "أَحْيَاءُ")
    .replace(/أَحْيَاي/g, "أَحْيَاء")
    .replace(/اْحْيَاي/g, "أَحْيَاء");

  // Rule for Mitsal & Lafif Mafruq:
  if (result.startsWith("وَوَ") || result.startsWith("وَو")) {
    result = "أَ" + result.slice(1);
  }

  result = result.replace(/ُ[أإء]/g, "ُؤ");

  if (binaKey === "ajwaf") {
    result = result.replace(/اوِ/g, "ائِ").replace(/ايِ/g, "ائِ");
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
    let word = replaceRootForIsimFail(p, fa, ain, lam, binaKey);
    return word;
  }).join(" / ");
}

/**
 * Highly compliant Jamak Taksir engine for Isim Fail (7 Bina x 5 Shigot).
 */
export function analyzeIsimFail(entry: DictionaryEntry): PluralIsimFail {
  const { fa, ain, lam } = entry.root;
  const { bina } = entry;
  const binaKey = getPluralBinaKey(bina || "");

  let qillah = "—";
  let katsroh = "—";
  let muntahal = "—";
  let contoh = "";
  let ilalRule = "";
  let explanation = "";

  switch (binaKey) {
    case "sahih":
      qillah = formatPluralList(["أَفْعِلَةٌ", "أَفْعَالٌ"], fa, ain, lam, binaKey);
      katsroh = formatPluralList(["فُعَّالٌ", "فُعَّلٌ", "فَعَلَةٌ"], fa, ain, lam, binaKey);
      muntahal = formatPluralList(["فَوَاعِلُ"], fa, ain, lam, binaKey);
      contoh = "كَاتِب ← كَاتِبُونَ / كُتَّابٌ / كُتَّبٌ / كَتَبَةٌ / كَوَاتِبُ";
      ilalRule = "Sesuai kaidah standar shorof sahih tanpa adanya pembuangan atau penukaran huruf illat.";
      explanation = `Isim Fail bagi Bina Shohih mengikuti wazan-wazan utama Jamak Taksir secara utuh. Jamak Qillah diwakili secara tunggal oleh wazan أَفْعِلَةٌ. Jamak Katsroh terbentuk kokoh melalui wazan baku فُعَّالٌ, فُعَّلٌ, dan فَعَلَةٌ, serta Shighot Muntahal Jumu' berpola فَوَاعِلُ.`;
      break;

    case "ajwaf":
      qillah = formatPluralList(["فَاعِلُونَ"], fa, ain, lam, binaKey);
      katsroh = formatPluralList(["فَعَلَةٌ", "فُعَّالٌ", "فُعَّلٌ"], fa, ain, lam, binaKey);
      muntahal = formatPluralList(["فَوَاعِلُ"], fa, ain, lam, binaKey);
      contoh = "قَائِل ← قَائِلُونَ / قَوَمَةٌ / قُوَّالٌ / قُوَّلٌ / قَوَائِلُ";
      break;
      
    case "mitsal":
      qillah = formatPluralList(["فَاعِلُونَ"], fa, ain, lam, binaKey);
      katsroh = formatPluralList(["فُعَّالٌ", "فُعَّلٌ", "فَعَلَةٌ"], fa, ain, lam, binaKey);
      muntahal = formatPluralList(["فَوَاعِلُ"], fa, ain, lam, binaKey);
      contoh = "وَاعِد ← وَاعِدُونَ / وُعَّادٌ / وُعَّدٌ / وَقَفَةٌ / أَوَاعِدُ";
      ilalRule = "Fa' fi'il (waw/ya) diubah menjadi hamzah (أ) pada Shighot Muntahal Jumu' (فَوَاعِلُ).";
      explanation = `Isim Fail Bina Mitsal memiliki Jamak Qillah bermodel فَاعِلُونَ. Jamak Katsroh-nya mengikuti pola-pola baku فُعَّالٌ, فُعَّلٌ, dan فَعَلَةٌ. Shighot Muntahal Jumu'-nya mengikuti wazan فَوَاعِلُ dengan mengubah fa' fi'il menjadi hamzah (أ).`;
      break;

    case "naqish":
      qillah = formatPluralList(["فَاعِلُونَ"], fa, ain, lam, binaKey);
      katsroh = formatPluralList(["فُعَلَةٌ", "فُعَّالٌ", "فُعَّلٌ"], fa, ain, lam, binaKey);
      muntahal = formatPluralList(["فَوَاعِلُ"], fa, ain, lam, binaKey);
      contoh = "قَاضٍ ← قَاضُونَ / قُضَاةٌ / قُضَّاءٌ / قُضًّى / قَوَاضٍ";
      ilalRule = "Lam fi'il dibuang pada Qillah dan Muntahal. Ain fi'il berharakat kasroh tanwin pada muntahal. Pada jamak katsroh, lam fi'il diganti alif, hamzah, dan ya' tanwin.";
      explanation = `Isim Fail Bina Naqis memiliki Jamak Qillah berupa فَاعِلُونَ. Jamak Katsroh-nya dibentuk dari wazan فُعَلَةٌ, فُعَّالٌ, dan فُعَّلٌ. Shighot Muntahal Jumu' ber-wazan فَوَاعِلُ dengan membuang lam fi'il dan memberikan kasroh tanwin pada ain fi'il.`;
      break;

    case "mudaaf":
      qillah = formatPluralList(["أَفْعَالٌ"], fa, ain, lam, binaKey);
      katsroh = formatPluralList(["فَعَلَةٌ", "فُعَّلٌ", "فُعَّالٌ"], fa, ain, lam, binaKey);
      muntahal = formatPluralList(["فَوَاعِلُ"], fa, ain, lam, binaKey);
      contoh = "مَادّ ← أَمْدَادٌ  / مَدَةٌ / مُدَّدٌ / مُدَّادٌ / مَوَادُّ";
      ilalRule = "Jamak Qillah memakai أَفْعَالٌ. Jamak katsroh فَعَلَةٌ tanpa idghom. Muntahal jumu' فَوَاعِلُ meng-idghom-kan lam dan ain fi'il.";
      explanation = `Isim Fail Bina Muda'af memiliki Jamak Qillah berupa أَفْعَالٌ. Jamak Katsroh-nya berpola فَعَلَةٌ tanpa idghom, serta فُعَّلٌ dan فُعَّالٌ. Shighot Muntahal Jumu' ber-wazan فَوَاعِلُ dengan meng-idghom-kan ain dan lam fi'il.`;
      break;

    case "mahmuz":
      qillah = formatPluralList(["فَاعِلُونَ"], fa, ain, lam, binaKey);
      katsroh = formatPluralList(["فُعَّالٌ", "فُعَّلٌ", "فَعَلَةٌ"], fa, ain, lam, binaKey);
      muntahal = formatPluralList(["فَوَاعِلُ"], fa, ain, lam, binaKey);
      contoh = "آكِل ← آكِلُونَ / أُكَّالٌ / أُكَّلٌ / أَكَلَةٌ / أَوَاكِلُ";
      ilalRule = "Standardisasi hamzah sesuai kaidah harakat.";
      explanation = `Isim Fail Bina Mahmuz mengikuti pola murni Shohih dengan Jamak Qillah berupa فَاعِلُونَ. Jamak Katsroh berpola فُعَّالٌ, فُعَّلٌ, dan فَعَلَةٌ. Shighot Muntahal Jumu' mengikuti wazan فَوَاعِلُ secara teratur.`;
      break;

    case "lafif_maqrun":
    case "lafif_mafruq":
      qillah = formatPluralList(["فَاعِلُونَ"], fa, ain, lam, binaKey);
      katsroh = formatPluralList(["فُعَلَةٌ", "فُعَّالٌ", "فُعَّلٌ"], fa, ain, lam, binaKey);
      muntahal = formatPluralList(["فَوَاعِلُ"], fa, ain, lam, binaKey);
      contoh = "طَاوٍ ← طَاوُونَ / طُوَاةٌ / طُوَّاءٌ / طُوًّى / أَوَاوٍ";
      ilalRule = "Aturan Lafif selaras dengan Naqis pada Katsroh. Pada Muntahal Jumu' fa' fi'il diganti hamzah, lam fi'il dibuang, ain fi'il dikasroh tanwin.";
      explanation = `Isim Fail Bina Lafif memiliki Jamak Qillah berupa فَاعِلُونَ. Jamak Katsroh berpola فُعَلَةٌ, فُعَّالٌ, dan فُعَّلٌ. Shighot Muntahal Jumu' ber-wazan فَوَاعِلُ dengan mengganti fa' fi'il menjadi hamzah, membuang lam fi'il, dan memberikan kasroh tanwin pada ain fi'il.`;
      break;
  }

  const finalExplanation = `${explanation}\n\n• Kaidah I'lal: ${ilalRule}\n• Contoh Klasik: ${contoh}`;

  if (entry.jamaTaksirSamai) {
    if (qillah === "—" || !qillah) {
      qillah = `${entry.jamaTaksirSamai} (samai)`;
    } else {
      qillah = `${entry.jamaTaksirSamai} (samai) / ${qillah}`;
    }
  }

  return {
    qillah,
    katsroh,
    muntahal,
    reference: "Kamus Lisanul 'Arab, Kitab Sharaf Al-Kafi, Al-Shorof Al-Wadhih (v1.2)",
    explanation: finalExplanation
  };
}