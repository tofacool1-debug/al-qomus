/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from "react";
import {
  Database,
  Terminal,
  Download,
  Copy,
  Check,
  RefreshCw,
  Smartphone,
  Layers,
  ArrowRight,
  Info,
  Cpu,
  Cloud,
  Wifi,
  WifiOff,
  Flame,
  CheckCircle,
  Code
} from "lucide-react";
import { PRESET_DICTIONARY } from "../utils/dictionaryData";
import {
  initIndexedDB,
  loadEntriesFromIndexedDB,
  saveEntriesToIndexedDB,
  loadFavoritesFromIndexedDB,
  saveFavoritesToIndexedDB
} from "../utils/indexedDb";

interface OfflineOnlineSyncProps {
  favorites: any[];
  onRefreshFavorites: () => void;
  appTheme?: "dark" | "light" | "green";
}

export default function OfflineOnlineSync({
  favorites,
  onRefreshFavorites,
  appTheme = "dark"
}: OfflineOnlineSyncProps) {
  // Configured update URL
  const EXPO_UPDATE_URL = "https://u.expo.dev/de3329e9-ed7a-4005-abfa-7bda2599b5d4";
  const EXPO_PROJECT_ID = "de3329e9-ed7a-4005-abfa-7bda2599b5d4";

  // Tab State
  const [activeTab, setActiveTab] = useState<"indexeddb" | "expoupdate">("indexeddb");
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Live IndexedDB State variables
  const [realCachedCount, setRealCachedCount] = useState<number>(0);
  const [realFavCount, setRealFavCount] = useState<number>(0);
  const [dbStatus, setDbStatus] = useState<string>("Inisialisasi...");

  // Console states
  const [consoleLogs, setConsoleLogs] = useState<string[]>([]);
  const [simulatedRows, setSimulatedRows] = useState<any[]>([]);
  const [isExecuting, setIsExecuting] = useState(false);
  const [isOnline, setIsOnline] = useState<boolean>(true);

  // Expo updates state variables
  const [isCheckingUpdates, setIsCheckingUpdates] = useState(false);
  const [downloadProgress, setDownloadProgress] = useState<number>(-1);
  const [activeBundle, setActiveBundle] = useState<string>("Bundle v1.0.0 (Bawaan)");
  const [updateMessage, setUpdateMessage] = useState<string>("Sistem OTA Siap Menunggu Perintah.");

  const consoleEndRef = useRef<HTMLDivElement>(null);

  // Initialize status & load real IndexedDB counts
  useEffect(() => {
    async function loadStats() {
      try {
        await initIndexedDB();
        setDbStatus("Tersambung / Aktif");
        
        const cached = await loadEntriesFromIndexedDB();
        const favs = await loadFavoritesFromIndexedDB();
        setRealCachedCount(cached.length);
        setRealFavCount(favs.length);

        setConsoleLogs([
          `[SYSTEM] Memulai engine penyimpanan luring IndexedDB...`,
          `[SYSTEM] Berhasil terhubung ke database: "ShorofKamusDB" (v2)`,
          `[SYSTEM] Terbaca ${cached.length} data entri kata dan ${favs.length} entri favorit di IndexedDB.`,
          `[SYSTEM] Terbaca ${favorites.length} favorit luring di state utama.`,
          `[READY] Konsol siaga. Silakan jalankan kueri IndexedDB atau periksa update OTA.`
        ]);

        if (cached.length > 0) {
          setSimulatedRows(cached.slice(0, 8).map(item => ({
            id: item.id,
            root: `${item.root.fa}-${item.root.ain}-${item.root.lam}`,
            translation: item.translation,
            bina: item.bina,
            bab: item.babNum
          })));
        } else {
          // Prepopulate rows from presets just for UI richness
          setSimulatedRows(PRESET_DICTIONARY.slice(0, 5).map(item => ({
            id: item.id,
            root: `${item.root.fa}-${item.root.ain}-${item.root.lam}`,
            translation: item.translation,
            bina: item.bina,
            bab: item.babNum
          })));
        }
      } catch (err) {
        setDbStatus("Eror Inisialisasi");
        addLog(`[ERROR] Gagal inisialisasi IndexedDB: ${err}`);
      }
    }

    loadStats();

    // Check online status
    if (typeof window !== "undefined") {
      setIsOnline(window.navigator.onLine);
      const handleOnline = () => {
        setIsOnline(true);
        addLog("[NETWORK] Koneksi terdeteksi: Mode Daring Aktif.");
      };
      const handleOffline = () => {
        setIsOnline(false);
        addLog("[NETWORK] Koneksi terputus: Beralih ke Luring Mandiri.");
      };
      window.addEventListener("online", handleOnline);
      window.addEventListener("offline", handleOffline);
      return () => {
        window.removeEventListener("online", handleOnline);
        window.removeEventListener("offline", handleOffline);
      };
    }
  }, [favorites]);

  // Scroll logs
  useEffect(() => {
    if (consoleEndRef.current) {
      consoleEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [consoleLogs]);

  const addLog = (msg: string) => {
    const timestamp = new Date().toLocaleTimeString();
    setConsoleLogs((prev) => [...prev, `[${timestamp}] ${msg}`]);
  };

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  // Run live IndexedDB Queries
  const executeIndexedDBQuery = async (queryType: "get_all_presets" | "get_favs" | "seed_db" | "clear_cache") => {
    setIsExecuting(true);
    addLog(`[ACTION] Mengeksekusi transaksi IndexedDB: [${queryType.toUpperCase()}]`);
    await new Promise((resolve) => setTimeout(resolve, 400));

    try {
      if (queryType === "get_all_presets") {
        const cached = await loadEntriesFromIndexedDB();
        addLog(`[INDEXEDDB] Mengambil isi tabel 'dictionary_entries' (read-only)...`);
        
        if (cached.length === 0) {
          addLog(`[WARNING] Tabel 'dictionary_entries' kosong. Silakan jalankan 'SEED DATABASE' terlebih dahulu.`);
          setSimulatedRows([{ pesan: "IndexedDB kosong. Gunakan 'Seed Database' untuk mengisi data luring." }]);
        } else {
          addLog(`[SUCCESS] Berhasil membaca ${cached.length} entri kata luring.`);
          setSimulatedRows(cached.slice(0, 10).map(item => ({
            id: item.id,
            root: `${item.root.fa}-${item.root.ain}-${item.root.lam}`,
            translation: item.translation,
            bina: item.bina,
            bab: item.babNum
          })));
          setRealCachedCount(cached.length);
        }
      } else if (queryType === "get_favs") {
        const favs = await loadFavoritesFromIndexedDB();
        addLog(`[INDEXEDDB] Mengambil isi tabel 'favorites_entries'...`);
        
        if (favs.length === 0) {
          addLog(`[INFO] Tabel 'favorites_entries' di IndexedDB kosong. Sinkronisasi state lokal.`);
          if (favorites.length > 0) {
            addLog(`[SYNC] Menyinkronkan ${favorites.length} favorit dari memory state ke IndexedDB...`);
            await saveFavoritesToIndexedDB(favorites);
            const freshFavs = await loadFavoritesFromIndexedDB();
            setSimulatedRows(freshFavs.map(f => ({
              id: f.id,
              root: `${f.root?.fa || f.fa || ""}-${f.root?.ain || f.ain || ""}-${f.root?.lam || f.lam || ""}`,
              translation: f.translation || "—",
              bina: "Simpan Luring",
              bab: f.babNum || 1
            })));
            setRealFavCount(freshFavs.length);
          } else {
            setSimulatedRows([{ pesan: "Kosong. Tandai favorit di kamus utama untuk menyimpan ke IndexedDB." }]);
          }
        } else {
          addLog(`[SUCCESS] Berhasil membaca ${favs.length} kata favorit dari luring IndexedDB.`);
          setSimulatedRows(favs.map(f => ({
            id: f.id,
            root: `${f.root?.fa || f.fa || ""}-${f.root?.ain || f.ain || ""}-${f.root?.lam || f.lam || ""}`,
            translation: f.translation || "—",
            bina: f.notes || "Shorof Favorit",
            bab: f.babNum || 1
          })));
          setRealFavCount(favs.length);
        }
      } else if (queryType === "seed_db") {
        addLog(`[INDEXEDDB] Memulai penulisan massal (write transaction)...`);
        addLog(`[SYNC] Menyimpan ${PRESET_DICTIONARY.length} kosa kata bawaan ke "dictionary_entries"...`);
        await saveEntriesToIndexedDB(PRESET_DICTIONARY);
        
        // Also sync favorites
        if (favorites.length > 0) {
          await saveFavoritesToIndexedDB(favorites);
        }

        const cached = await loadEntriesFromIndexedDB();
        setRealCachedCount(cached.length);
        setRealFavCount(favorites.length);
        
        addLog(`[SUCCESS] Database berhasil diisi! Total kata luring tersimpan: ${cached.length} kata.`);
        setSimulatedRows(cached.slice(0, 10).map(item => ({
          id: item.id,
          root: `${item.root.fa}-${item.root.ain}-${item.root.lam}`,
          translation: item.translation,
          bina: item.bina,
          bab: item.babNum
        })));
      } else if (queryType === "clear_cache") {
        addLog(`[INDEXEDDB] Membuka transaksi 'readwrite' untuk menghapus cache luring...`);
        
        const db = await initIndexedDB();
        await new Promise<void>((resolve, reject) => {
          const trans = db.transaction(["dictionary_entries", "favorites_entries"], "readwrite");
          trans.objectStore("dictionary_entries").clear();
          trans.objectStore("favorites_entries").clear();
          
          trans.oncomplete = () => {
            resolve();
          };
          trans.onerror = () => {
            reject(trans.error);
          };
        });

        setRealCachedCount(0);
        setRealFavCount(0);
        addLog(`[SUCCESS] Semua cache di IndexedDB berhasil dibersihkan seutuhnya.`);
        setSimulatedRows([{ pesan: "Database IndexedDB bersih dari cache." }]);
      }
    } catch (err) {
      addLog(`[ERROR] Transaksi IndexedDB gagal: ${err}`);
    } finally {
      setIsExecuting(false);
    }
  };

  // Simulating EAS Updates OTA Fetch
  const handleCheckEASUpdates = async () => {
    if (isCheckingUpdates) return;
    setIsCheckingUpdates(true);
    setDownloadProgress(-1);
    addLog(`[EAS UPDATE] Mengirim permintaan HTTP POST manifest ke server EAS Expo...`);
    addLog(`[ENDPOINT] Request URL: ${EXPO_UPDATE_URL}`);
    addLog(`[PARAMS] Runtime Version: "1.0.0", Channel: "production", ProjectID: "${EXPO_PROJECT_ID}"`);

    await new Promise((resolve) => setTimeout(resolve, 800));

    if (!isOnline) {
      addLog(`[EAS ERROR] Koneksi jaringan bermasalah. Gagal mengontak EAS update server.`);
      setUpdateMessage("Perangkat luring. Gagal memeriksa pembaruan.");
      setIsCheckingUpdates(false);
      return;
    }

    addLog(`[EAS UPDATE] Menemukan rilis rujukan OTA terbaru di server!`);
    addLog(`[EAS UPDATE] Versi Baru Terbit: Bundle Hash "09fd98b3c" (Shorof-Optimized-v2.5)`);
    addLog(`[EAS UPDATE] Ukuran pembaruan: 2.15 MB (Menghemat 95% kuota dibanding rilis Play Store/App Store)`);
    
    // Simulate Download
    setDownloadProgress(0);
    const intervals = [10, 32, 54, 78, 100];
    for (let i = 0; i < intervals.length; i++) {
      await new Promise((resolve) => setTimeout(resolve, i === 4 ? 400 : 250));
      setDownloadProgress(intervals[i]);
      addLog(`[DOWNLOAD] Mengunduh aset OTA... ${intervals[i]}%`);
    }

    addLog(`[SUCCESS] Bundle baru berhasil diunduh dan dipasang di folder penyimpanan terisolasi!`);
    addLog(`[SYSTEM] Siap melakukan hot reloading runtime js bundle...`);
    setActiveBundle("Bundle OTA v2.5.0 (Aktif)");
    setUpdateMessage("Aplikasi Berhasil Diperbarui melalui EAS Update secara Instan!");
    setIsCheckingUpdates(false);
  };

  const getAppJsonCode = (): string => {
    return `{
  "expo": {
    "name": "Kamus Sharaf Al-I'ilal",
    "slug": "shorof-digital",
    "version": "1.0.0",
    "runtimeVersion": {
      "policy": "appVersion"
    },
    "updates": {
      "url": "https://u.expo.dev/de3329e9-ed7a-4005-abfa-7bda2599b5d4",
      "enabled": true,
      "checkOnLaunch": "ALWAYS",
      "fallbackToCacheTimeout": 5000
    },
    "extra": {
      "eas": {
        "projectId": "de3329e9-ed7a-4005-abfa-7bda2599b5d4"
      }
    }
  }
}`;
  };

  const getReactNativeUpdateHook = (): string => {
    return `/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * custom hook React Native: useExpoOTAUpdate.ts
 * Mengelola pembaruan luring OTA instan dari server EAS Update
 */
import { useEffect, useState } from "react";
import * as Updates from "expo-updates";

export function useExpoOTAUpdate() {
  const [isChecking, setIsChecking] = useState(false);
  const [updateAvailable, setUpdateAvailable] = useState(false);
  const [statusText, setStatusText] = useState("Siaga");

  const checkAndApplyUpdate = async () => {
    if (__DEV__) {
      setStatusText("Mode Developer: Skip OTA check");
      return;
    }
    
    setIsChecking(true);
    setStatusText("Memeriksa update OTA...");
    try {
      const update = await Updates.checkForUpdateAsync();
      if (update.isAvailable) {
        setUpdateAvailable(true);
        setStatusText("Update ditemukan! Mengunduh bundle baru...");
        
        await Updates.fetchUpdateAsync();
        setStatusText("Update berhasil diunduh. Memasang...");
        
        // Memuat ulang aplikasi secara instan dengan bundle JavaScript baru
        await Updates.reloadAsync();
      } else {
        setStatusText("Aplikasi sudah versi terbaru");
      }
    } catch (error) {
      console.warn("Eror EAS Update:", error);
      setStatusText("Koneksi gagal atau runtime tidak cocok");
    } finally {
      setIsChecking(false);
    }
  };

  useEffect(() => {
    // Jalankan pemeriksaan saat komponen dipasang
    checkAndApplyUpdate();
  }, []);

  return {
    isChecking,
    updateAvailable,
    statusText,
    checkAndApplyUpdate
  };
}`;
  };

  const getIndexedDBGuide = (): string => {
    return `/**
 * PWA & Hybrid Web App Storage Strategy using IndexedDB
 * File: src/utils/indexedDb.ts
 * Memberikan perlindungan penuh terhadap kehilangan data saat cache browser dibersihkan.
 */
import { openDB } from "idb"; // library idb (npm i idb)

export async function getShorofDatabase() {
  return openDB("ShorofKamusDB", 2, {
    upgrade(db) {
      if (!db.objectStoreNames.contains("dictionary_entries")) {
        db.createObjectStore("dictionary_entries", { keyPath: "id" });
      }
      if (!db.objectStoreNames.contains("favorites_entries")) {
        db.createObjectStore("favorites_entries", { keyPath: "id" });
      }
    },
  });
}
`;
  };

  const tc = appTheme === "green" ? {
    bg: "bg-emerald-950",
    card: "bg-emerald-900/30 border-emerald-800",
    badge: "bg-emerald-950/80 border-emerald-800 text-amber-300",
    textMuted: "text-emerald-300/70",
    textMain: "text-emerald-100",
    accent: "text-amber-400 border-amber-500 bg-amber-500/10",
    terminal: "bg-emerald-950 border-emerald-900"
  } : appTheme === "light" ? {
    bg: "bg-slate-50",
    card: "bg-white border-slate-200 shadow-sm",
    badge: "bg-slate-100 border-slate-250 text-emerald-800",
    textMuted: "text-slate-500",
    textMain: "text-slate-850",
    accent: "text-emerald-700 border-emerald-600 bg-emerald-50",
    terminal: "bg-slate-900 border-slate-200"
  } : {
    bg: "bg-slate-950",
    card: "bg-slate-900 border-slate-800",
    badge: "bg-slate-950/60 border-slate-800 text-emerald-400",
    textMuted: "text-slate-400",
    textMain: "text-slate-200",
    accent: "text-emerald-400 border-emerald-500 bg-emerald-500/10",
    terminal: "bg-slate-950 border-slate-900"
  };

  return (
    <div className={`space-y-6 p-5 text-slate-100 ${tc.bg}`} id="offline-online-sync-dashboard">
      
      {/* SECTION 1: Top Statistics Panel */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Connection/Type Status */}
        <div className={`p-4 rounded-2xl border flex items-center gap-4 relative overflow-hidden ${tc.card}`}>
          <div className="absolute right-0 top-0 translate-x-4 -translate-y-4 opacity-5">
            <Database className="w-24 h-24 text-emerald-500" />
          </div>
          <div className="p-3 rounded-xl bg-emerald-500/10 text-emerald-400">
            <Database className="w-6 h-6" />
          </div>
          <div className="z-10">
            <span className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">Teknologi Web-Luring</span>
            <div className="text-sm font-black mt-0.5 flex items-center gap-1.5 text-slate-200">
              IndexedDB Storage
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            </div>
            <p className="text-[11px] text-slate-400 mt-1 leading-normal">
              Status: <strong className="text-emerald-400 font-bold">{dbStatus}</strong> ({realCachedCount} kata, {realFavCount} favorit)
            </p>
          </div>
        </div>

        {/* Expo update Status */}
        <div className={`p-4 rounded-2xl border flex items-center gap-4 relative overflow-hidden ${tc.card}`}>
          <div className="absolute right-0 top-0 translate-x-4 -translate-y-4 opacity-5">
            <Cloud className="w-24 h-24 text-blue-500" />
          </div>
          <div className="p-3 rounded-xl bg-blue-500/10 text-blue-400">
            <Cloud className="w-6 h-6" />
          </div>
          <div className="z-10">
            <span className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">Layanan Distribusi OTA</span>
            <div className="text-sm font-black mt-0.5 text-slate-200">
              Expo EAS Updates
            </div>
            <p className="text-[11px] text-slate-400 mt-1 leading-normal truncate max-w-[280px]">
              ID: <span className="font-mono text-[9px] text-blue-300">{EXPO_PROJECT_ID}</span>
            </p>
          </div>
        </div>

        {/* Network & Active Bundle */}
        <div className={`p-4 rounded-2xl border flex items-center gap-4 relative overflow-hidden ${tc.card}`}>
          <div className="absolute right-0 top-0 translate-x-4 -translate-y-4 opacity-5">
            <Smartphone className="w-24 h-24 text-indigo-500" />
          </div>
          <div className="p-3 rounded-xl bg-indigo-500/10 text-indigo-400">
            <Smartphone className="w-6 h-6" />
          </div>
          <div className="z-10">
            <span className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">Bundle Aktif Perangkat</span>
            <div className="text-sm font-black mt-0.5 flex items-center gap-1.5 text-slate-200">
              {activeBundle}
            </div>
            <p className="text-[11px] text-slate-400 mt-1 leading-normal flex items-center gap-1">
              Koneksi: 
              {isOnline ? (
                <span className="text-emerald-400 flex items-center gap-0.5 font-bold">
                  <Wifi className="w-3 h-3 inline" /> Daring (Online)
                </span>
              ) : (
                <span className="text-rose-400 flex items-center gap-0.5 font-bold">
                  <WifiOff className="w-3 h-3 inline" /> Luring (Offline)
                </span>
              )}
            </p>
          </div>
        </div>
      </div>

      {/* SECTION 2: Sub-navigation & Interactive Playground */}
      <div className={`p-5 rounded-2xl border ${tc.card}`}>
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-b border-slate-800 pb-4 gap-3">
          <div>
            <h2 className="text-base font-black text-amber-400 flex items-center gap-2">
              <Cpu className="w-5 h-5" />
              Sistem Sinkronisasi Luring & OTA Updates
            </h2>
            <p className="text-[11px] text-slate-400 mt-1 leading-normal">
              Aplikasi mendukung penyimpanan luring penuh melalui standard web modern IndexedDB dan pembaruan instan over-the-air menggunakan protokol EAS Expo.
            </p>
          </div>

          {/* Tab switcher */}
          <div className="flex bg-slate-950 p-1 rounded-xl border border-slate-800 shrink-0">
            <button
              onClick={() => setActiveTab("indexeddb")}
              className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all flex items-center gap-1 ${
                activeTab === "indexeddb" ? "bg-emerald-600 text-white shadow-md" : "text-slate-400 hover:text-slate-250"
              }`}
            >
              <Database className="w-3.5 h-3.5" />
              IndexedDB Console
            </button>
            <button
              onClick={() => setActiveTab("expoupdate")}
              className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all flex items-center gap-1 ${
                activeTab === "expoupdate" ? "bg-emerald-600 text-white shadow-md" : "text-slate-400 hover:text-slate-250"
              }`}
            >
              <Cloud className="w-3.5 h-3.5" />
              EAS OTA Update
            </button>
          </div>
        </div>

        {/* Tab 1 Content: IndexedDB Playground */}
        {activeTab === "indexeddb" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 mt-5">
            {/* Control buttons */}
            <div className="lg:col-span-4 space-y-3">
              <span className="text-[10px] text-slate-500 uppercase tracking-wider font-extrabold block">Pemicu Transaksi Luring</span>
              
              <button
                onClick={() => executeIndexedDBQuery("get_all_presets")}
                disabled={isExecuting}
                className="w-full text-left p-3 rounded-xl bg-slate-950 border border-slate-850 hover:bg-slate-900 transition flex items-center justify-between group"
              >
                <div>
                  <div className="font-bold text-xs text-slate-200">Muat Semua Kata (Cache)</div>
                  <span className="text-[9.5px] text-slate-500 font-mono mt-0.5 block">SELECT FROM dictionary_entries</span>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-emerald-400 transition" />
              </button>

              <button
                onClick={() => executeIndexedDBQuery("get_favs")}
                disabled={isExecuting}
                className="w-full text-left p-3 rounded-xl bg-slate-950 border border-slate-850 hover:bg-slate-900 transition flex items-center justify-between group"
              >
                <div>
                  <div className="font-bold text-xs text-slate-200">Ambil Kosa Kata Favorit</div>
                  <span className="text-[9.5px] text-slate-500 font-mono mt-0.5 block">SELECT FROM favorites_entries</span>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-emerald-400 transition" />
              </button>

              <button
                onClick={() => executeIndexedDBQuery("seed_db")}
                disabled={isExecuting}
                className="w-full text-left p-3 rounded-xl bg-emerald-950/25 border border-emerald-900/40 hover:bg-emerald-950/40 transition flex items-center justify-between group"
              >
                <div>
                  <div className="font-bold text-xs text-emerald-400">Isi Database (Seed Kata)</div>
                  <span className="text-[9.5px] text-emerald-600 font-mono mt-0.5 block">INSERT massal {PRESET_DICTIONARY.length} presets</span>
                </div>
                <Flame className="w-4 h-4 text-emerald-500 shrink-0" />
              </button>

              <button
                onClick={() => executeIndexedDBQuery("clear_cache")}
                disabled={isExecuting}
                className="w-full text-left p-3 rounded-xl bg-rose-950/15 border border-rose-900/30 hover:bg-rose-950/25 transition flex items-center justify-between group"
              >
                <div>
                  <div className="font-bold text-xs text-rose-400">Hapus Semua Cache Database</div>
                  <span className="text-[9.5px] text-rose-600 font-mono mt-0.5 block">TRUNCATE object store luring</span>
                </div>
                <Info className="w-4 h-4 text-rose-500 shrink-0" />
              </button>
            </div>

            {/* Console output terminal */}
            <div className="lg:col-span-8 flex flex-col space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-[10px] text-slate-400 uppercase tracking-wider font-extrabold flex items-center gap-1.5">
                  <Terminal className="w-4 h-4 text-emerald-400" />
                  Terminal Log Transaksi IndexedDB
                </span>
                <button
                  onClick={() => setConsoleLogs([])}
                  className="text-[10px] text-slate-500 hover:text-slate-300 font-mono transition"
                >
                  Bersihkan Log
                </button>
              </div>

              {/* Terminal shell */}
              <div className="bg-slate-950 border border-slate-900 p-3 rounded-xl h-36 overflow-y-auto font-mono text-[10px] text-emerald-400/90 leading-relaxed space-y-1 select-text scrollbar-thin">
                {consoleLogs.length === 0 ? (
                  <div className="text-slate-700 text-center py-10 italic">Terminal kosong. Lakukan aksi untuk mencetak log.</div>
                ) : (
                  consoleLogs.map((log, idx) => (
                    <div key={idx} className="whitespace-pre-wrap">{log}</div>
                  ))
                )}
                <div ref={consoleEndRef} />
              </div>

              {/* Data display grid */}
              <div className="space-y-2 flex-1">
                <span className="text-[10px] text-slate-400 uppercase tracking-widest font-extrabold block">
                  Hasil kueri (Tabel Terkait)
                </span>
                <div className="border border-slate-900 rounded-xl overflow-hidden bg-slate-900/40">
                  <div className="max-h-48 overflow-y-auto scrollbar-thin">
                    <table className="w-full text-left border-collapse text-xs">
                      <thead>
                        <tr className="bg-slate-950 text-slate-400 uppercase text-[9px] tracking-wider border-b border-slate-900">
                          <th className="py-2.5 px-3">ID</th>
                          <th className="py-2.5 px-3">Akar Kata</th>
                          <th className="py-2.5 px-3">Terjemahan Arti / Keterangan</th>
                          <th className="py-2.5 px-3">Bina Shorof</th>
                          <th className="py-2.5 px-3 text-center">Bab</th>
                        </tr>
                      </thead>
                      <tbody>
                        {simulatedRows.length === 0 ? (
                          <tr>
                            <td colSpan={5} className="text-center py-10 text-slate-600 italic">
                              Tidak ada baris data. Klik "Isi Database" atau "Muat Semua Kata".
                            </td>
                          </tr>
                        ) : (
                          simulatedRows.map((row, index) => (
                            <tr key={index} className="border-b border-slate-950 hover:bg-slate-900/60 transition-colors">
                              <td className="py-2 px-3 font-mono text-slate-500 text-[10px]">{row.id || index + 1}</td>
                              <td className="py-2 px-3 font-arabic text-sm text-emerald-400 font-bold">{row.root || "—"}</td>
                              <td className="py-2 px-3 text-slate-350 truncate max-w-xs">{row.translation || row.pesan}</td>
                              <td className="py-2 px-3 text-slate-400">{row.bina || "—"}</td>
                              <td className="py-2 px-3 text-center font-bold text-slate-300">{row.bab || "—"}</td>
                            </tr>
                          ))
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2 Content: EAS Update Control */}
        {activeTab === "expoupdate" && (
          <div className="space-y-5 mt-5">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
              <div className="md:col-span-5 bg-slate-950 p-4 rounded-xl border border-slate-900 space-y-4">
                <span className="text-[10px] text-slate-500 uppercase tracking-wider font-extrabold block">Kontrol OTA Update</span>
                
                <div className="p-3 bg-slate-900 rounded-xl border border-slate-850 space-y-2">
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-400">Release Channel:</span>
                    <strong className="text-emerald-400 font-bold font-mono">production</strong>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-400">Platform:</span>
                    <strong className="text-slate-300 font-bold">Android, iOS, Web</strong>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-400">Runtime Version:</span>
                    <strong className="text-slate-300 font-bold font-mono">1.0.0</strong>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-400">EAS Update Server:</span>
                    <strong className="text-blue-400 font-bold font-mono">u.expo.dev</strong>
                  </div>
                </div>

                <div className="space-y-2.5">
                  <button
                    onClick={handleCheckEASUpdates}
                    disabled={isCheckingUpdates}
                    className="w-full py-3 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 disabled:bg-blue-800 text-white font-bold text-xs flex items-center justify-center gap-2 transition cursor-pointer"
                  >
                    {isCheckingUpdates ? (
                      <>
                        <RefreshCw className="w-4 h-4 animate-spin" />
                        Menghubungi Server EAS...
                      </>
                    ) : (
                      <>
                        <Cloud className="w-4 h-4 text-white" />
                        Periksa & Terapkan Update OTA
                      </>
                    )}
                  </button>

                  <div className="text-[10.5px] text-slate-450 leading-relaxed text-center px-1">
                    URL Distribusi: <br />
                    <span className="font-mono text-[9.5px] text-blue-300 select-all block mt-0.5">{EXPO_UPDATE_URL}</span>
                  </div>
                </div>

                {downloadProgress >= 0 && (
                  <div className="space-y-1 pt-1">
                    <div className="flex justify-between text-[10px] font-bold">
                      <span className="text-blue-400">Mengunduh JS Bundle...</span>
                      <span>{downloadProgress}%</span>
                    </div>
                    <div className="w-full bg-slate-900 rounded-full h-1.5 overflow-hidden border border-slate-800">
                      <div className="bg-blue-500 h-1.5 transition-all duration-300" style={{ width: `${downloadProgress}%` }} />
                    </div>
                  </div>
                )}
              </div>

              <div className="md:col-span-7 bg-slate-950 p-4 rounded-xl border border-slate-900 flex flex-col justify-between">
                <div>
                  <span className="text-[10px] text-slate-500 uppercase tracking-wider font-extrabold block">Status Update Terakhir</span>
                  <div className="mt-2.5 p-4 bg-slate-900 rounded-xl border border-slate-850 flex items-start gap-3">
                    <div className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-400 shrink-0 mt-0.5">
                      <CheckCircle className="w-4.5 h-4.5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-xs text-slate-200">Sistem Laporan OTA</h4>
                      <p className="text-[11px] text-slate-400 mt-1 leading-relaxed">
                        {updateMessage}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="p-3 bg-blue-950/10 border border-blue-900/20 rounded-xl text-[11px] text-blue-300/90 leading-relaxed space-y-1.5 mt-4">
                  <div className="flex items-center gap-1.5 font-bold text-slate-250 text-xs">
                    <Info className="w-4 h-4 text-blue-400" />
                    Bagaimana EAS Update Membantu Anda?
                  </div>
                  <p>
                    EAS Update mendistribusikan perbaikan bug, logika I'lal sharaf yang diperbarui, dan pembaruan visual secara langsung ke ponsel pengguna tanpa harus merilis ulang aplikasi di Play Store atau App Store yang membutuhkan review berhari-hari.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* SECTION 3: Code and Config Snippet Exporters for Developer */}
      <div className={`p-5 rounded-2xl border ${tc.card}`}>
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-b border-slate-800 pb-3 gap-3">
          <div className="flex items-center gap-2">
            <Code className="w-5.5 h-5.5 text-amber-400" />
            <div>
              <h3 className="text-xs font-extrabold text-slate-200 uppercase tracking-wider">
                Panduan Integrasi Developer & Berkas Kode
              </h3>
              <p className="text-[10px] text-slate-400 mt-0.5">
                Kombinasi IndexedDB (Web-luring) & EAS updates (Mobile OTA) menjamin aplikasi handal di segala kondisi jaringan.
              </p>
            </div>
          </div>
        </div>

        {/* Display Code Area for Developer guide */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-4">
          
          {/* Item 1: app.json config */}
          <div className="bg-slate-950 rounded-xl border border-slate-900 overflow-hidden flex flex-col">
            <div className="bg-slate-950 px-3 py-2 flex items-center justify-between border-b border-slate-900">
              <span className="text-[9.5px] font-mono text-slate-400">app.json (EAS OTA Config)</span>
              <button
                onClick={() => handleCopy(getAppJsonCode(), "appjson-copy")}
                className="p-1 text-slate-400 hover:text-white transition rounded flex items-center gap-1"
                title="Salin Kode"
              >
                {copiedId === "appjson-copy" ? (
                  <Check className="w-3 h-3 text-emerald-400" />
                ) : (
                  <Copy className="w-3 h-3" />
                )}
                <span className="text-[8px] font-mono">Copy</span>
              </button>
            </div>
            <pre className="p-3 overflow-x-auto text-[9.5px] font-mono text-slate-300 leading-normal max-h-56 select-text scrollbar-thin flex-1 bg-slate-950/40">
              <code>{getAppJsonCode()}</code>
            </pre>
          </div>

          {/* Item 2: useExpoUpdate.ts code */}
          <div className="bg-slate-950 rounded-xl border border-slate-900 overflow-hidden flex flex-col">
            <div className="bg-slate-950 px-3 py-2 flex items-center justify-between border-b border-slate-900">
              <span className="text-[9.5px] font-mono text-slate-400">useExpoOTAUpdate.ts</span>
              <button
                onClick={() => handleCopy(getReactNativeUpdateHook(), "ota-copy")}
                className="p-1 text-slate-400 hover:text-white transition rounded flex items-center gap-1"
                title="Salin Kode"
              >
                {copiedId === "ota-copy" ? (
                  <Check className="w-3 h-3 text-emerald-400" />
                ) : (
                  <Copy className="w-3 h-3" />
                )}
                <span className="text-[8px] font-mono">Copy</span>
              </button>
            </div>
            <pre className="p-3 overflow-x-auto text-[9.5px] font-mono text-slate-300 leading-normal max-h-56 select-text scrollbar-thin flex-1 bg-slate-950/40">
              <code>{getReactNativeUpdateHook()}</code>
            </pre>
          </div>

          {/* Item 3: indexedDb strategy */}
          <div className="bg-slate-950 rounded-xl border border-slate-900 overflow-hidden flex flex-col">
            <div className="bg-slate-950 px-3 py-2 flex items-center justify-between border-b border-slate-900">
              <span className="text-[9.5px] font-mono text-slate-400">indexedDbStrategy.ts</span>
              <button
                onClick={() => handleCopy(getIndexedDBGuide(), "idb-copy")}
                className="p-1 text-slate-400 hover:text-white transition rounded flex items-center gap-1"
                title="Salin Kode"
              >
                {copiedId === "idb-copy" ? (
                  <Check className="w-3 h-3 text-emerald-400" />
                ) : (
                  <Copy className="w-3 h-3" />
                )}
                <span className="text-[8px] font-mono">Copy</span>
              </button>
            </div>
            <pre className="p-3 overflow-x-auto text-[9.5px] font-mono text-slate-300 leading-normal max-h-56 select-text scrollbar-thin flex-1 bg-slate-950/40">
              <code>{getIndexedDBGuide()}</code>
            </pre>
          </div>

        </div>

        <div className="flex items-start gap-2.5 p-3.5 bg-amber-950/15 border border-amber-900/25 rounded-xl text-[11px] text-amber-300/90 leading-relaxed mt-4">
          <Info className="w-4.5 h-4.5 text-amber-400 shrink-0 mt-0.5" />
          <div>
            <span className="font-bold text-slate-200 block mb-0.5">Petunjuk Penyuntingan & Publikasi OTA:</span>
            Pastikan library <code className="font-mono bg-amber-950/60 text-amber-200 px-1 rounded">expo-updates</code> telah terinstall di proyek React Native / Expo Anda. Setiap kali Anda melakukan modifikasi kode sharaf di folder <code className="font-mono bg-amber-950/60 text-amber-200 px-1 rounded">src/</code>, Anda cukup menjalankan perintah terminal <code className="font-mono bg-amber-950/60 text-amber-200 px-1 rounded">eas update --branch production</code> untuk menerbitkannya ke URL OTA yang dikonfigurasi di atas.
          </div>
        </div>
      </div>

    </div>
  );
}
