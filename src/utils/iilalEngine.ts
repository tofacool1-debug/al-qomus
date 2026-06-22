/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { DataWazan, ShighotDetail, TasrifIstilahi, TasrifLughowi, DictionaryEntry, PluralIsimFail, PluralIsimMaful, PluralIsimZamanMakan, PluralIsimAlat } from "../types";
import { analyzeIsimFailPlural } from "./isimFailPlural";
import { analyzeIsimMafulPlural } from "./isimMafulPlural";
import { analyzeIsimZamanMakanPlural, analyzeIsimAlatPlural } from "./isimZamanMakanAlatPlural";

// Arabic harakat constants
const FATHA = "\u064e";
const DAMMA = "\u064f";
const KASRA = "\u0650";
const SUKUN = "\u0652";
const SHADDA = "\u0651";
const TANWIN_DAMMA = "\u064c";
const TANWIN_KASRA = "\u064d";

export const IilalEngine = {
  replaceRoot(pattern: string, fa: string, ain: string, lam: string): string {
    return pattern
      .replace(/ف/g, "__FA__")
      .replace(/ع/g, "__AIN__")
      .replace(/ل/g, "__LAM__")
      .replace(/__FA__/g, fa)
      .replace(/__AIN__/g, ain)
      .replace(/__LAM__/g, lam);
  },

  detectBina(fa: string, ain: string, lam: string): string {
    const isFaWeak = ["و", "ي"].includes(fa);
    const isAinWeak = ["و", "ي"].includes(ain);
    const isLamWeak = ["و", "ي"].includes(lam);

    const isFaHamzah = ["أ", "ء", "إ", "آ"].includes(fa);
    const isAinHamzah = ["أ", "ء", "ئ", "ؤ"].includes(ain);
    const isLamHamzah = ["أ", "ء", "ئ", "ؤ", "أ"].includes(lam);

    if (isFaWeak && isLamWeak) return "Lafif Mafruq";
    if (isAinWeak && isLamWeak) return "Lafif Maqrun";
    if (isFaWeak) return "Mitsal";
    if (isAinWeak) return "Ajwaf";
    if (isLamWeak) return "Naqis";
    if (ain === lam && !isAinWeak && !isAinHamzah) return "Mudho'af";
    if (isFaHamzah) return "Mahmuz Fa";
    if (isAinHamzah) return "Mahmuz 'Ain";
    if (isLamHamzah) return "Mahmuz Lam";
    return "Shohih";
  },

  // I'ILAL DASAR
  applyIilalMadhi(fa: string, ain: string, lam: string, bina: string, wazanMadhi?: string, babNum?: number): string {
    let ainVowel = FATHA;
    if (wazanMadhi) {
      if (wazanMadhi.includes(`ع${KASRA}`) || wazanMadhi.includes("فَعِلَ")) {
        ainVowel = KASRA;
      } else if (wazanMadhi.includes(`ع${DAMMA}`) || wazanMadhi.includes("فَعُلَ")) {
        ainVowel = DAMMA;
      }
    } else if (babNum !== undefined) {
      if (babNum === 4 || babNum === 6) {
        ainVowel = KASRA;
      } else if (babNum === 5) {
        ainVowel = DAMMA;
      }
    }
    const ashl = `${fa}${FATHA}${ain}${ainVowel}${lam}${FATHA}`;
    if (bina === "Ajwaf") {
      // e.g. قَوَلَ -> قَالَ or بَيَعَ -> بَاعَ
      return `${fa}${FATHA}ا${lam}${FATHA}`;
    }
    if (bina === "Naqis" || bina === "Lafif Maqrun" || bina === "Lafif Mafruq") {
      // e.g. دَعَوَ -> دَعَا or رَمَيَ -> رَمَى / وَقَيَ -> وَقَى
      if (lam === "و" && ainVowel === FATHA) {
        return `${fa}${FATHA}${ain}${FATHA}ا`;
      } else if (lam === "ي" && ainVowel === FATHA) {
        return `${fa}${FATHA}${ain}${FATHA}ى`;
      } else {
        return `${fa}${FATHA}${ain}${ainVowel}${lam}${FATHA}`;
      }
    }
    if (bina === "Mudho'af") {
      // e.g. مَدَدَ -> مَدَّ
      return `${fa}${FATHA}${ain}${SHADDA}${FATHA}`;
    }
    return ashl;
  },

  applyIilalMudhari(fa: string, ain: string, lam: string, bina: string, wazanMudhari: string): string {
    let ashl = this.replaceRoot(wazanMudhari, fa, ain, lam);

    if (bina === "Ajwaf") {
      // e.g. يَقْوُلُ -> يَقُولُ or يَبْيِعُ -> يَبِيعُ or يَخْوَفُ -> يَخَافُ
      if (ain === "و") {
        if (wazanMudhari.includes(`ع${DAMMA}`)) {
          // يَقْوُلُ -> يَقُولُ
          ashl = ashl.replace(`ْو${DAMMA}`, `ُو`);
        } else if (wazanMudhari.includes(`ع${FATHA}`)) {
          // يَخْوَفُ -> يَخَافُ
          ashl = ashl.replace(`ْو${FATHA}`, `َا`);
        }
      } else if (ain === "ي") {
        if (wazanMudhari.includes(`ع${KASRA}`)) {
          // يَبْيِعُ -> يَبِيعُ
          ashl = ashl.replace(`ْي${KASRA}`, `ِي`);
        } else if (wazanMudhari.includes(`ع${FATHA}`)) {
          // يَهْيَبُ -> يَهَابُ
          ashl = ashl.replace(`ْي${FATHA}`, `َا`);
        }
      }
    } else if (bina === "Naqis" || bina === "Lafif Maqrun") {
      // e.g. يَدْعُوُ -> يَدْعُو or يَرْمِيُ -> يَرْمِي or يَرْضَيُ -> يَرْضَى
      if (wazanMudhari.includes(`ع${FATHA}`)) {
        ashl = ashl.replace(new RegExp(`[وي]${DAMMA}$`), "َى").replace(new RegExp(`[وي]${FATHA}$`), "َى");
      } else {
        if (lam === "و") {
          ashl = ashl.replace(`و${DAMMA}`, `ُو`);
        } else if (lam === "ي") {
          ashl = ashl.replace(`ي${DAMMA}`, `ِي`);
        }
        ashl = ashl.replace("وُ", "ُو").replace("يُ", "ِي");
      }
    } else if (bina === "Mitsal") {
      // e.g. يَوْعِدُ -> يَعِدُ (Waw is dropped in active mudhari)
      if (fa === "و" && wazanMudhari.includes(`ع${KASRA}`)) {
        ashl = ashl.replace(`يَوْ`, `يَ`).replace(`تَوْ`, `تَ`);
      }
    } else if (bina === "Lafif Mafruq") {
      // Combine Mitsal (drop Waw) & Naqis (end weak letter)
      if (fa === "و" && wazanMudhari.includes(`ع${KASRA}`)) {
        ashl = ashl.replace(`يَوْ`, `يَ`).replace(`تَوْ`, `تَ`);
      }
      if (wazanMudhari.includes(`ع${FATHA}`)) {
        ashl = ashl.replace(new RegExp(`[وي]${DAMMA}$`), "َى").replace(new RegExp(`[وي]${FATHA}$`), "َى");
      } else {
        if (lam === "و") {
          ashl = ashl.replace(`و${DAMMA}`, `ُو`);
        } else if (lam === "ي") {
          ashl = ashl.replace(`ي${DAMMA}`, `ِي`);
        }
        ashl = ashl.replace("وُ", "ُو").replace("يُ", "ِي");
      }
    } else if (bina === "Mudho'af") {
      // e.g. يَمْدُدُ -> يَمُدُّ
      if (wazanMudhari.includes(`ع${DAMMA}`)) {
        ashl = `يَ${fa}${DAMMA}${ain}${SHADDA}${DAMMA}`;
      } else if (wazanMudhari.includes(`ع${KASRA}`)) {
        ashl = `يَ${fa}${KASRA}${ain}${SHADDA}${DAMMA}`;
      } else {
        ashl = `يَ${fa}${FATHA}${ain}${SHADDA}${DAMMA}`;
      }
    }

    return ashl;
  },

  applyMahmuzRules(word: string, isMahmuzLam?: boolean): string {
    // Hamzah mati (silent hamzah with sukun) replaced by:
    // - waw (و) if preceded by damma (\u064f)
    // - ya (ي) if preceded by kasra (\u0650)
    // - tashil to alif (ا) if preceded by fatha (\u064e)
    let processed = word;
    processed = processed.replace(/\u064f[أءؤئإ\u0624\u0625\u0626\u0621](\u0652|ْ)?/g, "\u064fو\u0652");
    processed = processed.replace(/\u0650[أءؤئإ\u0624\u0625\u0626\u0621](\u0652|ْ)?/g, "\u0650ي\u0652");
    if (!isMahmuzLam) {
      processed = processed.replace(/\u064e[أءؤئإ\u0624\u0625\u0626\u0621](\u0652|ْ)?/g, "\u064eا");
    }
    return processed;
  },

  applyIilalAmar(fa: string, ain: string, lam: string, bina: string, wazanMudhari: string): string {
    const mudhari = this.applyIilalMudhari(fa, ain, lam, bina, wazanMudhari);
    // Remove prefix 'يَ' (ya + fatha) or 'يُ' (ya + damma)
    let base = mudhari.replace(/^يَ/g, "").replace(/^يُ/g, "");

    // Add Hamzah Washal for Shohih if it starts with Sukun (e.g., نْصُرُ -> اُنْصُرْ)
    if (base.charAt(1) === SUKUN || base.includes(`${fa}${SUKUN}`)) {
      const vowelChar = wazanMudhari.includes(`ع${DAMMA}`) ? `ا${DAMMA}` : `ا${KASRA}`;
      base = vowelChar + base;
    }

    // Change last harakah to Sukun for Amar (unless Mudho'af which keeps fatha or Naqis which drops final letter)
    if (bina === "Naqis" || bina === "Lafif Maqrun" || bina === "Lafif Mafruq") {
      // Drop the final weak letter (lam)
      base = base.substring(0, base.length - 2); // Drops lam and its vowel
    } else if (bina === "Mudho'af") {
      // Ends in fatha: e.g. مُدَّ
      base = base.replace(new RegExp(`${DAMMA}$`), FATHA);
    } else if (bina === "Ajwaf") {
      // Rule 4: Fiil amr waqi mukhotob dan mukhotobah lam amr,huruf mudhoroah,hamzoh wasol di buang contoh صُنْ , سِرْ, harokat fa fiil ikut wazan bab nya masing2
      let faVowel = KASRA; // default
      if (wazanMudhari.includes(`ع${DAMMA}`) || wazanMudhari.includes("يَفْعُلُ")) {
        faVowel = DAMMA;
      } else if (wazanMudhari.includes(`ع${KASRA}`) || wazanMudhari.includes("يَفْعِلُ")) {
        faVowel = KASRA;
      } else if (wazanMudhari.includes(`ع${FATHA}`) || wazanMudhari.includes("يَفْعَلُ")) {
        faVowel = FATHA;
      }
      return `${fa}${faVowel}${lam}${SUKUN}`;
    } else {
      // Replace last vowel with sukun
      base = base.replace(new RegExp(`${DAMMA}$`), SUKUN);
    }

    if (bina.startsWith("Mahmuz")) {
      const isML = bina === "Mahmuz Lam" || lam === "أ" || lam === "ء";
      base = this.applyMahmuzRules(base, isML);
    }

    return base;
  },

  applyIilalNahi(fa: string, ain: string, lam: string, bina: string, wazanMudhari: string): string {
    const mudhari = this.applyIilalMudhari(fa, ain, lam, bina, wazanMudhari);
    // Replace prefix 'ي' at start with 'ت' (handling both fatha 'يَ' or damma 'يُ')
    let base = mudhari.replace(/^يَ/g, "تَ").replace(/^يُ/g, "تُ");

    // Make majzum
    if (bina === "Naqis" || bina === "Lafif Maqrun" || bina === "Lafif Mafruq") {
      // Drop final weak letter (e.g. تَدْعُو -> تَدْعُ, تَرْمِي -> تَرْمِ, تَرْضَى -> تَرْضَ)
      base = base.replace(/[ويى]$/, "");
    } else if (bina === "Mudho'af") {
      // e.g. تَمُدُّ -> تَمُدَّ
      base = base.replace(new RegExp(`${DAMMA}$`), FATHA);
    } else if (bina === "Ajwaf") {
      // replace ending damma with sukun and drop the long vowel
      base = base.replace(new RegExp(`${DAMMA}$`), SUKUN);
      base = base.replace(`ُو${lam}${SUKUN}`, `ُ${lam}${SUKUN}`).replace(`ِي${lam}${SUKUN}`, `ِ${lam}${SUKUN}`).replace(`َا${lam}${SUKUN}`, `َ${lam}${SUKUN}`);
    } else {
      // Shohih / Mitsal / etc. - replace ending damma with sukun
      base = base.replace(new RegExp(`${DAMMA}$`), SUKUN);
    }

    return `لَا ${base}`;
  },

  postProcessWord(word: string, bina: string, fa?: string, ain?: string, lam?: string): string {
    if (!word) return word;
    let res = word;
    
    const f = fa || "";
    const a = ain || "";
    const l = lam || "";

    const isMahmuzFa = bina.includes("Mahmuz Fa") || f === "أ" || f === "ء";
    const isMahmuzAin = bina.includes("Mahmuz 'Ain") || a === "أ" || a === "ء";
    const isMahmuzLam = bina.includes("Mahmuz Lam") || l === "أ" || l === "ء";

    // 1. Core Ajwaf specific rules
    if (bina === "Ajwaf") {
      res = res.replace(/اوِ/g, "ائِ").replace(/ايِ/g, "ائِ");
      res = res.replace(/اوِي/g, "ائِى").replace(/ايِي/g, "ائِى");
      res = res.replace(new RegExp(`${KASRA}وَ?ا`, "g"), `${KASRA}يَا`);
      res = res.replace(new RegExp(`${KASRA}وَ`, "g"), `ِيَا`);
      res = res.replace(new RegExp(`${KASRA}وَا`, "g"), `ِيَا`);
      res = res.replace(/ا{2,}/g, "ا").replace(/َاا/g, "َا").replace(/اَا/g, "ا");
    }

    // 2. Bina' Mahmuz specific rules (Hamzah spelling rules):
    if (isMahmuzFa || isMahmuzAin || isMahmuzLam || res.includes("أ") || res.includes("ء") || res.includes("إ")) {
      // Double hamzahs meeting:
      res = res.replace(/أَأْ/g, "آ").replace(/أَءْ/g, "آ").replace(/ءَأْ/g, "آ");
      res = res.replace(/أُأْ/g, "أُو").replace(/أُءْ/g, "أُو");
      res = res.replace(/إِأْ/g, "إِي").replace(/إِئْ/g, "إِي").replace(/إِءْ/g, "إِي");
      res = res.replace(/أَأَا/g, "آ");

      // Seat adjustment based on adjacent kasra (makes it ئ)
      res = res.replace(/ِأ/g, "ِئ").replace(/ِء/g, "ِئ").replace(/ِؤ/g, "ِئ");
      res = res.replace(/ِأ([ًٌٍُِّ])/g, "ِئ$1").replace(/ِء([ًٌٍُِّ])/g, "ِئ$1");
      res = res.replace(/ِأُ/g, "ِئُ").replace(/ِءُ/g, "ِئُ");
      res = res.replace(/ِأٌ/g, "ِئٌ").replace(/ِءٌ/g, "ِئٌ");

      // Seat adjustment based on adjacent damma (makes it ؤ)
      res = res.replace(/ُأ/g, "ُؤ").replace(/ُء/g, "ُؤ");

      if (isMahmuzAin) {
        res = res.replace(/اأِ/g, "ائِ").replace(/أِ/g, "ئِ").replace(/ءِ/g, "ئِ").replace(/ؤِ/g, "ئِ");
      }

      if (isMahmuzLam) {
         // final hamzah preceded by alif -> on the line (ء)
         res = res.replace(/اأٌ/g, "اءٌ").replace(/اأ/g, "اء");
         res = res.replace(/اّأ/g, "اء");
      }
    }

    // 3. Bina' Mudhoaf adjustments:
    // If double letters are adjacent, merge them with shadda!
    if (bina === "Mudho'af" && a && l && a === l) {
      const regexTwinSukun = new RegExp(`${a}${SUKUN}${l}`, "g");
      res = res.replace(regexTwinSukun, `${a}${SHADDA}`);
      const regexTwinDirect = new RegExp(`${a}${l}`, "g");
      res = res.replace(regexTwinDirect, `${a}${SHADDA}`);
    }

    return res;
  },

  // SHIGHOT CREATORS
  isMasdarMasyhur(candidate: string, masdarSource: string | string[] | undefined, rootObj?: { fa: string, ain: string, lam: string }): boolean {
    if (!candidate) return false;
    
    // Parse master masdars list
    let masdarsList: string[] = [];
    if (Array.isArray(masdarSource)) {
      masdarsList = masdarSource;
    } else if (typeof masdarSource === "string" && masdarSource.trim() !== "") {
      masdarsList = masdarSource.split(/[\/,]/).map(s => s.trim());
    }
    
    // If we have an empty list, let's look up in our pre-defined dictionary masdarDict!
    if (masdarsList.length === 0 && rootObj) {
      // Create key from roots
      const fClean = rootObj.fa.replace(/[\u064b-\u0652]/g, "");
      const aClean = rootObj.ain.replace(/[\u064b-\u0652]/g, "");
      const lClean = rootObj.lam.replace(/[\u064b-\u0652]/g, "");
      const key = fClean + aClean + lClean;
      
      const masdarDict: Record<string, string[]> = {
        "قول": ["قَوْلٌ", "قِيلٌ", "مَقَالٌ"],
        "بيع": ["بَيْعٌ", "مَبِيعٌ"],
        "خوف": ["خَوْفٌ", "مَخَافَةٌ"],
        "نيل": ["نَيْلٌ", "مَنَالٌ"],
        "طيب": ["طِيبٌ", "طِيَابَةٌ"],
        "قوم": ["قِيَامٌ", "مَقَامٌ"],
        "زور": ["زِيَارَةٌ", "زَوْرٌ"],
        "صوم": ["صَوْمٌ", "صِيَامٌ"],
        "عود": ["عَوْدٌ", "عِيَادَةٌ"],
        "سير": ["سَيْرٌ", "سَيْرُورَةٌ"],
        "طوف": ["طَوْفٌ", "طَوَافٌ"],
        "كون": ["كَوْنٌ"],
        "موت": ["مَوْتٌ"],
        "ذوق": ["ذَوْقٌ", "مَذَاقٌ"],
        "جيأ": ["مَجِيءٌ", "جَيْئَةٌ"],
        "سيل": ["سَيَلَانٌ", "سَيْلٌ"],
        "طير": ["طَيَرَانٌ", "طَيْرٌ"],
        "عيش": ["عَيْشٌ", "مَعِيشَةٌ"],
        "ميل": ["مَيْلٌ", "مَيَلَانٌ"],
        "خيب": ["خَيْبَةٌ"],
        "صيح": ["صِيَاحٌ"],
        "غيب": ["غَيْبٌ", "غَيْبَةٌ"],
        "شيد": ["شَيْدٌ"],
        "زيد": ["زِيَادَةٌ"],
        "كيد": ["كَيْدٌ"],
        "بيت": ["مَبِيتٌ"],
        "حيد": ["حَيْدٌ", "حَيَدَانٌ"],
        "ضيق": ["ضِيقٌ"],
        "صير": ["صَيْرٌ", "صَيْرُورَةٌ"],
        "عيب": ["عَيْبٌ"],
        "شيب": ["شَيْبٌ", "شَيْبُوبَةٌ"],
        "هيب": ["هَيْبَةٌ"],
        "زول": ["زَوَالٌ"],
        "حير": ["حَيْرَةٌ"],
        "بين": ["بَيَانٌ"],
        "مدد": ["مَدٌّ"],
        "ظنن": ["ظَنٌّ"],
        "ردد": ["رَدٌّ"],
        "جرر": ["جَرٌّ"],
        "سبب": ["سَبٌّ"],
        "صبب": ["صَبٌّ"],
        "شدد": ["شِدَّةٌ", "شَدٌّ"],
        "حبب": ["حُبٌّ", "مَحَبَّةٌ"],
        "حلل": ["حَلٌّ"],
        "عدد": ["عَدٌّ", "تَعْدَادٌ"],
        "فرر": ["فِرَارٌ"],
        "مسس": ["مَسٌّ", "مَسِيسٌ"],
        "سرر": ["سُرُورٌ", "سَرٌّ"],
        "ضلل": ["ضَلَالٌ"],
        "طبب": ["طِبٌّ"],
        "قرر": ["قَرَارٌ"],
        "كرر": ["كَرٌّ"],
        "غشش": ["غِشٌّ"],
        "حفف": ["حَفٌّ"],
        "زلل": ["زَلَلٌ"],
        "شقق": ["شَقٌّ"],
        "سدد": ["سَدَادٌ"],
        "بثث": ["بَثٌّ"],
        "دقق": ["دِقَّةٌ"],
        "كفف": ["كَفٌّ"],
        "حقق": ["حَقٌّ"],
        "جفف": ["جَفَافٌ"],
        "خفف": ["خِفَّةٌ"],
        "رقق": ["رِقَّةٌ"],
        "صحح": ["صِحَّةٌ"],
        "سأل": ["سُؤَالٌ"],
        "قرأ": ["قِرَاءَةٌ"],
        "أكل": ["أَكْلٌ"],
        "أخذ": ["أَخْذٌ"],
        "أمر": ["أَمْرٌ"],
        "أمن": ["أَمْنٌ"],
        "بدأ": ["بَدْءٌ"],
        "ملأ": ["مَلْءٌ"],
        "لجأ": ["لُجُوءٌ"],
        "نشأ": ["نُشُوءٌ"]
      };
      
      if (masdarDict[key]) {
        masdarsList = masdarDict[key];
      }
    }
    
    // Normalize arabic comparing function:
    const cleanAr = (t: string) => {
      if (!t) return "";
      return t.replace(/[\u064b-\u0652\u0670\u0671]/g, "").replace(/\s+/g, "").trim();
    };

    const candidateClean = cleanAr(candidate);
    if (!candidateClean) return false;

    if (masdarsList.length === 0) {
      if (rootObj) {
        const fallbackWord = this.replaceRoot("فَعْلٌ", rootObj.fa, rootObj.ain, rootObj.lam);
        return candidateClean === cleanAr(fallbackWord);
      }
      return false;
    }

    return masdarsList.some(dictWord => {
      const dicClean = cleanAr(dictWord);
      return dicClean === candidateClean || candidateClean.includes(dicClean) || dicClean.includes(candidateClean);
    });
  },

  buatIsimFail(fa: string, ain: string, lam: string, bina: string): string {
    // فَاعِلٌ
    let word = this.replaceRoot(`فَاعِلٌ`, fa, ain, lam);
    if (bina === "Mahmuz 'Ain") {
      word = `${fa}َائِ${lam}ٌ`;
    } else if (bina === "Ajwaf") {
      // e.g. قَاوِلٌ -> قَائِلٌ (Waw or Ya becomes Hamzah)
      word = word.replace(/او/g, "ائ").replace(/اي/g, "ائ");
    } else if (bina === "Naqis" || bina === "Lafif Maqrun" || bina === "Lafif Mafruq") {
      // e.g. دَاعِوٌ -> دَاعٍ
      word = `${fa}َا${ain}ٍ`;
    } else if (bina === "Mudho'af") {
      // e.g. مَادِدٌ -> مَادٌّ
      word = `${fa}َا${ain}ٌّ`;
    }
    
    // Mahmuz Fa adjustment to blend double alif/hamzah (e.g., أَاعِلٌ -> آكِلٌ)
    if (fa === "أ" || fa === "ء") {
      word = word.replace("أَا", "آ").replace("ءَا", "آ");
    }
    return word;
  },

  buatIsimMaful(fa: string, ain: string, lam: string, bina: string): string {
    // مَفْعُولٌ
    let word = this.replaceRoot(`مَفْعُولٌ`, fa, ain, lam);
    if (bina === "Ajwaf") {
      if (ain === "و") {
        // مَقْوُولٌ -> مَقُولٌ
        word = word.replace(`ْوُو`, `ُو`);
      } else {
        // مَبْيُوعٌ -> مَبِيعٌ
        word = word.replace(`ْيُو`, `ِي`);
      }
    } else if (bina === "Naqis" || bina === "Lafif Maqrun" || bina === "Lafif Mafruq") {
      if (lam === "و") {
        // مَدْعُووٌ -> مَدْعُوٌّ
        word = word.replace(`ُوّ`, `ُوٌّ`).replace(`ُووٌ`, `ُوٌّ`);
      } else {
        // مَرْموِيٌّ -> مَرْمِيٌّ
        word = word.replace(`ُويٌ`, `ِيٌّ`).replace(`ُوِيٌ`, `ِيٌّ`);
      }
    } else if (bina === "Mudho'af") {
      // مَمْدُودٌ remains Shohih-like
    }
    return word;
  },

  buatIsimMusyabihat(fa: string, ain: string, lam: string, bina: string): string {
    return this.replaceRoot(`فَعِيلٌ`, fa, ain, lam);
  },

  buatIsimMusyabihat6(fa: string, ain: string, lam: string, bina: string): string[] {
    const wazans = ["فَعِيلٌ", "فَعِلٌ", "فَعْلٌ", "فُعَالٌ", "فَعَالٌ", "أَفْعَلُ"];
    return wazans.map(w => {
      let word = this.replaceRoot(w, fa, ain, lam);
      if (bina === "Mudho'af") {
        if (w === "فَعْلٌ") {
          word = `${fa}${FATHA}${ain}${SHADDA}${TANWIN_DAMMA}`; // مَدٌّ
        } else if (w === "فَعِلٌ") {
          word = `${fa}${FATHA}${ain}${SHADDA}${TANWIN_DAMMA}`; // مَدٌّ
        } else if (w === "أَفْعَلُ") {
          word = `أَ${fa}${FATHA}${ain}${SHADDA}${DAMMA}`; // أَمَدُّ
        }
      }
      return word;
    });
  },

  buatIsimTashghir(fa: string, ain: string, lam: string, bina: string): string {
    let word = `${fa}${DAMMA}${ain}${FATHA}ي${SUKUN}${lam}${TANWIN_DAMMA}`;
    if (bina === "Naqis" || bina === "Lafif Maqrun" || bina === "Lafif Mafruq") {
      word = `${fa}${DAMMA}${ain}${FATHA}ي${SHADDA}${TANWIN_DAMMA}`;
    } else if (bina === "Ajwaf") {
      word = `${fa}${DAMMA}${ain}${FATHA}ي${SUKUN}${lam}${TANWIN_DAMMA}`;
    }
    return word.replace(/أُأْ/g, "آ").replace(/أُءْ/g, "آ");
  },

  buatMubalaghohFaal(fa: string, ain: string, lam: string, bina: string): string {
    return this.replaceRoot(`فَعَّALٌ`.replace("AL", "ال"), fa, ain, lam);
  },

  buatMubalaghohFa_il(fa: string, ain: string, lam: string, bina: string): string {
    return this.replaceRoot(`فَعِيلٌ`, fa, ain, lam);
  },

  buatMubalaghohMifal(fa: string, ain: string, lam: string, bina: string): string {
    return this.replaceRoot(`مِفْعَالٌ`, fa, ain, lam);
  },

  buatIsimZamanMakan(fa: string, ain: string, lam: string, bina: string, wazanMudhari: string, jenis: "zaman" | "makan"): string {
    // Usually مَفْعَلٌ or مَفْعِلٌ. Let's return مَفْعِلٌ for Bab 2/6 (where Mudhari has Kasra) or for Mitsal
    const isKasraMudhari = wazanMudhari.includes(KASRA) || wazanMudhari.includes(`ع${KASRA}`) || wazanMudhari.includes("يَفْعِلُ");
    const pattern = (isKasraMudhari || (fa === "و" && bina === "Mitsal")) ? `مَفْعِلٌ` : `مَفْعَلٌ`;
    let word = this.replaceRoot(pattern, fa, ain, lam);
    if (bina === "Naqis" || bina === "Lafif Maqrun" || bina === "Lafif Mafruq") {
      word = `مَ${fa}ْ${ain}َى`; // مَلْهَى, مَأْوَى
    } else if (bina === "Mudho'af") {
      word = `مَ${fa}${FATHA}${ain}${SHADDA}${TANWIN_DAMMA}`; // مَمَدٌّ -> مَمَدٌّ
    } else if (bina === "Ajwaf") {
      word = `مَ${fa}َافٌ`.replace("ف", lam); // مَقَامٌ, مَسَارٌ
    }
    return word;
  },

  buatIsimAlat(fa: string, ain: string, lam: string, bina: string, wazanMadhi: string, wazanMudhari?: string, babNum?: number): string {
    if (bina === "Ajwaf") {
      let word = this.replaceRoot("مِفْعَلٌ", fa, ain, lam);
      if (fa === "و") {
        word = word.replace(/^مِو/g, "مِي").replace(/^مِوْ/g, "مِيْ");
      }
      word = word.replace(/\u0623\u064e?\u0627/g, "\u0622");
      return word;
    }

    if (bina === "Mitsal" || fa === "و" || fa === "ي") {
      let word = this.replaceRoot("مِفْعَالٌ", fa, ain, lam);
      if (fa === "و") {
        word = word.replace(/^مِو/g, "مِي").replace(/^مِوْ/g, "مِيْ");
      }
      word = word.replace(/\u0623\u064e?\u0627/g, "\u0622");
      return word;
    }

    let bab = babNum;
    if (bab === undefined && wazanMudhari) {
      const isMadhiFatahStep = wazanMadhi.includes("عَ") || wazanMadhi.includes("ع" + FATHA); 
      const isMadhiKasraStep = wazanMadhi.includes("عِ") || wazanMadhi.includes("ع" + KASRA);
      const isMadhiDammaStep = wazanMadhi.includes("عُ") || wazanMadhi.includes("ع" + DAMMA);
      
      const isMudhariFatahStep = wazanMudhari.includes("عَ") || wazanMudhari.includes("ع" + FATHA);
      const isMudhariKasraStep = wazanMudhari.includes("عِ") || wazanMudhari.includes("ع" + KASRA);
      const isMudhariDammaStep = wazanMudhari.includes("عُ") || wazanMudhari.includes("ع" + DAMMA);
      
      if (isMadhiFatahStep && isMudhariDammaStep) bab = 1;
      else if (isMadhiFatahStep && isMudhariKasraStep) bab = 2;
      else if (isMadhiFatahStep && isMudhariFatahStep) bab = 3;
      else if (isMadhiKasraStep && isMudhariFatahStep) bab = 4;
      else if (isMadhiDammaStep && isMudhariDammaStep) bab = 5;
      else if (isMadhiKasraStep && isMudhariKasraStep) bab = 6;
    }

    if (bab === 4 || bab === 5) {
      return "—";
    }

    let wazan = "مِفْعَالٌ";
    if (bab === 1 || bab === 2 || bab === 6) {
      wazan = "مِفْعَلٌ";
    } else if (bab === 3) {
      wazan = "مِفْعَالٌ";
    }

    let word = this.replaceRoot(wazan, fa, ain, lam);

    if (bina === "Naqis" || bina === "Lafif Maqrun" || bina === "Lafif Mafruq") {
      if (wazan === "مِفْعَلٌ") {
        word = `مِ${fa}ْ${ain}َى`;
      } else {
        word = `مِ${fa}ْ${ain}َاةٌ`;
      }
    } else if (bina === "Mudho'af") {
      if (wazan === "مِفْعَلٌ") {
        word = `مِ${fa}${FATHA}${ain}${SHADDA}${TANWIN_DAMMA}`;
      } else {
        word = `مِ${fa}${FATHA}${ain}${SHADDA}${TANWIN_DAMMA}`.replace("ٌّ", "َا" + ain + "ٌ");
      }
    }

    if (fa === "و") {
      word = word.replace(/^مِو/g, "مِي").replace(/^مِوْ/g, "مِيْ");
    }

    word = word.replace(/\u0623\u064e?\u0627/g, "\u0622");

    return word;
  },

  buatIsimTafdhil(fa: string, ain: string, lam: string, bina: string, wazanMadhi: string): [string, string, string] {
    if (!wazanMadhi.startsWith("فَعَلَ") && !wazanMadhi.startsWith("فَعِلَ")) {
      return ["", "", ""];
    }
    let muzakkar = `أَ${fa}ْ${ain}َ${lam}ُ`;
    let muzakkarIilal = muzakkar;

    if (bina === "Ajwaf") {
      muzakkarIilal = ain === "و" ? `أَقْوَى` : `أَبْيَى`; // Template example
      if (fa === "ق" && lam === "ل") muzakkarIilal = "أَقْوَلُ"; // fallback
    } else if (bina === "Naqis" || bina === "Lafif Maqrun" || bina === "Lafif Mafruq") {
      muzakkarIilal = `أَ${fa}ْ${ain}َى`; // أَجْلَى, أَعْلَى
    } else if (bina === "Mudho'af") {
      muzakkarIilal = `أَ${fa}َ${ain}${SHADDA}${DAMMA}`; // أَشَدُّ, أَعَزُّ
    }

    const muannats = this.replaceRoot(`فُعْلَى`, fa, ain, lam);
    const jamak = muzakkarIilal.replace(`${DAMMA}`, `ُونَ`);

    return [muzakkarIilal, muannats, jamak];
  },

  buatIsimMarrah(fa: string, ain: string, lam: string, bina: string): string {
    if (bina === "Ajwaf") {
      const weak = ain === "و" ? "و" : "ي";
      return `${fa}َ${weak}ْ${lam}َةٌ`;
    } else if (bina === "Naqis" || bina === "Lafif Maqrun" || bina === "Lafif Mafruq") {
      const weak = lam === "و" ? "و" : "ي";
      return `${fa}َ${ain}ْ${weak}َةٌ`;
    } else if (bina === "Mudho'af") {
      return `${fa}َ${ain}${SHADDA}َةٌ`;
    }
    return `${fa}َ${ain}ْ${lam}َةٌ`;
  },

  buatIsimNau(fa: string, ain: string, lam: string, bina: string): string {
    if (bina === "Ajwaf") {
      const weak = ain === "و" ? "و" : "ي";
      return `${fa}ِ${weak}ْ${lam}َةٌ`;
    } else if (bina === "Naqis" || bina === "Lafif Maqrun" || bina === "Lafif Mafruq") {
      const weak = lam === "و" ? "و" : "ي";
      return `${fa}ِ${ain}ْ${weak}َةٌ`;
    } else if (bina === "Mudho'af") {
      return `${fa}ِ${ain}${SHADDA}َةٌ`;
    }
    return `${fa}ِ${ain}ْ${lam}َةٌ`;
  },

  // 23 WAZAN MASDAR
  buatMasdar23(fa: string, ain: string, lam: string, wazanMadhi: string, bina: string): string[] {
    return [];
  },

  // JAMAK TAKSIR & MUNTAHAL JUMU'
  buatJamakTaksir(mufrod: string, fa: string, ain: string, lam: string, wazanMufrod: string, bina: string): string[] {
    const base = (wazan: string) => {
      let res = this.replaceRoot(wazan, fa, ain, lam);
      if (bina === "Mudho'af") {
        const regexSukun = new RegExp(`${ain}${SUKUN}${lam}`, "g");
        res = res.replace(regexSukun, `${ain}${SHADDA}`);
        const regexDirect = new RegExp(`${ain}${lam}`, "g");
        res = res.replace(regexDirect, `${ain}${SHADDA}`);
      }
      return res;
    };

    // Filter by clean forms
    const cleanWazan = wazanMufrod.replace(/[^\u0600-\u06FF]/g, ""); // Keep Arabic only for matching
    if (cleanWazan.includes("فَاعِل")) {
      return [base("فُعَّالٌ"), base("فَعَلَةٌ"), base("فَعْلَى"), base("فُعَلَاءُ"), base("فُعَّلٌ")];
    }
    if (cleanWazan.includes("مَفْعُول")) {
      return [base("مَفَاعِيلُ"), base("فُعُلٌ"), base("فِعَالٌ")];
    }
    if (cleanWazan.includes("فَعِيل")) {
      return [base("فُعَلَاءُ"), base("فِعَالٌ"), base("فَعْلَى")];
    }
    if (cleanWazan.includes("فَعَّال")) {
      return [base("فَعَّالُونَ")];
    }
    if (cleanWazan.includes("مَفْعَل")) {
      return [base("مَفَاعِلُ"), base("فُعُولٌ")];
    }
    if (cleanWazan.includes("مِفْعَال")) {
      return [base("مَفَاعِيلُ"), base("فَعَالِلُ")];
    }
    return [];
  },

  buatMuntahalJumu(mufrod: string, fa: string, ain: string, lam: string, wazanMufrod: string): string[] {
    const bina = this.detectBina(fa, ain, lam);
    const base = (wazan: string) => {
      let res = this.replaceRoot(wazan, fa, ain, lam);
      if (bina === "Mudho'af") {
        const regexSukun = new RegExp(`${ain}${SUKUN}${lam}`, "g");
        res = res.replace(regexSukun, `${ain}${SHADDA}`);
        const regexDirect = new RegExp(`${ain}${lam}`, "g");
        res = res.replace(regexDirect, `${ain}${SHADDA}`);
      }
      return res;
    };

    const length = mufrod.replace(/[\u064b-\u0652]/g, "").length; // length excluding harakat
    const cleanWazan = wazanMufrod.replace(/[^\u0600-\u06FF]/g, "");

    if (length >= 4) {
      if (cleanWazan.includes("مَفْعَل") || cleanWazan.includes("مِفْعَال")) {
        return [base("مَفَاعِلُ"), base("مَفَاعِيلُ")];
      }
      if (cleanWazan.includes("فَاعِل")) {
        return [base("فَوَاعِلُ"), base("فَوَاعِيلُ")];
      }
    }
    return [];
  },

  buatShighotDetail(mufrod: string, fa: string, ain: string, lam: string, wazanMufrod: string, bina: string): ShighotDetail {
    const jamak = this.buatJamakTaksir(mufrod, fa, ain, lam, wazanMufrod, bina);
    const muntahal = this.buatMuntahalJumu(mufrod, fa, ain, lam, wazanMufrod);
    return {
      mufrod,
      jamak,
      muntahal,
    };
  },

  // BUILD TASRIF ISTILAHI CUSTOM
  tasrifIstilahiCustom(dataWazan: DataWazan): TasrifIstilahi {
    const { fa, ain, lam, wazanMadhi, wazanMudhari, masdar, sifatMusyabihat } = dataWazan;
    const bina = this.detectBina(fa, ain, lam);

    const tafdhil = this.buatIsimTafdhil(fa, ain, lam, bina, wazanMadhi);
    const marrah = this.buatIsimMarrah(fa, ain, lam, bina);
    const nau = this.buatIsimNau(fa, ain, lam, bina);
    const masdar23 = this.buatMasdar23(fa, ain, lam, wazanMadhi, bina);

    const madhi = this.applyIilalMadhi(fa, ain, lam, bina, wazanMadhi, dataWazan.babNum);
    const mudhari = this.applyIilalMudhari(fa, ain, lam, bina, wazanMudhari);
    const amar = this.applyIilalAmar(fa, ain, lam, bina, wazanMudhari);
    const nahi = this.applyIilalNahi(fa, ain, lam, bina, wazanMudhari);

    // Create singular (mufrod) forms
    const isimFailMufrod = this.buatIsimFail(fa, ain, lam, bina);
    const isimMafulMufrod = this.buatIsimMaful(fa, ain, lam, bina);

    // Clear precalculated default Sifat Musyabihat unless explicitly supplied via database/AI
    const hasSifatMusyabihat = sifatMusyabihat && sifatMusyabihat !== "—" && sifatMusyabihat.trim() !== "";
    const isimMusyabihatMufrod = hasSifatMusyabihat ? sifatMusyabihat! : "";
    const musyabihat6 = hasSifatMusyabihat ? [sifatMusyabihat!] : [];

    const mubalaghohFaalMufrod = this.buatMubalaghohFaal(fa, ain, lam, bina);
    const mubalaghohFa_ilMufrod = this.buatMubalaghohFa_il(fa, ain, lam, bina);
    const mubalaghohMifalMufrod = this.buatMubalaghohMifal(fa, ain, lam, bina);
    const isimZamanMufrod = this.buatIsimZamanMakan(fa, ain, lam, bina, wazanMudhari, "zaman");
    const isimMakanMufrod = this.buatIsimZamanMakan(fa, ain, lam, bina, wazanMudhari, "makan");
    const isimAlatMufrod = this.buatIsimAlat(fa, ain, lam, bina, wazanMadhi, wazanMudhari, dataWazan.babNum);
    const isimTashghir = this.buatIsimTashghir(fa, ain, lam, bina);

    const rawResult = {
      madhi,
      mudhari,
      masdar: this.replaceRoot(masdar, fa, ain, lam),
      masdar23,
      isimFail: this.buatShighotDetail(isimFailMufrod, fa, ain, lam, "فَاعِلٌ", bina),
      isimMaful: this.buatShighotDetail(isimMafulMufrod, fa, ain, lam, "مَفْعُولٌ", bina),
      isimMusyabihat: this.buatShighotDetail(isimMusyabihatMufrod, fa, ain, lam, "فَعِيلٌ", bina),
      musyabihat6: musyabihat6,
      mubalaghohFaal: this.buatShighotDetail(mubalaghohFaalMufrod, fa, ain, lam, "فَعَّالٌ", bina),
      mubalaghohFa_il: this.buatShighotDetail(mubalaghohFa_ilMufrod, fa, ain, lam, "فَعِيلٌ", bina),
      mubalaghohMifal: this.buatShighotDetail(mubalaghohMifalMufrod, fa, ain, lam, "مِفْعَالٌ", bina),
      amar,
      nahi,
      isimZaman: this.buatShighotDetail(isimZamanMufrod, fa, ain, lam, "مَفْعَلٌ", bina),
      isimMakan: this.buatShighotDetail(isimMakanMufrod, fa, ain, lam, "مَفْعَلٌ", bina),
      isimAlat: this.buatShighotDetail(isimAlatMufrod, fa, ain, lam, bina === "Ajwaf" ? "مِفْعَلٌ" : "مِفْعَالٌ", bina),
      tafdhilMuzakkar: tafdhil[0],
      tafdhilMuannats: tafdhil[1],
      tafdhilJamak: tafdhil[2],
      marrah,
      nau,
      isimTashghir,
    };

    // Remove jamak, katsroh, qillah, muntahal jumu from requested shighots
    rawResult.isimFail.jamak = [];
    rawResult.isimFail.muntahal = [];
    rawResult.isimMaful.jamak = [];
    rawResult.isimMaful.muntahal = [];
    rawResult.isimMusyabihat.jamak = [];
    rawResult.isimMusyabihat.muntahal = [];
    rawResult.isimZaman.jamak = [];
    rawResult.isimZaman.muntahal = [];
    rawResult.isimMakan.jamak = [];
    rawResult.isimMakan.muntahal = [];
    rawResult.isimAlat.jamak = [];
    rawResult.isimAlat.muntahal = [];

    const self = this;
    const process = (w: string) => self.postProcessWord(w, bina, fa, ain, lam);
    const cleanDetails = (d: ShighotDetail): ShighotDetail => ({
      mufrod: process(d.mufrod),
      jamak: d.jamak.map(process),
      muntahal: d.muntahal.map(process),
    });

    return {
      madhi: process(rawResult.madhi),
      mudhari: process(rawResult.mudhari),
      masdar: process(rawResult.masdar),
      masdar23: rawResult.masdar23.map(w => {
        const processed = process(w);
        const isMasyhur = self.isMasdarMasyhur(processed, dataWazan.masdar, { fa, ain, lam });
        return isMasyhur ? processed : "-";
      }),
      isimFail: cleanDetails(rawResult.isimFail),
      isimMaful: cleanDetails(rawResult.isimMaful),
      isimMusyabihat: cleanDetails(rawResult.isimMusyabihat),
      musyabihat6: rawResult.musyabihat6.map(process),
      mubalaghohFaal: cleanDetails(rawResult.mubalaghohFaal),
      mubalaghohFa_il: cleanDetails(rawResult.mubalaghohFa_il),
      mubalaghohMifal: cleanDetails(rawResult.mubalaghohMifal),
      amar: process(rawResult.amar),
      nahi: process(rawResult.nahi),
      isimZaman: cleanDetails(rawResult.isimZaman),
      isimMakan: cleanDetails(rawResult.isimMakan),
      isimAlat: cleanDetails(rawResult.isimAlat),
      tafdhilMuzakkar: process(rawResult.tafdhilMuzakkar),
      tafdhilMuannats: process(rawResult.tafdhilMuannats),
      tafdhilJamak: process(rawResult.tafdhilJamak),
      marrah: process(rawResult.marrah),
      nau: process(rawResult.nau),
      isimTashghir: process(rawResult.isimTashghir),
    };
  },

  // TASRIF LUGHOWI GENERATION
  tasrifLughowi(tasrif: TasrifIstilahi, fa: string, ain: string, lam: string, bina: string, babNum?: number): TasrifLughowi {
    // Helper to safely conjugate Madhi 14
    const buildMadhi14 = (baseMadhi: string): string[] => {
      // Clean up string to avoid double diacritics
      const clean = baseMadhi.replace(new RegExp(`${SUKUN}`, "g"), "");
      
      let ainVowel = FATHA;
      if (babNum !== undefined) {
        if (babNum === 4 || babNum === 6) {
          ainVowel = KASRA;
        } else if (babNum === 5) {
          ainVowel = DAMMA;
        }
      } else {
        // Fallback: analyze baseMadhi to retrieve the vowel after the ain root letter
        const ainIndex = baseMadhi.indexOf(ain, fa.length);
        if (ainIndex !== -1 && ainIndex + 1 < baseMadhi.length) {
          const nextChar = baseMadhi.charAt(ainIndex + 1);
          if (nextChar === KASRA) {
            ainVowel = KASRA;
          } else if (nextChar === DAMMA) {
            ainVowel = DAMMA;
          }
        }
      }

      // Let's implement robust, proper Arabic fi'il madhi rules
      // For Mudho'af, e.g. mad-da (مَدَّ). From hunna to nahnu, it splits: madad-na (مَدَدْنَا), madad-ta (مَدَدْتَ) etc.
      if (bina === "Mudho'af") {
        const rootMerged = baseMadhi; // e.g. مَدَّ
        let vowelChar = FATHA;
        if (babNum === 1 || babNum === 3) {
          vowelChar = FATHA;
        } else if (babNum === 2 || babNum === 4 || babNum === 6) {
          vowelChar = KASRA;
        } else if (babNum === 5) {
          vowelChar = DAMMA;
        } else {
          // Fallback if babNum is not passed
          vowelChar = tasrif.mudhari.includes(`${FATHA}`) ? KASRA : FATHA;
        }
        const rootSplit = `${fa}${FATHA}${ain}${vowelChar}${lam}${SUKUN}`; // e.g. مَدَدْ or فَرِرْ or عَضِضْ
        return [
          rootMerged, // هُوَ
          rootMerged + "َا", // هُمَا m
          rootMerged.slice(0, -1) + DAMMA + "وا", // هُمْ
          rootMerged + "َتْ", // هِيَ
          rootMerged + "َتَا", // هُمَا f
          rootSplit + "ْنَ", // هُنَّ  (مَدَدْنَ / فَرِرْنَ / عَضِضْنَ)
          rootSplit + "ْتَ", // أَنْتَ
          rootSplit + "ْتُمَا", // أَنْتُمَا
          rootSplit + "ْتُمْ", // أَنْتُمْ
          rootSplit + "ْتِ", // أَنْتِ
          rootSplit + "ْتُمَا", // أَنْتُمَا
          rootSplit + "ْتُنَّ", // أَنْتُنَّ
          rootSplit + "ْتُ", // أَنَا
          rootSplit + "ْنَا"  // نَحْنُ
        ];
      }

      // For Naqis and Lafifs, e.g., da'aa (دَعَا) or ramay (رَمَى) or waqa (وَقَى)
      if (bina === "Naqis" || bina === "Lafif Maqrun" || bina === "Lafif Mafruq") {
        const weak = lam === "و" ? "و" : "ي";
        if (ainVowel === KASRA) {
          return [
            baseMadhi,                                                   // 1. هُوَ
            `${fa}${FATHA}${ain}${KASRA}يَا`,                            // 2. هُمَا m
            `${fa}${FATHA}${ain}${DAMMA}وا`,                             // 3. هُمْ
            `${fa}${FATHA}${ain}${KASRA}يَتْ`,                           // 4. هِيَ
            `${fa}${FATHA}${ain}${KASRA}يَتَا`,                          // 5. هُمَا f
            `${fa}${FATHA}${ain}${KASRA}يْنَ`,                           // 6. هُنَّ
            `${fa}${FATHA}${ain}${KASRA}يْتَ`,                           // 7. أَنْتَ
            `${fa}${FATHA}${ain}${KASRA}يْتُمَا`,                        // 8. أَنْتُمَا
            `${fa}${FATHA}${ain}${KASRA}يْتُمْ`,                         // 9. أَنْتُمْ
            `${fa}${FATHA}${ain}${KASRA}يْتِ`,                          // 10. أَنْتِ
            `${fa}${FATHA}${ain}${KASRA}يْتُمَا`,                        // 11. أَنْتُمَا f
            `${fa}${FATHA}${ain}${KASRA}يْتُنَّ`,                        // 12. أَنْتُنَّ
            `${fa}${FATHA}${ain}${KASRA}يْتُ`,                          // 13. أَنَا
            `${fa}${FATHA}${ain}${KASRA}يْنَا`                           // 14. نَحْنُ
          ];
        } else if (ainVowel === DAMMA) {
          return [
            baseMadhi,                                                   // 1. هُوَ
            `${fa}${FATHA}${ain}${DAMMA}وَا`,                            // 2. هُمَا m
            `${fa}${FATHA}${ain}${DAMMA}وا`,                             // 3. هُمْ
            `${fa}${FATHA}${ain}${DAMMA}وَتْ`,                           // 4. هِيَ
            `${fa}${FATHA}${ain}${DAMMA}وَتَا`,                          // 5. هُمَا f
            `${fa}${FATHA}${ain}${DAMMA}وْنَ`,                           // 6. هُنَّ
            `${fa}${FATHA}${ain}${DAMMA}وْتَ`,                           // 7. أَنْتَ
            `${fa}${FATHA}${ain}${DAMMA}وْتُمَا`,                        // 8. أَنْتُمَا
            `${fa}${FATHA}${ain}${DAMMA}وْتُمْ`,                         // 9. أَنْتُمْ
            `${fa}${FATHA}${ain}${DAMMA}وْتِ`,                          // 10. أَنْتِ
            `${fa}${FATHA}${ain}${DAMMA}وْتُمَا`,                        // 11. أَنْتُمَا f
            `${fa}${FATHA}${ain}${DAMMA}وْتُنَّ`,                        // 12. أَنْتُنَّ
            `${fa}${FATHA}${ain}${DAMMA}وْتُ`,                          // 13. أَنَا
            `${fa}${FATHA}${ain}${DAMMA}وْنَا`                           // 14. نَحْنُ
          ];
        } else {
          return [
            baseMadhi,                                                   // 1. هُوَ (دَعَا / رَمَى)
            weak === "و" ? `${fa}${FATHA}${ain}${FATHA}وَا` : `${fa}${FATHA}${ain}${FATHA}يَا`, // 2. هُمَا m (دَعَوَا / رَمَيَا)
            `${fa}${FATHA}${ain}${FATHA}و${SUKUN}ا`,                   // 3. هُمْ (دَعَوْا / رَمَوْا)
            `${fa}${FATHA}${ain}${FATHA}ت${SUKUN}`,                    // 4. هِيَ (دَعَتْ / رَمَتْ)
            `${fa}${FATHA}${ain}${FATHA}تَا`,                           // 5. هُمَا f (دَعَتَا / رَمَتَا)
            `${fa}${FATHA}${ain}${FATHA}${weak}${SUKUN}نَ`,             // 6. هُنَّ (دَعَوْنَ / رَمَيْنَ)
            `${fa}${FATHA}${ain}${FATHA}${weak}${SUKUN}تَ`,            // 7. أَنْتَ (دَعَوْتَ / رَمَيْتَ)
            `${fa}${FATHA}${ain}${FATHA}${weak}${SUKUN}تُمَا`,          // 8. أَنْتُمَا
            `${fa}${FATHA}${ain}${FATHA}${weak}${SUKUN}تُمْ`,           // 9. أَنْتُمْ
            `${fa}${FATHA}${ain}${FATHA}${weak}${SUKUN}تِ`,            // 10. أَنْتِ
            `${fa}${FATHA}${ain}${FATHA}${weak}${SUKUN}تُمَا`,          // 11. أَنْتُمَا f
            `${fa}${FATHA}${ain}${FATHA}${weak}${SUKUN}تُنَّ`,          // 12. أَنْتُنَّ
            `${fa}${FATHA}${ain}${FATHA}${weak}${SUKUN}تُ`,            // 13. أَنَا
            `${fa}${FATHA}${ain}${FATHA}${weak}${SUKUN}نَا`             // 14. نَحْنُ
          ];
        }
      }

      // For Ajwaf, e.g. qoolaa (قَالَ). From hunna to nahnu, the main vowel is dropped and harmonized:
      // hunna -> qulna (قُلْنَا), anta -> qulta (قُلْتَ), etc.
      // baa'a (بَاعَ) -> bi'na (بِعْنَ), bi'ta (بِعْتَ), etc.
      // Rule 7: bila bertemu nun niswah dan dhomir mutaharik mahal rofak wawu dan ya di kembalikan bila wawu harokat fa fill di harokati dhomah bila ya di harokati kasroh.
      if (bina === "Ajwaf") {
        let leadVowel = KASRA; // Default is kasra for Yai and Bab 4 (fatha in mudhari)
        if (ain === "و" && !tasrif.mudhari.includes("َا")) {
          leadVowel = DAMMA; // Only Bab 1 (wawi - يَفْعُلُ) gets damma
        }
        const base9 = `${fa}${leadVowel}${lam}${SUKUN}`; // e.g. قُلْ or بِعْ or خِفْ
        return [
          baseMadhi, // هُوَ
          baseMadhi + "ا", // هُمَا m
          `${fa}${FATHA}ا${lam}${DAMMA}وا`, // هُمْ
          baseMadhi + "تْ", // هِيَ
          baseMadhi + "تَا", // هُمَا f
          base9 + "ْنَ", // هُنَّ
          base9 + "ْتَ", // أَنْتَ
          base9 + "ْتُمَا", // أَنْتُمَا
          base9 + "ْتُمْ", // أَنْتُمْ
          base9 + "ْتِ", // أَنْتِ
          base9 + "ْتُمَا", // أَنْتُمَا
          base9 + "ْتُنَّ", // أَنْتُنَّ
          base9 + "ْتُ", // أَنَا
          base9 + "ْنَا"  // نَحْنُ
        ];
      }

      // General Shohih / Mitsal: e.g. نَصَرَ
      // We safely targeting only the last letter (lam) to receive the conjugative suffixes
      // instead of string-wide replaces. This is extremely robust!
      const stem = `${fa}${FATHA}${ain}${ainVowel}${lam}`; // e.g. نَصَرَ (without final fatha)
      return [
        stem + FATHA, // هُوَ
        stem + "َا", // هُمَا m
        stem + DAMMA + "وا", // هُمْ
        stem + FATHA + "تْ", // هِيَ
        stem + FATHA + "تَا", // هُمَا f
        stem + SUKUN + "ْنَ", // هُنَّ
        stem + SUKUN + "ْتَ", // أَنْتَ
        stem + SUKUN + "ْتُمَا", // أَنْتُمَا
        stem + SUKUN + "ْتُمْ", // أَنْتُمْ
        stem + SUKUN + "ْتِ", // أَنْتِ
        stem + SUKUN + "ْتُمَا", // أَنْتُمَا
        stem + SUKUN + "ْتُنَّ", // أَنْتُنَّ
        stem + SUKUN + "ْتُ", // أَنَا
        stem + SUKUN + "ْنَا"  // نَحْنُ
      ];
    };

    const buildMudhari14 = (baseMudhari: string): string[] => {
      // Let's design proper Mudhari 14 conjugation
      // baseMudhari is e.g. يَنْصُرُ (ends in damma)
      // We will drop 'يَ' at start and replace with correct prefixes: يَـ, تَـ, أَـ, نَـ
      // And replace ending damma with proper suffix markers.
      const rawStem = baseMudhari.slice(1); // removes the 'ي' at the start (e.g. نْصُرُ / قُولُ / رْمِيُ etc.)
      const stemWithDamma = rawStem;
      const stemWithSukun = rawStem.replace(new RegExp(`${DAMMA}$`), SUKUN);
      const stemNoEndVowel = rawStem.substring(0, rawStem.length - 1); // e.g. نْصُر, قُول, عِد, مَدّ

      // Pronoun prefixes: ya-\u064e, ta-\u064e, a-\u064e, na-\u064e etc.
      // If bina is Mudho'af: e.g. يَمُدُّ (stem width is different)
      // Let's create an elegant, standard-compliant mapping list:
      if (bina === "Mudho'af") {
        // e.g. يَـمُـدُّ
        const prefix = "يَ";
        const tPrefix = "تَ";
        const aPrefix = "أَ";
        const nPrefix = "نَ";
        const vowelChar = baseMudhari.includes(DAMMA) ? DAMMA : (baseMudhari.includes(KASRA) ? KASRA : FATHA);
        const stem = `${fa}${vowelChar}${ain}${SHADDA}`; // e.g. مُدّ or فِرّ or عَضّ
        return [
          prefix + stem + DAMMA, // هُوَ (يَمُدُّ)
          prefix + stem + FATHA + "انِ", // هُمَا m (يَمُدَّانِ)
          prefix + stem + DAMMA + "ونَ", // هُمْ (يَمُدُّونَ)
          tPrefix + stem + DAMMA, // هِيَ (تَمُدُّ)
          tPrefix + stem + FATHA + "انِ", // هُمَا f (تَمُدَّانِ)
          prefix + `${fa}${SUKUN}${ain}${vowelChar}${lam}${SUKUN}ْنَ`, // هُنَّ (يَمْدُدْنَ)
          tPrefix + stem + DAMMA, // أَنْتَ (تَمُدُّ)
          tPrefix + stem + FATHA + "انِ", // أَنْتُمَا m
          tPrefix + stem + DAMMA + "ونَ", // أَنْتُمْ
          tPrefix + stem + KASRA + "ينَ", // أَنْتِ (تَمُدِّينَ)
          tPrefix + stem + FATHA + "انِ", // أَنْتُمَا f
          tPrefix + `${fa}${SUKUN}${ain}${vowelChar}${lam}${SUKUN}ْنَ`, // أَنْتُنَّ (تَمْدُدْنَ)
          aPrefix + stem + DAMMA, // أَنَا (أَمُدُّ)
          nPrefix + stem + DAMMA  // نَحْنُ (نَمُدُّ)
        ];
      }

      if (bina === "Naqis" || bina === "Lafif Maqrun" || bina === "Lafif Mafruq") {
        // e.g. يَدْعُو, يَرْمِي, يَرْضَى, يَقِي
        const endsWithWaw = baseMudhari.endsWith("و") || baseMudhari.endsWith(`و${DAMMA}`) || baseMudhari.endsWith(`ُو`);
        const endsWithAlif = baseMudhari.endsWith("ى") || baseMudhari.endsWith("َى") || baseMudhari.endsWith(`َى`);

        const prefixVowel = baseMudhari.charAt(1); // Usually fatha 'َ' or damma 'ُ'
        const prefY = "ي" + prefixVowel;
        const prefT = "ت" + prefixVowel;
        const prefA = "أ" + prefixVowel;
        const prefN = "ن" + prefixVowel;

        const stemBody = (bina === "Lafif Mafruq" && fa === "و") ? ain : `${fa}${SUKUN}${ain}`; // e.g. دْع or رْم or رْض or ق (for waqa)

        if (endsWithWaw) {
          return [
            prefY + stemBody + DAMMA + "و", // هُوَ (يَدْعُو)
            prefY + stemBody + DAMMA + "وَانِ", // هُمَا m (يَدْعُوَانِ)
            prefY + stemBody + DAMMA + "ونَ", // هُمْ (يَدْعُونَ)
            prefT + stemBody + DAMMA + "و", // هِيَ (تَدْعُو)
            prefT + stemBody + DAMMA + "وَانِ", // هُمَا f (تَدْعُوَانِ)
            prefY + stemBody + DAMMA + "و" + SUKUN + "نَ", // هُنَّ (يَدْعُوْنَ)
            prefT + stemBody + DAMMA + "و", // أَنْتَ (تَدْعُو)
            prefT + stemBody + DAMMA + "وَانِ", // أَنْتُمَا m (تَدْعُوَانِ)
            prefT + stemBody + DAMMA + "ونَ", // أَنْتُمْ (تَدْعُونَ)
            prefT + stemBody + KASRA + "ينَ", // أَنْتِ (تَدْعِينَ)
            prefT + stemBody + DAMMA + "وَانِ", // أَنْتُمَا f (تَدْعُوَانِ)
            prefT + stemBody + DAMMA + "و" + SUKUN + "نَ", // أَنْتُنَّ (تَدْعُوْنَ)
            prefA + stemBody + DAMMA + "و", // أَنَا (أَدْعُو)
            prefN + stemBody + DAMMA + "و"  // نَحْنُ (نَدْعُو)
          ];
        } else if (endsWithAlif) {
          return [
            prefY + stemBody + FATHA + "ى", // هُوَ (يَرْضَى)
            prefY + stemBody + FATHA + "يَانِ", // هُمَا m (يَرْضَيَانِ)
            prefY + stemBody + FATHA + "وْنَ", // هُمْ (يَرْضَوْنَ)
            prefT + stemBody + FATHA + "ى", // هِيَ (تَرْضَى)
            prefT + stemBody + FATHA + "يَانِ", // هُمَا f (تَرْضَيَانِ)
            prefY + stemBody + FATHA + "يْنَ", // هُنَّ (يَرْضَيْنَ)
            prefT + stemBody + FATHA + "ى", // أَنْتَ (تَرْضَى)
            prefT + stemBody + FATHA + "يَانِ", // أَنْتُمَا m (تَرْضَيَانِ)
            prefT + stemBody + FATHA + "وْنَ", // أَنْتُمْ (تَرْضَوْنَ)
            prefT + stemBody + FATHA + "يْنَ", // أَنْتِ (تَرْضَيْنَ)
            prefT + stemBody + FATHA + "يَانِ", // أَنْتُمَا f (tardhoyani)
            prefT + stemBody + FATHA + "يْنَ", // أَنْتُنَّ (تَرْضَيْنَ)
            prefA + stemBody + FATHA + "ى", // أَنَا (أَرْضَى)
            prefN + stemBody + FATHA + "ى"  // نَحْنُ (نَرْضَى)
          ];
        } else {
          // Default endsWithYa (e.g. يَرْمِي)
          return [
            prefY + stemBody + KASRA + "ي", // هُوَ (يَرْمِي)
            prefY + stemBody + KASRA + "يَانِ", // هُمَا m (يَرْمِيَانِ)
            prefY + stemBody + DAMMA + "ونَ", // هُمْ (يَرْمُونَ)
            prefT + stemBody + KASRA + "ي", // هِيَ (تَرْمِي)
            prefT + stemBody + KASRA + "يَانِ", // هُمَا f (تَرْمِيَانِ)
            prefY + stemBody + KASRA + "يْنَ", // هُنَّ (يَرْمِينَ)
            prefT + stemBody + KASRA + "ي", // أَنْتَ (تَرْمِي)
            prefT + stemBody + KASRA + "يَانِ", // أَنْتُمَا m (تَرْمِيَانِ)
            prefT + stemBody + DAMMA + "ونَ", // أَنْتُمْ (تَرْمُونَ)
            prefT + stemBody + KASRA + "ينَ", // أَنْتِ (تَرْمِينَ)
            prefT + stemBody + KASRA + "يَانِ", // أَنْتُمَا f (تَرْمِيَانِ)
            prefT + stemBody + KASRA + "يْنَ", // أَنْتُنَّ (تَرْمِينَ)
            prefA + stemBody + KASRA + "ي", // أَنَا (أَرْمِي)
            prefN + stemBody + KASRA + "ي"  // نَحْنُ (نَرْمِي)
          ];
        }
      }

      const prefY = baseMudhari.charAt(0) + baseMudhari.charAt(1); // 'يَ' / 'يُ'
      const prefT = prefY.replace("ي", "ت"); // 'تَ' / 'تُ'
      const prefA = prefY.replace("ي", "أ"); // 'أَ' / 'أُ'
      const prefN = prefY.replace("ي", "ن"); // 'نَ' / 'نُ'

      // Clean stem ends-vowel pattern helper
      const cleanStem = baseMudhari.substring(2); // e.g. نْصُرُ -> remove 'يَنْ'
      const baseBody = baseMudhari.substring(2, baseMudhari.length - 1); // e.g. n-s-u-r without final vowel

      const shortenAjwafPlural = (v: string) => {
        return v
          .replace(new RegExp(`و${lam}[\u0652]*ْنَ$`), `${lam}${SUKUN}ْنَ`)
          .replace(new RegExp(`ي${lam}[\u0652]*ْنَ$`), `${lam}${SUKUN}ْنَ`)
          .replace(new RegExp(`ا${lam}[\u0652]*ْنَ$`), `${lam}${SUKUN}ْنَ`);
      };

      const resList = [
        prefY + baseBody + DAMMA, // هُوَ
        prefY + baseBody + FATHA + "انِ", // هُمَا m
        prefY + baseBody + DAMMA + "ونَ", // هُمْ
        prefT + baseBody + DAMMA, // هِيَ
        prefT + baseBody + FATHA + "انِ", // هُمَا f
        prefY + baseBody + SUKUN + "ْنَ", // هُنَّ
        prefT + baseBody + DAMMA, // أَنْتَ
        prefT + baseBody + FATHA + "انِ", // أَنْتُمَا m
        prefT + baseBody + DAMMA + "ونَ", // أَنْتُمْ
        prefT + baseBody + KASRA + "ينَ", // أَنْتِ
        prefT + baseBody + FATHA + "انِ", // أَنْتُمَا f
        prefT + baseBody + SUKUN + "ْنَ", // أَنْتُنَّ
        prefA + baseBody + DAMMA, // أَنَا
        prefN + baseBody + DAMMA  // نَحْنُ
      ];

      if (bina === "Ajwaf") {
        resList[5] = shortenAjwafPlural(resList[5]);
        resList[11] = shortenAjwafPlural(resList[11]);
      }

      return resList;
    };

    const buildAmar6 = (baseAmar: string): string[] => {
      // baseAmar is e.g. اُنْصُرْ or قُلْ or عِدْ or مُدَّ
      // The 6 forms are for: Anta, Antuma, Antum, Anti, Antuma, Antunna
      if (bina === "Naqis" || bina === "Lafif Maqrun" || bina === "Lafif Mafruq") {
        const weak = lam === "و" ? "و" : "ي";
        const stemNoVowel = baseAmar.substring(0, baseAmar.length - 1);
        const vowel = baseAmar.substring(baseAmar.length - 1);

        const plural = vowel === FATHA ? `${stemNoVowel}${FATHA}وْا` : `${stemNoVowel}${DAMMA}وا`;
        const anti = vowel === FATHA ? `${stemNoVowel}${FATHA}يْ` : `${stemNoVowel}${KASRA}y`.replace("y", "ي");
        const dual = `${stemNoVowel}${weak}${FATHA}ا`;
        const pluralFem = `${stemNoVowel}${vowel}${weak}${SUKUN}نَ`;

        return [
          baseAmar,   // أَنْتَ
          dual,       // أَنْتُمَا
          plural,     // أَنْتُمْ
          anti,       // أَنْتِ
          dual,       // أَنْتُمَا f
          pluralFem,  // أَنْتُنَّ
        ];
      }
      if (bina === "Mudho'af") {
        // e.g. مُدَّ, فِرَّ, عَضَّ
        // 6 forms are: مُدَّ, مُدَّا, مُدُّوا, مُدِّي, مُدَّا, اُمْدُدْنَ / اِفْرِرْنَ / اِعْضَضْنَ
        const stem = baseAmar.slice(0, -1); // e.g. مُدّ, فِرّ, عَضّ
        const vowelChar = baseAmar.includes(DAMMA) ? DAMMA : (baseAmar.includes(KASRA) ? KASRA : FATHA);
        const hamzahVal = vowelChar === DAMMA ? DAMMA : KASRA;
        const splitPrefix = `ا${hamzahVal}${fa}${SUKUN}${ain}${vowelChar}${lam}`; // e.g. اُمْدُدْ, اِفْرِرْ, اِعْضَضْ
        return [
          baseAmar, // أَنْتَ (مُدَّ)
          stem + FATHA + "ا", // أَنْتُمَا (مُدَّا)
          stem + DAMMA + "وا", // أَنْتُمْ (مُدُّوا)
          stem + KASRA + "ي", // أَنْتِ (مُدِّي)
          stem + FATHA + "ا", // أَنْتُمَا f
          splitPrefix + SUKUN + "ْنَ" // أَنْتُنَّ
        ];
      }
      if (bina === "Ajwaf") {
        let longVowel = ain === "و" ? "ُو" : "ِي";
        if (baseAmar.includes("َ")) {
          longVowel = "َا";
        } else if (baseAmar.includes("ِ")) {
          longVowel = "ِي";
        } else if (baseAmar.includes("ُ")) {
          longVowel = "ُو";
        }
        const longStem = `${fa}${longVowel}${lam}`; // e.g. قُول, بِيْع, خَاف
        const cleanBase = baseAmar.replace(new RegExp(`${SUKUN}`, "g"), "");
        return [
          baseAmar, // أَنْتَ (قُلْ / بِعْ / خَفْ)
          longStem + FATHA + "ا", // أَنْتُمَا (قُولَا / بِيْعَا / خَافَا)
          longStem + DAMMA + "وا", // أَنْتُمْ (قُولُوا / بِيْعُوا / خَافُوا)
          longStem + KASRA + "ي", // أَنْتِ (قُولِي / بِيْعِي / خَافِي)
          longStem + FATHA + "ا", // أَنْتُمَا f
          cleanBase + "ْنَ" // أَنْتُنَّ (قُلْنَ / بِعْنَ / خَفْنَ)
        ];
      }

      // Shohih: e.g. اُ نْ صُ رْ
      const stemNoSukun = baseAmar.endsWith(SUKUN) ? baseAmar.slice(0, -1) : baseAmar;
      return [
        baseAmar, // أَنْتَ (اُنْصُرْ)
        stemNoSukun + FATHA + "ا", // أَنْتُمَا (اُنْصُرَا)
        stemNoSukun + DAMMA + "وا", // أَنْتُمْ (اُنْصُرُوا)
        stemNoSukun + KASRA + "ي", // أَنْتِ (اُنْصُرِي)
        stemNoSukun + FATHA + "ا", // أَنْتُمَا f
        stemNoSukun + SUKUN + "ْنَ", // أَنْتُنَّ (اُنْصُرْنَ)
      ];
    };

    const makeMajzum = (verb: string, index: number): string => {
      if (index === 5 || index === 11) {
        return verb;
      }
      if (verb.endsWith("انِ")) {
        return verb.replace(/انِ$/, "ا");
      }
      if (verb.endsWith("ونَ")) {
        return verb.replace(/ونَ$/, "wa").replace(/wa$/, "وا");
      }
      if (verb.endsWith("inَ") || verb.endsWith("ينَ")) {
        return verb.replace(/ينَ$/, "ي");
      }
      if (bina === "Naqis" || bina === "Lafif Maqrun" || bina === "Lafif Mafruq") {
        if (index === 0 || index === 3 || index === 6) {
          return verb.replace(/[ويى]$/, "");
        }
      }
      if (bina === "Ajwaf") {
        if (index === 0 || index === 3 || index === 6) {
          let cleanVerb = verb.replace(new RegExp(`${DAMMA}$`), SUKUN);
          const regexWaw = new RegExp(`و${lam}${SUKUN}$`);
          const regexYa = new RegExp(`ي${lam}${SUKUN}$`);
          const regexAlif = new RegExp(`ا${lam}${SUKUN}$`);
          if (regexWaw.test(cleanVerb)) {
            return cleanVerb.replace(regexWaw, `${lam}${SUKUN}`);
          }
          if (regexYa.test(cleanVerb)) {
            return cleanVerb.replace(regexYa, `${lam}${SUKUN}`);
          }
          if (regexAlif.test(cleanVerb)) {
            return cleanVerb.replace(regexAlif, `${lam}${SUKUN}`);
          }
          return cleanVerb;
        }
      }
      if (bina === "Mudho'af") {
        if (index === 0 || index === 3 || index === 6) {
          return verb.replace(new RegExp(`${DAMMA}$`), FATHA);
        }
      }
      if (index === 0 || index === 3 || index === 6) {
        return verb.replace(new RegExp(`${DAMMA}$`), SUKUN);
      }
      return verb;
    };

    const buildAmar12 = (baseAmar: string): string[] => {
      const LI_PREFIX = "\u0644\u0650"; // لِ
      let amrGhoib = mudhari14.slice(0, 6).map((verb, idx) => {
        return LI_PREFIX + makeMajzum(verb, idx);
      });
      let amrMukhotob = buildAmar6(baseAmar);
      if (bina.startsWith("Mahmuz")) {
        amrGhoib = amrGhoib.map((verb) => this.applyMahmuzRules(verb));
        amrMukhotob = amrMukhotob.map((verb) => this.applyMahmuzRules(verb));
      }
      return [...amrGhoib, ...amrMukhotob];
    };

    const buildNahi12 = (): string[] => {
      return mudhari14.slice(0, 12).map((verb, idx) => {
        return "لَا " + makeMajzum(verb, idx);
      });
    };

    const tasrifIsim6 = (bentukMufrod: string): string[] => {
      if (!bentukMufrod || bentukMufrod === "—" || bentukMufrod.trim() === "") {
        return ["—", "—", "—", "—", "—", "—"];
      }
      // If Bina Naqis/Lafif and forms like دَاعٍ or رَامٍ or وَاقٍ
      if ((bina === "Naqis" || bina === "Lafif Maqrun" || bina === "Lafif Mafruq") && bentukMufrod.endsWith("ٍ")) {
        const baseIsim = `${fa}َا${ain}ِ`; // e.g. دَاعِ / رَامِ
        const muzakkarMufrod = bentukMufrod;
        const muzakkarTasniyah = baseIsim + "يَانِ"; // دَاعِيَانِ
        const muzakkarJama = `${fa}َا${ain}ُونَ`; // دَاعُونَ
        const muannatsMufrod = baseIsim + "يَةٌ"; // دَاعِيَةٌ
        const muannatsTasniyah = baseIsim + "يَتَانِ"; // دَاعِيَتَانِ
        const muannatsJama = baseIsim + "يَاتٌ"; // دَاعِيَاتٌ

        return [
          muzakkarMufrod,
          muzakkarTasniyah,
          muzakkarJama,
          muannatsMufrod,
          muannatsTasniyah,
          muannatsJama,
        ];
      }

      // bentukMufrod e.g. نَاصِرٌ (ends in tanwin damma 'ٌ' \u064c)
      // replace damma-tanwin with text-suffix. Let's do it robustly:
      const base = bentukMufrod.replace(/[ًٌٍ]$/, ""); // strip tanwin
      
      const muzakkarMufrod = bentukMufrod;
      const muzakkarTasniyah = base + FATHA + "انِ"; // e.g. نَاصِرَانِ
      const muzakkarJama = base + DAMMA + "ونَ"; // e.g. نَاصِرُونَ
      const muannatsMufrod = base + FATHA + "ةٌ"; // e.g. نَاصِرَةٌ
      const muannatsTasniyah = base + FATHA + "تَانِ"; // e.g. نَاصِرَتَانِ
      const muannatsJama = base + FATHA + "اتٌ"; // e.g. نَاصِرَاتٌ

      return [
        muzakkarMufrod,
        muzakkarTasniyah,
        muzakkarJama,
        muannatsMufrod,
        muannatsTasniyah,
        muannatsJama,
      ];
    };

    const madhi14 = buildMadhi14(tasrif.madhi);
    const mudhari14 = buildMudhari14(tasrif.mudhari);
    const amar12 = buildAmar12(tasrif.amar);
    const nahi12 = buildNahi12();

    const isimFail6 = tasrifIsim6(tasrif.isimFail.mufrod);
    const isimMaful6 = tasrifIsim6(tasrif.isimMaful.mufrod);
    const isimZaman6 = tasrifIsim6(tasrif.isimZaman.mufrod);
    const isimMakan6 = tasrifIsim6(tasrif.isimMakan.mufrod);
    const isimAlat6 = tasrifIsim6(tasrif.isimAlat.mufrod);
    const isimMusyabihat6 = tasrifIsim6(tasrif.isimMusyabihat.mufrod);

    return {
      madhi14,
      mudhari14,
      amar12,
      nahi12,
      isimFail6,
      isimMaful6,
      isimZaman6,
      isimMakan6,
      isimAlat6,
      isimMusyabihat6,
    };
  },

  analyzeIsimFailPlural(entry: DictionaryEntry): PluralIsimFail {
    return analyzeIsimFailPlural(entry);
  },

  analyzeIsimMafulPlural(entry: DictionaryEntry): PluralIsimMaful {
    return analyzeIsimMafulPlural(entry);
  },

  analyzeIsimZamanMakanPlural(entry: DictionaryEntry): PluralIsimZamanMakan {
    return analyzeIsimZamanMakanPlural(entry);
  },

  analyzeIsimAlatPlural(entry: DictionaryEntry): PluralIsimAlat {
    return analyzeIsimAlatPlural(entry);
  }
};
