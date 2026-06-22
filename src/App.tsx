/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useMemo, useRef } from "react";
import {
  Search,
  BookOpen,
  Award,
  CreditCard,
  Plus,
  Check,
  X,
  User,
  Edit3,
  Bookmark,
  ChevronRight,
  Sparkles,
  Info,
  Calendar,
  Layers,
  FileText,
  BookmarkCheck,
  ChevronLeft,
  Settings,
  Bell,
  Trash2,
  RefreshCw,
  LockKeyhole,
  ChevronDown,
  ChevronUp
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { DictionaryEntry, TasrifIstilahi, DataWazan } from "./types";
import { PRESET_DICTIONARY, WAZAN_TEMPLATES, getVocalizedRoot } from "./utils/dictionaryData";
import { IilalEngine } from "./utils/iilalEngine";
import { analyzeSifatMusyabihatPlural } from "./utils/sifatMusyabihatPlural";
import { analyzeIsimFailPlural } from "./utils/isimFailPlural";
import { analyzeIsimMafulPlural } from "./utils/isimMafulPlural";
import { analyzeIsimZamanMakanPlural, analyzeIsimAlatPlural } from "./utils/isimZamanMakanAlatPlural";

// Core Arabic Views
import TabTasrifIstilahi from "./components/TasrifIstilahiView";
import TabTasrifLughowi from "./components/TasrifLughowiView";
import TabShorofMasdarTable from "./components/ShorofMasdarTableView";

// High-quality palette definition for SDR global themes
const ThemeConfig = {
  dark: {
    bg: "bg-slate-950 text-slate-200",
    header: "bg-slate-900 border-b border-slate-800",
    headerText: "text-white",
    subText: "text-slate-400",
    card: "bg-slate-900 border border-slate-800",
    input: "bg-slate-950 border border-slate-800 text-white placeholder-slate-500",
    textWhite: "text-white",
    border: "border-slate-800",
    borderHeader: "border-slate-800",
    badgeBg: "bg-slate-950/60 border border-slate-800",
    cardInner: "bg-slate-950/20 border border-slate-850/65",
    tabList: "bg-slate-950 border-b border-slate-800/80",
    tabBtnActive: "bg-emerald-600 border border-emerald-500/20 text-white shadow-emerald-500/10",
    tabBtnInactive: "text-slate-450 hover:text-slate-200 hover:bg-slate-900/50",
    accentText: "text-emerald-400",
    accentBorder: "border-emerald-500",
    presetBtnSel: "bg-slate-950 border-emerald-500 text-emerald-400 shadow-lg shadow-emerald-500/5 scale-102",
    presetBtnNor: "bg-slate-950/40 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200",
    groupHeaderBadge: "bg-slate-950 text-emerald-400 border border-slate-850",
    groupHeaderLabel: "text-slate-500",
    groupHeaderTitle: "text-emerald-500",
    highlightTitle: "text-amber-400",
    panelInnerBg: "bg-slate-900/40 border border-slate-850/60",
    textLabel: "text-slate-500",
    profileBg: "bg-slate-950/60 border border-slate-800"
  },
  light: {
    bg: "bg-slate-50 text-slate-800",
    header: "bg-white border-b border-slate-200 shadow-sm",
    headerText: "text-slate-900",
    subText: "text-slate-500",
    card: "bg-white border border-slate-200 shadow-xs",
    input: "bg-slate-50 border border-slate-300 text-slate-900 placeholder-slate-400",
    textWhite: "text-slate-900",
    border: "border-slate-200",
    borderHeader: "border-slate-200",
    badgeBg: "bg-slate-100/60 border border-slate-250",
    cardInner: "bg-slate-50 border border-slate-200",
    tabList: "bg-slate-100 border-b border-slate-200",
    tabBtnActive: "bg-emerald-600 border border-emerald-500/20 text-white shadow-emerald-500/10",
    tabBtnInactive: "text-slate-600 hover:text-slate-900 hover:bg-slate-100/50",
    accentText: "text-emerald-700",
    accentBorder: "border-emerald-600",
    presetBtnSel: "bg-emerald-50 border-emerald-600 text-emerald-700 shadow-sm shadow-emerald-600/5 scale-102",
    presetBtnNor: "bg-slate-50 border-slate-200 text-slate-600 hover:border-slate-300 hover:text-slate-900",
    groupHeaderBadge: "bg-slate-100 text-emerald-750 border border-slate-200",
    groupHeaderLabel: "text-slate-400",
    groupHeaderTitle: "text-emerald-600",
    highlightTitle: "text-amber-700",
    panelInnerBg: "bg-slate-100/60 border border-slate-200",
    textLabel: "text-slate-400",
    profileBg: "bg-slate-100 border border-slate-200"
  },
  green: {
    bg: "bg-emerald-950 text-emerald-100",
    header: "bg-emerald-900/90 border-b border-emerald-850 shadow-md",
    headerText: "text-amber-100",
    subText: "text-emerald-300/80",
    card: "bg-emerald-900/40 border border-emerald-800/80 shadow-md",
    input: "bg-emerald-950 border border-emerald-800 text-amber-100 placeholder-emerald-600/80",
    textWhite: "text-amber-100",
    border: "border-emerald-800/80",
    borderHeader: "border-emerald-850",
    badgeBg: "bg-emerald-950/60 border border-emerald-800",
    cardInner: "bg-emerald-950/40 border border-emerald-900/60",
    tabList: "bg-emerald-950/70 border-b border-emerald-800/50",
    tabBtnActive: "bg-amber-600 border border-amber-500/20 text-emerald-950 font-black shadow-amber-500/10",
    tabBtnInactive: "text-emerald-300 hover:text-white hover:bg-emerald-950/50",
    accentText: "text-amber-400",
    accentBorder: "border-amber-500",
    presetBtnSel: "bg-emerald-950 border-amber-500 text-amber-300 shadow-md shadow-amber-500/10 scale-102",
    presetBtnNor: "bg-emerald-950/30 border-emerald-900/70 text-emerald-300 hover:border-emerald-800 hover:text-white",
    groupHeaderBadge: "bg-emerald-950 text-amber-300 border border-emerald-900",
    groupHeaderLabel: "text-emerald-400/80",
    groupHeaderTitle: "text-amber-400",
    highlightTitle: "text-amber-300",
    panelInnerBg: "bg-emerald-950/50 border border-emerald-900/60",
    textLabel: "text-emerald-400/80",
    profileBg: "bg-emerald-950/60 border border-emerald-900/70"
  }
};

export default function App() {
  // Main Selection and Tab States
  const [selectedEntry, setSelectedEntry] = useState<DictionaryEntry>(PRESET_DICTIONARY[0]);
  const [activeTab, setActiveTab] = useState<"istilahi" | "lughowi" | "masdar" | "jama" | "iilal" | "favorites">("istilahi");
  const [activeJamakTab, setActiveJamakTab] = useState<"fail" | "maful" | "zamanmakan" | "alat" | "sifat">("fail");
  const [lafadzSize, setLafadzSize] = useState<"small" | "medium" | "large" | "xlarge">("medium");

  // Premium Activation States
  const [isPremium, setIsPremium] = useState<boolean>(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("sdr_premium_unlocked") === "true";
    }
    return false;
  });
  const [showPremiumModal, setShowPremiumModal] = useState<boolean>(false);
  const [activationCode, setActivationCode] = useState("");
  const [activationError, setActivationError] = useState("");
  const [isPaymentLoading, setIsPaymentLoading] = useState(false);
  const [paymentMessage, setPaymentMessage] = useState("");
  const [billingPlan, setBillingPlan] = useState<string>("");

  // User Customize Account States
  const [username, setUsername] = useState<string>(() => {
    if (typeof window !== "undefined") {
      let saved = localStorage.getItem("sdr_username");
      if (!saved) {
        const randomNum = Math.floor(1000 + Math.random() * 9000);
        saved = `Tamu Mulia ${randomNum}`;
        localStorage.setItem("sdr_username", saved);
      }
      return saved;
    }
    return "Tamu Mulia";
  });
  const [profilePhoto, setProfilePhoto] = useState<string>(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("sdr_profile_photo") || "avatar1";
    }
    return "avatar1";
  });
  const [showEditProfileModal, setShowEditProfileModal] = useState(false);

  // App Theme State
  const [appTheme, setAppTheme] = useState<"dark" | "light" | "green">(() => {
    if (typeof window !== "undefined") {
      return (localStorage.getItem("sdr_app_theme") as "dark" | "light" | "green") || "dark";
    }
    return "dark";
  });

  const handleSetTheme = (theme: "dark" | "light" | "green") => {
    setAppTheme(theme);
    localStorage.setItem("sdr_app_theme", theme);
  };

  // Collapsed Groups State for Side Navigation (Buka Tutup)
  const [collapsedBabs, setCollapsedBabs] = useState<Record<number, boolean>>({});
  const [collapsedBinas, setCollapsedBinas] = useState<Record<string, boolean>>({});
  const [collapsedHijaiyahs, setCollapsedHijaiyahs] = useState<Record<string, boolean>>({});

  // Search Presets State
  const [searchQuery, setSearchQuery] = useState("");
  const [presetGroupMode, setPresetGroupMode] = useState<"all" | "bab" | "bina" | "hijaiyah">("all");

  const filteredPresets = useMemo(() => {
    if (!searchQuery.trim()) return PRESET_DICTIONARY;
    const query = searchQuery.trim().toLowerCase();
    return PRESET_DICTIONARY.filter(entry => {
      const translationMatch = entry.translation.toLowerCase().includes(query);
      const latinRoot = `${entry.root.fa} ${entry.root.ain} ${entry.root.lam}`.toLowerCase();
      const latinRootMatch = latinRoot.includes(query);
      const arabicRoot = `${entry.root.fa}${entry.root.ain}${entry.root.lam}`;
      const arabicMatch = arabicRoot.includes(query);
      return translationMatch || latinRootMatch || arabicMatch;
    });
  }, [searchQuery]);

  const groupedPresetsByBab = useMemo(() => {
    const groups: Record<number, DictionaryEntry[]> = { 1: [], 2: [], 3: [], 4: [], 5: [], 6: [] };
    filteredPresets.forEach((entry) => {
      const b = entry.babNum;
      if (groups[b]) groups[b].push(entry);
    });
    return groups;
  }, [filteredPresets]);

  const groupedPresetsByBina = useMemo(() => {
    const groups: Record<string, DictionaryEntry[]> = {};
    filteredPresets.forEach((entry) => {
      const b = entry.bina || "Shohih";
      if (!groups[b]) groups[b] = [];
      groups[b].push(entry);
    });
    return groups;
  }, [filteredPresets]);

  const groupedPresetsByHijaiyah = useMemo(() => {
    const groups: Record<string, DictionaryEntry[]> = {};
    filteredPresets.forEach((entry) => {
      const f = entry.root.fa.trim();
      if (!groups[f]) groups[f] = [];
      groups[f].push(entry);
    });
    return groups;
  }, [filteredPresets]);

  // Global Theme config access
  const tc = ThemeConfig[appTheme];

  const isAllCollapsed = useMemo(() => {
    if (presetGroupMode === "bab") {
      return Object.keys(groupedPresetsByBab).every(k => collapsedBabs[Number(k)]);
    }
    if (presetGroupMode === "bina") {
      return Object.keys(groupedPresetsByBina).every(k => collapsedBinas[k]);
    }
    if (presetGroupMode === "hijaiyah") {
      return Object.keys(groupedPresetsByHijaiyah).every(k => collapsedHijaiyahs[k]);
    }
    return false;
  }, [presetGroupMode, collapsedBabs, collapsedBinas, collapsedHijaiyahs, groupedPresetsByBab, groupedPresetsByBina, groupedPresetsByHijaiyah]);

  const handleToggleAllGroups = () => {
    if (presetGroupMode === "bab") {
      const nextCollapsed = !isAllCollapsed;
      const update: Record<number, boolean> = {};
      Object.keys(groupedPresetsByBab).forEach(k => {
        update[Number(k)] = nextCollapsed;
      });
      setCollapsedBabs(update);
    } else if (presetGroupMode === "bina") {
      const nextCollapsed = !isAllCollapsed;
      const update: Record<string, boolean> = {};
      Object.keys(groupedPresetsByBina).forEach(k => {
        update[k] = nextCollapsed;
      });
      setCollapsedBinas(update);
    } else if (presetGroupMode === "hijaiyah") {
      const nextCollapsed = !isAllCollapsed;
      const update: Record<string, boolean> = {};
      Object.keys(groupedPresetsByHijaiyah).forEach(k => {
        update[k] = nextCollapsed;
      });
      setCollapsedHijaiyahs(update);
    }
  };

  // Convert selected entry into morphologically calculated data
  const activeWazanData = useMemo((): DataWazan => {
    const template = WAZAN_TEMPLATES[selectedEntry.babNum];
    let ainText = selectedEntry.root.ain;
    if (ainText === "ا" && selectedEntry.asal) {
      const cleanAsal = selectedEntry.asal.replace(/[\u064b-\u0652]/g, "");
      if (cleanAsal.length >= 2) {
        ainText = cleanAsal[1];
      }
    }
    return {
      fa: selectedEntry.root.fa,
      ain: ainText,
      lam: selectedEntry.root.lam,
      wazanMadhi: template.wazanMadhi,
      wazanMudhari: template.wazanMudhari,
      masdar: selectedEntry.masdar || template.masdar,
      sifatMusyabihat: selectedEntry.sifatMusyabihat || template.sifatMusyabihat,
      babNum: selectedEntry.babNum
    };
  }, [selectedEntry]);

  const calculatedTasrif = useMemo((): TasrifIstilahi => {
    return IilalEngine.tasrifIstilahiCustom(activeWazanData);
  }, [activeWazanData]);

  const structuralPlurals = useMemo(() => {
    return {
      fail: analyzeIsimFailPlural(selectedEntry),
      maful: analyzeIsimMafulPlural(selectedEntry),
      zamanmakan: analyzeIsimZamanMakanPlural(selectedEntry),
      alat: analyzeIsimAlatPlural(selectedEntry),
      sifat: analyzeSifatMusyabihatPlural(selectedEntry)
    };
  }, [selectedEntry]);

  // Profile management handlers
  const handleSaveProfile = (newUsername: string, newPhoto: string) => {
    setUsername(newUsername);
    setProfilePhoto(newPhoto);
    localStorage.setItem("sdr_username", newUsername);
    localStorage.setItem("sdr_profile_photo", newPhoto);
    setShowEditProfileModal(false);
  };

  const MOCK_PHOTOS = ["avatar1", "avatar2", "avatar3", "avatar4", "avatar5", "avatar6"];

  const renderProfileImage = (photoVal: string, sizeClass: string = "w-10 h-10") => {
    let bgClass = "";
    const letter = username ? username.charAt(0).toUpperCase() : "U";

    switch (photoVal) {
      case "avatar1": bgClass = "bg-gradient-to-br from-emerald-500 to-teal-600 text-white"; break;
      case "avatar2": bgClass = "bg-gradient-to-br from-blue-500 to-indigo-600 text-white"; break;
      case "avatar3": bgClass = "bg-gradient-to-br from-amber-500 to-orange-600 text-white"; break;
      case "avatar4": bgClass = "bg-gradient-to-br from-fuchsia-500 to-pink-600 text-white"; break;
      case "avatar5": bgClass = "bg-gradient-to-br from-rose-500 to-pink-600 text-white"; break;
      case "avatar6": bgClass = "bg-gradient-to-br from-violet-500 to-purple-700 text-white"; break;
      default: bgClass = "bg-gradient-to-br from-teal-500 to-emerald-600 text-white"; break;
    }

    return (
      <div className={`${sizeClass} rounded-full flex items-center justify-center shrink-0 border border-slate-700 font-bold text-sm shadow-sm uppercase ${bgClass}`}>
        {letter}
      </div>
    );
  };

  // Payment triggers with simulated Snap
  const handleSimulatePayment = (price: number, planName: string) => {
    setIsPaymentLoading(true);
    setBillingPlan(planName);
    setPaymentMessage("Menghubungkan ke Gerbang Pembayaran Midtrans Snap...");
    
    setTimeout(() => {
      setPaymentMessage(`[Midtrans] Membuat SNAP Transaksi Token untuk ${planName}...`);
    }, 1000);

    setTimeout(() => {
      setIsPaymentLoading(false);
    }, 2000);
  };

  const handleCompletePaymentSimulated = (success: boolean) => {
    if (success) {
      setIsPremium(true);
      localStorage.setItem("sdr_premium_unlocked", "true");
      setShowPremiumModal(false);
      alert(`Aktivasi Sukses! Fitur Premium untuk paket "${billingPlan}" diaktifkan secara luring.`);
    }
    setBillingPlan("");
  };

  const handleManualCodeUnlock = () => {
    if (activationCode.trim().toLowerCase() === "premium-shorof" || activationCode.trim() === "123456") {
      setIsPremium(true);
      localStorage.setItem("sdr_premium_unlocked", "true");
      setShowPremiumModal(false);
      setActivationCode("");
      setActivationError("");
      alert("Lisensi Premium berhasil diaktifkan dengan Kode Aktivasi!");
    } else {
      setActivationError("Kode Lisensi tidak valid atau kedaluwarsa.");
    }
  };

  return (
    <div className={`min-h-screen ${tc.bg} font-sans flex flex-col transition-colors duration-300`}>
      {/* Primary Desktop Navigation Bar */}
      <header className={`px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-lg sticky top-0 z-50 transition-all ${tc.header}`}>
        <div className="flex items-center space-x-3">
          <div className="bg-emerald-600 p-2.5 rounded-xl text-white shadow-emerald-500/20 shadow-md">
            <BookOpen className="w-5 h-5" />
          </div>
          <div>
            <h1 className={`text-lg font-black tracking-tight flex items-center gap-1.5 font-sans ${tc.headerText}`}>
              Shorof Digital Pro
            </h1>
            <p className={`text-[10px] font-medium uppercase tracking-wider ${tc.subText}`}>
              Kamus Pintar Sharaf & Analisis Kaidah I'lal
            </p>
          </div>
        </div>

        {/* Global User Profile & Premium Toggle */}
        <div className="flex items-center space-x-4">
          <div className={`flex items-center space-x-2 p-1.5 pr-3 rounded-full border transition-all ${tc.profileBg}`}>
            {renderProfileImage(profilePhoto)}
            <div className="text-left">
              <p className={`text-[9px] leading-none ${tc.subText}`}>Selamat Belajar,</p>
              <button 
                id="edit-profile-btn"
                onClick={() => setShowEditProfileModal(true)}
                className={`text-xs font-black hover:text-emerald-400 transition flex items-center gap-1 ${tc.headerText}`}
              >
                {username} <Edit3 className="w-2.5 h-2.5 text-slate-500" />
              </button>
            </div>
            {/* Gear Button */}
            <button
              onClick={() => setShowEditProfileModal(true)}
              className="p-1 text-slate-400 hover:text-white hover:bg-slate-800 rounded-md transition-colors"
              title="Pengaturan Akun & Profil"
            >
              <Settings className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Premium Status */}
          {isPremium ? (
            <div className="flex items-center space-x-1 bg-gradient-to-r from-amber-500/10 to-orange-500/10 border border-amber-500/30 text-amber-400 px-3 py-1.5 rounded-full text-xs font-black shadow select-none">
              <Award className="w-4 h-4 text-amber-500 animate-pulse" />
              <span>MASYARAKAT PRO</span>
            </div>
          ) : (
            <button
              id="activate-pro-btn"
              onClick={() => setShowPremiumModal(true)}
              className="cursor-pointer bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-slate-950 px-3.5 py-1.5 rounded-full text-xs font-bold flex items-center space-x-1.5 shadow-md transition-transform active:scale-95"
            >
              <LockKeyhole className="w-4 h-4" />
              <span>AKTIFKAN PREMIUM</span>
            </button>
          )}
        </div>
      </header>

      {/* Main Wide Adaptive Workspace Layout */}
      <main className="flex-1 w-full max-w-7xl mx-auto p-4 md:p-6 grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        
        {/* LEFT COLUMN: Search Preset & Root Meta details (span 4) */}
        <div className="lg:col-span-4 flex flex-col space-y-4">
          
          {/* Section: Search and Quick Verbs Slider */}
          <div className={`p-4 rounded-3xl space-y-4 shadow-sm border transition-colors ${tc.card}`}>
            <div className="relative">
              <Search className="absolute left-3 top-3 w-4 h-4 text-slate-500" />
              <input
                id="search-roots-input"
                type="search"
                placeholder="Cari lafadz makna atau akar kata..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className={`w-full rounded-xl py-2.5 pl-9 pr-3 text-xs focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-colors ${tc.input}`}
              />
            </div>

            <div className="space-y-2.5">
              <div className="flex justify-between items-center px-1">
                <h3 className={`text-[10px] font-extrabold uppercase tracking-widest block ${tc.textLabel}`}>
                  Preset Akar Kata ({filteredPresets.length})
                </h3>
              </div>
              
              {/* Filter Tabs for Grouping (User Request) */}
              <div className={`flex p-1 rounded-xl justify-between gap-1 border transition-colors ${tc.input}`}>
                {(["all", "bab", "bina", "hijaiyah"] as const).map((mode) => (
                  <button
                    key={mode}
                    type="button"
                    onClick={() => setPresetGroupMode(mode)}
                    className={`text-[9px] font-black uppercase px-2 py-1.5 rounded-lg transition-all flex-1 text-center select-none ${
                      presetGroupMode === mode
                        ? appTheme === "green"
                          ? "bg-amber-600/35 text-amber-200 border border-amber-500/20 shadow-xs"
                          : "bg-emerald-600/20 text-emerald-400 border border-emerald-500/20 shadow-xs"
                        : `${tc.textLabel} hover:text-slate-300`
                    }`}
                  >
                    {mode === "all" ? "Semua" : mode === "bab" ? "Per Bab" : mode === "bina" ? "Per Bina'" : "Per Huruf"}
                  </button>
                ))}
              </div>
              {/* Scrollable Grouped Content Area */}
              <div className="max-h-[220px] overflow-y-auto pr-1 space-y-3.5 scrollbar-thin">
                {presetGroupMode === "all" && (
                  <div className="grid grid-cols-3 gap-1.5 animate-fadeIn">
                    {filteredPresets.map((entry) => {
                      const isSel = entry.id === selectedEntry.id;
                      return (
                        <button
                          key={entry.id}
                          id={`preset-btn-${entry.id}`}
                          onClick={() => setSelectedEntry(entry)}
                          className={`text-[11px] py-1.5 px-2 rounded-xl transition-all text-center font-bold flex flex-col items-center justify-center border ${
                            isSel ? tc.presetBtnSel : tc.presetBtnNor
                          }`}
                        >
                          <span className="font-arabic font-extrabold text-base leading-tight">
                            {getVocalizedRoot(entry.root.fa, entry.root.ain, entry.root.lam, entry.babNum)}
                          </span>
                          <span className="text-[9px] font-mono opacity-80 block truncate max-w-full">
                            {entry.translation.split("/")[0]}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                )}

                {presetGroupMode === "bab" && (
                  <div className="space-y-2.5 animate-fadeIn">
                    <button
                      type="button"
                      onClick={handleToggleAllGroups}
                      className="text-[9.5px] hover:underline font-extrabold uppercase text-right w-full pr-1 pb-1 text-emerald-500 shrink-0 block tracking-wider"
                    >
                      {isAllCollapsed ? "🔓 Buka Semua Bab" : "🔒 Tutup Semua Bab"}
                    </button>
                    {Object.keys(groupedPresetsByBab).map((babKey) => {
                      const babNum = Number(babKey);
                      const bPresets = groupedPresetsByBab[babNum];
                      if (bPresets.length === 0) return null;
                      const isCollapsed = !!collapsedBabs[babNum];
                      return (
                        <div key={`g-bab-${babNum}`} className={`space-y-1.5 p-2 rounded-2xl border transition-all ${tc.cardInner}`}>
                          <button
                            type="button"
                            onClick={() => setCollapsedBabs(p => ({ ...p, [babNum]: !p[babNum] }))}
                            className="w-full flex justify-between items-center px-1 py-0.5 text-left select-none cursor-pointer"
                          >
                            <span className={`text-[10px] uppercase tracking-wider font-extrabold ${tc.groupHeaderTitle}`}>
                              Bab {babNum} — {babNum === 1 ? "Fathul-Dhammi (-ُ)" : babNum === 2 ? "Fathul-Kasri (-ِ)" : babNum === 3 ? "Fathatani (-َ)" : babNum === 4 ? "Kasrul-Fathi (-َ)" : babNum === 5 ? "Dhammud-Dhammi (-ُ)" : "Kasratani (-ِ)"}
                            </span>
                            <div className="flex items-center space-x-1.5">
                              <span className={`text-[9px] font-mono ${tc.textLabel}`}>({bPresets.length})</span>
                              {isCollapsed ? (
                                <ChevronDown className="w-3 h-3 text-slate-400 shrink-0" />
                              ) : (
                                <ChevronUp className="w-3 h-3 text-slate-400 shrink-0" />
                              )}
                            </div>
                          </button>
                          
                          {!isCollapsed && (
                            <div className="grid grid-cols-3 gap-1.5 pt-1.5 border-t border-slate-800/10 dark:border-slate-800/40">
                              {bPresets.map((entry) => {
                                const isSel = entry.id === selectedEntry.id;
                                return (
                                  <button
                                    key={entry.id}
                                    id={`preset-btn-${entry.id}`}
                                    onClick={() => setSelectedEntry(entry)}
                                    className={`text-[11px] py-1.5 px-2 rounded-xl transition-all text-center font-bold flex flex-col items-center justify-center border ${
                                      isSel ? tc.presetBtnSel : tc.presetBtnNor
                                    }`}
                                  >
                                    <span className="font-arabic font-extrabold text-base leading-tight">
                                      {getVocalizedRoot(entry.root.fa, entry.root.ain, entry.root.lam, entry.babNum)}
                                    </span>
                                    <span className="text-[9px] font-mono opacity-80 block truncate max-w-full">
                                      {entry.translation.split("/")[0]}
                                    </span>
                                  </button>
                                );
                              })}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}

                {presetGroupMode === "bina" && (
                  <div className="space-y-2.5 animate-fadeIn">
                    <button
                      type="button"
                      onClick={handleToggleAllGroups}
                      className="text-[9.5px] hover:underline font-extrabold uppercase text-right w-full pr-1 pb-1 text-emerald-500 shrink-0 block tracking-wider"
                    >
                      {isAllCollapsed ? "🔓 Buka Semua Bina'" : "🔒 Tutup Semua Bina'"}
                    </button>
                    {Object.keys(groupedPresetsByBina).sort().map((binaKey) => {
                      const bPresets = groupedPresetsByBina[binaKey];
                      if (bPresets.length === 0) return null;
                      const isCollapsed = !!collapsedBinas[binaKey];
                      return (
                        <div key={`g-bina-${binaKey}`} className={`space-y-1.5 p-2 rounded-2xl border transition-all ${tc.cardInner}`}>
                          <button
                            type="button"
                            onClick={() => setCollapsedBinas(p => ({ ...p, [binaKey]: !p[binaKey] }))}
                            className="w-full flex justify-between items-center px-1 py-0.5 text-left select-none cursor-pointer"
                          >
                            <span className="text-[10px] uppercase tracking-wider text-amber-500 font-extrabold">
                              Bina' {binaKey}
                            </span>
                            <div className="flex items-center space-x-1.5">
                              <span className={`text-[9px] font-mono ${tc.textLabel}`}>({bPresets.length})</span>
                              {isCollapsed ? (
                                <ChevronDown className="w-3 h-3 text-slate-400 shrink-0" />
                              ) : (
                                <ChevronUp className="w-3 h-3 text-slate-400 shrink-0" />
                              )}
                            </div>
                          </button>
                          
                          {!isCollapsed && (
                            <div className="grid grid-cols-3 gap-1.5 pt-1.5 border-t border-slate-800/10 dark:border-slate-800/40">
                              {bPresets.map((entry) => {
                                const isSel = entry.id === selectedEntry.id;
                                return (
                                  <button
                                    key={entry.id}
                                    id={`preset-btn-${entry.id}`}
                                    onClick={() => setSelectedEntry(entry)}
                                    className={`text-[11px] py-1.5 px-2 rounded-xl transition-all text-center font-bold flex flex-col items-center justify-center border ${
                                      isSel ? tc.presetBtnSel : tc.presetBtnNor
                                    }`}
                                  >
                                    <span className="font-arabic font-extrabold text-base leading-tight">
                                      {getVocalizedRoot(entry.root.fa, entry.root.ain, entry.root.lam, entry.babNum)}
                                    </span>
                                    <span className="text-[9px] font-mono opacity-80 block truncate max-w-full">
                                      {entry.translation.split("/")[0]}
                                    </span>
                                  </button>
                                );
                              })}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}

                {presetGroupMode === "hijaiyah" && (
                  <div className="space-y-2.5 animate-fadeIn">
                    <button
                      type="button"
                      onClick={handleToggleAllGroups}
                      className="text-[9.5px] hover:underline font-extrabold uppercase text-right w-full pr-1 pb-1 text-emerald-500 shrink-0 block tracking-wider"
                    >
                      {isAllCollapsed ? "🔓 Buka Semua Huruf" : "🔒 Tutup Semua Huruf"}
                    </button>
                    {Object.keys(groupedPresetsByHijaiyah).sort().map((hijKey) => {
                      const bPresets = groupedPresetsByHijaiyah[hijKey];
                      if (bPresets.length === 0) return null;
                      const isCollapsed = !!collapsedHijaiyahs[hijKey];
                      return (
                        <div key={`g-hij-${hijKey}`} className={`space-y-1.5 p-2 rounded-2xl border transition-all ${tc.cardInner}`}>
                          <button
                            type="button"
                            onClick={() => setCollapsedHijaiyahs(p => ({ ...p, [hijKey]: !p[hijKey] }))}
                            className="w-full flex justify-between items-center px-1 py-0.5 text-left select-none cursor-pointer"
                          >
                            <span className="text-[10px] uppercase tracking-wider font-extrabold flex items-center space-x-1.5 text-slate-400">
                              <span>Awal Huruf:</span>
                              <span className="font-arabic text-sm text-amber-400 font-black px-1.5 py-0.2 bg-amber-500/10 border border-amber-500/20 rounded">{hijKey}</span>
                            </span>
                            <div className="flex items-center space-x-1.5">
                              <span className={`text-[9px] font-mono ${tc.textLabel}`}>({bPresets.length})</span>
                              {isCollapsed ? (
                                <ChevronDown className="w-3 h-3 text-slate-400 shrink-0" />
                              ) : (
                                <ChevronUp className="w-3 h-3 text-slate-400 shrink-0" />
                              )}
                            </div>
                          </button>
                          
                          {!isCollapsed && (
                            <div className="grid grid-cols-3 gap-1.5 pt-1.5 border-t border-slate-800/10 dark:border-slate-800/40">
                              {bPresets.map((entry) => {
                                const isSel = entry.id === selectedEntry.id;
                                return (
                                  <button
                                    key={entry.id}
                                    id={`preset-btn-${entry.id}`}
                                    onClick={() => setSelectedEntry(entry)}
                                    className={`text-[11px] py-1.5 px-2 rounded-xl transition-all text-center font-bold flex flex-col items-center justify-center border ${
                                      isSel ? tc.presetBtnSel : tc.presetBtnNor
                                    }`}
                                  >
                                    <span className="font-arabic font-extrabold text-base leading-tight">
                                      {getVocalizedRoot(entry.root.fa, entry.root.ain, entry.root.lam, entry.babNum)}
                                    </span>
                                    <span className="text-[9px] font-mono opacity-80 block truncate max-w-full">
                                      {entry.translation.split("/")[0]}
                                    </span>
                                  </button>
                                );
                              })}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Section: Selected Active Verb Card */}
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 relative overflow-hidden shadow-sm flex-1 flex flex-col justify-between">
            <div>
              <div className="flex flex-col items-center py-4 space-y-1.5 text-center">
                <div className="text-[10px] text-emerald-450 font-extrabold bg-emerald-500/10 px-3 py-1 rounded-full uppercase tracking-wider">
                  Bab {selectedEntry.babNum} — Bina' {selectedEntry.bina || "Shohih"}
                </div>
                <h2 className="text-4xl font-arabic font-black text-amber-400 tracking-wide pt-2">
                  {getVocalizedRoot(selectedEntry.root.fa, selectedEntry.root.ain, selectedEntry.root.lam, selectedEntry.babNum)}
                </h2>
                <p className="text-sm text-slate-200 font-medium px-4 select-text max-w-sm">
                  "{selectedEntry.translation}"
                </p>
              </div>

              <div className="border-t border-slate-800/80 pt-4 space-y-3.5 text-xs text-slate-400">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <span className="block text-[9px] uppercase tracking-wider text-slate-500 font-bold block mb-0.5">Kamus Rujukan:</span>
                    <span className="font-semibold text-slate-300 block select-all">{selectedEntry.reference || "Lisanul 'Arab"}</span>
                  </div>
                  <div>
                    <span className="block text-[9px] uppercase tracking-wider text-slate-500 font-bold block mb-0.5">Asal Mula:</span>
                    <span className="font-arabic text-amber-200 text-sm block select-all">{selectedEntry.asal || "—"}</span>
                  </div>
                </div>

                {/* Explanation text */}
                <div className="bg-slate-950/60 p-3 rounded-2xl border border-slate-850/80 space-y-2">
                  <span className="text-[10px] uppercase tracking-widest text-slate-500 font-black block mb-1">Deskripsi & Sanad</span>
                  <p className="text-[11px] leading-relaxed text-slate-300 select-text max-h-[140px] overflow-y-auto pr-1">
                    {selectedEntry.explanation || "Informasi sanad morfologi standar tersedia."}
                  </p>
                </div>
              </div>
            </div>

            {/* Adjust Font Sizes widget */}
            <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs">
              <span className="text-slate-500 font-bold uppercase text-[9px]">Skala Lafadz Arab:</span>
              <div className="flex bg-slate-955 p-0.5 border border-slate-800 rounded-lg">
                {(["small", "medium", "large", "xlarge"] as const).map((sz) => (
                  <button
                    key={sz}
                    onClick={() => setLafadzSize(sz)}
                    className={`px-2 py-1 rounded text-[10px] uppercase font-bold transition-all ${
                      lafadzSize === sz ? "bg-emerald-600 text-white" : "text-slate-550 hover:text-slate-300"
                    }`}
                  >
                    {sz === "small" ? "S" : sz === "medium" ? "M" : sz === "large" ? "L" : "XL"}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: The Interactive Grammar Engine dashboard (span 8) */}
        <div className="lg:col-span-8 bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden flex flex-col shadow-xl">
          
          {/* Main Visual Tabs controller */}
          <div className="bg-slate-950 p-2 border-b border-slate-800/80 flex items-center justify-start overflow-x-auto gap-1">
            {[
              { id: "istilahi", label: "Tashrif Istilahi", desc: "12 Shighot" },
              { id: "lughowi", label: "Tashrif Lughowi", desc: "Dhomir Konjugasi" },
              { id: "masdar", label: "Masdar & Sifat", desc: "Sima'i & Qiyasi" },
              { id: "jama", label: "Jamak Taksir", desc: "Pecah Plural" },
              { id: "iilal", label: "Kaidah I'lal", desc: "Mut'al Penyakit" }
            ].map((tab) => {
              const isAct = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  id={`tab-btn-${tab.id}`}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`px-3.5 py-2.5 rounded-2xl flex flex-col items-center justify-center shrink-0 transition-all text-center select-none ${
                    isAct 
                      ? "bg-emerald-600 border border-emerald-500/20 text-white font-extrabold shadow-md shadow-emerald-500/10 scale-102"
                      : "text-slate-450 hover:text-slate-200 hover:bg-slate-900/50"
                  }`}
                >
                  <span className="text-[11px] tracking-tight">{tab.label}</span>
                  <span className={`text-[8.5px] opacity-70 ${isAct ? "text-emerald-100" : "text-slate-500"}`}>{tab.desc}</span>
                </button>
              );
            })}
          </div>

          {/* Active Tab Screen Area */}
          <div className="flex-1 p-5 overflow-y-auto">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                className="h-full"
              >
                
                {/* TAB 1: ISTILAHI */}
                {activeTab === "istilahi" && (
                  <TabTasrifIstilahi
                    tasrif={calculatedTasrif}
                    fa={selectedEntry.root.fa}
                    ain={selectedEntry.root.ain}
                    lam={selectedEntry.root.lam}
                    lafadzSize={lafadzSize}
                    appTheme={appTheme}
                  />
                )}

                {/* TAB 2: LUGHOWI */}
                {activeTab === "lughowi" && (
                  <TabTasrifLughowi
                    tasrif={calculatedTasrif}
                    fa={selectedEntry.root.fa}
                    ain={selectedEntry.root.ain}
                    lam={selectedEntry.root.lam}
                    bina={selectedEntry.bina || "Shohih"}
                    babNum={selectedEntry.babNum}
                    lafadzSize={lafadzSize}
                    appTheme={appTheme}
                  />
                )}

                {/* TAB 3: MASDAR & SHOROF TABLE */}
                {activeTab === "masdar" && (
                  <TabShorofMasdarTable
                    entries={PRESET_DICTIONARY}
                    activeEntryId={selectedEntry.id}
                    onSelectEntry={setSelectedEntry}
                    isPremium={isPremium}
                    onUnlock={() => setShowPremiumModal(true)}
                    lafadzSize={lafadzSize}
                    appTheme={appTheme}
                  />
                )}

                {/* TAB 4: JAMAK TAKSIR */}
                {activeTab === "jama" && (
                  <div className="space-y-4">
                    <div className="bg-emerald-950/20 border border-emerald-900/60 p-4 rounded-2xl flex gap-3 text-xs text-emerald-300">
                      <Layers className="w-5 h-5 shrink-0 text-emerald-400 mt-0.5" />
                      <p>
                        <strong className="font-black">Jamak Taksir</strong> adalah bentuk jamak pecah bahasa Arab yang memodifikasi struktur tunggal (mufrod). Di system Shorof Digital Pro, analisis plurals dihitung komprehensif bagi 5 jenis Isim sekaligus.
                      </p>
                    </div>

                    <div className="flex bg-slate-950 p-1 border border-slate-850 rounded-xl justify-between overflow-x-auto gap-0.5">
                      {(["fail", "maful", "zamanmakan", "alat", "sifat"] as const).map((jt) => (
                        <button
                          key={jt}
                          onClick={() => setActiveJamakTab(jt)}
                          className={`text-[10px] px-3 py-2 font-bold rounded-lg transition uppercase tracking-wide flex-1 text-center ${
                            activeJamakTab === jt 
                              ? "bg-emerald-600/20 text-emerald-400 border border-emerald-500/20" 
                              : "text-slate-500 hover:text-slate-300"
                          }`}
                        >
                          {jt === "zamanmakan" ? "Zaman & Makan" : jt === "fail" ? "Isim Fail" : jt === "maful" ? "Isim Maful" : jt === "sifat" ? "Musyabihat" : "Isim Alat"}
                        </button>
                      ))}
                    </div>

                    {/* Rendering plual forms details */}
                    <div className="bg-slate-950 border border-slate-850 p-5 rounded-3xl space-y-4 text-xs">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                        {/* 1. Qillah */}
                        <div className="bg-slate-900/40 p-3 rounded-2xl border border-slate-850/60 space-y-1">
                          <span className="text-[9px] uppercase tracking-wider text-slate-500 font-bold block">Taksir Qillah (Sedikit):</span>
                          <div className="flex items-center justify-between">
                            <span className="font-mono text-[9px] text-slate-500 font-bold">جَمْعُ قِلَّةٍ</span>
                            <span className="font-arabic font-extrabold text-emerald-400 text-lg select-all">
                              {structuralPlurals[activeJamakTab].qillah || "—"}
                            </span>
                          </div>
                        </div>

                        {/* 2. Katsroh */}
                        <div className="bg-slate-900/40 p-3 rounded-2xl border border-slate-850/60 space-y-1">
                          <span className="text-[9px] uppercase tracking-wider text-slate-500 font-bold block">Taksir Katsroh (Banyak):</span>
                          <div className="flex items-center justify-between">
                            <span className="font-mono text-[9px] text-slate-500 font-bold">جَمْعُ كَثْرَةٍ</span>
                            <span className="font-arabic font-extrabold text-emerald-400 text-lg select-all">
                              {structuralPlurals[activeJamakTab].katsroh || "—"}
                            </span>
                          </div>
                        </div>

                        {/* 3. Muntahal Jumu */}
                        <div className="bg-slate-900/40 p-3 rounded-2xl border border-slate-850/60 space-y-1">
                          <span className="text-[9px] uppercase tracking-wider text-slate-500 font-bold block">Muntahal (Jamak Puncak):</span>
                          <div className="flex items-center justify-between">
                            <span className="font-mono text-[9px] text-slate-500 font-bold">مُنْتَهَى الجُمُوعِ</span>
                            <span className="font-arabic font-extrabold text-emerald-400 text-lg select-all">
                              {structuralPlurals[activeJamakTab].muntahal || "—"}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Reference metadata box */}
                      <div className="space-y-1">
                        <span className="text-[9px] uppercase tracking-wider text-slate-500 font-bold block">Sanad & Referensi Rujukan:</span>
                        <div className="bg-slate-900/60 p-2.5 rounded-xl text-slate-400 border border-slate-850 text-[10px] font-mono">
                          {structuralPlurals[activeJamakTab].reference || "Lisanul 'Arab"}
                        </div>
                      </div>

                      {/* Explanation details */}
                      <div className="space-y-1">
                        <span className="text-[9px] uppercase tracking-wider text-slate-500 font-bold block">Syarah & Pembahasan Sharaf:</span>
                        <p className="bg-slate-900/60 p-3 rounded-xl text-slate-300 border border-slate-850 text-xs leading-relaxed select-text font-serif">
                          {structuralPlurals[activeJamakTab].explanation || "Sifat jamak taksir terbentuk secara baku mengikuti kualifikasi wazan bina kosa kata."}
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* TAB 5: KAIDAH I'LAL */}
                {activeTab === "iilal" && (
                  <div className="space-y-4">
                    <div className="bg-[#0f1f18] p-4 rounded-2xl text-xs text-emerald-300 border border-emerald-900/60 flex gap-3">
                      <Sparkles className="w-5 h-5 shrink-0 text-emerald-400 mt-0.5" />
                      <div>
                        <h4 className="font-bold text-white mb-0.5">Analisis Kaidah I'lal Luring</h4>
                        <p>
                          Secara otomatis mendeteksi huruf penyakit (illat) berupa <strong>Waw (و)</strong>, <strong>Ya (ي)</strong>, atau <strong>Alif (ا)</strong> dan menjabarkan proses peleburan harakah, idgham, maupun pembuangan huruf demi menjaga kefasihan lisan Arab.
                        </p>
                      </div>
                    </div>

                    <div className="bg-slate-950 p-5 rounded-3xl border border-slate-850 space-y-4 text-xs">
                      <div className="flex justify-between items-center pb-2 border-b border-slate-850">
                        <span className="text-[10px] uppercase tracking-widest text-slate-500 font-black">Operasional I'lal Engine</span>
                        <span className="text-[9.5px]/none font-black text-amber-400 bg-amber-500/10 border border-amber-500/20 px-2 py-0.5 rounded">
                          BINA: {selectedEntry.bina || "Shohih"}
                        </span>
                      </div>

                      {selectedEntry.bina === "Shohih" ? (
                        <div className="py-12 text-center text-slate-500 flex flex-col items-center justify-center space-y-2 border border-dashed border-slate-850 rounded-2xl">
                          <Check className="w-8 h-8 text-emerald-500" />
                          <p className="font-bold text-slate-300">Aman! Bina Shohih</p>
                          <p className="text-[10px] max-w-xs leading-normal">Bina Shohih tersusun dari huruf murni tanpa cacat/penyakit, sehingga tidak membutuhkan i'lal (perubahan harakah/huruf).</p>
                        </div>
                      ) : (
                        <div className="space-y-4">
                          <div className="space-y-1">
                            <span className="text-[9px] uppercase tracking-widest text-slate-500 font-black block">Log Transformasi Morfologi:</span>
                            <div className="bg-slate-900/80 p-3 rounded-xl border border-slate-850 text-[11px] text-slate-300 leading-relaxed max-h-[160px] overflow-y-auto pr-1">
                              {selectedEntry.explanation}
                            </div>
                          </div>

                          <div className="p-3 bg-slate-900/40 rounded-2xl border border-slate-850/60 flex items-center justify-between">
                            <div className="text-left">
                              <p className="text-[8px] uppercase text-slate-500 font-bold leading-none mb-0.5">Asal Kata Mula-mula</p>
                              <p className="font-arabic text-amber-200 text-lg select-all">{selectedEntry.asal || "—"}</p>
                            </div>
                            <div className="text-right">
                              <p className="text-[8px] uppercase text-slate-500 font-bold leading-none mb-0.5">Hasil Akhir Ter-i'lal</p>
                              <p className="font-arabic text-emerald-400 text-lg select-all">
                                {getVocalizedRoot(selectedEntry.root.fa, selectedEntry.root.ain, selectedEntry.root.lam, selectedEntry.babNum)}
                              </p>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}


              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </main>

      {/* POPUP MODAL 1: UPDATE ACCOUNT PROFILE DATA */}
      <AnimatePresence>
        {showEditProfileModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-slate-950/80 flex items-center justify-center p-4 z-50 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              className="bg-slate-900 border border-slate-800 rounded-[32px] p-6 space-y-5 w-full max-w-[340px]"
            >
              <div className="flex justify-between items-center pb-2 border-b border-slate-800">
                <h3 className="text-sm font-black text-white uppercase tracking-wider">Sesuaikan Akun</h3>
                <button onClick={() => setShowEditProfileModal(false)} className="text-slate-400 hover:text-slate-205 cursor-pointer">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-4">
                <div className="space-y-1.5 text-left">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Nama Panggilan</label>
                  <input
                    type="text"
                    defaultValue={username}
                    id="modal-username-field"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <div className="space-y-1.5 text-left">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Pilih Avatar Warna</label>
                  <div className="grid grid-cols-6 gap-2">
                    {MOCK_PHOTOS.map((av) => (
                      <button
                        key={av}
                        onClick={() => handleSaveProfile((document.getElementById("modal-username-field") as any)?.value || username, av)}
                        className={`p-1 border rounded-xl hover:border-emerald-500 transition-all cursor-pointer ${
                          profilePhoto === av ? "border-emerald-500 bg-slate-950" : "border-slate-850 bg-slate-900"
                        }`}
                      >
                        {renderProfileImage(av, "w-8 h-8 mx-auto scale-95")}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-1.5 text-left border-t border-slate-800/50 pt-3">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">Tema Aplikasi</label>
                  <div className="grid grid-cols-3 gap-2">
                    {(["dark", "light", "green"] as const).map((t) => (
                      <button
                        key={t}
                        type="button"
                        onClick={() => handleSetTheme(t)}
                        className={`py-2 px-1 border rounded-xl text-center text-[11px] font-bold transition-all cursor-pointer ${
                          appTheme === t
                            ? "border-emerald-500 bg-slate-950 text-emerald-400 font-extrabold shadow-sm shadow-emerald-500/10"
                            : "border-slate-800/80 bg-slate-900 text-slate-400 hover:border-slate-700"
                        }`}
                      >
                        {t === "dark" ? "Slate Dark" : t === "light" ? "Clean Light" : "Emerald Green"}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <button
                id="modal-save-profile-btn"
                onClick={() => {
                  const inputVal = (document.getElementById("modal-username-field") as HTMLInputElement)?.value;
                  if (inputVal) {
                    handleSaveProfile(inputVal, profilePhoto);
                  }
                }}
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl py-3 text-xs font-black transition-all text-center cursor-pointer shadow-md shadow-emerald-500/10"
              >
                Simpan Profilku
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* POPUP MODAL 2: UPGRADE TO PREMIUM LISENSI */}
      <AnimatePresence>
        {showPremiumModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-slate-950/85 flex items-center justify-center p-4 z-50 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              className="bg-slate-900 border border-amber-500/20 rounded-[32px] p-6 space-y-5 w-full max-w-[340px] text-left max-h-[90%] overflow-y-auto"
            >
              <div className="flex justify-between items-center pb-2 border-b border-slate-800">
                <span className="text-amber-400 font-black text-[11px] tracking-wider uppercase">Lisensi Sharaf Premium</span>
                <button onClick={() => { setShowPremiumModal(false); setBillingPlan(""); }} className="text-slate-400 hover:text-slate-200 cursor-pointer">
                  <X className="w-5 h-5" />
                </button>
              </div>

              {billingPlan ? (
                /* Simulated Midtrans checkout panel */
                <div className="space-y-4 py-2">
                  <div className="border border-dashed border-emerald-500/30 bg-slate-950/60 p-4 rounded-3xl text-center space-y-2">
                    <CreditCard className="w-7 h-7 text-emerald-400 mx-auto animate-pulse" />
                    <h4 className="text-xs font-extrabold text-white">SNAP Enkripsi Midtrans</h4>
                    <p className="text-[11px] text-slate-400 leading-normal">
                      Paket premiumaktif untuk: <strong className="text-slate-200">{billingPlan}</strong><br />
                      Gerbang pembayaran Midtrans mensimulasikan lisensi sukses.
                    </p>
                  </div>

                  {isPaymentLoading ? (
                    <div className="space-y-2 text-center py-4">
                      <RefreshCw className="w-5 h-5 text-emerald-400 animate-spin mx-auto" />
                      <p className="text-[10px] text-slate-400 font-mono animate-pulse">{paymentMessage}</p>
                    </div>
                  ) : (
                    <div className="space-y-2 text-center">
                      <p className="text-[10px] text-slate-400 font-bold mb-1">Simulasikan Pemicu Midtrans:</p>
                      <div className="grid grid-cols-2 gap-2">
                        <button
                          id="payment-success-btn"
                          onClick={() => handleCompletePaymentSimulated(true)}
                          className="bg-emerald-600/20 hover:bg-emerald-600/30 border border-emerald-500/30 text-emerald-400 rounded-xl py-2.5 text-[10px] font-black cursor-pointer text-center"
                        >
                          ✔ Simulasikan Lunas
                        </button>
                        <button
                          id="payment-fail-btn"
                          onClick={() => handleCompletePaymentSimulated(false)}
                          className="bg-rose-600/10 hover:bg-rose-600/20 border border-rose-500/20 text-rose-400 rounded-xl py-2.5 text-[10px] font-black cursor-pointer text-center"
                        >
                          ✘ Simulasikan Batal
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                /* Premium purchase information options */
                <div className="space-y-4">
                  <div className="bg-slate-950 p-4 rounded-3xl border border-slate-850 space-y-2.5 text-xs text-slate-400">
                    <p className="font-extrabold text-white text-xs">Benefit Shorof Pro Premium:</p>
                    <ul className="space-y-1.5 list-disc list-inside text-[11px]">
                      <li>Akses full 6-wazan Sifat Musyabihat Luring</li>
                      <li>Kaidah I'lal andal tanpa batas kosa kata</li>
                      <li>Panyimpanan database favorit tak terhingga</li>
                      <li>Sertifikasi luring bebas iklan pengganggu</li>
                    </ul>
                  </div>

                  <div className="space-y-2">
                    <button
                      id="buy-monthly-btn"
                      onClick={() => handleSimulatePayment(15000, "Monthly Shorof Digital (Rp15k)")}
                      className="w-full bg-slate-950 hover:bg-slate-900 border border-slate-800 hover:border-slate-700 p-3 rounded-2xl flex justify-between items-center text-xs transition-all cursor-pointer text-left"
                    >
                      <div>
                        <strong className="block text-white font-bold text-xs">Paket Bulanan</strong>
                        <span className="text-[10px] text-slate-500">Unlocks all pro features</span>
                      </div>
                      <span className="font-sans font-black text-emerald-400">Rp15.000,-</span>
                    </button>

                    <button
                      id="buy-lifetime-btn"
                      onClick={() => handleSimulatePayment(99000, "Lifetime Shorof Digital (Rp99k)")}
                      className="w-full bg-gradient-to-r from-amber-500/10 to-orange-500/10 border border-amber-500/30 hover:border-amber-400 p-3 rounded-2xl flex justify-between items-center text-xs transition-all cursor-pointer text-left"
                    >
                      <div>
                        <strong className="block text-amber-400 font-black text-xs">Selamanya Pro (Lifetime)</strong>
                        <span className="text-[10px] text-slate-500">Pay once, active permanently</span>
                      </div>
                      <span className="font-sans font-black text-amber-400 text-sm">Rp99.000,-</span>
                    </button>
                  </div>

                  {/* Manual Unlock Code options */}
                  <div className="border-t border-slate-800 pt-3.5 space-y-2 text-xs">
                    <label className="text-[10px] uppercase font-bold text-slate-500 block">Punya Kode Aktivasi? Masukkan luring:</label>
                    <div className="flex space-x-2">
                      <input
                        id="activation-code-field"
                        type="text"
                        placeholder="Kode luring (misal: premium-shorof)"
                        value={activationCode}
                        onChange={(e) => setActivationCode(e.target.value)}
                        className="flex-1 bg-slate-950 border border-slate-850 rounded-xl px-3 py-1.5 text-xs text-white placeholder-slate-505 focus:outline-none focus:border-amber-500"
                      />
                      <button
                        id="apply-activation-code"
                        onClick={handleManualCodeUnlock}
                        className="bg-slate-800 hover:bg-slate-700 hover:text-white text-slate-300 font-bold px-3 py-1.5 rounded-xl cursor-pointer text-xs"
                      >
                        Gunakan
                      </button>
                    </div>
                    {activationError && (
                      <p className="text-[10px] font-bold text-rose-500 leading-none mt-1">{activationError}</p>
                    )}
                    <p className="text-[9px] text-slate-500 block leading-normal pt-1">
                      <em>*Tip pengujian: Anda dapat menggunakan kode lisensi gratis <strong>premium-shorof</strong> atau <strong>123456</strong> untuk langsung membuka status Pro gratis di preview.</em>
                    </p>
                  </div>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Simple elegant credit information footer */}
      <footer className="bg-slate-950 py-4 px-6 border-t border-slate-900 text-center text-[10px] text-slate-500 select-auto">
        <p>© 2026 Shorof Digital Pro. Seluruh hak cipta dilindungi undang-undang.</p>
        <p className="mt-0.5 leading-normal opacity-80">Merek dagang terdaftar milik Al-Munawwir, Tajul 'Arus & Lisanul 'Arab klasik.</p>
      </footer>
    </div>
  );
}
