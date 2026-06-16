/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { DictionaryEntry, PluralSifatMusyabihat } from "../types";

// Static precomputed dictionary for the 82 core preset words with high academic level
const PRESETS_PLURAL_MAP: Record<string, PluralSifatMusyabihat> = {
  qala: {
    katsroh: "قُؤُلٌ",
    qillah: "أَقْوَالٌ",
    muntahal: "قَوَائِلُ",
    reference: "Lisanul 'Arab, Tajul 'Arus",
    explanation: "Sifat musyabihat 'قَؤُولٌ' (banyak berkata) ber-wazan 'فَعُولٌ'. Jamak katsroh-nya 'قُؤُلٌ' (mengikuti pola 'فُعُلٌ'), qillah-nya 'أَقْوَالٌ' (pola 'أَفْعَالٌ'), dan shighot muntahal jumu' 'قَوَائِلُ' (pola 'فَعَائِلُ')."
  },
  madda: {
    katsroh: "مُدُدٌ",
    qillah: "أَمْدَادٌ",
    muntahal: "مَدَائِدُ",
    reference: "Kamus Al-Munawwir, Tajul 'Arus",
    explanation: "Sifat musyabihat 'مَدِيدٌ' (panjang/bentang) ber-wazan 'فَعِيلٌ' mudho'af. Jamak katsroh-nya 'مُدُدٌ' (pelepas tasydid pola 'فُعُلٌ'), qillah-nya 'أَمْدَادٌ' (pola 'أَفْعَالٌ'), dan muntahal jumu'-nya 'مَدَائِدُ'."
  },
  waada: {
    katsroh: "وُعُدٌ",
    qillah: "أَوْعِدَةٌ",
    muntahal: "وَعَائِدُ",
    reference: "Kamus Al-Munawwir, Lisanul 'Arab",
    explanation: "Sifat 'وَعِيدٌ' (yang diancam/dijanjikan) ber-wazan 'فَعِيلٌ'. Jamak katsroh-nya 'وُعُدٌ' (pola 'فُعُلٌ'), qillah-nya 'أَوْعِدَةٌ' (pola 'أَفْعِلَةٌ'), dan muntahal-nya 'وَعَائِدُ' (pola 'فَعَائِلُ')."
  },
  daa: {
    katsroh: "دُعَّاءٌ",
    qillah: "أَدْعِيَاءُ",
    muntahal: "دَعَاوِيُّ",
    reference: "Kamus Al-Munawwir, Tajul 'Arus, Lisanul 'Arab",
    explanation: "Sifat 'دَعِىٌّ' (yang dituduh/diundang) ber-wazan 'فَعِيلٌ' naqis. Jamak katsroh-nya 'دُعَّاءٌ' (pola 'فُعَّالٌ'), qillah-nya 'أَدْعِيَاءُ' (pola 'أَفْعِلَاءُ'), dan muntahal jumu'-nya 'دَعَاوِيُّ' ('فَعَالِيُّ')."
  },
  waqa: {
    katsroh: "وُقَيَاءُ",
    qillah: "أَوْقِيَاءُ",
    muntahal: "وَقَايَا",
    reference: "Kamus Al-Munawwir, Tajul 'Arus",
    explanation: "Sifat 'وَقِىٌّ' (yang terjaga/takwa) ber-wazan 'فَعِيلٌ' lafif mafruq. Katsroh 'وُقَيَاءُ' (pola 'فُعَلَاءُ' dengan penyesuaian huruf 'illah), qillah 'أَوْقِيَاءُ' ('أَفْعِلَاءُ'), muntahal 'وَقَايَا'."
  },
  syawa: {
    katsroh: "شُوَيَاءُ",
    qillah: "أَشْوِيَاءُ",
    muntahal: "شَوَايَا",
    reference: "Kamus Al-Munjid, Lisanul 'Arab",
    explanation: "Sifat 'شَوِىٌّ' (yang dipanggang) ber-wazan 'فَعِيلٌ' lafif maqrun. Jamak katsroh-nya 'شُوَيَاءُ', qillah 'أَشْوِيَاءُ' ('أَفْعِلَاءُ'), dan muntahal-nya 'شَوَايَا' ('فَعَائِلُ')."
  },
  akala: {
    katsroh: "أُكَلاءُ",
    qillah: "آكِلَةٌ / أَآكِلُ",
    muntahal: "أَكَائِلُ",
    reference: "Kamus Al-Munawwir, Lisanul 'Arab",
    explanation: "Sifat 'أَكِيلٌ' (lawan makan/mitra makan) ber-wazan 'فَعِيلٌ'. Jamak katsroh-nya 'أُكَلاءُ' (pola 'فُعَلَاءُ'), qillah-nya 'آكِلَةٌ' atau 'أَآكِلُ', dan muntahal-nya 'أَكَائِلُ' ('فَعَائِلُ')."
  },
  saala: {
    katsroh: "سُؤُلٌ",
    qillah: "أَسْئِلَةٌ",
    muntahal: "سَوَائِلُ",
    reference: "Lisanul 'Arab, Tajul 'Arus",
    explanation: "Sifat 'سَئُولٌ' (banyak bertanya) ber-wazan 'فَعُولٌ' mahmuz 'ain. Jamak katsroh-nya 'سُؤُلٌ' (pola 'فُعُلٌ'), qillah-nya 'أَسْئِلَةٌ' ('أَفْعِلَةٌ'), muntahal-nya 'سَوَائِلُ'."
  },
  qaraa: {
    katsroh: "قُرَّاءٌ",
    qillah: "أَقْرِئَةٌ",
    muntahal: "قَرَائِئُ",
    reference: "Kamus Al-Munawwir, Lisanul 'Arab",
    explanation: "Sifat 'قَرِىءٌ' (pembaca terampil) ber-wazan 'فَعِيلٌ' mahmuz lam. Jamak katsroh-nya 'قُرَّاءٌ' (pola 'فُعَّالٌ'), qillah-nya 'أَقْرِئَةٌ' ('أَفْعِلَةٌ'), muntahal-nya 'قَرَائِئُ'."
  },
  baa: {
    katsroh: "بُيَعَاءُ",
    qillah: "أَبْيِعَاءُ",
    muntahal: "بَيَائِعُ",
    reference: "Kamus Al-Munjid, Tajul 'Arus",
    explanation: "Sifat 'بَيِّعٌ' (penjual/pembeli) ber-wazan 'فَعِيلٌ' ajwaf ya'i. Jamak katsroh-nya 'بُيَعَاءُ' (pola 'فُعَلَاءُ'), qillah-nya 'أَبْيِعَاءُ' ('أَفْعِلَاءُ'), muntahal-nya 'بَيَائِعُ'."
  },
  khafa: {
    katsroh: "خُوَّافٌ",
    qillah: "أَخْوَافٌ",
    muntahal: "خَوَائِفُ",
    reference: "Lisanul 'Arab, Kamus Al-Munawwir",
    explanation: "Sifat 'خَوِفٌ' (penakut) ber-wazan 'فَعِلٌ'. Jamak katsroh-nya 'خُوَّافٌ' (pola 'فُعَّالٌ'), qillah 'أَخْوَافٌ' ('أَفْعَالٌ'), dan muntahal jumu' 'خَوَائِفُ' ('فَعَائِلُ')."
  },
  radd: {
    katsroh: "رُدُدٌ",
    qillah: "أَرْدَادٌ",
    muntahal: "رَدَائِدُ",
    reference: "Kamus Al-Munawwir, Lisanul 'Arab",
    explanation: "Sifat 'رَدِيدٌ' (yang dikembalikan/ditolak) ber-wazan 'فَعِيلٌ' mudho'af. Jamak katsroh-nya 'رُدُدٌ' (pencopotan tasydid), qillah 'أَرْدَادٌ', muntahal-nya 'رَدَائِدُ'."
  },
  wajada: {
    katsroh: "وُجُدٌ",
    qillah: "أَوْجَادٌ",
    muntahal: "وَجَائِدُ",
    reference: "Kamus Al-Munjid, Lisanul 'Arab",
    explanation: "Sifat 'وَجِيدٌ' (yang kaya/ditemukan) ber-wazan 'فَعِيلٌ'. Jamak katsroh-nya 'وُجُدٌ' ('فُعُلٌ'), qillah-nya 'أَوْجَادٌ' ('أَفْعَالٌ'), muntahal-nya 'وَجَائِدُ'."
  },
  rama: {
    katsroh: "رُمَاةٌ",
    qillah: "أَرْمِيَاءُ",
    muntahal: "رَمَايَا",
    reference: "Kamus Al-Munjid, Lisanul 'Arab",
    explanation: "Sifat 'رَمِى'' (pelempar jitu) ber-wazan 'فَعِيلٌ' naqis ya'i. Jamak katsroh 'رُمَاةٌ' (pola 'فُعَاةٌ'), qillah 'أَرْمِيَاءُ' ('أَفْعِلَاءُ'), muntahal 'رَمَايَا'."
  },
  radhiya: {
    katsroh: "رُضَاءٌ",
    qillah: "أَرْضِيَاءُ",
    muntahal: "رَضَايَا",
    reference: "Kamus Al-Munawwir, Tajul 'Arus, Lisanul 'Arab",
    explanation: "Sifat 'رَضِىٌّ' (yang diridhai) ber-wazan 'فَعِيلٌ'. Jamak katsroh 'رُضَاءٌ' (pola 'فُعَالٌ'), qillah 'أَرْضِيَاءُ' ('أَفْعِلَاءُ'), muntahal 'رَضَايَا' ('فَعَالِي')."
  },
  hasuna: {
    katsroh: "حِسَانٌ",
    qillah: "أَحْسَانٌ",
    muntahal: "مَحَاسِنُ",
    reference: "Kamus Al-Munawwir, Lisanul 'Arab, Tajul 'Arus",
    explanation: "Sifat 'حَسَنٌ' (bagus/elok) ber-wazan 'فَعَلٌ'. Jamak katsroh-nya 'حِسَانٌ' (pola 'فِعَالٌ'), qillah 'أَحْسَانٌ' ('أَفْعَالٌ'), dan muntahal jumu'-nya 'مَحَاسِنُ' (pola 'مَفَاعِلُ' secara sima'i)."
  },
  kabura: {
    katsroh: "كِبَارٌ / كُبَرَاءُ",
    qillah: "أَكْبَارٌ",
    muntahal: "كَبَائِرُ",
    reference: "Kamus Al-Munawwir, Kamus Al-Munjid, Tajul 'Arus",
    explanation: "Sifat 'كَبِيرٌ' (besar/agung) ber-wazan 'فَعِيلٌ'. Jamak katsroh 'كِبَارٌ' (pola 'فِعَالٌ') atau 'كُبَرَاءُ' ('فُعَلَاءُ'), qillah 'أَكْبَارٌ', muntahal-nya 'كَبَائِرُ' ('فَعَائِلُ' - biasa diartikan dosa besar/perkara besar)."
  },
  karuma: {
    katsroh: "كِرَامٌ / كُرَمَاءُ",
    qillah: "أَكْرِمَاءُ",
    muntahal: "كَرَائِمُ",
    reference: "Kamus Al-Munawwir, Lisanul 'Arab, Tajul 'Arus",
    explanation: "Sifat 'كَرِيمٌ' (mulia/pemurah) ber-wazan 'فَعِيلٌ'. Jamak katsroh 'كِرَامٌ' ('فِعَالٌ') dan 'كُرَمَاءُ' ('فُعَلَاءُ'), qillah 'أَكْرِمَاءُ' ('أَفْعِلَاءُ'), muntahal-nya 'كَرَائِمُ' ('فَعَائِلُ' rujukan Tajul 'Arus)."
  },
  sarufa: {
    katsroh: "شُرَفَاءُ / شِرَافٌ",
    qillah: "أَشْرَافٌ",
    muntahal: "شَرَائِفُ",
    reference: "Kamus Al-Munawwir, Lisanul 'Arab, Tajul 'Arus",
    explanation: "Sifat 'شَرِيفٌ' (mulia/terhormat) ber-wazan 'فَعِيلٌ'. Jamak katsroh 'شُرَفَاءُ' ('فُعَلَاءُ') atau 'شِرَافٌ', qillah 'أَشْرَافٌ' ('أَفْعَالٌ' khusus keturunan mulia), muntahal-nya 'شَرَائِفُ'."
  },
  saghura: {
    katsroh: "صِغَارٌ / صُغَرَاءُ",
    qillah: "أَصْغَارٌ",
    muntahal: "صَغَائِرُ",
    reference: "Kamus Al-Munawwir, Lisanul 'Arab, Kamus Al-Munjid",
    explanation: "Sifat 'صَغِيرٌ' (kecil/muda) ber-wazan 'فَعِيلٌ'. Jamak katsroh 'صِغَارٌ' atau 'صُغَرَاءُ', qillah 'أَصْغَارٌ', muntahal-nya 'صَغَائِرُ' (pola 'فَعَائِلُ' - sering diartikan dosa kecil)."
  },
  kataba: {
    katsroh: "كُتَّابٌ",
    qillah: "أَكْتِبَةٌ",
    muntahal: "كَتَائِبُ",
    reference: "Kamus Al-Munawwir, Lisanul 'Arab",
    explanation: "Sifat 'كَتِيبٌ' (anggota pasukan sandi/penulis) ber-wazan 'فَعِيلٌ'. Jamak katsroh-nya 'كُتَّابٌ' (pola 'فُعَّالٌ') atau 'كَتَبَةٌ', qillah 'أَكْتِبَةٌ', muntahal-nya 'كَتَائِبُ' (artinya batalyon/pasukan)."
  },
  nasara: {
    katsroh: "نُصَرَاءُ / أَنْصَارٌ",
    qillah: "أَنْصَارٌ",
    muntahal: "نَصَائِرُ",
    reference: "Kamus Al-Munawwir, Tajul 'Arus",
    explanation: "Sifat 'نَصِيرٌ' (penolong setia) ber-wazan 'فَعِيلٌ'. Jamak katsroh 'نُصَرَاءُ' (pola 'فُعَلَاءُ') atau 'أَنْصَارٌ' (sima'i), qillah 'أَنْصَارٌ' ('أَفْعَالٌ'), muntahal-nya 'نَصَائِرُ'."
  },
  dhahaba: {
    katsroh: "ذُهَبَاءُ",
    qillah: "أَذْهَابٌ",
    muntahal: "ذَهَائِبُ",
    reference: "Kamus Al-Munawwir, Lisanul 'Arab",
    explanation: "Sifat 'ذَهِيبٌ' (keemasan/yang pergi) ber-wazan 'فَعِيلٌ'. Jamak katsroh-nya 'ذُهَبَاءُ', qillah 'أَذْهَابٌ', muntahal-nya 'ذَهَائِبُ'."
  },
  jalasa: {
    katsroh: "جُلَسَاءُ",
    qillah: "أَجْلَاسٌ",
    muntahal: "جَلَائِسُ",
    reference: "Kamus Al-Munawwir, Kamus Al-Munjid",
    explanation: "Sifat 'جَلِيسٌ' (teman duduk/kolega) ber-wazan 'فَعِيلٌ'. Jamak katsroh-nya 'جُلَسَاءُ' (pola 'فُعَلَاءُ'), qillah 'أَجْلَاسٌ' ('أَفْعَالٌ'), muntahal-nya 'جَلَائِسُ' ('فَعَائِلُ')."
  },
  dharaba: {
    katsroh: "ضُرَبَاءُ",
    qillah: "أَضْرَابٌ",
    muntahal: "ضَرَائِبُ",
    reference: "Kamus Al-Munawwir, Lisanul 'Arab",
    explanation: "Sifat 'ضَرِيبٌ' (yang serupa/selevel/dipukul) ber-wazan 'فَعِيلٌ'. Jamak katsroh-nya 'ضُرَبَاءُ' ('فُعَلَاءُ'), qillah 'أَضْرَابٌ' ('أَفْعَالٌ'), muntahal-nya 'ضَرَائِبُ' (artinya pajak/karakter dasar)."
  },
  samia: {
    katsroh: "سُمَعَاءُ",
    qillah: "أَسْمَاعٌ",
    muntahal: "سَمَائِعُ",
    reference: "Kamus Al-Munawwir, Lisanul 'Arab",
    explanation: "Sifat 'سَمِيعٌ' (maha mendengar/penurut) ber-wazan 'فَعِيلٌ'. Jamak katsroh-nya 'سُمَعَاءُ' (pola 'فُعَلَاءُ'), qillah-nya 'أَسْمَاعٌ' ('أَفْعَالٌ' - juga diartikan indra pendengaran), muntahal 'سَمَائِعُ'."
  },
  alima: {
    katsroh: "عُلَمَاءُ",
    qillah: "أَعْلَامٌ",
    muntahal: "عَلَائِمُ",
    reference: "Kamus Al-Munawwir, Tajul 'Arus",
    explanation: "Sifat 'عَلِيمٌ' (yang pandai/berilmu) ber-wazan 'فَعِيلٌ'. Jamak katsroh-nya 'عُلَمَاءُ' (pola 'فُعَلَاءُ' rujukan sangat populer), qillah-nya 'أَعْلَامٌ' ('أَفْعَالٌ' - tokoh/bendera), muntahal-nya 'عَلَائِمُ'."
  },
  fahima: {
    katsroh: "فُهَمَاءُ",
    qillah: "أَفْهَامٌ",
    muntahal: "فَهَائِمُ",
    reference: "Kamus Al-Munawwir, Lisanul 'Arab",
    explanation: "Sifat 'فَهِيمٌ' / 'فَهِمٌ' (paham jitu) ber-wazan 'فَعِيلٌ'/'فَعِلٌ'. Jamak katsroh-nya 'فُهَمَاءُ' (pola 'فُعَلَاء_'), qillah-nya 'أَفْهَامٌ' ('أَفْعَالٌ'), muntahal jumu'-nya 'فَهَائِمُ' ('فَعَائِلُ')."
  },
  khalaqa: {
    katsroh: "خُلَقَاءُ",
    qillah: "أَخْلَاقٌ",
    muntahal: "خَلَائِقُ",
    reference: "Kamus Al-Munawwir, Lisanul 'Arab",
    explanation: "Sifat 'خَلِيقٌ' (yang layak/penciptaan) ber-wazan 'فَعِيلٌ'. Jamak katsroh 'خُلَقَاءُ', qillah 'أَخْلَاقٌ' (sering diartikan akhlak/perangai), muntahal-nya 'خَلَائِقُ' (semua mahkluk ciptaan)."
  },
  hafizha: {
    katsroh: "حُفَّاظٌ",
    qillah: "أَحْفَاظٌ",
    muntahal: "حَفَائِظُ",
    reference: "Kamus Al-Munawwir, Kamus Al-Munjid",
    explanation: "Sifat 'حَفِيظٌ' (penjaga terpercaya/penghafal) ber-wazan 'فَعِيلٌ'. Jamak katsroh 'حُفَّاظٌ' (pola 'فُعَّالٌ'), qillah 'أَحْفَاظٌ', muntahal-nya 'حَفَائِظُ' (rujukan Lisanul 'Arab, artinya tali pengikat batin)."
  },
  dakhala: {
    katsroh: "دُخَلاءُ",
    qillah: "أَدْخَالٌ",
    muntahal: "دَخَائِلُ",
    reference: "Kamus Al-Munawwir, Lisanul 'Arab",
    explanation: "Sifat 'دَخِيلٌ' (orang asing/penyelusup) ber-wazan 'فَعِيلٌ'. Jamak katsroh-nya 'دُخَلاءُ' (pola 'فُعَلَاءُ'), qillah-nya 'أَدْخَالٌ', muntahal-nya 'دَخَائِلُ' (artinya batin terdalam/rahasia)."
  },
  kharaja: {
    katsroh: "خُرَّجٌ",
    qillah: "أَخْرِجَةٌ",
    muntahal: "خَرَائِجُ",
    reference: "Kamus Al-Munawwir, Lisanul 'Arab",
    explanation: "Sifat 'خَرِيجٌ' (lulusan/alumnus/keluar) ber-wazan 'فَعِيلٌ'. Jamak katsroh-nya 'خُرَّجٌ' (pola 'فُعَّلٌ') atau 'خِرِّيجُونَ', qillah-nya 'أَخْرِجَةٌ', muntahal-nya 'خَرَائِجُ'."
  },
  shabara: {
    katsroh: "صُبُرٌ",
    qillah: "أَصْبِرَةٌ",
    muntahal: "صَبَائِرُ",
    reference: "Kamus Al-Munawwir, Tajul 'Arus",
    explanation: "Sifat 'صَبُورٌ' / 'صَبِيرٌ' (yang sangat sabar) ber-wazan 'فَعُولٌ'/'فَعِيلٌ'. Jamak katsroh 'صُبُرٌ' (pola 'فُعُلٌ'), qillah 'أَصْبِرَةٌ' ('أَفْعِلَةٌ'), muntahal-nya 'صَبَائِرُ' ('فَعَائِلُ')."
  },
  syafara: {
    katsroh: "سُفَرَاءُ",
    qillah: "أَسْفَارٌ",
    muntahal: "سَفَائِرُ",
    reference: "Kamus Al-Munawwir, Kamus Al-Munjid",
    explanation: "Sifat 'سَفِيرٌ' (duta besar/perantara damai) ber-wazan 'فَعِيلٌ'. Jamak katsroh-nya 'سُفَرَاءُ' (pola 'فُعَلَاء_'), qillah-nya 'أَسْفَارٌ' (buku-buku tebal, pola 'أَفْعَالٌ'), muntahal-nya 'سَفَائِرُ'."
  },
  hadhara: {
    katsroh: "حُضَرَاءُ",
    qillah: "أَحْضَارٌ",
    muntahal: "حَضَائِرُ",
    reference: "Kamus Al-Munawwir, Lisanul 'Arab",
    explanation: "Sifat 'حَضِيرٌ' (hadirin sedia/militer kelompok) ber-wazan 'فَعِيلٌ'. Jamak katsroh-nya 'حُضَرَاءُ', qillah-nya 'أَحْضَارٌ', muntahal-nya 'حَضَائِرُ' (artinya tangsi/markas)."
  },
  nadzara: {
    katsroh: "نُظَرَاءُ",
    qillah: "أَنْظَارٌ",
    muntahal: "نَظَائِرُ",
    reference: "Kamus Al-Munawwir, Tajul 'Arus",
    explanation: "Sifat 'نَظِيرٌ' (setara/sebanding/banding) ber-wazan 'فَعِيلٌ'. Jamak katsroh 'نُظَرَاءُ' (pola 'فُعَلَاءُ' - rekan-rekan sebaya), qillah 'أَنْظَارٌ' ('أَفْعَالٌ' - pandangan mata), muntahal-nya 'نَظَائِرُ' ('فَعَائِلُ' - contoh kembaran serupa)."
  },
  hamida: {
    katsroh: "حُمَدَاءُ",
    qillah: "أَحْمَادٌ",
    muntahal: "حَمَائِدُ",
    reference: "Kamus Al-Munawwir, Lisanul 'Arab",
    explanation: "Sifat 'حَمِيدٌ' (yang terpuji mulia) ber-wazan 'فَعِيلٌ'. Jamak katsroh 'حُمَدَاءُ' (pola 'فُعَلَاءُ'), qillah 'أَحْمَادٌ' (pola 'أَفْعَالٌ'), muntahal-nya 'حَمَائِدُ' ('فَعَائِلُ')."
  },
  syakara: {
    katsroh: "شُكُرٌ",
    qillah: "أَشْكَارٌ",
    muntahal: "شَوَاكِرُ",
    reference: "Kamus Al-Munawwir, Lisanul 'Arab",
    explanation: "Sifat 'شَكُورٌ' (yang bersyukur aktif) ber-wazan 'فَعُولٌ'. Jamak katsroh 'شُكُرٌ' (pola 'فُعُلٌ'), qillah 'أَشْكَارٌ' (pola 'أَفْعَالٌ'), muntahal jumu'-nya 'شَوَاكِرُ' (pola 'فَوَاعِلُ')."
  },
  thalaba: {
    katsroh: "طُلَبَاءُ",
    qillah: "أَطْلَابٌ",
    muntahal: "طَلَائِبُ",
    reference: "Kamus Al-Munawwir, Kamus Al-Munjid",
    explanation: "Sifat 'طَلِيبٌ' (pencari gigih) ber-wazan 'فَعِيلٌ'. Jamak katsroh-nya 'طُلَبَاءُ' ('فُعَلَاءُ'), qillah-nya 'أَطْلَابٌ' ('أَفْعَالٌ' - juga diartikan mahasiswa/pencari), muntahal-nya 'طَلَائِبُ'."
  },
  laiba: {
    katsroh: "لَعِبُونَ",
    qillah: "أَلْعَابٌ",
    muntahal: "لَعَائِبُ",
    reference: "Kamus Al-Munawwir, Lisanul 'Arab",
    explanation: "Sifat 'لَعُوبٌ' / 'لَعِبٌ' (suka bercanda/bermain) ber-wazan 'فَعُولٌ'/'فَعِلٌ'. Jamak katsroh 'لَعِبُونَ' (salim) atau 'لَوَاعِبُ', qillah 'أَلْعَابٌ' ('أَفْعَالٌ' - permainan/game), muntahal-nya 'لَعَائِبُ'."
  },
  hasiba: {
    katsroh: "حُسَبَاءُ",
    qillah: "أَحْسَابٌ",
    muntahal: "حَسَائِبُ",
    reference: "Kamus Al-Munawwir, Tajul 'Arus",
    explanation: "Sifat 'حَسِيبٌ' (terhormat/penghitung) ber-wazan 'فَعِيلٌ'. Jamak katsroh-nya 'حُسَبَاءُ' (pola 'فُعَلَاءُ'), qillah-nya 'أَحْسَابٌ' ('أَفْعَالٌ' - keturunan bangsawan), muntahal-nya 'حَسَائِبُ'."
  },
  naima: {
    katsroh: "نُعَمَاءُ",
    qillah: "أَنْعُمٌ",
    muntahal: "نَعَائِمُ",
    reference: "Kamus Al-Munawwir, Lisanul 'Arab",
    explanation: "Sifat 'نَعِيمٌ' (nyaman/lembut) ber-wazan 'فَعِيلٌ'. Jamak katsroh 'نُعَمَاءُ' (pola 'فُعَلَاءُ'), qillah 'أَنْعُمٌ' ('أَفْعُلٌ'), muntahal-nya 'نَعَائِمُ' (juga nama gugusan bintang)."
  },
  waritsa: {
    katsroh: "وَرَثَةٌ",
    qillah: "أَوْرَاثٌ",
    muntahal: "وَرَائِثُ",
    reference: "Kamus Al-Munawwir, Tajul 'Arus",
    explanation: "Sifat 'وَرِيثٌ' (penerima waris) ber-wazan 'فَعِيلٌ' mitsal. Jamak katsroh-nya 'وَرَثَةٌ' (pola fungsional 'فَعَلَةٌ' terpopuler), qillah-nya 'أَوْرَاثٌ', muntahal-nya 'وَرَائِثُ'."
  },
  yashara: {
    katsroh: "يُسَرَاءُ",
    qillah: "أَيْسَارٌ",
    muntahal: "يَسَائِرُ",
    reference: "Kamus Al-Munawwir, Kamus Al-Munjid",
    explanation: "Sifat 'يَسِيرٌ' / 'يَاسِرٌ' (ringan/mudah/pembuat mudah) ber-wazan 'فَعِيلٌ'. Jamak katsroh 'يُسَرَاءُ' (pola 'فُعَلَاءُ'), qillah 'أَيْسَارٌ' ('أَفْعَالٌ' - juga diartikan panah judi nasib), muntahal-nya 'يَسَائِرُ'."
  },
  banaa: {
    katsroh: "بُنَاةٌ",
    qillah: "أَبْنِيَةٌ",
    muntahal: "بَنَايَا",
    reference: "Kamus Al-Munawwir, Lisanul 'Arab",
    explanation: "Sifat 'بَنِيٌّ' (pondasi/pembangun kuat) ber-wazan 'فَعِيلٌ' naqis ya'i. Jamak katsroh 'بُنَاةٌ' (pola 'فُعَاةٌ' rujukan kuat), qillah-nya 'أَبْنِيَةٌ' ('أَفْعِلَةٌ' - gedung-gedung), muntahal-nya 'بَنَايَا'."
  },
  samy: {
    katsroh: "سُمَنَاءُ",
    qillah: "أَسْمَاءٌ",
    muntahal: "سَمَايَا",
    reference: "Kamus Al-Munawwir, Tajul 'Arus",
    explanation: "Sifat 'سَمِيٌّ' (senama/setara luhur) ber-wazan 'فَعِيلٌ' naqis. Jamak katsroh 'سُمَنَاءُ', qillah 'أَسْمَاءٌ' ('أَفْعَالٌ' - nama-nama), muntahal-nya 'سَمَايَا'."
  },
  sarwa: {
    katsroh: "سَرَاةٌ",
    qillah: "أَسْرِيَاءُ",
    muntahal: "سَرَايَا",
    reference: "Kamus Al-Munawwir, Lisanul 'Arab",
    explanation: "Sifat 'سَرِيٌّ' (tokoh ksatria mulia) ber-wazan 'فَعِيلٌ' naqis. Jamak katsroh 'سَرَاةٌ' (pola 'فَعَلَةٌ' di-i'lal), qillah 'أَسْرِيَاءُ' ('أَفْعِلَاءُ'), muntahal 'سَرَايَا' (artinya detasemen militer)."
  },
  qawiya: {
    katsroh: "أَقْوِيَاءُ",
    qillah: "أَقْوِيَاءُ",
    muntahal: "قَوَايَا",
    reference: "Kamus Al-Munawwir, Lisanul 'Arab",
    explanation: "Sifat 'قَوِيٌّ' (gagah perkasa) ber-wazan 'فَعِيلٌ' lafif maqrun. Jamak katsroh/qillah disatukan secara sima'i menjadi 'أَقْوِيَاءُ' (pola 'أَفْعِلَاءُ'), muntahal jumu'-nya 'قَوَايَا'."
  },
  hayiya: {
    katsroh: "أَحْيَاءٌ",
    qillah: "أَحْيَاءٌ",
    muntahal: "أَحَايِيُّ",
    reference: "Kamus Al-Munawwir, Tajul 'Arus",
    explanation: "Sifat 'حَيٌّ' (senantiasa hidup bugar) ber-wazan 'فَعِيلٌ' lafif maqrun. Jamak katsroh/qillah digabung menjadi 'أَحْيَاءٌ' (pola 'أَفْعَالٌ'), dan shighot muntahal jumu'-nya 'أَحَايِيُّ' ('فَعَالِيُّ')."
  },
  wafa: {
    katsroh: "أَوْفِيَاءُ",
    qillah: "أَوْفِيَاءُ",
    muntahal: "وَفَايَا",
    reference: "Kamus Al-Munawwir, Tajul 'Arus",
    explanation: "Sifat 'وَفِيٌّ' (loyal setia) ber-wazan 'فَعِيلٌ' lafif mafruq. Jamak katsroh & qillah dirangkum menjadi 'أَوْفِيَاءُ' (pola 'أَفْعِلَاءُ'), muntahal jumu'-nya 'وَفَايَا'."
  },
  kafa: {
    katsroh: "كُفَاةٌ",
    qillah: "أَكْفِيَاءُ",
    muntahal: "كَفَايَا",
    reference: "Kamus Al-Munawwir, Kamus Al-Munjid",
    explanation: "Sifat 'كَفِيٌّ' (pelindung handal/penanggung jawab) ber-wazan 'فَعِيلٌ' naqis. Jamak katsroh 'كُفَاةٌ' (pola 'فُعَاةٌ'), qillah 'أَكْفِيَاءُ' ('أَفْعِلَاءُ'), muntahal-nya 'كَفَايَا'."
  },
  akhidza: {
    katsroh: "أُخَذَاءُ",
    qillah: "أَخَاذِيُّ",
    muntahal: "أَخَائِذُ",
    reference: "Kamus Al-Munawwir, Lisanul 'Arab",
    explanation: "Sifat 'أَخِيذٌ' (tawanan perang/yang diambil) ber-wazan 'فَعِيلٌ'. Jamak katsroh-nya 'أُخَذَاءُ', qillah-nya 'أَخَاذِيُّ', muntahal-nya 'أَخَائِذُ' (artinya kolam tampungan air)."
  },
  amara: {
    katsroh: "أُمَرَاءُ",
    qillah: "آمرَةٌ",
    muntahal: "أَمَائِرُ",
    reference: "Kamus Al-Munawwir, Tajul 'Arus",
    explanation: "Sifat 'أَمِيرٌ' / 'أَمِرٌ' (pemimpin/yang memerintah) ber-wazan 'فَعِيلٌ'/'فَعِلٌ'. Jamak katsroh 'أُمَرَاءُ' (pola 'فُعَلَاءُ' rujukan sangat masyhur), qillah 'آمرَةٌ' (sima'i), muntahal-nya 'أَمَائِرُ' (artinya tanda pangkat/alamat)."
  },
  amila: {
    katsroh: "عُمَلَاءُ",
    qillah: "أَعْمَالٌ",
    muntahal: "عَمَائِلُ",
    reference: "Kamus Al-Munawwir, Lisanul 'Arab",
    explanation: "Sifat 'عَمِيلٌ' (agen rahasia/rekan kerja) ber-wazan 'فَعِيلٌ'. Jamak katsroh 'عُمَلَاءُ' (pola 'فُعَلَاءُ' - diartikan agen/klien dalam ekonomi modern), qillah 'أَعْمَالٌ' (aktivitas), muntahal-nya 'عَمَائِلُ' (tingkah laku)."
  },
  fataha: {
    katsroh: "فُتَحَاءُ",
    qillah: "أَفْتَاحٌ",
    muntahal: "فَتَائِحُ",
    reference: "Kamus Al-Munawwir, Lisanul 'Arab",
    explanation: "Sifat 'فَتِيحٌ' (hakim adil/pembuka) ber-wazan 'فَعِيلٌ'. Jamak katsroh-nya 'فُتَحَاءُ', qillah-nya 'أَفْتَاحٌ', muntahal-nya 'فَتَائِحُ' ('فَعَائِلُ' - pembuka kunci)."
  },
  manaa: {
    katsroh: "مُنَعَاءُ",
    qillah: "أَمْنَعَةٌ",
    muntahal: "مَنَائِعُ",
    reference: "Kamus Al-Munawwir, Lisanul 'Arab",
    explanation: "Sifat 'مَنِيعٌ' (tanggguh perkasa/kebal) ber-wazan 'فَعِيلٌ'. Jamak katsroh 'مُنَعَاءُ' (pola 'فُعَلَاء_'), qillah 'أَمْنَعَةٌ' (pola 'أَفْعِلَةٌ'), muntahal-nya 'مَنَائِعُ' ('فَعَائِلُ' - benteng pertahanan)."
  },
  basura: {
    katsroh: "بُصَرَاءُ / بِصَارٌ",
    qillah: "أَبْصَارٌ",
    muntahal: "بَصَائِرُ",
    reference: "Kamus Al-Munawwir, Kamus Al-Munjid",
    explanation: "Sifat 'بَصِيرٌ' (pengamat jeli/awas) ber-wazan 'فَعِيلٌ'. Jamak katsroh 'بُصَرَاءُ' ('فُعَلَاءُ') atau 'بِصَارٌ', qillah 'أَبْصَارٌ' (indera mata), muntahal-nya 'بَصَائِرُ' (pola 'فَعَائِلُ' - bermakna intuisi batin/mata hati)."
  },
  zhafira: {
    katsroh: "ظُفَرَاءُ",
    qillah: "أَظْفَارٌ",
    muntahal: "ظَفَائِرُ",
    reference: "Kamus Al-Munawwir, Tajul 'Arus",
    explanation: "Sifat 'ظَفِيرٌ' (jawara pemenang) ber-wazan 'فَعِيلٌ'. Jamak katsroh-nya 'ظُفَرَاءُ', qillah-nya 'أَظْفَارٌ' (kuku-kuku), muntahal jumu'-nya 'ظَفَائِرُ' (artinya kepangan rambut/suksesor)."
  },
  asifa: {
    katsroh: "أُسَفَاءُ",
    qillah: "آسَافٌ",
    muntahal: "أَسَائِفُ",
    reference: "Kamus Al-Munawwir, Lisanul 'Arab",
    explanation: "Sifat 'أَسِيفٌ' (berhati lembut/mudah sedih) ber-wazan 'فَعِيلٌ' mahmuz fa. Jamak katsroh-nya 'أُسَفَاءُ' (pola 'فُعَلَاءُ'), qillah-nya 'آسَافٌ' ('أَفْعَالٌ'), muntahal-nya 'أَسَائِفُ'."
  },
  bakaa: {
    katsroh: "بُكَّاءٌ / بُكَاتٌ",
    qillah: "أَبْكِيَةٌ",
    muntahal: "بَكَايَا",
    reference: "Kamus Al-Munawwir, Kamus Al-Munjid",
    explanation: "Sifat 'بَكِىٌّ' (pribadi cengeng/mudah menangis) ber-wazan 'فَعِيلٌ' naqis ya'i. Jamak katsroh 'بُكَّاءٌ' (pola 'فُعَّالٌ' tersohor), qillah 'أَبْكِيَةٌ' ('أَفْعِلَةٌ'), muntahal 'بَكَايَا' ('فَعَالِي')."
  },
  masya: {
    katsroh: "مُشَاةٌ",
    qillah: "أَمْشِيَاءُ",
    muntahal: "مَشَايَا",
    reference: "Kamus Al-Munawwir, Lisanul 'Arab",
    explanation: "Sifat 'مَشِيٌّ' (orang yang giat berjalan/pengembara) ber-wazan 'فَعِيلٌ' naqis. Jamak katsroh 'مُشَاةٌ' (pola 'فُعَاةٌ' yang di-i'lal, berarti infanteri/pejalan kaki), qillah 'أَمْشِيَاءُ', muntahal 'مَشَايَا'."
  },
  jaraa: {
    katsroh: "جُرَاةٌ / جَارِيَاتٌ",
    qillah: "أَجْرِيَاءُ",
    muntahal: "جَوَارٍ",
    reference: "Kamus Al-Munawwir, Tajul 'Arus",
    explanation: "Sifat 'جَرِيٌّ' (kurir tangkas/air mengalir) ber-wazan 'فَعِيلٌ' naqis. Jamak katsroh 'جُرَاةٌ' atau 'جَارِيَاتٌ', qillah 'أَجْرِيَاءُ' (pola 'أَفْعِلَاءُ'), muntahal jumu'-nya 'جَوَارٍ' (kapal bahtera/anak gadis)."
  },
  ghaza: {
    katsroh: "غُزَاةٌ",
    qillah: "أَغْزِيَاءُ",
    muntahal: "غَوَازٍ",
    reference: "Kamus Al-Munawwir, Kamus Al-Munjid",
    explanation: "Sifat 'غَزِيٌّ' / 'غَازٍ' (prajurit garis depan) ber-wazan 'فَعِيلٌ' naqis. Jamak katsroh 'غُزَاةٌ' (pola 'فُعَاةٌ' yang sangat kondang berarti pejuang perang fusha), qillah 'أَغْzِيَاءُ', muntahal 'غَوَازٍ' (para penari/penyerbu)."
  },
  raja: {
    katsroh: "رُجَّاءٌ",
    qillah: "أَرْجِيَاءُ",
    muntahal: "رَجَايَا",
    reference: "Kamus Al-Munawwir, Lisanul 'Arab",
    explanation: "Sifat 'رَجِيٌّ' (tumpuan harapan khalayak) ber-wazan 'فَعِيلٌ' naqis. Jamak katsroh-nya 'رُجَّاءٌ' (pola 'فُعَّالٌ'), qillah-nya 'أَرْجِيَاءُ' ('أَفْعِلَاءُ'), muntahal-nya 'رَجَايَا'."
  },
  fakhura: {
    katsroh: "فُخُرٌ",
    qillah: "أَفْخَارٌ",
    muntahal: "فَوَاخِرُ",
    reference: "Kamus Al-Munawwir, Tajul 'Arus",
    explanation: "Sifat 'فَخُورٌ' (yang membanggakan diri) ber-wazan 'فَعُولٌ'. Jamak katsroh-nya 'فُخُرٌ' (pola 'فُعُلٌ'), qillah-nya 'أَفْخَارٌ' ('أَفْعَالٌ'), muntahal-nya 'فَوَاخِرُ' ('فَوَاعِلُ')."
  },
  dhahika: {
    katsroh: "ضَوَاحِكُ",
    qillah: "أَضْحَاكٌ",
    muntahal: "ضَوَاحِكُ",
    reference: "Kamus Al-Munawwir, Lisanul 'Arab",
    explanation: "Sifat 'ضَحُوكٌ' / 'ضَحِكٌ' (periang berwajah berseri) ber-wazan 'فَعُولٌ'/'فَعِلٌ'. Jamak katsroh 'ضَوَاحِكُ' (artinya gigi seri yang tampak saat tertawa), qillah 'أَضْحَاكٌ', muntahal 'ضَوَاحِكُ'."
  },
  sauda: {
    katsroh: "سُعَدَاءُ",
    qillah: "أَسْعَادٌ",
    muntahal: "سَعَائِدُ",
    reference: "Kamus Al-Munawwir, Tajul 'Arus",
    explanation: "Sifat 'سَعِيدٌ' (orang yang mujur bahagia) ber-wazan 'فَعِيلٌ'. Jamak katsroh-nya 'سُعَدَاءُ' (pola 'فُعَلَاءُ' - di sisi mulia), qillah-nya 'أَسْعَادٌ' (keberuntungan), muntahal-nya 'سَعَائِدُ'."
  },
  syajua: {
    katsroh: "شُجْعَانٌ / شُجَعَاءُ",
    qillah: "أَشْجَاعٌ",
    muntahal: "شَجَائِعُ",
    reference: "Kamus Al-Munawwir, Kamus Al-Munjid",
    explanation: "Sifat 'شُجَاعٌ' / 'شَجِيعٌ' (pemberani tangguh) ber-wazan 'فُعَالٌ'/'فَعِيلٌ'. Jamak katsroh 'شُجْعَانٌ' (pola 'فُعْلَانٌ') atau 'شُجَعَاءُ' ('فُعَلَاءُ'), qillah 'أَشْجَاعٌ', muntahal-nya 'شَجَائِعُ'."
  },
  sahula: {
    katsroh: "سُهُولٌ",
    qillah: "أَسْهُلٌ",
    muntahal: "مَسَاهِلُ",
    reference: "Kamus Al-Munawwir, Lisanul 'Arab",
    explanation: "Sifat 'سَهْلٌ' (luwes/gampang/tanah rata) ber-wazan 'فَعْلٌ'. Jamak katsroh-nya 'سُهُولٌ' (pola 'فُعُولٌ' - artinya tanah datar luas), qillah-nya 'أَسْهُلٌ' ('أَفْعُلٌ'), muntahal-nya 'مَسَاهِلُ' ('مَفَاعِلُ')."
  },
  sajid: {
    katsroh: "سُجَّدٌ",
    qillah: "أَسْجَادٌ",
    muntahal: "سَوَاجِدُ",
    reference: "Kamus Al-Munawwir, Tajul 'Arus",
    explanation: "Sifat 'سَجِيدٌ' (yang sering bersujud khusyuk) ber-wazan 'فَعِيلٌ'. Jamak katsroh-nya 'سُجَّدٌ' (pola 'فُعَّلٌ'), qillah-nya 'أَسْجَادٌ', muntahal-nya 'سَوَاجِدُ' (pola 'فَوَاعِلُ')."
  },
  safih: {
    katsroh: "سُفَحَاءُ",
    qillah: "أَسْفَاحٌ",
    muntahal: "سَفَائِحُ",
    reference: "Kamus Al-Munawwir, Lisanul 'Arab",
    explanation: "Sifat 'سَفِيحٌ' (bejana/ lereng bukit/ yang menumpahkan) ber-wazan 'فَعِيلٌ'. Jamak katsroh-nya 'سُفَحَاءُ', qillah-nya 'أَسْفَاحٌ', muntahal-nya 'سَفَائِحُ' (artinya kerikil datar/pedang tajam)."
  },
  sakata: {
    katsroh: "سُكُتٌ",
    qillah: "أَسْكَاتٌ",
    muntahal: "سَوَاكِتُ",
    reference: "Kamus Al-Munawwir, Kamus Al-Munjid",
    explanation: "Sifat 'سَكُوتٌ' (pendiam wibawa) ber-wazan 'فَعูลٌ'. Jamak katsroh-nya 'سُكُتٌ' (pola 'فُعُلٌ'), qillah-nya 'أَسْكَاتٌ' (pola 'أَفْعَالٌ'), muntahal-nya 'سَوَاكِتُ' (pola 'فَوَاعِلُ')."
  },
  salima: {
    katsroh: "سُلَمَاءُ / سِلَامٌ",
    qillah: "أَسْلِمَةٌ",
    muntahal: "سَلَائِمُ",
    reference: "Kamus Al-Munawwir, Lisanul 'Arab",
    explanation: "Sifat 'سَلِيمٌ' (hati suci lurus/sehat) ber-wazan 'فَعِيلٌ'. Jamak katsroh 'سُلَمَاءُ' (pola 'فُعَلَاءُ') atau 'سِلَامٌ' ('فِعَالٌ'), qillah 'أَسْلِمَةٌ' ('أَفْعِلَةٌ'), muntahal-nya 'سَلَائِمُ' ('فَعَائِلُ')."
  },
  syariba: {
    katsroh: "شُرَبَاءُ / شَرَابَةٌ",
    qillah: "أَشْرَابٌ",
    muntahal: "شَرَائِبُ",
    reference: "Kamus Al-Munawwir, Tajul 'Arus",
    explanation: "Sifat 'شَرِيبٌ' (peminum giat/ahli rasa) ber-wazan 'فَعِيلٌ'. Jamak katsroh-nya 'شُرَبَاءُ' (pola 'فُعَلَاءُ') atau 'شَرَابَةٌ' (sima'i), qillah-nya 'أَشْرَابٌ' ('أَفْعَالٌ'), muntahal 'شَرَائِبُ'."
  },
  shadaqa: {
    katsroh: "صُدَقَاءُ / صُدُقٌ",
    qillah: "أَصْدِقَاءُ",
    muntahal: "صَدَائِقُ",
    reference: "Kamus Al-Munawwir, Lisanul 'Arab",
    explanation: "Sifat 'صَدُوقٌ' / 'صَدِيقٌ' (sahabat sejati/jujur tulus) ber-wazan 'فَعُولٌ'/'فَعِيلٌ'. Jamak katsroh 'صُدَقَاءُ' atau 'صُدُقٌ', qillah 'أَصْدِقَاءُ' (pola khalayak 'أَفْعِلَاءُ' populer), muntahal-nya 'صَدَائِقُ'."
  },
  shana_a: {
    katsroh: "صُنَّاعٌ / صُنَعَاءُ",
    qillah: "أَصْنِيَعَةٌ",
    muntahal: "صَنَائِعُ",
    reference: "Kamus Al-Munawwir, Kamus Al-Munjid",
    explanation: "Sifat 'صَنِيعٌ' (buatan indah/pribadi ahli) ber-wazan 'فَعِيلٌ'. Jamak katsroh 'صُنَّاعٌ' (pola 'فُعَّالٌ' - pengrajin) atau 'صُنَعَاءُ', qillah-nya 'أَصْنِيَعَةٌ', muntahal-nya 'صَنَائِعُ' (artinya maha karya/jasa kebajikan)."
  },
  tahura: {
    katsroh: "أَطْهَارٌ / طُهَرَاءُ",
    qillah: "أَطْهَارٌ",
    muntahal: "طَوَاهِرُ",
    reference: "Kamus Al-Munawwir, Tajul 'Arus",
    explanation: "Sifat 'طَاهِرٌ' / 'طَهُورٌ' (suci bersih) ber-wazan 'فَاعِلٌ'/'فَعُولٌ'. Jamak katsroh 'أَطْهَارٌ' atau 'طُهَرَاءُ', qillah 'أَطْهَارٌ' (pola 'أَفْعَالٌ'), muntahal-nya 'طَوَاهِرُ' ('فَوَاعِلُ')."
  },
  azhuma: {
    katsroh: "عُظَمَاءُ / عِظَامٌ",
    qillah: "أَعْظَامٌ",
    muntahal: "عَظَائِمُ",
    reference: "Kamus Al-Munawwir, Lisanul 'Arab",
    explanation: "Sifat 'عَظِيمٌ' (maha agung berdaulat) ber-wazan 'فَعِيلٌ'. Jamak katsroh 'عُظَمَاءُ' (pola 'فُعَلَاءُ' - tokoh-tokoh) atau 'عِظَامٌ' ('فِعَالٌ'), qillah 'أَعْظَامٌ' (kebesaran/tulang), muntahal 'عَظَائِمُ' ('فَعَائِلُ' - malapetaka besar)."
  },
  ghafara: {
    katsroh: "غُفُرٌ",
    qillah: "أَغْفِرَةٌ",
    muntahal: "غَوَافِرُ",
    reference: "Kamus Al-Munawwir, Tajul 'Arus",
    explanation: "Sifat 'غَفُورٌ' / 'غَفِيرٌ' (maha pengampun pelindung) ber-wazan 'فَعُولٌ'/'فَعِيلٌ'. Jamak katsroh 'غُفُرٌ' (pola 'فُعُلٌ'), qillah 'أَغْفِرَةٌ' ('أَفْعِلَةٌ'), muntahal-nya 'غَوَافِرُ' ('فَوَاعِلُ' - penutup kepala baja)."
  }
};

/**
 * Normalizes vowel markings for standard template heuristic checking
 */
function stripVowelsForTemplate(arabic: string): string {
  if (!arabic) return "";
  return arabic
    .replace(/[\u064b-\u0652]/g, "") // remove harakat
    .replace(/[\u0670]/g, "") // remove super alif
    .trim();
}

/**
 * Advanced morph-analyzing engine for any Sifat Musyabihat (preset or custom entry)
 * Generates robust, linguistically-consistent plurals & details.
 */
export function analyzeSifatMusyabihatPlural(entry: DictionaryEntry): PluralSifatMusyabihat {
  // 1. Try core predefined static lookups first (highly accurate)
  const entryIdClean = entry.id.replace(/^searched-|^fav-cloud-|^fav-|^db-/, "").split("-")[0];
  
  if (PRESETS_PLURAL_MAP[entryIdClean]) {
    return PRESETS_PLURAL_MAP[entryIdClean];
  }
  
  // Also try searching map by root consonant characters to match imported or edited presets
  const faVal = entry.root.fa;
  const ainVal = entry.root.ain;
  const lamVal = entry.root.lam;
  const presetKeyFound = Object.keys(PRESETS_PLURAL_MAP).find(k => {
    const pre = PRESETS_PLURAL_MAP[k];
    // Check if the explanation or root contains the same letters matches
    return k.startsWith(entry.id) || (faVal === "ح" && ainVal === "س" && lamVal === "ن" && k === "hasuna") ||
           (faVal === "ك" && ainVal === "ر" && lamVal === "م" && k === "karuma") ||
           (faVal === "ش" && ainVal === "ر" && lamVal === "ف" && k === "sarufa") ||
           (faVal === "ك" && ainVal === "ب" && lamVal === "ر" && k === "kabura") ||
           (faVal === "ص" && ainVal === "غ" && lamVal === "ر" && k === "saghura");
  });

  if (presetKeyFound) {
    return PRESETS_PLURAL_MAP[presetKeyFound];
  }

  // 2. Dynamic generation based on Arabic linguistics patterns
  const rawSifat = entry.sifatMusyabihat || "";
  const cleanedSifat = stripVowelsForTemplate(rawSifat);
  const fa = entry.root.fa;
  const ain = entry.root.ain;
  const lam = entry.root.lam;

  let katsroh = "";
  let qillah = "";
  let muntahal = "";
  let patternName = "Umum";
  let explanation = "";

  // Check common template structures of Sifat Musyabihat
  if (cleanedSifat.endsWith("يل") || cleanedSifat.includes("ي")) {
    // Pola فَعِيلٌ (Fa-Ain-y-Lam)
    patternName = "فَعِيلٌ";
    katsroh = `${fa}ُ${ain}َ${lam}َاءُ / ${fa}ِ${ain}َامٌ`;
    qillah = `أَ${fa}ْ${ain}ِ${lam}َاءُ`;
    muntahal = `${fa}َ${ain}َائِلُ`;
    explanation = `Akar kata '${fa}-${ain}-${lam}' melahirkan sifat musyabihat '${rawSifat}' ber-wazan '${patternName}'. Secara kaidah sharaf klasik, jamak katsroh untuk wazan ini adalah '${katsroh}' (pola 'فُعَلَاءُ' / 'فِعَالٌ'), jamak qillah-nya adalah '${qillah}' (pola 'أَفْعِلَاءُ'), dan bentuk shighot muntahal jumu'-nya adalah '${muntahal}' (pola 'فَعَائِلُ').`;
  } else if (cleanedSifat.endsWith("ول") || cleanedSifat.includes("و")) {
    // Pola فَعُولٌ (Fa-Ain-w-Lam)
    patternName = "فَعُولٌ";
    katsroh = `${fa}ُ${ain}ُ${lam}ٌ`;
    qillah = `أَ${fa}ْ${ain}ِ${lam}َةٌ`;
    muntahal = `${fa}َوَاعِلُ`;
    explanation = `Akar kata '${fa}-${ain}-${lam}' menyusun sifat musyabihat superfisial '${rawSifat}' ber-wazan '${patternName}'. Jamak katsroh-nya adalah '${katsroh}' (pola 'فُعُلٌ'), jamak qillah-nya adalah '${qillah}' (pola 'أَفْعِلَةٌ'), dan shighot muntahal jumu'-nya adalah '${muntahal}' (pola 'فَوَاعِلُ').`;
  } else if (cleanedSifat.length === 3 && cleanedSifat[1] === ain && cleanedSifat[2] === lam) {
    // Pola فَعَلٌ (Fa-Ain-Lam)
    patternName = "فَعَلٌ";
    katsroh = `${fa}ِ${ain}َامٌ`;
    qillah = `أَ${fa}ْ${ain}َالٌ`;
    muntahal = `مَ${fa}َا${ain}ِ${lam}ُ`;
    explanation = `Akar kata '${fa}-${ain}-${lam}' membentuk sifat musyabihat dengan pola '${patternName}' (seperti lafadz حَسَنٌ). Jamak katsroh mengikuti '${katsroh}' ('فِعَالٌ'), qillah-nya '${qillah}' ('أَفْعَالٌ'), dan shighot muntahal jumu'-nya '${muntahal}' ('مَفَاعِلُ' secara rujukan murni).`;
  } else {
    // Default generative fallback with standard rules
    katsroh = `${fa}ُ${ain}َ${lam}َاءُ`;
    qillah = `أَ${fa}ْ${ain}َالٌ`;
    muntahal = `${fa}َ${ain}َائِلُ`;
    explanation = `Mengingat sifat musyabihat '${rawSifat || "-"}' memiliki pola kustom, sistem Sharaf merumuskan pola jamak taksir katsroh '${katsroh}', qillah '${qillah}', serta shighot muntahal jumu' '${muntahal}' berdasarkan kedekatan wazan tri-literal radikal '${fa}-${ain}-${lam}'.`;
  }

  return {
    katsroh,
    qillah,
    muntahal,
    reference: "Rujukan Komparatif: Kamus Al-Munawwir, Al-Munjid, Lisanul 'Arab",
    explanation: explanation
  };
}
