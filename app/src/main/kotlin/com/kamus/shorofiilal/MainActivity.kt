package com.kamus.shorofiilal

import android.os.Bundle
import android.widget.Toast
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.compose.animation.*
import androidx.compose.foundation.*
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.LazyRow
import androidx.compose.foundation.lazy.items
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.*
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.font.FontFamily
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.text.style.TextDirection
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import org.json.JSONObject
import java.net.HttpURLConnection
import java.net.URL

class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContent {
            MaterialTheme(
                colorScheme = lightColorScheme(
                    primary = Color(0xFF10B981), // Emerald green
                    secondary = Color(0xFF4F46E5), // Indigo
                    background = Color(0xFFF8FAFC) // Light slate grey
                )
            ) {
                Surface(
                    modifier = Modifier.fillMaxSize(),
                    color = MaterialTheme.colorScheme.background
                ) {
                    KamusAppMain()
                }
            }
        }
    }
}

@OptIn(ExperimentalLayoutApi::class)
@Composable
fun KamusAppMain() {
    val context = androidx.compose.ui.platform.LocalContext.current

    // Active state loading preset
    var activeFa by remember { mutableStateOf("ن") }
    var activeAin by remember { mutableStateOf("ص") }
    var activeLam by remember { mutableStateOf("ر") }
    var activeBabNum by remember { mutableStateOf(1) }
    var activeTranslation by remember { mutableStateOf("Menolong / Membantu") }
    var noteInput by remember { mutableStateOf("") }

    // Navigation and tabs
    var viewMode by remember { mutableStateOf("tasrif") } // "tasrif" | "penyimpanan"
    var activeTab by remember { mutableStateOf("istilahi") } // "istilahi" | "lughowi" | "iilal" | "ai"

    // Favorites persistence states
    var favoritesList by remember { mutableStateOf(listOf<DictionaryEntry>()) }

    // Load initial favorites from persistent storage
    LaunchedEffect(Unit) {
        favoritesList = DatabaseHelper.loadFavorites(context)
    }

    // Dynamic calculations
    val currentWazan = remember(activeFa, activeAin, activeLam, activeBabNum) {
        val template = DictionaryData.WAZAN_TEMPLATES[activeBabNum] ?: DictionaryData.WAZAN_TEMPLATES[1]!!
        val preset = DictionaryData.PRESET_DICTIONARY.firstOrNull {
            it.fa == activeFa && it.ain == activeAin && it.lam == activeLam && it.babNum == activeBabNum
        }
        DataWazan(
            fa = activeFa,
            ain = activeAin,
            lam = activeLam,
            wazanMadhi = template.wazanMadhi,
            wazanMudhari = template.wazanMudhari,
            masdar = preset?.masdar ?: template.masdar
        )
    }

    val currentBina = remember(activeFa, activeAin, activeLam) {
        IilalEngine.detectBina(activeFa, activeAin, activeLam)
    }

    val calculatedTasrif = remember(currentWazan) {
        IilalEngine.tasrifIstilahiCustom(currentWazan)
    }

    // Active Lughowi category state
    var lughowiCategory by remember { mutableStateOf("madhi") } // "madhi" | "mudhari" | "amar" | "nahi" | "fail" | "maful"

    // AI/Gemini States
    var aiLoading by remember { mutableStateOf(false) }
    var aiResultText by remember { mutableStateOf("") }

    // UI Structure
    Column(modifier = Modifier.fillMaxSize()) {
        // App Header Banner
        Box(
            modifier = Modifier
                .fillMaxWidth()
                .background(Color(0xFF0F766E)) // Teal-emerald
                .padding(horizontal = 16.dp, vertical = 20.dp)
        ) {
            Column {
                Text(
                    text = "Kamus Sharaf Al-I'ilal",
                    color = Color.White,
                    fontSize = 24.sp,
                    fontWeight = FontWeight.Bold
                )
                Spacer(modifier = Modifier.height(4.dp))
                Row(verticalAlignment = Alignment.CenterVertically) {
                    Icon(
                        imageVector = Icons.Default.Book,
                        contentDescription = "Book",
                        tint = Color(0xFFA7F3D0),
                        modifier = Modifier.size(16.dp)
                    )
                    Spacer(modifier = Modifier.width(4.dp))
                    Text(
                        text = "Analisis Morfologi & Kaidah I'ilal Konjugasi Arab",
                        color = Color(0xFFD1FAE5),
                        fontSize = 12.sp
                    )
                }
            }
        }

        // View Mode Toggle (Tasrif vs Kamus Penyimpanan)
        TabRow(
            selectedTabIndex = if (viewMode == "tasrif") 0 else 1,
            containerColor = Color.White,
            contentColor = Color(0xFF10B981)
        ) {
            Tab(
                selected = viewMode == "tasrif",
                onClick = { viewMode = "tasrif" },
                text = {
                    Row(verticalAlignment = Alignment.CenterVertically) {
                        Icon(imageVector = Icons.Default.Layers, contentDescription = "Tasrif")
                        Spacer(modifier = Modifier.width(6.dp))
                        Text("Tasrif & Analisis", fontWeight = FontWeight.SemiBold)
                    }
                }
            )
            Tab(
                selected = viewMode == "penyimpanan",
                onClick = { viewMode = "penyimpanan" },
                text = {
                    Row(verticalAlignment = Alignment.CenterVertically) {
                        Icon(imageVector = Icons.Default.Bookmark, contentDescription = "Kamus")
                        Spacer(modifier = Modifier.width(6.dp))
                        Text("Kamus Favorit", fontWeight = FontWeight.SemiBold)
                    }
                }
            )
        }

        if (viewMode == "tasrif") {
            // Main workspace scrollable area
            LazyColumn(
                modifier = Modifier
                    .fillMaxSize()
                    .padding(12.dp),
                verticalArrangement = Arrangement.spacedBy(8.dp)
            ) {
                // Section 1: Dynamic Morphological Inputs
                item {
                    Card(
                        modifier = Modifier.fillMaxWidth(),
                        colors = CardDefaults.cardColors(containerColor = Color.White),
                        elevation = CardDefaults.cardElevation(2.dp),
                        shape = RoundedCornerShape(12.dp)
                    ) {
                        Column(modifier = Modifier.padding(14.dp)) {
                            Text(
                                "PARAMETER AKAR KATA (TRI-LITERAL)",
                                color = Color.Gray,
                                fontSize = 11.sp,
                                fontWeight = FontWeight.Bold
                            )
                            Spacer(modifier = Modifier.height(10.dp))

                            // Arabic Letters Inputs Array
                            Row(
                                modifier = Modifier.fillMaxWidth(),
                                horizontalArrangement = Arrangement.spacedBy(8.dp)
                            ) {
                                // RADIKAL FA
                                Column(modifier = Modifier.weight(1f), horizontalAlignment = Alignment.CenterHorizontally) {
                                    Text("Fa' (١)", fontSize = 11.sp, color = Color.Gray)
                                    Spacer(modifier = Modifier.height(4.dp))
                                    OutlinedTextField(
                                        value = activeFa,
                                        onValueChange = { if (it.length <= 1) activeFa = it },
                                        singleLine = true,
                                        textStyle = LocalTextStyle.current.copy(
                                            textAlign = TextAlign.Center,
                                            fontSize = 20.sp,
                                            fontWeight = FontWeight.Bold
                                        ),
                                        modifier = Modifier.fillMaxWidth()
                                    )
                                }
                                // RADIKAL AIN
                                Column(modifier = Modifier.weight(1f), horizontalAlignment = Alignment.CenterHorizontally) {
                                    Text("'Ain (٢)", fontSize = 11.sp, color = Color.Gray)
                                    Spacer(modifier = Modifier.height(4.dp))
                                    OutlinedTextField(
                                        value = activeAin,
                                        onValueChange = { if (it.length <= 1) activeAin = it },
                                        singleLine = true,
                                        textStyle = LocalTextStyle.current.copy(
                                            textAlign = TextAlign.Center,
                                            fontSize = 20.sp,
                                            fontWeight = FontWeight.Bold
                                        ),
                                        modifier = Modifier.fillMaxWidth()
                                    )
                                }
                                // RADIKAL LAM
                                Column(modifier = Modifier.weight(1f), horizontalAlignment = Alignment.CenterHorizontally) {
                                    Text("Lam (٣)", fontSize = 11.sp, color = Color.Gray)
                                    Spacer(modifier = Modifier.height(4.dp))
                                    OutlinedTextField(
                                        value = activeLam,
                                        onValueChange = { if (it.length <= 1) activeLam = it },
                                        singleLine = true,
                                        textStyle = LocalTextStyle.current.copy(
                                            textAlign = TextAlign.Center,
                                            fontSize = 20.sp,
                                            fontWeight = FontWeight.Bold
                                        ),
                                        modifier = Modifier.fillMaxWidth()
                                    )
                                }
                            }

                            Spacer(modifier = Modifier.height(10.dp))

                            // Arabic letter selection helper row
                            Text("Papan Ketik Arab Instan (Sentuh untuk input):", fontSize = 11.sp, color = Color.Gray)
                            Spacer(modifier = Modifier.height(4.dp))
                            val arabicShortcuts = listOf("ن", "ص", "ر", "ك", "ت", "ب", "ض", "ج", "ل", "س", "ف", "ح", "م", "د", "ق", "و", "ي", "أ")
                            LazyRow(
                                modifier = Modifier.fillMaxWidth(),
                                horizontalArrangement = Arrangement.spacedBy(6.dp)
                            ) {
                                items(arabicShortcuts) { letter ->
                                    Box(
                                        modifier = Modifier
                                            .border(1.dp, Color(0xFFD1D5DB), RoundedCornerShape(6.dp))
                                            .background(Color(0xFFF3F4F6))
                                            .clickable {
                                                // Intelligent input cursor mapping
                                                if (activeFa.isEmpty()) activeFa = letter
                                                else if (activeAin.isEmpty()) activeAin = letter
                                                else if (activeLam.isEmpty()) activeLam = letter
                                                else {
                                                    // cycle to Fa'
                                                    activeFa = letter
                                                    activeAin = ""
                                                    activeLam = ""
                                                }
                                            }
                                            .padding(horizontal = 10.dp, vertical = 6.dp)
                                    ) {
                                        Text(letter, fontSize = 16.sp, fontWeight = FontWeight.Bold, color = Color.Black)
                                    }
                                }
                            }

                            Spacer(modifier = Modifier.height(12.dp))

                            // Bab & Translation inputs
                            Text("Pilihan Bab (Wazan Perubahan Harakah):", fontSize = 11.sp, color = Color.Gray)
                            Spacer(modifier = Modifier.height(6.dp))
                            Row(
                                modifier = Modifier.fillMaxWidth(),
                                horizontalArrangement = Arrangement.SpaceBetween
                            ) {
                                (1..6).forEach { num ->
                                    val isSelected = activeBabNum == num
                                    Box(
                                        modifier = Modifier
                                            .clip(RoundedCornerShape(6.dp))
                                            .background(if (isSelected) Color(0xFF10B981) else Color(0xFFF1F5F9))
                                            .clickable { activeBabNum = num }
                                            .padding(horizontal = 12.dp, vertical = 8.dp)
                                    ) {
                                        Text(
                                            "B $num",
                                            fontWeight = FontWeight.Bold,
                                            color = if (isSelected) Color.White else Color.Black,
                                            fontSize = 12.sp
                                        )
                                    }
                                }
                            }

                            Spacer(modifier = Modifier.height(12.dp))

                            OutlinedTextField(
                                value = activeTranslation,
                                onValueChange = { activeTranslation = it },
                                label = { Text("Defenisi/Terjemahan Bahasa Indonesia") },
                                modifier = Modifier.fillMaxWidth(),
                                singleLine = true
                            )

                            Spacer(modifier = Modifier.height(10.dp))

                            // Metadata display badge
                            Row(
                                modifier = Modifier.fillMaxWidth(),
                                horizontalArrangement = Arrangement.SpaceBetween,
                                verticalAlignment = Alignment.CenterVertically
                            ) {
                                Row(verticalAlignment = Alignment.CenterVertically) {
                                    Box(
                                        modifier = Modifier
                                            .clip(RoundedCornerShape(4.dp))
                                            .background(Color(0xFFFEF3C7))
                                            .padding(horizontal = 6.dp, vertical = 2.dp)
                                    ) {
                                        Text(
                                            text = "Bina: $currentBina",
                                            color = Color(0xFFD97706),
                                            fontSize = 11.sp,
                                            fontWeight = FontWeight.Bold
                                        )
                                    }
                                    Spacer(modifier = Modifier.width(6.dp))
                                    Box(
                                        modifier = Modifier
                                            .clip(RoundedCornerShape(4.dp))
                                            .background(Color(0xFFE0F2FE))
                                            .padding(horizontal = 6.dp, vertical = 2.dp)
                                    ) {
                                        Text(
                                            text = "Pola: ${currentWazan.wazanMadhi} - ${currentWazan.wazanMudhari}",
                                            color = Color(0xFF0284C7),
                                            fontSize = 11.sp,
                                            fontWeight = FontWeight.Bold
                                        )
                                    }
                                }

                                // Quick save to favorits
                                Button(
                                    onClick = {
                                        val isDuplicate = favoritesList.any {
                                            it.fa == activeFa && it.ain == activeAin && it.lam == activeLam && it.babNum == activeBabNum
                                        }
                                        if (isDuplicate) {
                                            Toast.makeText(context, "Akar kata ini sudah ada di favorit!", Toast.LENGTH_SHORT).show()
                                        } else {
                                            val entry = DictionaryEntry(
                                                id = "fav-${System.currentTimeMillis()}",
                                                fa = activeFa,
                                                ain = activeAin,
                                                lam = activeLam,
                                                translation = activeTranslation,
                                                babNum = activeBabNum,
                                                notes = noteInput.ifEmpty { "Bina $currentBina, disimpan lewat Android Native app" }
                                            )
                                            val updated = listOf(entry) + favoritesList
                                            favoritesList = updated
                                            DatabaseHelper.saveFavorites(context, updated)
                                            noteInput = ""
                                            Toast.makeText(context, "Disimpan ke Kamus Favorit!", Toast.LENGTH_SHORT).show()
                                        }
                                    },
                                    colors = ButtonDefaults.buttonColors(containerColor = Color(0xFF10B981)),
                                    contentPadding = PaddingValues(horizontal = 8.dp, vertical = 4.dp),
                                    shape = RoundedCornerShape(6.dp),
                                    modifier = Modifier.height(30.dp)
                                ) {
                                    Icon(imageVector = Icons.Default.Save, contentDescription = "Save", modifier = Modifier.size(12.dp), tint = Color.White)
                                    Spacer(modifier = Modifier.width(4.dp))
                                    Text("Simpan", fontSize = 11.sp, color = Color.White)
                                }
                            }

                            // Optional note field
                            Spacer(modifier = Modifier.height(8.dp))
                            OutlinedTextField(
                                value = noteInput,
                                onValueChange = { noteInput = it },
                                label = { Text("Catatan penjelas opsional (sebelum disimpan)") },
                                placeholder = { Text("E.g: Huruf penyakit di tengah mengalami I'ilal...") },
                                modifier = Modifier.fillMaxWidth(),
                                maxLines = 1,
                                singleLine = true
                            )
                        }
                    }
                }

                // Section 2: Preset Dictionary Shortcuts
                item {
                    Text(
                        "KOSA KATA PER CONTOHAN (Sentuh untuk muat)",
                        color = Color.Gray,
                        fontSize = 11.sp,
                        fontWeight = FontWeight.Bold,
                        modifier = Modifier.padding(start = 4.dp, top = 4.dp)
                    )
                    Spacer(modifier = Modifier.height(4.dp))
                    LazyRow(
                        modifier = Modifier.fillMaxWidth(),
                        horizontalArrangement = Arrangement.spacedBy(8.dp)
                    ) {
                        items(DictionaryData.PRESET_DICTIONARY) { item ->
                            val isChosen = activeFa == item.fa && activeAin == item.ain && activeLam == item.lam && activeBabNum == item.babNum
                            Box(
                                modifier = Modifier
                                    .border(
                                        2.dp,
                                        if (isChosen) Color(0xFF10B981) else Color(0xFFE2E8F0),
                                        RoundedCornerShape(8.dp)
                                    )
                                    .clip(RoundedCornerShape(8.dp))
                                    .background(if (isChosen) Color(0xFFECFDF5) else Color.White)
                                    .clickable {
                                        activeFa = item.fa
                                        activeAin = item.ain
                                        activeLam = item.lam
                                        activeBabNum = item.babNum
                                        activeTranslation = item.translation
                                        Toast.makeText(context, "Memuat ${item.fa}${item.ain}${item.lam}", Toast.LENGTH_SHORT).show()
                                    }
                                    .padding(horizontal = 12.dp, vertical = 8.dp)
                            ) {
                                Column(horizontalAlignment = Alignment.CenterHorizontally) {
                                    Text(
                                        "${item.fa}${item.ain}${item.lam}",
                                        fontSize = 16.sp,
                                        fontWeight = FontWeight.Bold,
                                        color = Color(0xFF0F766E),
                                        style = LocalTextStyle.current.copy(textDirection = TextDirection.Rtl)
                                    )
                                    Text(item.translation.split("/").first().trim(), fontSize = 10.sp, color = Color.Gray)
                                }
                            }
                        }
                    }
                }

                // Section 3: Detailed Output Tabs
                item {
                    ScrollableTabRow(
                        selectedTabIndex = when (activeTab) {
                            "istilahi" -> 0
                            "lughowi" -> 1
                            "iilal" -> 2
                            else -> 3
                        },
                        containerColor = Color.Transparent,
                        contentColor = Color(0xFF10B981),
                        edgePadding = 0.dp
                    ) {
                        Tab(
                            selected = activeTab == "istilahi",
                            onClick = { activeTab = "istilahi" },
                            text = { Text("Tasrif Istilahi", fontWeight = FontWeight.Bold) }
                        )
                        Tab(
                            selected = activeTab == "lughowi",
                            onClick = { activeTab = "lughowi" },
                            text = { Text("Tasrif Lughowi", fontWeight = FontWeight.Bold) }
                        )
                        Tab(
                            selected = activeTab == "iilal",
                            onClick = { activeTab = "iilal" },
                            text = { Text("Kaidah I'ilal", fontWeight = FontWeight.Bold) }
                        )
                        Tab(
                            selected = activeTab == "ai",
                            onClick = { activeTab = "ai" },
                            text = {
                                Row(verticalAlignment = Alignment.CenterVertically) {
                                    Icon(imageVector = Icons.Default.Star, contentDescription = "AI", tint = Color(0xFF8B5CF6), modifier = Modifier.size(14.dp))
                                    Spacer(modifier = Modifier.width(4.dp))
                                    Text("Analisis AI", fontWeight = FontWeight.Bold, color = Color(0xFF8B5CF6))
                                }
                            }
                        )
                    }
                }

                // Render Active Panel
                item {
                    AnimatedContent(targetState = activeTab, label = "tabAnim") { target ->
                        when (target) {
                            "istilahi" -> TasrifIstilahiLayout(calculatedTasrif)
                            "lughowi" -> TasrifLughowiLayout(
                                calculatedTasrif = calculatedTasrif,
                                currentBina = currentBina,
                                activeFa = activeFa,
                                activeAin = activeAin,
                                activeLam = activeLam,
                                lughowiCategory = lughowiCategory,
                                onCategoryChange = { lughowiCategory = it }
                            )
                            "iilal" -> IilalExplainerLayout(
                                currentBina = currentBina,
                                activeFa = activeFa,
                                activeAin = activeAin,
                                activeLam = activeLam,
                                activeBab = activeBabNum
                            )
                            "ai" -> GeminiAiLayout(
                                fa = activeFa,
                                ain = activeAin,
                                lam = activeLam,
                                babNum = activeBabNum,
                                bina = currentBina,
                                translation = activeTranslation,
                                loading = aiLoading,
                                resultText = aiResultText,
                                onStartProgress = { aiLoading = true },
                                onReceiveResult = { text ->
                                    aiLoading = false
                                    aiResultText = text
                                }
                            )
                        }
                    }
                }
            }
        } else {
            // Kamus Favorit Panel
            KamusFavoritLayout(
                favoritesList = favoritesList,
                onSelectFavorite = { fav ->
                    activeFa = fav.fa
                    activeAin = fav.ain
                    activeLam = fav.lam
                    activeBabNum = fav.babNum
                    activeTranslation = fav.translation
                    viewMode = "tasrif"
                },
                onDeleteFavorite = { id ->
                    val updated = favoritesList.filter { it.id != id }
                    favoritesList = updated
                    DatabaseHelper.saveFavorites(context, updated)
                    Toast.makeText(context, "Dihapus dari Favorit!", Toast.LENGTH_SHORT).show()
                },
                onAddManual = { userFa, userAin, userLam, userBab, userDesc ->
                    val newEntry = DictionaryEntry(
                        id = "fav-custom-${System.currentTimeMillis()}",
                        fa = userFa,
                        ain = userAin,
                        lam = userLam,
                        translation = userDesc,
                        babNum = userBab,
                        custom = true,
                        notes = "Disimpan manual lewat Kamus"
                    )
                    val updated = listOf(newEntry) + favoritesList
                    favoritesList = updated
                    DatabaseHelper.saveFavorites(context, updated)
                    Toast.makeText(context, "Akar kata manual berhasil ditambahkan!", Toast.LENGTH_SHORT).show()
                }
            )
        }
    }
}

// ---------------------- SUB-PANEL COMPOSABLES ----------------------

@Composable
fun TasrifIstilahiLayout(tasrif: TasrifIstilahi) {
    val items = listOf(
        Triple("Fi'il Madhi (Masa Lampau)", tasrif.madhi, Color(0xFFECFDF5) to Color(0xFF047857)),
        Triple("Fi'il Mudhari (Masa Kini/Akan)", tasrif.mudhari, Color(0xFFECFDF5) to Color(0xFF047857)),
        Triple("Masdar (Kata Dasar)", tasrif.masdar, Color(0xFFF1F5F9) to Color(0xFF475569)),
        Triple("Isim Fa'il (Pelaku Utama)", tasrif.isimFail.mufrod, Color(0xFFEEF2FF) to Color(0xFF4338CA)),
        Triple("Isim Maf'ul (Penerima Obyek)", tasrif.isimMaful.mufrod, Color(0xFFEEF2FF) to Color(0xFF4338CA)),
        Triple("Fi'il Amar (Kalimat Perintah)", tasrif.amar, Color(0xFFFFF1F2) to Color(0xFFBE123C)),
        Triple("Fi'il Nahi (Kalimat Larangan)", tasrif.nahi, Color(0xFFFFF1F2) to Color(0xFFBE123C)),
        Triple("Isim Zaman (Penunjuk Waktu)", tasrif.isimZaman.mufrod, Color(0xFFFEF3C7) to Color(0xFFB45309)),
        Triple("Isim Makan (Penunjuk Tempat)", tasrif.isimMakan.mufrod, Color(0xFFFEF3C7) to Color(0xFFB45309)),
        Triple("Isim Alat (Bahan Pembantu)", tasrif.isimAlat.mufrod, Color(0xFFF0FDFA) to Color(0xFF0F766E))
    )

    Column(modifier = Modifier.fillMaxWidth()) {
        Card(
            colors = CardDefaults.cardColors(containerColor = Color.White),
            modifier = Modifier.fillMaxWidth(),
            elevation = CardDefaults.cardElevation(1.dp)
        ) {
            Column(modifier = Modifier.padding(14.dp)) {
                Text(
                    text = "TABEL RADIKAL KONJUGASI ISTILAHI",
                    fontSize = 12.sp,
                    fontWeight = FontWeight.Bold,
                    color = Color.DarkGray
                )
                Spacer(modifier = Modifier.height(10.dp))

                items.forEach { (label, value, colors) ->
                    val (bg, txtColor) = colors
                    Row(
                        modifier = Modifier
                            .fillMaxWidth()
                            .padding(vertical = 4.dp)
                            .border(1.dp, Color(0xFFE2E8F0), RoundedCornerShape(8.dp))
                            .background(bg)
                            .padding(horizontal = 12.dp, vertical = 10.dp),
                        horizontalArrangement = Arrangement.SpaceBetween,
                        verticalAlignment = Alignment.CenterVertically
                    ) {
                        Text(label, fontSize = 12.sp, color = Color.Gray, fontWeight = FontWeight.Medium)
                        Text(
                            text = value,
                            fontSize = 18.sp,
                            fontWeight = FontWeight.Bold,
                            color = txtColor,
                            textAlign = TextAlign.Right,
                            style = LocalTextStyle.current.copy(textDirection = TextDirection.Rtl)
                        )
                    }
                }

                // Secondary Forms: Isim Tafdhil, Marrah, dll.
                Spacer(modifier = Modifier.height(14.dp))
                Divider()
                Spacer(modifier = Modifier.height(10.dp))
                Text(
                    text = "BENTUK KHUSUS (Tafdhil, Marrah, dll)",
                    fontSize = 12.sp,
                    fontWeight = FontWeight.Bold,
                    color = Color.DarkGray
                )
                Spacer(modifier = Modifier.height(8.dp))

                Row(modifier = Modifier.fillMaxWidth(), horizontalArrangement = Arrangement.spacedBy(8.dp)) {
                    Card(modifier = Modifier.weight(1f), colors = CardDefaults.cardColors(containerColor = Color(0xFFF8FAFC))) {
                        Column(modifier = Modifier.padding(10.dp)) {
                            Text("Isim Tafdhil (M)", fontSize = 10.sp, color = Color.Gray)
                            Text(tasrif.tafdhilMuzakkar, fontSize = 15.sp, fontWeight = FontWeight.Bold, style = LocalTextStyle.current.copy(textDirection = TextDirection.Rtl))
                        }
                    }
                    Card(modifier = Modifier.weight(1f), colors = CardDefaults.cardColors(containerColor = Color(0xFFF8FAFC))) {
                        Column(modifier = Modifier.padding(10.dp)) {
                            Text("Isim Marrah", fontSize = 10.sp, color = Color.Gray)
                            Text(tasrif.marrah, fontSize = 15.sp, fontWeight = FontWeight.Bold, style = LocalTextStyle.current.copy(textDirection = TextDirection.Rtl))
                        }
                    }
                    Card(modifier = Modifier.weight(1f), colors = CardDefaults.cardColors(containerColor = Color(0xFFF8FAFC))) {
                        Column(modifier = Modifier.padding(10.dp)) {
                            Text("Isim Nau'", fontSize = 10.sp, color = Color.Gray)
                            Text(tasrif.nau, fontSize = 15.sp, fontWeight = FontWeight.Bold, style = LocalTextStyle.current.copy(textDirection = TextDirection.Rtl))
                        }
                    }
                }
            }
        }
    }
}

@Composable
fun TasrifLughowiLayout(
    calculatedTasrif: TasrifIstilahi,
    currentBina: String,
    activeFa: String,
    activeAin: String,
    activeLam: String,
    lughowiCategory: String,
    onCategoryChange: (String) -> Unit
) {
    val lughWiEngine = remember(calculatedTasrif, activeFa, activeAin, activeLam, currentBina) {
        IilalEngine.tasrifLughowi(calculatedTasrif, activeFa, activeAin, activeLam, currentBina)
    }

    val mappedPronouns = listOf(
        "هُوَ (Dia L)" to 0,
        "هُمَا (Mereka berdua L)" to 1,
        "هُمْ (Mereka banyak L)" to 2,
        "هِيَ (Dia P)" to 3,
        "هُمَا (Mereka berdua P)" to 4,
        "هُنَّ (Mereka banyak P)" to 5,
        "أَنْتَ (Kamu L)" to 6,
        "أَنْتُمَا (Kamu berdua L)" to 7,
        "أَنْتُمْ (Kalian banyak L)" to 8,
        "أَنْتِ (Kamu P)" to 9,
        "أَنْتُمَا (Kamu berdua P)" to 10,
        "أَنْتُنَّ (Kalian banyak P)" to 11,
        "أَنَا (Saya)" to 12,
        "نَحْنُ (Kami / Kita)" to 13
    )

    val currentList = when (lughowiCategory) {
        "madhi" -> lughWiEngine.madhi14
        "mudhari" -> lughWiEngine.mudhari14
        "amar" -> lughWiEngine.amar12
        "nahi" -> lughWiEngine.nahi12
        "fail" -> lughWiEngine.isimFail6
        "maful" -> lughWiEngine.isimMaful6
        else -> lughWiEngine.madhi14
    }

    Column(modifier = Modifier.fillMaxWidth()) {
        Card(
            colors = CardDefaults.cardColors(containerColor = Color.White),
            modifier = Modifier.fillMaxWidth(),
            elevation = CardDefaults.cardElevation(1.dp)
        ) {
            Column(modifier = Modifier.padding(14.dp)) {
                Text(
                    text = "KONJUGASI PRONOMINA (14 DHOMIR)",
                    fontSize = 12.sp,
                    fontWeight = FontWeight.Bold,
                    color = Color.DarkGray
                )
                Spacer(modifier = Modifier.height(10.dp))

                // Selector row of categories
                val cats = listOf(
                    "madhi" to "Madhi (١٤)",
                    "mudhari" to "Mudhari (١٤)",
                    "amar" to "Amar (١٢)",
                    "nahi" to "Nahi (١٢)",
                    "fail" to "Fa'il (٦)",
                    "maful" to "Maf'ul (٦)"
                )
                Row(
                    modifier = Modifier
                        .fillMaxWidth()
                        .horizontalScroll(rememberScrollState()),
                    horizontalArrangement = Arrangement.spacedBy(6.dp)
                ) {
                    cats.forEach { (key, title) ->
                        val isChosen = lughowiCategory == key
                        Box(
                            modifier = Modifier
                                .clip(RoundedCornerShape(6.dp))
                                .background(if (isChosen) Color(0xFF4F46E5) else Color(0xFFF1F5F9))
                                .clickable { onCategoryChange(key) }
                                .padding(horizontal = 12.dp, vertical = 6.dp)
                        ) {
                            Text(
                                title,
                                color = if (isChosen) Color.White else Color.Black,
                                fontSize = 11.sp,
                                fontWeight = FontWeight.SemiBold
                            )
                        }
                    }
                }

                Spacer(modifier = Modifier.height(12.dp))

                // Conjugated items listing with corresponding Pronoun name
                val countToMap = if (lughowiCategory == "amar" || lughowiCategory == "nahi") 12 else if (lughowiCategory == "fail" || lughowiCategory == "maful") 6 else 14
                for (i in 0 until minOf(currentList.size, countToMap)) {
                    val pronounLabel = if (lughowiCategory == "fail" || lughowiCategory == "maful") {
                        val failLabels = listOf("Mufrod Mudzakkar", "Matsna Mudzakkar", "Jamak Mudzakkar", "Mufrod Muannats", "Matsna Muannats", "Jamak Muannats")
                        failLabels.getOrNull(i) ?: ""
                    } else if (lughowiCategory == "amar" || lughowiCategory == "nahi") {
                        val amarLabels = listOf("Ghoib (Dia L)", "Ghoib (Berdua L)", "Ghoib (Jamak L)", "Ghoib (Dia P)", "Ghoib (Berdua P)", "Ghoib (Jamak P)", "Mukhotob (Kamu L)", "Mukhotob (Berdua L)", "Mukhotob (Jamak L)", "Mukhotob (Kamu P)", "Mukhotob (Berdua P)", "Mukhotob (Jamak P)")
                        amarLabels.getOrNull(i) ?: ""
                    } else {
                        mappedPronouns.getOrNull(i)?.first ?: ""
                    }

                    Row(
                        modifier = Modifier
                            .fillMaxWidth()
                            .padding(vertical = 4.dp)
                            .border(1.dp, Color(0xFFF1F5F9), RoundedCornerShape(6.dp))
                            .padding(horizontal = 10.dp, vertical = 8.dp),
                        horizontalArrangement = Arrangement.SpaceBetween,
                        verticalAlignment = Alignment.CenterVertically
                    ) {
                        Text(pronounLabel, fontSize = 11.sp, color = Color.Gray)
                        Text(
                            text = currentList[i],
                            fontSize = 16.sp,
                            fontWeight = FontWeight.Bold,
                            color = Color(0xFF4F46E5),
                            textAlign = TextAlign.Right,
                            style = LocalTextStyle.current.copy(textDirection = TextDirection.Rtl)
                        )
                    }
                }
            }
        }
    }
}

@Composable
fun IilalExplainerLayout(currentBina: String, activeFa: String, activeAin: String, activeLam: String, activeBab: Int) {
    val explanations = when (currentBina) {
        "Ajwaf" -> listOf(
            "Terjadi kaidah I'ilal pemindahan harakah / pencopotan vokal tengah.",
            "Huruf 'Ain ($activeAin) yang merupakan huruf penyakit vokal lemah ('و' atau 'ي') bertransisi menjadi Alif 'ا' pada bentuk Fi'il Madhi jika ber-harakah Fatha: Contoh asli قَوَلَ menjadi قَالَ.",
            "Pada Mudhari, huruf lemah tengah beradaptasi kembali disesuaikan dengan harakah dominan Bab $activeBab."
        )
        "Naqis" -> listOf(
            "Terjadi kaidah I'ilal pembuangan harakah akhir/vokal lemah pada ujung fi'il.",
            "Huruf Lam ($activeLam) yang berada di akhir kata kerja bertransisi menjadi Alif Layyinah/Maqshurah 'ى' jika diakhiri Ya', atau Alif tegak 'ا' jika Wawi.",
            "Ketika di-konjugasi lughowi (pronoun Jamak/plural), vokal lemah tersebut dicopot ditiadakan untuk menjaga pertemuan dua sukun: Contoh دَعَوْا (da'aw) asli dari دَعَوُوا."
        )
        "Mudho'af" -> listOf(
            "Terjadi kaidah Idgham (peleburan/asimilasi dua huruf kembar).",
            "Huruf 'Ain ($activeAin) and Lam ($activeLam) merupakan radikal huruf sejenis ($activeAin - $activeLam). Harakah 'Ain ditiadakan disatukan sehingga ditandai dengan tasydid/syaddah: Contoh asli مَدَدَ menjadi مَدَّ.",
            "Asimilasi Idgham ini dipisahkan kembali (fakkul-idgham) pada Tasrif Lughowi mulai dari kata ganti dhomir feminim 'Hunna' ke bawah: Contoh مَدَدْنَ."
        )
        "Mitsal" -> listOf(
            "Terjadi pengguguran radikal depan vokal lemah.",
            "Radikal Fa ($activeFa) merupakan huruf penyakit 'و' (Wawi). Pada Fi'il Mudhari Bab $activeBab, vokal 'و' dibuang sepenuhnya karena terjepit di antara dua Fatha dan Kasra: Contoh asli يَوْعِدُ menjadi يَعِدُ."
        )
        "Lafif Maqrun", "Lafif Mafruq" -> listOf(
            "Akar kata mengandung dua buah huruf penyakit sekaligus (ganda).",
            "Sistem IilalEngine menganalisis gabungan kaidah Naqis pada akhir, disesuaikan bersama kaidah Ajwaf (Maqrun) maupun Mitsal (Mafruq). Contoh وَقَى -> يَقِي."
        )
        else -> listOf(
            "Ini adalah bentuk Fi'il Shohih (Lafadz Sempurna).",
            "Kategori ini memiliki struktur radikal radiks murni yang bebas dari huruf vokal lemah (waw, ya, alif) maupun hamzah.",
            "Perubahan mengikuti harakah standar Wazan Bab $activeBab secara literal tanpa membutuhkan pergeseran makhraj vokal/I'ilal!"
        )
    }

    Card(
        colors = CardDefaults.cardColors(containerColor = Color.White),
        modifier = Modifier.fillMaxWidth(),
        elevation = CardDefaults.cardElevation(1.dp)
    ) {
        Column(modifier = Modifier.padding(14.dp)) {
            Text(
                text = "KAIDAH ANALISIS I'ILAL & MORFOLOGI",
                fontSize = 12.sp,
                fontWeight = FontWeight.Bold,
                color = Color.DarkGray
            )
            Spacer(modifier = Modifier.height(8.dp))

            explanations.forEachIndexed { i, rule ->
                Row(
                    modifier = Modifier.padding(vertical = 4.dp),
                    verticalAlignment = Alignment.Top
                ) {
                    Box(
                        modifier = Modifier
                            .offset(y = 2.dp)
                            .size(6.dp)
                            .clip(RoundedCornerShape(3.dp))
                            .background(Color(0xFF10B981))
                    )
                    Spacer(modifier = Modifier.width(10.dp))
                    Text(rule, fontSize = 11.sp, color = Color.Gray, lineHeight = 16.sp)
                }
            }
        }
    }
}

@Composable
fun GeminiAiLayout(
    fa: String,
    ain: String,
    lam: String,
    babNum: Int,
    bina: String,
    translation: String,
    loading: Boolean,
    resultText: String,
    onStartProgress: () -> Unit,
    onReceiveResult: (String) -> Unit
) {
    val apiKey = System.getenv("GEMINI_API_KEY") ?: ""

    Card(
        colors = CardDefaults.cardColors(containerColor = Color(0xFFF1F5F9)),
        modifier = Modifier.fillMaxWidth(),
        elevation = CardDefaults.cardElevation(1.dp)
    ) {
        Column(modifier = Modifier.padding(14.dp)) {
            Row(verticalAlignment = Alignment.CenterVertically) {
                Icon(imageVector = Icons.Default.Star, contentDescription = "Spark", tint = Color(0xFF8B5CF6))
                Spacer(modifier = Modifier.width(6.dp))
                Text("Gemini Deep Linguistic analysis", fontWeight = FontWeight.Bold, fontSize = 13.sp, color = Color(0xFF6D28D9))
            }
            Spacer(modifier = Modifier.height(8.dp))
            Text(
                "Membuat rujukan komparatif kamus kelas klasik (Lisanul 'Arab, Tajul 'Arus) & modern (Wasith, Munawwir) mendalam untuk radikal: $fa - $ain - $lam Bab $babNum.",
                fontSize = 11.sp,
                color = Color.DarkGray,
                lineHeight = 15.sp
            )

            Spacer(modifier = Modifier.height(12.dp))

            if (loading) {
                Column(
                    modifier = Modifier.fillMaxWidth().padding(vertical = 20.dp),
                    horizontalAlignment = Alignment.CenterHorizontally
                ) {
                    CircularProgressIndicator(color = Color(0xFF8B5CF6))
                    Spacer(modifier = Modifier.height(8.dp))
                    Text("Menghubungkan ke Gemini API... Mohon tunggu", fontSize = 10.sp, color = Color.Gray)
                }
            } else {
                if (resultText.isNotEmpty()) {
                    Box(
                        modifier = Modifier
                            .fillMaxWidth()
                            .background(Color.White, RoundedCornerShape(8.dp))
                            .border(1.dp, Color(0xFFE2E8F0), RoundedCornerShape(8.dp))
                            .padding(10.dp)
                    ) {
                        Text(
                            text = resultText,
                            fontSize = 11.sp,
                            color = Color.Black,
                            lineHeight = 16.sp,
                            modifier = Modifier.verticalScroll(rememberScrollState())
                        )
                    }
                    Spacer(modifier = Modifier.height(10.dp))
                }

                Button(
                    onClick = {
                        onStartProgress()
                        callGemini(apiKey, fa, ain, lam, babNum, bina, translation, onReceiveResult)
                    },
                    colors = ButtonDefaults.buttonColors(containerColor = Color(0xFF8B5CF6)),
                    modifier = Modifier.fillMaxWidth()
                ) {
                    Text("Mulai Analisis Komparatif Kamus (AI)", color = Color.White)
                }
            }
        }
    }
}

@Composable
fun KamusFavoritLayout(
    favoritesList: List<DictionaryEntry>,
    onSelectFavorite: (DictionaryEntry) -> Unit,
    onDeleteFavorite: (String) -> Unit,
    onAddManual: (String, String, String, Int, String) -> Unit
) {
    var addManualOpen by remember { mutableStateOf(false) }

    var mFa by remember { mutableStateOf("") }
    var mAin by remember { mutableStateOf("") }
    var mLam by remember { mutableStateOf("") }
    var mBab by remember { mutableStateOf(1) }
    var mDesc by remember { mutableStateOf("") }

    LazyColumn(
        modifier = Modifier
            .fillMaxSize()
            .padding(12.dp),
        verticalArrangement = Arrangement.spacedBy(10.dp)
    ) {
        item {
            Row(
                modifier = Modifier.fillMaxWidth(),
                horizontalArrangement = Arrangement.SpaceBetween,
                verticalAlignment = Alignment.CenterVertically
            ) {
                Text("KAMUS PENYIMPANAN PRIBADI", fontWeight = FontWeight.Bold, fontSize = 14.sp)
                Button(
                    onClick = { addManualOpen = !addManualOpen },
                    colors = ButtonDefaults.buttonColors(containerColor = Color(0xFF4F46E5)),
                    contentPadding = PaddingValues(horizontal = 12.dp, vertical = 6.dp),
                    shape = RoundedCornerShape(6.dp)
                ) {
                    Icon(imageVector = Icons.Default.Add, contentDescription = "Add", modifier = Modifier.size(14.dp), tint = Color.White)
                    Spacer(modifier = Modifier.width(4.dp))
                    Text("Tambah Manual", fontSize = 11.sp, color = Color.White)
                }
            }
        }

        if (addManualOpen) {
            item {
                Card(
                    modifier = Modifier.fillMaxWidth(),
                    colors = CardDefaults.cardColors(containerColor = Color(0xFFEEF2FF)),
                    border = BorderStroke(1.dp, Color(0xFFC7D2FE))
                ) {
                    Column(modifier = Modifier.padding(14.dp)) {
                        Text("TAMBAH AKAR KATA BARU", fontWeight = FontWeight.Bold, fontSize = 12.sp, color = Color(0xFF3730A3))
                        Spacer(modifier = Modifier.height(8.dp))

                        Row(modifier = Modifier.fillMaxWidth(), horizontalArrangement = Arrangement.spacedBy(6.dp)) {
                            OutlinedTextField(
                                value = mFa,
                                onValueChange = { if (it.length <= 1) mFa = it },
                                label = { Text("Fa'") },
                                modifier = Modifier.weight(1f)
                            )
                            OutlinedTextField(
                                value = mAin,
                                onValueChange = { if (it.length <= 1) mAin = it },
                                label = { Text("'Ain") },
                                modifier = Modifier.weight(1f)
                            )
                            OutlinedTextField(
                                value = mLam,
                                onValueChange = { if (it.length <= 1) mLam = it },
                                label = { Text("Lam") },
                                modifier = Modifier.weight(1f)
                            )
                        }

                        Spacer(modifier = Modifier.height(8.dp))

                        Row(
                            modifier = Modifier.fillMaxWidth(),
                            verticalAlignment = Alignment.CenterVertically,
                            horizontalArrangement = Arrangement.spacedBy(6.dp)
                        ) {
                            Text("Bab:", fontSize = 11.sp)
                            (1..6).forEach { num ->
                                Box(
                                    modifier = Modifier
                                        .clip(RoundedCornerShape(4.dp))
                                        .background(if (mBab == num) Color(0xFF4F46E5) else Color.White)
                                        .clickable { mBab = num }
                                        .padding(horizontal = 10.dp, vertical = 6.dp)
                                ) {
                                    Text(
                                        "$num",
                                        fontWeight = FontWeight.Bold,
                                        color = if (mBab == num) Color.White else Color.Black,
                                        fontSize = 11.sp
                                    )
                                }
                            }
                        }

                        Spacer(modifier = Modifier.height(8.dp))

                        OutlinedTextField(
                            value = mDesc,
                            onValueChange = { mDesc = it },
                            label = { Text("Defenisi Terjemahan") },
                            modifier = Modifier.fillMaxWidth()
                        )

                        Spacer(modifier = Modifier.height(10.dp))

                        Button(
                            onClick = {
                                if (mFa.isNotEmpty() && mAin.isNotEmpty() && mLam.isNotEmpty() && mDesc.isNotEmpty()) {
                                    onAddManual(mFa, mAin, mLam, mBab, mDesc)
                                    mFa = ""
                                    mAin = ""
                                    mLam = ""
                                    mDesc = ""
                                    addManualOpen = false
                                }
                            },
                            colors = ButtonDefaults.buttonColors(containerColor = Color(0xFF4F46E5)),
                            modifier = Modifier.fillMaxWidth()
                        ) {
                            Text("Simpan Manual", color = Color.White)
                        }
                    }
                }
            }
        }

        if (favoritesList.isEmpty()) {
            item {
                Box(
                    modifier = Modifier
                        .fillMaxWidth()
                        .padding(vertical = 40.dp),
                    contentAlignment = Alignment.Center
                ) {
                    Text("Kamus penyimpanan kosong. Coba simpan akar kata baru!", color = Color.Gray, fontSize = 12.sp)
                }
            }
        } else {
            items(favoritesList) { fav ->
                Card(
                    modifier = Modifier.fillMaxWidth(),
                    colors = CardDefaults.cardColors(containerColor = Color.White),
                    border = BorderStroke(1.dp, Color(0xFFE2E8F0))
                ) {
                    Row(
                        modifier = Modifier
                            .fillMaxWidth()
                            .padding(12.dp),
                        horizontalArrangement = Arrangement.SpaceBetween,
                        verticalAlignment = Alignment.CenterVertically
                    ) {
                        Column(modifier = Modifier.weight(1f)) {
                            Row(verticalAlignment = Alignment.CenterVertically) {
                                Text(
                                    "${fav.fa}${fav.ain}${fav.lam}",
                                    fontSize = 20.sp,
                                    fontWeight = FontWeight.Bold,
                                    color = Color(0xFF0F766E),
                                    style = LocalTextStyle.current.copy(textDirection = TextDirection.Rtl)
                                )
                                Spacer(modifier = Modifier.width(8.dp))
                                Box(
                                    modifier = Modifier
                                        .clip(RoundedCornerShape(4.dp))
                                        .background(Color(0xFFE0F2FE))
                                        .padding(horizontal = 6.dp, vertical = 2.dp)
                                ) {
                                    Text("Bab ${fav.babNum}", color = Color(0xFF0369A1), fontSize = 10.sp, fontWeight = FontWeight.Bold)
                                }
                            }
                            Spacer(modifier = Modifier.height(4.dp))
                            Text(fav.translation, fontSize = 12.sp, fontWeight = FontWeight.SemiBold, color = Color.DarkGray)
                            if (!fav.notes.isNullOrEmpty()) {
                                Text(fav.notes, fontSize = 11.sp, color = Color.Gray)
                            }
                        }

                        Row(horizontalArrangement = Arrangement.spacedBy(4.dp)) {
                            IconButton(onClick = { onSelectFavorite(fav) }) {
                                Icon(imageVector = Icons.Default.Launch, contentDescription = "Use", tint = Color(0xFF10B981))
                            }
                            IconButton(onClick = { onDeleteFavorite(fav.id) }) {
                                Icon(imageVector = Icons.Default.Delete, contentDescription = "Delete", tint = Color.Red)
                            }
                        }
                    }
                }
            }
        }
    }
}

// ---------------------- GEMINI NETWORK INTEGRATION ----------------------

fun callGemini(
    apiKey: String,
    fa: String,
    ain: String,
    lam: String,
    babNum: Int,
    bina: String,
    translation: String,
    onResult: (String) -> Unit
) {
    if (apiKey.isEmpty()) {
        onResult("Error: Kunci API (GEMINI_API_KEY) belum dikonfigurasi di file lingkungan.")
        return
    }
    Thread {
        try {
            val url = URL("https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=$apiKey")
            val connection = url.openConnection() as HttpURLConnection
            connection.requestMethod = "POST"
            connection.setRequestProperty("Content-Type", "application/json; utf-8")
            connection.doOutput = true

            val prompt = """
                Berikan analisis linguistik morfologi sharaf bahasa Arab yang mendalam, fasih, dan akademik untuk akar tri-literal dengan radikal $fa - $ain - $lam, Bab $babNum, Bina $bina (Bina' dari akar kata ini), yang memiliki makna dasar "$translation".

                Berikan rincian penjelasan yang rapi dalam bahasa Indonesia dengan pembagian sub-bab berikut:
                1. Analisis Etimologi & Makna Leksikal Dasar beserta padanan padatnya.
                2. Penjelasan Perubahan Morfologis (Kaidah I'ilal / Ibdal / Idgham jika ada).
                3. Perbandingan Klasik (Rujuk secara ringkas Kamus Lisanul 'Arab atau Tajul 'Arus) dan Modern (Kamus Al-Munawwir).
                4. Contoh Penerapan praktis dalam kalimat Al-Qur'an atau kalimat fusha sehari-hari.
            """.trimIndent()

            val jsonPayload = """
                {
                  "contents": [{
                    "parts":[{"text": ${JSONObject.quote(prompt)}}]
                  }]
                }
            """.trimIndent()

            connection.outputStream.use { os ->
                val input = jsonPayload.toByteArray(Charsets.UTF_8)
                os.write(input, 0, input.size)
            }

            val responseCode = connection.responseCode
            if (responseCode == 200) {
                val responseText = connection.inputStream.bufferedReader().use { it.readText() }
                val responseJson = JSONObject(responseText)
                val candidates = responseJson.getJSONArray("candidates")
                if (candidates.length() > 0) {
                    val content = candidates.getJSONObject(0).getJSONObject("content")
                    val parts = content.getJSONArray("parts")
                    if (parts.length() > 0) {
                        val text = parts.getJSONObject(0).getString("text")
                        onResult(text)
                    } else {
                        onResult("Error: Format respon kosong.")
                    }
                } else {
                    onResult("Error: Tidak ada kandidat teks.")
                }
            } else {
                val errText = connection.errorStream?.bufferedReader()?.use { it.readText() } ?: ""
                onResult("Gagal terhubung ke API ($responseCode): $errText")
            }
        } catch (e: Exception) {
            onResult("Kesalahan jaringan atau parsing: ${e.message}")
        }
    }.start()
}
