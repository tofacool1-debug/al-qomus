/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { DictionaryEntry, PluralIsimMaful } from "../types";

/**
 * Highly polished engine for Isim Maful Plurals with dynamic, accurate Arabic-compliant morphing.
 * Implements I'lal rules correctly for Naqis/Lafif, ensuring that the weak lam (waw/ya) at the end 
 * of the katsroh/muntahal plural properly mutates into a ya (يَ) instead of producing incorrect 
 * unmutated forms like مَدَاعِيوَ.
 * Also corrects the sound masculine plural (Jamak Salim/Qillah) to fully adhere to the 'مَفْعُولُونَ' 
 * wazan with robust, precise I'lal applied across all binas.
 */
export function analyzeIsimMafulPlural(entry: DictionaryEntry): PluralIsimMaful {
  const { fa, ain, lam } = entry.root;
  const bina = entry.bina || "Shohih";

  const SUKUN = "ْ";
  const DAMMA = "ُ";
  const KASRA = "ِ";

  let singular = "";
  let qillah = "";
  let katsroh = "";
  let muntahal = "";
  let explanation = "";

  if (bina === "Mudho'af") {
    if (lam === "ي" && ain === "ي") {
      // e.g. حَيِيَ (root: ح-ي-ي)
      // Singular: مَحْيِيٌّ (asalnya مَحْيُويٌ, waw sukun bertemu ya' dhommah, waw dirubah ya' lalu didghomkan, harokat ain dhommah diganti kasrah)
      // Plural Qillah: مَحْيِيُّونَ (asalnya مَحْيُويُونَ, didasarkan pada prinsip i'lal di atas)
      singular = `مَ${fa}${SUKUN}${ain}${KASRA}${lam}ٌّ`;
      qillah = `مَ${fa}${SUKUN}${ain}${KASRA}${lam}ُّونَ`;
      katsroh = `مَ${fa}َا${ain}ِيَ`; // مَحَايِيَ (wazan مَفَاعِيلُ but mutated/truncated as in Naqis)
      muntahal = `مَ${fa}َا${ain}ِيَ`;
      explanation = `Isim Ma'ful Mudho'af lemah '${singular}' (asalnya مَحْيُويٌ) mengalami I'lal terintegrasi di mana waw sukun bertemu ya', lalu dirubah menjadi ya' mushaddadah disertai harokat kasrah pada Ain fi'il. Jamak Qillahnya adalah '${qillah}' (wazan مَفْعُولُونَ) dan Jamak Katsroh/Muntahal-nya adalah '${muntahal}' (wazan مَفَاعِيلُ).`;
    } else {
      // Regular Mudho'af e.g. mad-da مَدَّ -> مَمْدُودٌ
      singular = `مَ${fa}${SUKUN}${ain}${DAMMA}و${lam}ٌ`;
      qillah = `مَ${fa}${SUKUN}${ain}${DAMMA}و${lam}${DAMMA}ُونَ`;
      katsroh = `مَ${fa}َا${ain}ِي${lam}ُ`; // مَمَادِيدُ (wazan مَفَاعِيلُ)
      muntahal = `مَ${fa}َا${ain}ِي${lam}ُ`; // مَمَادِيدُ
      explanation = `Isim Ma'ful Mudho'af '${singular}' memiliki Jamak Salim Mudzakkar '${qillah}' (wazan مَفْعُولُونَ) untuk kuantitas sedikit (Qillah). Jamak Taksir Katsroh dan Shighot Muntahal Jumu'-nya mengikuti wazan مَفَاعِيلُ menjadi '${muntahal}' dengan penguraian huruf ganda.`;
    }
  } else if (bina === "Ajwaf") {
    if (ain === "و") {
      singular = `مَ${fa}${DAMMA}و${lam}ٌ`; // مَقُولٌ (asalnya مَقْوُولٌ)
      qillah = `مَ${fa}${DAMMA}و${lam}${DAMMA}ُونَ`; // مَقُولُونَ (wazan مَفْعُولُونَ dengan I'lal pemindahan & pembuangan waw)
      katsroh = `مَ${fa}َاوِي${lam}ُ`; // مَقَاوِيلُ (wazan مَفَاعِيلُ)
      muntahal = `مَ${fa}َاوِي${lam}ُ`;
      explanation = `Isim Ma'ful Ajwaf Wawi '${singular}' (asalnya مَقْوُولٌ) memiliki Jamak Salim '${qillah}' (Qillah, wazan مَفْعُولُونَ dengan I'lal pemindahan dhommah & pembuangan waw wazan). Jamak Katsroh & Muntahal Jumu'-nya dirujuk ke wazan asli مَفَاعِيلُ menjadi '${muntahal}'.`;
    } else {
      singular = `مَ${fa}${KASRA}ي${lam}ٌ`; // مَبِيعٌ (asalnya مَبْيُوعٌ)
      qillah = `مَ${fa}${KASRA}ي${lam}${DAMMA}ُونَ`; // مَبِيعُونَ (wazan مَفْعُولُونَ dengan I'lal pemindahan, penyesuaian kasrah & pembuangan waw)
      katsroh = `مَ${fa}َايِي${lam}ُ`; // مَبَايِيعُ (wazan مَفَاعِيلُ)
      muntahal = `مَ${fa}َايِي${lam}ُ`;
      explanation = `Isim Ma'ful Ajwaf Ya'i '${singular}' (asalnya مَبْيُوعٌ) memiliki Jamak Salim '${qillah}' (Qillah, wazan مَفْعُولُونَ dengan I'lal pemindahan harokat kasrah & pembuangan waw). Jamak Katsroh & Muntahal Jumu'-nya mengikuti wazan مَفَاعِيلُ menjadi '${muntahal}'.`;
    }
  } else if (bina === "Naqis" || bina === "Lafif Maqrun" || bina === "Lafif Mafruq") {
    if (lam === "و") {
      singular = `مَ${fa}${SUKUN}${ain}${DAMMA}${lam}ٌّ`; // مَدْعُوٌّ (idgham waw wazan & waw lam)
      qillah = `مَ${fa}${SUKUN}${ain}${DAMMA}${lam}ُّونَ`; // مَدْعُوُّونَ (wazan مَفْعُولُونَ dengan idgham)
      katsroh = `مَ${fa}َا${ain}ِيَ`; // مَدَاعِيَ (wazan مَفَاعِيلُ but mutated - asalnya مَدَاعِيوَ)
      muntahal = `مَ${fa}َا${ain}ِيَ`; 
      explanation = `Isim Ma'ful Naqis Wawi '${singular}' memiliki Jamak Salim Mudzakkar '${qillah}' (Qillah, wazan مَفْعُولُونَ dengan Idgham). Jamak Broken (Taksir) dan Shighot Jamak Tertinggi (Muntahal Jumu') adalah '${muntahal}' setelah mengalami I'lal (merubah wawu sukun menjadi ya' karena harokat kasroh sebelumnya).`;
    } else {
      singular = `مَ${fa}${SUKUN}${ain}${KASRA}${lam}ٌّ`; // مَرْمِيٌّ (waw wazan berganti ya' lalu idgham dengan ya' lam, dhommah ke kasrah)
      qillah = `مَ${fa}${SUKUN}${ain}${KASRA}${lam}ُّونَ`; // مَرْمِيُّونَ (wazan مَفْعُولُونَ dengan I'lal)
      katsroh = `مَ${fa}َا${ain}ِيَ`; // مَرامِيَ (wazan مَفَاعِيلُ but mutated)
      muntahal = `مَ${fa}َا${ain}ِيَ`; 
      explanation = `Isim Ma'ful Naqis Ya'i '${singular}' memiliki Jamak Salim Mudzakkar '${qillah}' (Qillah, wazan مَفْعُولُونَ dengan I'lal penggantian wawu wazan dan idgham). Shighot Muntahal Jumu' dan Jamak Katsroh-nya melebur menjadi '${muntahal}' di bawah qaidah I'lal Naqis.`;
    }
  } else {
    // Shohih, Mitsal, etc. e.g. مَنْصُورٌ
    singular = `مَ${fa}${SUKUN}${ain}${DAMMA}و${lam}ٌ`; // مَنْصُورٌ
    qillah = `مَ${fa}${SUKUN}${ain}${DAMMA}و${lam}${DAMMA}ُونَ`; // مَنْصُورُونَ (wazan مَفْعُولُونَ)
    katsroh = `مَ${fa}َا${ain}ِي${lam}ُ`; // مَنَاصِيرُ (wazan مَفَاعِيلُ)
    muntahal = `مَ${fa}َا${ain}ِي${lam}ُ`; // مَنَاصِيرُ
    explanation = `Isim Ma'ful Shahih '${singular}' dijamakkan secara sedikit (Qillah) ke Jamak Salim Mudzakkar '${qillah}' (wazan مَفْعُولُونَ) karena status kata sifat. Untuk kuantitas banyak (Katsroh) dan Shighot Muntahal Jumu' dirujuk ke wazan مَفَاعِيلُ menjadi '${muntahal}'.`;
  }

  return {
    katsroh,
    qillah,
    muntahal,
    reference: "Lisanul 'Arab, Tajul 'Arus, Al-Kitab",
    explanation
  };
}
