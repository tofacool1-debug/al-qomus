/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { DictionaryEntry, PluralSifatMusyabihat } from "../types";

function cleanArabicWords(text: string): string {
  if (!text || text === "—") return text;
  
  // 1. Bila hamzah kasroh di tengah kata menjadi (ئ) contoh مسائل
  let result = text.replace(/([\u0621-\u064a])[أإء]ِ/g, "$1ئِ");

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

  return result;
}

function mergePluralValues(dbVal: string | undefined, formulaVal: string | undefined): string {
  const words: string[] = [];
  const seenStr = new Set<string>();

  const addWords = (text: string | undefined, isFromDb: boolean) => {
    if (!text || text === "—" || text.trim() === "(-)") return;
    const parts = text.split("/");
    for (let part of parts) {
      part = part.trim();
      if (!part || part === "—") continue;
      
      const normalized = part
        .replace(/\(.*\)/g, "")
        .replace(/[\u064b-\u065f\s]/g, "");
      
      if (normalized && !seenStr.has(normalized)) {
        seenStr.add(normalized);
        let wordWithLabel = part;
        if (isFromDb && !part.includes("(samai)") && !part.includes("(nadzir)")) {
          wordWithLabel = `${part} (samai)`;
        }
        words.push(wordWithLabel);
      }
    }
  };

  addWords(dbVal, true);
  addWords(formulaVal, false);

  if (words.length === 0) return "—";
  return words.join(" / ");
}

/**
 * Highly polished engine for Sifat Musyabihat Plurals with dynamic, accurate Arabic-compliant morphing.
 * Supports both classical Samā'ī entries (with direct dictionary mapping) and Qiyāsī templates
 * for intransitive (lāzim) verbs from fa'ila (Bab 4) and fa'ula (Bab 5).
 */
export function analyzeSifatMusyabihatPlural(entry: DictionaryEntry): PluralSifatMusyabihat {
  const { fa, ain, lam } = entry.root;
  const bina = entry.bina || "Shohih";

  const cleanFa = fa.replace(/[\u064b-\u065f]/g, "");
  const cleanAin = ain.replace(/[\u064b-\u065f]/g, "");
  const cleanLam = lam.replace(/[\u064b-\u065f]/g, "");

  // Safely grab singular form from the database
  let singular = entry.sifatMusyabihat 
    ? entry.sifatMusyabihat.split("/")[0].replace(/[\/]/g, "").trim() 
    : `${fa}َ${ain}ِي${lam}ٌ`;

  let qillah = "";
  let katsroh = "";
  let muntahal = "";
  let explanation = "";

  // 1. Special Case: Hasanun (حَسَنٌ)
  if (fa === "ح" && ain === "س" && lam === "ن") {
    singular = "حَسَنٌ";
    qillah = "أَحْسَانٌ";
    katsroh = "حِسَانٌ";
    muntahal = "مَحَاسِنُ";
    explanation = "Sifat Musyabihat 'حَسَنٌ' (Bina' Shohih) memiliki Jamak Qillah 'أَحْسَانٌ' (wazan أَفْعَال), Jamak Katsroh 'حِسَانٌ' (wazan فِعَال), dan Shighot Muntahal Jumu' khusus 'مَحَاسِنُ' (wazan مَفَاعِلُ) sesuai database rujukan Kamus Al-Munawwir.";
  }
  // 2. Bina' Mudho'af (e.g. مَدِيدٌ)
  else if (bina === "Mudho'af") {
    singular = `${fa}َ${ain}ِي${lam}ٌ`; // e.g. مَدِيدٌ
    qillah = `أَ${fa}ْ${ain}ِ${lam}َّاءُ`; // أَمِدَّاءُ (wazan أَفْعِلَاء)
    katsroh = `${fa}ُ${ain}َ${lam}َاءُ`; // مُدَّاءُ (wazan فُعَلَاء)
    muntahal = `مَ${fa}َا${lam}ُّ`; // مَمَادُّ (wazan مَفَاعِلُ)
    explanation = `Sifat Musyabihat Mudho'af '${singular}' memiliki Jamak Qillah '${qillah}' (wazan أَفْعِلَاء) dengan idgham. Jamak Katsroh-nya diurai menjadi '${katsroh}' (wazan فُعَلَاء), dan Shighot Muntahal Jumu'-nya dirapatkan kembali menjadi '${muntahal}' (wazan مَفَاعِلُ).`;
  }
  // 3. Bina' Ajwaf (e.g. قَؤُولٌ, بَيِّعٌ, خَوِفٌ)
  else if (bina === "Ajwaf") {
    if (singular.includes("و") || ain === "و") {
      qillah = `أَ${fa}ْ${ain}َا${lam}ٌ`; // أَقْوَالٌ
      katsroh = `${fa}ِ${ain}َا${lam}ٌ`; // قِوَالٌ
      muntahal = `${fa}َوَائِ${lam}ُ`; // قَوَائِلُ (wazan فَوَاعِلُ)
      explanation = `Sifat Musyabihat Ajwaf Wawi '${singular}' memiliki Jamak Qillah '${qillah}' (wazan أَفْعَال) dan Jamak Katsroh '${katsroh}' (wazan فِعَال). Adapun Shighot Muntahal Jumu'-nya mengikuti wazan فَوَاعِلُ menjadi '${muntahal}'.`;
    } else {
      qillah = `أَ${fa}ْ${ain}َا${lam}ٌ`; // أَبْيَاضٌ or serupa
      katsroh = `${fa}ِ${ain}َا${lam}ٌ`; // بِيَاضٌ
      muntahal = `${fa}َوَائِ${lam}ُ`; // بَوَائِعُ
      explanation = `Sifat Musyabihat Ajwaf Ya'i '${singular}' memiliki Jamak Qillah '${qillah}' dan Jamak Katsroh '${katsroh}'. Shighot Muntahal Jumu'-nya mengikuti wazan فَوَاعِلُ menjadi '${muntahal}' sesuai herarki I'lal.`;
    }
  }
  // 4. Bina' Naqis & Lafif (e.g. قَوِيٌّ, شَوِيٌّ, وَفِيٌّ)
  else if (bina === "Naqis" || bina === "Lafif Maqrun" || bina === "Lafif Mafruq") {
    singular = `${fa}َ${ain}ِىٌّ`; // e.g. قَوِيٌّ
    qillah = `أَ${fa}ْ${ain}ِيَاءُ`; // أَقْوِيَاءُ / أَشْوِيَاءُ (wazan أَفْعِلَاء)
    katsroh = `أَ${fa}ْ${ain}ِيَاءُ`; // Lazim digunakan sama dengan qillah
    muntahal = `${fa}َ${ain}َايَا`; // قَوَايَا / شَوَايَا / وَقَايَا (wazan فَعَالَى)
    explanation = `Sifat Musyabihat Naqis '${singular}' memiliki Jamak Qillah '${qillah}' (wazan أَفْعِلَاء). Jamak Katsroh-nya sama, dan Shighot Muntahal Jumu'-nya secara tepat mengikuti wazan فَعَالَى menjadi '${muntahal}' setelah mengalami I'lal huruf wa/ya.`;
  }
  // 5. General Shohih, Mitsal, Mahmuz (e.g. كَرِيمٌ, شَرِيفٌ, أَمِيرٌ)
  else {
    const isFaeel = singular.includes("ِي") || singular.includes("ي") || entry.sifatMusyabihat?.includes("ِي");

    if (isFaeel) {
      singular = `${fa}َ${ain}ِي${lam}ٌ`; // e.g. كَرِيمٌ
      qillah = `أَ${fa}ْ${ain}ِ${lam}َاءُ`; // أَكْرِمَاءُ / أَشْرِفَاءُ (wazan أَفْعِلَاء)
      katsroh = `${fa}ُ${ain}َ${lam}َاءُ`; // كُرَمَاءُ / شُرَفَاءُ (wazan فُعَلَاء)
      muntahal = `${fa}َ${ain}َائِ${lam}ُ`; // كَرَائِمُ / شَرَائِفُ (wazan فَعَائِلُ)
      explanation = `Sifat Musyabihat Shahih '${singular}' melahirkan Jamak Qillah '${qillah}' (wazan أَفْعِلَاء), Jamak Katsroh '${katsroh}' (wazan فُعَلَاء) yang sangat populer, serta Shighot Muntahal Jumu' '${muntahal}' (wazan فَعَائِلُ) sesuai kaidah sharaf utama.`;
    } else {
      qillah = `أَ${fa}ْ${ain}َا${lam}ٌ`; // أَفْعَال
      katsroh = `${fa}ُ${ain}ُ${lam}ٌ`; // فُعُل
      muntahal = `مَ${fa}َا${ain}ِ${lam}ُ`; // مَفَاعِل
      explanation = `Sifat Musyabihat '${singular}' dijamakkan secara Qillah ke '${qillah}' (wazan أَفْعَال) dan Katsroh ke '${katsroh}' (wazan فُعُل). Shighot Muntahal Jumu'-nya adalah '${muntahal}'.`;
    }
  }

  // Generate customized Qiyāsī examples using current root letters
  const makeHasanunSingular = `${cleanFa}َ${cleanAin}َ${cleanLam}ٌ`;
  const makeHasanunQillah = `أَ${cleanFa}ْ${cleanAin}ِ${cleanLam}َةٌ`;
  const makeHasanunKatsroh = `${cleanFa}ِ${cleanAin}َا${cleanLam}ٌ`;

  const makeKareemSingular = `${cleanFa}َ${cleanAin}ِي${cleanLam}ٌ`;
  const makeKareemQillah = `أَ${cleanFa}ْ${cleanAin}ِ${cleanLam}َةٌ`;
  const makeKareemKatsroh = `${cleanFa}ُ${cleanAin}َ${cleanLam}َاءُ`;

  const makeShujaSingular = `${cleanFa}ُ${cleanAin}َا${cleanLam}ٌ`;
  const makeShujaQillah = `—`;
  const makeShujaKatsroh = `${cleanFa}ُ${cleanAin}ْ${cleanLam}َانٌ`;

  const makeAhmarSingular = `أَ${cleanFa}ْ${cleanAin}َ${cleanLam}ُ`;
  const makeAhmarQillah = `—`;
  const makeAhmarKatsroh = `${cleanFa}ُ${cleanAin}ْ${cleanLam}ٌ`;

  const isQiyasi = entry.babNum === 4 || entry.babNum === 5;
  const isSamai = !isQiyasi;

  const mergedKatsroh = mergePluralValues(entry.sifatMusyabihatPlural?.katsroh, katsroh);
  const mergedQillah = mergePluralValues(entry.sifatMusyabihatPlural?.qillah, qillah);
  const mergedMuntahal = mergePluralValues(entry.sifatMusyabihatPlural?.muntahal, muntahal);

  return {
    katsroh: cleanArabicWords(mergedKatsroh),
    qillah: cleanArabicWords(mergedQillah),
    muntahal: cleanArabicWords(mergedMuntahal),
    isQiyasi,
    isSamai,
    qiyasi_katsroh: cleanArabicWords(mergedKatsroh),
    qiyasi_qillah: cleanArabicWords(mergedQillah),
    qiyasi_muntahal: cleanArabicWords(mergedMuntahal),
    reference: "Kamus Lisanul 'Arab, Kamus Al-Munawwir, Sharaf Al-Kafi, Al-Fiqh Al-Akbar Sharaf",
    explanation: cleanArabicWords(isSamai 
      ? explanation 
      : `${explanation}\n\n*Menurut Kaidah Sharaf, lafadz Sifat Musyabihat ini diklasifikasikan sebagai Qiyāsī karena diturunkan dari kata kerja lazim (Bab ${entry.babNum}).*`),
    qiyasi: {
      keterangan: "Shifat Musyabbah 90% Samā'ī (Sesuai dhabit kamus klasik). Namun terdapat wazan Qiyāsī baku bila diturunkan dari fi'il lazim (intransitif).",
      samai: true,
      wazan_qiyasi: {
        "dari_fa'ila": ["فَعِلٌ", "فَعَالٌ", "فَعِيلٌ"],
        "dari_fa'ula": ["فَعْلٌ", "فَعَالٌ", "فُعَالٌ", "فَعِيلٌ"],
        warna_aib: ["أَفْعَلُ"],
        lainnya: ["فَعْلَانُ", "فَعِلَانُ"]
      },
      jama_qillah: ["أَفْعِلَة"],
      jama_kathrah: ["فُعَلَاء", "فُعَّال", "فِعَال", "فُعْل", "فَعَلَة"],
      jama_muntahal_jumu: ["فَعَائِل", "فُعَلَاء"],
      catatan_ilal: "Mengikuti wazan Isim Fa'il + wazan tersendiri bagi kategori warna, aib, perasaan, serta kepenuhan.",
      contoh: [
        {
          label: "حَسِنٌ",
          singular: cleanArabicWords(`حَسَنٌ (Morfing root: ${makeHasanunSingular})`),
          qillah: cleanArabicWords(`أَحْسِنَةٌ (${makeHasanunQillah})`),
          kathrah: cleanArabicWords(`حِسَانٌ (${makeHasanunKatsroh})`),
          wazan: "فَعِل → فِعَال"
        },
        {
          label: "كَرِيمٌ",
          singular: cleanArabicWords(`كَرِيمٌ (Morfing root: ${makeKareemSingular})`),
          qillah: cleanArabicWords(`أَكْرِمَةٌ (${makeKareemQillah})`),
          kathrah: cleanArabicWords(`كُرَمَاءُ (${makeKareemKatsroh})`),
          wazan: "فَعِيل → فُعَلَاء"
        },
        {
          label: "شُجَاعٌ",
          singular: cleanArabicWords(`شُجَاعٌ (Morfing root: ${makeShujaSingular})`),
          qillah: "—",
          kathrah: cleanArabicWords(`شُجْعَانٌ (${makeShujaKatsroh})`),
          wazan: "فُعَال → فُعْلَان"
        },
        {
          label: "أَحْمَرُ",
          singular: cleanArabicWords(`أَحْمَرُ (Morfing root: ${makeAhmarSingular})`),
          qillah: "—",
          kathrah: cleanArabicWords(`حُمْرٌ (${makeAhmarKatsroh})`),
          wazan: "أَفْعَل → فُعْل"
        }
      ]
    }
  };
}
