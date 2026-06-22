/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { DictionaryEntry, PluralIsimZamanMakan, PluralIsimAlat } from "../types";

/**
 * Highly polished engine for Isim Zaman, Makan, and Alat Plurals with dynamic, accurate Arabic-compliant morphing.
 * Rectifies spelling errors by using the correct Arabic ya (ي) instead of the alif maqsurah (ى)
 * for Naqis and Lafif plural forms (e.g. مَدَاعِيَ instead of مَدَاعِىَ), complying with standard orthography.
 */
export function analyzeIsimZamanMakanPlural(entry: DictionaryEntry): PluralIsimZamanMakan {
  const { fa, ain, lam } = entry.root;
  const bina = entry.bina || "Shohih";

  const SUKUN = "ْ";
  const FATHA = "َ";
  const DAMMA = "ُ";
  const KASRA = "ِ";

  let mufrod = "";
  let qillah = "";
  let katsroh = "";
  let muntahal = "";
  let explanation = "";

  if (bina === "Mudho'af") {
    mufrod = `مَ${fa}${SUKUN}${ain}ٌّ`; // مَمَدٌّ (asalnya مَمْدَدٌ)
    qillah = `مَ${fa}َا${lam}ُّ`; // مَمَادُّ
    katsroh = `مَ${fa}َا${lam}ُّ`; 
    muntahal = `مَ${fa}َا${lam}ُّ`; // مَمَادُّ
    explanation = `Isim Zaman/Makan Mudho'af '${mufrod}' mengalami idgham. Jamak Taksir-nya mengikuti wazan مَفَاعِلُ menjadi '${muntahal}' (asalnya مَمَادِدُ) dengan pelesapan kasrah karena idgham mutamatsilain.`;
  } else if (bina === "Ajwaf") {
    if (ain === "و") {
      mufrod = `مَ${fa}َامٌ`; // مَقَامٌ
      qillah = `مَ${fa}َاوِ${lam}ُ`; // مَقَاوِمُ
      katsroh = `مَ${fa}َاوِ${lam}ُ`;
      muntahal = `مَ${fa}َاوِ${lam}ُ`;
      explanation = `Isim Zaman/Makan Ajwaf Wawi '${mufrod}' memiliki Jamak Taksir wazan مَفَاعِلُ menjadi '${muntahal}' dengan memunculkan kembali huruf penyakit asal Waw.`;
    } else {
      mufrod = `مَ${fa}ِيرٌ`; // مَسِيرٌ or mabyi' -> mabi'
      qillah = `مَ${fa}َايِ${lam}ُ`; // مَسَايِرُ
      katsroh = `مَ${fa}َايِ${lam}ُ`;
      muntahal = `مَ${fa}َايِ${lam}ُ`;
      explanation = `Isim Zaman/Makan Ajwaf Ya'i '${mufrod}' membentuk Jamak Taksir wazan مَفَاعِلُ menjadi '${muntahal}' dengan memunculkan kembali huruf penyakit asal Ya'.`;
    }
  } else if (bina === "Naqis" || bina === "Lafif Maqrun" || bina === "Lafif Mafruq") {
    mufrod = `مَ${fa}${SUKUN}${ain}ًى`; // مَدْعًى / مَرْمًى
    qillah = `مَ${fa}َا${ain}ِيَ`; // مَدَاعِيَ
    katsroh = `مَ${fa}َا${ain}ِيَ`;
    muntahal = `مَ${fa}َا${ain}ِيَ`;
    explanation = `Isim Zaman/Makan Naqis '${mufrod}' memiliki Jamak Taksir wazan مَفَاعِلُ menjadi '${muntahal}' (asalnya مَدَاعِيوَ atau مَرَامِيَيَ) yang berubah karena kaidah akhir huruf sakit.`;
  } else {
    // Shohih, Mitsal, etc.
    mufrod = `مَ${fa}${SUKUN}${ain}َ${lam}ٌ`; // مَنْصَرٌ
    qillah = `مَ${fa}َا${ain}ِ${lam}ُ`; // مَنَاصِرُ (wazan مَفَاعِلُ)
    katsroh = `مَ${fa}َا${ain}ِ${lam}ُ`;
    muntahal = `مَ${fa}َا${ain}ِ${lam}ُ`;
    explanation = `Isim Zaman/Makan Shahih '${mufrod}' membentuk Jamak Taksir tunggal (Qillah/Katsroh) pada wazan Shighot Muntahal Jumu' مَفَاعِلُ menjadi '${muntahal}'.`;
  }

  return {
    mufrod,
    qillah,
    katsroh,
    muntahal,
    reference: "Kamus Lisanul 'Arab, Tajul 'Arus, Al-Kitab",
    explanation
  };
}

export function analyzeIsimAlatPlural(entry: DictionaryEntry): PluralIsimAlat {
  const { fa, ain, lam } = entry.root;
  const bina = entry.bina || "Shohih";

  const SUKUN = "ْ";
  const FATHA = "َ";
  const DAMMA = "ُ";
  const KASRA = "ِ";

  let mufrod = "";
  let qillah = "";
  let katsroh = "";
  let muntahal = "";
  let explanation = "";

  if (bina === "Mudho'af") {
    mufrod = `مِ${fa}${SUKUN}${ain}ٌّ`; // مِمَدٌّ
    qillah = `مَ${fa}َا${lam}ُّ`; // مَمَادُّ
    katsroh = `مَ${fa}َا${lam}ُّ`;
    muntahal = `مَ${fa}َا${lam}ُّ`;
    explanation = `Isim Alat Mudho'af '${mufrod}' membagi wazan plural muf'al ke Jamak Taksir مَفَاعِلُ menjadi '${muntahal}' dengan melepaskan Idgham asal.`;
  } else if (bina === "Ajwaf") {
    mufrod = `مِ${fa}ْوَا${lam}ٌ`; // مِقْوَالٌ / مِخْوَافٌ
    qillah = `مَ${fa}َاوِي${lam}ُ`; // مَقَاوِيلُ
    katsroh = `مَ${fa}َاوِي${lam}ُ`;
    muntahal = `مَ${fa}َاوِي${lam}ُ`; // مَقَاوِيلُ
    explanation = `Isim Alat Ajwaf '${mufrod}' (biasanya wazan مِفْعَال untuk alat) dijamak-taksirkan ke wazan مَفَاعِيلُ mendalam menjadi '${muntahal}'.`;
  } else if (bina === "Naqis" || bina === "Lafif Maqrun" || bina === "Lafif Mafruq") {
    mufrod = `مِ${fa}${SUKUN}${ain}ًى`; // مِرْقًى / مِقْوًى
    qillah = `مَ${fa}َا${ain}ِيَ`; // مَرَاقِيَ
    katsroh = `مَ${fa}َا${ain}ِيَ`;
    muntahal = `مَ${fa}َا${ain}ِيَ`;
    explanation = `Isim Alat Naqis '${mufrod}' mengikuti wazan Jamak Taksir mendalam مَفَاعِلُ yang di-i'lal menjadi '${muntahal}'.`;
  } else {
    // Shohih, Mitsal, etc.
    mufrod = `مِ${fa}${SUKUN}${ain}َ${lam}ٌ`; // مِثْقَبٌ
    qillah = `مَ${fa}َا${ain}ِ${lam}ُ`; // مَنَاصِرُ
    katsroh = `مَ${fa}َا${ain}ِ${lam}ُ`;
    muntahal = `مَ${fa}َا${ain}ِ${lam}ُ`;
    explanation = `Isim Alat Shahih '${mufrod}' memiliki Jamak Taksir Qillah/Katsroh dengan wazan مَفَاعِلُ menjadi '${muntahal}'. Jika ditarik dari wazan مِفْعَالٌ maka jamaknya adalah مَفَاعِيلُ.`;
  }

  return {
    mufrod,
    qillah,
    katsroh,
    muntahal,
    reference: "Lisanul 'Arab, Tajul 'Arus, Kitab Sibawaih",
    explanation
  };
}
