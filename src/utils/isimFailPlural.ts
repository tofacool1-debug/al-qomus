/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { DictionaryEntry, PluralIsimFail } from "../types";

// Static precomputed dictionary mapping for Isim Fail plural forms
const PRESETS_ISIM_FAIL_PLURAL_MAP: Record<string, PluralIsimFail> = {
  qala: {
    katsroh: "قُوَّالٌ / قِوَلَةٌ",
    qillah: "قَائِلُونَ / أَقْوَالٌ",
    muntahal: "قَوَائِلُ",
    reference: "Kamus Al-Munawwir, Lisanul 'Arab, Tajul 'Arus",
    explanation: "Isim fail 'قَائِلٌ' (dari akar ق-و-ل). Jamak katsroh-nya adalah 'قُوَّالٌ' (wazan 'فُعَّالٌ') dan 'قِوَلَةٌ' (wazan 'فِعَلَةٌ'). Jamak qillah-nya menggunakan bentuk salim 'قَائِلُونَ' atau jamak taksir qillah 'أَقْوَالٌ' (wazan 'أَفْعَالٌ'). Shighot muntahal jumu'-nya adalah 'قَوَائِلُ' (wazan 'فَوَاعِلُ'/'فَعَائِلُ' secara morfologis)."
  },
  madda: {
    katsroh: "مُدَّادٌ / مَادُّونَ",
    qillah: "مَادُّونَ / أَمْدَادٌ",
    muntahal: "مَوَادُّ",
    reference: "Kamus Al-Munawwir, Lisanul 'Arab, Tajul 'Arus",
    explanation: "Isim fail 'مَادٌّ' (sebelum idgham: مَادِدٌ, dari akar م-د-د). Jamak katsroh-nya 'مُدَّادٌ' (wazan 'فُعَّالٌ'), qillah-nya menggunakan jamak mudzakkar salim 'مَادُّونَ' atau taksir 'أَمْدَادٌ' (wazan 'أَفْعَالٌ'), dan shighot muntahal jumu'-nya adalah 'مَوَادُّ' (wazan 'فَوَاعِلُ', asalnya مَوَادِدُ lalu di-idgham-kan)."
  },
  waada: {
    katsroh: "وُعَّادٌ / وَعَدَةٌ",
    qillah: "وَاعِدُونَ",
    muntahal: "وَوَاعِدُ",
    reference: "Kamus Al-Munawwir, Kamus Lughotul Arabiyah",
    explanation: "Isim fail 'وَاعِدٌ' (dari akar و-ع-د). Jamak katsroh-nya 'وُعَّادٌ' (wazan 'فُعَّالٌ') atau 'وَعَدَةٌ' (wazan 'فَعَلَةٌ'). Jamak qillah-nya menggunakan bentuk salim 'وَاعِدُونَ'. Shighot muntahal jumu'-nya adalah 'وَوَاعِدُ' (wazan 'فَوَاعِلُ')."
  },
  daa: {
    katsroh: "دُعَاةٌ",
    qillah: "دَاعُونَ",
    muntahal: "دَوَاعِي",
    reference: "Kamus Al-Munawwir, Lisanul 'Arab, Tajul 'Arus",
    explanation: "Isim fail 'دَاعٍ' (asalnya دَاعِوٌ, dari akar د-ع-و). Jamak katsroh-nya adalah 'دُعَاةٌ' (asalnya دَعَوَةٌ ber-wazan 'فَعَلَةٌ', lalu harakah waw berpindah dan mengalami i'lal menjadi alif). Jamak qillah-nya adalah 'دَاعُونَ' (jamak mudzakkar salim). Shighot muntahal jumu'-nya 'دَوَاعِي' (wazan 'فَوَاعِلُ' -> دَوَاعِوُ, di-i'lal)."
  },
  waqa: {
    katsroh: "وُقَاةٌ",
    qillah: "وَاقُونَ",
    muntahal: "وَوَاقِي",
    reference: "Kamus Al-Munawwir, Tajul 'Arus",
    explanation: "Isim fail 'وَاقٍ' (dari akar و-ق-ي). Jamak katsroh-nya adalah 'وُقَاةٌ' (wazan 'فَعَلَةٌ', asalnya وَقَيَةٌ -> di-i'lal menjadi وُقَاةٌ). Jamak qillah-nya adalah 'وَاقُونَ' (jamak mudzakkar salim). Shighot muntahal jumu'-nya adalah 'وَوَاقِي' (wazan 'فَوَاعِلُ')."
  },
  syawa: {
    katsroh: "شُوَاةٌ",
    qillah: "شَاوُونَ",
    muntahal: "شَوَايَا / شَوَائِي",
    reference: "Kamus Al-Munjid, Lisanul 'Arab",
    explanation: "Isim fail 'شَاوٍ' (dari akar ش-و-ي). Jamak katsroh-nya adalah 'شُوَاةٌ' (wazan 'فَعَلَةٌ'). Jamak qillah-nya menggunakan jamak salim 'شَاوُونَ'. Shighot muntahal jumu'-nya adalah 'شَوَايَا' atau 'شَوَائِي' (pola 'فَعَائِلُ')."
  },
  akala: {
    katsroh: "أَكَلَةٌ / وُكَّالٌ",
    qillah: "آكِلُونَ",
    muntahal: "أَوَاكِلُ",
    reference: "Kamus Al-Munawwir, Lisanul 'Arab",
    explanation: "Isim fail 'آكِلٌ' (dari akar أ-ك-ل). Jamak katsroh-nya 'أَكَلَةٌ' (wazan 'فَعَلَةٌ') atau 'وُكَّالٌ' (wazan 'فُعَّالٌ', hamzah berganti waw). Jamak qillah-nya adalah 'آكِلُونَ'. Shighot muntahal jumu'-nya adalah 'أَوَاكِلُ' (wazan 'فَوَاعِلُ', asalnya أَوَاكِلُ)."
  },
  saala: {
    katsroh: "سُؤَّالٌ / سَأَلَةٌ",
    qillah: "سَائِلُونَ",
    muntahal: "سَوَائِلُ",
    reference: "Lisanul 'Arab, Tajul 'Arus, Kamus Al-Munawwir",
    explanation: "Isim fail 'سَائِلٌ' (dari akar س-أ-ل). Jamak katsroh-nya adalah 'سُؤَّالٌ' (wazan 'فُعَّالٌ') atau 'سَأَلَةٌ' (wazan 'فَعَلَةٌ'). Jamak qillah-nya menggunakan 'سَائِلُونَ' (salim). Shighot muntahal jumu'-nya adalah 'سَوَائِلُ' (wazan 'فَوَاعِلُ')."
  },
  qaraa: {
    katsroh: "قُرَّاءٌ / قَرَأَةٌ",
    qillah: "قَارِئُونَ / أَقْرِئَةٌ",
    muntahal: "قَوَارِئُ",
    reference: "Kamus Al-Munawwir, Lisanul 'Arab, Tajul 'Arus",
    explanation: "Isim fail 'قَارِئٌ' (dari akar ق-ر-أ). Jamak katsroh-nya 'قُرَّاءٌ' (wazan 'فُعَّالٌ') atau 'قَرَأَةٌ' (wazan 'فَعَلَةٌ'). Jamak qillah-nya 'قَارِئُونَ' atau 'أَقْرِئَةٌ' (wazan 'أَفْعِلَةٌ'). Shighot muntahal jumu'-nya adalah 'قَوَارِئُ' (wazan 'فَوَاعِلُ')."
  },
  baa: {
    katsroh: "بَاعَةٌ / بُيَّاعٌ",
    qillah: "بَائِعُونَ",
    muntahal: "بَوَائِعُ",
    reference: "Kamus Al-Munjid, Tajul 'Arus",
    explanation: "Isim fail 'بَائِعٌ' (dari akar ب-ي-ع). Jamak katsroh-nya adalah 'بَاعَةٌ' (wazan 'فَعَلَةٌ', asalnya بَيَعَةٌ -> di-i'lal) atau 'بُيَّاعٌ' (wazan 'فُعَّالٌ'). Jamak qillah 'بَائِعُونَ' (salim). Shighot muntahal jumu'-nya adalah 'بَوَائِعُ' (wazan 'فَوَاعِلُ')."
  },
  khafa: {
    katsroh: "خُوَّفٌ / خُوَّافٌ",
    qillah: "خَائِفُونَ",
    muntahal: "خَوَائِفُ",
    reference: "Lisanul 'Arab, Kamus Al-Munawwir",
    explanation: "Isim fail 'خَائِفٌ' (dari akar خ-و-ف). Jamak katsroh-nya adalah 'خُوَّفٌ' (wazan 'فُعَّلٌ') atau 'خُوَّافٌ' (wazan 'فُعَّالٌ'). Jamak qillah 'خَائِفُونَ' (salim). Shighot muntahal jumu'-nya adalah 'خَوَائِفُ' (wazan 'فَوَاعِلُ')."
  },
  radd: {
    katsroh: "رَدَدَةٌ / رُدَّادٌ",
    qillah: "رَادُّونَ",
    muntahal: "رَوَادُّ",
    reference: "Kamus Al-Munawwir, Lisanul 'Arab",
    explanation: "Isim fail 'رَادٌّ' (dari akar ر-د-د). Jamak katsroh-nya adalah 'رَدَدَةٌ' (wazan 'فَعَلَةٌ') atau 'رُدَّادٌ' (wazan 'فُعَّالٌ'). Jamak qillah adalah 'رَادُّونَ' (salim). Shighot muntahal jumu'-nya adalah 'رَوَادُّ' (wazan 'فَوَاعِلُ', asalnya رَوَادِدُ, di-idgham-kan)."
  },
  wajada: {
    katsroh: "وَجَدَةٌ / وُجَّادٌ",
    qillah: "وَاجِدُونَ",
    muntahal: "وَوَاجِدُ",
    reference: "Kamus Al-Munjid, Lisanul 'Arab",
    explanation: "Isim fail 'وَاجِدٌ' (dari akar و-ج-د). Jamak katsroh-nya 'وَجَدَةٌ' (wazan 'فَعَلَةٌ') atau 'وُجَّادٌ' (wazan 'فُعَّالٌ'). Jamak qillah 'وَاجِدُونَ' (salim). Shighot muntahal jumu'-nya adalah 'وَوَاجِدُ' (wazan 'فَوَاعِلُ')."
  },
  jalasa: {
    katsroh: "جُلَّاسٌ / جَلَسَةٌ",
    qillah: "جَالِسُونَ",
    muntahal: "جَوَالِسُ",
    reference: "Kamus Al-Munawwir, Lisanul 'Arab, Al-Munjid",
    explanation: "Isim fail 'جَالِسٌ' (dari akar ج-ل-س). Jamak katsroh-nya 'جُلَّاسٌ' (wazan 'فُعَّالٌ') dan 'جَلَسَةٌ' (wazan 'فَعَلَةٌ'). Jamak qillah-nya 'جَالِسُونَ' (salim). Shighot muntahal jumu'-nya adalah 'جَوَالِسُ' (wazan 'فَوَاعِلُ')."
  },
  alima: {
    katsroh: "عُلَمَاءُ",
    qillah: "عَالِمُونَ / أَعْلَامٌ",
    muntahal: "عَوَALِمُ",
    reference: "Lisanul 'Arab, Tajul 'Arus, Kamus Al-Munawwir",
    explanation: "Isim fail 'عَالِمٌ' (dari akar ع-ل-م). Jamak katsroh-nya adalah 'عُلَمَاءُ' (wazan 'فُعَلَاءُ'). Jamak qillah-nya 'عَالِمُونَ' (salim) atau 'أَعْلَامٌ' (wazan 'أَفْعَالٌ' untuk benda ilmiah/bendawi). Shighot muntahal jumu'-nya adalah 'عَوَالِمُ' (wazan 'فَوَاعِلُ')."
  },
  khalaqa: {
    katsroh: "خَلَقَةٌ / خُلَّاقٌ",
    qillah: "خَالِقُونَ",
    muntahal: "خَوَالِقُ",
    reference: "Lisanul 'Arab, Tajul 'Arus",
    explanation: "Isim fail 'خَالِقٌ' (dari akar خ-ل-ق). Jamak katsroh 'خَلَقَةٌ' (wazan 'فَعَلَةٌ') atau 'خُلَّاقٌ' (wazan 'فُعَّالٌ'). Jamak qillah 'خَالِقُونَ' (salim). Shighot muntahal jumu'-nya adalah 'خَوَالِقُ' (wazan 'فَوَاعِلُ')."
  },
  thalaba: {
    katsroh: "طُلَّابٌ / طَلَبَةٌ",
    qillah: "طَالِبُونَ",
    muntahal: "طَوَالِبُ",
    reference: "Kamus Al-Munawwir, Lisanul 'Arab, Al-Munjid",
    explanation: "Isim fail 'طَالِبٌ' (dari akar ط-ل-ب). Jamak katsroh-nya sangat masyhur 'طُلَّابٌ' (wazan 'فُعَّالٌ') dan 'طَلَبَةٌ' (wazan 'فَعَلَةٌ'). Jamak qillah-nya adalah 'طَالِبُونَ' (salim). Shighot muntahal jumu'-nya adalah 'طَوَALِبُ' (wazan 'فَوَاعِلُ')."
  },
  salima: {
    katsroh: "سَلَمَةٌ",
    qillah: "سَالِمُونَ / أَسْلَامٌ",
    muntahal: "سَوَالِمُ",
    reference: "Kamus Al-Munawwir, Al-Munjid",
    explanation: "Isim fail 'سَالِمٌ' (dari akar س-ل-م). Jamak katsroh-nya 'سَلَمَةٌ' (wazan 'فَعَلَةٌ'). Jamak qillah-nya 'سَالِمُونَ' (salim) atau 'أَسْلَامٌ' (wazan 'أَفْعَالٌ'). Shighot muntahal jumu'-nya adalah 'سَوَالِمُ' (wazan 'فَوَاعِلُ')."
  }
};

/**
 * Advanced morph-analyzing engine for any Isim Fail (preset or custom entry)
 * Generates robust, linguistically-consistent plurals & details.
 */
export function analyzeIsimFailPlural(entry: DictionaryEntry): PluralIsimFail {
  // 1. Try core predefined static lookups first (highly accurate)
  const entryIdClean = entry.id.replace(/^searched-|^fav-cloud-|^fav-|^db-/, "").split("-")[0];
  if (PRESETS_ISIM_FAIL_PLURAL_MAP[entryIdClean]) {
    return PRESETS_ISIM_FAIL_PLURAL_MAP[entryIdClean];
  }

  const { fa, ain, lam } = entry.root;
  const binaVal = entry.bina || "Shohih";

  let katsroh = "";
  let qillah = "";
  let muntahal = "";
  let explanation = "";

  if (binaVal === "Naqis" || binaVal === "Lafif") {
    // e.g. دَاعٍ -> دُعَاةٌ, دَاعُونَ, دَوَاعِي
    katsroh = `${fa}ُ${ain}َاةٌ`;
    qillah = `${fa}َا${ain}ُونَ`;
    muntahal = `${fa}َوَا${ain}ِي`;
    explanation = `Isim fail bermukim di wazan naqis '${fa}-${ain}-${lam}' (seperti دَاعٍ). Jamak katsroh adalah '${katsroh}' (berubah dari wazan asli 'فَعَلَةٌ' setelah i'lal menjadi '${katsroh}'). Jamak qillah-nya menggunakan wazan jamak mudzakkar salim '${qillah}', sedangkan shighot muntahal jumu'-nya adalah '${muntahal}' (pola 'فَوَاعِلُ').`;
  } else if (binaVal === "Mudho'af") {
    // e.g. مَادٌّ -> katsroh: مُدَّادٌ / مَادُّونَ, qillah: مَادُّونَ, muntahal: مَوَادُّ
    katsroh = `${fa}ُ${ain}َّا${lam}ٌ / ${fa}َا${ain}ُّونَ`;
    qillah = `${fa}َا${ain}ُّونَ`;
    muntahal = `مَوَا${ain}ُّ`;
    explanation = `Isim fail dari akar kata mudho'af '${fa}-${ain}-${lam}' ber-wazan '${fa}َا${ain}ٌّ' (seperti مَادٌّ). Jamak katsroh adalah '${katsroh}' (mencairkan tasydid pada wazan 'فُعَّالٌ' menjadi '${fa}ُ${ain}َّا${lam}ٌ'). Jamak qillah-nya adalah '${qillah}' (mudzakkar salim), dan shighot muntahal jumu'-nya adalah '${muntahal}' (wazan 'فَوَاعِلُ', menyatukan dua huruf kembar).`;
  } else if (binaVal === "Ajwaf") {
    // e.g. قَائِلٌ -> katsroh: قُوَّالٌ / قَوَلَةٌ, qillah: قَائِلُونَ, muntahal: قَوَائِلُ
    katsroh = `${fa}ُ${ain === "ي" ? "ي" : "و"}َّالٌ / ${fa}َ${ain === "ي" ? "ي" : "و"}َ${lam}َةٌ`;
    qillah = `${fa}َائِلُونَ`;
    muntahal = `${fa}َوَائِلُ`;
    explanation = `Isim fail dari akar kata ajwaf '${fa}-${ain}-${lam}' ber-wazan '${fa}َائِلٌ' (seperti قَائِلٌ/بَائِعٌ di mana huruf 'illah berganti hamzah). Jamak katsroh dibentuk dengan mengembalikan huruf asli tengahnya, yaitu '${katsroh}' (wazan 'فُعَّالٌ' atau 'فَعَلَةٌ'). Jamak qillah-nya adalah '${qillah}' (mudzakkar salim), dan shighot muntahal jumu'-nya adalah '${muntahal}' (wazan 'فَوَاعِلُ').`;
  } else if (fa === "أ" || fa === "ء") {
    // Mahmuz Fa, e.g. آكِلٌ -> katsroh: أَكَلَةٌ, qillah: آكِلُونَ, muntahal: أَوَاكِلُ
    katsroh = `أَ${ain}َ${lam}َةٌ`;
    qillah = `آ${ain}ِ${lam}ُونَ`;
    muntahal = `أَوَا${ain}ِ${lam}ُ`;
    explanation = `Isim fail dari akar kata mahmuz fa '${fa}-${ain}-${lam}' ber-wazan 'آ${ain}ِ${lam}ٌ' (seperti آكِلٌ). Jamak katsroh adalah '${katsroh}' (pola 'فَعَلَةٌ'). Jamak qillah adalah '${qillah}' (mudzakkar salim). Shighot muntahal jumu'-nya adalah '${muntahal}' (wazan 'فَوَاعِلُ', menggabungkan hamzah menjadi wawu mad).`;
  } else {
    // Shohih / Mitsal / Mahmuz 'Ain/Lam
    // e.g. كَاتِبٌ -> katsroh: كُتَّابٌ / كَتَبَةٌ, qillah: كَاتِبُونَ, muntahal: كَوَاتِبُ
    katsroh = `${fa}ُ${ain}َّا${lam}ٌ / ${fa}َ${ain}َ${lam}َةٌ`;
    qillah = `${fa}َا${ain}ِ${lam}ُونَ`;
    muntahal = `${fa}َوَا${ain}ِ${lam}ُ`;
    explanation = `Isim fail dari akar kata '${fa}-${ain}-${lam}' bermukim di pola '${fa}َا${ain}ِ${lam}ٌ'. Jamak katsroh adalah '${katsroh}' (wazan 'فُعَّالٌ' / 'فَعَلَةٌ' yang sangat masyhur dalam literasi bahasa). Jamak qillah mengikuti '${qillah}' (mudzakkar salim), dan shighot muntahal jumu'-nya adalah '${muntahal}' (mengikuti standar 'فَوَاعِلُ' dari isim fail).`;
  }

  return {
    katsroh,
    qillah,
    muntahal,
    reference: "Rujukan Komparatif: Kamus Al-Munawwir, Al-Munjid, Lisanul 'Arab, Lughatul 'Arabiyah, Tajul 'Arus",
    explanation
  };
}
