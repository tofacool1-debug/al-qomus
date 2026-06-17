package com.kamus.shorofiilal

object IilalEngine {
    const val FATHA = "\u064e"
    const val DAMMA = "\u064f"
    const val KASRA = "\u0650"
    const val SUKUN = "\u0652"
    const val SHADDA = "\u0651"
    const val TANWIN_DAMMA = "\u064c"
    const val TANWIN_KASRA = "\u064d"

    fun replaceRoot(pattern: String, fa: String, ain: String, lam: String): String {
        return pattern
            .replace("ف", "__FA__")
            .replace("ع", "__AIN__")
            .replace("ل", "__LAM__")
            .replace("__FA__", fa)
            .replace("__AIN__", ain)
            .replace("__LAM__", lam)
    }

    fun detectBina(fa: String, ain: String, lam: String): String {
        val isFaWeak = listOf("و", "ي").contains(fa)
        val isAinWeak = listOf("و", "ي").contains(ain)
        val isLamWeak = listOf("و", "ي").contains(lam)

        val isFaHamzah = listOf("أ", "ء", "إ", "آ").contains(fa)
        val isAinHamzah = listOf("أ", "ء", "ئ", "ؤ").contains(ain)
        val isLamHamzah = listOf("أ", "ء", "ئ", "ؤ", "أ").contains(lam)

        if (isFaWeak && isLamWeak) return "Lafif Mafruq"
        if (isAinWeak && isLamWeak) return "Lafif Maqrun"
        if (isFaWeak) return "Mitsal"
        if (isAinWeak) return "Ajwaf"
        if (isLamWeak) return "Naqis"
        if (ain == lam && !isAinWeak && !isAinHamzah) return "Mudho'af"
        if (isFaHamzah) return "Mahmuz Fa"
        if (isAinHamzah) return "Mahmuz 'Ain"
        if (isLamHamzah) return "Mahmuz Lam"
        return "Shohih"
    }

    fun applyIilalMadhi(fa: String, ain: String, lam: String, bina: String): String {
        val ashl = "$fa$FATHA$ain$FATHA$lam$FATHA"
        if (bina == "Ajwaf") {
            return ashl.replace("وَ", "َا").replace("يَ", "َا")
        }
        if (bina == "Naqis" || bina == "Lafif Maqrun" || bina == "Lafif Mafruq") {
            return if (lam == "و") {
                ashl.replace("وَ", "َا")
            } else {
                ashl.replace("يَ", "َى")
            }
        }
        if (bina == "Mudho'af") {
            return "$fa$FATHA$ain$SHADDA$FATHA"
        }
        return ashl
    }

    fun applyIilalMudhari(fa: String, ain: String, lam: String, bina: String, wazanMudhari: String): String {
        var ashl = replaceRoot(wazanMudhari, fa, ain, lam)

        if (bina == "Ajwaf") {
            if (ain == "و") {
                if (wazanMudhari.contains("ع$DAMMA") || wazanMudhari.contains("يَفْعُلُ")) {
                    ashl = ashl.replace("ْو$DAMMA", "ُو")
                } else if (wazanMudhari.contains("ع$FATHA") || wazanMudhari.contains("يَفْعَلُ")) {
                    ashl = ashl.replace("ْو$FATHA", "َا")
                }
            } else if (ain == "ي") {
                if (wazanMudhari.contains("ع$KASRA") || wazanMudhari.contains("يَفْعِلُ")) {
                    ashl = ashl.replace("ْي$KASRA", "ِي")
                } else if (wazanMudhari.contains("ع$FATHA") || wazanMudhari.contains("يَفْعَلُ")) {
                    ashl = ashl.replace("ْي$FATHA", "َا")
                }
            }
            ashl = ashl.replace("وْ", FATHA).replace("ي", KASRA)
        } else if (bina == "Naqis" || bina == "Lafif Maqrun") {
            if (wazanMudhari.contains("ع$FATHA") || wazanMudhari.contains("يَفْعَلُ")) {
                ashl = ashl.replace("[وي]$DAMMA$".toRegex(), "َى").replace("[وي]$FATHA$".toRegex(), "َى")
            } else {
                if (lam == "و") {
                    ashl = ashl.replace("و$DAMMA", "ُو")
                } else if (lam == "ي") {
                    ashl = ashl.replace("ي$DAMMA", "ِي")
                }
                ashl = ashl.replace("وُ", "ُو").replace("يُ", "ِي")
            }
        } else if (bina == "Mitsal") {
            if (fa == "و" && (wazanMudhari.contains("ع$KASRA") || wazanMudhari.contains("يَفْعِلُ"))) {
                ashl = ashl.replace("يَوْ", "يَ").replace("تَوْ", "تَ")
            }
        } else if (bina == "Lafif Mafruq") {
            if (fa == "و" && (wazanMudhari.contains("ع$KASRA") || wazanMudhari.contains("يَفْعِلُ"))) {
                ashl = ashl.replace("يَوْ", "يَ").replace("تَوْ", "تَ")
            }
            if (wazanMudhari.contains("ع$FATHA") || wazanMudhari.contains("يَفْعَلُ")) {
                ashl = ashl.replace("[وي]$DAMMA$".toRegex(), "َى").replace("[وي]$FATHA$".toRegex(), "َى")
            } else {
                if (lam == "و") {
                    ashl = ashl.replace("و$DAMMA", "ُو")
                } else if (lam == "ي") {
                    ashl = ashl.replace("ي$DAMMA", "ِي")
                }
                ashl = ashl.replace("وُ", "ُو").replace("يُ", "ِي")
            }
        } else if (bina == "Mudho'af") {
            if (wazanMudhari.contains("ع$DAMMA") || wazanMudhari.contains("يَفْعُلُ")) {
                ashl = "يَ$fa$DAMMA$ain$SHADDA$DAMMA"
            } else if (wazanMudhari.contains("ع$KASRA") || wazanMudhari.contains("يَفْعِلُ")) {
                ashl = "يَ$fa$KASRA$ain$SHADDA$DAMMA"
            } else {
                ashl = "يَ$fa$FATHA$ain$SHADDA$DAMMA"
            }
        }
        return ashl
    }

    fun applyIilalAmar(fa: String, ain: String, lam: String, bina: String, wazanMudhari: String): String {
        val mudhari = applyIilalMudhari(fa, ain, lam, bina, wazanMudhari)
        var base = mudhari.replace("^يَ".toRegex(), "").replace("^يُ".toRegex(), "")

        if (base.startsWith(SUKUN) || base.startsWith("$fa$SUKUN") || (base.length > 1 && base[1].toString() == SUKUN)) {
            val vowelChar = if (wazanMudhari.contains("ع$DAMMA") || wazanMudhari.contains("يَفْعُلُ")) "ا$DAMMA" else "ا$KASRA"
            base = vowelChar + base
        }

        if (bina == "Naqis" || bina == "Lafif Maqrun" || bina == "Lafif Mafruq") {
            base = base.substring(0, maxOf(0, base.length - 2))
        } else if (bina == "Mudho'af") {
            base = base.replace("$DAMMA$".toRegex(), FATHA)
        } else {
            base = base.replace("$DAMMA$".toRegex(), SUKUN)
            if (bina == "Ajwaf") {
                base = base.replace("ُو$lam$SUKUN", "ُ$lam$SUKUN").replace("ِي$lam$SUKUN", "ِ$lam$SUKUN")
            }
        }
        return base
    }

    fun applyIilalNahi(fa: String, ain: String, lam: String, bina: String, wazanMudhari: String): String {
        val mudhari = applyIilalMudhari(fa, ain, lam, bina, wazanMudhari)
        var base = mudhari.replace("^يَ".toRegex(), "تَ").replace("^يُ".toRegex(), "تُ")

        if (bina == "Naqis" || bina == "Lafif Maqrun" || bina == "Lafif Mafruq") {
            base = base.replace("[ويى]$".toRegex(), "")
        } else if (bina == "Mudho'af") {
            base = base.replace("$DAMMA$".toRegex(), FATHA)
        } else if (bina == "Ajwaf") {
            base = base.replace("$DAMMA$".toRegex(), SUKUN)
            base = base.replace("ُو$lam$SUKUN", "ُ$lam$SUKUN")
                .replace("ِي$lam$SUKUN", "ِ$lam$SUKUN")
                .replace("َا$lam$SUKUN", "َ$lam$SUKUN")
        } else {
            base = base.replace("$DAMMA$".toRegex(), SUKUN)
        }
        return "لَا $base"
    }

    fun buatIsimFail(fa: String, ain: String, lam: String, bina: String): String {
        var word = replaceRoot("فَاعِلٌ", fa, ain, lam)
        if (bina == "Ajwaf") {
            word = word.replace("او", "ائ").replace("اي", "ائ")
        } else if (bina == "Naqis" || bina == "Lafif Maqrun" || bina == "Lafif Mafruq") {
            word = "$fa\u064e\u0627$ain\u0650\u064d" // e.g., دَاعٍ
        } else if (bina == "Mudho'af") {
            word = "${fa}َادٌّ"
        }

        if (fa == "أ" || fa == "ء") {
            word = word.replace("أَا", "آ").replace("ءَا", "آ")
        }
        return word
    }

    fun buatIsimMaful(fa: String, ain: String, lam: String, bina: String): String {
        var word = replaceRoot("مَفْعُولٌ", fa, ain, lam)
        if (bina == "Ajwaf") {
            if (ain == "و") {
                word = word.replace("ْوُو", "ُو")
            } else {
                word = word.replace("ْيُو", "ِي")
            }
        } else if (bina == "Naqis" || bina == "Lafif Maqrun" || bina == "Lafif Mafruq") {
            if (lam == "و") {
                word = word.replace("ُوّ", "ُوٌّ").replace("ُوو", "ُوّ")
            } else {
                word = word.replace("ُويٌ", "ِيٌّ").replace("ُوِيٌ", "ِيٌّ")
            }
        }
        return word
    }

    fun buatIsimMusyabihat(fa: String, ain: String, lam: String, bina: String): String {
        return replaceRoot("فَعِيلٌ", fa, ain, lam)
    }

    fun buatMubalaghohFaal(fa: String, ain: String, lam: String, bina: String): String {
        return replaceRoot("فَعَّالٌ", fa, ain, lam)
    }

    fun buatMubalaghohFa_il(fa: String, ain: String, lam: String, bina: String): String {
        return replaceRoot("فَعِيلٌ", fa, ain, lam)
    }

    fun buatMubalaghohMifal(fa: String, ain: String, lam: String, bina: String): String {
        return replaceRoot("مِفْعَالٌ", fa, ain, lam)
    }

    fun buatIsimZamanMakan(fa: String, ain: String, lam: String, bina: String, wazanMudhari: String, jenis: String): String {
        val isKasraMudhari = wazanMudhari.contains(KASRA) || wazanMudhari.contains("ع$KASRA") || wazanMudhari.contains("يَفْعِلُ")
        val pattern = if (isKasraMudhari || (fa == "و" && bina == "Mitsal")) "مَفْعِلٌ" else "مَفْعَلٌ"
        var word = replaceRoot(pattern, fa, ain, lam)
        if (bina == "Naqis" || bina == "Lafif Maqrun" || bina == "Lafif Mafruq") {
            word = "مَ$faْ${ain}َى"
        } else if (bina == "Mudho'af") {
            word = "مَ$fa$FATHA$ain$SHADDA$TANWIN_DAMMA"
        } else if (bina == "Ajwaf") {
            word = "مَ${fa}َافٌ".replace("ف", lam)
        }
        return word
    }

    fun buatIsimAlat(fa: String, ain: String, lam: String, bina: String, wazanMadhi: String): String {
        var word = replaceRoot("مِفْعَالٌ", fa, ain, lam)
        if (bina == "Naqis" || bina == "Lafif Maqrun" || bina == "Lafif Mafruq") {
            word = "مِ$faْ${ain}َاةٌ"
        } else if (bina == "Mudho'af") {
            word = "مِ$fa$FATHA$ain$SHADDA$TANWIN_DAMMA"
        }
        return word
    }

    fun buatIsimTafdhil(fa: String, ain: String, lam: String, bina: String, wazanMadhi: String): List<String> {
        if (!wazanMadhi.startsWith("فَعَلَ") && !wazanMadhi.startsWith("فَعِلَ")) {
            return listOf("", "", "")
        }
        var muzakkarIilal = "أَ$faْ${ain}َ${lam}ُ"

        if (bina == "Ajwaf") {
            muzakkarIilal = if (ain == "و") "أَقْوَى" else "أَبْيَى"
            if (fa == "ق" && lam == "ل") muzakkarIilal = "أَقْوَلُ"
        } else if (bina == "Naqis" || bina == "Lafif Maqrun" || bina == "Lafif Mafruq") {
            muzakkarIilal = "أَ$faْ${ain}َى"
        } else if (bina == "Mudho'af") {
            muzakkarIilal = "أَ$fa$FATHA$ain$SHADDA$DAMMA"
        }

        val muannats = replaceRoot("فُعْلَى", fa, ain, lam)
        val jamak = muzakkarIilal.replace("$DAMMA$".toRegex(), "ُونَ")

        return listOf(muzakkarIilal, muannats, jamak)
    }

    fun buatIsimMarrah(fa: String, ain: String, lam: String, bina: String): String {
        var word = "$fa\u064e${ain}\u0652${lam}\u064e\u062a\u064c"
        if (bina == "Ajwaf") {
            word = "${fa}َوْلَةٌ".replace("و", ain).replace("ل", lam)
        } else if (bina == "Naqis" || bina == "Lafif Maqrun" || bina == "Lafif Mafruq") {
            word = "$fa\u064e${ain}\u0652وْوَةٌ".replace("و", if (lam == "ي") "ي" else "و")
        } else if (bina == "Mudho'af") {
            word = "$fa\u064e$ain$SHADDA\u064e\u062a\u064c"
        }
        return word
    }

    fun buatIsimNau(fa: String, ain: String, lam: String, bina: String): String {
        var word = "$fa\u0650${ain}\u0652${lam}\u064e\u062a\u064c"
        if (bina == "Ajwaf") {
            word = "${fa}ِيْلَةٌ".replace("ي", if (ain == "و") "و" else "ي").replace("ل", lam)
        } else if (bina == "Naqis" || bina == "Lafif Maqrun" || bina == "Lafif Mafruq") {
            word = "$fa\u0650${ain}\u0652يَةٌ".replace("ي", if (lam == "و") "و" else "ي")
        } else if (bina == "Mudho'af") {
            word = "$fa\u0650$ain$SHADDA\u064e\u062a\u064c"
        }
        return word
    }

    fun buatMasdar23(fa: String, ain: String, lam: String, wazanMadhi: String, bina: String): List<String> {
        val base = { w: String -> replaceRoot(w, fa, ain, lam) }
        val list = mutableListOf<String>()
        list.add(base("فَعْلٌ"))
        list.add(base("فِعْلٌ"))
        list.add(base("فُعْلٌ"))
        list.add(base("فَعَلَانٌ"))
        list.add(base("فَعَلَانَةٌ"))
        list.add(base("فُعَالٌ"))
        list.add(base("فِعَالٌ"))
        list.add(base("فَعَلَةٌ"))
        list.add(base("فَعَالَةٌ"))
        list.add(base("فِعَالَةٌ"))
        list.add(base("فُعُولَةٌ"))
        list.add(base("فَعِيلٌ"))
        list.add(base("فُعُولٌ"))
        list.add(base("فَعَلَانٌ"))
        list.add(base("فَعَلَاتٌ"))
        list.add(base("مَفْعَلَةٌ"))
        list.add(base("فَعْلَةٌ"))
        list.add(base("فِعْلَةٌ"))
        list.add(base("تَفْعِلٌ"))
        list.add(base("تَفْعَالٌ"))
        list.add(base("فُعْلَى"))
        list.add(base("فَعْلِيٌّ"))
        list.add(base("فُعْلَانٌ"))

        return list.map {
            var word = it
            if (bina == "Naqis") {
                word = word.replace("وٌ", "وٌ").replace("يٌ", "يٌ")
            }
            word
        }
    }

    fun buatJamakTaksir(mufrod: String, fa: String, ain: String, lam: String, wazanMufrod: String, bina: String): List<String> {
        val base = { w: String -> replaceRoot(w, fa, ain, lam) }
        val cleanWazan = wazanMufrod.replace("[^\u0600-\u06FF]".toRegex(), "")
        if (cleanWazan.contains("فَاعِل")) {
            return listOf(base("فُعَّالٌ"), base("فَعَلَةٌ"), base("فَعْلَى"), base("فُعَلَاءُ"))
        }
        if (cleanWazan.contains("مَفْعُول")) {
            return listOf(base("مَفَاعِيلُ"), base("فُعُلٌ"), base("فِعَالٌ"))
        }
        if (cleanWazan.contains("فَعِيل")) {
            return listOf(base("فُعَلَاءُ"), base("فِعَالٌ"), base("فَعْلَى"))
        }
        if (cleanWazan.contains("فَعَّال")) {
            return listOf(base("فَعَّالُونَ"))
        }
        if (cleanWazan.contains("مَفْعَل")) {
            return listOf(base("مَفَاعِلُ"), base("فُعُولٌ"))
        }
        if (cleanWazan.contains("مِفْعَال")) {
            return listOf(base("مَفَاعِيلُ"), base("فَعَالِلُ"))
        }
        return emptyList()
    }

    fun buatMuntahalJumu(mufrod: String, fa: String, ain: String, lam: String, wazanMufrod: String): List<String> {
        val base = { w: String -> replaceRoot(w, fa, ain, lam) }
        val length = mufrod.replace("[\u064b-\u0652]".toRegex(), "").length
        val cleanWazan = wazanMufrod.replace("[^\u0600-\u06FF]".toRegex(), "")

        if (length >= 4) {
            if (cleanWazan.contains("مَفْعَل") || cleanWazan.contains("مِفْعَال")) {
                return listOf(base("مَفَاعِلُ"), base("مَفَاعِيلُ"))
            }
            if (cleanWazan.contains("فَاعِل")) {
                return listOf(base("فَوَاعِلُ"), base("فَوَاعِيلُ"))
            }
        }
        return emptyList()
    }

    fun buatShighotDetail(mufrod: String, fa: String, ain: String, lam: String, wazanMufrod: String, bina: String): ShighotDetail {
        val jamak = buatJamakTaksir(mufrod, fa, ain, lam, wazanMufrod, bina)
        val muntahal = buatMuntahalJumu(mufrod, fa, ain, lam, wazanMufrod)
        return ShighotDetail(mufrod, jamak, muntahal)
    }

    fun tasrifIstilahiCustom(dataWazan: DataWazan): TasrifIstilahi {
        val fa = dataWazan.fa
        val ain = dataWazan.ain
        val lam = dataWazan.lam
        val wazanMadhi = dataWazan.wazanMadhi
        val wazanMudhari = dataWazan.wazanMudhari
        val masdar = dataWazan.masdar

        val bina = detectBina(fa, ain, lam)

        val tafdhil = buatIsimTafdhil(fa, ain, lam, bina, wazanMadhi)
        val marrah = buatIsimMarrah(fa, ain, lam, bina)
        val nau = buatIsimNau(fa, ain, lam, bina)
        val masdar23 = buatMasdar23(fa, ain, lam, wazanMadhi, bina)

        val madhi = applyIilalMadhi(fa, ain, lam, bina)
        val mudhari = applyIilalMudhari(fa, ain, lam, bina, wazanMudhari)
        val amar = applyIilalAmar(fa, ain, lam, bina, wazanMudhari)
        val nahi = applyIilalNahi(fa, ain, lam, bina, wazanMudhari)

        val isimFailMufrod = buatIsimFail(fa, ain, lam, bina)
        val isimMafulMufrod = buatIsimMaful(fa, ain, lam, bina)
        val isimMusyabihatMufrod = buatIsimMusyabihat(fa, ain, lam, bina)
        val mubalaghohFaalMufrod = buatMubalaghohFaal(fa, ain, lam, bina)
        val mubalaghohFa_ilMufrod = buatMubalaghohFa_il(fa, ain, lam, bina)
        val mubalaghohMifalMufrod = buatMubalaghohMifal(fa, ain, lam, bina)
        val isimZamanMufrod = buatIsimZamanMakan(fa, ain, lam, bina, wazanMudhari, "zaman")
        val isimMakanMufrod = buatIsimZamanMakan(fa, ain, lam, bina, wazanMudhari, "makan")
        val isimAlatMufrod = buatIsimAlat(fa, ain, lam, bina, wazanMadhi)

        return TasrifIstilahi(
            madhi = madhi,
            mudhari = mudhari,
            masdar = replaceRoot(masdar, fa, ain, lam),
            masdar23 = masdar23,
            isimFail = buatShighotDetail(isimFailMufrod, fa, ain, lam, "فَاعِلٌ", bina),
            isimMaful = buatShighotDetail(isimMafulMufrod, fa, ain, lam, "مَفْعُولٌ", bina),
            isimMusyabihat = buatShighotDetail(isimMusyabihatMufrod, fa, ain, lam, "فَعِيلٌ", bina),
            mubalaghohFaal = buatShighotDetail(mubalaghohFaalMufrod, fa, ain, lam, "فَعَّالٌ", bina),
            mubalaghohFa_il = buatShighotDetail(mubalaghohFa_ilMufrod, fa, ain, lam, "فَعِيلٌ", bina),
            mubalaghohMifal = buatShighotDetail(mubalaghohMifalMufrod, fa, ain, lam, "مِفْعَالٌ", bina),
            amar = amar,
            nahi = nahi,
            isimZaman = buatShighotDetail(isimZamanMufrod, fa, ain, lam, "مَفْعَلٌ", bina),
            isimMakan = buatShighotDetail(isimMakanMufrod, fa, ain, lam, "مَفْعَلٌ", bina),
            isimAlat = buatShighotDetail(isimAlatMufrod, fa, ain, lam, "مِفْعَالٌ", bina),
            tafdhilMuzakkar = tafdhil[0],
            tafdhilMuannats = tafdhil[1],
            tafdhilJamak = tafdhil[2],
            marrah = marrah,
            nau = nau
        )
    }

    fun tasrifLughowi(tasrif: TasrifIstilahi, fa: String, ain: String, lam: String, bina: String): TasrifLughowi {
        val buildMadhi14 = { baseMadhi: String ->
            if (bina == "Mudho'af") {
                val rootMerged = baseMadhi
                val rootSplit = "$fa$FATHA$ain$SUKUN$lam"
                listOf(
                    rootMerged,
                    rootMerged + "َا",
                    rootMerged.replace(FATHA, DAMMA) + "ُوا",
                    rootMerged + "َتْ",
                    rootMerged + "َتَا",
                    rootSplit + "${FATHA}ْنَ",
                    rootSplit + "${FATHA}ْتَ",
                    rootSplit + "${FATHA}ْتُمَا",
                    rootSplit + "${FATHA}ْتُمْ",
                    rootSplit + "${FATHA}ْتِ",
                    rootSplit + "${FATHA}ْتُمَا",
                    rootSplit + "${FATHA}ْتُنَّ",
                    rootSplit + "${FATHA}ْتُ",
                    rootSplit + "${FATHA}ْنَا"
                )
            } else if (bina == "Naqis" || bina == "Lafif Maqrun" || bina == "Lafif Mafruq") {
                val weak = if (lam == "و") "و" else "ي"
                val rootSplit = "$fa$FATHA$ain$SUKUN$weak"
                listOf(
                    baseMadhi,
                    if (baseMadhi.endsWith("َى")) baseMadhi.substring(0, baseMadhi.length - 1) + "َيَا" else baseMadhi + "وَا",
                    baseMadhi.substring(0, baseMadhi.length - 1) + (if (weak == "و") "ُوا" else "ُوْا"),
                    baseMadhi.substring(0, baseMadhi.length - 1) + "َتْ",
                    baseMadhi.substring(0, baseMadhi.length - 1) + "َتَا",
                    rootSplit + "${FATHA}ْنَ",
                    rootSplit + "${FATHA}ْتَ",
                    rootSplit + "${FATHA}ْتُمَا",
                    rootSplit + "${FATHA}ْتُمْ",
                    rootSplit + "${FATHA}ْتِ",
                    rootSplit + "${FATHA}ْتُمَا",
                    rootSplit + "${FATHA}ْتُنَّ",
                    rootSplit + "${FATHA}ْتُ",
                    rootSplit + "${FATHA}ْنَا"
                )
            } else if (bina == "Ajwaf") {
                val leadVowel = if (ain == "و" && fa == "ق") DAMMA else KASRA
                val shortRoot = "$fa$leadVowel$lam"
                listOf(
                    baseMadhi,
                    baseMadhi + "ا",
                    baseMadhi.replace("َا", "ُ") + "وا",
                    baseMadhi + "تْ",
                    baseMadhi + "تَا",
                    shortRoot + "${SUKUN}ْنَ",
                    shortRoot + "${SUKUN}ْتَ",
                    shortRoot + "${SUKUN}ْتُمَا",
                    shortRoot + "${SUKUN}ْتُمْ",
                    shortRoot + "${SUKUN}ْتِ",
                    shortRoot + "${SUKUN}ْتُمَا",
                    shortRoot + "${SUKUN}ْتُنَّ",
                    shortRoot + "${SUKUN}ْتُ",
                    shortRoot + "${SUKUN}ْنَا"
                )
            } else {
                val stem = "$fa$FATHA$ain$FATHA$lam"
                listOf(
                    stem + FATHA,
                    stem + "َا",
                    stem + DAMMA + "وا",
                    stem + FATHA + "تْ",
                    stem + FATHA + "تَا",
                    stem + SUKUN + "ْنَ",
                    stem + SUKUN + "ْتَ",
                    stem + SUKUN + "ْتُمَا",
                    stem + SUKUN + "ْتُمْ",
                    stem + SUKUN + "ْتِ",
                    stem + SUKUN + "ْتُمَا",
                    stem + SUKUN + "ْتُنَّ",
                    stem + SUKUN + "ْتُ",
                    stem + SUKUN + "ْنَا"
                )
            }
        }

        val buildMudhari14 = { baseMudhari: String ->
            if (bina == "Mudho'af") {
                val prefix = "يَ"
                val tPrefix = "تَ"
                val aPrefix = "أَ"
                val nPrefix = "نَ"
                val stem = "$fa$DAMMA$ain$SHADDA"
                listOf(
                    prefix + stem + DAMMA,
                    prefix + stem + FATHA + "انِ",
                    prefix + stem + DAMMA + "ونَ",
                    tPrefix + stem + DAMMA,
                    tPrefix + stem + FATHA + "انِ",
                    prefix + "$fa$DAMMA$ain$SUKUN$lam${FATHA}ْنَ",
                    tPrefix + stem + DAMMA,
                    tPrefix + stem + FATHA + "انِ",
                    tPrefix + stem + DAMMA + "ونَ",
                    tPrefix + stem + KASRA + "ينَ",
                    tPrefix + stem + FATHA + "انِ",
                    tPrefix + "$fa$DAMMA$ain$SUKUN$lam${FATHA}ْنَ",
                    aPrefix + stem + DAMMA,
                    nPrefix + stem + DAMMA
                )
            } else if (bina == "Naqis" || bina == "Lafif Maqrun" || bina == "Lafif Mafruq") {
                val endsWithWaw = baseMudhari.endsWith("و") || baseMudhari.endsWith("و$DAMMA") || baseMudhari.endsWith("ُو")
                val endsWithAlif = baseMudhari.endsWith("ى") || baseMudhari.endsWith("َى")

                val prefixVowel = baseMudhari.getOrNull(1)?.toString() ?: FATHA
                val prefY = "ي$prefixVowel"
                val prefT = "ت$prefixVowel"
                val prefA = "أ$prefixVowel"
                val prefN = "ن$prefixVowel"

                val stemBody = "$fa$SUKUN$ain"

                if (endsWithWaw) {
                    listOf(
                        prefY + stemBody + DAMMA + "و",
                        prefY + stemBody + DAMMA + "وَانِ",
                        prefY + stemBody + DAMMA + "ونَ",
                        prefT + stemBody + DAMMA + "و",
                        prefT + stemBody + DAMMA + "وَانِ",
                        prefY + stemBody + DAMMA + "و" + SUKUN + "nَ",
                        prefT + stemBody + DAMMA + "و",
                        prefT + stemBody + DAMMA + "وَانِ",
                        prefT + stemBody + DAMMA + "ونَ",
                        prefT + stemBody + KASRA + "ينَ",
                        prefT + stemBody + DAMMA + "وَانِ",
                        prefT + stemBody + DAMMA + "و" + SUKUN + "nَ",
                        prefA + stemBody + DAMMA + "و",
                        prefN + stemBody + DAMMA + "و"
                    )
                } else if (endsWithAlif) {
                    listOf(
                        prefY + stemBody + FATHA + "ى",
                        prefY + stemBody + FATHA + "يَانِ",
                        prefY + stemBody + FATHA + "وْنَ",
                        prefT + stemBody + FATHA + "ى",
                        prefT + stemBody + FATHA + "يَانِ",
                        prefY + stemBody + FATHA + "يْنَ",
                        prefT + stemBody + FATHA + "ى",
                        prefT + stemBody + FATHA + "يَانِ",
                        prefT + stemBody + FATHA + "وْنَ",
                        prefT + stemBody + FATHA + "يْنَ",
                        prefT + stemBody + FATHA + "يَانِ",
                        prefT + stemBody + FATHA + "يْنَ",
                        prefA + stemBody + FATHA + "ى",
                        prefN + stemBody + FATHA + "ى"
                    )
                } else {
                    listOf(
                        prefY + stemBody + KASRA + "ي",
                        prefY + stemBody + KASRA + "يَانِ",
                        prefY + stemBody + DAMMA + "ونَ",
                        prefT + stemBody + KASRA + "ي",
                        prefT + stemBody + KASRA + "يَانِ",
                        prefY + stemBody + KASRA + "يْنَ",
                        prefT + stemBody + KASRA + "ي",
                        prefT + stemBody + KASRA + "يَانِ",
                        prefT + stemBody + DAMMA + "ونَ",
                        prefT + stemBody + KASRA + "ينَ",
                        prefT + stemBody + KASRA + "يَانِ",
                        prefT + stemBody + KASRA + "يْنَ",
                        prefA + stemBody + KASRA + "ي",
                        prefN + stemBody + KASRA + "ي"
                    )
                }
            } else {
                val prefY = baseMudhari.getOrNull(0).toString() + baseMudhari.getOrNull(1).toString()
                val prefT = prefY.replace("ي", "t")
                val prefA = prefY.replace("ي", "أ")
                val prefN = prefY.replace("ي", "ن")

                val baseBody = baseMudhari.substring(2, baseMudhari.length - 1)

                listOf(
                    prefY + baseBody + DAMMA,
                    prefY + baseBody + FATHA + "انِ",
                    prefY + baseBody + DAMMA + "ونَ",
                    prefT + baseBody + DAMMA,
                    prefT + baseBody + FATHA + "انِ",
                    prefY + baseBody + SUKUN + "ْنَ",
                    prefT + baseBody + DAMMA,
                    prefT + baseBody + FATHA + "انِ",
                    prefT + baseBody + DAMMA + "ونَ",
                    prefT + baseBody + KASRA + "ينَ",
                    prefT + baseBody + FATHA + "انِ",
                    prefT + baseBody + SUKUN + "ْنَ",
                    prefA + baseBody + DAMMA,
                    prefN + baseBody + DAMMA
                )
            }
        }

        val mudhari14 = buildMudhari14(tasrif.mudhari)

        val makeMajzum = { verb: String, index: Int ->
            var v = verb
            if (index == 5 || index == 11) {
                v
            } else if (v.endsWith("انِ")) {
                v.replace("انِ", "ا")
            } else if (v.endsWith("ونَ")) {
                v.replace("ونَ", "وا")
            } else if (v.endsWith("ينَ")) {
                v.replace("ينَ", "ي")
            } else if (bina == "Naqis" || bina == "Lafif Maqrun" || bina == "Lafif Mafruq") {
                if (index == 0 || index == 3 || index == 6) {
                    v.replace("[ويى]$".toRegex(), "")
                } else v
            } else if (bina == "Ajwaf") {
                if (index == 0 || index == 3 || index == 6) {
                    if (v.contains("ُولُ")) {
                        v.replace("ُولُ", "ُلْ")
                    } else if (v.contains("ِيعُ")) {
                        v.replace("ِيعُ", "ِعْ")
                    } else if (v.contains("َافُ")) {
                        v.replace("َافُ", "َفْ")
                    } else {
                        v.replace("ُو", "ُ").replace("ِي", "ِ").replace("َا", "َ").replace("$DAMMA$".toRegex(), SUKUN)
                    }
                } else v
            } else if (bina == "Mudho'af") {
                if (index == 0 || index == 3 || index == 6) {
                    v.replace("$DAMMA$".toRegex(), FATHA)
                } else v
            } else {
                if (index == 0 || index == 3 || index == 6) {
                    v.replace("$DAMMA$".toRegex(), SUKUN)
                } else v
            }
        }

        val buildAmar6 = { baseAmar: String ->
            if (bina == "Naqis" || bina == "Lafif Maqrun" || bina == "Lafif Mafruq") {
                val weak = if (lam == "و") "و" else "ي"
                listOf(
                    baseAmar,
                    baseAmar + weak + "َا",
                    baseAmar + weak + "ُوا",
                    baseAmar + "ِي",
                    baseAmar + weak + "َا",
                    baseAmar + weak + "ْنَ"
                )
            } else if (bina == "Mudho'af") {
                val stem = baseAmar.substring(0, baseAmar.length - 1)
                val splitPrefix = "اُ$fa$SUKUN$ain$DAMMA$lam"
                listOf(
                    baseAmar,
                    stem + FATHA + "ا",
                    stem + DAMMA + "وا",
                    stem + KASRA + "ي",
                    stem + FATHA + "ا",
                    splitPrefix + SUKUN + "ْنَ"
                )
            } else if (bina == "Ajwaf") {
                val longVowel = if (ain == "و") "ُو" else "ِي"
                val longStem = baseAmar.replace(lam + SUKUN, "") + longVowel + lam
                listOf(
                    baseAmar,
                    longStem + FATHA + "ا",
                    longStem + DAMMA + "وا",
                    longStem + KASRA + "ي",
                    longStem + FATHA + "ا",
                    baseAmar + "ْنَ"
                )
            } else {
                val stemNoSukun = if (baseAmar.endsWith(SUKUN)) baseAmar.substring(0, baseAmar.length - 1) else baseAmar
                listOf(
                    baseAmar,
                    stemNoSukun + FATHA + "ا",
                    stemNoSukun + DAMMA + "وا",
                    stemNoSukun + KASRA + "ي",
                    stemNoSukun + FATHA + "ا",
                    stemNoSukun + SUKUN + "ْنَ"
                )
            }
        }

        val buildAmar12 = { baseAmar: String ->
            val amrGhoib = mudhari14.take(6).mapIndexed { idx, verb ->
                "لِ" + makeMajzum(verb, idx)
            }
            val amrMukhotob = buildAmar6(baseAmar)
            amrGhoib + amrMukhotob
        }

        val buildNahi12 = {
            mudhari14.take(12).mapIndexed { idx, verb ->
                "لَا " + makeMajzum(verb, idx)
            }
        }

        val tasrifIsim6 = { bentukMufrod: String ->
            if ((bina == "Naqis" || bina == "Lafif Maqrun" || bina == "Lafif Mafruq") && bentukMufrod.endsWith("ٍ")) {
                val baseIsim = "$fa\u064e${ain}\u0650"
                listOf(
                    bentukMufrod,
                    baseIsim + "يَانِ",
                    "$fa\u064e${ain}\u064fونَ",
                    baseIsim + "يَةٌ",
                    baseIsim + "يَتَانِ",
                    baseIsim + "يَاتٌ"
                )
            } else {
                val base = bentukMufrod.replace("[ًٌٍ]$".toRegex(), "")
                listOf(
                    bentukMufrod,
                    base + FATHA + "anِ",
                    base + DAMMA + "unَ",
                    base + FATHA + "ahٌ",
                    base + FATHA + "atَانِ",
                    base + FATHA + "atٌ"
                )
            }
        }

        val madhi14 = buildMadhi14(tasrif.madhi)
        val amar12 = buildAmar12(tasrif.amar)
        val nahi12 = buildNahi12()

        val isimFail6 = tasrifIsim6(tasrif.isimFail.mufrod)
        val isimMaful6 = tasrifIsim6(tasrif.isimMaful.mufrod)
        val isimZaman6 = tasrifIsim6(tasrif.isimZaman.mufrod)
        val isimMakan6 = tasrifIsim6(tasrif.isimMakan.mufrod)
        val isimAlat6 = tasrifIsim6(tasrif.isimAlat.mufrod)

        return TasrifLughowi(
            madhi14 = madhi14,
            mudhari14 = mudhari14,
            amar12 = amar12,
            nahi12 = nahi12,
            isimFail6 = isimFail6,
            isimMaful6 = isimMaful6,
            isimZaman6 = isimZaman6,
            isimMakan6 = isimMakan6,
            isimAlat6 = isimAlat6
        )
    }
}
