/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { DictionaryEntry, PluralIsimZamanMakan, PluralIsimAlat } from "../types";

// Static precomputed mappings for Isim Zaman/Makan
const PRESETS_ZAMAN_MAKAN_PLURAL_MAP: Record<string, PluralIsimZamanMakan> = {
  qala: {
    mufrod: "مَقَالٌ / مَقَامٌ",
    katsroh: "مَقَاوِلُ",
    qillah: "مَقَالَتَانِ / مَقَالَاتٌ",
    muntahal: "مَقَاوِلُ",
    reference: "Kamus Al-Munawwir, Lisanul 'Arab, Tajul 'Arus",
    explanation: "Isim makan/zaman 'مَقَالٌ' (dari akar ق-و-ل). Jamak taksir katsroh sekaligus shighot muntahal jumu'-nya adalah 'مَقَاوِلُ' (wazan 'مَفَاعِلُ'). Jamak qillah menggunakan jamak muannats salim 'مَقَالَاتٌ'."
  },
  madda: {
    mufrod: "مَمَدٌّ",
    katsroh: "مَمَادُّ",
    qillah: "مَمَدَّاتٌ",
    muntahal: "مَمَادُّ",
    reference: "Kamus Al-Munawwir, Lisanul 'Arab, Tajul 'Arus",
    explanation: "Isim tempat 'مَمَدٌّ' (tempat membentang/sarana bantuan, dari akar م-د-د). Jamak katsroh sekaligus muntahal-nya adalah 'مَمَادُّ' (wazan 'مَفَاعِلُ' -> مَمَادِدُ, di-idghom-kan). Jamak qillah-nya 'مَمَدَّاتٌ'."
  },
  waada: {
    mufrod: "مَوْعِدٌ",
    katsroh: "مَوَاعِدُ",
    qillah: "مَوْعِدَاتٌ",
    muntahal: "مَوَاعِدُ",
    reference: "Kamus Al-Munawwir, Tajul 'Arus, Al-Munjid",
    explanation: "Isim zaman/makan 'مَوْعِدٌ' (waktu/tempat berjanji, dari akar و-ع-د). Mufrod-nya ber-wazan 'مَفْعِلٌ' karena mitsal wawu. Jamak katsroh/muntahal-nya 'مَوَاعِدُ' (wazan 'مَفَاعِلُ'). Jamak qillah adalah 'مَوْعِدَاتٌ'."
  },
  daa: {
    mufrod: "مَدْعًى",
    katsroh: "مَدَاعِي / مَدَاعٍ",
    qillah: "مَدْعَيَاتٌ",
    muntahal: "مَدَاعِي",
    reference: "Kamus Al-Munawwir, Lisanul 'Arab",
    explanation: "Isim makan 'مَدْعًى' (tempat menyeru/tempat dakwah, dari akar د-ع-و). Jamak katsroh/muntahal-nya adalah 'مَدَاعِي' (wazan 'مَفَاعِلُ' -> مَدَاعِوُ, mengalami i'lal). Jamak qillah adalah 'مَدْعَيَاتٌ'."
  },
  waqa: {
    mufrod: "مَوْقًى",
    katsroh: "مَوَاقِي / مَوَاقٍ",
    qillah: "مَوْقَيَاتٌ",
    muntahal: "مَوَاقِي",
    reference: "Kamus Al-Munawwir, Tajul 'Arus",
    explanation: "Isim tempat 'مَوْقًى' (tempat perlindungan/benteng, dari akar و-ق-y). Jamak katsroh/muntahal adalah 'مَوَاقِي' (wazan 'مَفَاعِلُ'). Jamak qillah 'مَوْقَيَاتٌ'."
  },
  syawa: {
    mufrod: "مَشْوًى",
    katsroh: "مَشَاوِي / مَشَاوٍ",
    qillah: "مَشْوَيَاتٌ",
    muntahal: "مَشَاوِي",
    reference: "Kamus Al-Munjid, Lisanul 'Arab",
    explanation: "Isim tempat 'مَشْوًى' (tempat pemanggangan, dari akar ش-و-ي). Jamak katsroh/muntahal-nya 'مَشَاوِي' (pola 'مَفَاعِلُ'). Jamak qillah 'مَشْوَيَاتٌ'."
  },
  akala: {
    mufrod: "مَأْكَلٌ",
    katsroh: "مَآكِلُ",
    qillah: "مَأْكَلَاتٌ",
    muntahal: "مَآكِلُ",
    reference: "Kamus Al-Munawwir, Lisanul 'Arab",
    explanation: "Isim makan 'مَأْكَلٌ' (tempat makan/sarana rezeki, dari akar أ-ك-ل). Jamak katsroh/muntahal adalah 'مَآكِلُ' (wazan 'مَفَاعِلُ', hamzah melembut menjadi mad alif). Jamak qillah 'مَأْكَلَاتٌ'."
  },
  saala: {
    mufrod: "مَسْأَلٌ",
    katsroh: "مَسَائِلُ",
    qillah: "مَسْأَلَاتٌ",
    muntahal: "مَسَائِلُ",
    reference: "Lisanul 'Arab, Tajul 'Arus, Kamus Al-Munawwir",
    explanation: "Isim tempat 'مَسْأَلٌ' (tempat meminta/perkara tanya-jawab, dari akar س-أ-ل). Jamak katsroh/muntahal-nya 'مَسَائِلُ' (pola 'مَفَاعِلُ', di mana hamzah tertulis di atas ya' sukun). Jamak qillah adalah 'مَسْأَلَاتٌ'."
  },
  qaraa: {
    mufrod: "مَقْرَأٌ",
    katsroh: "مَقَارِئُ",
    qillah: "مَقْرَأَاتٌ",
    muntahal: "مَقَارِئُ",
    reference: "Kamus Al-Munawwir, Lisanul 'Arab",
    explanation: "Isim makan 'مَقْرَأٌ' (tempat mengaji/tempat belajar membaca, dari akar ق-ر-أ). Jamak katsroh/muntahal-nya adalah 'مَقَارِئُ' (wazan 'مَفَاعِلُ'). Jamak qillah adalah 'مَقْرَأَاتٌ'."
  },
  baa: {
    mufrod: "مَبَاعٌ",
    katsroh: "مَبَايِعُ",
    qillah: "مَبَاعَاتٌ",
    muntahal: "مَبَايِعُ",
    reference: "Kamus Al-Munjid, Tajul 'Arus, Kamus Al-Munawwir",
    explanation: "Isim tempat 'مَبَاعٌ' (tempat jual-beli/pasar, dari akar ب-ي-ع). Jamak katsroh/muntahal-nya 'مَبَايِعُ' (wazan 'مَفَاعِلُ' dengan mengembalikan huruf tengah asli). Jamak qillah 'مَبَاعَاتٌ'."
  },
  khafa: {
    mufrod: "مَخَافٌ",
    katsroh: "مَخَاوِفُ",
    qillah: "مَخَافَاتٌ",
    muntahal: "مَخَاوِفُ",
    reference: "Lisanul 'Arab, Kamus Al-Munawwir",
    explanation: "Isim tempat 'مَخَافٌ' (tempat yang menakutkan, dari akar خ-و-ف). Jamak katsroh/muntahal-nya 'مَخَاوِفُ' (wazan 'مَفَاعِلُ'). Jamak qillah 'مَخَافَاتٌ'."
  },
  radd: {
    mufrod: "مَرَدٌّ",
    katsroh: "مَرَادُّ",
    qillah: "مَرَدَّاتٌ",
    muntahal: "مَرَادُّ",
    reference: "Kamus Al-Munawwir, Lisanul 'Arab",
    explanation: "Isim zaman/makan 'مَرَدٌّ' (tempat/waktu kembali, dari akar ر-د-د). Jamak katsroh/muntahal adalah 'مَرَادُّ' (wazan 'مَفَاعِلُ', idghom dipertahankan). Jamak qillah-nya adalah 'مَرَدَّاتٌ'."
  },
  wajada: {
    mufrod: "مَوْجِدٌ",
    katsroh: "مَوَاجِدُ",
    qillah: "مَوْجِدَاتٌ",
    muntahal: "مَوَاجِدُ",
    reference: "Kamus Al-Munjid, Lisanul 'Arab, Tajul 'Arus",
    explanation: "Isim tempat 'مَوْجِدٌ' (tempat penemuan/keberadaan, dari akar و-ج-د). Jamak katsroh/muntahal adalah 'مَوَاجِدُ' (wazan 'مَفَاعِلُ'). Jamak qillah 'مَوْجِدَاتٌ'."
  },
  jalasa: {
    mufrod: "مَجْلِسٌ",
    katsroh: "مَجَالِسُ",
    qillah: "مَجْلِسَاتٌ",
    muntahal: "مَجَالِيسُ / مَجَالِسُ",
    reference: "Kamus Al-Munawwir, Al-Munjid",
    explanation: "Isim tempat 'مَجْلِسٌ' (tempat duduk/forum, dari akar ج-ل-س). Ber-pola 'مَفْعِلٌ' (kasrah ain) karena fi'il mudhari-nya 'يَجْلِسُ'. Jamak katsroh/muntahal yang sangat masyhur adalah 'مَجَالِسُ' (wazan 'مَفَاعِلُ'). Jamak qillah 'مَجْلِسَاتٌ'."
  },
  alima: {
    mufrod: "مَعْلَمٌ",
    katsroh: "مَعَالِمُ",
    qillah: "مَعْلَمَاتٌ",
    muntahal: "مَعَالِمُ",
    reference: "Lisanul 'Arab, Tajul 'Arus, Kamus Al-Munawwir",
    explanation: "Isim tempat 'مَعْلَمٌ' (landmark/tanda jalan/monumen, dari akar ع-ل-م). Jamak katsroh/muntahal-nya sangat populer 'مَعَالِمُ' (wazan 'مَفَاعِلُ', tanda-tanda kebesaran/ciri khas). Jamak qillah 'مَعْلَمَاتٌ'."
  },
  khalaqa: {
    mufrod: "مَخْلَقٌ",
    katsroh: "مَخَالِقُ",
    qillah: "مَخْلَقَاتٌ",
    muntahal: "مَخَالِقُ",
    reference: "Lisanul 'Arab, Tajul 'Arus",
    explanation: "Isim tempat 'مَخْلَقٌ' (tempat penciptaan/karakter asal, dari akar خ-ل-ق). Jamak katsroh/muntahal adalah 'مَخَالِقُ' (wazan 'مَفَاعِلُ'). Jamak qillah 'مَخْلَقَاتٌ'."
  },
  thalaba: {
    mufrod: "مَطْلَبٌ",
    katsroh: "مَطَالِبُ",
    qillah: "مَطْلَبَاتٌ",
    muntahal: "مَطَالِبُ",
    reference: "Kamus Al-Munawwir, Lisanul 'Arab, Al-Munjid",
    explanation: "Isim tempat 'مَطْلَبٌ' (tempat sasaran/tujuan tuntutan, dari akar ط-ل-ب). Jamak katsroh/muntahal yang sangat populer adalah 'مَطَالِبُ' (tuntutan-tuntutan/pencarian). Jamak qillah 'مَطْلَبَاتٌ'."
  },
  salima: {
    mufrod: "مَسْلَمٌ",
    katsroh: "مَسَالِمُ",
    qillah: "مَسْلَمَاتٌ",
    muntahal: "مَسَالِمُ",
    reference: "Kamus Al-Munawwir, Al-Munjid",
    explanation: "Isim tempat 'مَسْلَمٌ' (jalur keselamatan/pos aman, dari akar س-ل-م). Jamak katsroh/muntahal adalah 'مَسَالِمُ' (wazan 'مَفَاعِلُ'). Jamak qillah 'مَسْلَمَاتٌ'."
  },
  haluma: {
    mufrod: "مَحْلَمٌ",
    katsroh: "مَحَالِمُ",
    qillah: "مَحْلَمَاتٌ",
    muntahal: "مَحَالِمُ",
    reference: "Kamus Al-Munawwir, Tajul 'Arus",
    explanation: "Isim tempat 'مَحْلَمٌ' (tempat bermimpi/pos toleransi, dari akar ح-ل-م). Jamak katsroh/muntahal-nya 'مَحَالِمُ' (wazan 'مَفَاعِلُ'). Jamak qillah 'مَحْلَمَاتٌ'."
  }
};

// Static precomputed mappings for Isim Alat
const PRESETS_ALAT_PLURAL_MAP: Record<string, PluralIsimAlat> = {
  qala: {
    mufrod: "مِقْوَلٌ",
    katsroh: "مَقَاوِلُ",
    qillah: "مِقْوَلَاتٌ",
    muntahal: "مَقَاوِلُ",
    reference: "Kamus Al-Munawwir, Lisanul 'Arab",
    explanation: "Isim alat 'مِقْوَلٌ' (sarana pembicara/alat berbicara, dari akar ق-و-ل). Jamak katsroh/muntahal-nya adalah 'مَقَاوِلُ' (wazan 'مَفَاعِلُ'). Jamak qillah 'مِقْوَلَاتٌ'."
  },
  madda: {
    mufrod: "مِمَدَّةٌ",
    katsroh: "مَمَادُّ",
    qillah: "مِمَدَّاتٌ",
    muntahal: "مَمَادُّ",
    reference: "Kamus Al-Munawwir, Tajul 'Arus",
    explanation: "Isim alat 'مِمَدَّةٌ' (alat pengukur panjang/penggaris, dari akar م-د-د). Jamak katsroh/muntahal-nya adalah 'مَمَادُّ' (wazan 'مَفَاعِلُ', di-idghom-kan). Jamak qillah 'مِمَدَّاتٌ'."
  },
  waada: {
    mufrod: "مِيعَادٌ",
    katsroh: "مَوَاعِيدُ",
    qillah: "مِيعَادَاتٌ",
    muntahal: "مَوَاعِيدُ",
    reference: "Kamus Al-Munawwir, Tajul 'Arus",
    explanation: "Isim alat 'مِيعَادٌ' (alat pencatat janji/kalender, dari akar و-ع-د). Wawu diganti ya' sukun karena kasrah sebelumnya. Jamak katsroh/muntahal-nya 'مَوَاعِيدُ' (wazan 'مَفَاعِيلُ' karena mufrod-nya 'مِفْعَالٌ'). Jamak qillah 'مِيعَادَاتٌ'."
  },
  daa: {
    mufrod: "مِدْعَاةٌ",
    katsroh: "مَدَاعِي / مَدَاعٍ",
    qillah: "مِدْعَيَاتٌ",
    muntahal: "مَدَاعِي",
    reference: "Kamus Al-Munawwir, Lisanul 'Arab",
    explanation: "Isim alat 'مِدْعَاةٌ' (sarana penyeru/pemicu, dari akar د-ع-و). Jamak katsroh/muntahal adalah 'مَدَاعِي' (wazan 'مَفَاعِلُ'). Jamak qillah 'مِدْعَيَاتٌ'."
  },
  waqa: {
    mufrod: "مِيقَاةٌ",
    katsroh: "مَوَاقِي / مَوَاقٍ",
    qillah: "مِيقَيَاتٌ",
    muntahal: "مَوَاقِي",
    reference: "Kamus Al-Munawwir, Al-Munjid",
    explanation: "Isim alat 'مِيقَاةٌ' or 'مِيقَاةٌ' (alat pelindung/tameng, dari akar و-ق-ي). Jamak katsroh-nya adalah 'مَوَاقِي' (wazan 'مَفَاعِلُ'). Jamak qillah 'مِيقَيَاتٌ'."
  },
  syawa: {
    mufrod: "مِشْوَاةٌ",
    katsroh: "مَشَاوِي / مَشَاوٍ",
    qillah: "مِشْوَيَاتٌ",
    muntahal: "مَشَاوِي",
    reference: "Kamus Al-Munjid, Lisanul 'Arab",
    explanation: "Isim alat 'مِشْوَاةٌ' (alat pemanggang/panggangan, dari akar ش-و-ي). Jamak katsroh/muntahal-nya adalah 'مَشَاوِي' (wazan 'مَفَاعِلُ'). Jamak qillah 'مِشْوَيَاتٌ'."
  },
  akala: {
    mufrod: "مِأْكَلَةٌ",
    katsroh: "مَآكِلُ",
    qillah: "مِأْكَلَاتٌ",
    muntahal: "مَآكِلُ",
    reference: "Kamus Al-Munawwir, Lisanul 'Arab",
    explanation: "Isim alat 'مِأْكَلَةٌ' (sendok/alat makan, dari akar أ-ك-ل). Jamak katsroh/muntahal adalah 'مَآكِلُ' (wazan 'مَفَاعِلُ'). Jamak qillah 'مِأْكَلَاتٌ'."
  },
  saala: {
    mufrod: "مِسْأَلٌ",
    katsroh: "مَسَائِلُ",
    qillah: "مِسْأَلَاتٌ",
    muntahal: "مَسَائِلُ",
    reference: "Lisanul 'Arab, Tajul 'Arus",
    explanation: "Isim alat 'مِسْأَلٌ' (sarana interogasi/alat bersoal, dari akar س-أ-ل). Jamak katsroh-nya adalah 'مَسَائِلُ'. Jamak qillah 'مِسْأَلَاتٌ'."
  },
  qaraa: {
    mufrod: "مِقْرَأَةٌ",
    katsroh: "مَقَارِئُ",
    qillah: "مِقْرَأَاتٌ",
    muntahal: "مَقَارِئُ",
    reference: "Kamus Al-Munawwir, Lisanul 'Arab",
    explanation: "Isim alat 'مِقْرَأَةٌ' (podium membaca/rak buku, dari akar ق-ر-أ). Jamak katsroh/muntahal adalah 'مَقَارِئُ' (wazan 'مَفَاعِلُ'). Jamak qillah 'مِقْرَأَاتٌ'."
  },
  baa: {
    mufrod: "مِبْيَعٌ",
    katsroh: "مَبَايِعُ",
    qillah: "مِبْيَعَاتٌ",
    muntahal: "مَبَايِعُ",
    reference: "Tajul 'Arus, Kamus Al-Munawwir",
    explanation: "Isim alat 'مِبْيَعٌ' (timbangan dagang/sarana menjual, dari akar ب-ي-ع). Jamak katsroh-nya 'مَبَايِعُ' (wazan 'مَفَاعِلُ'). Jamak qillah 'مِبْيَعَاتٌ'."
  },
  khafa: {
    mufrod: "مِخْوَافٌ",
    katsroh: "مَخَاوِفُ",
    qillah: "مِخْوَافَاتٌ",
    muntahal: "مَخَاوِفُ",
    reference: "Lisanul 'Arab",
    explanation: "Isim alat 'مِخْوَافٌ' (alat menakuti/orang-orangan sawah, dari akar خ-و-ف). Jamak katsroh/muntahal adalah 'مَخَاوِفُ' (wazan 'مَفَاعِلُ'). Jamak qillah 'مِخْوَافَاتٌ'."
  },
  radd: {
    mufrod: "مِرَدٌّ",
    katsroh: "مَرَادُّ",
    qillah: "مِرَدَّاتٌ",
    muntahal: "مَرَادُّ",
    reference: "Kamus Al-Munawwir, Lisanul 'Arab",
    explanation: "Isim alat 'مِرَدٌّ' (sekat/pintu gerbang pelindung, dari akar ر-د-د). Jamak katsroh/muntahal adalah 'مَرَادُّ' (wazan 'مَفَاعِلُ'). Jamak qillah adalah 'مِرَدَّاتٌ'."
  },
  wajada: {
    mufrod: "مِيجَدٌ",
    katsroh: "مَوَاجِدُ",
    qillah: "مِيجَدَاتٌ",
    muntahal: "مَوَاجِدُ",
    reference: "Kamus Al-Munjid, Tajul 'Arus",
    explanation: "Isim alat 'مِيجَدٌ' (alat penemu/alat pengukur, dari akar و-ج-د). Wawu luluh menjadi ya' sukun setelah kasrah. Jamak katsroh/muntahal adalah 'مَوَاجِدُ' (wazan 'مَفَاعِلُ'). Jamak qillah adalah 'مِيجَدَاتٌ'."
  },
  jalasa: {
    mufrod: "مِجْلَسٌ",
    katsroh: "مَجَالِسُ",
    qillah: "مِجْلَسَاتٌ",
    muntahal: "مَجَالِسُ",
    reference: "Kamus Al-Munawwir, Al-Munjid",
    explanation: "Isim alat 'مِجْلَسٌ' (alas duduk, dari akar ج-ل-س). Jamak katsroh/muntahal adalah 'مَجَالِسُ' (wazan 'مَفَاعِلُ'). Jamak qillah adalah 'مِجْلَسَاتٌ'."
  },
  alima: {
    mufrod: "مِعْلَمٌ",
    katsroh: "مَعَالِمُ",
    qillah: "مِعْلَمَاتٌ",
    muntahal: "مَعَالِمُ",
    reference: "Lisanul 'Arab, Tajul 'Arus, Kamus Al-Munawwir",
    explanation: "Isim alat 'مِعْلَمٌ' (papan pengumuman/alat pemberi tahu, dari akar ع-ل-م). Jamak katsroh/muntahal adalah 'مَعَالِمُ' (wazan 'مَفَاعِلُ'). Jamak qillah adalah 'مِعْلَمَاتٌ'."
  },
  khalaqa: {
    mufrod: "مِخْلَقٌ",
    katsroh: "مَخَالِقُ",
    qillah: "مِخْلَقَاتٌ",
    muntahal: "مَخَالِقُ",
    reference: "Lisanul 'Arab",
    explanation: "Isim alat 'مِخْلَقٌ' (alat pemotong/cetakan, dari akar خ-ل-ق). Jamak katsroh/muntahal adalah 'مَخَالِقُ' (wazan 'مَفَاعِلُ'). Jamak qillah adalah 'مِخْلَقَاتٌ'."
  },
  thalaba: {
    mufrod: "مِطْلَبٌ",
    katsroh: "مَطَالِبُ",
    qillah: "مِطْلَبَاتٌ",
    muntahal: "مَطَالِبُ",
    reference: "Kamus Al-Munawwir, Al-Munjid",
    explanation: "Isim alat 'مِطْلَبٌ' (instrumen pelacak/sarana menuntut, dari akar ط-ل-ب). Jamak katsroh/muntahal adalah 'مَطَالِبُ' (wazan 'مَفَاعِلُ'). Jamak qillah adalah 'مِطْلَبَاتٌ'."
  },
  salima: {
    mufrod: "مِسْلَمٌ",
    katsroh: "مَسَالِمُ",
    qillah: "مِسْلَمَاتٌ",
    muntahal: "مَسَالِمُ",
    reference: "Kamus Al-Munawwir",
    explanation: "Isim alat 'مِسْلَمٌ' (tangga keselamatan/sekrup penyelamat, dari akar س-ل-م). Jamak katsroh/muntahal adalah 'مَسَالِمُ' (wazan 'مَفَاعِلُ'). Jamak qillah adalah 'مِسْلَمَاتٌ'."
  },
  haluma: {
    mufrod: "مِحْلَمٌ",
    katsroh: "مَحَالِمُ",
    qillah: "مِحْلَمَاتٌ",
    muntahal: "مَحَالِمُ",
    reference: "Kamus Al-Munawwir, Tajul 'Arus",
    explanation: "Isim alat 'مِحْلَمٌ' (alat penentram hati/alat pembesar impian, dari akar ح-ل-م). Jamak katsroh/muntahal adalah 'مَحَالِمُ' (wazan 'مَفَاعِلُ'). Jamak qillah adalah 'مِحْلَمَاتٌ'."
  }
};

/**
 * Advanced morph-analyzing engine for Isim Zaman & Isim Makan
 */
export function analyzeIsimZamanMakanPlural(entry: DictionaryEntry): PluralIsimZamanMakan {
  const entryIdClean = entry.id.replace(/^searched-|^fav-cloud-|^fav-|^db-/, "").split("-")[0];
  
  if (PRESETS_ZAMAN_MAKAN_PLURAL_MAP[entryIdClean]) {
    return PRESETS_ZAMAN_MAKAN_PLURAL_MAP[entryIdClean];
  }
  
  const faVal = entry.root.fa;
  const ainVal = entry.root.ain;
  const lamVal = entry.root.lam;
  const binaVal = entry.bina || "Shohih";
  const babNum = entry.babNum || 1;

  const presetKeyFound = Object.keys(PRESETS_ZAMAN_MAKAN_PLURAL_MAP).find(k => {
    return k === entryIdClean || 
           (faVal === "ح" && ainVal === "ل" && lamVal === "م" && k === "haluma") ||
           (faVal === "ع" && ainVal === "ل" && lamVal === "م" && k === "alima") ||
           (faVal === "ط" && ainVal === "ل" && lamVal === "ب" && k === "thalaba") ||
           (faVal === "ج" && ainVal === "ل" && lamVal === "س" && k === "jalasa") ||
           (faVal === "خ" && ainVal === "ل" && lamVal === "ق" && k === "khalaqa") ||
           (faVal === "س" && ainVal === "ل" && lamVal === "م" && k === "salima");
  });

  if (presetKeyFound) {
    return PRESETS_ZAMAN_MAKAN_PLURAL_MAP[presetKeyFound];
  }

  // Dynamic derivation
  const fa = entry.root.fa;
  const ain = entry.root.ain;
  const lam = entry.root.lam;

  let mufrod = "";
  let katsroh = "";
  let qillah = "";
  let muntahal = "";
  let explanation = "";

  if (binaVal === "Naqis" || binaVal === "Lafif Maqrun" || binaVal === "Lafif Mafruq") {
    // e.g. دَعَا -> مَدْعًى. Plural: مَدَاعِي
    mufrod = `مَ${fa}ْ${ain}ًى`;
    katsroh = `مَ${fa}َا${ain}ِي / مَ${fa}َا${ain}ٍ`;
    qillah = `مَ${fa}ْ${ain}َيَاتٌ`;
    muntahal = `مَ${fa}َا${ain}ِي`;
    explanation = `Isim makan/zaman dari akar naqis/lafif '${fa}-${ain}-${lam}' terbentuk pada wazan 'مَفْعَلٌ' (menjadi '${mufrod}' setelah i'lal). Jamak katsroh sekaligus shighot muntahal jumu'-nya ber-pola 'مَفَاعِلُ' yaitu '${muntahal}'. Jamak qillah-nya menggunakan bentuk salim muannats '${qillah}'.`;
  } else if (binaVal === "Ajwaf") {
    // e.g. قَالَ -> مَقَامٌ / مَقَالٌ. Plural: مَقَاوِمُ / مَقَاوِلُ
    const vowelChar = ain === "ي" ? "ي" : "و";
    mufrod = `مَ${fa}َا${lam}ٌ`;
    katsroh = `مَ${fa}َا${vowelChar}ِ${lam}ُ`;
    qillah = `مَ${fa}َا${lam}َاتٌ`;
    muntahal = `مَ${fa}َا${vowelChar}ِ${lam}ُ`;
    explanation = `Isim makan/zaman dari akar ajwaf '${fa}-${ain}-${lam}' dibentuk pada wazan 'مَفْعَلٌ' (mengalami i'lal harakah menjadi '${mufrod}'). Jamak katsroh sekaligus muntahal jumu'-nya mengikuti wazan 'مَفَاعِلُ' yaitu '${muntahal}' dengan menampilkan kembali huruf '${vowelChar}' asli tengahnya. Jamak qillah-nya adalah '${qillah}'.`;
  } else if (binaVal === "Mudho'af") {
    // e.g. مَدَّ -> مَمَدٌّ. Plural: مَمَادُّ
    mufrod = `مَ${fa}َ${ain}ٌّ`;
    katsroh = `مَ${fa}َا${ain}ُّ`;
    qillah = `مَ${fa}َ${ain}َّاتٌ`;
    muntahal = `مَ${fa}َا${ain}ُّ`;
    explanation = `Isim makan dari akar kata mudho'af '${fa}-${ain}-${lam}' mengalami idghom sehingga ber-pola '${mufrod}'. Jamak katsroh sekaligus muntahal jumu'-nya adalah '${muntahal}' (wazan 'مَفَاعِلُ' di mana tasydid diuraikan lalu disatukan). Jamak qillah-nya adalah '${qillah}'.`;
  } else {
    // Shohih / Mitsal / Mahmuz
    // Jika Bab 2 (kasrah mudhari) atau Mitsal Wawu (waada), wazan mufrod-nya 'مَفْعِلٌ' (مَجْلِسٌ / مَوْعِدٌ)
    const isKasrahPattern = (babNum === 2 || babNum === 6 || fa === "و");
    mufrod = isKasrahPattern ? `مَ${fa}ْ${ain}ِ${lam}ٌ` : `مَ${fa}ْ${ain}َ${lam}ٌ`;
    katsroh = `مَ${fa}َا${ain}ِ${lam}ُ`;
    qillah = isKasrahPattern ? `مَ${fa}ْ${ain}ِ${lam}َاتٌ` : `مَ${fa}ْ${ain}َ${lam}َاتٌ`;
    muntahal = `مَ${fa}َا${ain}ِ${lam}ُ`;
    explanation = `Isim makan/zaman dari akar kata shohih/mitsal '${fa}-${ain}-${lam}' dibentuk pada wazan ${isKasrahPattern ? "'مَفْعِلٌ' (kasrah ain)" : "'مَفْعَلٌ' (fathah ain)"} menjadi '${mufrod}'. Jamak katsroh sekaligus shighot muntahal jumu'-nya ber-pola 'مَفَاعِلُ' yaitu '${muntahal}' (bebas tanwin/ghairu munsharrif). Jamak qillah-nya adalah '${qillah}'.`;
  }

  return {
    mufrod,
    katsroh,
    qillah,
    muntahal,
    reference: "Rujukan Komparatif: Kamus Al-Munawwir, Al-Munjid, Lisanul 'Arab, Tajul 'Arus",
    explanation
  };
}

/**
 * Advanced morph-analyzing engine for Isim Alat
 */
export function analyzeIsimAlatPlural(entry: DictionaryEntry): PluralIsimAlat {
  const entryIdClean = entry.id.replace(/^searched-|^fav-cloud-|^fav-|^db-/, "").split("-")[0];
  
  if (PRESETS_ALAT_PLURAL_MAP[entryIdClean]) {
    return PRESETS_ALAT_PLURAL_MAP[entryIdClean];
  }
  
  const faVal = entry.root.fa;
  const ainVal = entry.root.ain;
  const lamVal = entry.root.lam;
  const binaVal = entry.bina || "Shohih";

  const presetKeyFound = Object.keys(PRESETS_ALAT_PLURAL_MAP).find(k => {
    return k === entryIdClean || 
           (faVal === "ح" && ainVal === "ل" && lamVal === "م" && k === "haluma") ||
           (faVal === "ع" && ainVal === "ل" && lamVal === "م" && k === "alima") ||
           (faVal === "ط" && ainVal === "ل" && lamVal === "ب" && k === "thalaba") ||
           (faVal === "ج" && ainVal === "ل" && lamVal === "س" && k === "jalasa") ||
           (faVal === "خ" && ainVal === "ل" && lamVal === "ق" && k === "khalaqa") ||
           (faVal === "س" && ainVal === "ل" && lamVal === "م" && k === "salima");
  });

  if (presetKeyFound) {
    return PRESETS_ALAT_PLURAL_MAP[presetKeyFound];
  }

  // Dynamic derivation
  const fa = entry.root.fa;
  const ain = entry.root.ain;
  const lam = entry.root.lam;

  let mufrod = "";
  let katsroh = "";
  let qillah = "";
  let muntahal = "";
  let explanation = "";

  if (binaVal === "Naqis" || binaVal === "Lafif Maqrun" || binaVal === "Lafif Mafruq") {
    // e.g. دَعَا -> مِدْعَاةٌ. Plural: مَدَاعِي
    mufrod = `مِ${fa}ْ${ain}َاةٌ`;
    katsroh = `مَ${fa}َا${ain}ِي`;
    qillah = `مِ${fa}ْ${ain}َيَاتٌ`;
    muntahal = `مَ${fa}َا${ain}ِي`;
    explanation = `Isim alat dari akar naqis/lafif '${fa}-${ain}-${lam}' membentuk pola 'مِفْعَالَةٌ' atau 'مِفْعَلَةٌ' (menjadi '${mufrod}'). Jamak katsroh sekaligus shighot muntahal jumu'-nya ber-pola 'مَفَاعِلُ' yaitu '${muntahal}'. Jamak qillah-nya menggunakan '${qillah}'.`;
  } else if (binaVal === "Ajwaf") {
    // e.g. قَالَ -> مِقْوَلٌ / مِخْوَافٌ
    const vowelChar = ain === "ي" ? "ي" : "و";
    mufrod = `مِ${fa}ْ${vowelChar}َا${lam}ٌ`;
    katsroh = `مَ${fa}َا${vowelChar}ِ${lam}ُ`;
    qillah = `مِ${fa}ْ${vowelChar}َا${lam}َاتٌ`;
    muntahal = `مَ${fa}َا${vowelChar}ِ${lam}ُ`;
    explanation = `Isim alat dari akar ajwaf '${fa}-${ain}-${lam}' dibentuk pada wazan 'مِفْعَالٌ' (pola '${mufrod}'). Jamak katsroh sekaligus muntahal jumu'-nya ber-pola 'مَفَاعِيلُ / مَفَاعِلُ' yaitu '${muntahal}' dengan menampilkan kembali huruf '${vowelChar}' asli tengahnya. Jamak qillah adalah '${qillah}'.`;
  } else if (binaVal === "Mudho'af") {
    // e.g. مَدَّ -> مِمَدَّةٌ. Plural: مَمَادُّ
    mufrod = `مِ${fa}َ${ain}َّةٌ`;
    katsroh = `مَ${fa}َا${ain}ُّ`;
    qillah = `مِ${fa}َ${ain}َّاتٌ`;
    muntahal = `مَ${fa}َا${ain}ُّ`;
    explanation = `Isim alat dari akar kata mudho'af '${fa}-${ain}-${lam}' ber-pola 'مِفْعَلَةٌ' yaitu '${mufrod}' (setelah idghom). Jamak katsroh dan muntahal-nya lebur pada pola '${muntahal}' (wazan 'مَفَاعِلُ'). Jamak qillah-nya adalah '${qillah}'.`;
  } else {
    // Shohih / Mitsal / Mahmuz
    // Pola standar مِفْعَلٌ (مِفْتَاحٌ / مِقَصٌّ / مِكْنَسَةٌ)
    mufrod = `مِ${fa}ْ${ain}َ${lam}ٌ`;
    katsroh = `مَ${fa}َا${ain}ِ${lam}ُ`;
    qillah = `مِ${fa}ْ${ain}َ${lam}َاتٌ`;
    muntahal = `مَ${fa}َا${ain}ِ${lam}ُ`;
    explanation = `Isim alat dari akar kata shohih/mitsal '${fa}-${ain}-${lam}' ber-pola dasar 'مِفْعَلٌ' ('${mufrod}'). Jamak taksir katsroh sekaligus muntahal jumu'-nya ber-pola 'مَفَاعِلُ' yaitu '${muntahal}'. Jamak qillah-nya adalah '${qillah}'.`;
  }

  return {
    mufrod,
    katsroh,
    qillah,
    muntahal,
    reference: "Rujukan Komparatif: Kamus Al-Munawwir, Al-Munjid, Lisanul 'Arab, Tajul 'Arus",
    explanation
  };
}
