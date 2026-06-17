/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface DataWazan {
  fa: string;         // Character (Arabic)
  ain: string;        // Character (Arabic)
  lam: string;        // Character (Arabic)
  wazanMadhi: string; // e.g. "فَعَلَ"
  wazanMudhari: string; // e.g. "يَفْعُلُ"
  masdar: string | string[];     // e.g. "فَعْلًا" or ["مَدٌّ"]
  sifatMusyabihat?: string;
  babNum?: number;
}

export interface ShighotDetail {
  mufrod: string;
  jamak: string[];
  muntahal: string[];
}

export interface TasrifIstilahi {
  madhi: string;
  mudhari: string;
  masdar: string;
  masdar23: string[];
  isimFail: ShighotDetail;
  isimMaful: ShighotDetail;
  isimMusyabihat: ShighotDetail;
  musyabihat6?: string[];
  mubalaghohFaal: ShighotDetail;
  mubalaghohFa_il: ShighotDetail; // fa'il as fa_il
  mubalaghohMifal: ShighotDetail;
  amar: string;
  nahi: string;
  isimZaman: ShighotDetail;
  isimMakan: ShighotDetail;
  isimAlat: ShighotDetail;
  tafdhilMuzakkar: string;
  tafdhilMuannats: string;
  tafdhilJamak: string;
  marrah: string;
  nau: string;
  isimTashghir: string;
}

export interface TasrifLughowi {
  madhi14: string[];
  mudhari14: string[];
  amar12: string[];
  nahi12: string[];
  isimFail6: string[];
  isimMaful6: string[];
  isimZaman6: string[];
  isimMakan6: string[];
  isimAlat6: string[];
  isimMusyabihat6: string[];
}

export interface PluralSifatMusyabihat {
  katsroh: string;      // Jamak Taksir Katsroh (Plural of Multitude)
  qillah: string;       // Jamak Taksir Qillah (Plural of Paucity)
  muntahal: string;     // Shighot Muntahal Jumu' (Ultimate Plural)
  reference: string;    // Referenced classical dictionaries
  explanation: string;  // Morphological explanation
}

export interface PluralIsimFail {
  katsroh: string;      // Jamak Taksir Katsroh (Plural of Multitude)
  qillah: string;       // Jamak Taksir Qillah (Plural of Paucity / Jamak Salim fallback)
  muntahal: string;     // Shighot Muntahal Jumu' (Ultimate Plural)
  reference: string;    // Referenced classical dictionaries
  explanation: string;  // Morphological explanation
}

export interface PluralIsimMaful {
  katsroh: string;      // Jamak Taksir Katsroh (Plural of Multitude)
  qillah: string;       // Jamak Taksir Qillah (Plural of Paucity / Jamak Salim fallback)
  muntahal: string;     // Shighot Muntahal Jumu' (Ultimate Plural)
  reference: string;    // Referenced classical dictionaries
  explanation: string;  // Morphological explanation
}

export interface PluralIsimZamanMakan {
  mufrod: string;       // Isim Zaman/Makan singular (e.g., مَفْعَلٌ / مَفْعِلٌ)
  katsroh: string;      // Jamak Taksir Katsroh
  qillah: string;       // Jamak Taksir Qillah
  muntahal: string;     // Shighot Muntahal Jumu'
  reference: string;
  explanation: string;
}

export interface PluralIsimAlat {
  mufrod: string;       // Isim Alat singular (e.g., مِفْعَلٌ / مِفْعَالٌ)
  katsroh: string;      // Jamak Taksir Katsroh
  qillah: string;       // Jamak Taksir Qillah
  muntahal: string;     // Shighot Muntahal Jumu'
  reference: string;
  explanation: string;
}

export interface DictionaryEntry {
  id: string;
  root: {
    fa: string;
    ain: string;
    lam: string;
  };
  translation: string;
  babNum: number;   // 1 to 6
  masdar?: string | string[];
  masdarSamai?: string;
  masdarQiyasi?: string;
  reference?: string;
  notes?: string;
  custom?: boolean;
  aiExplanation?: string;
  sifatMusyabihat?: string;
  sifatMusyabihatPlural?: PluralSifatMusyabihat;
  isimFailPlural?: PluralIsimFail;
  isimMafulPlural?: PluralIsimMaful;
  isimZamanMakanPlural?: PluralIsimZamanMakan;
  isimAlatPlural?: PluralIsimAlat;
  bina?: string;
  asal?: string;
  shorof?: any[];
}
