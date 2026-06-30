/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { DictionaryEntry, PluralSifatMusyabihat } from "../types";

/**
 * Helper to normalize bina types.
 */
export function getPluralBinaKey(bina: string): string {
  const norm = (bina || "").toLowerCase().trim();
  if (norm.includes("shohih") || norm === "sahih") return "sahih";
  if (norm.includes("ajwaf")) return "ajwaf";
  if (norm.includes("mitsal")) return "mitsal";
  if (norm === "naqis" || norm.includes("naqish")) return "naqish";
  if (norm.includes("muda") || norm.includes("mudho") || norm.includes("ganda")) return "mudaaf";
  if (norm.includes("mahmuz")) return "mahmuz";
  if (norm === "lafif maqrun" || norm === "lafif mafruq" || norm.includes("lafif")) return "lafif";
  return "sahih";
}

/**
 * Helper to normalize Arabic spelling, such as converting hamzah-on-top-with-kasra to hamzah-on-bottom.
 */
function normalizeArabicSpelling(str: string): string {
  if (!str || str === "—" || str === "-") return str;

  let normalized = str;

  // 1. Bila terdapat dua hamzah berurutan di awal kata, yang pertama berharokat fathah (أَ) dan kedua sukun (أْ) atau fathah, tulis dengan Alif Maddah (آ)
  normalized = normalized.replace(/(?<=^|\s)أَأْ/g, "آ");
  normalized = normalized.replace(/(?<=^|\s)أَأ/g, "آ");

  // 2. Jika di awal lafadz Hamzah yang berharokat dhommah tulis dengan أ, jika kasroh tulis dengan bentuk إ
  normalized = normalized.replace(/(?<=^|\s)[أإؤئءا]ُ/g, "أُ");
  normalized = normalized.replace(/(?<=^|\s)[أإؤئءا]ِ/g, "إِ");

  // 3. Bila sebelum alif maka bentuk tulisan (آ)
  normalized = normalized.replace(/[أإءؤئ][\u064b-\u065f]?ا/g, "آ");
  normalized = normalized.replace(/آا/g, "آ");

  // 4. Bila sesudah ya' sukun atau di harokati kasroh maka bentuk penulisan (ئ) - hanya untuk tengah/akhir kata
  normalized = normalized.replace(/([ييْىىْ])[\u064b-\u065f]?[أإءؤ]/g, "$1ئ");
  normalized = normalized.replace(/(?<!^|\s)[أإءؤ]ِ/g, "ئِ");
  normalized = normalized.replace(/(?<!^|\s)[أإءؤ]ٍ/g, "ئٍ");

  // 5. Bila sesudah wawu sukun atau di harokati dhommah maka bentuk penulisan (ؤ) - hanya untuk tengah/akhir kata
  normalized = normalized.replace(/(و[\u064b-\u065f]?)[أإءئ](?![ٍِ])/g, "$1ؤ");
  normalized = normalized.replace(/(?<!^|\s)[أإء]ُ/g, "ؤُ");
  normalized = normalized.replace(/(?<!^|\s)[أإء]ٌ/g, "ؤٌ");

  // Final hamzah with dhommah/tanwin dhommah spelling rule (kept as isolated hamzah ء)
  normalized = normalized.replace(/[أإؤئء]([ٌُ])(?=$|\s|[\s,;،.?\/()\]}]|@)/g, "ء$1");

  return normalized;
}

/**
 * Substitutes root letters into a wazan pattern for Sifat Musyabihat.
 */
export function substituteSifatPattern(
  pattern: string,
  fa: string,
  ain: string,
  lam: string,
  binaKey: string
): string {
  const raw = substituteSifatPatternRaw(pattern, fa, ain, lam, binaKey);
  return normalizeArabicSpelling(raw);
}

function substituteSifatPatternRaw(
  pattern: string,
  fa: string,
  ain: string,
  lam: string,
  binaKey: string
): string {
  const cleanFa = fa.replace(/[\u064b-\u065f]/g, "").trim();
  const cleanAin = ain.replace(/[\u064b-\u065f]/g, "").trim();
  const cleanLam = lam.replace(/[\u064b-\u065f]/g, "").trim();

  if (!cleanFa || !cleanAin || !cleanLam) return "—";

  if (pattern === "فَاعِلٌ") {
    if (binaKey === "naqish" || binaKey === "lafif") {
      return `${cleanFa}َا${cleanAin}ٍ`;
    }
    return `${cleanFa}َا${cleanAin}ِ${cleanLam}ٌ`;
  }

  if (pattern === "فَاعِلَةٌ") {
    if (binaKey === "naqish" || binaKey === "lafif") {
      return `${cleanFa}َا${cleanAin}ِيَةٌ`;
    }
    return `${cleanFa}َا${cleanAin}ِ${cleanLam}َةٌ`;
  }

  if (pattern === "فُعَاةٌ") {
    return `${cleanFa}ُ${cleanAin}َاةٌ`;
  }

  if (pattern === "فُعَّالٌ") {
    return `${cleanFa}ُ${cleanAin}َّا${cleanLam}ٌ`;
  }

  if (pattern === "فُعَّلٌ") {
    return `${cleanFa}ُ${cleanAin}َّ${cleanLam}ٌ`;
  }

  if (pattern === "أَفْعَلُ") {
    if (binaKey === "mudaaf") {
      return `أَ${cleanFa}َ${cleanLam}ُّ`;
    } else if (binaKey === "ajwaf") {
      return `أَ${cleanFa}َا${cleanLam}ُ`;
    } else if (binaKey === "naqish" || binaKey === "lafif") {
      return `أَ${cleanFa}ْ${cleanAin}َى`;
    }
    return `أَ${cleanFa}ْ${cleanAin}َ${cleanLam}ُ`;
  }

  if (pattern === "فَعْلَاءُ") {
    if (binaKey === "mudaaf") {
      return `${cleanFa}َ${cleanAin}َّاءُ`;
    } else if (binaKey === "naqish" || binaKey === "lafif") {
      return `${cleanFa}َ${cleanAin}ْوَاءُ`;
    }
    return `${cleanFa}َ${cleanAin}ْ${cleanLam}َاءُ`;
  }

  if (pattern === "فَعْلَانُ") {
    if (binaKey === "naqish" || binaKey === "lafif") {
      return `${cleanFa}َ${cleanAin}ْيَانُ`;
    }
    return `${cleanFa}َ${cleanAin}ْ${cleanLam}َانُ`;
  }

  if (pattern === "فَعْلَى") {
    if (binaKey === "naqish" || binaKey === "lafif") {
      return `${cleanFa}َ${cleanAin}ْيَى`;
    }
    return `${cleanFa}َ${cleanAin}ْ${cleanLam}ى`;
  }

  if (pattern === "فَعِيلٌ") {
    if (binaKey === "mudaaf") {
      return `${cleanFa}َ${cleanAin}ِ${cleanLam}ٌ`;
    } else if (binaKey === "ajwaf") {
      return `${cleanFa}َيِّ${cleanLam}ٌ`;
    } else if (binaKey === "naqish" || binaKey === "lafif") {
      return `${cleanFa}َ${cleanAin}ِىٌّ`;
    }
    return `${cleanFa}َ${cleanAin}ِي${cleanLam}ٌ`;
  }

  if (pattern === "فَعِيلَةٌ") {
    if (binaKey === "ajwaf") {
      return `${cleanFa}َيِّ${cleanLam}َةٌ`;
    } else if (binaKey === "naqish" || binaKey === "lafif") {
      return `${cleanFa}َ${cleanAin}ِيَّةٌ`;
    }
    return `${cleanFa}َ${cleanAin}ِي${cleanLam}َةٌ`;
  }

  if (pattern === "فَعِيَّةٌ") {
    return `${cleanFa}َ${cleanAin}ِيَّةٌ`;
  }

  if (pattern === "فَعَالٌ") {
    if (binaKey === "naqish" || binaKey === "lafif") {
      return `${cleanFa}َ${cleanAin}َاٍ`;
    }
    return `${cleanFa}َ${cleanAin}َا${cleanLam}ٌ`;
  }

  if (pattern === "فَعَالَةٌ") {
    if (binaKey === "naqish" || binaKey === "lafif") {
      return `${cleanFa}َ${cleanAin}َاِيَةٌ`;
    }
    return `${cleanFa}َ${cleanAin}َا${cleanLam}َةٌ`;
  }

  if (pattern === "فَعِلٌ") {
    if (binaKey === "naqish" || binaKey === "lafif") {
      return `${cleanFa}َ${cleanAin}ٍ`;
    }
    return `${cleanFa}َ${cleanAin}ِ${cleanLam}ٌ`;
  }

  if (pattern === "فَعِلَةٌ") {
    if (binaKey === "naqish" || binaKey === "lafif") {
      return `${cleanFa}َ${cleanAin}ِيَةٌ`;
    }
    return `${cleanFa}َ${cleanAin}ِ${cleanLam}َةٌ`;
  }

  if (pattern === "فَعَلٌ") {
    return `${cleanFa}َ${cleanAin}َ${cleanLam}ٌ`;
  }

  if (pattern === "فَعَلَةٌ") {
    return `${cleanFa}َ${cleanAin}َ${cleanLam}َةٌ`;
  }

  if (pattern === "فَعْلٌ") {
    if (binaKey === "mudaaf") {
      return `${cleanFa}َ${cleanLam}ٌّ`;
    }
    return `${cleanFa}َ${cleanAin}ْ${cleanLam}ٌ`;
  }

  if (pattern === "فَعْلَةٌ") {
    if (binaKey === "mudaaf") {
      return `${cleanFa}َ${cleanLam}َّةٌ`;
    }
    return `${cleanFa}َ${cleanAin}ْ${cleanLam}َةٌ`;
  }

  if (pattern === "فُعْلٌ") {
    if (binaKey === "mudaaf") {
      return `${cleanFa}ُ${cleanLam}ٌّ`;
    }
    return `${cleanFa}ُ${cleanAin}ْ${cleanLam}ٌ`;
  }

  if (pattern === "فُعْلَانُ") {
    return `${cleanFa}ُ${cleanAin}ْ${cleanLam}َانُ`;
  }

  if (pattern === "فُعَالَى") {
    return `${cleanFa}ُ${cleanAin}َ${cleanLam}َى`;
  }

  if (pattern === "فَعَالَى") {
    return `${cleanFa}َ${cleanAin}َا${cleanLam}َى`;
  }

  if (pattern === "فُعُلٌ") {
    if (binaKey === "mudaaf") return `${cleanFa}ُ${cleanLam}ٌّ`;
    return `${cleanFa}ُ${cleanAin}ُ${cleanLam}ٌ`;
  }

  if (pattern === "أَفَاعِيلُ") {
    return `أَ${cleanFa}َا${cleanAin}ِي${cleanLam}ُ`;
  }

  if (pattern === "فَعَائِيٌّ") {
    return `${cleanFa}َ${cleanAin}َائِيٌّ`;
  }

  if (pattern === "مَفَاعِلُ") {
    return `مَ${cleanFa}َا${cleanAin}ِ${cleanLam}ُ`;
  }

  if (pattern === "فُعُولٌ") {
    if (binaKey === "mudaaf") return `${cleanFa}ُ${cleanLam}ُّ`;
    return `${cleanFa}ُ${cleanAin}ُو${cleanLam}ٌ`;
  }

  if (pattern === "فِعَالٌ") {
    return `${cleanFa}ِ${cleanAin}َا${cleanLam}ٌ`;
  }

  if (pattern === "أَفْعَالٌ") {
    return `أَ${cleanFa}ْ${cleanAin}َا${cleanLam}ٌ`;
  }

  if (pattern === "فَعِلُونَ") {
    return `${cleanFa}َ${cleanAin}ِ${cleanLam}ُونَ`;
  }

  if (pattern === "فُعَلَاءُ") {
    return `${cleanFa}ُ${cleanAin}َ${cleanLam}َاءُ`;
  }

  if (pattern === "أَفْعِلَاءُ") {
    return `أَ${cleanFa}ْ${cleanAin}ِ${cleanLam}َاءُ`;
  }

  if (pattern === "أَفِعَّاءُ") {
    return `أَ${cleanFa}ِ${cleanLam}َّاءُ`;
  }

  if (pattern === "أَفْعِيَّاءُ") {
    return `أَ${cleanFa}ْ${cleanAin}ِيَّاءُ`;
  }

  if (pattern === "مَفَاعِيلُ") {
    return `مَ${cleanFa}َا${cleanAin}ِي${cleanLam}ُ`;
  }

  if (pattern === "فَعَائِلُ") {
    return `${cleanFa}َ${cleanAin}َائِ${cleanLam}ُ`;
  }

  if (pattern === "فَعَايَا") {
    return `${cleanFa}َ${cleanAin}َايَا`;
  }

  // Safe multi-pass replace using unique placeholders to prevent collisions
  return pattern
    .replace(/ف/g, "__FA__")
    .replace(/ع/g, "__AIN__")
    .replace(/ل/g, "__LAM__")
    .replace(/__FA__/g, cleanFa)
    .replace(/__AIN__/g, cleanAin)
    .replace(/__LAM__/g, cleanLam);
}

/**
 * Analyzes Sifat Musyabihat plurals and singular forms for a single raw mufrod string.
 */
export function analyzeSingleSifatMusyabihat(entry: DictionaryEntry, rawSifat: string): PluralSifatMusyabihat {
  const fa = entry.root.fa;
  const ain = entry.root.ain;
  const lam = entry.root.lam;
  const bina = entry.bina || "Shohih";
  const binaKey = getPluralBinaKey(bina);

  // Detect which wazan is active from rawSifat
  let activeWazan = "";
  const cleanSifat = rawSifat.replace(/[\u064b-\u065f]/g, "").trim();

  if (rawSifat.includes("فَعَال") || rawSifat.includes("جَبَان") || rawSifat.includes("جَوَاد") || (cleanSifat.length === 4 && cleanSifat[2] === "ا" && !cleanSifat.startsWith("أ") && !rawSifat.includes("فَاعِل"))) {
    activeWazan = "فَعَالٌ";
  } else if (rawSifat.includes("فَاعِل") || rawSifat.includes("شَاف") || (cleanSifat.length === 3 && cleanSifat[1] === "ا" && (binaKey === "naqish" || binaKey === "lafif" || rawSifat.endsWith("ٍ"))) || (cleanSifat.startsWith("آ") && cleanSifat.length === 3)) {
    activeWazan = "فَاعِلٌ";
  } else if (rawSifat.includes("أَفْعَل") || rawSifat.includes("أَحْمَر") || rawSifat.includes("أَعْمَ") || (cleanSifat.startsWith("أ") && cleanSifat.length === 4 && cleanSifat[2] !== "ي")) {
    activeWazan = "أَفْعَلُ";
  } else if (rawSifat.includes("فَعْلَان") || rawSifat.includes("عَطْشَان") || cleanSifat.endsWith("ان")) {
    activeWazan = "فَعْلَانُ";
  } else if (binaKey === "naqish" || binaKey === "lafif") {
    // Naqis & Lafif sifat musyabihat are فَعِيلٌ (except if they are أَفْعَلُ like أَعْمَى)
    activeWazan = "فَعِيلٌ";
  } else if (rawSifat.includes("فَعِل") || rawSifat.includes("فَرِح") || rawSifat.includes("تَعِب") || rawSifat.includes("فَهِم") || rawSifat.includes("خَوِف") || rawSifat.includes("لَعِب") || rawSifat.includes("ضَحِك") || (cleanSifat.length === 3 && rawSifat.includes("ِ") && !rawSifat.includes("ّ") && !cleanSifat.endsWith("ي") && !cleanSifat.endsWith("ى"))) {
    activeWazan = "فَعِلٌ";
  } else if (rawSifat.includes("حَسَن") || rawSifat.includes("بَطَل") || rawSifat.includes("فَعَل") || cleanSifat === "حسن" || cleanSifat === "batal" || cleanSifat === "بطل" || (cleanSifat.length === 3 && !rawSifat.includes("ِ") && !rawSifat.includes("ُ") && !rawSifat.includes("ْ") && !rawSifat.includes("ّ") && !cleanSifat.endsWith("ي") && !cleanSifat.endsWith("ى"))) {
    activeWazan = "فَعَلٌ";
  } else if (rawSifat.includes("صَعْب") || rawSifat.includes("سَهْل") || rawSifat.includes("فَعْل")) {
    activeWazan = "فَعْلٌ";
  } else if (rawSifat.includes("فَعُول") || rawSifat.includes("صَبُور") || rawSifat.includes("شَكُور") || cleanSifat.includes("عول") || (cleanSifat.length === 4 && cleanSifat[2] === "و")) {
    activeWazan = "فَعُولٌ";
  } else if (rawSifat.includes("فَعِيل") || rawSifat.includes("كَريم") || rawSifat.includes("عَليم") || cleanSifat.includes("عil") || (cleanSifat.length === 4 && (cleanSifat[2] === "ي" || cleanSifat[2] === "ى")) || cleanSifat.endsWith("ىء") || cleanSifat.endsWith("يء")) {
    activeWazan = "فَعِيلٌ";
  }

  const isSamai = activeWazan === "فَعَلٌ" || activeWazan === "فَعْلٌ";

  // Instantiated singulars and plurals
  let mufrod_mudzakkar = "";
  let mufrod_muannas = "";
  let katsroh = "";
  let qillah = "-.";
  let muntahal = "-.";
  let reference = "Lisanul 'Arab, Tajul 'Arus";
  let explanation = "";

  // Apply requirements for jamak taksir & muannas
  if (activeWazan === "" || activeWazan === "tidak_sesuai_pola" || activeWazan === "Tidak Sesuai Pola") {
    mufrod_mudzakkar = rawSifat;
    mufrod_muannas = "-.";
    katsroh = "-.";
    qillah = "-.";
    muntahal = "-.";
    explanation = `Lafadz "${rawSifat}" tidak sesuai dengan pola/wazan Sifat Musyabihat standar.`;
    activeWazan = "Tidak Sesuai Pola";
  } else if (activeWazan === "أَفْعَلُ") {
    mufrod_mudzakkar = substituteSifatPattern("أَفْعَلُ", fa, ain, lam, binaKey);
    mufrod_muannas = substituteSifatPattern("فَعْلَاءُ", fa, ain, lam, binaKey);
    const isWarna = /merah|kuning|hijau|biru|putih|hitam|warna|color|red|yellow|green|blue|white|black/i.test(entry.translation || "");
    if (isWarna) {
      katsroh = substituteSifatPattern("فُعْلٌ", fa, ain, lam, binaKey);
    } else {
      katsroh = `${substituteSifatPattern("فُعْلٌ", fa, ain, lam, binaKey)} / ${substituteSifatPattern("فُعْلَانُ", fa, ain, lam, binaKey)}`;
    }
    qillah = "-.";
    muntahal = "-.";
    explanation = "Sifat Musyabihat berwazan أَفْعَلُ (muannats: فَعْلَاءُ). Jamak taksirnya memakai فُعْلٌ (untuk makna warna) atau keduanya فُعْلٌ / فُعْلَانُ (untuk makna cacat).";
  } else if (activeWazan === "فَعْلَانُ") {
    mufrod_mudzakkar = substituteSifatPattern("فَعْلَانُ", fa, ain, lam, binaKey);
    mufrod_muannas = substituteSifatPattern("فَعْلَى", fa, ain, lam, binaKey);
    katsroh = substituteSifatPattern("فِعَالٌ", fa, ain, lam, binaKey);
    qillah = "-.";
    muntahal = substituteSifatPattern("فَعَالَى", fa, ain, lam, binaKey);
    explanation = "Sifat Musyabihat berwazan فَعْلَانُ (muannats: فَعْلَى), jamak taksirnya adalah فِعَالٌ, dan muntahal jumu' فَعَالَى.";
  } else if (activeWazan === "فَعَلٌ") {
    mufrod_mudzakkar = substituteSifatPattern("فَعَلٌ", fa, ain, lam, binaKey);
    mufrod_muannas = substituteSifatPattern("فَعَلَةٌ", fa, ain, lam, binaKey);
    katsroh = substituteSifatPattern("فِعَالٌ", fa, ain, lam, binaKey);
    qillah = "-.";
    muntahal = substituteSifatPattern("مَفَاعِلُ", fa, ain, lam, binaKey);
    explanation = "Sifat Musyabihat berwazan فَعَلٌ (muannats: فَعَلَةٌ), jamak taksirnya adalah فِعَالٌ, dan muntahal jumu' مَفَاعِلُ.";
  } else if (activeWazan === "فَعِلٌ") {
    mufrod_mudzakkar = substituteSifatPattern("فَعِلٌ", fa, ain, lam, binaKey);
    mufrod_muannas = substituteSifatPattern("فَعِلَةٌ", fa, ain, lam, binaKey);
    katsroh = `${substituteSifatPattern("أَفْعَالٌ", fa, ain, lam, binaKey)} / ${substituteSifatPattern("فَعِلُونَ", fa, ain, lam, binaKey)}`;
    qillah = "-.";
    muntahal = "-.";
    explanation = "Sifat Musyabihat berwazan فَعِلٌ (muannats: فَعِلَةٌ), jamak taksirnya adalah أَفْعَالٌ atau فَعِلُونَ.";
  } else if (activeWazan === "فَعْلٌ") {
    mufrod_mudzakkar = substituteSifatPattern("فَعْلٌ", fa, ain, lam, binaKey);
    mufrod_muannas = substituteSifatPattern("فَعْلَةٌ", fa, ain, lam, binaKey);
    katsroh = `${substituteSifatPattern("فِعَالٌ", fa, ain, lam, binaKey)} / ${substituteSifatPattern("فُعُولٌ", fa, ain, lam, binaKey)}`;
    qillah = "-.";
    muntahal = "-.";
    explanation = "Sifat Musyabihat berwazan فَعْلٌ (muannats: فَعْلَةٌ), jamak taksirnya adalah فِعَالٌ (umum) atau فُعُولٌ (sedikit).";
  } else if (activeWazan === "فَعَالٌ") {
    mufrod_mudzakkar = substituteSifatPattern("فَعَالٌ", fa, ain, lam, binaKey);
    mufrod_muannas = substituteSifatPattern("فَعَالَةٌ", fa, ain, lam, binaKey);
    katsroh = `${substituteSifatPattern("فُعْلٌ", fa, ain, lam, binaKey)} / ${substituteSifatPattern("فُعَلَاءُ", fa, ain, lam, binaKey)} / ${substituteSifatPattern("أَفْعَالٌ", fa, ain, lam, binaKey)}`;
    qillah = "-.";
    muntahal = substituteSifatPattern("أَفَاعِيلُ", fa, ain, lam, binaKey);
    explanation = "Sifat Musyabihat berwazan فَعَالٌ (muannats: فَعَالَةٌ), jamak taksirnya adalah فُعْلٌ / فُعَلَاءُ / أَفْعَالٌ, dan muntahal jumu' أَفَاعِيلُ.";
  } else if (activeWazan === "فَعُولٌ") {
    mufrod_mudzakkar = substituteSifatPattern("فَعُولٌ", fa, ain, lam, binaKey);
    mufrod_muannas = "-.";
    katsroh = substituteSifatPattern("فُعُلٌ", fa, ain, lam, binaKey);
    qillah = "-.";
    muntahal = "-.";
    explanation = "Sifat Musyabihat berwazan فَعُولٌ (untuk mudzakkar dan muannats sama), jamak taksirnya adalah فُعُلٌ secara qiyasi.";
  } else if (activeWazan === "فَاعِلٌ") {
    mufrod_mudzakkar = "-";
    mufrod_muannas = "-";
    katsroh = "-";
    qillah = "-";
    muntahal = "-";
    explanation = "Wazan فَاعِلٌ dikecualikan dari Sifat Musyabihat sesuai instruksi.";
    activeWazan = "-";
  } else {
    // Default or فَعِيلٌ
    mufrod_mudzakkar = substituteSifatPattern("فَعِيلٌ", fa, ain, lam, binaKey);

    if (binaKey === "mitsal") {
      katsroh = `${substituteSifatPattern("فُعَلَاءُ", fa, ain, lam, binaKey)} / ${substituteSifatPattern("فِعَالٌ", fa, ain, lam, binaKey)}`;
      mufrod_muannas = substituteSifatPattern("فَعِيلَةٌ", fa, ain, lam, binaKey);
      muntahal = substituteSifatPattern("فَعَائِلُ", fa, ain, lam, binaKey);
      explanation = "Wazan فَعِيلٌ bina Mitsal memiliki jamak taksir فُعَلَاء atau فِعَال, muannats berwazan فَعِيلَة, dan shighot muntahal jumu' فَعَائِل.";
    } else if (binaKey === "mahmuz") {
      const isMahmuzLam = (entry.bina || "").toLowerCase().includes("lam") || lam === "ء" || lam === "أ";
      if (isMahmuzLam) {
        katsroh = `${substituteSifatPattern("فُعَلَاءُ", fa, ain, lam, binaKey)} / ${substituteSifatPattern("أَفْعِلَاءُ", fa, ain, lam, binaKey)}`;
        mufrod_muannas = substituteSifatPattern("فَعِيلَةٌ", fa, ain, lam, binaKey);
        muntahal = `${substituteSifatPattern("فَعَايَا", fa, ain, lam, binaKey)} / ${substituteSifatPattern("فَعَائِيٌّ", fa, ain, lam, binaKey)}`;
        explanation = "Wazan فَعِيلٌ bina Mahmuz Lam memiliki jamak taksir فُعَلَاء atau أَفْعِلَاء, muannats berwazan فَعِيلَة, dan shighot muntahal jumu' فَعَايَا / فَعَائِيّ.";
      } else {
        katsroh = `${substituteSifatPattern("فُعَلَاءُ", fa, ain, lam, binaKey)} / ${substituteSifatPattern("فِعَالٌ", fa, ain, lam, binaKey)}`;
        mufrod_muannas = substituteSifatPattern("فَعِيلَةٌ", fa, ain, lam, binaKey);
        muntahal = substituteSifatPattern("فَعَائِلُ", fa, ain, lam, binaKey);
        explanation = "Wazan فَعِيلٌ bina Mahmuz (Fa/Ain) memiliki jamak taksir فُعَلَاء atau فِعَال, muannats berwazan فَعِيلَة, dan shighot muntahal jumu' فَعَائِل.";
      }
    } else if (binaKey === "mudaaf") {
      katsroh = substituteSifatPattern("أَفِعَّاءُ", fa, ain, lam, binaKey);
      mufrod_muannas = substituteSifatPattern("فَعِيلَةٌ", fa, ain, lam, binaKey);
      muntahal = substituteSifatPattern("فَعَائِلُ", fa, ain, lam, binaKey);
      explanation = "Wazan فَعِيلٌ bina Mudhoaf memiliki jamak taksir أَفِعَّاء, muannats berwazan فَعِيلَة, dan shighot muntahal jumu' فَعَائِل.";
    } else if (binaKey === "naqish") {
      katsroh = substituteSifatPattern("أَفْعِيَّاءُ", fa, ain, lam, binaKey);
      mufrod_muannas = substituteSifatPattern("فَعِيَّةٌ", fa, ain, lam, binaKey);
      muntahal = substituteSifatPattern("فَعَايَا", fa, ain, lam, binaKey);
      explanation = "Wazan فَعِيلٌ bina Naqis memiliki jamak taksir أَفْعِيَّاء, muannats berwazan فَعِيَّة, dan shighot muntahal jumu' فَعَايَا.";
    } else if (binaKey === "lafif") {
      katsroh = substituteSifatPattern("أَفْعِيَّاءُ", fa, ain, lam, binaKey);
      mufrod_muannas = substituteSifatPattern("فَعِيَّةٌ", fa, ain, lam, binaKey);
      muntahal = substituteSifatPattern("فَعَايَا", fa, ain, lam, binaKey);
      explanation = "Wazan فَعِيلٌ bina Lafif memiliki jamak taksir أَفْعِيَّاء, muannats berwazan فَعِيَّة, dan shighot muntahal jumu' فَعَايَا.";
    } else if (binaKey === "ajwaf") {
      katsroh = substituteSifatPattern("فِعَالٌ", fa, ain, lam, binaKey);
      mufrod_muannas = substituteSifatPattern("فَعِيلَةٌ", fa, ain, lam, binaKey);
      muntahal = substituteSifatPattern("فَعَائِلُ", fa, ain, lam, binaKey);
      explanation = "Wazan فَعِيلٌ bina Ajwaf memiliki jamak taksir فِعَالٌ, muannats berwazan فَعِيلَة, dan shighot muntahal jumu' فَعَائِل.";
    } else {
      katsroh = `${substituteSifatPattern("فُعَلَاءُ", fa, ain, lam, binaKey)} / ${substituteSifatPattern("فِعَالٌ", fa, ain, lam, binaKey)} / ${substituteSifatPattern("أَفْعِلَاءُ", fa, ain, lam, binaKey)}`;
      mufrod_muannas = substituteSifatPattern("فَعِيلَةٌ", fa, ain, lam, binaKey);
      muntahal = substituteSifatPattern("فَعَائِلُ", fa, ain, lam, binaKey);
      explanation = "Wazan فَعِيلٌ bina Shohih memiliki jamak taksir فُعَلَاء, فِعَال, atau أَفْعِلَاء, muannats berwazan فَعِيلَة, dan shighot muntahal jumu' فَعَائِل.";
    }
    qillah = "-.";
  }

  return {
    katsroh,
    qillah,
    muntahal,
    reference,
    explanation,
    isQiyasi: activeWazan !== "Tidak Sesuai Pola" && !isSamai && activeWazan !== "-",
    isSamai,
    wazan_name: activeWazan,
    mufrod_mudzakkar,
    mufrod_muannas,
  };
}

/**
 * Analyzes Sifat Musyabihat plurals and singular forms based on the dictionary entry.
 */
export function analyzeSifatMusyabihatPlural(entry: DictionaryEntry): PluralSifatMusyabihat {
  const rawSifats = (entry.sifatMusyabihat || "")
    .split(/[\/,]/)
    .map(s => s.trim())
    .filter(s => s.length > 0 && s !== "/" && s !== "atau" && s !== "dan");

  let computed: PluralSifatMusyabihat;
  if (rawSifats.length <= 1) {
    computed = analyzeSingleSifatMusyabihat(entry, rawSifats[0] || entry.sifatMusyabihat || "");
  } else {
    const results = rawSifats.map(s => analyzeSingleSifatMusyabihat(entry, s));

    // Merge the results
    const mufrod_mudzakkars = results.map(r => r.mufrod_mudzakkar).filter(x => x && x !== "—" && x !== "-" && x !== "-.");
    const mufrod_muannases = results.map(r => r.mufrod_muannas).filter(x => x && x !== "—" && x !== "-" && x !== "-.");
    const katsrohs = results.map(r => r.katsroh).filter(x => x && x !== "—" && x !== "-" && x !== "-.");
    const qillahs = results.map(r => r.qillah).filter(x => x && x !== "—" && x !== "-" && x !== "-.");
    const muntahals = results.map(r => r.muntahal).filter(x => x && x !== "—" && x !== "-" && x !== "-.");
    const wazans = results.map(r => r.wazan_name).filter(x => x);

    computed = {
      katsroh: katsrohs.length > 0 ? katsrohs.join(" / ") : "-.",
      qillah: qillahs.length > 0 ? qillahs.join(" / ") : "-.",
      muntahal: muntahals.length > 0 ? muntahals.join(" / ") : "-.",
      reference: results[0].reference,
      explanation: "",
      isQiyasi: results.some(r => r.isQiyasi),
      isSamai: results.every(r => r.isSamai),
      wazan_name: wazans.join(" / "),
      mufrod_mudzakkar: mufrod_mudzakkars.length > 0 ? mufrod_mudzakkars.join(" / ") : "-.",
      mufrod_muannas: mufrod_muannases.length > 0 ? mufrod_muannases.join(" / ") : "-.",
    };
  }

  // Combine jamak qillah and katsroh under computed.katsroh if qillah exists
  if (computed.qillah && computed.qillah !== "-." && computed.qillah !== "-") {
    if (computed.katsroh && computed.katsroh !== "-." && computed.katsroh !== "-") {
      computed.katsroh = `${computed.qillah} / ${computed.katsroh}`;
    } else {
      computed.katsroh = computed.qillah;
    }
  }
  computed.qillah = "-.";

  // Check if we have custom entries in dictionaryData under entry.sifatMusyabihatPlural
  if (entry.sifatMusyabihatPlural) {
    const custom = entry.sifatMusyabihatPlural;
    
    // Merge: if a custom field is provided and is not empty/placeholder, use it, else use computed
    const finalMufrodMudzakkar = custom.mufrod_mudzakkar && custom.mufrod_mudzakkar !== "-" && custom.mufrod_mudzakkar !== "-." ? custom.mufrod_mudzakkar : computed.mufrod_mudzakkar;
    const finalMufrodMuannas = custom.mufrod_muannas && custom.mufrod_muannas !== "-" && custom.mufrod_muannas !== "-." ? custom.mufrod_muannas : computed.mufrod_muannas;
    
    // Combine custom qillah and katsroh if they are explicitly given in dictionaryData
    let finalKatsroh = computed.katsroh;
    if (custom.katsroh && custom.katsroh !== "-" && custom.katsroh !== "-.") {
      if (custom.qillah && custom.qillah !== "-" && custom.qillah !== "-.") {
        finalKatsroh = `${custom.qillah} / ${custom.katsroh}`;
      } else {
        finalKatsroh = custom.katsroh;
      }
    } else if (custom.qillah && custom.qillah !== "-" && custom.qillah !== "-.") {
      finalKatsroh = custom.qillah;
    }

    const finalMuntahal = custom.muntahal && custom.muntahal !== "-" && custom.muntahal !== "-." ? custom.muntahal : computed.muntahal;
    
    return {
      ...computed,
      mufrod_mudzakkar: finalMufrodMudzakkar,
      mufrod_muannas: finalMufrodMuannas,
      katsroh: finalKatsroh,
      qillah: "-.",
      muntahal: finalMuntahal,
      explanation: "", // completely clear out explanation as per "hapus explanation"
    };
  }

  // If no custom entries in dictionaryData, just return computed with empty explanation
  return {
    ...computed,
    explanation: "",
  };
}
