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

  let result = pattern;

  // Naqis & Lafif special morphing:
  // - فِعْلَة / فُعَلَة / فَعَلَة under Naqis/Lafif are morphed to 'فُعَاة' (such as قُضَاة / طُوَاة / وُعَاة)
  if (binaKey === "naqish" || binaKey.startsWith("lafif")) {
    if (pattern.startsWith("فِعْلَة") || pattern.startsWith("فُعَلَة") || pattern.startsWith("فَعَلَة")) {
      result = `${cleanFa}ُ${cleanAin}اةٌ`; // e.g. قُضَاةٌ / طُوَاةٌ / وُعَاةٌ
    } else if (pattern.startsWith("فُعَّل")) {
      result = `${cleanFa}ُ${cleanAin}َّى`; // e.g. رُمًّى / غُزًّى
    } else if (pattern.startsWith("فُعَّال")) {
      result = `${cleanFa}ُ${cleanAin}َّاءٌ`; // e.g. رُمَّاءٌ / قُضَّاءٌ
    } else if (pattern === "فَوَاعِلُ") {
      result = `${cleanFa}َوَ${cleanAin}ٍ`; // e.g. وَوَاقٍ (which then converts to أَوَاقٍ)
    } else {
      result = pattern
        .replace(/ل/g, cleanLam)
        .replace(/ع/g, cleanAin)
        .replace(/ف/g, cleanFa);
    }
  }
  // Ajwaf special morphing:
  // - فِعْلَة under Ajwaf is morphed to 'فِيَلَة' (e.g., قِيَلَةٌ for root ق-و-ل)
  else if (binaKey === "ajwaf") {
    if (pattern.startsWith("فِعْلَة")) {
      result = `${cleanFa}ِيَ${cleanLam}َةٌ`; // e.g. قِيَلَةٌ / ثِيَرَةٌ
    } else if (pattern.startsWith("فَعَلَة")) {
      result = `${cleanFa}َ${cleanAin}َ${cleanLam}َةٌ`; // e.g. قَوَمَةٌ / بَيَعَةٌ
    } else {
      result = pattern
        .replace(/ل/g, cleanLam)
        .replace(/ع/g, cleanAin)
        .replace(/ف/g, cleanFa);
    }
  }
  // Muda'af special morphing:
  // - فَعَلَة/فِعْلَة under Muda'af is morphed to 'فُعَّلَة' (e.g. مُدَّدَةٌ)
  else if (binaKey === "mudaaf") {
    if (pattern.startsWith("فَعَلَة") || pattern.startsWith("فِعْلَة")) {
      result = `${cleanFa}ُ${cleanAin}َّ${cleanLam}َةٌ`; // e.g. مُدَّدَةٌ
    } else {
      result = pattern
        .replace(/ل/g, cleanLam)
        .replace(/ع/g, cleanAin)
        .replace(/ف/g, cleanFa);
    }
  }
  else {
    result = pattern
      .replace(/ل/g, cleanLam)
      .replace(/ع/g, cleanAin)
      .replace(/ف/g, cleanFa);
  }

  // Rule for Mitsal & Lafif Mafruq (wawu pertama diganti hamzah pada muntahal/fawa'il):
  if (result.startsWith("وَوَ") || result.startsWith("وَو")) {
    result = result.replace(/^وَوَ/, "أَوَ").replace(/^وَو/, "أَو");
  }

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
    result = result.replace(/ِي|ِي\+?[ييو]ٌ?$/g, "ِيُّ");
  }
  if (binaKey === "naqish" || binaKey.startsWith("lafif")) {
    result = result.replace(/ِيْ?[يio]ٌ?$/g, "ِيُّ").replace(/ِيْ?[ييو]ٌ?$/g, "ِيُّ");
  }

  return result;
}

/**
 * Formats patterns with instantiated roots.
 */
function formatPluralList(patterns: string[], fa: string, ain: string, lam: string, binaKey: string): string {
  if (!patterns || patterns.length === 0) return "—";
  return patterns.map(p => {
    let word = replaceRootForIsimFail(p, fa, ain, lam, binaKey);
    if (p.includes("فِعْلَة")) {
      word = `${word} (nadzir)`;
    }
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
      qillah = formatPluralList(["أَفْعِلَةٌ", "فِعْلَةٌ"], fa, ain, lam, binaKey);
      katsroh = formatPluralList(["فُعَّالٌ", "فُعَّلٌ", "فَعَلَةٌ"], fa, ain, lam, binaKey);
      muntahal = formatPluralList(["فَوَاعِلُ", "فَعَائِلُ"], fa, ain, lam, binaKey);
      contoh = "كَاتِب ← كُتَّابٌ / كُتَّبٌ / كَتَبَةٌ";
      ilalRule = "Sesuai kaidah standar shorof sahih tanpa adanya pembuangan atau penukaran huruf illat.";
      explanation = `Isim Fail bagi Bina Shohih mengikuti wazan-wazan utama Jamak Taksir secara utuh. Jamak Qillah diwakili oleh wazan أَفْعِلَةٌ dan فِعْلَةٌ. Jamak Katsroh terbentuk kokoh melalui wazan baku فُعَّالٌ, فُعَّلٌ, dan فَعَلَةٌ, serta Shighot Muntahal Jumu' berpola فَوَاعِلُ dan فَعَائِلُ.`;
      break;

    case "ajwaf":
      qillah = formatPluralList(["فِعْلَةٌ"], fa, ain, lam, binaKey);
      katsroh = formatPluralList(["فُعَّالٌ", "فُعَّلٌ", "فَعَلَةٌ"], fa, ain, lam, binaKey);
      muntahal = formatPluralList(["فَوَاعِلُ"], fa, ain, lam, binaKey);
      contoh = "قَائِل ← قُوَّالٌ / قُوَّمٌ / قَوَمَةٌ";
      ilalRule = "Qalbu waw/ya (perubahan huruf illat di posisi Ain fi'il menjadi alif atau ya).";
      explanation = `Isim Fail bagi Bina Ajwaf mengalami penyesuaian huruf di bagian tengah (Ain fi'il). Bentuk Qillah seperti فِعْلَةٌ diubah menjadi wazan ber-morfing dengan ya' sukun (misalnya قِيلَةٌ). Jamak Katsroh terbentuk melalui wazan فُعَّالٌ, فُعَّلٌ, dan فَعَلَةٌ, sedangkan Shighot Muntahal Jumu' mengikuti wazan فَوَاعِلُ (contoh: قَوَائِلُ).`;
      break;

    case "mitsal":
      qillah = formatPluralList(["أَفْعِلَةٌ"], fa, ain, lam, binaKey);
      katsroh = formatPluralList(["فُعَّالٌ", "فُعَّلٌ", "فَعَلَةٌ"], fa, ain, lam, binaKey);
      muntahal = formatPluralList(["فَوَاعِلُ"], fa, ain, lam, binaKey);
      contoh = "وَاعِد ← وُقَّافٌ / وُقَّفٌ / وَقَفَةٌ";
      ilalRule = "Hazf waw fa' (pelepasan huruf waw di awal kata pada turunan tertentu).";
      explanation = `Isim Fail Bina Mitsal melestarikan huruf waw di sebahagian wazan, namun melepaskannya pada beberapa bentuk jamak ringkas (contoh: عُدَّة dari وَاعِد). Jamak Qillah-nya berstruktur أَفْعِلَةٌ, Jamak Katsroh berpola فُعَّالٌ, فُعَّلٌ, dan فَعَلَةٌ, dan Shighot Muntahal Jumu' berpola فَوَاعِلُ.`;
      break;

    case "naqish":
      qillah = formatPluralList(["فِعْلَةٌ"], fa, ain, lam, binaKey);
      katsroh = formatPluralList(["فُعَّالٌ", "فُعَّلٌ", "فَعَلَةٌ"], fa, ain, lam, binaKey);
      muntahal = formatPluralList(["فُعَلَةٌ"], fa, ain, lam, binaKey);
      contoh = "قَاضٍ ← قُضَّاءٌ / قُضَّى / قُضَاةٌ";
      ilalRule = "Hazf ya + tanwin (penghapusan huruf ya pada mutakallim dengan tanwin munasabah).";
      explanation = `Isim Fail Bina Naqis mengalami I'lal kuat di akhir kata akibat melemahnya Lam fi'il. Bentuk Qillah فِعْلَةٌ berubah melalui aturan pergantian menjadi akhiran alif-ta marbutho (contoh: قُضَاةٌ). Jamak katsroh terbentuk dari wazan فُعَّالٌ, فُعَّلٌ, dan فَعَلَةٌ. Shighot Muntahal Jumu' juga selaras di wazan فُعَلَةٌ.`;
      break;

    case "mudaaf":
      qillah = formatPluralList(["فِعْلَةٌ"], fa, ain, lam, binaKey);
      katsroh = formatPluralList(["فُعَّالٌ", "فُعَّلٌ", "فَعَلَةٌ"], fa, ain, lam, binaKey);
      muntahal = formatPluralList(["فُعَّالٌ"], fa, ain, lam, binaKey);
      contoh = "مَادّ ← مُدَّادٌ / مُدَّدٌ / مُدَّدَةٌ";
      ilalRule = "Idgham dan Fakk (perlindapan atau penguraian dua huruf sejenis).";
      explanation = `Isim Fail Bina Muda'af menyatukan huruf sejenis melalui Idgham kohesi tinggi (contoh: مُدَّادٌ dari مَادّ) atau mengurainya dalam wazan katsroh baku "فُعَّالٌ, فُعَّلٌ, فَعَلَةٌ" menjadi مُدَّادٌ, مُدَّدٌ, dan مُدَّدَةٌ.`;
      break;

    case "mahmuz":
      qillah = formatPluralList(["أَفْعِلَةٌ", "فِعْلَةٌ"], fa, ain, lam, binaKey);
      katsroh = formatPluralList(["فُعَّالٌ", "فُعَّلٌ", "فَعَلَةٌ"], fa, ain, lam, binaKey);
      muntahal = formatPluralList(["فَوَاعِلُ", "فَعَائِلُ"], fa, ain, lam, binaKey);
      contoh = "سَائِل ← سُؤَّالٌ / سُؤَّلٌ / سَأَلَةٌ";
      ilalRule = "Tash-hil/Naql hamzah (kemudahan lafadz hamzah).";
      explanation = `Isim Fail Bina Mahmuz mengikuti pola murni Shohih namun disesuaikan penulisan hamzahnya sesuai aturan harakat (hamzah kursi). Contoh jamak katsroh populer adalah wazan فُعَّالٌ, فُعَّلٌ, dan فَعَلَةٌ (seperti سُؤَّالٌ, سُؤَّلٌ, سَأَلَةٌ).`;
      break;

    case "lafif_maqrun":
      qillah = formatPluralList(["فِعْلَةٌ"], fa, ain, lam, binaKey);
      katsroh = formatPluralList(["فُعَّالٌ", "فُعَّلٌ", "فَعَلَةٌ"], fa, ain, lam, binaKey);
      muntahal = formatPluralList(["فَوَاعِلُ"], fa, ain, lam, binaKey);
      contoh = "طَاوٍ ← طُوَّاءٌ / طُوَّى / طُوَاةٌ";
      ilalRule = "Hazf ya + qalbu (penyesuaian ganda huruf illat berdampingan).";
      explanation = `Isim Fail Bina Lafif Maqrun mengadaptasi I'lal ganda karena bertemunya dua huruf lemah berdampingan di akhir. Jamak katsroh mengadaptasi model "فُعَّالٌ, فُعَّلٌ, فَعَلَةٌ" menjadi طُوَّاءٌ, طُوَّى, dan طُوَاةٌ.`;
      break;

    case "lafif_mafruq":
      qillah = formatPluralList(["فِعْلَةٌ"], fa, ain, lam, binaKey);
      katsroh = formatPluralList(["فُعَّالٌ", "فُعَّلٌ", "فَعَلَةٌ"], fa, ain, lam, binaKey);
      muntahal = formatPluralList(["فَوَاعِلُ"], fa, ain, lam, binaKey);
      contoh = "وَاعٍ ← وُعَّاءٌ / وُعَّى / وُعَاةٌ";
      ilalRule = "Hazf waw + ya' (pelenyapan huruf illat di posisi Fa dan Lam fi'il).";
      explanation = `Isim Fail Bina Lafif Mafruq mengalami modifikasi ganda di awal dan di akhir kata. Katsroh dirumuskan dengan menggunakan wazan "فُعَّالٌ, فُعَّلٌ, فَعَلَةٌ" menjadi وُعَّاءٌ, وُعَّى, dan وُعَاةٌ.`;
      break;
  }

  const finalExplanation = `${explanation}\n\n• Kaidah I'lal: ${ilalRule}\n• Contoh Klasik: ${contoh}`;

  if (entry.jamaTaksirSamai) {
    if (qillah === "—" || qillah === "—" || !qillah) {
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

export const analyzeIsimFailPlural = analyzeIsimFail;
