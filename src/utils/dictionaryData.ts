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
    reference: "Kamus Al-Munawwir, Lisanul 'Arab, Tajul 'Arus",
    notes: "Rujukan Kamus Klasik: Menurut Lisanul 'Arab, lafadz قَالَ asalnya قَوَلَ (Bab 1). Huruf Waw berharakah fathah jatuh setelah fathah, sehingga di-i'lal menjadi Alif."
  },
  {
    id: "madda",
    root: { fa: "م", ain: "د", lam: "د" },
    translation: "Memperpanjang / Membentangkan",
    babNum: 1,
    bina: "Mudho'af",
    masdarSamai: "مَدٌّ",
    masdarQiyasi: "تَمْدِيدٌ",
    sifatMusyabihat: "مَدِيدٌ",
    reference: "Kamus Al-Munawwir, Tajul 'Arus, Lisanul 'Arab",
    notes: "Rujukan Kamus Klasik: Ditulis dalam Lisanul 'Arab, lafadz مَدَّ asalnya مَدَدَ (Bab 1). Mengalami Idgham mutamatsilain."
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
    reference: "Kamus Al-Munawwir, Kamus Lughotul Arabiyah",
    notes: "Rujukan Kamus Modern: Dalam Lughotul Arabiyah, lafadz وَعَدَ adalah Mitsal Wawi. Waw-nya dibuang pada mudhari (ya'idu) karena jatuh di antara fathah and kasrah."
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
    reference: "Kamus Al-Munawwir, Lisanul 'Arab, Tajul 'Arus",
    notes: "Rujukan Kamus Klasik: Menurut Tajul 'Arus, asalnya دَعَوَ. Lam fi'il berupa Waw berharakah fathah setelah fathah berganti menjadi Alif."
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
    reference: "Kamus Al-Munawwir, Tajul 'Arus, Lisanul 'Arab",
    notes: "Rujukan Kamus Klasik: Ditulis di Tajul 'Arus, lafadz وَقَى asalnya وَقَيَ. Tergabung hukum Mitsal (penumpasan Waw) dan Naqis (penggantian Ya')."
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
    reference: "Kamus Al-Munjid, Lisanul 'Arab, Tajul 'Arus",
    notes: "Rujukan Kamus Klasik: Menurut Munjid, asalnya شَوَيَ. Dua huruf penyakit damping, I'lal hanya berlaku pada Lam Fi'il."
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
    reference: "Kamus Al-Munawwir, Kamus Al-Munjid, Lisanul 'Arab",
    notes: "Rujukan Kamus Klasik: Ditulis di Al-Munawwir, lafadz أَكَلَ adalah Mahmuz Fa yang shahih harakahnya namun memiliki hamzah."
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
    reference: "Lisanul 'Arab, Tajul 'Arus, Kamus Al-Munawwir",
    notes: "Rujukan Kamus Klasik: Lisanul 'Arab mengulas kata سَأَلَ dengan 'Ain fi'il berupa hamzah. Pola tasrifnya mengikuti bina' Shohih."
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
    reference: "Kamus Al-Munawwir, Kamus Lughotul Arabiyah, Tajul 'Arus",
    notes: "Rujukan Kamus Modern: Dalam Lughotul Arabiyah,قَرَأَ memiliki Lam berupa hamzah, mengikuti wazan Bab 3."
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
    reference: "Kamus Al-Munawwir, Kamus Al-Munjid, Tajul 'Arus",
    notes: "Rujukan Kamus Klasik: Menurut Munjid, lafadz بَاعَ asalnya بَيَعَ (Bab 2). Mengalami i'lal pemindahan harakah / pergantian menjadi Alif."
  },
  {
    id: "khafa",
    root: { fa: "خ", ain: "و", lam: "ف" },
    translation: "Takut / Khawatir menghadap",
    babNum: 4,
    bina: "Ajwaf",
    masdarSamai: "خَوْفٌ",
    masdarQiyasi: "مَخَافَةٌ",
    sifatMusyabihat: "خَوِفٌ",
    reference: "Lisanul 'Arab, Kamus Al-Munawwir, Tajul 'Arus",
    notes: "Rujukan Kamus Klasik: Menurut Tajul 'Arus, asal kata asalnya خَوِفَ (Bab 4). I'lal wazan kasrul-fathi yaitu khâfa - yakhâfu."
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
    reference: "Kamus Al-Munjid, Kamus Al-Munawwir, Lisanul 'Arab",
    notes: "Rujukan Kamus Klasik: Ditulis dalam Kamus Al-Munawwir, asalnya رَدَدَ. Idgham dilepas ketika bertemu mutaharrik mutakallim/mukhothob."
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
    reference: "Kamus Al-Munjid, Lisanul 'Arab, Tajul 'Arus",
    notes: "Rujukan Kamus Klasik: Tercatat di Lisanul 'Arab sebagai kata kerja muta'addi yang kehilangan Waw pada mudhari aktif."
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
    reference: "Kamus Al-Munjid, Tajul 'Arus, Lisanul 'Arab",
    notes: "Rujukan Kamus Klasik: Menurut Lisanul 'Arab, asalnya رَمَيَ. Berubah menjadi Alif Maqshurah (َى) karena di-i'lal."
  },
  {
    id: "radhiya",
    root: { fa: "ر", ain: "ض", lam: "ي" },
    translation: "Ridha / Puas / Menerima",
    babNum: 4,
    bina: "Naqis",
    masdarSamai: "رِضْوَانٌ / رِضًى / مَرْضَاةٌ",
    masdarQiyasi: "رُضْوٌ / تَرْضِيَةً",
    sifatMusyabihat: "رَضِىٌّ",
    reference: "Kamus Al-Munawwir, Lisanul 'Arab, Tajul 'Arus",
    notes: "Rujukan Kamus Klasik: Menurut Kamus Al-Munawwir, asalnya رَضِيَ (Bab 4). Merupakan bentuk mu'tal lam (Naqis Ya'i)."
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
    reference: "Kamus Al-Munawwir, Tajul 'Arus",
    notes: "Rujukan Kamus Klasik: Menurut Al-Munawwir, lafadz حَسُنَ adalah bentuk lazim (intransitif) khas Bab 5 yang mengekspresikan karakter atau kualitas intrinsik."
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
    reference: "Kamus Al-Munawwir, Lisanul 'Arab",
    notes: "Rujukan Kamus Klasik: Menurut Lisanul 'Arab, lafadz كَبُرَ (Bab 5) digunakan untuk perubahan kualitas fisik/status kebesaran."
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
    reference: "Kamus Al-Munawwir, Tajul 'Arus",
    notes: "Rujukan Kamus Klasik: Menurut Tajul 'Arus, lafadz كَرُمَ menunjukkan sifat kemuliaan jiwa yang menetap kuat."
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
    reference: "Kamus Al-Munawwir, Kamus Al-Munjid",
    notes: "Rujukan Kamus Klasik: Tercantum di Kamus Al-Munjid, lafadz شَرُفَ adalah fi'il lazim yang pola mudharinya adalah يَشْرُفُ."
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
    reference: "Kamus Al-Munawwir, Lisanul 'Arab",
    notes: "Rujukan Kamus Klasik: Menurut Lisanul 'Arab, lafadz صَغُرَ (Bab 5) mengekspresikan kondisi fisik atau status yang mengecil."
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
    reference: "Kamus Al-Munawwir, Lisanul 'Arab",
    notes: "Analisis: Memiliki lebih dari 2 wazan masdar. Bentuk masdar 'katb' (abstrak), 'kitab' (dokumen/tulisan), dan 'kitabah' (profesi menulis) sering dipertukarkan. Sifat musyabihat mengikuti pola katîb."
  },
  {
    id: "nasara",
    root: { fa: "ن", ain: "ص", lam: "ر" },
    translation: "Menolong / Membantu perjuangan",
    babNum: 1,
    bina: "Shohih",
    masdarSamai: "نَصْرٌ / نُصْرَةٌ / نَصَارَةٌ",
    masdarQiyasi: "مَنْصَرٌ",
    sifatMusyabihat: "نَصِيرٌ / نَاصُورٌ",
    reference: "Kamus Al-Munawwir, Tajul 'Arus",
    notes: "Analisis: Memiliki wazan masdar berlimpah (nasr, nusrah, nasarah) yang bergeser maknanya dari pertolongan umum ke dukungan moral/keluarga. Sifat musyabihat nasîr melambangkan penolong setia."
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
    reference: "Kamus Al-Munawwir, Lisanul 'Arab",
    notes: "Analisis: Lebih dari 2 masdar. 'Dhahab' melambangkan proses pergi, 'dzuhub' hilangnya ingatan/sesuatu, 'madzhab' arah jalan/pemikiran. Sifat musyabihatnya dzahîb."
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
    reference: "Kamus Al-Munawwir, Kamus Al-Munjid",
    notes: "Analisis: 'Julus' adalah duduk dari posisi berbaring, 'jilsah' adalah gaya duduk (masdar nau'), 'majlas' adalah waktu/tempat duduk. Sifat musyabihat jalîs bermakna teman duduk/setia."
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
    reference: "Kamus Al-Munawwir, Lisanul 'Arab",
    notes: "Analisis: Lebih dari 2 masdar. 'Dharb' bermakna pukulan, 'dharaban' bermasdar ketukan berdenyut/detak jantung. Sifat musyabihat dharîb bermakna serupa/selevel."
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
    reference: "Kamus Al-Munawwir, Lisanul 'Arab",
    notes: "Analisis: Memiliki wazan masdar variatif (sam'un, sama'un, masma'un). 'Sam'un' adalah organ/indra, 'Sama'un' proses resepsi bunyi. Sifat musyabihat samî' menunjukkan kesiapan mendengar."
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
    reference: "Kamus Al-Munawwir, Tajul 'Arus",
    notes: "Analisis: Masbarnya bercabang (ilm, ma'lam, ta'lam). 'Ilm' adalah pengetahuan esensial, 'ma'lam' tanda batasan ilmu. Sifat musyabihat 'alîm mewakili kedalaman pengetahuan yang menetap."
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
    reference: "Kamus Al-Munawwir, Lisanul 'Arab",
    notes: "Analisis: Masdar 'fahmun' (pemahaman spontan), 'fahāmah' (kecerdasan mendalam). Sifat musyabihat fahîm/fahim merujuk kepada orang yang sangat peka menangkap maksud ucapan."
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
    reference: "Kamus Al-Munawwir, Lisanul 'Arab",
    notes: "Analisis: Masdar 'khalq' menunjukkan tindakan penciptaan, 'khilqah' mencakup fitrah perangai/postur bawaan lahir. Sifat musyabihat khalîq berarti layak/patut."
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
    reference: "Kamus Al-Munawwir, Kamus Al-Munjid",
    notes: "Analisis: Masdar 'hifzh' (preservasi), 'hifāzh' (perjuangan membela kehormatan). Sifat musyabihat hafîzh melambangkan penjaga tepercaya yang teliti dan konsisten."
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
    reference: "Kamus Al-Munawwir, Lisanul 'Arab",
    notes: "Analisis: Masdar 'dukhũl' berpola lazim, dilaunji 'dikhlah' (maksud tersembunyi/integritas batin). Sifat musyabihat dakhîl bermakna orang asing yang menyusup/menempel."
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
    reference: "Kamus Al-Munawwir, Lisanul 'Arab",
    notes: "Analisis: Lebih dari 2 masdar. 'Khurûj' (keluar secara fisik/revolusi), 'khiraj' (pajak/hasil bumi). Sifat musyabihat kharîj berarti lulusan perguruan tinggi (alumnus)."
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
    reference: "Kamus Al-Munawwir, Tajul 'Arus",
    notes: "Analisis: 'Sabr' adalah penahanan emosional jasamani, 'subũr' adalah pembiasaan diri sangat gigih. Sifat musyabihat sabũr/sabîr adalah ikon penahan beban nan teguh."
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
    reference: "Kamus Al-Munawwir, Kamus Al-Munjid",
    notes: "Analisis: 'Safar' adalah penjelajahan membukakan akhlak, 'sifarah' perwakilan/diplomasi damai. Sifat musyabihat safîr melambangkan duta penjelajah pembawa terang."
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
    reference: "Kamus Al-Munawwir, Lisanul 'Arab",
    notes: "Analisis: Lebih dari 2 masdar. 'Hudhur' (presensi), 'hadharah' (peradaban urban versus peduunan nomad). Sifat musyabihat hadhîr bermakna selalu siap sedia."
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
    reference: "Kamus Al-Munawwir, Tajul 'Arus",
    notes: "Analisis: 'Nadhar' (tatapan mata/teori), 'manzhar' (pemandangan/penampakan visual). Sifat musyabihat nazhîr berarti setara/sebanding (bagaikan bayangan cermin)."
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
    reference: "Kamus Al-Munawwir, Lisanul 'Arab",
    notes: "Analisis: 'Hamd' adalah pujian tulus kesadaran hati, 'mahmadah' kelayakan perbuatan terpuji secara sosial. Sifat musyabihat hamîd mencirikan zat yang terpuji perilakunya secara intrinsik."
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
    reference: "Kamus Al-Munawwir, Lisanul 'Arab",
    notes: "Analisis: Masdar 'syukr' (pujian lisan/batin), 'syukran' ekspresi terima kasih sosial yang lazim. Sifat musyabihat syakũr bermakna amat pandai menyuburkan kebaikan sekecil apa pun."
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
    reference: "Kamus Al-Munawwir, Kamus Al-Munjid",
    notes: "Analisis: 'Thalab' aksi pencarian, 'mathlab' tujuan/objek pencarian mendasar. Sifat musyabihat thalîb berarti penuntut gigih yang tak lelah berikhtiar."
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
    notes: "Analisis: Banyak masdar seperti la'ib, tal'āb (sarana bermain berlebihan), mal'ab (wahana). Sifat musyabihat la'ũb merujuk pada sosok yang dinamis, genit, atau gemar bermain.",
    reference: "Kamus Al-Munawwir, Lisanul 'Arab"
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
    reference: "Kamus Al-Munawwir, Tajul 'Arus",
    notes: "Analisis: Masdar 'hisâb' (perhitungan matematis), 'husbān' (bencana teratur/perhitungan astronomis). Sifat musyabihat hasîb mengindikasikan bendahara andal / keturunan mulia."
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
    reference: "Kamus Al-Munawwir, Lisanul 'Arab",
    notes: "Analisis: Memiliki wazan masdar melimpah. 'Na'mah' nikmat lahiriah tunggal, 'na'iem' kelimpahan spiritual kekal. Sifat musyabihat na'iem melukiskan kehidupan riang gembira."
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
    reference: "Kamus Al-Munawwir, Tajul 'Arus",
    notes: "Analisis: Sebagai bina Mitsal Wawi, huruf Waw dilepaskan pada Mudhari (Yarithu). Masdarnya beragam: wirth, irth, turãth (warisan budaya). Sifat musyabihat warîts adalah penerima mutlak."
  },
  {
    id: "yashara",
    root: { fa: "ي", ain: "س", lam: "ر" },
    translation: "Menjadi mudah / Ringan / Gampang",
    babNum: 2,
    bina: "Mitsal",
    masdarSamai: "يُسْرٌ / مَيْسَرٌ / تَيْسِيرٌ",
    masdarQiyasi: "تَيْسِيرٌ",
    sifatMusyabihat: "يَسِيرٌ / يَاسِرٌ",
    reference: "Kamus Al-Munawwir, Kamus Al-Munjid",
    notes: "Analisis: Mitsal Ya'i, huruf Ya' kokoh bertahan pada Mudhari (Yaysiru). Masdar 'yusr' kebalikan kesulitan. Sifat musyabihat yasîr berarti ringan/gampang."
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
    reference: "Kamus Al-Munawwir, Lisanul 'Arab",
    notes: "Analisis: Bina Naqis Ya'i, lam fi'il berupa Ya'. Masdar 'binyan' struktur kokoh, 'binyah' anatomi fisik. Sifat musyabihat banîyy bermakna kokoh terbangun."
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
    reference: "Kamus Al-Munawwir, Tajul 'Arus",
    notes: "Analisis: Bina Naqis Wawi, lam fi'il berupa Waw. Masdar 'sumuww' ketinggian derajat batiniah. Sifat musyabihat samîyy melambangkan kembaran nama/kedudukan luhur."
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
    reference: "Kamus Al-Munawwir, Lisanul 'Arab",
    notes: "Analisis: Naqis Bab 5 yang sangat jarang. 'Sarw' melambangkan perwira tinggi terpandang, 'sarawah' keanggunan budi pekerti. Sifat musyabihat sarîyy berarti mulia dan murah hati."
  },
  {
    id: "qawiya",
    root: { fa: "ق", ain: "و", lam: "ي" },
    translation: "Menjadi kuat / Perkasa / Kokoh",
    babNum: 4,
    bina: "Lafif Maqrun",
    masdarSamai: "قُوَّةٌ / مَقْوَاةٌ / تَقْوِيَةٌ",
    masdarQiyasi: "تَقْوِيَةٌ",
    sifatMusyabihat: "قَوِيٌّ",
    reference: "Kamus Al-Munawwir, Lisanul 'Arab",
    notes: "Analisis: Lafif Maqrun (Waw dan Ya' berdampingan). Masdar 'quwwah' bermakna energi orisinal yang solid. Sifat musyabihat qawîyy bermakna gagah perkasa secara lahir batin."
  },
  {
    id: "hayiya",
    root: { fa: "ح", ain: "ي", lam: "ي" },
    translation: "Hidup / Malu terhormat / Segar",
    babNum: 4,
    bina: "Lafif Maqrun",
    masdarSamai: "حَيَاةٌ / حَيٌّ / مَحْيًى / حَيَاءٌ",
    masdarQiyasi: "تَحْيِيَةٌ",
    sifatMusyabihat: "حَيٌّ",
    reference: "Kamus Al-Munawwir, Tajul 'Arus",
    notes: "Analisis: Sangat kaya akan wazan masdar. 'Hayāh' eksistensi biologis/ruhani, 'Hayaa' rasa malu positif pelindung akhlak. Sifat musyabihat hayy berarti senantiasa hidup bugar."
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
    reference: "Kamus Al-Munawwir, Tajul 'Arus",
    notes: "Analisis: Lafif Mafruq, Fa penyakit Waw dibuang pada Mudhari (Yafii), Lam penyakit Ya' dilebur. Masdar 'wafã' lambang loyalitas tak lekang oleh masa. Sifat musyabihat wafîyy berarti setia."
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
    reference: "Kamus Al-Munawwir, Kamus Al-Munjid",
    notes: "Analisis: Naqis Ya'i. Masdar 'kifāyah' kecukupan manajerial fungsional yang pas. Sifat musyabihat kafîyy bermakna pencukup andal yang berdiri sendiri."
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
    reference: "Kamus Al-Munawwir, Lisanul 'Arab",
    notes: "Analisis: Mahmuz Fa. 'Akhdz' adalah pengambilan umum, 'ma'khadz' kritik / sudut pandang interpretasi asal usul. Sifat musyabihat akhîdh bermakna tawanan perang."
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
    reference: "Kamus Al-Munawwir, Tajul 'Arus",
    notes: "Analisis: Lebih dari 2 masdar. 'Amr' titah perbuatan, 'imrah' kekuasaan kepemimpinan (otoritas formal). Sifat musyabihat amîr bermakna pemimpin berwibawa."
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
    reference: "Kamus Al-Munawwir, Lisanul 'Arab",
    notes: "Analisis: Masdar 'amal' perbuatan bermotif, 'ma'mal' laboratorium/pabrik (masdar mim/makan). Sifat musyabihat 'amîl berarti agen tepercaya pelaksana misi."
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
    reference: "Kamus Al-Munawwir, Lisanul 'Arab",
    notes: "Analisis: Masdar 'fath' (kemenangan/pembukaan), 'futũh' (singkapan spiritual bernilai tinggi). Sifat musyabihat fatîh bermakna hakim adil pemutus perkara."
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
    reference: "Kamus Al-Munawwir, Lisanul 'Arab",
    notes: "Analisis: Masdar 'man'un' larangan tegas, 'mana'ah' pertahanan fisik murni tak tertembus. Sifat musyabihat manî' berarti tangguh/kebal dari sentuhan luar."
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
    reference: "Kamus Al-Munawwir, Kamus Al-Munjid",
    notes: "Analisis: Bab 5 mulia lazim. Masdar 'bashar' indra penglihatan, 'bashārah' kearifan intuisi mendalam. Sifat musyabihat bashîr melukiskan pengamat jeli nan waspada."
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
    reference: "Kamus Al-Munawwir, Tajul 'Arus",
    notes: "Analisis: Masdar 'zhafar' kejayaan menundukkan musuh. Sifat musyabihat zhafîr melambangkan jawara pemenang yang gigih."
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
    reference: "Kamus Al-Munawwir, Lisanul 'Arab",
    notes: "Analisis: Mahmuz Fa. 'Asaf' bermakna duka cita hebat pemicu tangis. Sifat musyabihat asîf bermakna pribadi berhati lembut yang mudah iba dan menangis."
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
    reference: "Kamus Al-Munawwir, Kamus Al-Munjid",
    notes: "Analisis: Naqis Ya'i. 'Bukã' (dengan mad) tangisan bersuara keras, 'buka' (maqshur) air mata meleleh senyap. Sifat musyabihat bakîyy menunjukkan orang yang gampang menangis."
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
    reference: "Kamus Al-Munawwir, Lisanul 'Arab",
    notes: "Analisis: Naqis Ya'i. Masdar 'masy'un' gerakan langkah santai, 'tamsyã' penjelajahan ekstensif. Sifat musyabihat masyîyy melambangkan pengembara giat berjalan."
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
    reference: "Kamus Al-Munawwir, Tajul 'Arus",
    notes: "Analisis: Naqis Ya'i. 'Jary' kecepatan alir air, 'jiryah' gaya aliran (nau'). Sifat musyabihat jarîyy menunjukkan kurir tangkas atau air bah mengalir bebas."
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
    reference: "Kamus Al-Munawwir, Kamus Al-Munjid",
    notes: "Analisis: Naqis Wawi. Masdar 'ghazw' aksi penaklukan militer, 'maghza' saripati hikmah di balik ekspedisi. Sifat musyabihat ghazîyy bermakna prajurit garis depan."
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
    reference: "Kamus Al-Munawwir, Lisanul 'Arab",
    notes: "Analisis: Naqis Wawi. 'Rajã' penantian penuh harap bercampur optimisme optimis. Sifat musyabihat rajîyy bermakna tumpuan harapan khalayak."
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
    reference: "Kamus Al-Munawwir, Tajul 'Arus",
    notes: "Analisis: Bab 5 lazim. 'Fakhr' kemegahan verbal keturunan, 'fakhãrah' rasa bangganya martabat diri. Sifat musyabihat fakhũr bermakna orang yang sangat bangga atas prestasinya."
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
    reference: "Kamus Al-Munawwir, Lisanul 'Arab",
    notes: "Analisis: 'Dhahik' tawa bersuara meriah. Sifat musyabihat dhahũk/dhahik menunjukkan seorang periang yang berwajah cerah berseri-seri."
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
    reference: "Kamus Al-Munawwir, Tajul 'Arus",
    notes: "Analisis: Bab 5 keanggunan. 'Hilmour' ketenangan batin yang meredam gejolak murka spontan. Sifat musyabihat halîm melambangkan pribadi penyabar penuh ampunan."
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
    reference: "Kamus Al-Munawwir, Tajul 'Arus",
    notes: "Analisis: Bab 5. 'Sa'd' kemujuran nasib spontan, 'sa'adah' kestabilan kebahagiaan hidup material-spiritual. Sifat musyabihat sa'îd merujuk kepada orang yang mujur dunianya."
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
    reference: "Kamus Al-Munawwir, Kamus Al-Munjid",
    notes: "Analisis: Bab 5 ksatria. 'Syaja'ah' keteguhan hati menghadapi maut di medan perang tanpa berkilah. Sifat musyabihat syujã' melambangkan sang pahlawan tangguh."
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
    reference: "Kamus Al-Munawwir, Lisanul 'Arab",
    notes: "Analisis: Bab 5 toleransi. 'Suhulah' karakter gampangnya urusan diselesaikan. Sifat musyabihat sahl berarti tanah datar luas yang gampang dipijak/sikap luwes."
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
    reference: "Kamus Al-Munawwir, Lisanul 'Arab",
    notes: "Analisis: Masdar 'sabh' gerakan meluncur bebas di air/udara, 'sibãhah' olahraga renang fungsional, 'tasbih' pensucian Tuhan. Sifat musyabihat sabîh berarti berkilau indah."
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
    reference: "Kamus Al-Munawwir, Tajul 'Arus",
    notes: "Analisis: Masdar 'sujũd' tindakan rebahan sujud berulang secara ritual, 'sajdah' satu kali sujud tunggal (masdar marrah). Sifat musyabihat sajîd melukiskan ketahanan bersujud khusyuk."
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
    reference: "Kamus Al-Munawwir, Lisanul 'Arab",
    notes: "Analisis: Masdar 'safh' pengaliran bebas (bisa darah / air mata), 'sifah' perzinahan karena menumpahkan air sperma sia-sia. Sifat musyabihat safîh berarti bejana atau lereng gunung datar."
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
    reference: "Kamus Al-Munawwir, Kamus Al-Munjid",
    notes: "Analisis: Masdar 'sukũt' kediaman sukarela bernilai bijak, 'saktah' jeda hening sejenak di tengah pidato / ayat (marrah). Sifat musyabihat sakũt menunjukkan pendiam wibawa."
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
    reference: "Kamus Al-Munawwir, Lisanul 'Arab",
    notes: "Analisis: Masdar 'salãmah' kebugaran fisik-mental sedia kala, 'saläm' ucapan damai pelerem konflik. Sifat musyabihat salîm mencerminkan kesucian hati nan lurus dan sehat walafiat."
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
    reference: "Kamus Al-Munawwir, Tajul 'Arus",
    notes: "Analisis: Masdar 'syurb' aksi minum harfiah, 'masyrab' filsafat/aliran pemikiran orisinal. Sifat musyabihat syarîb menandakan peminum giat atau ahli mencicip rasa minuman."
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
    reference: "Kamus Al-Munawwir, Lisanul 'Arab",
    notes: "Analisis: Masdar 'shidq' keselarasan kata dengan realitas objektif, 'shadaqah' pemberian amal sebagai bukti kejujuran iman batin. Sifat musyabihat shadũq/shadîq berarti sahabat sejati tepercaya."
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
    reference: "Kamus Al-Munawwir, Kamus Al-Munjid",
    notes: "Analisis: Masdar 'sun'un' kreasi maha agung, 'shinã'ah' perindustrian/keahlian manual tingkat tinggi. Sifat musyabihat shanî' bermakna buatan tangan yang presisi atau kebaikan budi."
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
    reference: "Kamus Al-Munawwir, Tajul 'Arus",
    notes: "Analisis: Bab 5 kesucian. 'Thuhror' keadaan bersih dari hadats/najis, 'thahãrah' ritual pensucian fungsional komprehensif. Sifat musyabihat thahũr mencirikan zat pensuci aktif."
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
    reference: "Kamus Al-Munawwir, Lisanul 'Arab",
    notes: "Analisis: Bab 5 kebesaran sejati. 'Izhamr' kebesaran volume fisik, 'azhãmah' kewibawaan agung berdaulat yang mulia. Sifat musyabihat 'azhîm bermakna pribadi mahaperkasa agung."
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
    reference: "Kamus Al-Munawwir, Tajul 'Arus",
    notes: "Analisis: Masdar 'ghafr' penutupan cacat cela duka, 'ghufran' pemberian maaf penguasa agung, 'maghfirah' pembebasan dosa utuh. Sifat musyabihat ghafũr berarti pengampun tiada henti."
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
    reference: "Kamus Al-Munawwir, Kamus Al-Munjid",
    notes: "Analisis: Masdar 'katm' penutupan berita, 'kitmãn' pemeliharaan privasi tinggi dari kebocoran sekitar. Sifat musyabihat katũm berarti penyimpan rahasia yang teguh dipercaya."
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
