package com.kamus.shorofiilal

object DictionaryData {
    val PRESET_DICTIONARY = listOf(
        DictionaryEntry(
            id = "nasara",
            fa = "ن", ain = "ص", lam = "ر",
            translation = "Menolong / Membantu",
            babNum = 1,
            notes = "Fi'il Shohih (tidak ada huruf penyakit). Menggunakan pola Bab 1 (فَعَلَ - يَفْعُلُ). Pola standard perubahan harakah 'Ain dari fatha di Madhi ke damma di Mudhari."
        ),
        DictionaryEntry(
            id = "kataba",
            fa = "ك", ain = "ت", lam = "ب",
            translation = "Menulis",
            babNum = 1,
            masdar = "كِتَابَةً",
            notes = "Fi'il Shohih. Pola Bab 1 (فَعَلَ - يَفْعُلُ). Contoh mutawatir yang sangat sering dipakai dalam pembelajaran bahasa Arab tsulatsi mujarrad."
        ),
        DictionaryEntry(
            id = "dharaba",
            fa = "ض", ain = "ر", lam = "ب",
            translation = "Memukul / Mengetuk",
            babNum = 2,
            notes = "Fi'il Shohih. Bab 2 (فَعَلَ - يَفْعِلُ). Perubahan 'Ain harakah fatha ke kasra (fathul-kasri)."
        ),
        DictionaryEntry(
            id = "jalasa",
            fa = "ج", ain = "ل", lam = "س",
            translation = "Duduk",
            babNum = 2,
            masdar = "جُلُوسًا",
            notes = "Fi'il Shohih. Bab 2 (فَعَلَ - يَفْعِلُ). Kata kerja lazim (intransitif) yang sangat mendasar."
        ),
        DictionaryEntry(
            id = "fataha",
            fa = "ف", ain = "ت", lam = "ح",
            translation = "Membuka / Membebaskan",
            babNum = 3,
            notes = "Fi'il Shohih dengan huruf tenggorokan (Halaq) 'ح' sebagai Lam Fi'il. Bab 3 (فَعَلَ - يَفْتَحُ). Harakah 'Ain tetap fatha (fathatani)."
        ),
        DictionaryEntry(
            id = "alima",
            fa = "ع", ain = "ل", lam = "م",
            translation = "Mengetahui / Belajar",
            babNum = 4,
            masdar = "عِلْمًا",
            notes = "Fi'il Shohih. Bab 4 (فَعِلَ - يَفْعَلُ). Transisi harakah 'Ain dari kasra di Madhi ke fatha di Mudhari (kasrul-fathi)."
        ),
        DictionaryEntry(
            id = "hasuna",
            fa = "ح", ain = "س", lam = "ن",
            translation = "Menjadi Baik / Bagus",
            babNum = 5,
            masdar = "حُسْنًا",
            notes = "Fi'il Shohih. Bab 5 (فَعُلَ - يَشْرُفُ / يَفْعُلُ). Kata kerja pensifatan (Lazim) dengan harakah damma di kedua bentuk (dammudammi)."
        ),
        DictionaryEntry(
            id = "hasiba",
            fa = "ح", ain = "س", lam = "ب",
            translation = "Mengira / Menyangka",
            babNum = 6,
            notes = "Fi'il Shohih yang langka. Bab 6 (فَعِلَ - يَفْعِلُ). Mengalami perubahan kasra di kedua bentuk (kasratani)."
        ),
        DictionaryEntry(
            id = "qala",
            fa = "ق", ain = "و", lam = "ل",
            translation = "Berkata / Mengucapkan",
            babNum = 1,
            notes = "Fi'il Ajwaf Wawi (huruf penyakit 'و' di tengah). Mengalami I'ilal pemindahan harakah dan penggantian huruf menjadi Alif pada Madhi: قَوَلَ -> قَالَ."
        ),
        DictionaryEntry(
            id = "baa",
            fa = "ب", ain = "ي", lam = "ع",
            translation = "Menjual",
            babNum = 2,
            notes = "Fi'il Ajwaf Ya'i (huruf penyakit 'ي' di tengah). Mengalami I'ilal penggantian huruf menjadi Alif pada Madhi: بَيَعَ -> بَاعَ, dan kasra pada Mudhari: يَبْيِعُ -> يَبِيعُ."
        ),
        DictionaryEntry(
            id = "khafa",
            fa = "خ", ain = "و", lam = "ف",
            translation = "Takut / Khawatir",
            babNum = 4,
            masdar = "خَوْفًا",
            notes = "Fi'il Ajwaf Wawi. Pola Bab 4 (فَعِلَ - يَفْعَلُ). Menjadi خَافَ - يَخَافُ. Terjadi pembuangan huruf lemah saat sukun bertemu pada tasrif lughowi (mulai dari khifna)."
        ),
        DictionaryEntry(
            id = "daa",
            fa = "د", ain = "ع", lam = "و",
            translation = "Berdoa / Mengajak / Menyeru",
            babNum = 1,
            masdar = "دُعَاءً",
            notes = "Fi'il Naqis Wawi (huruf lemah 'و' di akhir). Mengalami pergantian akhir menjadi Alif Tegak pada Madhi: دَعَعَ -> دَعَا, dan tetap di Mudhari: يَدْعُو."
        ),
        DictionaryEntry(
            id = "rama",
            fa = "ر", ain = "م", lam = "ي",
            translation = "Melempar",
            babNum = 2,
            notes = "Fi'il Naqis Ya'i (huruf lemah 'ي' di akhir). Akhiran menjadi Alif Layyinah/Maqshurah pada Madhi: رَمَيَ -> رَمَى."
        ),
        DictionaryEntry(
            id = "radhiya",
            fa = "ر", ain = "ض", lam = "ي",
            translation = "Ridha / Puas / Setuju",
            babNum = 4,
            notes = "Fi'il Naqis Ya'i. Bab 4 (فَعِلَ - يَفْعَلُ). Bentuknya رَضِيَ - يَرْضَى. Akhiran Mudhari berupa Alif Maqshurah."
        ),
        DictionaryEntry(
            id = "waada",
            fa = "و", ain = "ع", lam = "د",
            translation = "Berjanji / Mengancam",
            babNum = 2,
            notes = "Fi'il Mitsal Wawi (huruf lemah 'و' di depan). Mengalami pembuangan Waw pada Mudhari karena berada di antara Fatha dan Kasra: يَوْعِدُ -> يَعِدُ."
        ),
        DictionaryEntry(
            id = "madda",
            fa = "م", ain = "د", lam = "د",
            translation = "Memperpanjang / Membentangkan",
            babNum = 1,
            notes = "Fi'il Mudho'af (huruf kedua dan ketiga sama). Mengalami Idgham (peleburan/tasydid): مَدَدَ -> مَدَّ, يَمْدُدُ -> يَمُدُّ. Tasrif lughowi memecah tasydid dari hunna ke bawah."
        )
    )

    val WAZAN_TEMPLATES = mapOf(
        1 to DataWazan("ف", "ع", "ل", "فَعَلَ", "يَفْعُلُ", "فَعْلًا"),
        2 to DataWazan("ف", "ع", "ل", "فَعَلَ", "يَفْعِلُ", "فَعْلًا"),
        3 to DataWazan("ف", "ع", "ل", "فَعَلَ", "يَفْتَحُ", "فَعْلًا"),
        4 to DataWazan("ف", "ع", "ل", "فَعِلَ", "يَفْعَلُ", "فَعْلًا"),
        5 to DataWazan("ف", "ع", "ل", "فَعُلَ", "يَفْعُلُ", "فَعْلًا"),
        6 to DataWazan("ف", "ع", "ل", "فَعِلَ", "يَفْعِلُ", "فَعْلًا")
    )
}
