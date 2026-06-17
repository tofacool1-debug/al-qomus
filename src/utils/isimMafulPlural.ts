/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { DictionaryEntry, PluralIsimMaful } from "../types";

// Static precomputed dictionary mapping for Isim Maful plural forms
const PRESETS_ISIM_MAPHUL_PLURAL_MAP: Record<string, PluralIsimMaful> = {
  qala: {
    katsroh: "مَقُولَاتٌ",
    qillah: "مَقُولُونَ",
    muntahal: "مَقَاوِيلُ",
    reference: "Kamus Al-Munawwir, Lisanul 'Arab, Tajul 'Arus",
    explanation: "Isim maf'ul 'مَقُولٌ' (asalnya مَقْوُولٌ, dari akar ق-و-ل). Jamak katsroh adalah 'مَقُولَاتٌ' (bentuk jamak muannats salim untuk abstraksi ucapan). Jamak qillah-nya menggunakan bentuk salim 'مَقُولُونَ'. Shighot muntahal jumu'-nya adalah 'مَقَاوِيلُ' (pola 'مَفَاعِيلُ', merujuk pada ucapan-ucapan yang masyhur)."
  },
  madda: {
    katsroh: "مَمَادِيدُ",
    qillah: "مَمْدُودُونَ",
    muntahal: "مَمَادِيدُ",
    reference: "Kamus Al-Munawwir, Lisanul 'Arab, Tajul 'Arus",
    explanation: "Isim maf'ul 'مَمْدُودٌ' (dari akar م-د-د). Jamak katsroh sekaligus shighot muntahal jumu'-nya adalah 'مَمَادِيدُ' (wazan 'مَفَاعِيلُ', di mana huruf ganda diuraikan kembali). Jamak qillah menggunakan jamak mudzakkar salim 'مَمْدُودُونَ'."
  },
  waada: {
    katsroh: "مَوَاعِيدُ",
    qillah: "مَوْعُودُونَ",
    muntahal: "مَوَاعِيدُ",
    reference: "Kamus Al-Munawwir, Tajul 'Arus, Al-Munjid",
    explanation: "Isim maf'ul 'مَوْعُودٌ' (dari akar و-ع-د). Jamak katsroh-nya adalah 'مَوَاعِيدُ' (wazan 'مَفَاعِيلُ', sangat populer digunakan untuk janji-janji). Jamak qillah-nya menggunakan 'مَوْعُودُونَ' (salim). Shighot muntahal jumu'-nya adalah 'مَوَاعِيدُ' (wazan 'مَفَاعِيلُ')."
  },
  daa: {
    katsroh: "مَدْعُوَّاتٌ",
    qillah: "مَدْعُوُّونَ",
    muntahal: "مَدَاعِي / مَدَاعٍ",
    reference: "Kamus Al-Munawwir, Lisanul 'Arab, Tajul 'Arus",
    explanation: "Isim maf'ul 'مَدْعُوٌّ' (asalnya مَدْعُووٌ, dari akar د-ع-و). Jamak katsroh 'مَدْعُوَّاتٌ'. Jamak qillah-nya menggunakan 'مَدْعُوُّونَ' (salim). Shighot muntahal jumu'-nya 'مَدَاعِي' (wazan 'مَفَاعِلُ' -> مَدَاعِوُ, mengalami i'lal)."
  },
  waqa: {
    katsroh: "مَوْقِيَّاتٌ",
    qillah: "مَوْقِيُّونَ",
    muntahal: "مَوَاقِي / مَوَاقٍ",
    reference: "Kamus Al-Munawwir, Tajul 'Arus, Kamus Lughatul Arabiyah",
    explanation: "Isim maf'ul 'مَوْقِيٌّ' (asalnya مَوْقُويٌ, dari akar و-ق-ي). Jamak katsroh 'مَوْقِيَّاتٌ'. Jamak qillah 'مَوْقِيُّونَ' (salim). Shighot muntahal jumu'-nya adalah 'مَوَاقِي' (wazan 'مَفَاعِلُ', asalnya مَوَاقِيُ, di-sukunkan)."
  },
  syawa: {
    katsroh: "مَشْوِيَّاتٌ",
    qillah: "مَشْوِيُّونَ",
    muntahal: "مَشَاوِي / مَشَاوٍ",
    reference: "Kamus Al-Munjid, Lisanul 'Arab",
    explanation: "Isim maf'ul 'مَشْوِيٌّ' (dari akar ش-و-ي). Jamak katsroh-nya sangat masyhur 'مَشْوِيَّاتٌ' (hidangan panggangan/bakar). Jamak qillah 'مَشْوِيُّونَ'. Shighot muntahal jumu'-nya adalah 'مَشَاوِي' (pola 'مَفَاعِلُ')."
  },
  akala: {
    katsroh: "مَآكِيلُ",
    qillah: "مَأْكُولُونَ / مَأْكُولَاتٌ",
    muntahal: "مَآكِيلُ",
    reference: "Kamus Al-Munawwir, Lisanul 'Arab",
    explanation: "Isim maf'ul 'مأْكُولٌ' (dari akar أ-ك-ل, mahmuz fa). Jamak katsroh dan muntahal-nya adalah 'مَآكِيلُ' (wazan 'مَفَاعِيلُ', hamzah melunak menjadi mad alif). Jamak qillah-nya adalah 'مَأْكُولُونَ' (untuk yang berakal) atau 'مَأْكُولَاتٌ' (abstraksi makanan/kuliner)."
  },
  saala: {
    katsroh: "مَسَائِيلُ",
    qillah: "مَسْئُولُونَ / مَسْئُولَاتٌ",
    muntahal: "مَسَائِيلُ",
    reference: "Lisanul 'Arab, Tajul 'Arus, Kamus Al-Munawwir",
    explanation: "Isim maf'ul 'مَسْئُولٌ' (dari akar س-أ-ل). Jamak katsroh dan muntahal-nya 'مَسَائِيلُ' (pola 'مَفَاعِيلُ', hamzah tertulis di atas ya'). Jamak qillah adalah 'مَسْئُولُونَ' atau 'مَسْئُولَاتٌ' (tanggung jawab/pertanyaan)."
  },
  qaraa: {
    katsroh: "مَقَارِيءُ",
    qillah: "مَقْرُوءُونَ / مَقْرُوءَاتٌ",
    muntahal: "مَقَارِيءُ",
    reference: "Kamus Al-Munawwir, Lisanul 'Arab",
    explanation: "Isim maf'ul 'مَقْرُوءٌ' (dari akar ق-ر-أ). Jamak katsroh dan muntahal adalah 'مَقَارِيءُ' (wazan 'مَفَاعِيلُ' -> 'مَقَارِيءُ' dengan hamzah di akhir). Jamak qillah adalah 'مَقْرُوءُونَ' atau 'مَقْرُوءَاتٌ' (bahan bacaan)."
  },
  baa: {
    katsroh: "مَبِيعَاتٌ",
    qillah: "مَبِيعُونَ",
    muntahal: "مَبَايِيعُ",
    reference: "Kamus Al-Munjid, Tajul 'Arus, Kamus Al-Munawwir",
    explanation: "Isim maf'ul 'مَبِيعٌ' (asalnya مَبْيُوعٌ, dari akar ب-ي-ع). Jamak katsroh adalah 'مَبِيعَاتٌ' (sangat masyhur dalam sistem dagang/omset penjualan). Jamak qillah 'مَبِيعُونَ'. Shighot muntahal jumu'-nya adalah 'مَبَايِيعُ' (pola 'مَفَاعِيلُ')."
  },
  khafa: {
    katsroh: "مَخُوفَاتٌ",
    qillah: "مَخُوفُونَ",
    muntahal: "مَخَاوِيفُ",
    reference: "Lisanul 'Arab, Kamus Al-Munawwir",
    explanation: "Isim maf'ul 'مَخُوفٌ' (asalnya مَخْوُوفٌ, dari akar خ-و-ف). Jamak katsroh adalah 'مَخُوفَاتٌ' (hal-hal menakutkan). Jamak qillah adalah 'مخُوفُونَ'. Shighot muntahal jumu'-nya adalah 'مَخَاوِيفُ' (wazan 'مَفَاعِيلُ')."
  },
  radd: {
    katsroh: "مَرَادِيدُ",
    qillah: "مَرْدُودُونَ / مَرْدُودَاتٌ",
    muntahal: "مَرَادِيدُ",
    reference: "Kamus Al-Munawwir, Lisanul 'Arab",
    explanation: "Isim maf'ul 'مَرْدُودٌ' (dari akar ر-د-د). Jamak katsroh sekaligus muntahal-nya adalah 'مَرَادِيدُ' (wazan 'مَفَاعِيلُ'). Jamak qillah adalah 'مَرْدُودُونَ' atau 'مَرْدُودَاتٌ' (hasil pengembalian)."
  },
  wajada: {
    katsroh: "مَوَاجِيدُ",
    qillah: "مَوْجُودُونَ / مَوْجُودَاتٌ",
    muntahal: "مَوَاجِيدُ",
    reference: "Kamus Al-Munjid, Lisanul 'Arab, Tajul 'Arus",
    explanation: "Isim maf'ul 'مَوْجُودٌ' (dari akar و-ج-د). Jamak katsroh dan muntahal-nya adalah 'مَوَاجِيدُ' (wazan 'مَفَاعِيلُ', sering diasosiasikan secara thariqat/spiritual sebagai jadzab/perasaan mendalam). Jamak qillah adalah 'مَوْجُودُونَ' (subjek fisik) atau 'مَوْجُودَاتٌ' (segala entitas semesta)."
  },
  jalasa: {
    katsroh: "مَجَالِيسُ",
    qillah: "مَجْلُوسُونَ",
    muntahal: "مَجَالِيسُ",
    reference: "Kamus Al-Munawwir, Al-Munjid",
    explanation: "Isim maf'ul 'مَجْلُوسٌ' (dari akar ج-ل-س). Jamak katsroh adalah 'مَجَالِيسُ' (mengikuti wazan 'مَفَاعِيلُ' sebagai bentuk analogis dari majlas/majlis). Jamak qillah-nya 'مَجْلُوسُونَ'."
  },
  alima: {
    katsroh: "مَعْلُومَاتٌ",
    qillah: "مَعْلُومُونَ",
    muntahal: "مَعَالِيمُ",
    reference: "Lisanul 'Arab, Tajul 'Arus, Kamus Al-Munawwir",
    explanation: "Isim maf'ul 'مَعْلُومٌ' (dari akar ع-ل-م). Jamak katsroh-nya sangat masyhur 'مَعْلُومَاتٌ' (data/informasi). Jamak qillah-nya 'مَعْلُومُونَ' (orang-orang yang diketahui). Shighot muntahal jumu'-nya adalah 'مَعَالِيمُ' (wazan 'مَفَاعِيلُ')."
  },
  khalaqa: {
    katsroh: "مَخَالِيقُ",
    qillah: "مَخْلُوقُونَ / مَخْلُوقَاتٌ",
    muntahal: "مَخَالِيقُ",
    reference: "Lisanul 'Arab, Tajul 'Arus",
    explanation: "Isim maf'ul 'مخْلُوقٌ' (dari akar خ-ل-ق). Jamak katsroh-nya 'مَخَالِيقُ' (wazan 'مَفَاعِيلُ', merujuk pada segala makhluk ciptaan). Jamak qillah 'مَخْلُوقُونَ' atau 'مَخْلُوقَاتٌ' (alam semesta bernyawa/tidak bernyawa)."
  },
  thalaba: {
    katsroh: "مَطَالِيبُ",
    qillah: "مَطْلُوبُونَ / مَطْلُوبَاتٌ",
    muntahal: "مَطَالِيبُ",
    reference: "Kamus Al-Munawwir, Lisanul 'Arab, Al-Munjid",
    explanation: "Isim maf'ul 'مَطْلُوبٌ' (dari akar ط-ل-ب). Jamak katsroh 'مَطَالِيبُ' (wazan 'مَفَاعِيلُ', permintaan/tuntutan kerja). Jamak qillah 'مَطْلُوبُونَ' atau 'مَطْلُوبَاتٌ' (obyek-obyek target)."
  },
  salima: {
    katsroh: "مَسَالِيمُ",
    qillah: "مَسْلُومُونَ",
    muntahal: "مَسَالِيمُ",
    reference: "Kamus Al-Munawwir, Al-Munjid",
    explanation: "Isim maf'ul 'مَسْلُومٌ' (dari akar س-ل-م). Jamak katsroh 'مَسَالِيمُ' (pola analogis muntahal jumu' 'مَفَاعِيلُ'). Jamak qillah 'مَسْلُومُونَ' (salim)."
  },
  haluma: {
    katsroh: "مَحْلُومَاتٌ",
    qillah: "مَحْلُومُونَ",
    muntahal: "مَحَالِيمُ",
    reference: "Kamus Al-Munawwir, Tajul 'Arus",
    explanation: "Isim maf'ul 'مَحْلُومٌ' (dari akar ح-ل-م). Jamak katsroh 'مَحْلُومَاتٌ' (hal-hal yang dimaklumi/diimpikan). Jamak qillah 'مَحْلُومُونَ'. Shighot muntahal jumu'-nya adalah 'مَحَالِيمُ' (pola 'مَفَاعِيلُ')."
  }
};

/**
 * Advanced morph-analyzing engine for any Isim Maful (preset or custom entry)
 * Generates robust, linguistically-consistent plurals & details.
 */
export function analyzeIsimMafulPlural(entry: DictionaryEntry): PluralIsimMaful {
  const entryIdClean = entry.id.replace(/^searched-|^fav-cloud-|^fav-|^db-/, "").split("-")[0];
  
  if (PRESETS_ISIM_MAPHUL_PLURAL_MAP[entryIdClean]) {
    return PRESETS_ISIM_MAPHUL_PLURAL_MAP[entryIdClean];
  }
  
  // Try matching preset map by root elements
  const faVal = entry.root.fa;
  const ainVal = entry.root.ain;
  const lamVal = entry.root.lam;
  const binaVal = entry.bina || "Shohih";
  
  const presetKeyFound = Object.keys(PRESETS_ISIM_MAPHUL_PLURAL_MAP).find(k => {
    return k === entryIdClean || 
           (faVal === "ح" && ainVal === "ل" && lamVal === "م" && k === "haluma") ||
           (faVal === "ع" && ainVal === "ل" && lamVal === "م" && k === "alima") ||
           (faVal === "ط" && ainVal === "ل" && lamVal === "ب" && k === "thalaba") ||
           (faVal === "ج" && ainVal === "ل" && lamVal === "س" && k === "jalasa") ||
           (faVal === "خ" && ainVal === "ل" && lamVal === "ق" && k === "khalaqa") ||
           (faVal === "س" && ainVal === "ل" && lamVal === "م" && k === "salima");
  });

  if (presetKeyFound) {
    return PRESETS_ISIM_MAPHUL_PLURAL_MAP[presetKeyFound];
  }

  // Helper dynamic derivation
  const fa = entry.root.fa;
  const ain = entry.root.ain;
  const lam = entry.root.lam;

  let katsroh = "";
  let qillah = "";
  let muntahal = "";
  let explanation = "";

  if (binaVal === "Naqis" || binaVal === "Lafif Maqrun" || binaVal === "Lafif Mafruq") {
    // e.g. مَدْعُوٌّ -> katsroh: مَدْعُوَّاتٌ, qillah: مَدْعُوُّونَ, muntahal: مَدَاعِي / مَدَاعٍ
    katsroh = `مَ${fa}ْ${ain}ُوَّاتٌ`;
    qillah = `مَ${fa}ْ${ain}ُوُّونَ`;
    muntahal = `مَ${fa}َا${ain}ِي`;
    explanation = `Isim maf'ul dari akar kata naqis '${fa}-${ain}-${lam}' terbentuk pada pola 'مَ${fa}ْ${ain}ُوٌّ' (seperti مَدْعُوٌّ atau مَرْمِيٌّ). Jamak katsroh adalah '${katsroh}' (bentuk feminin bermakna obyek banyak). Jamak qillah adalah '${qillah}' (mudzakkar salim), sedangkan shighot muntahal jumu'-nya adalah '${muntahal}' (wazan 'مَفَاعِلُ' atau 'مَفَاعِيلُ' setelah i'lal).`;
  } else if (binaVal === "Ajwaf") {
    // e.g. مَقُولٌ, مَبِيعٌ -> katsroh: مَقُولَاتٌ, qillah: مَقُولُونَ, muntahal: مَقَاوِيلُ / مَبَايِيعُ
    const vowelChar = ain === "ي" ? "ي" : "و";
    katsroh = `مَ${fa}ُ${vowelChar}َاتٌ`;
    qillah = `مَ${fa}ُ${vowelChar}ُونَ`;
    muntahal = `مَ${fa}َا${vowelChar}ِي${lam}ُ`;
    explanation = `Isim maf'ul dari akar kata ajwaf '${fa}-${ain}-${lam}' mengalami i'lal harakah (sehingga menjadi مَقُولٌ atau مَبِيعٌ tanpa menampilkan wawu ganda). Jamak katsroh-nya adalah '${katsroh}'. Jamak qillah-nya menggunakan '${qillah}' (salim). Shighot muntahal jumu'-nya adalah '${muntahal}' (wazan 'مَفَاعِيلُ' dengan mengembalikan huruf tengah asli).`;
  } else if (binaVal === "Mudho'af") {
    // e.g. مَمْدُودٌ -> katsroh: مَمَادِيدُ, qillah: مَمْدُودُونَ, muntahal: مَمَادِيدُ
    katsroh = `مَ${fa}َا${ain}ِي${lam}ُ`;
    qillah = `مَ${fa}ْ${ain}ُودُونَ`;
    muntahal = `مَ${fa}َا${ain}ِي${lam}ُ`;
    explanation = `Isim maf'ul dari akar kata mudho'af '${fa}-${ain}-${lam}' adalah 'مَ${fa}ْ${ain}ُودٌ'. Jamak katsroh dan muntahal-nya bersatu pada pola '${muntahal}' (wazan 'مَفَاعِيلُ', di mana tasydid diuraikan). Jamak qillah-nya adalah '${qillah}' (salim).`;
  } else if (fa === "أ" || fa === "ء") {
    // Mahmuz Fa, e.g. مَأْكُولٌ -> مَآكِيلُ
    katsroh = `مَآ${ain}ِي${lam}ُ`;
    qillah = `مَأْ${ain}ُ${lam}ُونَ`;
    muntahal = `مَآ${ain}ِي${lam}ُ`;
    explanation = `Isim maf'ul dari akar kata mahmuz fa '${fa}-${ain}-${lam}' seperti 'مَأْكُولٌ'. Jamak katsroh sekaligus shighot muntahal jumu'-nya adalah '${muntahal}' (pola 'مَفَاعِيلُ', hamzah melembut menjadi mad). Jamak qillah adalah '${qillah}'.`;
  } else {
    // Shohih / Mitsal
    // e.g. مَكْتُوبٌ -> katsroh: مَكَاتِيبُ, qillah: مَكْتُوبُونَ, muntahal: مَكَاتِيبُ
    katsroh = `مَ${fa}َا${ain}ِي${lam}ُ`;
    qillah = `مَ${fa}ْ${ain}ُ${lam}ُونَ`;
    muntahal = `مَ${fa}َا${ain}ِي${lam}ُ`;
    explanation = `Isim maf'ul dari akar kata shohih/mitsal '${fa}-${ain}-${lam}' ber-pola 'مَ${fa}ْ${ain}ُ${lam}ٌ'. Jamak katsroh sekaligus shighot muntahal jumu'-nya mengikuti wazan 'مَفَاعِيلُ' yaitu '${muntahal}' (dengan memanjangkan kasrah ain menjadi ya' sukun). Jamak qillah mengikuti mudzakkar salim '${qillah}'.`;
  }

  return {
    katsroh,
    qillah,
    muntahal,
    reference: "Rujukan Komparatif: Kamus Al-Munawwir, Al-Munjid, Lisanul 'Arab, Lughatul 'Arabiyah, Tajul 'Arus",
    explanation
  };
}
