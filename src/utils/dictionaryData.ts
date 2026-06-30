/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { DictionaryEntry, DataWazan } from "../types";

export const PRESET_DICTIONARY: DictionaryEntry[] = [
  {
    id: "qala",
    root: { fa: "ق", ain: "و", lam: "ل" },
    translation: "Berkata / Berucap / Berbicara",
    babNum: 1,
    bina: "Ajwaf",
    masdarSamai: "قَوْلٌ / تَقْوَالٌ / قِيلٌ",
    masdarQiyasi: "مَقَالٌ / مَقَالَةٌ",
    sifatMusyabihat: "قَؤُولٌ",
  },
  {
    id: "nadda",
    root: { fa: "ن", ain: "د", lam: "د" },
    translation: "Melarikan diri / kabur / menjauh / ganjil (Kamus Munawwir, Lisanul 'Arab)",
    babNum: 2,
    bina: "Mudho'af",
    masdarSamai: "نَدٌّ / نُدُودٌ",
    masdarQiyasi: "مَنَدٌّ",
    sifatMusyabihat: "نَدِيدٌ / نَدٌّ",
    sifatMusyabihatPlural: {
      muntahal: "-"
  }
  },
  {
    id: "nazza",
    root: { fa: "ن", ain: "ز", lam: "ز" },
    translation: "Memancar / menetes / melompat / gelisah (Kamus Munawwir, Lisanul 'Arab)",
    babNum: 2,
    bina: "Mudho'af",
    masdarSamai: "نَزٌّ / نَزِيزٌ",
    masdarQiyasi: "مَنَزٌّ",
    sifatMusyabihat: "نَزِيزٌ",
    sifatMusyabihatPlural: {
      mufrod_mudzakkar: "نَزِيزٌ",
      mufrod_muannas: "نَزِيزَةٌ",
      katsroh: "أَنْزِزَةٌ / نِزَازٌ",
      muntahal: "-."
  }
  },
  {
    id: "nassa",
    root: { fa: "ن", ain: "س", lam: "س" },
    translation: "Mengeringkan / menjadi kering / menggiring (Kamus Munawwir, Lisanul 'Arab)",
    babNum: 1,
    bina: "Mudho'af",
    masdarSamai: "نَسٌّ / نُسُوسٌ",
    masdarQiyasi: "مَنَسٌّ",
    sifatMusyabihat: "نَسِيسٌ",
    sifatMusyabihatPlural: {
      mufrod_mudzakkar: "نَسِيسٌ",
      mufrod_muannas: "نَسِيسَةٌ",
      katsroh: "أَنْسِسَةٌ / نِسَاسٌ",
      muntahal: "-."
    }
  },
  {
    id: "nasysya",
    root: { fa: "ن", ain: "ش", lam: "ش" },
    translation: "Mengering / menghalau burung / mendidih (Kamus Munawwir, Lisanul 'Arab)",
    babNum: 1,
    bina: "Mudho'af",
    masdarSamai: "نَشٌّ / نَشِيشٌ",
    masdarQiyasi: "مَنَشٌّ",
    sifatMusyabihat: "نَشِيشٌ / نَشَّاشٌ",
    sifatMusyabihatPlural: {
      mufrod_mudzakkar: "نَشِيشٌ / نَشَّاشٌ",
      mufrod_muannas: "نَشِيشَةٌ / نَشَّاشَةٌ",
      katsroh: "أَنْشِشَةٌ / نَشَّاشُونَ",
      muntahal: "-."
    }
  },
  {
    id: "nashsha",
    root: { fa: "ن", ain: "ص", lam: "ص" },
    translation: "Menegaskan / menyusun teks / menaikkan / menentukan (Kamus Munawwir, Lisanul 'Arab)",
    babNum: 1,
    bina: "Mudho'af",
    masdarSamai: "نَصٌّ / نَصِيصٌ",
    masdarQiyasi: "مَنَصٌّ",
    sifatMusyabihat: "نَصِيصٌ",
    sifatMusyabihatPlural: {
      mufrod_mudzakkar: "نَصِيصٌ",
      mufrod_muannas: "نَصِيصَةٌ",
      katsroh: "أَنْصِصَةٌ / نِصَاصٌ",
      muntahal: "-."
    }
  },
  {
    id: "nadhdha",
    root: { fa: "ن", ain: "ض", lam: "ض" },
    translation: "Menetes air / memancar perlahan / menguangkan barang (Kamus Munawwir, Lisanul 'Arab)",
    babNum: 2,
    bina: "Mudho'af",
    masdarSamai: "نَضٌّ / نَضِيضٌ",
    masdarQiyasi: "مَنَضٌّ",
    sifatMusyabihat: "نَضِيضٌ / نَضَّاضٌ",
    sifatMusyabihatPlural: {
      mufrod_mudzakkar: "نَضِيضٌ / نَضَّاضٌ",
      mufrod_muannas: "نَضِيضَةٌ / نَضَّاضَةٌ",
      katsroh: "أَنْضِضَةٌ / نَضَّاضُونَ",
      muntahal: "-."
    }
  },
  {
    id: "naththa",
    root: { fa: "ن", ain: "ط", lam: "ط" },
    translation: "Melompat / meloncat / meregangkan (Kamus Munawwir, Lisanul 'Arab)",
    babNum: 1,
    bina: "Mudho'af",
    masdarSamai: "نَطٌّ / نَطِيطٌ",
    masdarQiyasi: "مَنَطٌّ",
    sifatMusyabihat: "نَطِيطٌ / نَطَّاطٌ",
    sifatMusyabihatPlural: {
      mufrod_mudzakkar: "نَطِيطٌ / نَطَّاطٌ",
      mufrod_muannas: "نَطِيطَةٌ / نَطَّاطَةٌ",
      katsroh: "أَنْطِطَةٌ / نَطَّاطُونَ",
      muntahal: "-."
    }
  },
  {
    id: "naffa",
    root: { fa: "ن", ain: "ف", lam: "ف" },
    translation: "Meniup hidung / bersin / meremahkan (Kamus Munawwir, Lisanul 'Arab)",
    babNum: 2,
    bina: "Mudho'af",
    masdarSamai: "نَفٌّ / نَفِيفٌ",
    masdarQiyasi: "مَنَفٌّ",
    sifatMusyabihat: "نَفِيفٌ",
    sifatMusyabihatPlural: {
      mufrod_mudzakkar: "نَفِيفٌ",
      mufrod_muannas: "نَفِيفَةٌ",
      katsroh: "أَنْفِفَةٌ / نِفَافٌ",
      muntahal: "-."
    }
  },
  {
    id: "naqqa",
    root: { fa: "ن", ain: "ق", lam: "ق" },
    translation: "Berbunyi (katak) / berkotek (ayam) / mengerik (Kamus Munawwir, Lisanul 'Arab)",
    babNum: 1,
    bina: "Mudho'af",
    masdarSamai: "نَقٌّ / نَقِيقٌ",
    masdarQiyasi: "مَنَقٌّ",
    sifatMusyabihat: "نَقِيقٌ / نَقَّاقٌ",
    sifatMusyabihatPlural: {
      mufrod_mudzakkar: "نَقِيقٌ / نَقَّاقٌ",
      mufrod_muannas: "نَقِيقَةٌ / نَقَّاقَةٌ",
      katsroh: "أَنْقِقَةٌ / نَقَّاقُونَ",
      muntahal: "-."
    }
  },
  {
    id: "namma",
    root: { fa: "ن", ain: "م", lam: "م" },
    translation: "Mengadu domba / memfitnah / menghias (Kamus Munawwir, Lisanul 'Arab)",
    babNum: 1,
    bina: "Mudho'af",
    masdarSamai: "نَمٌّ / نَمِيمٌ / نَمِيمَةٌ",
    masdarQiyasi: "مَنَمٌّ",
    sifatMusyabihat: "نَمِيمٌ / نَمُومٌ",
    sifatMusyabihatPlural: {
      mufrod_mudzakkar: "نَمِيمٌ / نَمُومٌ",
      mufrod_muannas: "نَمِيمَةٌ / نَمُومَةٌ",
      katsroh: "أَنِمَّاءُ / نُمَّامٌ",
      muntahal: "-"
    }
  },
  {
    id: "nafada",
    root: { fa: "ن", ain: "ف", lam: "د" },
    translation: "Habis / punah / berakhir / habis persediaan (Kamus Munawwir, Al-Munjid, Lisanul 'Arab)",
    babNum: 4,
    bina: "Shohih",
    masdarSamai: "نَفَادٌ",
    masdarQiyasi: "مَنْفَدٌ",
    sifatMusyabihat: "نَفِدٌ / نَفِيدٌ",
    sifatMusyabihatPlural: {
      katsroh: "أَنْفَادٌ",
      muntahal: "-"
    }
  },
  {
    id: "nafadha",
    root: { fa: "ن", ain: "ف", lam: "ذ" },
    translation: "Menembus / berlaku / melaksanakan / tembus (Kamus Munawwir, Al-Munjid, Lisanul 'Arab)",
    babNum: 1,
    bina: "Shohih",
    masdarSamai: "نَفَاذٌ / نُفُوذٌ",
    masdarQiyasi: "مَنْفَذٌ",
    sifatMusyabihat: "نَفِيذٌ",
    sifatMusyabihatPlural: {
      katsroh: "نُفُذٌ / أَنْفَاذٌ",
      muntahal: "مَنَافِذُ"
    }
  },
  {
    id: "nafara",
    root: { fa: "ن", ain: "ف", lam: "ر" },
    translation: "Lari / menjauh / bubar / berangkat perang (Kamus Munawwir, Al-Munjid, Lisanul 'Arab)",
    babNum: 1,
    bina: "Shohih",
    masdarSamai: "نَفْرٌ / نُفُورٌ / نَفِيرٌ",
    masdarQiyasi: "مَنْفَرٌ",
    sifatMusyabihat: "نَفِيرٌ / نَفُورٌ",
    sifatMusyabihatPlural: {
      katsroh: "أَنْفَارٌ / نُفُرٌ",
      muntahal: "-"
    }
  },
  {
    id: "nafasa",
    root: { fa: "ن", ain: "ف", lam: "س" },
    translation: "Menjadi berharga / bernilai tinggi / kikir (Kamus Munawwir, Al-Munjid, Lisanul 'Arab)",
    babNum: 5,
    bina: "Shohih",
    masdarSamai: "نَفَاسَةٌ / نُفْسَةٌ",
    masdarQiyasi: "مَنْفَسٌ",
    sifatMusyabihat: "نَفِيسٌ",
    sifatMusyabihatPlural: {
      katsroh: "نِفَاسٌ / أَنْفَاسٌ / نُفَسَاءُ",
      muntahal: "نَفَائِسُ"
    }
  },
  {
    id: "nafa_a",
    root: { fa: "ن", ain: "ف", lam: "ع" },
    translation: "Bermanfaat / memberi guna / berguna (Kamus Munawwir, Al-Munjid, Lisanul 'Arab)",
    babNum: 3,
    bina: "Shohih",
    masdarSamai: "نَفْعٌ",
    masdarQiyasi: "مَنْفَعَةٌ",
    sifatMusyabihat: "نَفِيعٌ / نَفِعٌ",
    sifatMusyabihatPlural: {
      katsroh: "أَنْفَاعٌ / نُفُوعٌ",
      muntahal: "مَنَافِعُ"
    }
  },
  {
    id: "nafaqa",
    root: { fa: "ن", ain: "ف", lam: "ق" },
    translation: "Laris (barang) / habis / berkurang / mati (hewan) (Kamus Munawwir, Al-Munjid, Lisanul 'Arab)",
    babNum: 1,
    bina: "Shohih",
    masdarSamai: "نَفَاقٌ / نَفَقٌ",
    masdarQiyasi: "مَنْفَقٌ",
    sifatMusyabihat: "نَفِيقٌ / نَفِقٌ",
    sifatMusyabihatPlural: {
      katsroh: "نُفُقٌ / أَنْفَاقٌ",
      muntahal: "-"
    }
  },
  {
    id: "nafay",
    root: { fa: "ن", ain: "ف", lam: "ي" },
    translation: "Meniadakan / menolak / membuang / mengusir (Kamus Munawwir, Al-Munjid, Lisanul 'Arab)",
    babNum: 2,
    bina: "Naqis",
    masdarSamai: "نَفْيٌ / نِفَايَةٌ",
    masdarQiyasi: "مَنْفًى",
    sifatMusyabihat: "نَفِيٌّ",
    sifatMusyabihatPlural: {
      katsroh: "أَنْفِيَاءُ / نُفَاةٌ",
      muntahal: "-"
    }
  },
  {
    id: "naqaba",
    root: { fa: "ن", ain: "ق", lam: "ب" },
    translation: "Melubangi / menembus dinding / menjadi pemimpin (Kamus Munawwir, Al-Munjid, Lisanul 'Arab)",
    babNum: 1,
    bina: "Shohih",
    masdarSamai: "نَقْبٌ / نِقَابَةٌ",
    masdarQiyasi: "مَنْقَبٌ",
    sifatMusyabihat: "نَقِيبٌ",
    sifatMusyabihatPlural: {
      katsroh: "نُقَبَاءُ / أَنْقَابٌ",
      muntahal: "-"
    }
  },
  {
    id: "naqaha",
    root: { fa: "ن", ain: "ق", lam: "ح" },
    translation: "Merevisi / memperbaiki karangan / memotong dahan (Kamus Munawwir, Al-Munjid, Lisanul 'Arab)",
    babNum: 3,
    bina: "Shohih",
    masdarSamai: "نَقْحٌ / نِقَاحٌ",
    masdarQiyasi: "مَنْقَحٌ",
    sifatMusyabihat: "نَقِيحٌ / نَقِحٌ",
    sifatMusyabihatPlural: {
      katsroh: "أَنْقَاحٌ",
      muntahal: "-"
    }
  },
  {
    id: "naqada",
    root: { fa: "ن", ain: "ق", lam: "د" },
    translation: "Mengkritik / meneliti uang / membayar tunai (Kamus Munawwir, Al-Munjid, Lisanul 'Arab)",
    babNum: 1,
    bina: "Shohih",
    masdarSamai: "نَقْدٌ / تَنْقَادٌ",
    masdarQiyasi: "مَنْقَدٌ",
    sifatMusyabihat: "نَقِيدٌ",
    sifatMusyabihatPlural: {
      katsroh: "أَنْقَادٌ / نُقُودٌ",
      muntahal: "-"
    }
  },
  {
    id: "naqadh",
    root: { fa: "ن", ain: "ق", lam: "ذ" },
    translation: "Menyelamatkan / melepaskan / membebaskan (Kamus Munawwir, Al-Munjid, Lisanul 'Arab)",
    babNum: 1,
    bina: "Shohih",
    masdarSamai: "نَقْذٌ / نَقَاذٌ",
    masdarQiyasi: "مَنْقَذٌ",
    sifatMusyabihat: "نَقِيذٌ",
    sifatMusyabihatPlural: {
      katsroh: "أَنْقَاذٌ / نُقُذٌ",
      muntahal: "-"
    }
  },
  {
    id: "naqasa",
    root: { fa: "ن", ain: "ق", lam: "ص" },
    translation: "Berkurang / Menyusut / Mengurangi",
    babNum: 1,
    bina: "Shohih",
    masdarSamai: "نَقْصٌ / نُقْصَانٌ",
    masdarQiyasi: "مَنْقَصَةٌ / نَقِيصَةٌ",
    sifatMusyabihat: "نَقِيصٌ / نَقِصٌ",
    sifatMusyabihatPlural: {
      katsroh: "نُقَصٌ / نَقَائِصُ",
      muntahal: "مَنَاقِصُ / نَقَائِصُ"
    }
  },
  {
    id: "naqadha",
    root: { fa: "ن", ain: "ق", lam: "ض" },
    translation: "Merusak / Membatalkan / Meruntuhkan",
    babNum: 1,
    bina: "Shohih",
    masdarSamai: "نَقْضٌ / تَنْقَاضٌ",
    masdarQiyasi: "مَنْقَضٌ / نَقِيضَةٌ",
    sifatMusyabihat: "نَقِيضٌ / نَقِضٌ",
    sifatMusyabihatPlural: {
      mufrod_mudzakkar: "نَقِيضٌ / نَقِضٌ",
      mufrod_muannas: "نَقِيضَةٌ / نَقِضَةٌ",
      katsroh: "أَنْقَاضٌ / نُقُضٌ"
    }
  },
  {
    id: "naqaa",
    root: { fa: "ن", ain: "ق", lam: "ع" },
    translation: "Merendam / Puas minum / Menetap",
    babNum: 3,
    bina: "Shohih",
    masdarSamai: "نَقْعٌ / نُقُوعٌ",
    masdarQiyasi: "مَنْقَعٌ / نَقَاعَةٌ",
    sifatMusyabihat: "نَقِيعٌ / نَقِعٌ",
    sifatMusyabihatPlural: {
      mufrod_mudzakkar: "نَقِيعٌ / نَقِعٌ",
      mufrod_muannas: "نَقِيعَةٌ / نَقِعَةٌ",
      katsroh: "نِقَاعٌ / نُقُوعٌ / أَنْقِعَةٌ"
    }
  },
  {
    id: "naqala",
    root: { fa: "ن", ain: "ق", lam: "ل" },
    translation: "Memindahkan / Menularkan / Meriwayatkan",
    babNum: 1,
    bina: "Shohih",
    masdarSamai: "نَقْلٌ / تَنْقَالٌ",
    masdarQiyasi: "مَنْقَلٌ / نَقِيلٌ",
    sifatMusyabihat: "نَقِيلٌ / نَقِلٌ",
    sifatMusyabihatPlural: {
      mufrod_mudzakkar: "نَقِيلٌ / نَقِلٌ",
      mufrod_muannas: "نَقِيلَةٌ / نَقِلَةٌ",
      katsroh: "أَنْقَالٌ / نُقُلٌ",
      muntahal: "نَقَائِلُ"
    }
  },
  {
    id: "naqama",
    root: { fa: "ن", ain: "ق", lam: "م" },
    translation: "Membenci / Menghukum / Membalas dendam",
    babNum: 2,
    bina: "Shohih",
    masdarSamai: "نَقْمٌ / نُقُومٌ",
    masdarQiyasi: "مَنْقَمَةٌ / نَقَامَةٌ",
    sifatMusyabihat: "نَقِيمٌ / نَقِمٌ",
    sifatMusyabihatPlural: {
      mufrod_mudzakkar: "نَقِيمٌ / نَقِمٌ",
      mufrod_muannas: "نَقِيمَةٌ / نَقِمَةٌ",
      katsroh: "نُقَمٌ / نِقَامٌ / أَنْقَامٌ"
    }
  },
  {
    id: "nakaha",
    root: { fa: "ن", ain: "ك", lam: "ح" },
    translation: "Menikahi / Melakukan pernikahan",
    babNum: 2,
    bina: "Shohih",
    masdarSamai: "نِكَاحٌ / نَكْحٌ",
    masdarQiyasi: "مَنْكَحٌ",
    sifatMusyabihat: "نَكِيحٌ / نَكِحٌ",
    sifatMusyabihatPlural: {
      mufrod_mudzakkar: "نَكِيحٌ / نَكِحٌ",
      mufrod_muannas: "نَكِيحَةٌ / نَكِحَةٌ",
      katsroh: "نُكُحٌ / نِكَاحٌ",
    }
  },
  {
    id: "nakeda",
    root: { fa: "ن", ain: "ك", lam: "د" },
    translation: "Menjadi susah / Sengsara / Kikir",
    babNum: 4,
    bina: "Shohih",
    masdarSamai: "نَكَدٌ / نُكُودٌ",
    masdarQiyasi: "مَنْكَدٌ / نَكَادَةٌ",
    sifatMusyabihat: "نَكِدٌ / نَكِيدٌ / أَنْكَدُ",
    sifatMusyabihatPlural: {
      mufrod_mudzakkar: "نَكِدٌ / نَكِيدٌ / أَنْكَدُ",
      mufrod_muannas: "نَكِدَةٌ / نَكِيدَةٌ / نَكْدَاءُ",
      katsroh: "نُكُدٌ / أَنْكَادٌ"
    }
  },
  {
    id: "nakira",
    root: { fa: "ن", ain: "ك", lam: "ر" },
    translation: "Ingkar / Tidak tahu / Merasa asing",
    babNum: 4,
    bina: "Shohih",
    masdarSamai: "نَكَرٌ / نُكْرٌ / نُكْرَانٌ",
    masdarQiyasi: "نَكَارَةٌ / مَنْكَرٌ",
    sifatMusyabihat: "نَكِيرٌ / نَكِرٌ / أَنْكَرُ",
    sifatMusyabihatPlural: {
      mufrod_mudzakkar: "نَكِيرٌ / نَكِرٌ / أَنْكَرُ",
      mufrod_muannas: "نَكِيرَةٌ / نَكِرَةٌ / نَكْرَاءُ",
      katsroh: "نُكُرٌ / نُكَرَاءُ / أَنْكَارٌ",
    }
  },
  {
    id: "nakasa",
    root: { fa: "ن", ain: "ك", lam: "س" },
    translation: "Menundukkan / Membalikkan / Menjerumuskan",
    babNum: 1,
    bina: "Shohih",
    masdarSamai: "نَكْسٌ / تَنْكَاسٌ",
    masdarQiyasi: "مَنْكَسٌ",
    sifatMusyabihat: "نَكِيسٌ / نَكِسٌ",
    sifatMusyabihatPlural: {
      mufrod_mudzakkar: "نَكِيسٌ / نَكِسٌ",
      mufrod_muannas: "نَكِيسَةٌ / نَكِسَةٌ",
      katsroh: "نُكُسٌ / أَنْكَاسٌ",
    }
  },
  {
    id: "nakaso",
    root: { fa: "ن", ain: "ك", lam: "ص" },
    translation: "Mundur kembali / Berbalik arah",
    babNum: 1,
    bina: "Shohih",
    masdarSamai: "نُكُوصٌ / نَكْصٌ",
    masdarQiyasi: "مَنْكَصٌ",
    sifatMusyabihat: "نَكِيصٌ / نَكِصٌ",
    sifatMusyabihatPlural: {
      mufrod_mudzakkar: "نَكِيصٌ / نَكِصٌ",
            mufrod_muannas: "نَكِيصَةٌ / نَكِصَةٌ",
      katsroh: "نُكُصٌ / أَنْكَاصٌ",
    }
  },
  {
    id: "nakatha",
    root: { fa: "ن", ain: "ك", lam: "ث" },
    translation: "Merusak / Melanggar janji",
    babNum: 1,
    bina: "Shohih",
    masdarSamai: "نَكْثٌ / نُكُوثٌ",
    masdarQiyasi: "نَكِيثَةٌ",
    sifatMusyabihat: "نَكِيثٌ / نَكِثٌ",
    sifatMusyabihatPlural: {
      katsroh: "نُكُثٌ / أَنْكَاثٌ"
    }
  },
  {
    id: "namaa",
    root: { fa: "ن", ain: "م", lam: "و" },
    translation: "Tumbuh / Berkembang / Bertambah",
    babNum: 1,
    bina: "Naqis",
    masdarSamai: "نُمُوٌّ / نَمَاءٌ",
    masdarQiyasi: "تَنْمِيَةٌ / مَنْمًى",
    sifatMusyabihat: "نَمِىٌّ / نَمٍ"
  },
  {
    id: "nahaba",
    root: { fa: "ن", ain: "ه", lam: "ب" },
    translation: "Merampas / Menjarah / Mengambil paksa",
    babNum: 3,
    bina: "Shohih",
    masdarSamai: "نَهْبٌ / تَنْهَابٌ",
    masdarQiyasi: "مَنْهَبٌ",
    sifatMusyabihat: "نَهِيبٌ / نَهِبٌ"
  },
  {
    id: "nahaja",
    root: { fa: "ن", ain: "ه", lam: "ج" },
    translation: "Menempuh jalan / Menjelaskan / Terengah-engah",
    babNum: 3,
    bina: "Shohih",
    masdarSamai: "نَهْجٌ / نُهُوجٌ",
    masdarQiyasi: "مَنْهَجٌ",
    sifatMusyabihat: "نَهِيجٌ / نَهِجٌ / أَنْهَجُ"
  },
  {
    id: "nahada",
    root: { fa: "ن", ain: "ه", lam: "د" },
    translation: "Bangkit / Menyerang / Menonjol",
    babNum: 3,
    bina: "Shohih",
    masdarSamai: "نَهْدٌ / نُهُودٌ",
    masdarQiyasi: "نَهَادَةٌ",
    sifatMusyabihat: "نَهِيدٌ / نَهِدٌ"
  },
  {
    id: "nahara",
    root: { fa: "ن", ain: "ه", lam: "ر" },
    translation: "Mengalirkan / Membentak / Menghardik",
    babNum: 3,
    bina: "Shohih",
    masdarSamai: "نَهْرٌ / نَهَرٌ",
    masdarQiyasi: "تَنْهَارٌ / مَنْهَرٌ",
    sifatMusyabihat: "نَهِيرٌ / نَهِرٌ"
  },
  {
    id: "nahay",
    root: { fa: "ن", ain: "ه", lam: "ي" },
    translation: "Melarang / Mencegah",
    babNum: 3,
    bina: "Naqis",
    masdarSamai: "نَهْيٌ / نُهْيَةٌ",
    masdarQiyasi: "تَنْهِيَةٌ / مَنْهًى",
    sifatMusyabihat: "نَهِيٌّ / نَهٍِ"
  },
  {
    id: "nama",
    root: { fa: "ن", ain: "و", lam: "م" },
    translation: "Tidur / Beristirahat",
    babNum: 4,
    bina: "Ajwaf",
    masdarSamai: "نَوْمٌ / نِيَامَةٌ",
    masdarQiyasi: "مَنَامٌ",
    sifatMusyabihat: "نَئُومٌ / نَيُومٌ",
    sifatMusyabihatPlural: {
      katsroh: "نُوَمٌ / نِيَامٌ",
      muntahal: "مَنَاوِمُ"
    }
  },
  {
    id: "naha",
    root: { fa: "ن", ain: "و", lam: "ح" },
    translation: "Meratap / Menangis histeris",
    babNum: 1,
    bina: "Ajwaf",
    masdarSamai: "نَوْحٌ / نِيَاحٌ / نِيَاحَةٌ",
    masdarQiyasi: "مَنَاحٌ",
    sifatMusyabihat: "نَوُوحٌ / نَوِيحٌ"
  },
  {
    id: "nala",
    root: { fa: "ن", ain: "ي", lam: "ل" },
    translation: "Memperoleh / Mendapatkan / Mencapai",
    babNum: 4,
    bina: "Ajwaf",
    masdarSamai: "نَيْلٌ / نَالٌ",
    masdarQiyasi: "مَنَالٌ",
    sifatMusyabihat: "نَيِيلٌ / نَيِلٌ",
    sifatMusyabihatPlural: {
      katsroh: "أَنْيَالٌ / نِيَالٌ / نَيِلُونَ / نُيُلٌ",
      muntahal: "نَوَائِلُ / مَنَايِلُ"
    }
  },
  {
    id: "nabba",
    root: { fa: "ن", ain: "ب", lam: "ب" },
    translation: "Berteriak / Berbunyi (kambing) / Mengeluarkan aroma",
    babNum: 1,
    bina: "Mudho'af",
    masdarSamai: "نَبٌّ / نَبِيبٌ",
    masdarQiyasi: "تَنْبِيبٌ / مَنَبٌّ",
    sifatMusyabihat: "نَبِيبٌ / نَبٌّ"
  },
  {
    id: "najja",
    root: { fa: "ن", ain: "ج", lam: "ج" },
    translation: "Mengeluarkan air / Mengalir / Mendesing",
    babNum: 1,
    bina: "Mudho'af",
    masdarSamai: "نَجٌّ / نَجِيجٌ",
    masdarQiyasi: "تَنْجَاجٌ / مَنَجٌّ",
    sifatMusyabihat: "نَجِيجٌ / نَجٌّ"
  },
  {
    id: "wasala",
    root: { fa: "و", ain: "ص", lam: "ل" },
    translation: "Sampai / tiba / menghubungkan / menyambung (Kamus Munawwir, Lisanul 'Arab)",
    babNum: 2,
    bina: "Mitsal",
    masdarSamai: "وَصْلٌ / صِلَةٌ / وُصُولٌ",
    masdarQiyasi: "مَوْصِلٌ",
    sifatMusyabihat: "وَصِيلٌ / وَصُولٌ",
    sifatMusyabihatPlural: {
      muntahal: "-"
    }
  },
  {
    id: "wasaya",
    root: { fa: "و", ain: "ص", lam: "ي" },
    translation: "Berwasiat / memesankan / merekomendasikan (Kamus Munawwir, Lisanul 'Arab)",
    babNum: 2,
    bina: "Lafif Mafruq",
    masdarSamai: "وَصْيٌ / وَصِيَّةٌ / تَوْصِيَةٌ",
    masdarQiyasi: "مَوْصًى",
    sifatMusyabihat: "وَصِيٌّ",
    sifatMusyabihatPlural: {
      muntahal: "-"
    }
  },
  {
    id: "wadha_a",
    root: { fa: "و", ain: "ض", lam: "ع" },
    translation: "Meletakkan / menaruh / merendahkan (Kamus Munawwir, Lisanul 'Arab)",
    babNum: 3,
    bina: "Mitsal",
    masdarSamai: "وَضْعٌ / ضَعَةٌ / مَوْضِعٌ",
    masdarQiyasi: "مَوْضَعٌ",
    sifatMusyabihat: "وَضِيعٌ / وَضُوعٌ",
    sifatMusyabihatPlural: {
      muntahal: "-"
    }
  },
  {
    id: "wathi_a",
    root: { fa: "و", ain: "ط", lam: "أ" },
    translation: "Menginjak / memijak / menyetubuhi (Kamus Munawwir, Lisanul 'Arab)",
    babNum: 4,
    bina: "Mitsal Wal Mahmuz Lam",
    masdarSamai: "وَطْءٌ / طَأَةٌ",
    masdarQiyasi: "مَوْطَأٌ",
    sifatMusyabihat: "وَطِيءٌ",
    sifatMusyabihatPlural: {
      mufrod_mudzakkar: "وَطِيءٌ",
      mufrod_muannas: "وَطِيئَةٌ",
      katsroh: "وُطُؤٌ / أَوْطِئَاءُ",
      muntahal: "-."
    }
  },
  {
    id: "wa'azha",
    root: { fa: "و", ain: "ع", lam: "ظ" },
    translation: "Menasihati / memberi wejangan (Kamus Munawwir, Lisanul 'Arab)",
    babNum: 2,
    bina: "Mitsal",
    masdarSamai: "وَعْظٌ / عِظَةٌ / مَوْعِظَةٌ",
    masdarQiyasi: "مَوْعِظٌ",
    sifatMusyabihat: "وَعِيظٌ / وَعُوظٌ",
    sifatMusyabihatPlural: {
      muntahal: "-"
    }
  },
  {
    id: "wa'a",
    root: { fa: "و", ain: "ع", lam: "ي" },
    translation: "Memahami / menghafal / menyadari / menampung (Kamus Munawwir, Lisanul 'Arab)",
    babNum: 2,
    bina: "Lafif Mafruq",
    masdarSamai: "وَعْيٌ / وِعَاءٌ",
    masdarQiyasi: "مَوْعًى",
    sifatMusyabihat: "وَعِيٌّ",
    sifatMusyabihatPlural: {
      mufrod_mudzakkar: "وَعِيٌّ",
      mufrod_muannas: "وَعِيَّةٌ",
      katsroh: "أَوْعِيَاءُ / أَوْعِيَةٌ",
      muntahal: "أَوْعِيَةٌ"
    }
  },
  {
    id: "wafara",
    root: { fa: "و", ain: "ف", lam: "ر" },
    translation: "Melimpah / mencukupi / menghemat (Kamus Munawwir, Lisanul 'Arab)",
    babNum: 2,
    bina: "Mitsal",
    masdarSamai: "وَفْرٌ / وُفُورٌ / وِفَارَةٌ",
    masdarQiyasi: "مَوْفِرٌ",
    sifatMusyabihat: "وَفِيرٌ / وَفُورٌ",
    sifatMusyabihatPlural: {
      muntahal: "-"
    }
  },
  {
    id: "wafadha",
    root: { fa: "و", ain: "ف", lam: "ض" },
    translation: "Berlari cepat / bergegas (Kamus Munawwir, Lisanul 'Arab)",
    babNum: 2,
    bina: "Mitsal",
    masdarSamai: "وَفْضٌ / وَفَضَانٌ",
    masdarQiyasi: "مَوْفِضٌ",
    sifatMusyabihat: "وَفِيضٌ / وَفَّاضٌ",
    sifatMusyabihatPlural: {
      mufrod_mudzakkar: "وَفِيضٌ / وَفَّاضٌ",
      mufrod_muannas: "وَفِيضَةٌ / وَفَّاضَةٌ",
      katsroh: "أَوْفِضَاءُ / وَفَّاضُونَ",
      muntahal: "-."
    }
  },
  {
    id: "wafaqa",
    root: { fa: "و", ain: "ف", lam: "ق" },
    translation: "Sesuai / cocok / pas / menepati (Kamus Munawwir, Lisanul 'Arab)",
    babNum: 2,
    bina: "Mitsal",
    masdarSamai: "وَفْقٌ / وِفَاقٌ",
    masdarQiyasi: "مَوْفِقٌ",
    sifatMusyabihat: "وَفِيقٌ / وَفُوقٌ",
    sifatMusyabihatPlural: {
      muntahal: "-"
    }
  },
  {
    id: "waqaba",
    root: { fa: "و", ain: "ق", lam: "ب" },
    translation: "Masuk / tenggelam / menjadi gelap (Kamus Munawwir, Lisanul 'Arab)",
    babNum: 2,
    bina: "Mitsal",
    masdarSamai: "وَقْبٌ / وُقُوبٌ",
    masdarQiyasi: "مَوْقِبٌ",
    sifatMusyabihat: "وَقِيبٌ / وَقُوبٌ",
    sifatMusyabihatPlural: {
      muntahal: "-"
    }
  },
  {
    id: "waqada",
    root: { fa: "و", ain: "ق", lam: "د" },
    translation: "Menyala / berkobar (Kamus Munawwir, Lisanul 'Arab)",
    babNum: 2,
    bina: "Mitsal",
    masdarSamai: "وَقْدٌ / وُقُودٌ / وَقَدَانٌ",
    masdarQiyasi: "مَوْقِدٌ",
    sifatMusyabihat: "وَقِيدٌ / وَقُودٌ",
    sifatMusyabihatPlural: {
      muntahal: "-"
    }
  },
  {
    id: "waqa_a",
    root: { fa: "و", ain: "ق", lam: "ع" },
    translation: "Jatuh / terjadi / terletak (Kamus Munawwir, Lisanul 'Arab)",
    babNum: 3,
    bina: "Mitsal",
    masdarSamai: "وُقُوعٌ / وَقْعٌ",
    masdarQiyasi: "مَوْقَعٌ",
    sifatMusyabihat: "وَقِيعٌ / وَقُوعٌ"
  },
  {
    id: "waqafa",
    root: { fa: "و", ain: "ق", lam: "ف" },
    translation: "Berdiri / berhenti / mewakafkan (Kamus Munawwir, Lisanul 'Arab)",
    babNum: 2,
    bina: "Mitsal",
    masdarSamai: "وَقْفٌ / وُقُوفٌ",
    masdarQiyasi: "مَوْقِفٌ",
    sifatMusyabihat: "وَقِيفٌ / وَقُوفٌ",
    sifatMusyabihatPlural: {
      muntahal: "-"
    }
  },
  {
    id: "waka_a",
    root: { fa: "و", ain: "ك", lam: "أ" },
    translation: "Menekan / bersandar / duduk mantap (Kamus Munawwir, Lisanul 'Arab)",
    babNum: 2,
    bina: "Mitsal",
    masdarSamai: "وَكْئٌ / وُكَاءٌ",
    masdarQiyasi: "مَوْكَأٌ",
    sifatMusyabihat: "وَكِؤٌ / وَكِيءٌ",
    sifatMusyabihatPlural: {
      muntahal: "-"
    }
  },
  {
    id: "wakaba",
    root: { fa: "و", ain: "ك", lam: "ب" },
    translation: "Berjalan perlahan / rajin / terus-menerus (Kamus Munawwir, Lisanul 'Arab)",
    babNum: 2,
    bina: "Mitsal",
    masdarSamai: "وَكْبٌ / وُكُوبٌ / وَكَبَانٌ",
    masdarQiyasi: "مَوْكِبٌ",
    sifatMusyabihat: "وَكِيبٌ / وَكُوبٌ",
    sifatMusyabihatPlural: {
      muntahal: "-"
    }
  },
  {
    id: "wakala",
    root: { fa: "و", ain: "ك", lam: "ل" },
    translation: "Menyerahkan urusan / mewakilkan / berserah diri (Kamus Munawwir, Lisanul 'Arab)",
    babNum: 2,
    bina: "Mitsal",
    masdarSamai: "وَكْلٌ / وُكُولٌ / وَكَلةٌ",
    masdarQiyasi: "مَوْكِلٌ",
    sifatMusyabihat: "وَكِيلٌ / وَكُولٌ",
    sifatMusyabihatPlural: {
      muntahal: "-"
    }
  },
  {
    id: "walada",
    root: { fa: "و", ain: "ل", lam: "د" },
    translation: "Melahirkan / memperanakkan (Kamus Munawwir, Lisanul 'Arab)",
    babNum: 2,
    bina: "Mitsal",
    masdarSamai: "وِلَادَةٌ / مَوْلِدٌ / وَلَدٌ",
    masdarQiyasi: "مَوْلِدٌ",
    sifatMusyabihat: "وَلِيدٌ / وَلُودٌ",
    sifatMusyabihatPlural: {
      mufrod_mudzakkar: "وَلِيدٌ / وَلُودٌ",
      mufrod_muannas: "وَلِيدَةٌ / وَلُودَةٌ",
      katsroh: "وِلْدَانٌ / وُلُدٌ",
      muntahal: "-."
    }
  },
  {
    id: "waligha",
    root: { fa: "و", ain: "ل", lam: "غ" },
    translation: "Menjilat wadah (anjing) / meminum sedikit (Kamus Munawwir, Lisanul 'Arab)",
    babNum: 4,
    bina: "Mitsal",
    masdarSamai: "وَلْغٌ / وُلُوغٌ",
    masdarQiyasi: "مَوْلَغٌ",
    sifatMusyabihat: "وَلِيغٌ / وَلُوغٌ",
    sifatMusyabihatPlural: {
      muntahal: "-"
    }
  },
  {
    id: "waliya",
    root: { fa: "و", ain: "ل", lam: "ي" },
    translation: "Menguasai / memimpin / menolong / dekat (Kamus Munawwir, Lisanul 'Arab)",
    babNum: 6,
    bina: "Lafif Mafruq",
    masdarSamai: "وِلَايَةٌ / وَلَايَةٌ / وَلْيٌ",
    masdarQiyasi: "مَوْلًى",
    sifatMusyabihat: "وَلِيٌّ",
    sifatMusyabihatPlural: {
      muntahal: "-"
    }
  },
  {
    id: "wajaba",
    root: { fa: "و", ain: "ج", lam: "ب" },
    translation: "Wajib / harus / tetap / gugur (Kamus Munawwir, Lisanul 'Arab)",
    babNum: 2,
    bina: "Mitsal",
    masdarSamai: "وُجُوبٌ / وَجْبٌ / وَجْبَةٌ",
    masdarQiyasi: "مَوْجِبٌ",
    sifatMusyabihat: "وَجِيبٌ / وَجُوبٌ",
    sifatMusyabihatPlural: {
      muntahal: "-"
    }
  },
  {
    id: "wajila",
    root: { fa: "و", ain: "ج", lam: "ل" },
    translation: "Takut / gentar (Kamus Munawwir, Lisanul 'Arab)",
    babNum: 4,
    bina: "Mitsal",
    masdarSamai: "وَجَلٌ / مَوْجَلٌ",
    masdarQiyasi: "مَوْجَلٌ",
    sifatMusyabihat: "وَجِلٌ / وَجِيلٌ",
    sifatMusyabihatPlural: {
      muntahal: "-"
    }
  },
  {
    id: "wajia",
    root: { fa: "و", ain: "ج", lam: "ع" },
    translation: "Merasa sakit / menderita (Kamus Munawwir, Lisanul 'Arab)",
    babNum: 4,
    bina: "Mitsal",
    masdarSamai: "وَجَعٌ / مَوْجَعٌ",
    masdarQiyasi: "مَوْجَعٌ",
    sifatMusyabihat: "وَجِعٌ / وَجِيعٌ",
    sifatMusyabihatPlural: {
      muntahal: "-"
    }
  },
  {
    id: "wahada",
    root: { fa: "و", ain: "ح", lam: "د" },
    translation: "Menjadi tunggal / menyendiri (Kamus Munawwir, Lisanul 'Arab)",
    babNum: 2,
    bina: "Mitsal",
    masdarSamai: "وَحْدٌ / وُحُودٌ / وَحَادَةٌ",
    masdarQiyasi: "مَوْحِدٌ",
    sifatMusyabihat: "وَحِيدٌ / وُحَادٌ",
    sifatMusyabihatPlural: {
      mufrod_mudzakkar: "وَحِيدٌ / وُحَادٌ",
      mufrod_muannas: "وَحِيدَةٌ / وُحَادَةٌ",
      katsroh: "وُحَدَاءُ / وُحَادُونَ",
      muntahal: "-."
    }
  },
  {
    id: "wahaa",
    root: { fa: "و", ain: "ح", lam: "ي" },
    translation: "Membisikkan / memberi wahyu / menulis (Kamus Munawwir, Lisanul 'Arab)",
    babNum: 2,
    bina: "Lafif Mafruq",
    masdarSamai: "وَحْيٌ / وُحِيٌّ",
    masdarQiyasi: "مَوْحًى",
    sifatMusyabihat: "وَحِيٌّ",
    sifatMusyabihatPlural: {
      mufrod_mudzakkar: "وَحِيٌّ",
      mufrod_muannas: "وَحِيَّةٌ",
      katsroh: "أَوْحِيَاءُ / وُحِيٌّ",
      muntahal: "-."
    }
  },
  {
    id: "wada_a",
    root: { fa: "و", ain: "د", lam: "ع" },
    translation: "Meninggalkan / membiarkan / berdamai / titip (Kamus Munawwir, Lisanul 'Arab)",
    babNum: 3,
    bina: "Mitsal",
    masdarSamai: "وَدْعٌ / وَدَاعٌ / دَعَةٌ",
    masdarQiyasi: "مَوْدَعٌ",
    sifatMusyabihat: "وَدِيعٌ"
  },
  {
    id: "wadhara",
    root: { fa: "و", ain: "ذ", lam: "ر" },
    translation: "Meninggalkan / membiarkan (Kamus Munawwir, Lisanul 'Arab)",
    babNum: 3,
    bina: "Mitsal",
    masdarSamai: "وَذْرٌ",
    masdarQiyasi: "مَوْذَرٌ",
    sifatMusyabihat: "وَذِيرٌ",
    sifatMusyabihatPlural: {
      mufrod_mudzakkar: "وَذِيرٌ",
      mufrod_muannas: "وَذِيرَةٌ",
      katsroh: "أَوْذِرَاءُ / وُذُرٌ",
      muntahal: "-."
    }
  },
  {
    id: "warada",
    root: { fa: "و", ain: "ر", lam: "د" },
    translation: "Datang / tiba / sampai / hadir di sumber air (Kamus Munawwir, Lisanul 'Arab)",
    babNum: 2,
    bina: "Mitsal",
    masdarSamai: "وُرُودٌ / وَرْدٌ",
    masdarQiyasi: "مَوْرِدٌ",
    sifatMusyabihat: "وَرِيدٌ / وَرُودٌ",
    sifatMusyabihatPlural: {
      mufrod_mudzakkar: "وَرِيدٌ / وَرُودٌ",
      mufrod_muannas: "وَرِيدَةٌ / وَرُودَةٌ",
      katsroh: "وُرُدٌ / أَوْرِدَةٌ",
      muntahal: "أَوْرِدَةٌ"
    }
  },
  {
    id: "waraqa",
    root: { fa: "و", ain: "ر", lam: "ق" },
    translation: "Mengeluarkan daun / berdaun rimbun / mencetak uang perak (Kamus Munawwir, Lisanul 'Arab)",
    babNum: 2,
    bina: "Mitsal",
    masdarSamai: "وَرَقٌ / وُرُوقٌ",
    masdarQiyasi: "مَوْرِقٌ",
    sifatMusyabihat: "وَرِيقٌ / وَرِقٌ",
    sifatMusyabihatPlural: {
      mufrod_mudzakkar: "وَرِيقٌ / وَرِقٌ",
      mufrod_muannas: "وَرِيقَةٌ / وَرِقَةٌ",
      katsroh: "وُرُقٌ / أَوْرِقَاءُ",
      muntahal: "-."
    }
  },
  {
    id: "warima",
    root: { fa: "و", ain: "ر", lam: "م" },
    translation: "Bengkak / menggelembung (Kamus Munawwir, Lisanul 'Arab)",
    babNum: 6,
    bina: "Mitsal",
    masdarSamai: "وَرَمٌ / وُرُومٌ",
    masdarQiyasi: "مَوْرِمٌ",
    sifatMusyabihat: "وَرِمٌ / وَرِيمٌ",
    sifatMusyabihatPlural: {
      muntahal: "-"
    }
  },
  {
    id: "wazara",
    root: { fa: "و", ain: "ز", lam: "ر" },
    translation: "Memikul beban / berdosa / membantu (Kamus Munawwir, Lisanul 'Arab)",
    babNum: 2,
    bina: "Mitsal",
    masdarSamai: "وِزْرٌ / وِزَارَةٌ",
    masdarQiyasi: "مَوْزِرٌ",
    sifatMusyabihat: "وَزِيرٌ",
    sifatMusyabihatPlural: {
      muntahal: "-"
    }
  },
  {
    id: "wazana",
    root: { fa: "و", ain: "ز", lam: "ن" },
    translation: "Menimbang / mengukur / menilai berat (Kamus Munawwir, Lisanul 'Arab)",
    babNum: 2,
    bina: "Mitsal",
    masdarSamai: "وَزْنٌ / زِنَةٌ",
    masdarQiyasi: "مَوْزِنٌ",
    sifatMusyabihat: "وَزِينٌ / وَزُونٌ",
    sifatMusyabihatPlural: {
      muntahal: "-"
    }
  },
  {
    id: "wasi_a",
    root: { fa: "و", ain: "س", lam: "ع" },
    translation: "Luas / lapang / memuat / menampung (Kamus Munawwir, Lisanul 'Arab)",
    babNum: 4,
    bina: "Mitsal",
    masdarSamai: "سَعَةٌ / وُسْعٌ",
    masdarQiyasi: "مَوْسَعٌ",
    sifatMusyabihat: "وَسِيعٌ",
    sifatMusyabihatPlural: {
      muntahal: "-"
    }
  },
  {
    id: "wasama",
    root: { fa: "و", ain: "س", lam: "م" },
    translation: "Memberi tanda / mencap / menghiasi (Kamus Munawwir, Lisanul 'Arab)",
    babNum: 2,
    bina: "Mitsal",
    masdarSamai: "وَسْمٌ / سِمَةٌ",
    masdarQiyasi: "مَوْسِمٌ",
    sifatMusyabihat: "وَسِيمٌ",
    sifatMusyabihatPlural: {
      muntahal: "-"
    }
  },
  {
    id: "wasira",
    root: { fa: "و", ain: "س", lam: "ر" },
    translation: "Menjadi kaya / hidup makmur (Kamus Munawwir, Lisanul 'Arab)",
    babNum: 4,
    bina: "Mitsal",
    masdarSamai: "وَسَرٌ",
    masdarQiyasi: "مَوْسَرٌ",
    sifatMusyabihat: "وَسِيرٌ / وَسِرٌ",
    sifatMusyabihatPlural: {
      muntahal: "-"
    }
  },
  {
    id: "washaa",
    root: { fa: "و", ain: "ش", lam: "ي" },
    translation: "Menghias / memfitnah / mengadu domba (Kamus Munawwir, Lisanul 'Arab)",
    babNum: 2,
    bina: "Lafif Mafruq",
    masdarSamai: "وَشْيٌ / وِشَايَةٌ",
    masdarQiyasi: "مَوْشًى",
    sifatMusyabihat: "وَشِيٌّ",
    sifatMusyabihatPlural: {
      muntahal: "-"
    }
  },
  {
    id: "wasafa",
    root: { fa: "و", ain: "ص", lam: "ف" },
    translation: "Sifat / menyemati / menggambarkan (Kamus Munawwir, Lisanul 'Arab)",
    babNum: 2,
    bina: "Mitsal",
    masdarSamai: "وَصْفٌ / صِفَةٌ",
    masdarQiyasi: "مَوْصِفٌ",
    sifatMusyabihat: "وَصِيفٌ",
    sifatMusyabihatPlural: {
      muntahal: "-"
    }
  },
  {
    id: "hazza",
    root: { fa: "ه", ain: "ز", lam: "ز" },
    translation: "Menggoncang / menggetarkan / menggoyangkan (Kamus Munawwir, Lisanul 'Arab)",
    babNum: 1,
    bina: "Mudho'af",
    masdarSamai: "هَزٌّ / هَزِيزٌ",
    masdarQiyasi: "مَهَزٌّ",
    sifatMusyabihat: "هَزِيزٌ / هَزَّازٌ",
    sifatMusyabihatPlural: {
      mufrod_mudzakkar: "هَزِيزٌ / هَزَّازٌ",
      mufrod_muannas: "هَزِيزَةٌ / هَزَّازَةٌ",
      katsroh: "هِزَّانٌ / هَزَّازُونَ",
      muntahal: "-."
    }
  },
  {
    id: "hasysya",
    root: { fa: "ه", ain: "ش", lam: "ش" },
    translation: "Menjadi rapuh / gembira / menyongsong dengan senyuman / merontokkan daun (Kamus Munawwir, Lisanul 'Arab)",
    babNum: 4,
    bina: "Mudho'af",
    masdarSamai: "هَشَاشَةٌ / هَشٌّ",
    masdarQiyasi: "مَهَشٌّ",
    sifatMusyabihat: "هَشِيشٌ / هَشٌّ",
    sifatMusyabihatPlural: {
      muntahal: "-"
    }
  },
  {
    id: "hadhama",
    root: { fa: "ه", ain: "ض", lam: "م" },
    translation: "Mencerna makanan / menindas / bersabar (Kamus Munawwir, Lisanul 'Arab)",
    babNum: 2,
    bina: "Shohih",
    masdarSamai: "هَضْمٌ / هَضِيمٌ",
    masdarQiyasi: "مَهْضَمٌ",
    sifatMusyabihat: "هَضِيمٌ / هَضُومٌ",
    sifatMusyabihatPlural: {
      muntahal: "-"
    }
  },
  {
    id: "halaka",
    root: { fa: "ه", ain: "ل", lam: "ك" },
    translation: "Binasah / hancur / mati (Kamus Munawwir, Lisanul 'Arab)",
    babNum: 2,
    bina: "Shohih",
    masdarSamai: "هَلَاكٌ / هُلْكٌ / تَهْلُكَةٌ",
    masdarQiyasi: "مَهْلَكٌ",
    sifatMusyabihat: "هَلِيكٌ / هَلُوكٌ",
    sifatMusyabihatPlural: {
      mufrod_mudzakkar: "هَلِيكٌ / هَلُوكٌ",
      mufrod_muannas: "هَلِيكَةٌ / هَلُوكَةٌ",
      katsroh: "هَلْكَى / هُلَّاكٌ",
      muntahal: "-."
    }
  },
  {
    id: "hamma",
    root: { fa: "ه", ain: "م", lam: "م" },
    translation: "Bertekad / merencanakan / menyedihkan (Kamus Munawwir, Lisanul 'Arab)",
    babNum: 1,
    bina: "Mudho'af",
    masdarSamai: "هَمٌّ / مَهَمَّةٌ",
    masdarQiyasi: "مَهَمٌّ",
    sifatMusyabihat: "هَمِيمٌ / هَمُومٌ",
    sifatMusyabihatPlural: {
      mufrod_mudzakkar: "هَمِيمٌ / هَمُومٌ",
      mufrod_muannas: "هَمِيمَةٌ / هَمُومَةٌ",
      katsroh: "أَهِمَّاءُ / هُمُومٌ",
      muntahal: "-."
    }
  },
  {
    id: "hani_a",
    root: { fa: "ه", ain: "ن", lam: "أ" },
    translation: "Menikmati makanan / merasa senang / bahagia (Kamus Munawwir, Lisanul 'Arab)",
    babNum: 4,
    bina: "Mahmuz Lam",
    masdarSamai: "هَنْئٌ / هَنَاءٌ / هَنَاءَةٌ",
    masdarQiyasi: "مَهْنَأٌ",
    sifatMusyabihat: "هَنِيءٌ / هَنِئٌ",
    sifatMusyabihatPlural: {
      muntahal: "-"
    }
  },
  {
    id: "hawiya",
    root: { fa: "ه", ain: "و", lam: "ي" },
    translation: "Mencintai / menyukai / menyayangi (Kamus Munawwir, Lisanul 'Arab)",
    babNum: 4,
    bina: "Lafif Maqrun",
    masdarSamai: "هَوًى / هَوَاءٌ",
    masdarQiyasi: "مَهْوًى",
    sifatMusyabihat: "هَوِيٌّ / هَوٍ",
    sifatMusyabihatPlural: {
      mufrod_mudzakkar: "هَوِيٌّ",
      mufrod_muannas: "هَوِيَّةٌ",
      katsroh: "أَهْوِيَاءُ",
      muntahal: "أَهَاوِيُّ"
    }
  },
  {
    id: "hawa",
    root: { fa: "ه", ain: "و", lam: "ي" },
    translation: "Jatuh / runtuh / turun dengan cepat (Kamus Munawwir, Lisanul 'Arab)",
    babNum: 2,
    bina: "Lafif Maqrun",
    masdarSamai: "هُوِيٌّ / هَوًى",
    masdarQiyasi: "مَهْوًى",
    sifatMusyabihat: "هَوِيٌّ",
    sifatMusyabihatPlural: {
      katsroh: "ُاَهْوِيَّاء",
      muntahal: "أَهَاوِيُّ"
    }
  },
  {
    id: "haana",
    root: { fa: "ه", ain: "و", lam: "ن" },
    translation: "Menjadi hina / rendah / sepele / mudah (Kamus Munawwir, Lisanul 'Arab)",
    babNum: 1,
    bina: "Ajwaf",
    masdarSamai: "هَوْنٌ / هَوَانٌ / مَهَانَةٌ",
    masdarQiyasi: "مَهَانٌ",
    sifatMusyabihat: "هَوِينٌ / هَيِّنٌ",
    sifatMusyabihatPlural: {
      muntahal: "-"
    }
  },
  {
    id: "haaba",
    root: { fa: "ه", ain: "ي", lam: "ب" },
    translation: "Takut / segan / menghormati (Kamus Munawwir, Lisanul 'Arab)",
    babNum: 4,
    bina: "Ajwaf",
    masdarSamai: "هَيْبٌ / هَيْبَةٌ / مَهَابَةٌ",
    masdarQiyasi: "مَهَابٌ",
    sifatMusyabihat: "هَيُوبٌ / هَيِيبٌ",
    sifatMusyabihatPlural: {
      mufrod_mudzakkar: "هَيُوبٌ / هَيِيبٌ",
      mufrod_muannas: "هَيُوبَةٌ / هَيِيبَةٌ",
      katsroh: "هُيُبٌ / هُيَّبٌ",
      muntahal: "-."
    }
  },
  {
    id: "habba",
    root: { fa: "ه", ain: "ب", lam: "ب" },
    translation: "Meniup (angin) / terbangun / bangkit melakukan sesuatu (Kamus Munawwir, Lisanul 'Arab)",
    babNum: 1,
    bina: "Mudho'af",
    masdarSamai: "هَبٌّ / هُبُوبٌ / هَبِيبٌ",
    masdarQiyasi: "مَهَبٌّ",
    sifatMusyabihat: "هَبُوبٌ / هَبِيبٌ",
    sifatMusyabihatPlural: {
      mufrod_mudzakkar: "هَبُوبٌ / هَبِيبٌ",
      mufrod_muannas: "هَبُوبَةٌ / هَبِيبَةٌ",
      katsroh: "هُبُبٌ / أَهْبِبَةٌ",
      muntahal: "-."
    }
  },
  {
    id: "hadda",
    root: { fa: "ه", ain: "د", lam: "د" },
    translation: "Meruntuhkan / merobohkan / melemahkan (Kamus Munawwir, Lisanul 'Arab)",
    babNum: 1,
    bina: "Mudho'af",
    masdarSamai: "هَدٌّ / هَدَادٌ",
    masdarQiyasi: "مَهَدٌّ",
    sifatMusyabihat: "هَدِيدٌ / هَدُودٌ",
    sifatMusyabihatPlural: {
      muntahal: "-"
    }
  },
  {
    id: "harra",
    root: { fa: "ه", ain: "ر", lam: "ر" },
    translation: "Menyalak (anjing) / membenci / bersuara parau (Kamus Munawwir, Lisanul 'Arab)",
    babNum: 2,
    bina: "Mudho'af",
    masdarSamai: "هَرِيرٌ / هَرٌّ",
    masdarQiyasi: "مَهَرٌّ",
    sifatMusyabihat: "هَرِيرٌ / هَرٌّ",
    sifatMusyabihatPlural: {
      muntahal: "-"
    }
  },
  {
    id: "hadhdha",
    root: { fa: "ه", ain: "ض", lam: "ض" },
    translation: "Memecahkan / meremukkan / menindas (Kamus Munawwir, Lisanul 'Arab)",
    babNum: 1,
    bina: "Mudho'af",
    masdarSamai: "هَضٌّ",
    masdarQiyasi: "مَهَضٌّ",
    sifatMusyabihat: "هَضِيضٌ / هَضٌّ",
    sifatMusyabihatPlural: {
      muntahal: "-"
    }
  },
  {
    id: "halla",
    root: { fa: "ه", ain: "ل", lam: "ل" },
    translation: "Terbit (bulan) / mengalir / gembira (Kamus Munawwir, Lisanul 'Arab)",
    babNum: 1,
    bina: "Mudho'af",
    masdarSamai: "هَلٌّ / هَلِيلٌ",
    masdarQiyasi: "مَهَلٌّ",
    sifatMusyabihat: "هَلِيلٌ / هَلُولٌ",
    sifatMusyabihatPlural: {
      muntahal: "-"
    }
  },
  {
    id: "hanna",
    root: { fa: "ه", ain: "ن", lam: "ن" },
    translation: "Menangis pelan / merintih / mengasihi (Kamus Munawwir, Lisanul 'Arab)",
    babNum: 1,
    bina: "Mudho'af",
    masdarSamai: "هَنٌّ / هَنِينٌ",
    masdarQiyasi: "مَهَنٌّ",
    sifatMusyabihat: "هَنِينٌ / هَنُونٌ",
    sifatMusyabihatPlural: {
      muntahal: "-"
    }
  },
  {
    id: "hawwa",
    root: { fa: "ه", ain: "و", lam: "و" },
    translation: "Menjatuhkan diri / merosot / menjadi kosong (Kamus Munawwir, Lisanul 'Arab)",
    babNum: 1,
    bina: "Mudho'af",
    masdarSamai: "هَوٌّْ",
    masdarQiyasi: "مَهَوٌّ",
    sifatMusyabihat: "هَوِيٌّ / هَوَّاعٌ",
    sifatMusyabihatPlural: {
      mufrod_mudzakkar: "هَوِيٌّ / هَوَّاعٌ",
      mufrod_muannas: "هَوِيَّةٌ / هَوَّاعَةٌ",
      katsroh: "أَهْوِيَاءُ / هَوَّاعُونَ",
      muntahal: "-"
    }
  },
  {
    id: "wahaba",
    root: { fa: "و", ain: "ه", lam: "ب" },
    translation: "Memberi / menghibahkan (Kamus Munawwir, Lisanul 'Arab)",
    babNum: 3,
    bina: "Mitsal",
    masdarSamai: "وَهْبٌ / هِبَةٌ",
    masdarQiyasi: "مَوْهَبٌ",
    sifatMusyabihat: "وَهَّابٌ / وَهُوبٌ",
    sifatMusyabihatPlural: {
      mufrod_mudzakkar: "وَهَّابٌ / وَهُوبٌ",
      mufrod_muannas: "وَهَّابَةٌ / وَهُوبَةٌ",
      katsroh: "وُهُبٌ / وَهَّابُونَ",
      muntahal: "-."
    }
  },
  {
    id: "wahana",
    root: { fa: "و", ain: "ه", lam: "ن" },
    translation: "Menjadi lemah / lesu (Kamus Munawwir, Lisanul 'Arab)",
    babNum: 2,
    bina: "Mitsal",
    masdarSamai: "وَهْنٌ / وَهَنٌ / وُهُونٌ",
    masdarQiyasi: "مَوْهَنٌ",
    sifatMusyabihat: "وَهِنٌ / وَهِينٌ",
    sifatMusyabihatPlural: {
      muntahal: "-"
    }
  },
  {
    id: "wajja",
    root: { fa: "و", ain: "ج", lam: "ج" },
    translation: "Berjalan cepat / bersuara keras / berkobar (Kamus Munawwir, Lisanul 'Arab)",
    babNum: 1,
    bina: "Mitsal Wal Mudho'af'",
    masdarSamai: "وَجٌّ / وَجِيجٌ",
    masdarQiyasi: "مَوْجَجٌ",
    sifatMusyabihat: "وَجِيجٌ / وَجَّاجٌ",
    sifatMusyabihatPlural: {
      mufrod_mudzakkar: "وَجِيجٌ / وَجَّاجٌ",
      mufrod_muannas: "وَجِيجَةٌ / وَجَّاجَةٌ",
      katsroh: "أَوْجِجَةٌ / وَجَّاجُونَ",
      muntahal: "-."
    }
  },
  {
    id: "wadda",
    root: { fa: "و", ain: "د", lam: "د" },
    translation: "Mencintai / menyukai / menginginkan (Kamus Munawwir, Lisanul 'Arab)",
    babNum: 4,
    bina: "Mitsal Wal Mudho'af",
    masdarSamai: "وُدٌّ / وِدٌّ / مَوَدَّةٌ",
    masdarQiyasi: "مَوْدَدٌ",
    sifatMusyabihat: "وَدِيدٌ / وَدُودٌ",
    sifatMusyabihatPlural: {
      muntahal: "-"
    }
  },
  {
    id: "warra",
    root: { fa: "و", ain: "ر", lam: "ر" },
    translation: "Membakar / menyalakan api / berlemak (Kamus Munawwir, Lisanul 'Arab)",
    babNum: 1,
    bina: "Mitsal Wal Mudho'af",
    masdarSamai: "وَرٌّ / وَرِيرٌ",
    masdarQiyasi: "مَوْرٌّ",
    sifatMusyabihat: "وَرِيرٌ",
    sifatMusyabihatPlural: {
      mufrod_mudzakkar: "وَرِيرٌ",
      mufrod_muannas: "وَرِيرَةٌ",
      katsroh: "أَوْرِرَةٌ / وِرَارٌ",
      muntahal: "-."
    }
  },
  {
    id: "wazza",
    root: { fa: "و", ain: "ز", lam: "ز" },
    translation: "Mendorong / merangsang / mendesak (Kamus Munawwir, Lisanul 'Arab)",
    babNum: 1,
    bina: "Mitsal Wal Mudho'af",
    masdarSamai: "وَزٌّ / وَزِيزٌ",
    masdarQiyasi: "مَوْزٌّ",
    sifatMusyabihat: "وَزِيزٌ / وَزَّازٌ",
    sifatMusyabihatPlural: {
      mufrod_mudzakkar: "وَزِيزٌ / وَزَّازٌ",
      mufrod_muannas: "وَزِيزَةٌ / وَزَّازَةٌ",
      katsroh: "أَوْزِزَةٌ / وَزَّازُونَ",
      muntahal: "-."
    }
  },
  {
    id: "wassa",
    root: { fa: "و", ain: "س", lam: "س" },
    translation: "Membisikkan / menanamkan keraguan (Kamus Munawwir, Lisanul 'Arab)",
    babNum: 1,
    bina: "Mitsal Wal Mudho'af",
    masdarSamai: "وَسْوَسَةٌ / وَسٌّ",
    masdarQiyasi: "مَوْسٌّ",
    sifatMusyabihat: "وَسِيسٌ",
    sifatMusyabihatPlural: {
      mufrod_mudzakkar: "وَسِيسٌ",
      mufrod_muannas: "وَسِيسَةٌ",
      katsroh: "أَوْسِسَةٌ / وِسَاسٌ",
      muntahal: "-."
    }
  },
  {
    id: "wasysya",
    root: { fa: "و", ain: "ش", lam: "ش" },
    translation: "Menghiasi / berbisik / memfitnah (Kamus Munawwir, Lisanul 'Arab)",
    babNum: 2,
    bina: "Mitsal Wal Mudho'af",
    masdarSamai: "وَشٌّ / وَشِيشٌ",
    masdarQiyasi: "مَوْشٌّ",
    sifatMusyabihat: "وَشِيشٌ / وَشُوشٌ",
    sifatMusyabihatPlural: {
      katsroh: "هُشٌّ / هِشَاشٌ",
      muntahal: "-."
    }
  },
  {
    id: "wasysa",
    root: { fa: "و", ain: "ص", lam: "ص" },
    translation: "Menyambung / merapatkan / mengikat (Kamus Munawwir, Lisanul 'Arab)",
    babNum: 2,
    bina: "Mitsal Wal Mudho'af",
    masdarSamai: "وَصٌّ / وَصِيصٌ",
    masdarQiyasi: "مَوْصٌّ",
    sifatMusyabihat: "وَصِيصٌ",
    sifatMusyabihatPlural: {
      mufrod_mudzakkar: "وَصِيصٌ",
      mufrod_muannas: "وَصِيصَةٌ",
      katsroh: "أَوْصِصَةٌ / وِصَاصٌ",
      muntahal: "-."
    }
  },
  {
    id: "wathta",
    root: { fa: "و", ain: "ط", lam: "ط" },
    translation: "Menetap / membiasakan diri / menundukkan (Kamus Munawwir, Lisanul 'Arab)",
    babNum: 1,
    bina: "Mitsal Wal Mudho'af",
    masdarSamai: "وَطٌّ / وَطِيطٌ",
    masdarQiyasi: "مَوْطٌّ",
    sifatMusyabihat: "وَطِيطٌ / وَطَّاطٌ",
    sifatMusyabihatPlural: {
      mufrod_mudzakkar: "وَطِيطٌ / وَطَّاطٌ",
      mufrod_muannas: "وَطِيطَةٌ / وَطَّاطَةٌ",
      katsroh: "أَوْطِطَةٌ / وَطَّاطُونَ",
      muntahal: "-."
    }
  },
  {
    id: "waffa",
    root: { fa: "و", ain: "ف", lam: "ف" },
    translation: "Menjadi banyak / melimpah / sempurna (Kamus Munawwir, Lisanul 'Arab)",
    babNum: 2,
    bina: "Mitsal Wal Mudho'af",
    masdarSamai: "وَفٌّ / وَفِيفٌ",
    masdarQiyasi: "مَوْفٌّ",
    sifatMusyabihat: "وَفِيفٌ",
    sifatMusyabihatPlural: {
      mufrod_mudzakkar: "وَفِيفٌ",
      mufrod_muannas: "وَفِيفَةٌ",
      katsroh: "أَوْفِفَةٌ / وِفَافٌ",
      muntahal: "-."
    }
  },
  {
    id: "waqqa",
    root: { fa: "و", ain: "ق", lam: "ق" },
    translation: "Memelihara / menjaga / berkokok (Kamus Munawwir, Lisanul 'Arab)",
    babNum: 2,
    bina: "Mitsal Wal Mudho'af",
    masdarSamai: "وَقٌّ / وَقِيقٌ",
    masdarQiyasi: "مَوْقٌّ",
    sifatMusyabihat: "وَقِيقٌ / وَقَّاقٌ",
    sifatMusyabihatPlural: {
      mufrod_mudzakkar: "وَقِيقٌ / وَقَّاقٌ",
      mufrod_muannas: "وَقِيقَةٌ / وَقَّاقَةٌ",
      katsroh: "أَوْقِقَةٌ / وَقَّاقُونَ",
      muntahal: "-."
    }
  },
  {
    id: "habatha",
    root: { fa: "ه", ain: "ب", lam: "ط" },
    translation: "Turun / mendarat / merosot harganya (Kamus Munawwir, Lisanul 'Arab)",
    babNum: 2,
    bina: "Shohih",
    masdarSamai: "هُبُوطٌ / هَبْطٌ",
    masdarQiyasi: "مَهْبِطٌ",
    sifatMusyabihat: "هَبِيطٌ / هَبُوطٌ",
    sifatMusyabihatPlural: {
      mufrod_mudzakkar: "هَبِيطٌ / هَبُوطٌ",
      mufrod_muannas: "هَبِيطَةٌ / هَبُوطَةٌ",
      katsroh: "هُبُطٌ / هَبَاطَى",
      muntahal: "هَبَاطَى"
    }
  },
  {
    id: "hajara",
    root: { fa: "ه", ain: "ج", lam: "ر" },
    translation: "Berhijrah / meninggalkan / menjauhkan diri / mengigau (Kamus Munawwir, Lisanul 'Arab)",
    babNum: 1,
    bina: "Shohih",
    masdarSamai: "هَجْرٌ / هِجْرَانٌ / هِجْرَةٌ",
    masdarQiyasi: "مَهْجَرٌ",
    sifatMusyabihat: "هَجِيرٌ / هَجُورٌ",
    sifatMusyabihatPlural: {
      muntahal: "-"
    }
  },
  {
    id: "haja_a",
    root: { fa: "ه", ain: "ج", lam: "ع" },
    translation: "Tidur malam / berbaring / tenang (Kamus Munawwir, Lisanul 'Arab)",
    babNum: 3,
    bina: "Shohih",
    masdarSamai: "هُجُوعٌ / هَجْعٌ",
    masdarQiyasi: "مَهْجَعٌ",
    sifatMusyabihat: "هَجُوعٌ / هَجِيعٌ",
    sifatMusyabihatPlural: {
      mufrod_mudzakkar: "هَجُوعٌ / هَجِيعٌ",
      mufrod_muannas: "هَجُوعَةٌ / هَجِيعَةٌ",
      katsroh: "هُجُعٌ / أَهْجَاعٌ",
      muntahal: "-."
    }
  },
  {
    id: "hadama",
    root: { fa: "ه", ain: "د", lam: "م" },
    translation: "Meruntuhkan / menghancurkan gedung / membongkar (Kamus Munawwir, Lisanul 'Arab)",
    babNum: 2,
    bina: "Shohih",
    masdarSamai: "هَدْمٌ / هُدُومٌ",
    masdarQiyasi: "مَهْدِمٌ",
    sifatMusyabihat: "هَدِيمٌ / هَدُومٌ",
    sifatMusyabihatPlural: {
      muntahal: "-"
    }
  },
  {
    id: "hadaa",
    root: { fa: "ه", ain: "د", lam: "ي" },
    translation: "Memberi petunjuk / menunjuki jalan / membimbing (Kamus Munawwir, Lisanul 'Arab)",
    babNum: 2,
    bina: "Naqish Ya'i",
    masdarSamai: "هُدًى / هِدَايَةٌ / هَدْيٌ",
    masdarQiyasi: "مَهْدًى",
    sifatMusyabihat: "هَدِيٌّ"
  },
  {
    id: "haraba",
    root: { fa: "ه", ain: "ر", lam: "ب" },
    translation: "Melarikan diri / kabur / lolos (Kamus Munawwir, Lisanul 'Arab)",
    babNum: 1,
    bina: "Shohih",
    masdarSamai: "هَرَبٌ / هُرُوبٌ",
    masdarQiyasi: "مَهْرَبٌ",
    sifatMusyabihat: "هَرُوبٌ / هَرِيبٌ",
    sifatMusyabihatPlural: {
      mufrod_mudzakkar: "هَرُوبٌ / هَرِيبٌ",
      mufrod_muannas: "هَرُوبَةٌ / هَرِيبَةٌ",
      katsroh: "هُرُبٌ / هَرَّابُونَ",
      muntahal: "-."
    }
  },
  {
    id: "harima",
    root: { fa: "ه", ain: "ر", lam: "م" },
    translation: "Menjadi tua renta / pikun (Kamus Munawwir, Lisanul 'Arab)",
    babNum: 4,
    bina: "Shohih",
    masdarSamai: "هَرَمٌ / مَهْرَمٌ",
    masdarQiyasi: "مَهْرَمٌ",
    sifatMusyabihat: "هَرِمٌ",
    sifatMusyabihatPlural: {
      mufrod_mudzakkar: "هَرِمٌ",
      mufrod_muannas: "هَرِمَةٌ",
      katsroh: "هَرِمُونَ / هَرَامَى",
      muntahal: "هَرَامَى"
    }
  },
  {
    id: "haza_a",
    root: { fa: "ه", ain: "ز", lam: "أ" },
    translation: "Mengejek / mengolok-olok / mempermainkan (Kamus Munawwir, Lisanul 'Arab)",
    babNum: 3,
    bina: "Mahmuz Lam",
    masdarSamai: "هُزْءٌ / هُزُؤٌ / هُزُوءَةٌ",
    masdarQiyasi: "مَهْزَأٌ",
    sifatMusyabihat: "هَزُوءٌ / هَزِئٌ",
    sifatMusyabihatPlural: {
      muntahal: "-"
    }
  },
  {
    id: "hazama",
    root: { fa: "ه", ain: "ز", lam: "م" },
    translation: "Mengalahkan musuh / menaklukkan / menghancurkan barisan (Kamus Munawwir, Lisanul 'Arab)",
    babNum: 2,
    bina: "Shohih",
    masdarSamai: "هَزْمٌ / هَزِيمَةٌ",
    masdarQiyasi: "مَهْزِمٌ",
    sifatMusyabihat: "هَزِيمٌ / هَزُومٌ",
    sifatMusyabihatPlural: {
      muntahal: "-"
    }
  },
  {
    id: "waada",
    root: { fa: "و", ain: "ع", lam: "د" },
    translation: "Berjanji / Memberi Ancaman",
    babNum: 2,
    bina: "Mitsal",
    masdarSamai: "وَعْدٌ",
    masdarQiyasi: "عِدَةٌ",
    sifatMusyabihat: "وَعِيدٌ",
  },
  {
    id: "daa",
    root: { fa: "د", ain: "ع", lam: "و" },
    translation: "Berdoa / Menyeru / Mengajak",
    babNum: 1,
    bina: "Naqis",
    masdarSamai: "دَعْوَةٌ / دَعْوَى / مَدْعَاةٌ",
    masdarQiyasi: "دُعَاءٌ / تَدْعَاءً",
    sifatMusyabihat: "دَعِىٌّ",
  },
  {
    id: "waqa",
    root: { fa: "و", ain: "ق", lam: "ي" },
    translation: "Melindungi / Menjaga / Memelihara",
    babNum: 2,
    bina: "Lafif Mafruq",
    masdarSamai: "وِقَايَةٌ",
    masdarQiyasi: "وَقْيًا",
    sifatMusyabihat: "وَقِىٌّ",
  },
  {
    id: "syawa",
    root: { fa: "ش", ain: "و", lam: "ي" },
    translation: "Memanggang / Membakar daging",
    babNum: 2,
    bina: "Lafif Maqrun",
    masdarSamai: "شَىٌّ",
    masdarQiyasi: "شِوَاءٌ",
    sifatMusyabihat: "شَوِىٌّ",
  },
  {
    id: "akala",
    root: { fa: "أ", ain: "ك", lam: "ل" },
    translation: "Makan / Mengunyah",
    babNum: 1,
    bina: "Mahmuz Fa",
    masdarSamai: "أكْلٌ",
    masdarQiyasi: "مَأْكَلٌ",
    sifatMusyabihat: "أَكِيلٌ",
  },
  {
    id: "saala",
    root: { fa: "س", ain: "أ", lam: "ل" },
    translation: "Bertanya / Meminta penjelasan",
    babNum: 3,
    bina: "Mahmuz 'Ain",
    masdarSamai: "سُؤَالٌ",
    masdarQiyasi: "مَسْأَلَةٌ",
    sifatMusyabihat: "سَئُولٌ",
  },
  {
    id: "qaraa",
    root: { fa: "ق", ain: "ر", lam: "أ" },
    translation: "Membaca / Melafalkan teks",
    babNum: 3,
    bina: "Mahmuz Lam",
    masdarSamai: "قِرَاءةٌ",
    masdarQiyasi: "قُرْآنٌ",
    sifatMusyabihat: "قَرِىءٌ",
  },
  {
    id: "baa",
    root: { fa: "ب", ain: "ي", lam: "ع" },
    translation: "Menjual / Bertransaksi",
    babNum: 2,
    bina: "Ajwaf",
    masdarSamai: "بَيْعٌ / بِيَعٌ / تِبْيَاعٌ",
    masdarQiyasi: "مَبِيعٌ / مَبَاعٌ",
    sifatMusyabihat: "بَيِّعٌ",
  },
  {
    id: "khafa",
    root: { fa: "خ", ain: "و", lam: "ف" },
    translation: "Takut / Khawatir menghadap",
    babNum: 4,
    bina: "Ajwaf",
    masdarSamai: "خَوْفٌ / خِيْفَةً",
    masdarQiyasi: "مَخَافَةٌ",
    sifatMusyabihat: "خَوِفٌ",
  },
  {
    id: "radd",
    root: { fa: "ر", ain: "د", lam: "د" },
    translation: "Menolak / Mengembalikan",
    babNum: 1,
    bina: "Mudho'af",
    masdarSamai: "رَدٌّ",
    masdarQiyasi: "مَرْدُودِيَّةً",
    sifatMusyabihat: "رَدِيدٌ",
  },
  {
    id: "wajada",
    root: { fa: "و", ain: "ج", lam: "د" },
    translation: "Menemukan / Mendapatkan",
    babNum: 2,
    bina: "Mitsal",
    masdarSamai: "وُجُودٌ",
    masdarQiyasi: "وِجْدَانٌ",
    sifatMusyabihat: "وَجِيدٌ",
  },
  {
    id: "rama",
    root: { fa: "ر", ain: "م", lam: "ي" },
    translation: "Melempar / Melontarkan",
    babNum: 2,
    bina: "Naqis",
    masdarSamai: "رَمْىٌ / رِمْيَةٌ",
    masdarQiyasi: "رِمَايَةٌ / مَرْمًى",
    sifatMusyabihat: "رَمِىٌّ",
  },
  {
    id: "radhiya",
    root: { fa: "ر", ain: "ض", lam: "و" },
    translation: "Ridha / Puas / Menerima",
    babNum: 4,
    bina: "Naqis",
    asal: "رَضِوَ",
    masdarSamai: "رِضْوَانٌ / رِضًى / مَرْضَاةٌ",
    masdarQiyasi: "رُضْوٌ / تَرْضِيَةً",
    sifatMusyabihat: "رَضِىٌّ",
  },
  {
    id: "hasuna",
    root: { fa: "ح", ain: "س", lam: "ن" },
    translation: "Menjadi baik / bagus / indah",
    babNum: 5,
    bina: "Shohih",
    masdarSamai: "حُسْنٌ",
    masdarQiyasi: "حَسَانَةٌ",
    sifatMusyabihat: "حَسَنٌ",
  },
  {
    id: "kabura",
    root: { fa: "ك", ain: "ب", lam: "ر" },
    translation: "Menjadi besar / agung / dewasa",
    babNum: 5,
    bina: "Shohih",
    masdarSamai: "كِبَرٌ",
    masdarQiyasi: "كِبَارَةٌ",
    sifatMusyabihat: "كَبِيرٌ",
  },
  {
    id: "karuma",
    root: { fa: "ك", ain: "ر", lam: "م" },
    translation: "Menjadi mulia / dermawan / terhormat",
    babNum: 5,
    bina: "Shohih",
    masdarSamai: "كَرَمٌ",
    masdarQiyasi: "كَرَامَةٌ",
    sifatMusyabihat: "كَرِيمٌ",
  },
  {
    id: "sarufa",
    root: { fa: "ش", ain: "ر", lam: "ف" },
    translation: "Menjadi mulia / agung / terhormat",
    babNum: 5,
    bina: "Shohih",
    masdarSamai: "شَرَفٌ",
    masdarQiyasi: "شَرَافَةٌ",
    sifatMusyabihat: "شَرِيفٌ",
  },
  {
    id: "saghura",
    root: { fa: "ص", ain: "غ", lam: "ر" },
    translation: "Menjadi kecil / remeh / muda",
    babNum: 5,
    bina: "Shohih",
    masdarSamai: "صِغَرٌ",
    masdarQiyasi: "صَغَارَةٌ",
    sifatMusyabihat: "صَغِيرٌ",
  },
  {
    id: "kataba",
    root: { fa: "ك", ain: "ت", lam: "ب" },
    translation: "Menulis / Mencatat",
    babNum: 1,
    bina: "Shohih",
    masdarSamai: "كَتْبٌ / كِتَابٌ / كِتَابَةٌ",
    masdarQiyasi: "مَكْتَبٌ / مَكْتَبَةٌ",
    sifatMusyabihat: "كَتِيبٌ / كَاتِبٌ",
  },
  {
    id: "nasara",
    root: { fa: "ن", ain: "ص", lam: "ر" },
    translation: "Menolong / Membantu perjuangan",
    babNum: 1,
    bina: "Shohih",
    masdarSamai: "نَصْرٌ / نُصْرَةٌ / نَصَارَةٌ",
    masdarQiyasi: "مَنْصَرٌ",
    sifatMusyabihat: "نَصِيرٌ",
    jamaTaksirSamai: "أَنْصَارٌ",
    sifatMusyabihatPlural: {
      mufrod_mudzakkar: "نَصِيرٌ",
      mufrod_muannas: "نَصِيرَةٌ",
      katsroh: "أَنْصَارٌ / نُصَرَاءُ",
      muntahal: "مَنَاصِرُ"
    }
  },
  {
    id: "dhahaba",
    root: { fa: "ذ", ain: "هـ", lam: "ب" },
    translation: "Pergi / Berlalu / Lenyap",
    babNum: 3,
    bina: "Shohih",
    masdarSamai: "ذَهَابٌ / ذُهُوبٌ / مَذْهَبٌ",
    masdarQiyasi: "تَذْهِيبٌ",
    sifatMusyabihat: "ذَهِيبٌ",
  },
  {
    id: "jalasa",
    root: { fa: "ج", ain: "ل", lam: "س" },
    translation: "Duduk / Bersemayam",
    babNum: 2,
    bina: "Shohih",
    masdarSamai: "جُلُوسٌ / مَجْلَسٌ / جِلْسَةٌ",
    masdarQiyasi: "تَجْلِيسٌ",
    sifatMusyabihat: "جَلِيسٌ",
  },
  {
    id: "dharaba",
    root: { fa: "ض", ain: "ر", lam: "ب" },
    translation: "Memukul / Mengetuk / Membuat perumpamaan",
    babNum: 2,
    bina: "Shohih",
    masdarSamai: "ضَرْبٌ / مَضْرَبٌ / ضَرَبَانٌ",
    masdarQiyasi: "تَضْرِيبٌ",
    sifatMusyabihat: "ضَرِيبٌ",
  },
  {
    id: "samia",
    root: { fa: "س", ain: "م", lam: "ع" },
    translation: "Mendengar / Menyimak / Mengabulkan",
    babNum: 4,
    bina: "Shohih",
    masdarSamai: "سَمْعٌ / /سَمَاعٌ / مَسْمَعٌ / سِمْعٌ",
    masdarQiyasi: "تَسْمِيعٌ",
    sifatMusyabihat: "سَمِيعٌ",
  },
  {
    id: "alima",
    root: { fa: "ع", ain: "ل", lam: "م" },
    translation: "Mengetahui / Mengerti / Memahami jernih",
    babNum: 4,
    bina: "Shohih",
    masdarSamai: "عِلْمٌ / مَعْلَمٌ / تَعْلَامٌ",
    masdarQiyasi: "تَعْلِيمٌ",
    sifatMusyabihat: "عَلِيمٌ",
  },
  {
    id: "fahima",
    root: { fa: "ف", ain: "هـ", lam: "م" },
    translation: "Memahami / Menangkap esensi / Mengerti",
    babNum: 4,
    bina: "Shohih",
    masdarSamai: "فَهْمٌ / فَهَامَةٌ / مَفْهَمٌ",
    masdarQiyasi: "تَفْهِيمٌ",
    sifatMusyabihat: "فَهِيمٌ / فَهِمٌ",
  },
  {
    id: "khalaqa",
    root: { fa: "خ", ain: "ل", lam: "ق" },
    translation: "Menciptakan / Membentuk dari ketiadaan",
    babNum: 1,
    bina: "Shohih",
    masdarSamai: "خَلْقٌ / مَخْلَقٌ / خِلْقَةٌ",
    masdarQiyasi: "تَخْلِيقٌ",
    sifatMusyabihat: "خَلِيقٌ",
  },
  {
    id: "hafizha",
    root: { fa: "ح", ain: "ف", lam: "ظ" },
    translation: "Menjaga / Menjaga memori / Menghafal",
    babNum: 4,
    bina: "Shohih",
    masdarSamai: "حِفْظٌ / حِفَاظٌ / مَحْفَظٌ",
    masdarQiyasi: "تَحْفِيظٌ",
    sifatMusyabihat: "حَفِيظٌ",
  },
  {
    id: "dakhala",
    root: { fa: "د", ain: "خ", lam: "ل" },
    translation: "Masuk / Memasuki / Menyeronok",
    babNum: 1,
    bina: "Shohih",
    masdarSamai: "دُخُولٌ / مَدْخَلٌ / دِخْلَةٌ",
    masdarQiyasi: "تَدْخِيلٌ",
    sifatMusyabihat: "دَخِيلٌ",
  },
  {
    id: "kharaja",
    root: { fa: "خ", ain: "ر", lam: "ج" },
    translation: "Keluar / Menolak kepatuhan / Berpencaran",
    babNum: 1,
    bina: "Shohih",
    masdarSamai: "خُرُوجٌ / مَخْرَجٌ / خِرَاجٌ",
    masdarQiyasi: "تَخْرِيجٌ",
    sifatMusyabihat: "خَرِيجٌ",
  },
  {
    id: "shabara",
    root: { fa: "ص", ain: "ب", lam: "ر" },
    translation: "Bersaber / Menahan diri dari keluh kesah",
    babNum: 2,
    bina: "Shohih",
    masdarSamai: "صَبْرٌ / مَصْبَرٌ / صُبُورٌ",
    masdarQiyasi: "تَصْبِيرٌ",
    sifatMusyabihat: "صَبُورٌ / صَبِيرٌ",
  },
  {
    id: "syafara",
    root: { fa: "س", ain: "ف", lam: "ر" },
    translation: "Bepergian / Menyingkap tabir / Bersinar",
    babNum: 2,
    bina: "Shohih",
    masdarSamai: "سَفَرٌ / مَسْفَرٌ / سِفَارَةٌ",
    masdarQiyasi: "تَسْفِيرٌ",
    sifatMusyabihat: "سَفِيرٌ",
  },
  {
    id: "hadhara",
    root: { fa: "ح", ain: "ض", lam: "ر" },
    translation: "Hadir / Bermukim di kota / Datang",
    babNum: 1,
    bina: "Shohih",
    masdarSamai: "حُضُورٌ / مَحْضَرٌ / حَضَارَةٌ",
    masdarQiyasi: "تَحْضِيرٌ",
    sifatMusyabihat: "حَضِيرٌ",
  },
  {
    id: "nadzara",
    root: { fa: "ن", ain: "ظ", lam: "ر" },
    translation: "Melihat / Memikirkan dalam / Menanti",
    babNum: 1,
    bina: "Shohih",
    masdarSamai: "نَظَرٌ / مَنْظَرٌ / تَنْظَارٌ",
    masdarQiyasi: "تَنْظِيرٌ",
    sifatMusyabihat: "نَظِيرٌ",
    sifatMusyabihatPlural: {
      mufrod_mudzakkar: "نَظِيرٌ",
      mufrod_muannas: "نَظِيرَةٌ",
      katsroh: "أَنْظَارٌ / نُظَرَاءُ",
      muntahal: "نَظَائِرُ"
    }
  },
  {
    id: "hamida",
    root: { fa: "ح", ain: "م", lam: "د" },
    translation: "Memuji / Menyanjung atas kebajikan",
    babNum: 4,
    bina: "Shohih",
    masdarSamai: "حَمْدٌ / مَحْمَدَةٌ / مَحْمَدٌ",
    masdarQiyasi: "تَحْمِيدٌ",
    sifatMusyabihat: "حَمِيدٌ",
  },
  {
    id: "syakara",
    root: { fa: "ش", ain: "ك", lam: "ر" },
    translation: "Bersyukur / Membuka nikmat / Berterima kasih",
    babNum: 1,
    bina: "Shohih",
    masdarSamai: "شُكْرٌ / /شُكْرَانٌ / مَشْكَرٌ",
    masdarQiyasi: "تَشْكِيرٌ",
    sifatMusyabihat: "شَكُورٌ",
  },
  {
    id: "thalaba",
    root: { fa: "ط", ain: "ل", lam: "ب" },
    translation: "Mencari / Menuntut hak / Meminta tekun",
    babNum: 1,
    bina: "Shohih",
    masdarSamai: "طَلَبٌ / مَطْلَبٌ / تِطْلَابٌ",
    masdarQiyasi: "تَطْلِيبٌ",
    sifatMusyabihat: "طَلِيبٌ",
  },
  {
    id: "laiba",
    root: { fa: "ل", ain: "ع", lam: "ب" },
    translation: "Bermain-main / Bersenda gurau / Lengah",
    babNum: 4,
    bina: "Shohih",
    masdarSamai: "لَعِبٌ / تَلْعَابٌ / مَلْعَبٌ / لَعْبٌ",
    masdarQiyasi: "تَلْعِيبٌ",
    sifatMusyabihat: "لَعُوبٌ / /لَعِبٌ",
  },
  {
    id: "hasiba",
    root: { fa: "ح", ain: "س", lam: "ب" },
    translation: "Mengira / Menghitung / Memperhitungkan",
    babNum: 6,
    bina: "Shohih",
    masdarSamai: "حِسَابٌ / حُسْبَانٌ / مَحْسَبَةٌ / حَسْبٌ",
    masdarQiyasi: "تَحْسِيبٌ",
    sifatMusyabihat: "حَسِيبٌ",
  },
  {
    id: "naima",
    root: { fa: "ن", ain: "ع", lam: "م" },
    translation: "Menikmati kenyamanan / Bahagia santun",
    babNum: 4,
    bina: "Shohih",
    masdarSamai: "نَعْمَةٌ / نَعِيمٌ / مَنْعَمٌ / /نَعْمَاءٌ",
    masdarQiyasi: "تَنْعِيمٌ",
    sifatMusyabihat: "نَعِيمٌ",
  },
  {
    id: "waritsa",
    root: { fa: "و", ain: "ر", lam: "ث" },
    translation: "Mewarisi secara turun-temurun",
    babNum: 6,
    bina: "Mitsal",
    masdarSamai: "وِرْثٌ / تُرَاثٌ / إِرْثٌ / وِرَاثَةٌ",
    masdarQiyasi: "تَوْرِيثٌ",
    sifatMusyabihat: "وَرِيثٌ",
  },
  {
    id: "banaa",
    root: { fa: "ب", ain: "ن", lam: "ي" },
    translation: "Membangun / Mendirikan fondasi",
    babNum: 2,
    bina: "Naqis",
    masdarSamai: "بِنَاءٌ / بِنْيَةٌ / مَبْنًى / بُنْيَانٌ",
    masdarQiyasi: "تَبْنِيَةٌ",
    sifatMusyabihat: "بَنِيٌّ",
  },
  {
    id: "samy",
    root: { fa: "س", ain: "م", lam: "و" },
    translation: "Menjadi tinggi / Mulia / Luhur",
    babNum: 1,
    bina: "Naqis",
    masdarSamai: "سُمُوٌّ / سَمَاءٌ / مَسْمَاةٌ",
    masdarQiyasi: "تَسْمِيَةٌ",
    sifatMusyabihat: "سَمِيٌّ",
  },
  {
    id: "sarwa",
    root: { fa: "س", ain: "ر", lam: "و" },
    translation: "Menjadi ksatria / Mulia perilakunya",
    babNum: 5,
    bina: "Naqis",
    masdarSamai: "سَرْوٌ / سَرَاوَةٌ / سَرًى",
    masdarQiyasi: "تَسْرِيَةٌ",
    sifatMusyabihat: "سَرِيٌّ",
  },
  {
    id: "qawiya",
    root: { fa: "ق", ain: "و", lam: "ي" },
    translation: "Menjadi kuat / Perkasa / Kokoh",
    babNum: 4,
    bina: "Lafif Maqrun",
    asal: "قَوِوَ",
    masdarSamai: "قُوَّةٌ / مَقْوَاةٌ / تَقْوِيَةٌ",
    masdarQiyasi: "تَقْوِيَةٌ",
    sifatMusyabihat: "قَوِيٌّ",
  },
  {
    id: "hayiya",
    root: { fa: "ح", ain: "ي", lam: "ي" },
    translation: "Hidup / Malu terhormat / Segar",
    babNum: 4,
    bina: "Mudho'af",
    masdarSamai: "حَيَاةٌ / حَيٌّ / مَحْيًى / حَيَاءٌ",
    masdarQiyasi: "تَحْيِيَةٌ",
    sifatMusyabihat: "حَيٌّ",
  },
  {
    id: "wafa",
    root: { fa: "و", ain: "ف", lam: "ي" },
    translation: "Menepati janji / Sempurna / Menuntaskan",
    babNum: 2,
    bina: "Lafif Mafruq",
    masdarSamai: "وَفَاءٌ / مَوْفَاةٌ / وِفْيَةٌ",
    masdarQiyasi: "تَوْفِيَةٌ",
    sifatMusyabihat: "وَفِيٌّ",
  },
  {
    id: "kafa",
    root: { fa: "ك", ain: "ف", lam: "ي" },
    translation: "Mencukupi / Menyelamatkan / Memadai",
    babNum: 2,
    bina: "Naqis",
    masdarSamai: "كِفَايَةٌ / كَفْيٌ / مَكْفَاةٌ",
    masdarQiyasi: "تَكْفِيَةٌ",
    sifatMusyabihat: "كَفِيٌّ",
  },
  {
    id: "akhadza",
    root: { fa: "أ", ain: "خ", lam: "ذ" },
    translation: "Mengambil / Menerima tanggung jawab",
    babNum: 1,
    bina: "Mahmuz Fa",
    masdarSamai: "أَخْذٌ / مَأْخَذٌ / إِخْذَةٌ",
    masdarQiyasi: "تَأْخِيذٌ",
    sifatMusyabihat: "أَخِيذٌ",
  },
  {
    id: "amara",
    root: { fa: "أ", ain: "م", lam: "ر" },
    translation: "Memerintah / Menyuruh kebaikan / Mengondisikan",
    babNum: 1,
    bina: "Mahmuz Fa",
    masdarSamai: "أَمْرٌ / مَأْمَرٌ / إِمْرَةٌ / أَمَرَةٌ",
    masdarQiyasi: "تَأْمِيرٌ",
    sifatMusyabihat: "أَمِيرٌ / أَمِرٌ",
  },
  {
    id: "amila",
    root: { fa: "ع", ain: "م", lam: "ل" },
    translation: "Bekerja / Berbuat kebajikan / Mereaksi",
    babNum: 4,
    bina: "Shohih",
    masdarSamai: "عَمَلٌ / مَعْمَلٌ / عُمْلَانٌ",
    masdarQiyasi: "تَعْمِيلٌ",
    sifatMusyabihat: "عَمِيلٌ",
  },
  {
    id: "fataha",
    root: { fa: "ف", ain: "ت", lam: "ح" },
    translation: "Membuka pintu / Menaklukkan / Menghukumi",
    babNum: 3,
    bina: "Shohih",
    masdarSamai: "فَتْحٌ / مَفْتَحٌ / فُتُوحٌ / فَتَاحَةٌ",
    masdarQiyasi: "تَفْتِيحٌ",
    sifatMusyabihat: "فَتِيحٌ",
  },
  {
    id: "manaa",
    root: { fa: "م", ain: "ن", lam: "ع" },
    translation: "Mencegah / Menolak / Menjaga benteng",
    babNum: 3,
    bina: "Shohih",
    masdarSamai: "مَنْعٌ / مَمْنَعٌ / مَنَعَةٌ",
    masdarQiyasi: "تَمْنِيعٌ",
    sifatMusyabihat: "مَنِيعٌ",
  },
  {
    id: "basura",
    root: { fa: "ب", ain: "ص", lam: "ر" },
    translation: "Melihat tajam / Menyadari batiniah",
    babNum: 5,
    bina: "Shohih",
    masdarSamai: "بَصَرٌ / بَصَارَةٌ / مَبْصَرٌ",
    masdarQiyasi: "تَبْصِيرٌ",
    sifatMusyabihat: "بَصِيرٌ",
  },
  {
    id: "zhafira",
    root: { fa: "ظ", ain: "ف", lam: "ر" },
    translation: "Mencapai kemenangan / Sukses / Beruntung",
    babNum: 4,
    bina: "Shohih",
    masdarSamai: "ظَفَرٌ / مَظْفَرٌ / ظَفْرَانٌ",
    masdarQiyasi: "تَظْفِيرٌ",
    sifatMusyabihat: "ظَفِيرٌ",
  },
  {
    id: "asifa",
    root: { fa: "أ", ain: "س", lam: "ف" },
    translation: "Bersedih hati / Menyesal mendalam",
    babNum: 4,
    bina: "Mahmuz Fa",
    masdarSamai: "أَسَفٌ / مَأْسَفٌ / أَسَافَةٌ",
    masdarQiyasi: "تَأْسِيفٌ",
    sifatMusyabihat: "أَسِيفٌ",
  },
  {
    id: "bakaa",
    root: { fa: "ب", ain: "ك", lam: "ي" },
    translation: "Menangis / Meratap duka",
    babNum: 2,
    bina: "Naqis",
    masdarSamai: "بُكَاءٌ / بَكًى / مَبْكًى",
    masdarQiyasi: "تَبْكِيَةٌ",
    sifatMusyabihat: "بَكِىٌّ",
  },
  {
    id: "masya",
    root: { fa: "م", ain: "ش", lam: "ي" },
    translation: "Berjalan kaki / Melangkah / Berkembang",
    babNum: 2,
    bina: "Naqis",
    masdarSamai: "مَشْيٌ / /تَمْشَاءٌ / مَمْشًى / مَشَاءٌ",
    masdarQiyasi: "تَمْشِيَةٌ",
    sifatMusyabihat: "مَشِيٌّ",
  },
  {
    id: "jaraa",
    root: { fa: "ج", ain: "ر", lam: "ي" },
    translation: "Mengalir deras / Berlari kencang / Berlaku",
    babNum: 2,
    bina: "Naqis",
    masdarSamai: "جَرْيٌ / جَرَيَانٌ / مَجْرًى / جِرْيَةٌ",
    masdarQiyasi: "تَجْرِيَةٌ",
    sifatMusyabihat: "جَرِيٌّ",
  },
  {
    id: "ghaza",
    root: { fa: "غ", ain: "ز", lam: "و" },
    translation: "Berperang / Menyerbu musuh / Menuju sasaran",
    babNum: 1,
    bina: "Naqis",
    masdarSamai: "غَزْوٌ / مَغْزًى / غَزَوَانٌ / غَزْوَةٌ",
    masdarQiyasi: "تَغْزِيَةٌ",
    sifatMusyabihat: "غَزِيٌّ / /غَازٍ",
  },
  {
    id: "raja",
    root: { fa: "ر", ain: "ج", lam: "و" },
    translation: "Berharap cemas / Memohon perlindungan",
    babNum: 1,
    bina: "Naqis",
    masdarSamai: "رَجَاءٌ / مَرْجَاةٌ / رُجُوٌّ",
    masdarQiyasi: "تَرْجِيَةٌ",
    sifatMusyabihat: "رَجِيٌّ",
  },
  {
    id: "fakhura",
    root: { fa: "ف", ain: "خ", lam: "ر" },
    translation: "Berbangga diri / Mulia reputasinya",
    babNum: 5,
    bina: "Shohih",
    masdarSamai: "فَخْرٌ / /فَخَارَةٌ / مَفْخَرٌ",
    masdarQiyasi: "تَفْخِيرٌ",
    sifatMusyabihat: "فَخُورٌ",
  },
  {
    id: "dhahika",
    root: { fa: "ض", ain: "ح", lam: "ك" },
    translation: "Tertawa bugar / Berbunga-bunga",
    babNum: 4,
    bina: "Shohih",
    masdarSamai: "ضَحِكٌ / /ضَحْكٌ / مَضْحَكٌ",
    masdarQiyasi: "تَضْحِيكٌ",
    sifatMusyabihat: "ضَحُوكٌ / /ضَحِكٌ",
  },
  {
    id: "haluma",
    root: { fa: "ح", ain: "ل", lam: "م" },
    translation: "Menjadi santun / Menguasai amarah",
    babNum: 5,
    bina: "Shohih",
    masdarSamai: "حِلْمٌ / /حَلَامَةٌ / مَحْلَمٌ",
    masdarQiyasi: "تَحْلِيمٌ",
    sifatMusyabihat: "حَلِيمٌ",
  },
  {
    id: "sauda",
    root: { fa: "س", ain: "ع", lam: "د" },
    translation: "Menjadi bahagia / Beruntung mapan",
    babNum: 5,
    bina: "Shohih",
    masdarSamai: "سَعْدٌ / /سَعَادَةٌ / مَسْعَدٌ",
    masdarQiyasi: "تَسْعِيدٌ",
    sifatMusyabihat: "سَعِيدٌ",
  },
  {
    id: "syajua",
    root: { fa: "ش", ain: "ج", lam: "ع" },
    translation: "Menjadi pemberani / Gagah ksatria",
    babNum: 5,
    bina: "Shohih",
    masdarSamai: "شَجَاعَةٌ / /شَجَعٌ / مَشْجَعٌ",
    masdarQiyasi: "تَش|جِيعٌ",
    sifatMusyabihat: "شُجَاعٌ / /شَجِيعٌ",
  },
  {
    id: "sahula",
    root: { fa: "س", ain: "هـ", lam: "ل" },
    translation: "Menjadi mudah / Rata tanahnya / Lunak",
    babNum: 5,
    bina: "Shohih",
    masdarSamai: "سُهُولَةٌ / /سَهْلٌ / مَسْهَلٌ",
    masdarQiyasi: "تَسْهِيلٌ",
    sifatMusyabihat: "سَهْلٌ",
  },
  {
    id: "sabaha",
    root: { fa: "س", ain: "ب", lam: "ح" },
    translation: "Berenang / Mengambang / Bertasbih luhur",
    babNum: 3,
    bina: "Shohih",
    masdarSamai: "سَبْحٌ / /سِبَاحَةٌ / مَسْبَحٌ",
    masdarQiyasi: "تَسْبِيحٌ",
    sifatMusyabihat: "سَبِيحٌ",
  },
  {
    id: "sajada",
    root: { fa: "س", ain: "ج", lam: "د" },
    translation: "Bersujud / Tunduk patuh / Merunduk hormat",
    babNum: 1,
    bina: "Shohih",
    masdarSamai: "سُجُودٌ / /سَجْدَةٌ / مَسْجَدٌ",
    masdarQiyasi: "تَسْجِيدٌ",
    sifatMusyabihat: "سَجِيدٌ",
  },
  {
    id: "safaha",
    root: { fa: "س", ain: "ف", lam: "ح" },
    translation: "Menumpahkan darah / Mengalirkan air / Menyirami",
    babNum: 3,
    bina: "Shohih",
    masdarSamai: "سَفْحٌ / /سِفَاحٌ / مَسْفَحٌ",
    masdarQiyasi: "تَسْفِيحٌ",
    sifatMusyabihat: "سَفِيحٌ",
  },
  {
    id: "sakata",
    root: { fa: "س", ain: "ك", lam: "ت" },
    translation: "Berdiam diri / Bungkam / Hening senyap",
    babNum: 1,
    bina: "Shohih",
    masdarSamai: "سُكُوتٌ / /سَكْتٌ / مَسْكَتٌ",
    masdarQiyasi: "تَسْكِيتٌ",
    sifatMusyabihat: "سَكُوتٌ",
  },
  {
    id: "salima",
    root: { fa: "س", ain: "ل", lam: "م" },
    translation: "Selamat sejehtera / Bebas dari cacat cela / Damai",
    babNum: 4,
    bina: "Shohih",
    masdarSamai: "سَلَامَةٌ / /سَلَمٌ / مَسْلَمٌ / سَلَامٌ",
    masdarQiyasi: "تَسْلِيمٌ",
    sifatMusyabihat: "سَلِيمٌ",
  },
  {
    id: "syariba",
    root: { fa: "ش", ain: "ر", lam: "ب" },
    translation: "Minum mereguk cairan / Mengabsorbsi batin",
    babNum: 4,
    bina: "Shohih",
    masdarSamai: "شُرْبٌ / /شُرْبَانٌ / مَشْرَبٌ / شِرْبٌ",
    masdarQiyasi: "تَشْرِيبٌ",
    sifatMusyabihat: "شَرِيبٌ",
  },
  {
    id: "shadaqa",
    root: { fa: "ص", ain: "د", lam: "ق" },
    translation: "Benar ucapannya / Jujur / Menepati janji tulus",
    babNum: 1,
    bina: "Shohih",
    masdarSamai: "صِدْقٌ / /صَدَاقَةٌ / مَصْدَقٌ",
    masdarQiyasi: "تَصْدِيقٌ",
    sifatMusyabihat: "صَدُوقٌ / /صَدِيقٌ",
  },
  {
    id: "shana'a",
    root: { fa: "ص", ain: "ن", lam: "ع" },
    translation: "Membuat cerdas / Memproduksi / Melatih keterampilan",
    babNum: 3,
    bina: "Shohih",
    masdarSamai: "صُنْعٌ / /صَنِيعٌ / مَصْنَعٌ / صِنَاعَةٌ",
    masdarQiyasi: "تَصْنِيعٌ",
    sifatMusyabihat: "صَنِيعٌ",
  },
  {
    id: "tahura",
    root: { fa: "ط", ain: "هـ", lam: "ر" },
    translation: "Menjadi suci bersih lahir batin / Murni",
    babNum: 5,
    bina: "Shohih",
    masdarSamai: "طُهْرٌ / /طَهَارَةٌ / مَطْهَرٌ",
    masdarQiyasi: "تَطْهِيرٌ",
    sifatMusyabihat: "طَاهِرٌ / /طَهُورٌ",
  },
  {
    id: "azhuma",
    root: { fa: "ع", ain: "ظ", lam: "م" },
    translation: "Menjadi agung / Besar martabatnya / Berwibawa",
    babNum: 5,
    bina: "Shohih",
    masdarSamai: "عِظَمٌ / /عَظَامَةٌ / مَعْظَمٌ",
    masdarQiyasi: "تَعْظِيمٌ",
    sifatMusyabihat: "عَظِيمٌ",
  },
  {
    id: "ghafara",
    root: { fa: "غ", ain: "ف", lam: "ر" },
    translation: "Mengampuni kesalahan / Menyembunyikan aib / Melindungi",
    babNum: 2,
    bina: "Shohih",
    masdarSamai: "غَفْرٌ / /غُفْرَانٌ / مَغْفِرَةٌ / غَفِيرَةٌ",
    masdarQiyasi: "تَغْفِيرٌ",
    sifatMusyabihat: "غَفُورٌ / /غَفِيرٌ",
  },
  {
    id: "katama",
    root: { fa: "ك", ain: "ت", lam: "م" },
    translation: "Menyembunyikan rahasia / Merahasiakan hikmah / Sunyi",
    babNum: 1,
    bina: "Shohih",
    masdarSamai: "كَتْمٌ / /كِتْمَانٌ / مَكْتَمٌ",
    masdarQiyasi: "تَكْتِيمٌ",
    sifatMusyabihat: "كَتُومٌ",
  },
  {
    id: "jada",
    root: { fa: "ج", ain: "و", lam: "د" },
    translation: "Menjadi baik / bagus / dermawan (Kamus Munawwir)",
    babNum: 1,
    bina: "Ajwaf",
    masdarSamai: "جَوْدٌ / جَوْدَةٌ / جُودٌ",
    masdarQiyasi: "مَجَادَةٌ",
    sifatMusyabihat: "جَوَادٌ",
    sifatMusyabihatPlural: {
      mufrod_mudzakkar: "جَوَادٌ",
      mufrod_muannas: "جَوَادَةٌ",
      katsroh: "أَجْوَادٌ / جُودٌ / جُوَدَاءُ / أَجَاوِيدُ",
      muntahal: "أَجَاوِيدُ"
    }
  },
  {
    id: "najaha",
    root: { fa: "ن", ain: "ج", lam: "ح" },
    translation: "Berhasil / sukses / menang (Kamus Munjid)",
    babNum: 3,
    bina: "Shohih",
    masdarSamai: "نَجْحٌ / نَجَاحٌ",
    masdarQiyasi: "مَنْجَحٌ",
    sifatMusyabihat: "نَجِيحٌ"
  },
  {
    id: "adala",
    root: { fa: "ع", ain: "د", lam: "ل" },
    translation: "Berlaku adil / seimbang / lurus (Lisanul Arab)",
    babNum: 2,
    bina: "Shohih",
    masdarSamai: "عَدْلٌ / عَدَالَةٌ",
    masdarQiyasi: "مَعْدِلٌ",
    sifatMusyabihat: "عَدْلٌ / عَدِيلٌ"
  },
  {
    id: "zhalama",
    root: { fa: "ظ", ain: "ل", lam: "م" },
    translation: "Berbuat zalim / menganiaya / meletakkan bukan pada tempatnya (Kamus Munawwir)",
    babNum: 2,
    bina: "Shohih",
    masdarSamai: "ظُلْمٌ / مَظْلَمَةٌ",
    masdarQiyasi: "مَظْلَمٌ",
    sifatMusyabihat: "ظَلُومٌ / ظَلِيمٌ"
  },
  {
    id: "syafah",
    root: { fa: "ش", ain: "ف", lam: "ي" },
    translation: "Menyembuhkan / mengobati / memulihkan (Kamus Munjid)",
    babNum: 2,
    bina: "Naqis",
    masdarSamai: "شِفَاءٌ / شَفْيٌ",
    masdarQiyasi: "مَشْفًى",
    sifatMusyabihat: "شَافٍ"
  },
  {
    id: "bakata",
    root: { fa: "ب", ain: "ك", lam: "ت" },
    translation: "Membungkam / mencela / menaklukkan dengan hujah (Lisanul Arab)",
    babNum: 2,
    bina: "Shohih",
    masdarSamai: "بَكْتٌ",
    masdarQiyasi: "مَبْكَتٌ",
    sifatMusyabihat: "بَكِيتٌ"
  },
  {
    id: "rahima",
    root: { fa: "ر", ain: "ح", lam: "م" },
    translation: "Menyayangi / mengasihi / merahmati (Kamus Munawwir)",
    babNum: 4,
    bina: "Shohih",
    masdarSamai: "رَحْمَةٌ / مَرْحَمَةٌ",
    masdarQiyasi: "تَرْحَامٌ",
    sifatMusyabihat: "رَحِيمٌ"
  },
  {
    id: "thabakha",
    root: { fa: "ط", ain: "ب", lam: "خ" },
    translation: "Memasak makanan / mematangkan (Kamus Munjid)",
    babNum: 1,
    bina: "Shohih",
    masdarSamai: "طَبْخٌ",
    masdarQiyasi: "مَطْبَخٌ",
    sifatMusyabihat: "طَبِيخٌ"
  },
  {
    id: "qabila",
    root: { fa: "ق", ain: "ب", lam: "ل" },
    translation: "Menerima / menyetujui / menghadap (Lisanul Arab)",
    babNum: 4,
    bina: "Shohih",
    masdarSamai: "قَبُولٌ / قُبْلٌ",
    masdarQiyasi: "مَقْبَلٌ",
    sifatMusyabihat: "قَبِيلٌ"
  },
  {
    id: "faala",
    root: { fa: "ف", ain: "ع", lam: "ل" },
    translation: "Melakukan / berbuat / bertindak (Kamus Munawwir)",
    babNum: 3,
    bina: "Shohih",
    masdarSamai: "فِعْلٌ / فَعَالٌ",
    masdarQiyasi: "مَفْعَلٌ",
    sifatMusyabihat: "فَعِيلٌ"
  },
  {
    id: "batula",
    root: { fa: "ب", ain: "ط", lam: "ل" },
    translation: "Menjadi pahlawan / pemberani / gagah berani (Kamus Munawwir)",
    babNum: 5,
    bina: "Shohih",
    masdarSamai: "بُطُولَةٌ / بَطَالَةٌ / بَطْلٌ",
    masdarQiyasi: "مَبْطَلٌ",
    sifatMusyabihat: "بَطَلٌ"
  },
  {
    id: "jabuna",
    root: { fa: "ج", ain: "ب", lam: "ن" },
    translation: "Menjadi penakut / pengecut (Kamus Munawwir)",
    babNum: 5,
    bina: "Shohih",
    masdarSamai: "جُبْنٌ / جَبَانَةٌ",
    masdarQiyasi: "مَجْبَنٌ",
    sifatMusyabihat: "جَبَانٌ"
  },
  {
    id: "bakhila",
    root: { fa: "ب", ain: "خ", lam: "ل" },
    translation: "Menjadi kikir / pelit / kedit (Lisanul 'Arab)",
    babNum: 4,
    bina: "Shohih",
    masdarSamai: "بُخْلٌ / بَخَلٌ / بَخَالَةٌ",
    masdarQiyasi: "مَبْخَلٌ",
    sifatMusyabihat: "بَخِيلٌ"
  },
  {
    id: "fashuha",
    root: { fa: "ف", ain: "ص", lam: "ح" },
    translation: "Menjadi fasih / jelas / terang bicaranya (Kamus Munjid)",
    babNum: 5,
    bina: "Shohih",
    masdarSamai: "فَصَاحَةٌ / فُصْحٌ",
    masdarQiyasi: "مَفْصَحٌ",
    sifatMusyabihat: "فَصِيحٌ"
  },
  {
    id: "dhakiya",
    root: { fa: "ذ", ain: "ك", lam: "ي" },
    translation: "Menjadi cerdas / tajam pikirannya / wangi (Kamus Munawwir)",
    babNum: 4,
    bina: "Naqis",
    masdarSamai: "ذَكَاءٌ / ذَكًى",
    masdarQiyasi: "مَذْكًى",
    sifatMusyabihat: "ذَكِيٌّ"
  },
  {
    id: "azza",
    root: { fa: "ع", ain: "ز", lam: "ز" },
    translation: "Menjadi mulia / perkasa / langka (Lisanul 'Arab)",
    babNum: 2,
    bina: "Mudho'af",
    masdarSamai: "عِزٌّ / عِزَّةٌ / عَزَازَةٌ",
    masdarQiyasi: "مَعِزٌّ",
    sifatMusyabihat: "عَزِيزٌ"
  },
  {
    id: "sakhiya",
    root: { fa: "س", ain: "خ", lam: "و" },
    translation: "Menjadi dermawan / murah hati (Kamus Munawwir)",
    babNum: 4,
    bina: "Naqis",
    masdarSamai: "سَخَاءٌ / سَخْوٌ",
    masdarQiyasi: "مَسْخًى",
    sifatMusyabihat: "سَخِيٌّ"
  },
  {
    id: "kamula",
    root: { fa: "ك", ain: "م", lam: "ل" },
    translation: "Menjadi sempurna / lengkap / utuh (Kamus Munawwir)",
    babNum: 5,
    bina: "Shohih",
    masdarSamai: "كَمَالٌ / كُمُولٌ",
    masdarQiyasi: "مَكْمَلٌ",
    sifatMusyabihat: "_"
  },
  {
    id: "abaqa",
    root: { fa: "أ", ain: "ب", lam: "ق" },
    translation: "Lari / melarikan diri / minggat (Kamus Munawwir)",
    babNum: 1,
    bina: "Mahmuz Fa",
    masdarSamai: "أَبْقٌ / إِبَاقٌ / أَبَقٌ",
    masdarQiyasi: "مَأْبَقٌ",
    sifatMusyabihat: "_"
  },
  {
    id: "abaa",
    root: { fa: "أ", ain: "ب", lam: "ي" },
    translation: "Enggan / menolak / tidak mau (Kamus Munawwir)",
    babNum: 3,
    bina: "Naqis",
    masdarSamai: "إِبَاءٌ / إِبَاءَةٌ",
    masdarQiyasi: "مَأْبًى",
    sifatMusyabihat: "أَبِيٌّ",
    sifatMusyabihatPlural: {
      katsroh: "أُبَاةٌ",
      qillah: "-",
      muntahal: "-",
      mufrod_mudzakkar: "أَبِيٌّ",
      mufrod_muannas: "أَبِيَّةٌ",
      wazan_name: "فَعِيلٌ"
    }
  },
  {
    id: "ataa",
    root: { fa: "أ", ain: "ت", lam: "ي" },
    translation: "Datang / tiba / berkunjung (Kamus Munawwir)",
    babNum: 2,
    bina: "Naqis",
    masdarSamai: "أَتْيٌ / أُتِيٌّ / إِتْيَانٌ",
    masdarQiyasi: "مَأْتًى",
    sifatMusyabihat: "أَتِيٌّ",
    sifatMusyabihatPlural: {
      katsroh: "أُتَاةٌ",
      qillah: "-",
      muntahal: "-",
      mufrod_mudzakkar: "أَتِيٌّ",
      mufrod_muannas: "أَتِيَّةٌ",
      wazan_name: "فَعِيلٌ"
    }
  },
  {
    id: "atsara",
    root: { fa: "أ", ain: "ث", lam: "ر" },
    translation: "Memilih / menceritakan / menularkan (Kamus Munawwir)",
    babNum: 1,
    bina: "Mahmuz Fa",
    masdarSamai: "أَثْرٌ / أُثْرَةٌ / أَثَارَةٌ",
    masdarQiyasi: "مَأْثَرٌ",
    sifatMusyabihat: "أَثِيرٌ"
  },
  {
    id: "ajara",
    root: { fa: "أ", ain: "ج", lam: "ر" },
    translation: "Mengupahi / memberi pahala / menyewakan (Kamus Munawwir)",
    babNum: 1,
    bina: "Mahmuz Fa",
    masdarSamai: "أَجْرٌ / أُجْرَةٌ",
    masdarQiyasi: "مَأْجَرٌ",
    sifatMusyabihat: "أَجِيرٌ"
  },
  {
    id: "akhura",
    root: { fa: "أ", ain: "خ", lam: "ر" },
    translation: "Menjadi di belakang / berada di akhir / terlambat (Kamus Munawwir)",
    babNum: 5,
    bina: "Mahmuz Fa",
    masdarSamai: "أُخُورَةٌ / أَخَارَةٌ",
    masdarQiyasi: "مَأْخَرٌ",
    sifatMusyabihat: "أَخِيرٌ"
  },
  {
    id: "aduba",
    root: { fa: "أ", ain: "د", lam: "ب" },
    translation: "Menjadi beradab / sopan / santun (Kamus Munawwir)",
    babNum: 5,
    bina: "Mahmuz Fa",
    masdarSamai: "أَدَبٌ / مَأْدَبَةٌ / أَدَابَةٌ",
    masdarQiyasi: "مَأْدَبٌ",
    sifatMusyabihat: "أَدِيبٌ"
  },
  {
    id: "adhina",
    root: { fa: "أ", ain: "ذ", lam: "ن" },
    translation: "Mengizinkan / memperkenankan / mendengar (Kamus Munawwir)",
    babNum: 4,
    bina: "Mahmuz Fa",
    masdarSamai: "إِذْنٌ / أَذَنٌ / أَذَانَةٌ",
    masdarQiyasi: "مَأْذَنٌ",
    sifatMusyabihat: "أَذِينٌ"
  },
  {
    id: "ariba",
    root: { fa: "أ", ain: "ر", lam: "ب" },
    translation: "Menjadi mahir / cerdik / butuh / ahli (Kamus Munawwir)",
    babNum: 4,
    bina: "Mahmuz Fa",
    masdarSamai: "أَرَبٌ / إِرْبٌ / أَرَابَةٌ",
    masdarQiyasi: "مَأْرَبٌ",
    sifatMusyabihat: "أَرِيبٌ"
  },
  {
    id: "azara",
    root: { fa: "أ", ain: "ز", lam: "ر" },
    translation: "Memperkuat / menyokong / melilitkan sarung (Kamus Munawwir, Lisanul 'Arab)",
    babNum: 2,
    bina: "Mahmuz Fa",
    masdarSamai: "أَزْرٌ",
    masdarQiyasi: "مَأْزَرٌ",
    sifatMusyabihat: "أَزِيرٌ"
  },
  {
    id: "azafa",
    root: { fa: "أ", ain: "ز", lam: "ف" },
    translation: "Mendekat / hampir tiba waktunya (Kamus Munawwir, Lisanul 'Arab)",
    babNum: 4,
    bina: "Mahmuz Fa",
    masdarSamai: "أَزَفٌ / أُزُوفٌ",
    masdarQiyasi: "مَأْزَفٌ",
    sifatMusyabihat: "_"
  },
  {
    id: "asara",
    root: { fa: "أ", ain: "س", lam: "ر" },
    translation: "Menawan / membelenggu / mengikat (Kamus Munawwir, Lisanul 'Arab)",
    babNum: 2,
    bina: "Mahmuz Fa",
    masdarSamai: "أَسْرٌ / إِسَارٌ / أُسُورٌ",
    masdarQiyasi: "مَأْسَرٌ",
    sifatMusyabihat: "أَسِيرٌ",
    sifatMusyabihatPlural: {
      mufrod_mudzakkar: "أَسِيرٌ",
      mufrod_muannas: "أَسِيرَةٌ",
      katsroh: "أُسَرَاءُ / أَسْرَى / أُسَارَى",
      qillah: "-.",
      muntahal: "فَعَالَى",
      wazan_name: "فَعِيلٌ"
    }
  },
  {
    id: "asana",
    root: { fa: "أ", ain: "س", lam: "ن" },
    translation: "Menjadi payau / berubah rasa dan baunya (Kamus Munawwir)",
    babNum: 4,
    bina: "Mahmuz Fa",
    masdarSamai: "أَسْنٌ / أُسُونٌ",
    masdarQiyasi: "مَأْسَنٌ",
    sifatMusyabihat: "أَسِنٌ"
  },
  {
    id: "asaya",
    root: { fa: "أ", ain: "س", lam: "ي" },
    translation: "Berduka cita / sedih / mengobati (Lisanul 'Arab, Kamus Munawwir)",
    babNum: 4,
    bina: "Mahmuz Fa",
    masdarSamai: "أَسًى / أُسْوَةٌ",
    masdarQiyasi: "مَأْسًى",
    sifatMusyabihat: "أَسِيٌّ / أَسِيفٌ"
  },
  {
    id: "asyara",
    root: { fa: "أ", ain: "ش", lam: "ر" },
    translation: "Menjadi gembira berlebihan / angkuh / sombong (Kamus Munawwir)",
    babNum: 4,
    bina: "Mahmuz Fa",
    masdarSamai: "أَشَرٌ / أُشُورٌ",
    masdarQiyasi: "مَأْشَرٌ",
    sifatMusyabihat: "أَشِرٌ",
    sifatMusyabihatPlural: {
      mufrod_mudzakkar: "أَشِرٌ",
      mufrod_muannas: "أَشِرَةٌ",
      katsroh: "أَشِرُونَ / أَشَارَى",
      qillah: "-.",
      muntahal: "-.",
      wazan_name: "فَعِلٌ"
    }
  },
  {
    id: "afaka",
    root: { fa: "أ", ain: "ف", lam: "ك" },
    translation: "Memalingkan / berdusta / berbohong (Lisanul 'Arab, Kamus Munawwir)",
    babNum: 2,
    bina: "Mahmuz Fa",
    masdarSamai: "أَفْكٌ / إِفْكٌ / أُفُوكٌ",
    masdarQiyasi: "مَأْفَكٌ",
    sifatMusyabihat: "أَفِيكٌ"
  },
  {
    id: "afala",
    root: { fa: "أ", ain: "ف", lam: "ل" },
    translation: "Terbenam / lenyap bintang atau matahari (Lisanul 'Arab, Kamus Munawwir)",
    babNum: 1,
    bina: "Mahmuz Fa",
    masdarSamai: "أُفُولٌ / أَفْلٌ",
    masdarQiyasi: "مَأْفَلٌ",
    sifatMusyabihat: "_"
  },
  {
    id: "yabisa",
    root: { fa: "ي", ain: "ب", lam: "س" },
    translation: "Menjadi kering / mengering (Kamus Munawwir, Lisanul 'Arab)",
    babNum: 4,
    bina: "Mitsal",
    masdarSamai: "يَبْسٌ / يَبَسٌ / يُبُوسَةٌ",
    masdarQiyasi: "مَيْبَسٌ",
    sifatMusyabihat: "يَبِيسٌ",
    sifatMusyabihatPlural: {
      mufrod_mudzakkar: " يَبِيسٌ",
      mufrod_muannas: "يَبِيسَةٌ",
      katsroh: "يُبْسٌ / يَبَسٌ ",
      qillah: "-.",
      muntahal: "يَوَابِسُ",
      wazan_name: "فَعِيلٌ"
    }
  },
  {
    id: "yatima",
    root: { fa: "ي", ain: "ت", lam: "م" },
    translation: "Menjadi yatim / piatu / kehilangan bapak (Kamus Munawwir, Lisanul 'Arab)",
    babNum: 4,
    bina: "Mitsal",
    masdarSamai: "يَتْمٌ / يُتْمٌ / يَتَامٌ",
    masdarQiyasi: "مَيْتَمٌ",
    sifatMusyabihat: "يَتِيمٌ",
    sifatMusyabihatPlural: {
      mufrod_mudzakkar: "يَتِيمٌ",
      mufrod_muannas: "يَتِيمَةٌ",
      katsroh: "أَيْتَامٌ / يَتَامَى / يُتَمَاءُ",
      qillah: "-.",
      muntahal: "-.",
      wazan_name: "فَعِيلٌ"
    }
  },
  {
    id: "yasara",
    root: { fa: "ي", ain: "س", lam: "ر" },
    translation: "Menjadi mudah / gampang / makmur (Kamus Munawwir, Lisanul 'Arab)",
    babNum: 2,
    bina: "Mitsal",
    masdarSamai: "يُسْرٌ / يَسَارٌ / مَيْسِرٌ",
    masdarQiyasi: "مَيْسَرٌ",
    sifatMusyabihat: "يَسِيرٌ",
    sifatMusyabihatPlural: {
      mufrod_mudzakkar: "يَسِيرٌ",
      mufrod_muannas: "يَسِيرَةٌ",
      katsroh: "يُسُرٌ / أَيْسَارٌ",
      qillah: "-.",
      muntahal: "-.",
      wazan_name: "فَعِيلٌ"
    }
  },
  {
    id: "yafaa",
    root: { fa: "ي", ain: "ف", lam: "ع" },
    translation: "Menjadi dewasa / tumbuh besar / mendaki bukit (Kamus Munawwir, Lisanul 'Arab)",
    babNum: 3,
    bina: "Mitsal",
    masdarSamai: "يَفْعٌ / يُفُوعٌ / يَفَاعٌ",
    masdarQiyasi: "مَيْفَعٌ",
    sifatMusyabihat: "أَيْفَعُ",
    sifatMusyabihatPlural: {
      mufrod_mudzakkar: "أَيْفَعُ",
      mufrod_muannas: "يَفْعَاءُ",
      katsroh: "أَيْفَاعٌ / يُفَعَةٌ / يُفْعَانٌ",
      qillah: "-.",
      muntahal: "-.",
      wazan_name: "أَفْعَلُ"
    }
  },
  {
    id: "yaqidha",
    root: { fa: "ي", ain: "ق", lam: "ظ" },
    translation: "Terjaga / terbangun / waspada / cerdas (Kamus Munawwir, Lisanul 'Arab)",
    babNum: 4,
    bina: "Mitsal",
    masdarSamai: "يَقَظٌ / يَقَظَةٌ",
    masdarQiyasi: "مَيْقَظٌ",
    sifatMusyabihat: "يَقِظٌ / يَقْظَانُ",
  },
  {
    id: "yaqina",
    root: { fa: "ي", ain: "ق", lam: "ن" },
    translation: "Menjadi yakin / mempercayai (Kamus Munawwir, Lisanul 'Arab)",
    babNum: 4,
    bina: "Mitsal",
    masdarSamai: "يَقَنٌ / يَقِينٌ",
    masdarQiyasi: "مَيْقَنٌ",
    sifatMusyabihat: "يَقِنٌ / يَقِينٌ",
  },
  {
    id: "yamana",
    root: { fa: "ي", ain: "م", lam: "ن" },
    translation: "Mendapat berkah / beruntung / pergi ke Yaman (Kamus Munawwir, Lisanul 'Arab)",
    babNum: 4,
    bina: "Mitsal",
    masdarSamai: "يُمْنٌ / مَيْمَنَةٌ",
    masdarQiyasi: "مَيْمَنٌ",
    sifatMusyabihat: "أَيْمَنُ / مَيْمُونٌ",
    sifatMusyabihatPlural: {
      mufrod_mudzakkar: "أَيْمَنُ / مَيْمُونٌ",
      mufrod_muannas: "يُمْنَى / مَيْمُونَةٌ",
      katsroh: "أَيَامِنُ / مَيَامِينُ",
      qillah: "-.",
      muntahal: "أَيَامِنُ / مَيَامِينُ",
      wazan_name: "أَفْعَلُ / مَفْعُولٌ"
    }
  },
  {
    id: "yanaa",
    root: { fa: "ي", ain: "ن", lam: "ع" },
    translation: "Menjadi matang / masak buahnya (Kamus Munawwir, Lisanul 'Arab)",
    babNum: 2,
    bina: "Mitsal",
    masdarSamai: "يَنْعٌ / يُنْعٌ / يَنِيعٌ",
    masdarQiyasi: "مَيْنَعٌ",
    sifatMusyabihat: "يَنِيعٌ",
    sifatMusyabihatPlural: {
      mufrod_mudzakkar: "يَنِيعٌ",
      mufrod_muannas: "يَنِيعَةٌ",
      katsroh: "يُنْعٌ",
      qillah: "-.",
      muntahal: "يَوَانِعُ",
      wazan_name: "فَعِيلٌ"
    }
  },
  {
    id: "yaeisa",
    root: { fa: "ي", ain: "ء", lam: "س" },
    translation: "Putus asa / hilang harapan (Kamus Munawwir, Lisanul 'Arab)",
    babNum: 4,
    bina: "Mitsal",
    masdarSamai: "يَأْسٌ / يَآسَةٌ",
    masdarQiyasi: "مَيْأَسٌ",
    sifatMusyabihat: "يَئِسٌ / يَؤُوسٌ",
  },
  {
    id: "yahama",
    root: { fa: "ي", ain: "ه", lam: "م" },
    translation: "Bingung / mengembara tanpa arah / menjadi gila karena cinta (Kamus Munawwir, Lisanul 'Arab)",
    babNum: 4,
    bina: "Mitsal",
    masdarSamai: "يَهْمٌ / يَهَمٌ",
    masdarQiyasi: "مَيْهَمٌ",
    sifatMusyabihat: "أَيْهَمُ",
  },
  {
    id: "nasaqa",
    root: { fa: "ن", ain: "س", lam: "ق" },
    translation: "Mengatur / menyusun / merangkai (Kamus Munawwir, Al-Munjid, Lisanul 'Arab)",
    babNum: 1,
    bina: "Shohih",
    masdarSamai: "نَسْقٌ / نَسَقٌ",
    masdarQiyasi: "مَنْسَقٌ",
    sifatMusyabihat: "نَسِيقٌ",
    sifatMusyabihatPlural: {
      mufrod_mudzakkar: "نَسِيقٌ",
      mufrod_muannas: "نَسِيقَةٌ",
      katsroh: "أَنْسَاقٌ / نُسُقٌ",
      muntahal: "نَسَائِقُ"
    }
  },
  {
    id: "nasaka",
    root: { fa: "ن", ain: "س", lam: "ك" },
    translation: "Beribadah / berbakti / menyembelih kurban (Kamus Munawwir, Al-Munjid, Lisanul 'Arab)",
    babNum: 1,
    bina: "Shohih",
    masdarSamai: "نُسْكٌ / نَسَكٌ / نَسَاكَةٌ",
    masdarQiyasi: "مَنْسَكٌ",
    sifatMusyabihat: "نَسِيكٌ",
    sifatMusyabihatPlural: {
      mufrod_mudzakkar: "نَسِيكٌ",
      mufrod_muannas: "نَسِيكَةٌ",
      katsroh: "أَنْسَاكٌ / نُسُكٌ",
      muntahal: "نَسَائِكُ"
    }
  },
  {
    id: "nasiya",
    root: { fa: "ن", ain: "س", lam: "ي" },
    translation: "Lupa / melalaikan (Kamus Munawwir, Al-Munjid, Lisanul 'Arab)",
    babNum: 4,
    bina: "Naqis",
    masdarSamai: "نَسْيٌ / نِسْيَانٌ",
    masdarQiyasi: "مَنْسًى",
    sifatMusyabihat: "نَسِيٌّ",
    sifatMusyabihatPlural: {
      mufrod_mudzakkar: "نَسِيٌّ",
      mufrod_muannas: "نَسِيَّةٌ",
      katsroh: "أَنْسِيَاءُ / نُسَاةٌ",
      muntahal: "-"
    }
  },
  {
    id: "nasya_a",
    root: { fa: "ن", ain: "ش", lam: "أ" },
    translation: "Tumbuh / hidup / muncul / berkembang (Kamus Munawwir, Al-Munjid, Lisanul 'Arab)",
    babNum: 3,
    bina: "Mahmuz Lam",
    masdarSamai: "نَشْءٌ / نُشُوءٌ / نَشْأَةٌ",
    masdarQiyasi: "مَنْشَأٌ",
    sifatMusyabihat: "نَشِئٌ",
    sifatMusyabihatPlural: {
      mufrod_mudzakkar: "نَشِئٌ",
      mufrod_muannas: "نَشِئَةٌ",
      katsroh: "أَنْشَاءٌ",
      muntahal: "-"
    }
  },
  {
    id: "nashara",
    root: { fa: "ن", ain: "ش", lam: "ر" },
    translation: "Menyebarkan / membeberkan / menggergaji (Kamus Munawwir, Al-Munjid, Lisanul 'Arab)",
    babNum: 1,
    bina: "Shohih",
    masdarSamai: "نَشْرٌ / نُشُورٌ",
    masdarQiyasi: "مَنْشَرٌ",
    sifatMusyabihat: "نَشِيرٌ",
    sifatMusyabihatPlural: {
      mufrod_mudzakkar: "نَشِيرٌ",
      mufrod_muannas: "نَشِيرَةٌ",
      katsroh: "أَنْشَارٌ / نُشُرٌ",
      muntahal: "مَنَاشِرُ"
    }
  },
  {
    id: "nashata",
    root: { fa: "ن", ain: "ش", lam: "ط" },
    translation: "Giat / aktif / bersemangat / rajin (Kamus Munawwir, Al-Munjid, Lisanul 'Arab)",
    babNum: 4,
    bina: "Shohih",
    masdarSamai: "نَشَاطٌ / نَشْطٌ",
    masdarQiyasi: "مَنْشَطٌ",
    sifatMusyabihat: "نَشِيطٌ",
    sifatMusyabihatPlural: {
      mufrod_mudzakkar: "نَشِيطٌ",
      mufrod_muannas: "نَشِيطَةٌ",
      katsroh: "أَنْشَاطٌ / نُشَاطٌ / نَشَاطَى",
      muntahal: "نَشَائِطُ"
    }
  },
  {
    id: "nasaba",
    root: { fa: "ن", ain: "ص", lam: "ب" },
    translation: "Menegakkan / menancapkan / menjadi letih (Kamus Munawwir, Al-Munjid, Lisanul 'Arab)",
    babNum: 1,
    bina: "Shohih",
    masdarSamai: "نَصْبٌ / نَصَبٌ",
    masdarQiyasi: "مَنْصَبٌ",
    sifatMusyabihat: "نَصِيبٌ / نَصِبٌ",
    sifatMusyabihatPlural: {
      mufrod_mudzakkar: "نَصِيبٌ / نَصِبٌ",
      mufrod_muannas: "نَصِيبَةٌ / نَصِبَةٌ",
      katsroh: "أَنْصِبَاءُ / أَنْصَابٌ / نُصُبٌ",
      muntahal: "مَنَاصِبُ"
    }
  },
  {
    id: "nasaha",
    root: { fa: "ن", ain: "ص", lam: "ح" },
    translation: "Menasihati / tulus / ikhlas / murni (Kamus Munawwir, Al-Munjid, Lisanul 'Arab)",
    babNum: 3,
    bina: "Shohih",
    masdarSamai: "نُصْحٌ / نَصِيحَةٌ",
    masdarQiyasi: "مَنْصَحٌ",
    sifatMusyabihat: "نَصِيحٌ / نَصُوحٌ",
    sifatMusyabihatPlural: {
      mufrod_mudzakkar: "نَصِيحٌ / نَصُوحٌ",
      mufrod_muannas: "نَصِيحَةٌ",
      katsroh: "نُصَحَاءُ / نُصُحٌ",
      muntahal: "نَصَائِحُ"
    }
  },
  {
    id: "nadhija",
    root: { fa: "ن", ain: "ض", lam: "ج" },
    translation: "Matang / masak / dewasa (Kamus Munawwir, Al-Munjid, Lisanul 'Arab)",
    babNum: 4,
    bina: "Shohih",
    masdarSamai: "نَضْجٌ / نُضْجٌ",
    masdarQiyasi: "مَنْضَجٌ",
    sifatMusyabihat: "نَضِيجٌ",
    sifatMusyabihatPlural: {
      mufrod_mudzakkar: "نَضِيجٌ",
      mufrod_muannas: "نَضِيجَةٌ",
      katsroh: "أَنْضَاجٌ / نُضُجٌ",
      muntahal: "-"
    }
  },
  {
    id: "nadhakha",
    root: { fa: "ن", ain: "ض", lam: "خ" },
    translation: "Memancar / membasahi / memercikkan air (Kamus Munawwir, Al-Munjid, Lisanul 'Arab)",
    babNum: 3,
    bina: "Shohih",
    masdarSamai: "نَضْخٌ",
    masdarQiyasi: "مَنْضَخٌ",
    sifatMusyabihat: "نَضِيخٌ",
    sifatMusyabihatPlural: {
      mufrod_mudzakkar: "نَضِيخٌ",
      mufrod_muannas: "نَضِيخَةٌ",
      katsroh: "أَنْضَاخٌ",
      muntahal: "مَنَاضِخُ"
    }
  },
  {
    id: "nathaqa",
    root: { fa: "ن", ain: "ط", lam: "ق" },
    translation: "Berbicara / melafalkan / berbunyi (Kamus Munawwir, Al-Munjid, Lisanul 'Arab)",
    babNum: 1,
    bina: "Shohih",
    masdarSamai: "نُطْقٌ / مَنْطِقٌ",
    masdarQiyasi: "مَنْطَقٌ",
    sifatMusyabihat: "نَطِيقٌ / نَطُوقٌ",
    sifatMusyabihatPlural: {
      mufrod_mudzakkar: "نَطِيقٌ / نَطُوقٌ",
      mufrod_muannas: "نَطِيقَةٌ / نَطُوقَةٌ",
      katsroh: "نُطُقٌ / أَنْطَاقٌ / نُطَقَاءُ",
      muntahal: "مَنَاطِقُ"
    }
  },
  {
    id: "nathaha",
    root: { fa: "ن", ain: "ط", lam: "ح" },
    translation: "Menanduk / menabrak (Kamus Munawwir, Al-Munjid, Lisanul 'Arab)",
    babNum: 3,
    bina: "Shohih",
    masdarSamai: "نَتْحٌ / نَطْحٌ",
    masdarQiyasi: "مَنْطَحٌ",
    sifatMusyabihat: "نَطِيحٌ",
    sifatMusyabihatPlural: {
      mufrod_mudzakkar: "نَطِيحٌ",
      mufrod_muannas: "نَطِيحَةٌ",
      katsroh: "نُطُحٌ / أَنْطَاحٌ / نَطَاحَى",
      muntahal: "نَطَائِحُ"
    }
  },
  {
    id: "nazhufa",
    root: { fa: "ن", ain: "ظ", lam: "ف" },
    translation: "Bersih / rapi / higienis (Kamus Munawwir, Al-Munjid, Lisanul 'Arab)",
    babNum: 5,
    bina: "Shohih",
    masdarSamai: "نَظَافَةٌ",
    masdarQiyasi: "مَنْظَفٌ",
    sifatMusyabihat: "نَظِيفٌ",
    sifatMusyabihatPlural: {
      mufrod_mudzakkar: "نَظِيفٌ",
      mufrod_muannas: "نَظِيفَةٌ",
      katsroh: "نُظَفَاءُ / نِظَافٌ / أَنْظِفَةٌ",
      muntahal: "نَظَائِفُ"
    }
  },
  {
    id: "na_aqa",
    root: { fa: "ن", ain: "ع", lam: "ق" },
    translation: "Berteriak / berkaok (burung gagak) / memanggil kambing (Kamus Munawwir, Al-Munjid, Lisanul 'Arab)",
    babNum: 3,
    bina: "Shohih",
    masdarSamai: "نَعْقٌ / نَعِيقٌ",
    masdarQiyasi: "مَنْعَقٌ",
    sifatMusyabihat: "نَعِيقٌ / نَعُوقٌ",
    sifatMusyabihatPlural: {
      mufrod_mudzakkar: "نَعِيقٌ / نَعُوقٌ",
      mufrod_muannas: "نَعِيقَةٌ / نَعُوقَةٌ",
      katsroh: "أَنْعَاقٌ / نُعُقٌ",
      muntahal: "مَنَاعِقُ"
    }
  },
  {
    id: "na_asa",
    root: { fa: "ن", ain: "ع", lam: "س" },
    translation: "Mengantuk / menjadi lesu (Kamus Munawwir, Al-Munjid, Lisanul 'Arab)",
    babNum: 4,
    bina: "Shohih",
    masdarSamai: "نُعَاسٌ",
    masdarQiyasi: "مَنْعَسٌ",
    sifatMusyabihat: "نَعِسٌ / نَعْسَانُ",
    sifatMusyabihatPlural: {
      mufrod_mudzakkar: "نَعِسٌ / نَعْسَانُ",
      mufrod_muannas: "نَعِسَةٌ / نَعْسَى",
      katsroh: "أَنْعَاسٌ / نُعَاسَى",
      muntahal: "مَنَاعِسُ"
    }
  },
  {
    id: "nafatha",
    root: { fa: "ن", ain: "ف", lam: "ث" },
    translation: "Meniup / menyembur / meluahkan (Kamus Munawwir, Al-Munjid, Lisanul 'Arab)",
    babNum: 1,
    bina: "Shohih",
    masdarSamai: "نَفْثٌ",
    masdarQiyasi: "مَنْفَثٌ",
    sifatMusyabihat: "نَفِيثٌ",
    sifatMusyabihatPlural: {
      mufrod_mudzakkar: "نَفِيثٌ",
      mufrod_muannas: "نَفِيثَةٌ",
      katsroh: "أَنْفَاثٌ",
      muntahal: "مَنَافِثُ"
    }
  },
  {
    id: "nafakha",
    root: { fa: "ن", ain: "ف", lam: "خ" },
    translation: "Meniup / menghembus / membusungkan dada (Kamus Munawwir, Al-Munjid, Lisanul 'Arab)",
    babNum: 1,
    bina: "Shohih",
    masdarSamai: "نَفْخٌ / نَفَخَانٌ",
    masdarQiyasi: "مَنْفَخٌ",
    sifatMusyabihat: "نَفِيخٌ",
    sifatMusyabihatPlural: {
      mufrod_mudzakkar: "نَفِيخٌ",
      mufrod_muannas: "نَفِيخَةٌ",
      katsroh: "أَنْفَاخٌ / نُفُخٌ",
      muntahal: "مَنَافِخُ"
    }
  },
  {
    id: "nabata",
    root: { fa: "ن", ain: "ب", lam: "ت" },
    translation: "Tumbuh / bertunas / berkembang (Kamus Munawwir, Al-Munjid, Lisanul 'Arab)",
    babNum: 1,
    bina: "Shohih",
    masdarSamai: "نَبْتٌ / نَبَاتٌ",
    masdarQiyasi: "مَنْبَتٌ",
    sifatMusyabihat: "نَبِيتٌ",
    sifatMusyabihatPlural: {
      mufrod_mudzakkar: "نَبِيتٌ",
      mufrod_muannas: "نَبِيتَةٌ",
      katsroh: "أَنْبَاتٌ / نُبُتٌ",
      muntahal: "نَبَائِتُ"
    }
  },
  {
    id: "nabadha",
    root: { fa: "ن", ain: "ب", lam: "ذ" },
    translation: "Membuang / melemparkan / menolak (Kamus Munawwir, Al-Munjid, Lisanul 'Arab)",
    babNum: 2,
    bina: "Shohih",
    masdarSamai: "نَبْذٌ",
    masdarQiyasi: "مَنْبَذٌ",
    sifatMusyabihat: "نَبِيذٌ",
    sifatMusyabihatPlural: {
      mufrod_mudzakkar: "نَبِيذٌ",
      mufrod_muannas: "نَبِيذَةٌ",
      katsroh: "أَنْبِذَةٌ / نُبُذٌ",
      muntahal: "نَبَائِذُ"
    }
  },
  {
    id: "naba_a",
    root: { fa: "ن", ain: "ب", lam: "أ" },
    translation: "Mengabarkan / memberitakan (Kamus Munawwir, Al-Munjid, Lisanul 'Arab)",
    babNum: 3,
    bina: "Mahmuz Lam",
    masdarSamai: "نَبْءٌ / نُبُوءٌ",
    masdarQiyasi: "مَنْبَأٌ",
    sifatMusyabihat: "نَبِيءٌ",
    sifatMusyabihatPlural: {
      mufrod_mudzakkar: "نَبِيءٌ",
      mufrod_muannas: "نَبِيئَةٌ",
      katsroh: "أَنْبِئَاءُ / نُبُؤٌ",
      muntahal: "-"
    }
  },
  {
    id: "nab_a",
    root: { fa: "ن", ain: "ب", lam: "ع" },
    translation: "Memancar / mengalir (air dari mata air) (Kamus Munawwir, Al-Munjid, Lisanul 'Arab)",
    babNum: 1,
    bina: "Shohih",
    masdarSamai: "نَبْعٌ / نُبُوعٌ / نَبَعَانٌ",
    masdarQiyasi: "مَنْبَعٌ",
    sifatMusyabihat: "نَبِيعٌ",
    sifatMusyabihatPlural: {
      mufrod_mudzakkar: "نَبِيعٌ",
      mufrod_muannas: "نَبِيعَةٌ",
      katsroh: "أَنْبَاعٌ",
      muntahal: "مَنَابِعُ"
    }
  },
  {
    id: "nataqa",
    root: { fa: "ن", ain: "ت", lam: "ق" },
    translation: "Menggoyang / mengangkat / mengeluarkan (Kamus Munawwir, Al-Munjid, Lisanul 'Arab)",
    babNum: 1,
    bina: "Shohih",
    masdarSamai: "نَتْقٌ",
    masdarQiyasi: "مَنْتَقٌ",
    sifatMusyabihat: "نَتِيقٌ",
    sifatMusyabihatPlural: {
      mufrod_mudzakkar: "نَتِيقٌ",
      mufrod_muannas: "نَتِيقَةٌ",
      katsroh: "أَنْتَاقٌ / نُتُقٌ",
      muntahal: "نَتَائِقُ"
    }
  },
  {
    id: "nathara",
    root: { fa: "ن", ain: "ث", lam: "ر" },
    translation: "Menaburkan / menyerakkan / membagikan (Kamus Munawwir, Al-Munjid, Lisanul 'Arab)",
    babNum: 1,
    bina: "Shohih",
    masdarSamai: "نَثْرٌ / نِثَارٌ",
    masdarQiyasi: "مَنْثَرٌ",
    sifatMusyabihat: "نَثِيرٌ",
    sifatMusyabihatPlural: {
      mufrod_mudzakkar: "نَثِيرٌ",
      mufrod_muannas: "نَثِيرَةٌ",
      katsroh: "أَنْثَارٌ / نُثُرٌ",
      muntahal: "مَنَاثِرُ"
    }
  },
  {
    id: "najasa",
    root: { fa: "ن", ain: "ج", lam: "س" },
    translation: "Menjadi najis / kotor (Kamus Munawwir, Al-Munjid, Lisanul 'Arab)",
    babNum: 5,
    bina: "Shohih",
    masdarSamai: "نَجَاسَةٌ / نَجْسٌ",
    masdarQiyasi: "مَنْجَسٌ",
    sifatMusyabihat: "نَجِسٌ / نَجِيسٌ",
    sifatMusyabihatPlural: {
      mufrod_mudzakkar: "نَجِسٌ / نَجِيسٌ",
      mufrod_muannas: "نَجِسَةٌ / نَجِيسَةٌ",
      katsroh: "أَنْجَاسٌ / نُجَسَاءُ",
      muntahal: "نَجَائِسُ"
    }
  },
  {
    id: "naja",
    root: { fa: "ن", ain: "ج", lam: "و" },
    translation: "Selamat / terbebas / lolos (Kamus Munawwir, Al-Munjid, Lisanul 'Arab)",
    babNum: 1,
    bina: "Naqis Wawi",
    masdarSamai: "نَجَاةٌ / نَجْوٌ",
    masdarQiyasi: "مَنْجًى",
    sifatMusyabihat: "نَجِيٌّ",
    sifatMusyabihatPlural: {
      mufrod_mudzakkar: "نَجِيٌّ",
      mufrod_muannas: "نَجِيَّةٌ",
      katsroh: "أَنْجِيَاءُ / نُجَاةٌ",
      muntahal: "-"
    }
  },
  {
    id: "nahaba_sin",
    root: { fa: "ن", ain: "ح", lam: "ب" },
    translation: "Menangis tersedu-sedu / meratap / menunaikan nazar (Kamus Munawwir, Al-Munjid, Lisanul 'Arab)",
    babNum: 2,
    bina: "Shohih",
    masdarSamai: "نَحْبٌ / نَحِيبٌ",
    masdarQiyasi: "مَنْحَبٌ",
    sifatMusyabihat: "نَحِيبٌ",
    sifatMusyabihatPlural: {
      mufrod_mudzakkar: "نَحِيبٌ",
      mufrod_muannas: "نَحِيبَةٌ",
      katsroh: "أَنْحَابٌ",
      muntahal: "-"
    }
  },
  {
    id: "nahata",
    root: { fa: "ن", ain: "ح", lam: "ت" },
    translation: "Memahat / mengukir / meraut (Kamus Munawwir, Al-Munjid, Lisanul 'Arab)",
    babNum: 2,
    bina: "Shohih",
    masdarSamai: "نَحْتٌ",
    masdarQiyasi: "مَنْحَتٌ",
    sifatMusyabihat: "نَحِيتٌ",
    sifatMusyabihatPlural: {
      mufrod_mudzakkar: "نَحِيتٌ",
      mufrod_muannas: "نَحِيتَةٌ",
      katsroh: "أَنْحَاتٌ / نُحُتٌ",
      muntahal: "نَحَائِتُ"
    }
  },
  {
    id: "nahara_sin",
    root: { fa: "ن", ain: "ح", lam: "ر" },
    translation: "Menyembelih / memotong leher hewan kurban (Kamus Munawwir, Al-Munjid, Lisanul 'Arab)",
    babNum: 3,
    bina: "Shohih",
    masdarSamai: "نَحْرٌ",
    masdarQiyasi: "مَنْحَرٌ",
    sifatMusyabihat: "نَحِيرٌ",
    sifatMusyabihatPlural: {
      mufrod_mudzakkar: "نَحِيرٌ",
      mufrod_muannas: "نَحِيرَةٌ",
      katsroh: "أَنْحَارٌ / نُحُرٌ / نَحْرَى",
      muntahal: "نَحَائِرُ"
    }
  },
  {
    id: "nahufa",
    root: { fa: "ن", ain: "ح", lam: "ف" },
    translation: "Menjadi kurus / langsing (Kamus Munawwir, Al-Munjid, Lisanul 'Arab)",
    babNum: 5,
    bina: "Shohih",
    masdarSamai: "نَحَافَةٌ / نُحْفٌ",
    masdarQiyasi: "مَنْحَفٌ",
    sifatMusyabihat: "نَحِيفٌ",
    sifatMusyabihatPlural: {
      mufrod_mudzakkar: "نَحِيفٌ",
      mufrod_muannas: "نَحِيفَةٌ",
      katsroh: "نُحَفَاءُ / نِحَافٌ",
      muntahal: "نَحَائِفُ"
    }
  },
  {
    id: "nakhara",
    root: { fa: "ن", ain: "خ", lam: "ر" },
    translation: "Mendengkur / membusuk / berlubang-lubang (tulang) (Kamus Munawwir, Al-Munjid, Lisanul 'Arab)",
    babNum: 1,
    bina: "Shohih",
    masdarSamai: "نَخْرٌ / نَخِيرٌ",
    masdarQiyasi: "مَنْخَرٌ",
    sifatMusyabihat: "نَخِيرٌ",
    sifatMusyabihatPlural: {
      mufrod_mudzakkar: "نَخِيرٌ",
      mufrod_muannas: "نَخِيرَةٌ",
      katsroh: "أَنْخَارٌ",
      muntahal: "مَنَاخِرُ"
    }
  },
  {
    id: "nadima",
    root: { fa: "ن", ain: "د", lam: "م" },
    translation: "Menyesal / merasa bersalah (Kamus Munawwir, Al-Munjid, Lisanul 'Arab)",
    babNum: 4,
    bina: "Shohih",
    masdarSamai: "نَدَمٌ / نَدَامَةٌ",
    masdarQiyasi: "مَنْدَمٌ",
    sifatMusyabihat: "نَدِيمٌ / نَدْمَانُ",
    sifatMusyabihatPlural: {
      mufrod_mudzakkar: "نَدِيمٌ / نَدْمَانُ",
      mufrod_muannas: "نَدِيمَةٌ / نَدْمَى",
      katsroh: "أَنْدَامٌ / نُدَمَاءُ / نُدَامَى",
      muntahal: "نَدَائِمُ"
    }
  },
  {
    id: "nada",
    root: { fa: "ن", ain: "د", lam: "و" },
    translation: "Memanggil / berkumpul / menjadi basah / berembun (Kamus Munawwir, Al-Munjid, Lisanul 'Arab)",
    babNum: 1,
    bina: "Naqis Wawi",
    masdarSamai: "نَدْوٌ / نَدًى",
    masdarQiyasi: "مَنْدًى",
    sifatMusyabihat: "نَدِيٌّ",
    sifatMusyabihatPlural: {
      mufrod_mudzakkar: "نَدِيٌّ",
      mufrod_muannas: "نَدِيَّةٌ",
      katsroh: "أَنْدِيَةٌ",
      muntahal: "-"
    }
  },
  {
    id: "nadhara",
    root: { fa: "ن", ain: "ذ", lam: "ر" },
    translation: "Bernazar / menjanjikan / memperingatkan (Kamus Munawwir, Al-Munjid, Lisanul 'Arab)",
    babNum: 1,
    bina: "Shohih",
    masdarSamai: "نَذْرٌ",
    masdarQiyasi: "مَنْذَرٌ",
    sifatMusyabihat: "نَذِيرٌ",
    sifatMusyabihatPlural: {
      mufrod_mudzakkar: "نَذِيرٌ",
      mufrod_muannas: "نَذِيرَةٌ",
      katsroh: "أَنْذِرَةٌ / نُذُرٌ",
      muntahal: "-"
    }
  },
  {
    id: "naz_a",
    root: { fa: "ن", ain: "ز", lam: "ع" },
    translation: "Mencabut / menarik / merebut (Kamus Munawwir, Al-Munjid, Lisanul 'Arab)",
    babNum: 2,
    bina: "Shohih",
    masdarSamai: "نَزْعٌ",
    masdarQiyasi: "مَنْزَعٌ",
    sifatMusyabihat: "نَزِيعٌ",
    sifatMusyabihatPlural: {
      mufrod_mudzakkar: "نَزِيعٌ",
      mufrod_muannas: "نَزِيعَةٌ",
      katsroh: "أَنْزَاعٌ",
      muntahal: "-"
    }
  },
  {
    id: "nazagha",
    root: { fa: "ن", ain: "ز", lam: "غ" },
    translation: "Menghasut / membisiki jahat / mengadu domba (Kamus Munawwir, Al-Munjid, Lisanul 'Arab)",
    babNum: 3,
    bina: "Shohih",
    masdarSamai: "نَزْغٌ",
    masdarQiyasi: "مَنْزَغٌ",
    sifatMusyabihat: "نَزِيغٌ",
    sifatMusyabihatPlural: {
      mufrod_mudzakkar: "نَزِيغٌ",
      mufrod_muannas: "نَزِيغَةٌ",
      katsroh: "أَنْزَاغٌ",
      muntahal: "-"
    }
  },
  {
    id: "nazala",
    root: { fa: "ن", ain: "ز", lam: "ل" },
    translation: "Turun / singgah / menetap (Kamus Munawwir, Al-Munjid, Lisanul 'Arab)",
    babNum: 2,
    bina: "Shohih",
    masdarSamai: "نُزُولٌ / مَنْزِلٌ",
    masdarQiyasi: "مَنْزَلٌ",
    sifatMusyabihat: "نَزِيلٌ",
    sifatMusyabihatPlural: {
      mufrod_mudzakkar: "نَزِيلٌ",
      mufrod_muannas: "نَزِيلَةٌ",
      katsroh: "أَنْزَالٌ / نُزُلٌ / نُزَلَاءُ",
      muntahal: "نَزَائِلُ"
    }
  },
  {
    id: "nazafa",
    root: { fa: "ن", ain: "ز", lam: "ف" },
    translation: "Mengalirkan darah / kehabisan darah / menguras air sumur (Kamus Munawwir, Al-Munjid, Lisanul 'Arab)",
    babNum: 2,
    bina: "Shohih",
    masdarSamai: "نَزْفٌ",
    masdarQiyasi: "مَنْزَفٌ",
    sifatMusyabihat: "نَزِيفٌ",
    sifatMusyabihatPlural: {
      mufrod_mudzakkar: "نَزِيفٌ",
      mufrod_muannas: "نَزِيفَةٌ",
      katsroh: "أَنْزَافٌ",
      muntahal: "-"
    }
  },
  {
    id: "nasakha",
    root: { fa: "ن", ain: "س", lam: "خ" },
    translation: "Menyalin / menghapus / membatalkan (Kamus Munawwir, Al-Munjid, Lisanul 'Arab)",
    babNum: 3,
    bina: "Shohih",
    masdarSamai: "نَسْخٌ",
    masdarQiyasi: "مَنْسَخٌ",
    sifatMusyabihat: "نَسِيخٌ",
    sifatMusyabihatPlural: {
      mufrod_mudzakkar: "نَسِيخٌ",
      mufrod_muannas: "نَسِيخَةٌ",
      katsroh: "أَنْسَاخٌ / نُسُخٌ",
      muntahal: "-"
    }
  },
  {
    id: "nasera",
    root: { fa: "ن", ain: "س", lam: "ر" },
    translation: "Merobek / mematuk / menguliti (burung rajawali) (Kamus Munawwir, Al-Munjid, Lisanul 'Arab)",
    babNum: 1,
    bina: "Shohih",
    masdarSamai: "نَسْرٌ",
    masdarQiyasi: "مَنْسَرٌ",
    sifatMusyabihat: "نَسِيرٌ",
    sifatMusyabihatPlural: {
      mufrod_mudzakkar: "نَسِيرٌ",
      mufrod_muannas: "نَسِيرَةٌ",
      katsroh: "أَنْسَارٌ / نُسُورٌ",
      muntahal: "-"
    }
  },
  {
    id: "malla",
    root: { fa: "م", ain: "ل", lam: "ل" },
    translation: "Bosan / jemu / letih (Kamus Munawwir, Al-Munjid, Lisanul 'Arab)",
    babNum: 4,
    bina: "Muda'af",
    masdarSamai: "مَلٌّ / مَلَالٌ / مَلَالَةٌ",
    masdarQiyasi: "مَمَلٌّ",
    sifatMusyabihat: "مَلُولٌ",
    sifatMusyabihatPlural: {
      mufrod_mudzakkar: "مَلُولٌ",
      mufrod_muannas: "مَلُولَةٌ",
      katsroh: "أَمْلَالٌ",
      muntahal: "-"
    }
  },
  {
    id: "mana_a",
    root: { fa: "م", ain: "ن", lam: "ع" },
    translation: "Mencegah / melarang / menghalangi (Kamus Munawwir, Al-Munjid, Lisanul 'Arab)",
    babNum: 3,
    bina: "Shohih",
    masdarSamai: "مَنْعٌ",
    masdarQiyasi: "مَمْنَعٌ",
    sifatMusyabihat: "مَنِيعٌ",
    sifatMusyabihatPlural: {
      mufrod_mudzakkar: "مَنِيعٌ",
      mufrod_muannas: "مَنِيعَةٌ",
      katsroh: "أَمْنَاعٌ / مُنَعَاءُ",
      muntahal: "مَنَائِعُ"
    }
  },
  {
    id: "manna",
    root: { fa: "م", ain: "ن", lam: "ن" },
    translation: "Memberi karunia / nikmat / mengungkit kebaikan (Kamus Munawwir, Al-Munjid, Lisanul 'Arab)",
    babNum: 1,
    bina: "Muda'af",
    masdarSamai: "مَنٌّ",
    masdarQiyasi: "مَمَنٌّ",
    sifatMusyabihat: "مَنِينٌ",
    sifatMusyabihatPlural: {
      mufrod_mudzakkar: "مَنِينٌ",
      mufrod_muannas: "مَنِينَةٌ",
      katsroh: "أَمْنَانٌ",
      muntahal: "-"
    }
  },
  {
    id: "mana",
    root: { fa: "م", ain: "ن", lam: "ي" },
    translation: "Menguji / menakdirkan / mencita-citakan (Kamus Munawwir, Al-Munjid, Lisanul 'Arab)",
    babNum: 2,
    bina: "Naqis Ya'i",
    masdarSamai: "مَنْيٌ / مَنْيَةٌ",
    masdarQiyasi: "مَمْنًى",
    sifatMusyabihat: "مَنِيٌّ",
    sifatMusyabihatPlural: {
      mufrod_mudzakkar: "مَنِيٌّ",
      mufrod_muannas: "مَنِيَّةٌ",
      katsroh: "أَمْنَاءٌ",
      muntahal: "مَنَايَا"
    }
  },
  {
    id: "mahada",
    root: { fa: "م", ain: "ه", lam: "د" },
    translation: "Membentangkan / meratakan (Kamus Munawwir, Al-Munjid, Lisanul 'Arab)",
    babNum: 3,
    bina: "Shohih",
    masdarSamai: "مَهْدٌ",
    masdarQiyasi: "مَمْهَدٌ",
    sifatMusyabihat: "مَهِيدٌ",
    sifatMusyabihatPlural: {
      mufrod_mudzakkar: "مَهِيدٌ",
      mufrod_muannas: "مَهِيدَةٌ",
      katsroh: "أَمْهَادٌ / مُهُدٌ",
      muntahal: "مَمَاهِدُ"
    }
  },
  {
    id: "mahala",
    root: { fa: "م", ain: "ه", lam: "ل" },
    translation: "Lambat / perlahan-lahan (Kamus Munawwir, Al-Munjid, Lisanul 'Arab)",
    babNum: 4,
    bina: "Shohih",
    masdarSamai: "مَهْلٌ / مُهْلَةٌ",
    masdarQiyasi: "مَمْهَلٌ",
    sifatMusyabihat: "مَهِيلٌ",
    sifatMusyabihatPlural: {
      mufrod_mudzakkar: "مَهِيلٌ",
      mufrod_muannas: "مَهِيلَةٌ",
      katsroh: "أَمْهَالٌ",
      muntahal: "-"
    }
  },
  {
    id: "mata",
    root: { fa: "م", ain: "و", lam: "ت" },
    translation: "Mati / wafat / meninggal (Kamus Munawwir, Al-Munjid, Lisanul 'Arab)",
    babNum: 1,
    bina: "Ajwaf Wawi",
    masdarSamai: "مَوْتٌ",
    masdarQiyasi: "مَمَاتٌ",
    sifatMusyabihat: "مَيِّتٌ",
    sifatMusyabihatPlural: {
      mufrod_mudzakkar: "مَيِّتٌ",
      mufrod_muannas: "مَيِّتَةٌ",
      katsroh: "أَمْوَاتٌ / مَوْتَى",
      muntahal: "-"
    }
  },
  {
    id: "mada",
    root: { fa: "م", ain: "ي", lam: "د" },
    translation: "Bergoyang / bergoncang / pusing (Kamus Munawwir, Al-Munjid, Lisanul 'Arab)",
    babNum: 2,
    bina: "Ajwaf Ya'i",
    masdarSamai: "مَيْدٌ / مَيَدَانٌ",
    masdarQiyasi: "مَمَادٌ",
    sifatMusyabihat: "مَيِيدٌ",
    sifatMusyabihatPlural: {
      mufrod_mudzakkar: "مَيِيدٌ",
      mufrod_muannas: "مَيِيدَةٌ",
      katsroh: "أَمْيَادٌ",
      muntahal: "-"
    }
  },
  {
    id: "mala",
    root: { fa: "م", ain: "ي", lam: "ل" },
    translation: "Cenderung / miring / memihak (Kamus Munawwir, Al-Munjid, Lisanul 'Arab)",
    babNum: 2,
    bina: "Ajwaf Ya'i",
    masdarSamai: "مَيْلٌ / مَيَلَانٌ",
    masdarQiyasi: "مَمَالٌ",
    sifatMusyabihat: "مَيِيدٌ",
    sifatMusyabihatPlural: {
      mufrod_mudzakkar: "مَيِيدٌ",
      mufrod_muannas: "مَيِيدَةٌ",
      katsroh: "أَمْيَالٌ",
      muntahal: "مَمَايِلُ"
    }
  },
  {
    id: "matta",
    root: { fa: "م", ain: "ت", lam: "ت" },
    translation: "Menghubungkan / menarik tali (Kamus Munawwir, Al-Munjid, Lisanul 'Arab)",
    babNum: 1,
    bina: "Muda'af",
    masdarSamai: "مَتٌّ",
    masdarQiyasi: "مَمَتٌّ",
    sifatMusyabihat: "مَتِيتٌ",
    sifatMusyabihatPlural: {
      mufrod_mudzakkar: "مَتِيتٌ",
      mufrod_muannas: "مَتِيتَةٌ",
      katsroh: "أَمْتَاتٌ",
      muntahal: "-"
    }
  },
  {
    id: "majja",
    root: { fa: "م", ain: "ج", lam: "ج" },
    translation: "Menyemburkan / meludahkan (Kamus Munawwir, Al-Munjid, Lisanul 'Arab)",
    babNum: 1,
    bina: "Muda'af",
    masdarSamai: "مَجٌّ",
    masdarQiyasi: "مَمجٌّ",
    sifatMusyabihat: "مَجِيجٌ",
    sifatMusyabihatPlural: {
      mufrod_mudzakkar: "مَجِيجٌ",
      mufrod_muannas: "مَجِيجَةٌ",
      katsroh: "أَمْجَاجٌ",
      muntahal: "مَمَاجُّ"
    }
  },
  {
    id: "madda",
    root: { fa: "م", ain: "د", lam: "د" },
    translation: "Memanjangkan / membentangkan (Kamus Munawwir, Al-Munjid, Lisanul 'Arab)",
    babNum: 1,
    bina: "Muda'af",
    masdarSamai: "مَدٌّ",
    masdarQiyasi: "مَمَدٌّ",
    sifatMusyabihat: "مَدِيدٌ",
    sifatMusyabihatPlural: {
      mufrod_mudzakkar: "مَدِيدٌ",
      mufrod_muannas: "مَدِيدَةٌ",
      katsroh: "أَمْدَادٌ / مُدُدٌ",
      muntahal: "مَمَادُّ"
    }
  },
  {
    id: "marra",
    root: { fa: "م", ain: "ر", lam: "ر" },
    translation: "Lewat / berlalu / melintas (Kamus Munawwir, Al-Munjid, Lisanul 'Arab)",
    babNum: 1,
    bina: "Muda'af",
    masdarSamai: "مَرٌّ / مُرُورٌ",
    masdarQiyasi: "مَمَرٌّ",
    sifatMusyabihat: "مَرِيرٌ",
    sifatMusyabihatPlural: {
      mufrod_mudzakkar: "مَرِيرٌ",
      mufrod_muannas: "مَرِيرَةٌ",
      katsroh: "أَمْرَارٌ / أَمِرَّةٌ",
      muntahal: "مَمَارُّ"
    }
  },
  {
    id: "mazza",
    root: { fa: "م", ain: "ز", lam: "ز" },
    translation: "Mengulum / menghisap (rasa asam) (Kamus Munawwir, Al-Munjid, Lisanul 'Arab)",
    babNum: 1,
    bina: "Muda'af",
    masdarSamai: "مَزٌّ",
    masdarQiyasi: "مَمَزٌّ",
    sifatMusyabihat: "مَزِيزٌ",
    sifatMusyabihatPlural: {
      mufrod_mudzakkar: "مَزِيزٌ",
      mufrod_muannas: "مَزِيزَةٌ",
      katsroh: "أَمْزَازٌ",
      muntahal: "-"
    }
  },
  {
    id: "massa",
    root: { fa: "م", ain: "س", lam: "س" },
    translation: "Menyentuh / meraba / menimpa musibah (Kamus Munawwir, Al-Munjid, Lisanul 'Arab)",
    babNum: 4,
    bina: "Muda'af",
    masdarSamai: "مَسٌّ / مَسِيسٌ",
    masdarQiyasi: "مَمَسٌّ",
    sifatMusyabihat: "مَسِيسٌ",
    sifatMusyabihatPlural: {
      mufrod_mudzakkar: "مَسِيسٌ",
      mufrod_muannas: "مَسِيسَةٌ",
      katsroh: "أَمْسَاسٌ",
      muntahal: "مَمَاسُّ"
    }
  },
  {
    id: "mashsha",
    root: { fa: "م", ain: "ش", lam: "ش" },
    translation: "Memeras / menyerap / menghisap (Kamus Munawwir, Al-Munjid, Lisanul 'Arab)",
    babNum: 1,
    bina: "Muda'af",
    masdarSamai: "مَشٌّ",
    masdarQiyasi: "مَمَشٌّ",
    sifatMusyabihat: "مَشِيشٌ",
    sifatMusyabihatPlural: {
      mufrod_mudzakkar: "مَشِيشٌ",
      mufrod_muannas: "مَشِيشَةٌ",
      katsroh: "أَمْشَاشٌ",
      muntahal: "-"
    }
  },
  {
    id: "massa_sad",
    root: { fa: "م", ain: "ص", lam: "ص" },
    translation: "Menghisap / menyedot air (Kamus Munawwir, Al-Munjid, Lisanul 'Arab)",
    babNum: 4,
    bina: "Muda'af",
    masdarSamai: "مَصٌّ",
    masdarQiyasi: "مَمَصٌّ",
    sifatMusyabihat: "مَصِيصٌ",
    sifatMusyabihatPlural: {
      mufrod_mudzakkar: "مَصِيصٌ",
      mufrod_muannas: "مَصِيصَةٌ",
      katsroh: "أَمْصَاصٌ",
      muntahal: "-"
    }
  },
  {
    id: "matta_ta",
    root: { fa: "م", ain: "ط", lam: "ط" },
    translation: "Meregangkan / memanjangkan / menarik (Kamus Munawwir, Al-Munjid, Lisanul 'Arab)",
    babNum: 1,
    bina: "Muda'af",
    masdarSamai: "مَطٌّ",
    masdarQiyasi: "مَمَطٌّ",
    sifatMusyabihat: "مَطِيطٌ",
    sifatMusyabihatPlural: {
      mufrod_mudzakkar: "مَطِيطٌ",
      mufrod_muannas: "مَطِيطَةٌ",
      katsroh: "أَمْطَاطٌ",
      muntahal: "-"
    }
  },
  {
    id: "maqqa",
    root: { fa: "م", ain: "ق", lam: "ق" },
    translation: "Membuka mulut lebar / mencintai / tinggi (Kamus Munawwir, Al-Munjid, Lisanul 'Arab)",
    babNum: 1,
    bina: "Muda'af",
    masdarSamai: "مَقٌّ",
    masdarQiyasi: "مَمَقٌّ",
    sifatMusyabihat: "مَقِيقٌ",
    sifatMusyabihatPlural: {
      mufrod_mudzakkar: "مَقِيقٌ",
      mufrod_muannas: "مَقِيقَةٌ",
      katsroh: "أَمْقَاقٌ",
      muntahal: "-"
    }
  }
];

// Map Bab Number to representative Wazan templates
export const WAZAN_TEMPLATES: Record<number, DataWazan> = {
  1: {
    fa: "ف",
    ain: "ع",
    lam: "ل",
    wazanMadhi: "فَعَلَ",
    wazanMudhari: "يَفْعُلُ",
    masdar: "فَعْلًا"
  },
  2: {
    fa: "ف",
    ain: "ع",
    lam: "ل",
    wazanMadhi: "فَعَلَ",
    wazanMudhari: "يَفْعِلُ",
    masdar: "فَعْلًا"
  },
  3: {
    fa: "ف",
    ain: "ع",
    lam: "ل",
    wazanMadhi: "فَعَلَ",
    wazanMudhari: "يَفْعَلُ",
    masdar: "فَعْلًا"
  },
  4: {
    fa: "ف",
    ain: "ع",
    lam: "ل",
    wazanMadhi: "فَعِلَ",
    wazanMudhari: "يَفْعَلُ",
    masdar: "فُعْلَانًا"
  },
  5: {
    fa: "ف",
    ain: "ع",
    lam: "ل",
    wazanMadhi: "فَعُلَ",
    wazanMudhari: "يَفْعُلُ",
    masdar: "فَعَالَةً"
  },
  6: {
    fa: "ف",
    ain: "ع",
    lam: "ل",
    wazanMadhi: "فَعِلَ",
    wazanMudhari: "يَفْعِلُ",
    masdar: "فِعْلَانًا"
  }
};

export const BINA_DEFINITIONS: Record<string, { title: string; desc: string; rule: string }> = {
  Shohih: {
    title: "Bina Shohih (بِنَاء صَحِيح)",
    desc: "Semua huruf pembentuknya sehat (shahih), tidak ganda, tidak mengandung huruf penyakit (Alif, Waw, Ya') dan tidak ada hamzah.",
    rule: "Perubahan harakah standar tanpa ada pelesapan atau penggantian huruf."
  },
  Mitsal: {
    title: "Bina Mitsal (بِنَاء مِثَال)",
    desc: "Huruf pertamanya (Fa Fi'il) berupa huruf penyakit, umumnya Waw ('و') atau Ya' ('ي').",
    rule: "Huruf penyakit di depan biasanya dibuang pada bentuk Fi'il Mudhari jika berharakah kasra (e.g. وَعَدَ -> يَعِدُ)."
  },
  Ajwaf: {
    title: "Bina Ajwaf (بِنَاء أَجْوَف)",
    desc: "Huruf tengahnya ('Ain Fi'il) berupa huruf penyakit, bisa Waw ('و') atau Ya' ('ي').",
    rule: "Huruf tengah dilemahkan menjadi Alif pada Fi'il Madhi. Di Fi'il Madhi Lughowi, huruf penyakit dibuang saat sukun bertemu (mulai dari dhomir Hunna)."
  },
  Naqis: {
    title: "Bina Naqis (بِنَاء نَاقِص)",
    desc: "Huruf terakhirnya (Lam Fi'il) berupa huruf penyakit, bisa Waw ('و') atau Ya' ('ي').",
    rule: "Mengalami peleburan di akhir kata kerja. Akhiran diganti Alif atau Alif Maqshurah tergantung jenis huruf lemah asalnya."
  },
  "Mudho'af": {
    title: "Bina Mudho'af (بِنَاء مُضَاعَف)",
    desc: "Huruf kedua ('Ain Fi'il) dan huruf ketiga (Lam Fi'il) adalah huruf sejenis yang sama.",
    rule: "Dua huruf sejenis digabungkan dan diberi tanda tasydid (Idgham). Pada Fi'il Madhi, tasydid ini diurai/dipecah kembali dari dhomir Hunna sampai Nahnu."
  },
  "Lafif Maqrun": {
    title: "Bina Lafif Maqrun (بِنَاء لَفِيف مَقْرُون)",
    desc: "Akar kata yang memiliki dua huruf penyakit berdampingan, yaitu pada 'Ain Fi'il dan Lam Fi'il (e.g. شَوَى).",
    rule: "Huruf penyakit di akhir (Lam) mengalami I'ilal layaknya Bina Naqis, sedangkan 'Ain Fi'il dipertahankan tetap tampak."
  },
  "Lafif Mafruq": {
    title: "Bina Lafif Mafruq (بِنَاء لَفِيف مَفْرُوق)",
    desc: "Akar kata yang memiliki dua huruf penyakit terpisah, yaitu pada Fa Fi'il dan Lam Fi'il (e.g. وَقَى).",
    rule: "Menggabungkan dua kaidah: pelesapan huruf depan pada Mudhari (Bina Mitsal) dan perubahan huruf akhir pada bentuk madhi/nahi (Bina Naqis)."
  },
  "Mahmuz Fa": {
    title: "Bina Mahmuz Fa (بِنَاء مَهْمُوز الْفَاء)",
    desc: "Akar kata yang huruf pertamanya (Fa Fi'il) berupa huruf Hamzah (e.g. أَكَلَ).",
    rule: "Mengikuti pola tasrif Shohih secara umum. Namun pada bentukan seperti Isim Fail, hamzah bertemu alif melebur menjadi alif mad (e.g. أَكَلَ -> آكِلٌ)."
  },
  "Mahmuz 'Ain": {
    title: "Bina Mahmuz 'Ain (بِنَاء مَهْمُوز الْعَيْن)",
    desc: "Akar kata yang huruf keduanya ('Ain Fi'il) berupa huruf Hamzah (e.g. سَأَلَ).",
    rule: "Tasrif berjalan layaknya Bina Shohih, di mana karakter Hamzah bertahan dan pelafalan 'Ain diucapkan secara tegas/hambat glotal."
  },
  "Mahmuz Lam": {
    title: "Bina Mahmuz Lam (بِنَاء مَهْمُوز اللَّام)",
    desc: "Akar kata yang huruf ketiganya (Lam Fi'il) berupa huruf Hamzah (e.g. قَرَأَ).",
    rule: "Tasrif mengikuti pola Shohih. Penulisan Hamzah disesuaikan dengan harakah pendahulu (di atas alif, ya, waw, atau sebaris sendiri)."
  }
};

export const PRONOUNS_14 = [
  { arabic: "هُوَ", translit: "Huwa", desc: "Dia (1 Laki-laki)" },
  { arabic: "هُمَا", translit: "Huma", desc: "Mereka (2 Laki-laki)" },
  { arabic: "هُمْ", translit: "Hum", desc: "Mereka (>2 Laki-laki)" },
  { arabic: "هِيَ", translit: "Hiya", desc: "Dia (1 Perempuan)" },
  { arabic: "هُمَا", translit: "Huma", desc: "Mereka (2 Perempuan)" },
  { arabic: "هُنَّ", translit: "Hunna", desc: "Mereka (>2 Perempuan)" },
  { arabic: "أَنْتَ", translit: "Anta", desc: "Kamu (1 Laki-laki)" },
  { arabic: "أَنْتُمَا", translit: "Antuma", desc: "Kalian (2 Laki-laki)" },
  { arabic: "أَنْتُمْ", translit: "Antum", desc: "Kalian (>2 Laki-laki)" },
  { arabic: "أَنْتِ", translit: "Anti", desc: "Kamu (1 Perempuan)" },
  { arabic: "أَنْتُمَا", translit: "Antuma", desc: "Kalian (2 Perempuan)" },
  { arabic: "أَنْتُنَّ", translit: "Antunna", desc: "Kalian (>2 Perempuan)" },
  { arabic: "أَنَا", translit: "Ana", desc: "Saya (Laki-laki/Perempuan)" },
  { arabic: "نَحْنُ", translit: "Nahnu", desc: "Kami/Kita" }
];

export const PRONOUNS_6 = [
  { arabic: "أَنْتَ", translit: "Anta", desc: "Kamu (L / Mukhotob)" },
  { arabic: "أَنْتُمَا", translit: "Antuma", desc: "Kalian (2 L / Mukhotobani)" },
  { arabic: "أَنْتُمْ", translit: "Antum", desc: "Kalian (Pria / Mukhotobun)" },
  { arabic: "أَنْتِ", translit: "Anti", desc: "Kamu (P / Mukhotobah)" },
  { arabic: "أَنْتُمَا", translit: "Antuma", desc: "Kalian (2 P / Mukhotobatani)" },
  { arabic: "أَنْتُنَّ", translit: "Antunna", desc: "Kalian (Wanita / Mukhotobna)" }
];

export const PRONOUNS_12 = [
  // Ghoib
  { arabic: "هُوَ", translit: "Huwa", desc: "Dia (1 L / Ghaib)" },
  { arabic: "هُمَا", translit: "Huma", desc: "Mereka (2 L / Ghaibani)" },
  { arabic: "هُمْ", translit: "Hum", desc: "Mereka (L > 2 / Ghaibun)" },
  // Ghoibah
  { arabic: "هِيَ", translit: "Hiya", desc: "Dia (1 P / Ghaibah)" },
  { arabic: "هُمَا", translit: "Huma", desc: "Mereka (2 P / Ghaibata_ni)" },
  { arabic: "هُنَّ", translit: "Hunna", desc: "Mereka (P > 2 / Ghaibat)" },
  // Mukhotob
  { arabic: "أَنْتَ", translit: "Anta", desc: "Kamu (1 L / Mukhotob)" },
  { arabic: "أَنْتُمَا", translit: "Antuma", desc: "Kalian (2 L / Mukhotobani)" },
  { arabic: "أَنْتُمْ", translit: "Antum", desc: "Kalian (L > 2 / Mukhotobun)" },
  // Mukhotobah
  { arabic: "أَنْتِ", translit: "Anti", desc: "Kamu (1 P / Mukhotobah)" },
  { arabic: "أَنْتُمَا", translit: "Antuma", desc: "Kalian (2 P / Mukhotobatani)" },
  { arabic: "أَنْتُنَّ", translit: "Antunna", desc: "Kalian (P > 2 / Mukhotobna)" }
];

export const PRONOUNS_ISIM_6 = [
  { arabic: "مُفْرَد مُذَكَّر", translit: "Singular Maskulin", desc: "Seorang Laki-laki" },
  { arabic: "تَثْنِيَة مُذَكَّر", translit: "Dual Maskulin", desc: "Dua orang Laki-laki" },
  { arabic: "جَمْع مُذَكَّر", translit: "Plural Maskulin", desc: "Banyak Laki-laki" },
  { arabic: "مُفْرَد مُؤَنَّث", translit: "Singular Feminin", desc: "Seorang Perempuan" },
  { arabic: "تَثْنِيَة مُؤَنَّث", translit: "Dual Feminin", desc: "Dua orang Perempuan" },
  { arabic: "جَمْع مُؤَنَّث", translit: "Plural Feminin", desc: "Banyak Perempuan" }
];

export function getVocalizedRoot(fa: string, ain: string, lam: string, babNum: number): string {
  let ainVowel = "َ"; // Fathah by default (Bab 1, 2, 3)
  if (babNum === 4 || babNum === 6) {
    ainVowel = "ِ"; // Kasrah (e.g. عَلِمَ, حَسِبَ)
  } else if (babNum === 5) {
    ainVowel = "ُ"; // Dhommah (e.g. حَسُنَ)
  }
  return `${fa}َ${ain}${ainVowel}${lam}َ`;
}
