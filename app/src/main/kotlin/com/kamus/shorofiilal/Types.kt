package com.kamus.shorofiilal

data class DataWazan(
    val fa: String,
    val ain: String,
    val lam: String,
    val wazanMadhi: String,
    val wazanMudhari: String,
    val masdar: String
)

data class ShighotDetail(
    val mufrod: String,
    val jamak: List<String> = emptyList(),
    val muntahal: List<String> = emptyList()
)

data class TasrifIstilahi(
    val madhi: String,
    val mudhari: String,
    val masdar: String,
    val masdar23: List<String> = emptyList(),
    val isimFail: ShighotDetail,
    val isimMaful: ShighotDetail,
    val isimMusyabihat: ShighotDetail,
    val mubalaghohFaal: ShighotDetail,
    val mubalaghohFa_il: ShighotDetail,
    val mubalaghohMifal: ShighotDetail,
    val amar: String,
    val nahi: String,
    val isimZaman: ShighotDetail,
    val isimMakan: ShighotDetail,
    val isimAlat: ShighotDetail,
    val tafdhilMuzakkar: String,
    val tafdhilMuannats: String,
    val tafdhilJamak: String,
    val marrah: String,
    val nau: String
)

data class TasrifLughowi(
    val madhi14: List<String> = emptyList(),
    val mudhari14: List<String> = emptyList(),
    val amar12: List<String> = emptyList(),
    val nahi12: List<String> = emptyList(),
    val isimFail6: List<String> = emptyList(),
    val isimMaful6: List<String> = emptyList(),
    val isimZaman6: List<String> = emptyList(),
    val isimMakan6: List<String> = emptyList(),
    val isimAlat6: List<String> = emptyList()
)

data class DictionaryEntry(
    val id: String,
    val fa: String,
    val ain: String,
    val lam: String,
    val translation: String,
    val babNum: Int,
    val masdar: String? = null,
    val notes: String? = null,
    val custom: Boolean = false,
    val aiExplanation: String? = null
)
