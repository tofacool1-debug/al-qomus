package com.kamus.shorofiilal

import android.content.Context
import org.json.JSONArray
import org.json.JSONObject
import java.io.File

object DatabaseHelper {
    private const val FILE_NAME = "favorites_db.json"

    fun loadFavorites(context: Context): List<DictionaryEntry> {
        val file = File(context.filesDir, FILE_NAME)
        if (!file.exists()) {
            val initial = listOf(
                DictionaryEntry(
                    id = "fav-nasara",
                    fa = "ن", ain = "ص", lam = "ر",
                    translation = "Menolong (Akar Shohih)",
                    babNum = 1,
                    notes = "Tersimpan otomatis sebagai percontohan.",
                    custom = false
                )
            )
            saveFavorites(context, initial)
            return initial
        }
        return try {
            val content = file.readText()
            val list = mutableListOf<DictionaryEntry>()
            val array = JSONArray(content)
            for (i in 0 until array.length()) {
                val obj = array.getJSONObject(i)
                val id = obj.optString("id", "fav-${System.currentTimeMillis()}-$i")
                val fa = obj.optString("fa", "")
                val ain = obj.optString("ain", "")
                val lam = obj.optString("lam", "")
                val translation = obj.optString("translation", "Tanpa terjemah")
                val babNum = obj.optInt("babNum", 1)
                val masdar = obj.optString("masdar", "")
                val notes = obj.optString("notes", "")
                val custom = obj.optBoolean("custom", false)
                val aiExp = obj.optString("aiExplanation", "")

                list.add(
                    DictionaryEntry(
                        id = id,
                        fa = fa, ain = ain, lam = lam,
                        translation = translation,
                        babNum = babNum,
                        masdar = if (masdar.isEmpty()) null else masdar,
                        notes = if (notes.isEmpty()) null else notes,
                        custom = custom,
                        aiExplanation = if (aiExp.isEmpty()) null else aiExp
                    )
                )
            }
            list
        } catch (e: Exception) {
            e.printStackTrace()
            emptyList()
        }
    }

    fun saveFavorites(context: Context, favorites: List<DictionaryEntry>) {
        try {
            val array = JSONArray()
            for (entry in favorites) {
                val obj = JSONObject()
                obj.put("id", entry.id)
                obj.put("fa", entry.fa)
                obj.put("ain", entry.ain)
                obj.put("lam", entry.lam)
                obj.put("translation", entry.translation)
                obj.put("babNum", entry.babNum)
                obj.put("masdar", entry.masdar ?: "")
                obj.put("notes", entry.notes ?: "")
                obj.put("custom", entry.custom)
                obj.put("aiExplanation", entry.aiExplanation ?: "")
                array.put(obj)
            }
            val file = File(context.filesDir, FILE_NAME)
            file.writeText(array.toString(2))
        } catch (e: Exception) {
            e.printStackTrace()
        }
    }
}
