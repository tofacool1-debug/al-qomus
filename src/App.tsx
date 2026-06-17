/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useMemo } from "react";
import {
  BookOpen,
  Sparkles,
  Layers,
  Table,
  HelpCircle,
  ExternalLink,
  Copy,
  Lock,
  X,
  Download,
  Smartphone,
  Share,
  Monitor,
  Settings,
  Sun,
  Moon,
  Type,
  User,
  Clock,
  Bookmark,
  Menu,
  Check,
  Edit3,
  Upload
} from "lucide-react";
import { DictionaryEntry, TasrifIstilahi, DataWazan } from "./types";
import { PRESET_DICTIONARY, WAZAN_TEMPLATES } from "./utils/dictionaryData";
import { IilalEngine } from "./utils/iilalEngine";
import { analyzeSifatMusyabihatPlural } from "./utils/sifatMusyabihatPlural";
import { analyzeIsimFailPlural } from "./utils/isimFailPlural";
import { analyzeIsimMafulPlural } from "./utils/isimMafulPlural";
import { analyzeIsimZamanMakanPlural, analyzeIsimAlatPlural } from "./utils/isimZamanMakanAlatPlural";

// Subcomponents
import DictionaryList from "./components/DictionaryList";
import TasrifIstilahiView from "./components/TasrifIstilahiView";
import TasrifLughowiView from "./components/TasrifLughowiView";
import ShorofMasdarTableView from "./components/ShorofMasdarTableView";

export default function App() {
  // Configured default state loads "nasara" Preset
  const [selectedEntry, setSelectedEntry] = useState<DictionaryEntry>(PRESET_DICTIONARY[0]);
  const [activeTab, setActiveTab] = useState<"istilahi" | "lughowi">("istilahi");
  const [workspaceSection, setWorkspaceSection] = useState<"shorof" | "jamak">("shorof");
  const [activeJamakTab, setActiveJamakTab] = useState<"fail" | "maful" | "zamanmakan" | "alat" | "sifat">("fail");

  // Premium States
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

  // User Customize & Layout Settings States
  const [showSettingsModal, setShowSettingsModal] = useState<boolean>(false);
  const [showEditProfileModal, setShowEditProfileModal] = useState<boolean>(false);
  const [showIstilahiModal, setShowIstilahiModal] = useState<boolean>(false);
  const [showLughowiModal, setShowLughowiModal] = useState<boolean>(false);
  const [showMasdarModal, setShowMasdarModal] = useState<boolean>(false);
  const [showJamakModal, setShowJamakModal] = useState<boolean>(false);
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
  const [appTheme, setAppTheme] = useState<"dark" | "light" | "green">(() => {
    if (typeof window !== "undefined") {
      return (localStorage.getItem("sdr_theme") as any) || "dark";
    }
    return "dark";
  });
  const [lafadzSize, setLafadzSize] = useState<"small" | "medium" | "large" | "xlarge">(() => {
    if (typeof window !== "undefined") {
      return (localStorage.getItem("sdr_lafadz_size") as any) || "medium";
    }
    return "medium";
  });
  const [layoutMode, setLayoutMode] = useState<"scroll" | "slide">(() => {
    if (typeof window !== "undefined") {
      return (localStorage.getItem("sdr_layout_mode") as any) || "scroll";
    }
    return "scroll";
  });
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState<boolean>(false);

  const updateUsername = (val: string) => {
    setUsername(val);
    localStorage.setItem("sdr_username", val);
  };
  const updateProfilePhoto = (val: string) => {
    setProfilePhoto(val);
    localStorage.setItem("sdr_profile_photo", val);
  };
  const updateAppTheme = (val: "dark" | "light" | "green") => {
    setAppTheme(val);
    localStorage.setItem("sdr_theme", val);
  };
  const updateLafadzSize = (val: "small" | "medium" | "large" | "xlarge") => {
    setLafadzSize(val);
    localStorage.setItem("sdr_lafadz_size", val);
  };
  const updateLayoutMode = (val: "scroll" | "slide") => {
    setLayoutMode(val);
    localStorage.setItem("sdr_layout_mode", val);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        alert("Ukuran foto profil terlalu besar. Harap pilih foto di bawah 2MB.");
        return;
      }
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          updateProfilePhoto(event.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const renderProfileImage = (photoVal: string, sizeClass: string = "w-10 h-10") => {
    if (photoVal.startsWith("data:image") || photoVal.startsWith("http")) {
      return (
        <img
          src={photoVal}
          alt="Profil"
          className={`${sizeClass} rounded-full object-cover border border-emerald-500/20 shadow-inner`}
        />
      );
    }
    
    let bgClass = "bg-gradient-to-br from-emerald-600 to-teal-800 text-white border-emerald-400/20";
    let letter = username ? username.charAt(0).toUpperCase() : "T";
    
    switch (photoVal) {
      case "avatar1":
        bgClass = "bg-gradient-to-br from-emerald-600 to-teal-800 text-white border-emerald-400/20";
        break;
      case "avatar2":
        bgClass = "bg-gradient-to-br from-amber-500 to-orange-600 text-slate-950 border-amber-400/20";
        break;
      case "avatar3":
        bgClass = "bg-gradient-to-br from-indigo-500 to-sky-600 text-white border-indigo-400/20";
        break;
      case "avatar4":
        bgClass = "bg-gradient-to-br from-emerald-500 to-emerald-700 text-white border-emerald-400/20";
        break;
      case "avatar5":
        bgClass = "bg-gradient-to-br from-rose-500 to-pink-600 text-white border-rose-400/20";
        break;
      case "avatar6":
        bgClass = "bg-gradient-to-br from-violet-500 to-purple-700 text-white border-violet-400/20";
        break;
    }

    return (
      <div className={`${sizeClass} rounded-full flex items-center justify-center shrink-0 border font-black text-sm select-none uppercase shadow-md ${bgClass}`}>
        {letter}
      </div>
    );
  };

  // Kamus Favorit (Dashboard Tersimpan) - Managed in parent local storage
  const [favorites, setFavorites] = useState<DictionaryEntry[]>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("sdr_favorites");
      return saved ? JSON.parse(saved) : [];
    }
    return [];
  });

  const handleToggleFavorite = () => {
    const exists = favorites.some((fav) => fav.id === selectedEntry.id);
    let updated;
    if (exists) {
      updated = favorites.filter((fav) => fav.id !== selectedEntry.id);
    } else {
      updated = [...favorites, selectedEntry];
    }
    setFavorites(updated);
    localStorage.setItem("sdr_favorites", JSON.stringify(updated));
  };

  const handleDeleteFavorite = (id: string) => {
    const updated = favorites.filter((fav) => fav.id !== id);
    setFavorites(updated);
    localStorage.setItem("sdr_favorites", JSON.stringify(updated));
  };

  // OneSignal Push Notification Integration
  useEffect(() => {
    if (typeof window !== "undefined") {
      const OneSignal = (window as any).OneSignal || [];
      OneSignal.push(() => {
        OneSignal.init({
          appId: "e07da120-ca3a-4583-bc59-b39570e3c2a9",
          safari_web_id: "",
          notifyButton: {
            enable: true,
          },
        });
      });
    }
  }, []);

  const handleSavePremium = (byManual: boolean) => {
    if (byManual) {
      const codeClean = activationCode.trim().toUpperCase();
      if (codeClean === "BISMILLAH" || codeClean === "PREMIUM" || codeClean === "EXPO") {
        setIsPremium(true);
        localStorage.setItem("sdr_premium_unlocked", "true");
        setShowPremiumModal(false);
        setActivationCode("");
        setActivationError("");
        alert("Aktivasi Sukses! Kunci Premium berhasil dibuka via lisensi utama.");
      } else {
        setActivationError("Kode Lisensi tidak valid. Hubungi pengembang untuk memperoleh kode.");
      }
    }
  };

  const handleToggleOrUnlock = () => {
    setShowPremiumModal(true);
  };

  const handlePayMidtrans = async (grossAmount: number, planId: string, itemName: string) => {
    setIsPaymentLoading(true);
    setPaymentMessage("Menghubungkan ke Gerbang Pembayaran Midtrans...");
    try {
      const response = await fetch("/api/midtrans/token", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          gross_amount: grossAmount,
          plan_id: planId,
          item_name: itemName,
          email: "tofacool1@gmail.com",
        }),
      });
      const data = await response.json();
      if (data.success) {
        if (data.isSimulated) {
          setPaymentMessage("Mensimulasikan Pembayaran Sukses (Mode Pengembangan/Demo)...");
          setTimeout(() => {
            setIsPremium(true);
            localStorage.setItem("sdr_premium_unlocked", "true");
            setShowPremiumModal(false);
            setIsPaymentLoading(false);
            setPaymentMessage("");
            alert("Aktivasi Sukses (Simulasi)! Akun Anda telah berhasil di-upgrade ke premium untuk paket: " + itemName);
          }, 1500);
          return;
        }

        // Open real Midtrans Snap JS overlay!
        const snap = (window as any).snap;
        if (snap) {
          snap.pay(data.token, {
            onSuccess: function (result: any) {
              setIsPremium(true);
              localStorage.setItem("sdr_premium_unlocked", "true");
              setShowPremiumModal(false);
              setIsPaymentLoading(false);
              setPaymentMessage("");
              alert("Terima kasih! Pembayaran berhasil. Fitur premium Shorof Digital telah aktif.");
            },
            onPending: function (result: any) {
              setIsPaymentLoading(false);
              setPaymentMessage("");
              alert("Menunggu pembayaran Anda. Silakan selesaikan pembayaran di gerbang Midtrans.");
            },
            onError: function (result: any) {
              setIsPaymentLoading(false);
              setPaymentMessage("");
              alert("Pembayaran gagal atau dibatalkan. Silakan dicoba kembali.");
            },
            onClose: function () {
              setIsPaymentLoading(false);
              setPaymentMessage("");
            }
          });
        } else {
          setIsPaymentLoading(false);
          setPaymentMessage("");
          alert("Sistem pembayaran Midtrans sedang dimuat. Mohon tunggu beberapa detik dan coba lagi.");
        }
      } else {
        setIsPaymentLoading(false);
        setPaymentMessage("");
        alert(data.error || "Gagal menginisiasi pembayaran.");
      }
    } catch (err: any) {
      setIsPaymentLoading(false);
      setPaymentMessage("");
      alert("Gagal menghubungi server pembayaran: " + err.message);
    }
  };

  // Premium word analysis popup state
  const [selectedWordInfo, setSelectedWordInfo] = useState<{ word: string; shighot: string } | null>(null);

  // Select a preset entry
  const handleSelectPreset = (entry: DictionaryEntry) => {
    setSelectedEntry(entry);
  };

  // Convert active mode parameters into an unified Wazan dataset for calculations
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
      sifatMusyabihat: selectedEntry.sifatMusyabihat,
      babNum: selectedEntry.babNum
    };
  }, [selectedEntry]);

  // Derived current metrics
  const activeBina = useMemo(() => {
    return IilalEngine.detectBina(activeWazanData.fa, activeWazanData.ain, activeWazanData.lam);
  }, [activeWazanData]);

  const isShohihOrMahmuz = useMemo(() => {
    if (!activeBina) return false;
    const lowerBina = activeBina.toLowerCase();
    return lowerBina.includes("shohih") || lowerBina.includes("mahmuz");
  }, [activeBina]);

  const isMasdarLocked = !isPremium;

  const activeTranslation = useMemo(() => {
    return selectedEntry.translation;
  }, [selectedEntry]);

  const activeBabNum = useMemo(() => {
    return selectedEntry.babNum;
  }, [selectedEntry]);

  const isFavorite = useMemo(() => {
    return favorites.some((fav) => fav.id === selectedEntry.id);
  }, [favorites, selectedEntry]);

  // Apply TS IilalEngine compiler
  const calculatedTasrif = useMemo((): TasrifIstilahi => {
    return IilalEngine.tasrifIstilahiCustom(activeWazanData);
  }, [activeWazanData]);

  // Comparable masdars list containing only entries related to the searched/selected entry
  const relatedMasdarEntries = useMemo(() => {
    const list = [...PRESET_DICTIONARY];
    if (!list.some((e) => e.id === selectedEntry.id)) {
      list.push(selectedEntry);
    }

    const selectedFa = selectedEntry.root.fa;
    const selectedAin = activeWazanData.ain;
    const selectedLam = selectedEntry.root.lam;

    return list.filter((entry) => {
      // Direct match
      if (entry.id === selectedEntry.id) return true;

      // Same Bina structure
      const entryBina = entry.bina || IilalEngine.detectBina(entry.root.fa, entry.root.ain, entry.root.lam);
      if (entryBina === activeBina) return true;

      // Sharing at least one root letter (consonant) indicates relation
      const sharesFa = entry.root.fa === selectedFa;
      const sharesAin = entry.root.ain === selectedAin || entry.root.ain === selectedEntry.root.ain;
      const sharesLam = entry.root.lam === selectedLam;
      if (sharesFa || sharesAin || sharesLam) return true;

      return false;
    });
  }, [selectedEntry, activeWazanData, activeBina]);

  const renderPremiumLockCard = (title: string, subText: string) => {
    return (
      <div className="bg-slate-900 text-slate-100 rounded-2xl border border-slate-850 p-8 shadow-xs relative overflow-hidden text-center space-y-4 animate-fade-in">
        <div className="absolute right-0 top-0 w-32 h-32 bg-amber-500/5 rounded-full blur-2xl pointer-events-none" />
        <div className="w-14 h-14 bg-amber-500/10 text-amber-505 rounded-full flex items-center justify-center mx-auto border border-amber-500/20">
          <Lock className="w-6 h-6 text-amber-500 shadow-xs" />
        </div>
        <div className="space-y-1.5 max-w-sm mx-auto">
          <h3 className="font-extrabold text-md text-white tracking-tight">{title}</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            {subText}
          </p>
          <div className="pt-2">
            <button
              onClick={() => setShowPremiumModal(true)}
              className="px-4 py-2 bg-amber-500 hover:bg-amber-600 active:scale-95 text-slate-950 font-black text-xs rounded-xl transition-all shadow-md shadow-amber-500/10 cursor-pointer"
            >
              🔑 Buka Premium Sekarang
            </button>
          </div>
        </div>
      </div>
    );
  };

  const renderJamakAnalysisUI = () => {
    if (!selectedEntry) return null;

    return (
      <div className="space-y-4 font-sans text-xs md:text-sm">
        {/* SUB-TABS SELECTORS BAR FOR INDIVIDUAL PLURAL ANALYSES */}
        <div className="bg-gray-100/5 p-1 rounded-xl flex flex-wrap gap-1 border border-emerald-800/20">
          <button
            onClick={() => setActiveJamakTab("fail")}
            className={`flex-1 py-1.5 px-1 text-[11px] font-black rounded-lg transition-all cursor-pointer whitespace-nowrap text-center ${
              activeJamakTab === "fail"
                ? "bg-amber-500 text-slate-950 shadow-xs font-black"
                : "text-slate-350 hover:text-white hover:bg-emerald-950/40"
            }`}
          >
            Isim Fa'il
          </button>
          <button
            onClick={() => setActiveJamakTab("maful")}
            className={`flex-1 py-1.5 px-1 text-[11px] font-black rounded-lg transition-all cursor-pointer whitespace-nowrap text-center ${
              activeJamakTab === "maful"
                ? "bg-amber-500 text-slate-950 shadow-xs font-black"
                : "text-slate-350 hover:text-white hover:bg-emerald-950/40"
            }`}
          >
            Isim Maf'ul
          </button>
          <button
            onClick={() => setActiveJamakTab("zamanmakan")}
            className={`flex-1 py-1.5 px-1 text-[11px] font-black rounded-lg transition-all cursor-pointer whitespace-nowrap text-center ${
              activeJamakTab === "zamanmakan"
                ? "bg-amber-500 text-slate-950 shadow-xs font-black"
                : "text-slate-350 hover:text-white hover:bg-emerald-950/40"
            }`}
          >
            Zaman &amp; Makan
          </button>
          <button
            onClick={() => setActiveJamakTab("alat")}
            className={`flex-1 py-1.5 px-1 text-[11px] font-black rounded-lg transition-all cursor-pointer whitespace-nowrap text-center ${
              activeJamakTab === "alat"
                ? "bg-amber-500 text-slate-950 shadow-xs font-black"
                : "text-slate-350 hover:text-white hover:bg-emerald-950/40"
            }`}
          >
            Isim Alat
          </button>
          <button
            onClick={() => setActiveJamakTab("sifat")}
            className={`flex-1 py-1.5 px-1 text-[11px] font-black rounded-lg transition-all cursor-pointer whitespace-nowrap text-center ${
              activeJamakTab === "sifat"
                ? "bg-amber-500 text-slate-950 shadow-xs font-black"
                : "text-slate-350 hover:text-white hover:bg-emerald-950/40"
            }`}
          >
            Sifat Musyabihat
          </button>
        </div>

        {/* ACTIVE TAB CONTENT */}
        {activeJamakTab === "fail" && (() => {
          if (!isPremium) {
            return renderPremiumLockCard(
              "Analisis Jamak Isim Fa'il Premium",
              "Formulasi konstruksi jamak taksir katsroh, qillah, dan muntahal jumu' untuk isim fa'il dilindungi di bawah lisensi premium."
            );
          }
          const calculatedIsimFail = IilalEngine.buatIsimFail(
            selectedEntry.root.fa,
            selectedEntry.root.ain,
            selectedEntry.root.lam,
            selectedEntry.bina || "Shohih"
          );
          const isimFailPlural = selectedEntry.isimFailPlural || IilalEngine.analyzeIsimFailPlural(selectedEntry);
          return (
            <div className="bg-slate-900 border border-emerald-800/20 text-slate-100 rounded-2xl p-5 shadow-xs relative overflow-hidden space-y-4 animate-fade-in text-left">
              <div className="flex items-center gap-2">
                <div className="p-1.5 bg-sky-500/20 text-sky-405 border border-sky-500/10 rounded-lg">
                  <Sparkles className="w-4 h-4 animate-pulse" />
                </div>
                <div>
                  <h3 className="font-extrabold text-xs text-white tracking-tight">Analisis Jamak Isim Fa'il</h3>
                  <p className="text-[10px] text-slate-400 font-medium font-mono">Formulasi Konstruksi Jamak Taksir Terhadap Isim Fa'il "{calculatedIsimFail}"</p>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div className="p-3.5 rounded-xl bg-slate-950/65 border border-slate-850 text-center flex flex-col justify-between">
                  <div>
                    <span className="text-[8px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Jamak Taksir Katsroh</span>
                    <span className="text-[7.5px] text-slate-500 block mb-1 font-mono">(Jumlah Banyak &ge; 11 Sifat)</span>
                    <div className="font-arabic text-xl font-bold text-sky-450 py-1 cursor-pointer hover:scale-[1.03] transition-all font-sans" onClick={() => setSelectedWordInfo({ word: isimFailPlural.katsroh, shighot: "Jamak Taksir Katsroh Isim Fa'il" })}>{isimFailPlural.katsroh || "—"}</div>
                  </div>
                  <div className="text-[8.5px] text-amber-500/90 mt-1.5 flex items-center justify-center gap-1.5 font-bold cursor-pointer font-sans" onClick={() => setSelectedWordInfo({ word: isimFailPlural.katsroh, shighot: "Jamak Taksir Katsroh Isim Fa'il" })}>
                    <Sparkles className="w-2.5 h-2.5 animate-pulse shrink-0" /><span>Keterangan &amp; I'lal</span>
                  </div>
                </div>

                <div className="space-y-3 flex flex-col justify-between">
                  {/* Jamak Taksir Qillah */}
                  <div className="p-3.5 rounded-xl bg-slate-950/65 border border-slate-850 text-center flex-1">
                    <span className="text-[8px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Jamak Taksir Qillah</span>
                    <span className="text-[7.5px] text-slate-500 block mb-1 font-mono">(Jumlah Sedikit / Jamak Salim)</span>
                    <div className="font-arabic text-xl font-bold text-indigo-405 py-1 cursor-pointer hover:scale-[1.03] transition-all font-sans" onClick={() => setSelectedWordInfo({ word: isimFailPlural.qillah, shighot: "Jamak Taksir Qillah Isim Fa'il" })}>{isimFailPlural.qillah || "—"}</div>
                    <div className="text-[8.5px] text-amber-500/90 mt-1.5 flex items-center justify-center gap-1.5 font-bold cursor-pointer font-sans" onClick={() => setSelectedWordInfo({ word: isimFailPlural.qillah, shighot: "Jamak Taksir Qillah Isim Fa'il" })}>
                      <Sparkles className="w-2.5 h-2.5 animate-pulse shrink-0" /><span>Keterangan &amp; I'lal</span>
                    </div>
                  </div>

                  {/* Shighot Muntahal Jumu' */}
                  <div className="p-3.5 rounded-xl bg-slate-950/65 border border-slate-850 text-center flex-1">
                    <span className="text-[8px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Shighot Muntahal Jumu'</span>
                    <span className="text-[7.5px] text-slate-500 block mb-1 font-mono">(Plural Puncak / Ghair Munshorif)</span>
                    <div className="font-arabic text-xl font-bold text-pink-405 py-1 cursor-pointer hover:scale-[1.03] transition-all font-sans" onClick={() => setSelectedWordInfo({ word: isimFailPlural.muntahal, shighot: "Shighot Muntahal Jumu' Isim Fa'il" })}>{isimFailPlural.muntahal || "—"}</div>
                    <div className="text-[8.5px] text-amber-500/90 mt-1.5 flex items-center justify-center gap-1.5 font-bold cursor-pointer font-sans" onClick={() => setSelectedWordInfo({ word: isimFailPlural.muntahal, shighot: "Shighot Muntahal Jumu' Isim Fa'il" })}>
                      <Sparkles className="w-2.5 h-2.5 animate-pulse shrink-0" /><span>Keterangan &amp; I'lal</span>
                    </div>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-950/65 border border-slate-850 text-center flex flex-col justify-between">
                  <div>
                    <span className="text-[8px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Jamak Salim / Mu'annats</span>
                    <span className="text-[7.5px] text-slate-500 block mb-1 font-mono">(Salim Lughowi Beraturan)</span>
                    <div className="font-arabic text-xl font-bold text-emerald-450 py-1 font-sans">{isimFailPlural.salim || "—"}</div>
                  </div>
                  <span className="text-[8px] text-slate-500 font-mono block mt-1">Sifat Mudzakar/Muannats</span>
                </div>
              </div>
            </div>
          );
        })()}

        {activeJamakTab === "maful" && (() => {
          if (!isPremium) {
            return renderPremiumLockCard(
              "Analisis Jamak Isim Maf'ul Premium",
              "Formulasi konstruksi jamak taksir katsroh, qillah, dan muntahal jumu' untuk isim maf'ul dilindungi di bawah lisensi premium."
            );
          }
          const calculatedIsimMaful = IilalEngine.buatIsimMaful(
            selectedEntry.root.fa,
            selectedEntry.root.ain,
            selectedEntry.root.lam,
            selectedEntry.bina || "Shohih"
          );
          const isimMafulPlural = selectedEntry.isimMafulPlural || IilalEngine.analyzeIsimMafulPlural(selectedEntry);
          return (
            <div className="bg-slate-900 border border-emerald-800/20 text-slate-105 rounded-2xl p-5 shadow-xs relative overflow-hidden space-y-4 animate-fade-in text-left">
              <div className="flex items-center gap-2">
                <div className="p-1.5 bg-sky-500/20 text-sky-450 border border-sky-500/10 rounded-lg">
                  <Sparkles className="w-4 h-4 animate-pulse" />
                </div>
                <div>
                  <h3 className="font-extrabold text-xs text-white tracking-tight">Analisis Jamak Isim Maf'ul</h3>
                  <p className="text-[10px] text-slate-400 font-medium font-mono">Formulasi Konstruksi Jamak Taksir Terhadap Isim Maf'ul "{calculatedIsimMaful}"</p>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div className="p-3.5 rounded-xl bg-slate-950/65 border border-slate-850 text-center flex flex-col justify-between">
                  <div>
                    <span className="text-[8px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Jamak Taksir Katsroh</span>
                    <span className="text-[7.5px] text-slate-500 block mb-1 font-mono">(Jumlah Banyak &ge; 11 Sifat)</span>
                    <div className="font-arabic text-xl font-bold text-sky-450 py-1 cursor-pointer hover:scale-[1.03] transition-all font-sans" onClick={() => setSelectedWordInfo({ word: isimMafulPlural.katsroh, shighot: "Jamak Taksir Katsroh Isim Maf'ul" })}>{isimMafulPlural.katsroh || "—"}</div>
                  </div>
                  <div className="text-[8.5px] text-amber-500/90 mt-1.5 flex items-center justify-center gap-1.5 font-bold cursor-pointer font-sans" onClick={() => setSelectedWordInfo({ word: isimMafulPlural.katsroh, shighot: "Jamak Taksir Katsroh Isim Maf'ul" })}>
                    <Sparkles className="w-2.5 h-2.5 animate-pulse shrink-0" /><span>Keterangan &amp; I'lal</span>
                  </div>
                </div>

                <div className="space-y-3 flex flex-col justify-between">
                  {/* Jamak Taksir Qillah */}
                  <div className="p-3.5 rounded-xl bg-slate-950/65 border border-slate-850 text-center flex-1">
                    <span className="text-[8px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Jamak Taksir Qillah</span>
                    <span className="text-[7.5px] text-slate-500 block mb-1 font-mono">(Jumlah Sedikit / Jamak Salim)</span>
                    <div className="font-arabic text-xl font-bold text-indigo-405 py-1 cursor-pointer hover:scale-[1.03] transition-all font-sans" onClick={() => setSelectedWordInfo({ word: isimMafulPlural.qillah, shighot: "Jamak Taksir Qillah Isim Maf'ul" })}>{isimMafulPlural.qillah || "—"}</div>
                    <div className="text-[8.5px] text-amber-500/90 mt-1.5 flex items-center justify-center gap-1.5 font-bold cursor-pointer font-sans" onClick={() => setSelectedWordInfo({ word: isimMafulPlural.qillah, shighot: "Jamak Taksir Qillah Isim Maf'ul" })}>
                      <Sparkles className="w-2.5 h-2.5 animate-pulse shrink-0" /><span>Keterangan &amp; I'lal</span>
                    </div>
                  </div>

                  {/* Shighot Muntahal Jumu' */}
                  <div className="p-3.5 rounded-xl bg-slate-950/65 border border-slate-850 text-center flex-1">
                    <span className="text-[8px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Shighot Muntahal Jumu'</span>
                    <span className="text-[7.5px] text-slate-500 block mb-1 font-mono">(Plural Puncak / Ghair Munshorif)</span>
                    <div className="font-arabic text-xl font-bold text-pink-405 py-1 cursor-pointer hover:scale-[1.03] transition-all font-sans" onClick={() => setSelectedWordInfo({ word: isimMafulPlural.muntahal, shighot: "Shighot Muntahal Jumu' Isim Maf'ul" })}>{isimMafulPlural.muntahal || "—"}</div>
                    <div className="text-[8.5px] text-amber-500/90 mt-1.5 flex items-center justify-center gap-1.5 font-bold cursor-pointer font-sans" onClick={() => setSelectedWordInfo({ word: isimMafulPlural.muntahal, shighot: "Shighot Muntahal Jumu' Isim Maf'ul" })}>
                      <Sparkles className="w-2.5 h-2.5 animate-pulse shrink-0" /><span>Keterangan &amp; I'lal</span>
                    </div>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-950/65 border border-slate-850 text-center flex flex-col justify-between">
                  <div>
                    <span className="text-[8px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Jamak Salim / Mu'annats</span>
                    <span className="text-[7.5px] text-slate-500 block mb-1 font-mono">(Salim Lughowi Beraturan)</span>
                    <div className="font-arabic text-xl font-bold text-emerald-450 py-1 font-sans">{isimMafulPlural.salim || "—"}</div>
                  </div>
                  <span className="text-[8px] text-slate-555 font-mono block mt-1">Sifat Mudzakar/Muannats</span>
                </div>
              </div>
            </div>
          );
        })()}

        {activeJamakTab === "zamanmakan" && (() => {
          if (!isPremium) {
            return renderPremiumLockCard(
              "Analisis Jamak Isim Zaman & Makan Premium",
              "Formulasi konstruksi jamak taksir katsroh dan qillah untuk isim makan dan zaman dilindungi di bawah lisensi premium."
            );
          }
          const calculatedIsimZamanMakan = calculatedTasrif?.zamanMakan || "—";
          const isimZamanMakanPlural = selectedEntry.isimZamanMakanPlural || IilalEngine.analyzeIsimZamanMakanPlural(selectedEntry);
          return (
            <div className="bg-slate-900 border border-emerald-800/20 text-slate-100 rounded-2xl p-5 shadow-xs relative overflow-hidden space-y-4 animate-fade-in text-left">
              <div className="flex items-center gap-2">
                <div className="p-1.5 bg-sky-500/20 text-sky-450 rounded-lg">
                  <Sparkles className="w-4 h-4 animate-pulse" />
                </div>
                <div>
                  <h3 className="font-extrabold text-xs text-white tracking-tight">Analisis Jamak Isim Zaman &amp; Makan</h3>
                  <p className="text-[10px] text-slate-400 font-medium font-mono">Formulasi Konstruksi Jamak Taksir Terhadap Isim Zaman &amp; Makan "{calculatedIsimZamanMakan}"</p>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="p-3.5 rounded-xl bg-slate-950/65 border border-slate-850 text-center flex flex-col justify-between">
                  <div>
                    <span className="text-[8px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Jamak Taksir Katsroh</span>
                    <span className="text-[7.5px] text-slate-500 block mb-1 font-mono">(Pola Mafa'il / Mafa'iil)</span>
                    <div className="font-arabic text-xl font-bold text-sky-450 py-1 cursor-pointer hover:scale-[1.03] transition-all font-sans" onClick={() => setSelectedWordInfo({ word: isimZamanMakanPlural.katsroh, shighot: "Jamak Taksir Katsroh Isim Zaman & Makan" })}>{isimZamanMakanPlural.katsroh || "—"}</div>
                  </div>
                  <div className="text-[8.5px] text-amber-500/90 mt-1.5 flex items-center justify-center gap-1.5 font-bold cursor-pointer font-sans" onClick={() => setSelectedWordInfo({ word: isimZamanMakanPlural.katsroh, shighot: "Jamak Taksir Katsroh Isim Zaman & Makan" })}>
                    <Sparkles className="w-2.5 h-2.5 animate-pulse shrink-0" /><span>Keterangan &amp; I'lal</span>
                  </div>
                </div>

                <div className="space-y-3 flex flex-col justify-between">
                  <div className="p-3.5 rounded-xl bg-slate-950/65 border border-slate-850 text-center flex-1">
                    <span className="text-[8px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Jamak Taksir Qillah</span>
                    <span className="text-[7.5px] text-slate-500 block mb-1 font-mono">(Pola Af'ilah / Sifat Lain)</span>
                    <div className="font-arabic text-xl font-bold text-indigo-405 py-1 cursor-pointer hover:scale-[1.03] transition-all font-sans" onClick={() => setSelectedWordInfo({ word: isimZamanMakanPlural.qillah, shighot: "Jamak Taksir Qillah Isim Zaman & Makan" })}>{isimZamanMakanPlural.qillah || "—"}</div>
                    <div className="text-[8.5px] text-amber-500/90 mt-1.5 flex items-center justify-center gap-1.5 font-bold cursor-pointer font-sans" onClick={() => setSelectedWordInfo({ word: isimZamanMakanPlural.qillah, shighot: "Jamak Taksir Qillah Isim Zaman & Makan" })}>
                      <Sparkles className="w-2.5 h-2.5 animate-pulse shrink-0" /><span>Keterangan &amp; I'lal</span>
                    </div>
                  </div>

                  {/* Shighot Muntahal Jumu' */}
                  <div className="p-3.5 rounded-xl bg-slate-950/65 border border-slate-850 text-center flex-1 font-sans animate-fade-in">
                    <span className="text-[8px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Shighot Muntahal Jumu'</span>
                    <span className="text-[7.5px] text-slate-500 block mb-1 font-mono">(Plural Puncak / Ghair Munshorif)</span>
                    <div className="font-arabic text-xl font-bold text-pink-405 py-1 cursor-pointer hover:scale-[1.03] transition-all" onClick={() => setSelectedWordInfo({ word: isimZamanMakanPlural.muntahal, shighot: "Shighot Muntahal Jumu' Isim Zaman & Makan" })}>{isimZamanMakanPlural.muntahal || "—"}</div>
                    <div className="text-[8.5px] text-amber-500/90 mt-1.5 flex items-center justify-center gap-1.5 font-bold cursor-pointer text-center" onClick={() => setSelectedWordInfo({ word: isimZamanMakanPlural.muntahal, shighot: "Shighot Muntahal Jumu' Isim Zaman & Makan" })}>
                      <Sparkles className="w-2.5 h-2.5 animate-pulse shrink-0" /><span>Keterangan &amp; I'lal</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })()}

        {activeJamakTab === "alat" && (() => {
          if (!isPremium) {
            return renderPremiumLockCard(
              "Analisis Jamak Isim Alat Premium",
              "Formulasi konstruksi jamak taksir katsroh dan qillah untuk isim jenis alat dilindungi di bawah lisensi premium."
            );
          }
          const calculatedIsimAlat = calculatedTasrif?.isimAlat || "—";
          const isimAlatPlural = selectedEntry.isimAlatPlural || IilalEngine.analyzeIsimAlatPlural(selectedEntry);
          return (
            <div className="bg-slate-900 border border-emerald-800/20 text-slate-100 rounded-2xl p-5 shadow-xs relative overflow-hidden space-y-4 animate-fade-in text-left">
              <div className="flex items-center gap-2">
                <div className="p-1.5 bg-sky-500/20 text-sky-450 rounded-lg">
                  <Sparkles className="w-4 h-4 animate-pulse" />
                </div>
                <div>
                  <h3 className="font-extrabold text-xs text-white tracking-tight">Analisis Jamak Isim Alat</h3>
                  <p className="text-[10px] text-slate-400 font-medium font-mono">Formulasi Konstruksi Jamak Taksir Terhadap Isim Alat "{calculatedIsimAlat}"</p>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="p-3.5 rounded-xl bg-slate-950/65 border border-slate-850 text-center flex flex-col justify-between">
                  <div>
                    <span className="text-[8px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Jamak Taksir Katsroh</span>
                    <span className="text-[7.5px] text-slate-500 block mb-1 font-mono">(Pola Mafa'il / Alat Utama)</span>
                    <div className="font-arabic text-xl font-bold text-sky-450 py-1 cursor-pointer hover:scale-[1.03] transition-all font-sans" onClick={() => setSelectedWordInfo({ word: isimAlatPlural.katsroh, shighot: "Jamak Taksir Katsroh Isim Alat" })}>{isimAlatPlural.katsroh || "—"}</div>
                  </div>
                  <div className="text-[8.5px] text-amber-500/90 mt-1.5 flex items-center justify-center gap-1.5 font-bold cursor-pointer font-sans" onClick={() => setSelectedWordInfo({ word: isimAlatPlural.katsroh, shighot: "Jamak Taksir Katsroh Isim Alat" })}>
                    <Sparkles className="w-2.5 h-2.5 animate-pulse shrink-0" /><span>Keterangan &amp; I'lal</span>
                  </div>
                </div>

                <div className="space-y-3 flex flex-col justify-between">
                  <div className="p-3.5 rounded-xl bg-slate-950/65 border border-slate-850 text-center flex-1">
                    <span className="text-[8px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Jamak Taksir Qillah</span>
                    <span className="text-[7.5px] text-slate-500 block mb-1 font-mono">(Pola Alat Sekunder)</span>
                    <div className="font-arabic text-xl font-bold text-indigo-405 py-1 cursor-pointer hover:scale-[1.03] transition-all font-sans" onClick={() => setSelectedWordInfo({ word: isimAlatPlural.qillah, shighot: "Jamak Taksir Qillah Isim Alat" })}>{isimAlatPlural.qillah || "—"}</div>
                    <div className="text-[8.5px] text-amber-500/90 mt-1.5 flex items-center justify-center gap-1.5 font-bold cursor-pointer font-sans" onClick={() => setSelectedWordInfo({ word: isimAlatPlural.qillah, shighot: "Jamak Taksir Qillah Isim Alat" })}>
                      <Sparkles className="w-2.5 h-2.5 animate-pulse shrink-0" /><span>Keterangan &amp; I'lal</span>
                    </div>
                  </div>

                  {/* Shighot Muntahal Jumu' */}
                  <div className="p-3.5 rounded-xl bg-slate-950/65 border border-slate-850 text-center flex-1 font-sans animate-fade-in">
                    <span className="text-[8px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Shighot Muntahal Jumu'</span>
                    <span className="text-[7.5px] text-slate-500 block mb-1 font-mono">(Plural Puncak / Ghair Munshorif)</span>
                    <div className="font-arabic text-xl font-bold text-pink-405 py-1 cursor-pointer hover:scale-[1.03] transition-all" onClick={() => setSelectedWordInfo({ word: isimAlatPlural.muntahal, shighot: "Shighot Muntahal Jumu' Isim Alat" })}>{isimAlatPlural.muntahal || "—"}</div>
                    <div className="text-[8.5px] text-amber-500/90 mt-1.5 flex items-center justify-center gap-1.5 font-bold cursor-pointer text-center" onClick={() => setSelectedWordInfo({ word: isimAlatPlural.muntahal, shighot: "Shighot Muntahal Jumu' Isim Alat" })}>
                      <Sparkles className="w-2.5 h-2.5 animate-pulse shrink-0" /><span>Keterangan &amp; I'lal</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })()}

        {activeJamakTab === "sifat" && (() => {
          if (!isPremium) {
            return renderPremiumLockCard(
              "Analisis Sifat Musyabihat Premium",
              "Formulasi konstruksi jamak katsroh dan qillah untuk jenis sifat musyabihat dilindungi di bawah lisensi premium."
            );
          }
          const sifatMusyabihatPlural = selectedEntry.sifatMusyabihatPlural || analyzeSifatMusyabihatPlural(selectedEntry);
          return (
            <div className="bg-slate-900 border border-emerald-800/20 text-slate-100 rounded-2xl p-5 shadow-xs relative overflow-hidden space-y-4 animate-fade-in text-left">
              <div className="flex items-center gap-2">
                <div className="p-1.5 bg-sky-500/20 text-sky-450 rounded-lg font-bold">
                  <Sparkles className="w-4 h-4 animate-pulse" />
                </div>
                <div>
                  <h3 className="font-extrabold text-xs text-white tracking-tight">Analisis Sifat Musyabihat</h3>
                  <p className="text-[10px] text-slate-400 font-medium font-mono">Formulasi Konstruksi Jamak Taksir Terhadap Isim Sifat "{selectedEntry.sifatMusyabihat || "—"}"</p>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="p-3.5 rounded-xl bg-slate-950/65 border border-slate-850 text-center flex flex-col justify-between">
                  <div>
                    <span className="text-[8px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Jamak Taksir Katsroh</span>
                    <span className="text-[7.5px] text-slate-500 block mb-1 font-mono">(Konstruksi Jamak Taksir Katsroh)</span>
                    <div className="font-arabic text-xl font-bold text-sky-450 py-1 cursor-pointer hover:scale-[1.03] transition-all font-sans" onClick={() => setSelectedWordInfo({ word: sifatMusyabihatPlural.katsroh, shighot: "Jamak Taksir Katsroh Sifat Musyabihat" })}>{sifatMusyabihatPlural.katsroh || "—"}</div>
                  </div>
                  <div className="text-[8.5px] text-amber-500/90 mt-1.5 flex items-center justify-center gap-1.5 font-bold cursor-pointer font-sans" onClick={() => setSelectedWordInfo({ word: sifatMusyabihatPlural.katsroh, shighot: "Jamak Taksir Katsroh Sifat Musyabihat" })}>
                    <Sparkles className="w-2.5 h-2.5 animate-pulse shrink-0" /><span>Keterangan &amp; I'lal</span>
                  </div>
                </div>

                <div className="space-y-3 flex flex-col justify-between">
                  <div className="p-3.5 rounded-xl bg-slate-950/65 border border-slate-850 text-center flex-1">
                    <span className="text-[8px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Jamak Taksir Qillah</span>
                    <span className="text-[7.5px] text-slate-500 block mb-1 font-mono">(Konstruksi Jamak Taksir Qillah)</span>
                    <div className="font-arabic text-xl font-bold text-indigo-405 py-1 cursor-pointer hover:scale-[1.03] transition-all font-sans" onClick={() => setSelectedWordInfo({ word: sifatMusyabihatPlural.qillah, shighot: "Jamak Taksir Qillah Sifat Musyabihat" })}>{sifatMusyabihatPlural.qillah || "—"}</div>
                    <div className="text-[8.5px] text-amber-500/90 mt-1.5 flex items-center justify-center gap-1.5 font-bold cursor-pointer font-sans" onClick={() => setSelectedWordInfo({ word: sifatMusyabihatPlural.qillah, shighot: "Jamak Taksir Qillah Sifat Musyabihat" })}>
                      <Sparkles className="w-2.5 h-2.5 animate-pulse shrink-0" /><span>Keterangan &amp; I'lal</span>
                    </div>
                  </div>

                  {/* Shighot Muntahal Jumu' */}
                  <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 text-center flex-1 font-sans">
                    <span className="text-[8px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Shighot Muntahal Jumu'</span>
                    <span className="text-[7.5px] text-slate-500 block mb-1 font-mono">(Plural Puncak / Ghair Munshorif)</span>
                    <div className="font-arabic text-xl font-bold text-pink-405 py-1 cursor-pointer hover:scale-[1.03] transition-all" onClick={() => setSelectedWordInfo({ word: sifatMusyabihatPlural.muntahal, shighot: "Shighot Muntahal Jumu' Sifat Musyabihat" })}>{sifatMusyabihatPlural.muntahal || "—"}</div>
                    <div className="text-[8.5px] text-amber-500/90 mt-1.5 flex items-center justify-center gap-1.5 font-bold cursor-pointer text-center" onClick={() => setSelectedWordInfo({ word: sifatMusyabihatPlural.muntahal, shighot: "Shighot Muntahal Jumu' Sifat Musyabihat" })}>
                      <Sparkles className="w-2.5 h-2.5 animate-pulse shrink-0" /><span>Keterangan &amp; I'lal</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })()}
      </div>
    );
  };

  const getThemeBgClass = () => {
    switch (appTheme) {
      case "light":
        return "bg-slate-50 text-slate-900";
      case "green":
        return "bg-gradient-to-br from-[#03331e] via-[#05432a] to-[#01140d] text-[#f0fdf4]";
      case "dark":
      default:
        return "bg-gradient-to-br from-[#022317] via-[#052c1e] to-[#041a12] text-slate-100";
    }
  };

  return (
    <div className={`min-h-screen pb-12 font-sans selection:bg-emerald-550 selection:text-white transition-all duration-300 ${getThemeBgClass()}`}>
      {/* HEADER SECTION / DIGNIFIED COMPACT GOLDEN BANNER */}
      <header className="bg-[#031d13]/95 backdrop-blur-md border-b border-amber-500/20 sticky top-0 z-40 shadow-xs relative overflow-hidden py-1.5">
        {/* Subtle decorative geometric overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-amber-500/5 via-teal-950/10 to-transparent pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between relative z-10 select-none">
          <div className="flex items-center gap-2">
            <h1 className="font-extrabold text-slate-100 text-xs sm:text-sm tracking-normal">
              Shorof Digital
            </h1>
            <p className="text-[9px] text-slate-400 hidden sm:inline ml-2 border-l border-emerald-800/40 pl-2">Pusat Belajar Ilmu Sharaf &amp; I'lal</p>
          </div>

          {/* Golden Arabic calligraphy with font-thuluth - centered and split vertically */}
          <div className="hidden md:flex flex-col items-center justify-center text-center leading-tight mx-auto">
            <span className="text-amber-400 font-black text-base lg:text-lg font-thuluth tracking-widest bg-gradient-to-r from-amber-300 via-amber-450 to-amber-300 bg-clip-text text-transparent filter drop-shadow-[0_1.5px_3px_rgba(3,29,19,0.9)]">
              صرف الاصطلاحي
            </span>
            <span className="text-amber-300 font-bold text-[10px] lg:text-xs font-thuluth tracking-wider bg-gradient-to-r from-amber-250 via-amber-400 to-amber-250 bg-clip-text text-transparent filter drop-shadow-[0_1px_2px_rgba(3,29,19,0.9)]">
              واللغوي واللغوي
            </span>
          </div>

          <div className="flex items-center gap-3">
            {/* Mobile golden calligraphy - split vertically and centered */}
            <div className="flex flex-col items-center justify-center text-center leading-tight md:hidden mx-auto mr-1">
              <span className="text-amber-400 font-black text-[11px] font-thuluth filter drop-shadow-[0_1px_2.5px_rgba(3,29,19,0.9)]">
                صرف الاصطلاحي
              </span>
              <span className="text-amber-300 font-bold text-[8.5px] font-thuluth filter drop-shadow-[0_0.5px_1.5px_rgba(3,29,19,0.9)]">
                واللغوي واللغوي
              </span>
            </div>
            <span className="text-[10px] text-slate-100 font-bold whitespace-nowrap flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              IilalEngine
            </span>
          </div>
        </div>
      </header>



      {/* WORKSPACE LAYOUT */}
      <main className="max-w-7xl mx-auto px-4 mt-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* LEFT COLUMN: CONTROLLERS (4/12 width) - Always visible, stacking beautifully on mobile screens */}
          <section className="col-span-12 lg:col-span-4 space-y-6">
            
            {/* USER COMPACT PROFILE HEADER (MINIMALIST) */}
            <div className={`p-4 rounded-xl flex items-center justify-between gap-4 select-none ${
              appTheme === 'light' ? 'bg-white border border-slate-200' : 'bg-[#031d13]/50 border border-emerald-800/30'
            }`}>
              <div className="flex items-center gap-3 min-w-0">
                {/* Profile Photo (clickable to edit) */}
                <div 
                  className="relative cursor-pointer group hover:scale-105 transition-all shrink-0"
                  onClick={() => setShowEditProfileModal(true)}
                  title="Klik untuk mengubah Nama atau Foto Profil"
                >
                  {renderProfileImage(profilePhoto, "w-11 h-11")}
                  <div className="absolute -bottom-0.5 -right-0.5 bg-amber-500 text-slate-950 p-1 rounded-full border border-slate-900 shadow-md scale-75 group-hover:scale-90 transition-all">
                    <Edit3 className="w-2.5 h-2.5" />
                  </div>
                </div>

                {/* Username & Premium status */}
                <div className="min-w-0">
                  <div className="flex items-center gap-1">
                    <h4 
                      className={`font-black text-xs sm:text-sm truncate cursor-pointer hover:text-amber-400 transition-colors ${
                        appTheme === 'light' ? 'text-slate-900' : 'text-slate-100'
                      }`}
                      onClick={() => setShowEditProfileModal(true)}
                      title="Ubah Profil Pengguna"
                    >
                      {username}
                    </h4>
                  </div>
                  <div className="flex items-center gap-1 text-[9.5px] font-bold text-amber-500 mt-0.5">
                    <Sparkles className="w-2.5 h-2.5 shrink-0" />
                    <span>Premium: Aktif Selamanya</span>
                  </div>
                </div>
              </div>

              {/* Settings gear button */}
              <button
                onClick={() => setShowSettingsModal(true)}
                className={`p-2.5 rounded-xl transition-all flex items-center justify-center cursor-pointer shadow-md active:scale-95 hover:scale-[1.05] shrink-0 ${
                  appTheme === 'light' 
                    ? 'bg-slate-100 hover:bg-slate-200 border border-slate-200 text-slate-800' 
                    : 'bg-slate-800/85 hover:bg-slate-700/85 text-amber-400 border border-slate-700'
                }`}
                title="Buka Pengaturan Lengkap"
              >
                <Settings className="w-4 h-4 animate-spin-slow text-amber-500" />
              </button>
            </div>

            <DictionaryList
              selectedEntryId={selectedEntry.id}
              onSelectEntry={handleSelectPreset}
              onOpenMenu={() => setIsMobileSidebarOpen(true)}
              appTheme={appTheme}
            />

          </section>

          {/* RIGHT COLUMN: MAIN TASRIF WORKSPACE (8/12 width) - Stacks dynamically underneath on mobile */}
          <section className="col-span-12 lg:col-span-8 space-y-6">
            
            {/* ACTIVE WORKSPACE HEADER BANNER CARD */}
            <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-xs relative overflow-hidden flex flex-col md:flex-row md:items-center justify-between gap-6">
              {/* Backglow decorative */}
              <div className="absolute right-0 top-0 w-32 h-32 bg-emerald-500/5 rounded-full blur-2xl pointer-events-none" />

              <div>
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <span className="text-[10px] bg-slate-100 text-slate-800 font-bold px-2 py-0.5 rounded-full">
                    Bab {activeBabNum}
                  </span>
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      activeBina === "Shohih"
                        ? "bg-emerald-50 text-emerald-800 border-emerald-100 border"
                        : "bg-amber-50 text-amber-800 border-amber-100 border"
                    }`}
                  >
                    Bina {activeBina}
                  </span>
                  <span className="text-[10px] bg-indigo-50 text-indigo-700 font-bold px-2 py-0.5 rounded-full">
                    Tsulatsi Mujarrad (3 Huruf)
                  </span>
                </div>

                <h2 className="text-xl md:text-2xl font-black text-gray-950 flex items-center gap-2 select-text">
                  {activeTranslation}
                </h2>
                <p className="text-xs text-gray-400 mt-1 select-none">
                  Akar Kata: {selectedEntry.root.fa} - {selectedEntry.root.ain} - {selectedEntry.root.lam}
                  {selectedEntry.asal && (
                    <span className="text-emerald-700 font-semibold ml-2">
                       (Asal: {selectedEntry.asal})
                    </span>
                  )}
                </p>
              </div>

              {/* Massive elegant Arabic central display root */}
              <div className="text-right">
                <div className="text-[10px] uppercase font-mono font-bold tracking-wider text-gray-400 mb-1 select-none">
                  Akar Penyelidikan
                </div>
                <div className="font-arabic text-4xl md:text-5xl font-black text-emerald-990 group select-all py-1 cursor-all-scroll" dir="rtl">
                  {selectedEntry.root.fa}ـ{selectedEntry.root.ain}ـ{selectedEntry.root.lam}
                </div>
                <div className="text-[11px] font-mono font-bold text-gray-400 mt-1">
                  [ {selectedEntry.root.fa} + {selectedEntry.root.ain} + {selectedEntry.root.lam} ]
                  {selectedEntry.asal && (
                    <span className="text-emerald-600 ml-1">
                      → [ {activeWazanData.fa} + {activeWazanData.ain} + {activeWazanData.lam} ]
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* SECTION SELECTORS (PREVENT SCROLLING) */}
            <div className={`rounded-xl border p-1 flex shadow-3xs transition-colors duration-200 ${
              appTheme === "light"
                ? "bg-white border-gray-150"
                : "bg-slate-900/60 border-slate-805"
            }`}>
              <button
                onClick={() => setWorkspaceSection("shorof")}
                className={`flex-1 py-3 text-xs font-black rounded-lg transition-all flex items-center justify-center gap-2 cursor-pointer ${
                  workspaceSection === "shorof"
                    ? appTheme === "light"
                      ? "bg-slate-900 text-white shadow-xs animate-fade-in"
                      : "bg-emerald-600 text-white shadow-xs animate-fade-in"
                    : appTheme === "light"
                    ? "text-gray-400 hover:text-gray-800 hover:bg-gray-50"
                    : "text-slate-450 hover:text-slate-200 hover:bg-slate-800/50"
                }`}
              >
                <Layers className="w-4 h-4" />
                <span>Tasrif Sharaf &amp; Masdar</span>
              </button>
              <button
                onClick={() => setWorkspaceSection("jamak")}
                className={`flex-1 py-3 text-xs font-black rounded-lg transition-all flex items-center justify-center gap-2 cursor-pointer ${
                  workspaceSection === "jamak"
                    ? appTheme === "light"
                      ? "bg-slate-900 text-white shadow-xs animate-fade-in"
                      : "bg-emerald-600 text-white shadow-xs animate-fade-in"
                    : appTheme === "light"
                    ? "text-gray-400 hover:text-gray-800 hover:bg-gray-50"
                    : "text-slate-450 hover:text-slate-200 hover:bg-slate-800/50"
                }`}
              >
                <Sparkles className="w-4 h-4 text-emerald-500 animate-pulse" />
                <span>Analisis Jamak Taksir &amp; Qillah</span>
              </button>
            </div>

            {/* RENDER DYNAMIC SEGMENTS BASED ON SECTION */}
            {workspaceSection === "shorof" ? (
              <div className="space-y-6 animate-fade-in">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {/* Tasrif Istilahi Trigger Card */}
                  <button
                    onClick={() => setShowIstilahiModal(true)}
                    className={`p-5 rounded-2xl border transition-all duration-200 text-left cursor-pointer group hover:scale-[1.01] active:scale-95 shadow-xs relative overflow-hidden ${
                      appTheme === 'light'
                        ? 'bg-white hover:bg-slate-50 border-slate-200 text-slate-800'
                        : 'bg-[#031d13]/70 hover:bg-[#031d13]/90 border-emerald-800/20 text-white'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-500 border border-amber-500/15">
                        <Layers className="w-5 h-5 group-hover:scale-110 transition-transform" />
                      </div>
                      <span className="text-[9px] bg-emerald-500/10 text-emerald-300 font-extrabold px-2.5 py-0.5 rounded-full border border-emerald-500/20">POLA SHIGHOT</span>
                    </div>
                    <h3 className="font-extrabold text-sm tracking-tight mb-1">
                      Tasrif Istilahi (Pola Shighot)
                    </h3>
                    <p className="text-[11px] text-slate-400 leading-normal">
                      Pola perubahan 12 Shighot dari akar kata (tsulasi mujarrad) secara komprehensif.
                    </p>
                    <div className="mt-3 flex items-center gap-1 text-[11px] font-bold text-amber-400 group-hover:translate-x-1 transition-transform">
                      <span>Buka Tasrif Istilahi</span>
                      <span>→</span>
                    </div>
                  </button>

                  {/* Tasrif Lughowi Trigger Card */}
                  <button
                    onClick={() => setShowLughowiModal(true)}
                    className={`p-5 rounded-2xl border transition-all duration-200 text-left cursor-pointer group hover:scale-[1.01] active:scale-95 shadow-xs relative overflow-hidden ${
                      appTheme === 'light'
                        ? 'bg-white hover:bg-slate-50 border-slate-200 text-slate-800'
                        : 'bg-[#031d13]/70 hover:bg-[#031d13]/90 border-emerald-800/20 text-white'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-500 border border-amber-500/15">
                        <Table className="w-5 h-5 group-hover:scale-110 transition-transform" />
                      </div>
                      <span className="text-[9px] bg-emerald-500/10 text-emerald-300 font-extrabold px-2.5 py-0.5 rounded-full border border-emerald-500/20">14 KATA GANTI</span>
                    </div>
                    <h3 className="font-extrabold text-sm tracking-tight mb-1">
                      Tasrif Lughowi (Tabel Dhomir)
                    </h3>
                    <p className="text-[11px] text-slate-400 leading-normal">
                      Ketuk untuk membuka tabel konjugasi fi'il madhi, mudhari, amar, dan nahi per-Dhomir.
                    </p>
                    <div className="mt-3 flex items-center gap-1 text-[11px] font-bold text-amber-400 group-hover:translate-x-1 transition-transform">
                      <span>Buka Konjugasi Dhomir</span>
                      <span>→</span>
                    </div>
                  </button>

                  {/* Shorof Masdar Trigger Card */}
                  <button
                    onClick={() => setShowMasdarModal(true)}
                    className={`p-5 rounded-2xl border transition-all duration-200 text-left cursor-pointer group hover:scale-[1.01] active:scale-95 shadow-xs relative overflow-hidden ${
                      appTheme === 'light'
                        ? 'bg-white hover:bg-slate-50 border-slate-200 text-slate-800'
                        : 'bg-[#031d13]/70 hover:bg-[#031d13]/90 border-emerald-800/20 text-white'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-500 border border-amber-500/15">
                        <BookOpen className="w-5 h-5 group-hover:scale-110 transition-transform" />
                      </div>
                      <span className="text-[9px] bg-emerald-500/10 text-emerald-300 font-extrabold px-2.5 py-0.5 rounded-full border border-emerald-500/20">SAMA'I &amp; QIYASI</span>
                    </div>
                    <h3 className="font-extrabold text-sm tracking-tight mb-1">
                      Komparasi Masdar &amp; Turunan
                    </h3>
                    <p className="text-[11px] text-slate-400 leading-normal">
                      Bandingkan jenis Masdar (Sama'i, Qiyasi, Marrah, Nau'), Tafdhil, dan Tashghir secara lengkap.
                    </p>
                    <div className="mt-3 flex items-center gap-1 text-[11px] font-bold text-amber-400 group-hover:translate-x-1 transition-transform">
                      <span>Buka Komparasi Masdar</span>
                      <span>→</span>
                    </div>
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="grid grid-cols-1 gap-4">
                  {/* Jamak Taksir Katsroh & Qillah Card */}
                  <button
                    onClick={() => setShowJamakModal(true)}
                    className={`p-5 rounded-2xl border transition-all duration-200 text-left cursor-pointer group hover:scale-[1.01] active:scale-95 shadow-xs relative overflow-hidden ${
                      appTheme === 'light'
                        ? 'bg-white hover:bg-slate-50 border-slate-200 text-slate-800'
                        : 'bg-[#031d13]/70 hover:bg-[#031d13]/90 border-emerald-800/20 text-white'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-500 border border-amber-500/15">
                        <Sparkles className="w-5 h-5 group-hover:rotate-12 transition-transform animate-pulse text-indigo-400" />
                      </div>
                      <span className="text-[9px] bg-emerald-500/10 text-emerald-300 font-extrabold px-2.5 py-0.5 rounded-full border border-emerald-500/20">TAKSRIR &amp; QILLAH</span>
                    </div>
                    <h3 className="font-extrabold text-sm tracking-tight mb-1 text-slate-100">
                      Jamak Taksir Katsroh &amp; Qillah
                    </h3>
                    <p className="text-[11px] text-slate-400 leading-normal">
                      Ketuk untuk melihat analisis pembentukan Jamak Taksir Katsroh dan Jamak Qillah terhadap Isim Fa'il, Isim Maf'ul, Zaman/Makan, Alat, dan Sifat Musyabihat.
                    </p>
                    <div className="mt-3 flex items-center gap-1 text-[11px] font-bold text-amber-400 group-hover:translate-x-1 transition-transform">
                      <span>Buka Analisis Jamak</span>
                      <span>→</span>
                    </div>
                  </button>
                </div>

                {/* HIDE INLINE CONTENT FOR POPUP ONLY PRESENTATION */}
                <div className="hidden">
                
                {/* SUB-TABS SELECTORS BAR FOR INDIVIDUAL PLURAL ANALYSES */}
                <div className="bg-gray-100 p-1 rounded-xl flex flex-wrap gap-1 border border-gray-200">
                  <button
                    onClick={() => setActiveJamakTab("fail")}
                    className={`flex-1 py-2 px-1 text-[11px] font-black rounded-lg transition-all cursor-pointer whitespace-nowrap text-center ${
                      activeJamakTab === "fail"
                        ? "bg-slate-900 text-white shadow-xs"
                        : "text-gray-500 hover:text-gray-805 hover:bg-gray-50"
                    }`}
                  >
                    Isim Fa'il
                  </button>
                  <button
                    onClick={() => setActiveJamakTab("maful")}
                    className={`flex-1 py-2 px-1 text-[11px] font-black rounded-lg transition-all cursor-pointer whitespace-nowrap text-center ${
                      activeJamakTab === "maful"
                        ? "bg-slate-900 text-white shadow-xs"
                        : "text-gray-500 hover:text-gray-805 hover:bg-gray-50"
                    }`}
                  >
                    Isim Maf'ul
                  </button>
                  <button
                    onClick={() => setActiveJamakTab("zamanmakan")}
                    className={`flex-1 py-2 px-1 text-[11px] font-black rounded-lg transition-all cursor-pointer whitespace-nowrap text-center ${
                      activeJamakTab === "zamanmakan"
                        ? "bg-slate-900 text-white shadow-xs"
                        : "text-gray-500 hover:text-gray-805 hover:bg-gray-50"
                    }`}
                  >
                    Isim Zaman &amp; Makan
                  </button>
                  <button
                    onClick={() => setActiveJamakTab("alat")}
                    className={`flex-1 py-2 px-1 text-[11px] font-black rounded-lg transition-all cursor-pointer whitespace-nowrap text-center ${
                      activeJamakTab === "alat"
                        ? "bg-slate-900 text-white shadow-xs"
                        : "text-gray-500 hover:text-gray-805 hover:bg-gray-50"
                    }`}
                  >
                    Isim Alat
                  </button>
                  <button
                    onClick={() => setActiveJamakTab("sifat")}
                    className={`flex-1 py-2 px-1 text-[11px] font-black rounded-lg transition-all cursor-pointer whitespace-nowrap text-center ${
                      activeJamakTab === "sifat"
                        ? "bg-slate-900 text-white shadow-xs"
                        : "text-gray-500 hover:text-gray-805 hover:bg-gray-50"
                    }`}
                  >
                    Sifat Musyabihat
                  </button>
                </div>

                {/* SELECTED PLURAL ANALYSIS SHOWN HERE */}
                {activeJamakTab === "fail" && selectedEntry && (() => {
                  if (!isPremium) {
                    return renderPremiumLockCard(
                      "Analisis Jamak Isim Fa'il Premium",
                      "Formulasi konstruksi jamak taksir katsroh, qillah, dan muntahal jumu' untuk isim fa'il dilindungi di bawah lisensi premium."
                    );
                  }
                  const calculatedIsimFail = IilalEngine.buatIsimFail(
                    selectedEntry.root.fa,
                    selectedEntry.root.ain,
                    selectedEntry.root.lam,
                    selectedEntry.bina || "Shohih"
                  );
                  const isimFailPlural = selectedEntry.isimFailPlural || analyzeIsimFailPlural(selectedEntry);
                  return (
                    <div id="isim-fail-plural-section" className="bg-slate-900 text-slate-100 rounded-2xl border border-slate-800 p-5 shadow-xs relative overflow-hidden space-y-4">
                      <div className="absolute top-0 right-0 w-32 h-32 bg-sky-500/5 rounded-full blur-2xl pointer-events-none" />
                      <div className="absolute bottom-0 left-0 w-32 h-32 bg-indigo-500/5 rounded-full blur-2xl pointer-events-none" />

                      <div className="flex items-center gap-2">
                        <div className="p-1.5 bg-sky-500/20 text-sky-450 rounded-lg border border-sky-500/30">
                          <Sparkles className="w-4 h-4 animate-pulse" />
                        </div>
                        <div>
                          <h3 className="font-extrabold text-xs text-white tracking-tight">
                            Analisis Jamak Isim Fa'il
                          </h3>
                          <p className="text-[10px] text-slate-400 font-medium font-mono">
                            Formulasi Konstruksi Jamak Taksir Terhadap Isim Fa'il "{calculatedIsimFail}"
                          </p>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                        <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-850 text-center relative group hover:border-sky-500/30 transition-all">
                          <span className="text-[8px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                            Jamak Taksir Katsroh
                          </span>
                          <span className="text-[7.5px] text-slate-500 block mb-1 font-mono">
                            (Jumlah Banyak &ge; 11 Sifat)
                          </span>
                          <div 
                            className="font-arabic text-xl font-bold text-sky-450 py-1 cursor-pointer hover:scale-[1.03] transition-all"
                            title="Analisis & I'lal"
                            onClick={() => setSelectedWordInfo({ word: isimFailPlural.katsroh, shighot: "Jamak Taksir Katsroh Isim Fa'il" })}
                          >
                            {isimFailPlural.katsroh || "—"}
                          </div>
                          <div 
                            className="text-[8.5px] text-amber-500/90 mt-1.5 flex items-center justify-center gap-1.5 font-bold select-none cursor-pointer"
                            onClick={() => setSelectedWordInfo({ word: isimFailPlural.katsroh, shighot: "Jamak Taksir Katsroh Isim Fa'il" })}
                          >
                            <Sparkles className="w-2.5 h-2.5 text-amber-400 animate-pulse shrink-0" />
                            <span>Keterangan &amp; I'lal</span>
                          </div>
                        </div>

                        <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-850 text-center relative group hover:border-indigo-500/30 transition-all">
                          <span className="text-[8px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                            Jamak Taksir Qillah
                          </span>
                          <span className="text-[7.5px] text-slate-500 block mb-1 font-mono">
                            (Jumlah Sedikit / Jamak Salim)
                          </span>
                          <div 
                            className="font-arabic text-xl font-bold text-indigo-405 py-1 cursor-pointer hover:scale-[1.03] transition-all"
                            title="Analisis & I'lal"
                            onClick={() => setSelectedWordInfo({ word: isimFailPlural.qillah, shighot: "Jamak Taksir Qillah Isim Fa'il" })}
                          >
                            {isimFailPlural.qillah || "—"}
                          </div>
                          <div 
                            className="text-[8.5px] text-amber-500/90 mt-1.5 flex items-center justify-center gap-1.5 font-bold select-none cursor-pointer"
                            onClick={() => setSelectedWordInfo({ word: isimFailPlural.qillah, shighot: "Jamak Taksir Qillah Isim Fa'il" })}
                          >
                            <Sparkles className="w-2.5 h-2.5 text-amber-400 animate-pulse shrink-0" />
                            <span>Keterangan &amp; I'lal</span>
                          </div>
                        </div>

                        <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-850 text-center relative group hover:border-pink-500/30 transition-all">
                          <span className="text-[8px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                            Shighot Muntahal Jumu'
                          </span>
                          <span className="text-[7.5px] text-slate-500 block mb-1 font-mono">
                            (Bentuk Plural Puncak)
                          </span>
                          <div 
                            className="font-arabic text-xl font-bold text-pink-405 py-1 cursor-pointer hover:scale-[1.03] transition-all"
                            title="Analisis & I'lal"
                            onClick={() => setSelectedWordInfo({ word: isimFailPlural.muntahal, shighot: "Shighot Muntahal Jumu' Isim Fa'il" })}
                          >
                            {isimFailPlural.muntahal || "—"}
                          </div>
                          <div 
                            className="text-[8.5px] text-amber-500/90 mt-1.5 flex items-center justify-center gap-1.5 font-bold select-none cursor-pointer"
                            onClick={() => setSelectedWordInfo({ word: isimFailPlural.muntahal, shighot: "Shighot Muntahal Jumu' Isim Fa'il" })}
                          >
                            <Sparkles className="w-2.5 h-2.5 text-amber-400 animate-pulse shrink-0" />
                            <span>Keterangan &amp; I'lal</span>
                          </div>
                        </div>
                      </div>

                      <div className="p-3 rounded-xl bg-slate-950/40 border border-slate-850 space-y-1.5 text-[10px] leading-relaxed">
                        <p className="text-slate-300">
                          <span className="font-semibold text-slate-200">Kaidah Morfologi Isim Fa'il: </span>
                          {isimFailPlural.explanation}
                        </p>
                        <p className="text-slate-400 text-[9.5px] font-mono flex items-center gap-1.5 flex-wrap">
                          <BookOpen className="w-3.5 h-3.5 text-sky-500" />
                          <span>Rujukan Pembuktian Kamus Klasik: <strong className="text-sky-400 font-bold">{isimFailPlural.reference}</strong></span>
                        </p>
                      </div>
                    </div>
                  );
                })()}

                {activeJamakTab === "maful" && selectedEntry && (() => {
                  if (!isPremium) {
                    return renderPremiumLockCard(
                      "Analisis Jamak Isim Maf'ul Premium",
                      "Formulasi konstruksi jamak taksir katsroh, qillah, dan muntahal jumu' untuk isim maf'ul dilindungi di bawah lisensi premium."
                    );
                  }
                  const calculatedIsimMaful = IilalEngine.buatIsimMaful(
                    selectedEntry.root.fa,
                    selectedEntry.root.ain,
                    selectedEntry.root.lam,
                    selectedEntry.bina || "Shohih"
                  );
                  const isimMafulPlural = selectedEntry.isimMafulPlural || analyzeIsimMafulPlural(selectedEntry);
                  return (
                    <div id="isim-maful-plural-section" className="bg-slate-900 text-slate-100 rounded-2xl border border-slate-800 p-5 shadow-xs relative overflow-hidden space-y-4">
                      <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 rounded-full blur-2xl pointer-events-none" />
                      <div className="absolute bottom-0 left-0 w-32 h-32 bg-teal-500/5 rounded-full blur-2xl pointer-events-none" />

                      <div className="flex items-center gap-2">
                        <div className="p-1.5 bg-emerald-500/20 text-emerald-450 rounded-lg border border-emerald-500/30">
                          <Sparkles className="w-4 h-4 animate-pulse" />
                        </div>
                        <div>
                          <h3 className="font-extrabold text-xs text-white tracking-tight">
                            Analisis Jamak Isim Maf'ul
                          </h3>
                          <p className="text-[10px] text-slate-400 font-medium font-mono">
                            Formulasi Konstruksi Jamak Taksir Terhadap Isim Maf'ul "{calculatedIsimMaful}"
                          </p>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                        <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-850 text-center relative group hover:border-emerald-500/30 transition-all">
                          <span className="text-[8px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                            Jamak Taksir Katsroh
                          </span>
                          <span className="text-[7.5px] text-slate-500 block mb-1 font-mono">
                            (Jumlah Banyak &ge; 11 Sifat)
                          </span>
                          <div 
                            className="font-arabic text-xl font-bold text-emerald-400 py-1 cursor-pointer hover:scale-[1.03] transition-all"
                            title="Analisis & I'lal"
                            onClick={() => setSelectedWordInfo({ word: isimMafulPlural.katsroh, shighot: "Jamak Taksir Katsroh Isim Maf'ul" })}
                          >
                            {isimMafulPlural.katsroh || "—"}
                          </div>
                          <div 
                            className="text-[8.5px] text-amber-500/90 mt-1.5 flex items-center justify-center gap-1.5 font-bold select-none cursor-pointer"
                            onClick={() => setSelectedWordInfo({ word: isimMafulPlural.katsroh, shighot: "Jamak Taksir Katsroh Isim Maf'ul" })}
                          >
                            <Sparkles className="w-2.5 h-2.5 text-amber-400 animate-pulse shrink-0" />
                            <span>Keterangan &amp; I'lal</span>
                          </div>
                        </div>

                        <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-850 text-center relative group hover:border-teal-500/30 transition-all">
                          <span className="text-[8px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                            Jamak Taksir Qillah
                          </span>
                          <span className="text-[7.5px] text-slate-500 block mb-1 font-mono">
                            (Jumlah Sedikit / Jamak Salim)
                          </span>
                          <div 
                            className="font-arabic text-xl font-bold text-teal-450 py-1 cursor-pointer hover:scale-[1.03] transition-all"
                            title="Analisis & I'lal"
                            onClick={() => setSelectedWordInfo({ word: isimMafulPlural.qillah, shighot: "Jamak Taksir Qillah Isim Maf'ul" })}
                          >
                            {isimMafulPlural.qillah || "—"}
                          </div>
                          <div 
                            className="text-[8.5px] text-amber-500/90 mt-1.5 flex items-center justify-center gap-1.5 font-bold select-none cursor-pointer"
                            onClick={() => setSelectedWordInfo({ word: isimMafulPlural.qillah, shighot: "Jamak Taksir Qillah Isim Maf'ul" })}
                          >
                            <Sparkles className="w-2.5 h-2.5 text-amber-400 animate-pulse shrink-0" />
                            <span>Keterangan &amp; I'lal</span>
                          </div>
                        </div>

                        <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-850 text-center relative group hover:border-cyan-500/30 transition-all">
                          <span className="text-[8px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                            Shighot Muntahal Jumu'
                          </span>
                          <span className="text-[7.5px] text-slate-500 block mb-1 font-mono">
                            (Bentuk Plural Puncak)
                          </span>
                          <div 
                            className="font-arabic text-xl font-bold text-cyan-455 py-1 cursor-pointer hover:scale-[1.03] transition-all"
                            title="Analisis & I'lal"
                            onClick={() => setSelectedWordInfo({ word: isimMafulPlural.muntahal, shighot: "Shighot Muntahal Jumu' Isim Maf'ul" })}
                          >
                            {isimMafulPlural.muntahal || "—"}
                          </div>
                          <div 
                            className="text-[8.5px] text-amber-500/90 mt-1.5 flex items-center justify-center gap-1.5 font-bold select-none cursor-pointer"
                            onClick={() => setSelectedWordInfo({ word: isimMafulPlural.muntahal, shighot: "Shighot Muntahal Jumu' Isim Maf'ul" })}
                          >
                            <Sparkles className="w-2.5 h-2.5 text-amber-400 animate-pulse shrink-0" />
                            <span>Keterangan &amp; I'lal</span>
                          </div>
                        </div>
                      </div>

                      <div className="p-3 rounded-xl bg-slate-950/40 border border-slate-850 space-y-1.5 text-[10px] leading-relaxed">
                        <p className="text-slate-300">
                          <span className="font-semibold text-slate-200">Kaidah Morfologi Isim Maf'ul: </span>
                          {isimMafulPlural.explanation}
                        </p>
                        <p className="text-slate-400 text-[9.5px] font-mono flex items-center gap-1.5 flex-wrap">
                          <BookOpen className="w-3.5 h-3.5 text-emerald-500" />
                          <span>Rujukan Pembuktian Kamus Klasik: <strong className="text-emerald-400 font-bold">{isimMafulPlural.reference}</strong></span>
                        </p>
                      </div>
                    </div>
                  );
                })()}

                {activeJamakTab === "zamanmakan" && selectedEntry && (() => {
                  const isimZamanMakanPlural = selectedEntry.isimZamanMakanPlural || analyzeIsimZamanMakanPlural(selectedEntry);
                  return (
                    <div id="isim-zamanmakan-plural-section" className="bg-slate-900 text-slate-100 rounded-2xl border border-slate-800 p-5 shadow-xs relative overflow-hidden space-y-4">
                      <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/5 rounded-full blur-2xl pointer-events-none" />
                      <div className="absolute bottom-0 left-0 w-32 h-32 bg-yellow-500/5 rounded-full blur-2xl pointer-events-none" />

                      <div className="flex items-center gap-2">
                        <div className="p-1.5 bg-amber-500/20 text-amber-450 rounded-lg border border-amber-500/30">
                          <Sparkles className="w-4 h-4 animate-pulse" />
                        </div>
                        <div>
                          <h3 className="font-extrabold text-xs text-white tracking-tight">
                            Analisis Jamak Isim Zaman &amp; Isim Makan
                          </h3>
                          <p className="text-[10px] text-slate-400 font-medium font-mono">
                            Formulasi Konstruksi Jamak Terhadap Bentuk Tunggal "{isimZamanMakanPlural.mufrod || "مَفْعَلٌ"}"
                          </p>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                        <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-850 text-center relative group hover:border-amber-500/30 transition-all">
                          <span className="text-[8px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                            Jamak Taksir Katsroh
                          </span>
                          <span className="text-[7.5px] text-slate-500 block mb-1 font-mono">
                            (Jumlah Banyak &ge; 11 Sifat)
                          </span>
                          <div 
                            className="font-arabic text-xl font-bold text-amber-400 py-1 cursor-pointer hover:scale-[1.03] transition-all"
                            title="Analisis & I'lal"
                            onClick={() => setSelectedWordInfo({ word: isimZamanMakanPlural.katsroh, shighot: "Jamak Taksir Katsroh Isim Zaman & Makan" })}
                          >
                            {isimZamanMakanPlural.katsroh || "—"}
                          </div>
                          <div 
                            className="text-[8.5px] text-amber-500/90 mt-1.5 flex items-center justify-center gap-1.5 font-bold select-none cursor-pointer"
                            onClick={() => setSelectedWordInfo({ word: isimZamanMakanPlural.katsroh, shighot: "Jamak Taksir Katsroh Isim Zaman & Makan" })}
                          >
                            <Sparkles className="w-2.5 h-2.5 text-amber-400 animate-pulse shrink-0" />
                            <span>Keterangan &amp; I'lal</span>
                          </div>
                        </div>

                        <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-850 text-center relative group hover:border-yellow-500/30 transition-all">
                          <span className="text-[8px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                            Jamak Taksir Qillah
                          </span>
                          <span className="text-[7.5px] text-slate-500 block mb-1 font-mono">
                            (Jumlah Sedikit / Paucity)
                          </span>
                          <div 
                            className="font-arabic text-xl font-bold text-yellow-405 py-1 cursor-pointer hover:scale-[1.03] transition-all"
                            title="Analisis & I'lal"
                            onClick={() => setSelectedWordInfo({ word: isimZamanMakanPlural.qillah, shighot: "Jamak Taksir Qillah Isim Zaman & Makan" })}
                          >
                            {isimZamanMakanPlural.qillah || "—"}
                          </div>
                          <div 
                            className="text-[8.5px] text-amber-500/90 mt-1.5 flex items-center justify-center gap-1.5 font-bold select-none cursor-pointer"
                            onClick={() => setSelectedWordInfo({ word: isimZamanMakanPlural.qillah, shighot: "Jamak Taksir Qillah Isim Zaman & Makan" })}
                          >
                            <Sparkles className="w-2.5 h-2.5 text-amber-400 animate-pulse shrink-0" />
                            <span>Keterangan &amp; I'lal</span>
                          </div>
                        </div>

                        <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-850 text-center relative group hover:border-orange-500/30 transition-all">
                          <span className="text-[8px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                            Shighot Muntahal Jumu'
                          </span>
                          <span className="text-[7.5px] text-slate-500 block mb-1 font-mono">
                            (Bentuk Plural Puncak)
                          </span>
                          <div 
                            className="font-arabic text-xl font-bold text-orange-405 py-1 cursor-pointer hover:scale-[1.03] transition-all"
                            title="Analisis & I'lal"
                            onClick={() => setSelectedWordInfo({ word: isimZamanMakanPlural.muntahal, shighot: "Shighot Muntahal Jumu' Isim Zaman & Makan" })}
                          >
                            {isimZamanMakanPlural.muntahal || "—"}
                          </div>
                          <div 
                            className="text-[8.5px] text-amber-500/90 mt-1.5 flex items-center justify-center gap-1.5 font-bold select-none cursor-pointer"
                            onClick={() => setSelectedWordInfo({ word: isimZamanMakanPlural.muntahal, shighot: "Shighot Muntahal Jumu' Isim Zaman & Makan" })}
                          >
                            <Sparkles className="w-2.5 h-2.5 text-amber-400 animate-pulse shrink-0" />
                            <span>Keterangan &amp; I'lal</span>
                          </div>
                        </div>
                      </div>

                      <div className="p-3 rounded-xl bg-slate-950/40 border border-slate-850 space-y-1.5 text-[10px] leading-relaxed">
                        <p className="text-slate-300">
                          <span className="font-semibold text-slate-200">Kaidah Morfologi Isim Zaman &amp; Makan: </span>
                          {isimZamanMakanPlural.explanation}
                        </p>
                        <p className="text-slate-400 text-[9.5px] font-mono flex items-center gap-1.5 flex-wrap">
                          <BookOpen className="w-3.5 h-3.5 text-amber-500" />
                          <span>Rujukan Pembuktian Kamus Klasik: <strong className="text-amber-400 font-bold">{isimZamanMakanPlural.reference}</strong></span>
                        </p>
                      </div>
                    </div>
                  );
                })()}

                {activeJamakTab === "alat" && selectedEntry && (() => {
                  const isimAlatPlural = selectedEntry.isimAlatPlural || analyzeIsimAlatPlural(selectedEntry);
                  return (
                    <div id="isim-alat-plural-section" className="bg-slate-900 text-slate-100 rounded-2xl border border-slate-800 p-5 shadow-xs relative overflow-hidden space-y-4">
                      <div className="absolute top-0 right-0 w-32 h-32 bg-violet-500/5 rounded-full blur-2xl pointer-events-none" />
                      <div className="absolute bottom-0 left-0 w-32 h-32 bg-purple-500/5 rounded-full blur-2xl pointer-events-none" />

                      <div className="flex items-center gap-2">
                        <div className="p-1.5 bg-violet-500/20 text-violet-405 rounded-lg border border-violet-500/30">
                          <Sparkles className="w-4 h-4 animate-pulse" />
                        </div>
                        <div>
                          <h3 className="font-extrabold text-xs text-white tracking-tight">
                            Analisis Jamak Isim Alat
                          </h3>
                          <p className="text-[10px] text-slate-400 font-medium font-mono">
                            Formulasi Konstruksi Jamak Terhadap Bentuk Tunggal "{isimAlatPlural.mufrod || "مِفْعَلٌ"}"
                          </p>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                        <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-850 text-center relative group hover:border-violet-500/30 transition-all">
                          <span className="text-[8px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                            Jamak Taksir Katsroh
                          </span>
                          <span className="text-[7.5px] text-slate-500 block mb-1 font-mono">
                            (Jumlah Banyak &ge; 11 Sifat)
                          </span>
                          <div 
                            className="font-arabic text-xl font-bold text-violet-400 py-1 cursor-pointer hover:scale-[1.03] transition-all"
                            title="Analisis & I'lal"
                            onClick={() => setSelectedWordInfo({ word: isimAlatPlural.katsroh, shighot: "Jamak Taksir Katsroh Isim Alat" })}
                          >
                            {isimAlatPlural.katsroh || "—"}
                          </div>
                          <div 
                            className="text-[8.5px] text-amber-500/90 mt-1.5 flex items-center justify-center gap-1.5 font-bold select-none cursor-pointer"
                            onClick={() => setSelectedWordInfo({ word: isimAlatPlural.katsroh, shighot: "Jamak Taksir Katsroh Isim Alat" })}
                          >
                            <Sparkles className="w-2.5 h-2.5 text-amber-400 animate-pulse shrink-0" />
                            <span>Keterangan &amp; I'lal</span>
                          </div>
                        </div>

                        <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-850 text-center relative group hover:border-purple-500/30 transition-all">
                          <span className="text-[8px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                            Jamak Taksir Qillah
                          </span>
                          <span className="text-[7.5px] text-slate-500 block mb-1 font-mono">
                            (Jumlah Sedikit / Paucity)
                          </span>
                          <div 
                            className="font-arabic text-xl font-bold text-purple-405 py-1 cursor-pointer hover:scale-[1.03] transition-all"
                            title="Analisis & I'lal"
                            onClick={() => setSelectedWordInfo({ word: isimAlatPlural.qillah, shighot: "Jamak Taksir Qillah Isim Alat" })}
                          >
                            {isimAlatPlural.qillah || "—"}
                          </div>
                          <div 
                            className="text-[8.5px] text-amber-500/90 mt-1.5 flex items-center justify-center gap-1.5 font-bold select-none cursor-pointer"
                            onClick={() => setSelectedWordInfo({ word: isimAlatPlural.qillah, shighot: "Jamak Taksir Qillah Isim Alat" })}
                          >
                            <Sparkles className="w-2.5 h-2.5 text-amber-400 animate-pulse shrink-0" />
                            <span>Keterangan &amp; I'lal</span>
                          </div>
                        </div>

                        <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-850 text-center relative group hover:border-fuchsia-500/30 transition-all">
                          <span className="text-[8px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                            Shighot Muntahal Jumu'
                          </span>
                          <span className="text-[7.5px] text-slate-500 block mb-1 font-mono">
                            (Bentuk Plural Puncak)
                          </span>
                          <div 
                            className="font-arabic text-xl font-bold text-fuchsia-405 py-1 cursor-pointer hover:scale-[1.03] transition-all"
                            title="Analisis & I'lal"
                            onClick={() => setSelectedWordInfo({ word: isimAlatPlural.muntahal, shighot: "Shighot Muntahal Jumu' Isim Alat" })}
                          >
                            {isimAlatPlural.muntahal || "—"}
                          </div>
                          <div 
                            className="text-[8.5px] text-amber-500/90 mt-1.5 flex items-center justify-center gap-1.5 font-bold select-none cursor-pointer"
                            onClick={() => setSelectedWordInfo({ word: isimAlatPlural.muntahal, shighot: "Shighot Muntahal Jumu' Isim Alat" })}
                          >
                            <Sparkles className="w-2.5 h-2.5 text-amber-400 animate-pulse shrink-0" />
                            <span>Keterangan &amp; I'lal</span>
                          </div>
                        </div>
                      </div>

                      <div className="p-3 rounded-xl bg-slate-950/40 border border-slate-850 space-y-1.5 text-[10px] leading-relaxed">
                        <p className="text-slate-300">
                          <span className="font-semibold text-slate-200">Kaidah Morfologi Isim Alat: </span>
                          {isimAlatPlural.explanation}
                        </p>
                        <p className="text-slate-400 text-[9.5px] font-mono flex items-center gap-1.5 flex-wrap">
                          <BookOpen className="w-3.5 h-3.5 text-violet-500" />
                          <span>Rujukan Pembuktian Kamus Klasik: <strong className="text-violet-400 font-bold">{isimAlatPlural.reference}</strong></span>
                        </p>
                      </div>
                    </div>
                  );
                })()}

                {activeJamakTab === "sifat" && selectedEntry && (() => {
                  if (!isPremium) {
                    return renderPremiumLockCard(
                      "Analisis Jamak Sifat Musyabihat Premium",
                      "Formulasi konstruksi jamak taksir katsroh, qillah, dan muntahal jumu' untuk sifat musyabihat dilindungi di bawah lisensi premium."
                    );
                  }
                  const sifatMusyabihatPlural = selectedEntry.sifatMusyabihatPlural || analyzeSifatMusyabihatPlural(selectedEntry);
                  return (
                    <div id="sifat-musyabihat-plural-section" className="bg-slate-900 text-slate-100 rounded-2xl border border-slate-800 p-5 shadow-xs relative overflow-hidden space-y-4">
                      <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 rounded-full blur-2xl pointer-events-none" />
                      <div className="absolute bottom-0 left-0 w-32 h-32 bg-indigo-500/5 rounded-full blur-2xl pointer-events-none" />

                      <div className="flex items-center gap-2">
                        <div className="p-1.5 bg-emerald-500/20 text-emerald-450 rounded-lg border border-emerald-500/30">
                          <Sparkles className="w-4 h-4 animate-pulse" />
                        </div>
                        <div>
                          <h3 className="font-extrabold text-xs text-white tracking-tight">
                            Analisis Jamak Sifat Musyabihat
                          </h3>
                          <p className="text-[10px] text-slate-400 font-medium">
                            Formulasi Konstruksi Jamak Taksir Terhadap Isim Sifat "{selectedEntry.sifatMusyabihat || "—"}"
                          </p>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                        <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-850 text-center relative group hover:border-emerald-500/30 transition-all">
                          <span className="text-[8px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                            Jamak Taksir Katsroh
                          </span>
                          <span className="text-[7.5px] text-slate-500 block mb-1 font-mono">
                            (Jumlah Banyak &ge; 11 Sifat)
                          </span>
                          <div 
                            className="font-arabic text-xl font-bold text-emerald-400 py-1 cursor-pointer hover:scale-[1.03] transition-all"
                            title="Analisis & I'lal"
                            onClick={() => setSelectedWordInfo({ word: sifatMusyabihatPlural.katsroh, shighot: "Jamak Taksir Katsroh Sifat Musyabihat" })}
                          >
                            {sifatMusyabihatPlural.katsroh || "—"}
                          </div>
                          <div 
                            className="text-[8.5px] text-amber-500/90 mt-1.5 flex items-center justify-center gap-1.5 font-bold select-none cursor-pointer"
                            onClick={() => setSelectedWordInfo({ word: sifatMusyabihatPlural.katsroh, shighot: "Jamak Taksir Katsroh Sifat Musyabihat" })}
                          >
                            <Sparkles className="w-2.5 h-2.5 text-amber-400 animate-pulse shrink-0" />
                            <span>Keterangan &amp; I'lal</span>
                          </div>
                        </div>

                        <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-850 text-center relative group hover:border-indigo-500/30 transition-all">
                          <span className="text-[8px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                            Jamak Taksir Qillah
                          </span>
                          <span className="text-[7.5px] text-slate-500 block mb-1 font-mono">
                            (Jumlah Sedikit 3-10 Sifat)
                          </span>
                          <div 
                            className="font-arabic text-xl font-bold text-indigo-405 py-1 cursor-pointer hover:scale-[1.03] transition-all"
                            title="Analisis & I'lal"
                            onClick={() => setSelectedWordInfo({ word: sifatMusyabihatPlural.qillah, shighot: "Jamak Taksir Qillah Sifat Musyabihat" })}
                          >
                            {sifatMusyabihatPlural.qillah || "—"}
                          </div>
                          <div 
                            className="text-[8.5px] text-amber-500/90 mt-1.5 flex items-center justify-center gap-1.5 font-bold select-none cursor-pointer"
                            onClick={() => setSelectedWordInfo({ word: sifatMusyabihatPlural.qillah, shighot: "Jamak Taksir Qillah Sifat Musyabihat" })}
                          >
                            <Sparkles className="w-2.5 h-2.5 text-amber-400 animate-pulse shrink-0" />
                            <span>Keterangan &amp; I'lal</span>
                          </div>
                        </div>

                        <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-850 text-center relative group hover:border-amber-500/30 transition-all">
                          <span className="text-[8px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                            Shighot Muntahal Jumu'
                          </span>
                          <span className="text-[7.5px] text-slate-500 block mb-1 font-mono">
                            (Bentuk Plural Puncak)
                          </span>
                          <div 
                            className="font-arabic text-xl font-bold text-amber-405 py-1 cursor-pointer hover:scale-[1.03] transition-all"
                            title="Analisis & I'lal"
                            onClick={() => setSelectedWordInfo({ word: sifatMusyabihatPlural.muntahal, shighot: "Shighot Muntahal Jumu' Sifat Musyabihat" })}
                          >
                            {sifatMusyabihatPlural.muntahal || "—"}
                          </div>
                          <div 
                            className="text-[8.5px] text-amber-500/90 mt-1.5 flex items-center justify-center gap-1.5 font-bold select-none cursor-pointer"
                            onClick={() => setSelectedWordInfo({ word: sifatMusyabihatPlural.muntahal, shighot: "Shighot Muntahal Jumu' Sifat Musyabihat" })}
                          >
                            <Sparkles className="w-2.5 h-2.5 text-amber-400 animate-pulse shrink-0" />
                            <span>Keterangan &amp; I'lal</span>
                          </div>
                        </div>
                      </div>

                      <div className="p-3 rounded-xl bg-slate-950/40 border border-slate-850 space-y-1.5 text-[10px] leading-relaxed">
                        <p className="text-slate-300">
                          <span className="font-semibold text-slate-200">Kaidah Morfologi Sifat Musyabihat: </span>
                          {sifatMusyabihatPlural.explanation}
                        </p>
                        <p className="text-slate-400 text-[9.5px] font-mono flex items-center gap-1.5">
                          <BookOpen className="w-3.5 h-3.5 text-emerald-500" />
                          <span>Rujukan Pembuktian Kamus Klasik: <strong className="text-emerald-400">{sifatMusyabihatPlural.reference}</strong></span>
                        </p>
                      </div>
                    </div>
                  );
                })()}

                </div>
              </div>
            )}

          </section>

        </div>
      </main>

      {/* FOOTER BAR CREDITS */}
      <footer className="max-w-7xl mx-auto px-4 mt-16 border-t border-gray-100 pt-8 flex flex-col md:flex-row items-center justify-between text-xs text-gray-400 gap-4">
        <div>
          <p>© 2026 Shorof Digital Pro. Karya bertenaga IilalEngine Bahasa Indonesia.</p>
          <p className="mt-1">Dibuat khusus sebagai referensi andalan pembelajaran Tasrif, I'lal, dan bina morfologi bahasa Arab.</p>
        </div>
        <div className="flex items-center gap-3">
          <span className="bg-slate-100 text-slate-500 font-mono px-2 py-1 rounded-md text-[10px]">
            No HMR • Pure Client Storage Offline
          </span>
        </div>
      </footer>

      {/* WORD DETAILED PREMIUM ANALYSIS MODAL */}
      {selectedWordInfo && (
        <div className="fixed inset-0 bg-[#02130e]/85 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="bg-[#05291d] border-2 border-amber-500/40 rounded-3xl w-full max-w-lg p-6 shadow-2xl shadow-amber-500/15 relative overflow-hidden select-none animate-fade-in">
            {/* Ambient decorative glowing backdrops */}
            <div className="absolute -top-12 -right-12 w-32 h-32 bg-amber-500/10 rounded-full blur-2xl pointer-events-none" />
            <div className="absolute -bottom-12 -left-12 w-32 h-32 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none" />
            
            {/* Header */}
            <div className="flex items-center justify-between border-b border-emerald-800/40 pb-3">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-400 animate-pulse" />
                <span className="text-[10px] font-black text-amber-400 uppercase tracking-wider">PREMIUM WORD SPECIFICATION</span>
              </div>
              <button 
                onClick={() => setSelectedWordInfo(null)}
                className="p-1 rounded-full text-slate-400 hover:text-white hover:bg-emerald-900/50 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Word Representation */}
            <div className="text-center py-6 border-b border-emerald-800/20">
              <div className="text-[10px] uppercase font-bold tracking-widest text-slate-400 font-mono mb-2">Shighot / Bentuk</div>
              <span className="bg-amber-500/10 text-amber-300 font-black text-xs px-3 py-1 rounded-full border border-amber-500/20">
                {selectedWordInfo.shighot}
              </span>
              <div className="font-arabic text-5xl md:text-6xl font-black text-amber-455 mt-6 select-all animate-floating-gold py-2" dir="rtl">
                {selectedWordInfo.word || "—"}
              </div>
            </div>

            {/* Premium details list */}
            <div className="py-5 space-y-4 text-xs">
              <div className="bg-slate-950/65 rounded-2xl border border-emerald-800/30 p-4">
                <h4 className="font-bold text-amber-300 flex items-center gap-1.5 mb-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                  Makna &amp; Kedudukan Isim
                </h4>
                <p className="text-slate-300 leading-relaxed font-semibold">
                  Nantikan update selanjutnya
                </p>
              </div>

              <div className="bg-slate-950/65 rounded-2xl border border-emerald-800/30 p-4">
                <h4 className="font-bold text-amber-300 flex items-center gap-1.5 mb-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                  Kaidah Perubahan Formasi (I'lal)
                </h4>
                <p className="text-slate-300 leading-relaxed font-semibold">
                  Nantikan update selanjutnya
                </p>
              </div>
            </div>

            {/* Base footer */}
            <div className="pt-3 border-t border-emerald-800/40 flex items-center justify-between text-[10px] text-slate-400">
              <span>Status: <strong className="text-amber-400 font-bold">Premium Terpasang</strong></span>
              <span>📅 Update 14 lafadz/minggu</span>
            </div>

            {/* Tutup Button */}
            <div className="mt-5">
              <button
                onClick={() => setSelectedWordInfo(null)}
                className="w-full py-2.5 bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 font-black text-xs rounded-xl hover:from-amber-450 hover:to-amber-550 transition-all shadow-md shadow-amber-500/10 flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <span>Tutup Spesifikasi</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* PREMIUM CHOOSE PACKAGE MODAL */}
      {showPremiumModal && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md z-55 flex items-center justify-center p-4">
          <div className="bg-[#05291d] border-2 border-amber-500/50 rounded-3xl w-full max-w-lg p-6 shadow-2xl relative space-y-5 text-slate-100 select-none animate-fade-in">
            {/* Ambient gold glow */}
            <div className="absolute right-0 top-0 w-40 h-40 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

            {/* Header */}
            <div className="flex items-center justify-between border-b border-emerald-800/40 pb-3">
              <div className="flex items-center gap-2.5">
                <div className="p-2 bg-amber-500/15 text-amber-400 rounded-xl">
                  <Sparkles className="w-5 h-5 animate-pulse" />
                </div>
                <div>
                  <h3 className="font-black text-sm text-white tracking-tight">Upgrade Shorof Digital PRO</h3>
                  <p className="text-[10px] text-slate-400 font-mono">Buka Seluruh Fitur I'lal, Analisis Jamak &amp; Komparasi Masdar</p>
                </div>
              </div>
              <button
                onClick={() => {
                  setShowPremiumModal(false);
                  setActivationError("");
                }}
                className="p-1.5 rounded-full text-slate-400 hover:text-white hover:bg-emerald-950/50 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Premium Advantages Info Box */}
            <div className="bg-slate-950/60 rounded-2xl border border-emerald-800/30 p-3.5 space-y-2 text-xs">
              <div className="flex items-center gap-2 text-amber-300 font-bold">
                <Check className="w-3.5 h-3.5" />
                <span>Fitur Premium Yang Terbuka Otomatis:</span>
              </div>
              <ul className="space-y-1.5 pl-5 list-disc text-slate-300 font-medium">
                <li>Detail Penjelasan Analisis Pembentukan (I'lal) tiap kata secara komparatif.</li>
                <li>Tabel Komparasi Masdar (Sama'i, Qiyasi, Marrah, &amp; Nau') terlengkap.</li>
                <li>Penyelidikan Jamak Taksir &amp; Jamak Qillah pola Shighot Muntahal Jumul.</li>
                <li>Update berkala lafadz baru dari rujukan Thullab Azhar &amp; Pesantren.</li>
              </ul>
            </div>

            {/* Choose Package Grid */}
            <div className="space-y-3">
              <span className="text-[10px] font-extrabold text-[#10b981] uppercase tracking-wider block">Pilih Paket Aktivasi Lisensi</span>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {/* 7 Days Trial */}
                <button
                  type="button"
                  disabled={isPaymentLoading}
                  onClick={() => handlePayMidtrans(3000, "trial_7d", "Uji Coba Premium 7 Hari")}
                  className="bg-slate-950/80 border border-slate-800 rounded-2xl p-4 text-center hover:border-emerald-600 focus:outline-none transition-all hover:scale-[1.02] cursor-pointer group flex flex-col justify-between"
                >
                  <div>
                    <span className="text-[8.5px] font-extrabold bg-slate-900 text-slate-400 px-2 py-0.5 rounded-full">TRIAL</span>
                    <h5 className="font-black text-xs text-slate-200 mt-2 group-hover:text-amber-300">Coba 7 Hari</h5>
                    <p className="text-[9px] text-slate-400 mt-1">Uji fitur lengkap seminggu</p>
                  </div>
                  <div className="mt-4">
                    <div className="text-[10px] text-slate-500 line-through text-center">Rp 5.000</div>
                    <div className="font-extrabold text-sm text-emerald-450 text-center">Rp 3.000</div>
                  </div>
                </button>

                {/* 3 Months (Best Seller) */}
                <button
                  type="button"
                  disabled={isPaymentLoading}
                  onClick={() => handlePayMidtrans(13000, "pro_3m", "Akses Premium 3 Bulan")}
                  className="bg-emerald-950/20 border-2 border-amber-500/55 rounded-2xl p-4 text-center hover:border-amber-400 focus:outline-none transition-all hover:scale-[1.02] cursor-pointer group flex flex-col justify-between relative"
                >
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-amber-500 text-slate-950 text-[7.5px] font-black px-2 py-0.5 rounded-full uppercase tracking-wider">
                    BEST SELLER
                  </div>
                  <div className="mt-1">
                    <span className="text-[8.5px] font-extrabold bg-amber-500/10 text-amber-300 px-2 py-0.5 rounded-full">POPULER</span>
                    <h5 className="font-black text-xs text-amber-300 mt-2">Paling Laris</h5>
                    <p className="text-[9px] text-slate-400 mt-1">Belajar Sharaf 3 Bulan</p>
                  </div>
                  <div className="mt-4">
                    <div className="text-[10px] text-slate-500 line-through text-center">Rp 15.000</div>
                    <div className="font-extrabold text-sm text-amber-400 text-center">Rp 13.000</div>
                  </div>
                </button>

                {/* 1 Year */}
                <button
                  type="button"
                  disabled={isPaymentLoading}
                  onClick={() => handlePayMidtrans(29000, "pro_1y", "Akses Premium 1 Tahun")}
                  className="bg-slate-950/80 border border-slate-800 rounded-2xl p-4 text-center hover:border-emerald-600 focus:outline-none transition-all hover:scale-[1.02] cursor-pointer group flex flex-col justify-between"
                >
                  <div>
                    <span className="text-[8.5px] font-extrabold bg-[#10b981]/15 text-[#10b981] px-2 py-0.5 rounded-full">HEMAT 50%</span>
                    <h5 className="font-black text-xs text-slate-200 mt-2 group-hover:text-amber-300">Setahun Hemat</h5>
                    <p className="text-[9px] text-slate-400 mt-1">Konsisten Kuasai Sharaf</p>
                  </div>
                  <div className="mt-4">
                    <div className="text-[10px] text-slate-500 line-through text-center">Rp 60.000</div>
                    <div className="font-extrabold text-sm text-emerald-450 text-center">Rp 29.000</div>
                  </div>
                </button>
              </div>
            </div>

            {/* Payment Message Indicator */}
            {isPaymentLoading && (
              <div className="bg-slate-900 border border-emerald-800/45 rounded-xl p-3 text-center space-y-2 animate-pulse">
                <span className="text-[10px] font-mono text-amber-300 flex items-center justify-center gap-1.5 font-bold">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
                  {paymentMessage || "Memproses integrasi Midtrans..."}
                </span>
              </div>
            )}

            {/* Manual Activation Code */}
            <div className="space-y-2 pt-2 border-t border-emerald-800/40">
              <label className="block text-[10px] font-extrabold text-[#10b981] uppercase tracking-wider">Sudah Punya Kode Lisensi manual?</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Contoh: BISMILLAH / PREMIUM"
                  disabled={isPaymentLoading}
                  value={activationCode}
                  onChange={(e) => {
                    setActivationCode(e.target.value);
                    setActivationError("");
                  }}
                  className="flex-1 bg-slate-950 border border-emerald-800/30 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500 disabled:opacity-50"
                />
                <button
                  type="button"
                  disabled={isPaymentLoading || !activationCode.trim()}
                  onClick={() => handleSavePremium(true)}
                  className="px-4 py-2 bg-amber-550 hover:bg-amber-650 disabled:opacity-50 hover:scale-[1.02] text-slate-950 font-black text-xs rounded-xl cursor-pointer transition-all whitespace-nowrap"
                >
                  Aktifkan Kode
                </button>
              </div>
              {activationError && (
                <p className="text-[10px] text-rose-400 font-semibold">{activationError}</p>
              )}
              <div className="text-[9px] text-slate-400 leading-tight">
                * Gunakan kode pancingan <strong className="text-amber-400 font-bold select-all">BISMILLAH</strong> atau <strong className="text-amber-400 font-bold select-all">PREMIUM</strong> untuk melakukan aktivasi langsung secara gratis dalam mode uji coba ini.
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SETTINGS MODAL */}
      {showSettingsModal && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md z-55 flex items-center justify-center p-4">
          <div className="bg-[#05291d] border-2 border-amber-500/40 rounded-3xl w-full max-w-md p-6 shadow-2xl relative space-y-5 text-slate-100 select-none animate-fade-in">
            {/* Ambient gold glow */}
            <div className="absolute right-0 top-0 w-32 h-32 bg-amber-500/5 rounded-full blur-2xl pointer-events-none" />

            {/* Header */}
            <div className="flex items-center justify-between border-b border-emerald-800/40 pb-3">
              <div className="flex items-center gap-2">
                <Settings className="w-5 h-5 text-amber-500 animate-spin-slow" />
                <div>
                  <h3 className="font-extrabold text-sm text-white tracking-tight">Pengaturan Aplikasi</h3>
                  <p className="text-[10px] text-slate-400 font-mono">Personalisasi Tampilan &amp; Layout Shorof</p>
                </div>
              </div>
              <button
                onClick={() => setShowSettingsModal(false)}
                className="p-1 rounded-full text-slate-400 hover:text-white hover:bg-emerald-950/50 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Options Body */}
            <div className="space-y-4 text-xs">
              {/* Option 1: Username */}
              <div className="space-y-1.5">
                <label className="block text-[10px] font-extrabold text-[#10b981] uppercase tracking-wider">Nama Pengguna</label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => updateUsername(e.target.value)}
                  placeholder="Masukkan Nama Anda"
                  className="w-full px-3.5 py-2.5 border border-emerald-800/30 rounded-xl text-xs bg-slate-950 text-slate-250 focus:border-amber-500 focus:outline-none transition-all"
                />
              </div>

              {/* Option 2: App Theme */}
              <div className="space-y-1.5">
                <label className="block text-[10px] font-extrabold text-[#10b981] uppercase tracking-wider">Pilihan Tema Aplikasi</label>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    onClick={() => updateAppTheme("dark")}
                    className={`py-2 px-2.5 rounded-xl border text-center font-bold text-[10.5px] transition-all cursor-pointer ${
                      appTheme === "dark"
                        ? "bg-amber-500 border-amber-500 text-slate-950 shadow-md shadow-amber-550/10"
                        : "bg-slate-950/80 border-slate-800 text-slate-355 hover:bg-slate-900"
                    }`}
                  >
                    🌌 Gelap (Cosmic)
                  </button>
                  <button
                    onClick={() => updateAppTheme("light")}
                    className={`py-2 px-2.5 rounded-xl border text-center font-bold text-[10.5px] transition-all cursor-pointer ${
                      appTheme === "light"
                        ? "bg-[#10b981] border-[#10b981] text-white shadow-md shadow-emerald-500/10"
                        : "bg-slate-950/80 border-slate-800 text-slate-355 hover:bg-slate-900"
                    }`}
                  >
                    ☀️ Cerah (Light)
                  </button>
                  <button
                    onClick={() => updateAppTheme("green")}
                    className={`py-2 px-2.5 rounded-xl border text-center font-bold text-[10.5px] transition-all cursor-pointer ${
                      appTheme === "green"
                        ? "bg-amber-500 border-amber-500 text-slate-950 shadow-md shadow-amber-550/10"
                        : "bg-slate-950/80 border-slate-800 text-slate-355 hover:bg-slate-900"
                    }`}
                  >
                    🕌 Syari (Green)
                  </button>
                </div>
              </div>

              {/* Option 3: Lafadz FontSize */}
              <div className="space-y-1.5">
                <label className="block text-[10px] font-extrabold text-[#10b981] uppercase tracking-wider">Ukuran Tulisan Arab (Lafadz)</label>
                <div className="grid grid-cols-4 gap-1.5">
                  {(["small", "medium", "large", "xlarge"] as const).map((sz) => (
                    <button
                      key={sz}
                      onClick={() => updateLafadzSize(sz)}
                      className={`py-2 px-1 rounded-lg border text-center font-bold text-[9px] uppercase transition-all cursor-pointer ${
                        lafadzSize === sz
                          ? "bg-amber-500 border-amber-500 text-slate-950 shadow-md shadow-amber-500/10"
                          : "bg-slate-950/80 border-slate-800 text-slate-355 hover:bg-slate-900"
                      }`}
                    >
                      {sz === "small" && "Kecil"}
                      {sz === "medium" && "Sedang"}
                      {sz === "large" && "Besar"}
                      {sz === "xlarge" && "Sangat Besar"}
                    </button>
                  ))}
                </div>
              </div>

              {/* Option 4: Slide or Scroll Layout Mode */}
              <div className="space-y-1.5">
                <label className="block text-[10px] font-extrabold text-[#10b981] uppercase tracking-wider">Mode Penelusuran Layar</label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => updateLayoutMode("scroll")}
                    className={`py-2 px-2.5 rounded-xl border text-center font-bold text-[10.5px] transition-all cursor-pointer ${
                      layoutMode === "scroll"
                        ? "bg-amber-500 border-amber-500 text-slate-950 shadow-md shadow-amber-550/10"
                        : "bg-slate-950/80 border-slate-800 text-slate-355 hover:bg-slate-900"
                    }`}
                  >
                    📜 Scroll Panjang
                  </button>
                  <button
                    onClick={() => updateLayoutMode("slide")}
                    className={`py-2 px-2.5 rounded-xl border text-center font-bold text-[10.5px] transition-all cursor-pointer ${
                      layoutMode === "slide"
                        ? "bg-amber-500 border-amber-500 text-slate-950 shadow-md shadow-amber-550/10"
                        : "bg-slate-950/80 border-slate-800 text-slate-355 hover:bg-slate-900"
                    }`}
                  >
                    ↔️ Slide per Bab
                  </button>
                </div>
              </div>

              {/* Premium status option removed */}
            </div>

            {/* Footer */}
            <div className="pt-3 border-t border-emerald-800/40">
              <button
                onClick={() => setShowSettingsModal(false)}
                className="w-full py-2.5 bg-gradient-to-r from-teal-700 to-emerald-600 hover:from-teal-650 hover:to-emerald-555 text-white font-black text-xs rounded-xl transition-all shadow-md cursor-pointer text-center"
              >
                Simpan &amp; Tutup Pengaturan
              </button>
            </div>
          </div>
        </div>
      )}

      {/* EDIT PROFILE MODAL */}
      {showEditProfileModal && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md z-55 flex items-center justify-center p-4">
          <div className="bg-[#05291d] border-2 border-amber-500/40 rounded-3xl w-full max-w-sm p-6 shadow-2xl relative space-y-5 text-slate-100 select-none animate-fade-in">
            {/* Ambient gold glow */}
            <div className="absolute right-0 top-0 w-24 h-24 bg-amber-500/5 rounded-full blur-xl pointer-events-none" />

            {/* Header */}
            <div className="flex items-center justify-between border-b border-emerald-800/40 pb-3">
              <div className="flex items-center gap-2">
                <User className="w-5 h-5 text-amber-500" />
                <div>
                  <h3 className="font-extrabold text-sm text-white tracking-tight">Edit Profil</h3>
                  <p className="text-[10px] text-slate-400 font-mono">Ubah Nama &amp; Foto Profil Anda</p>
                </div>
              </div>
              <button
                onClick={() => setShowEditProfileModal(false)}
                className="p-1 rounded-full text-slate-400 hover:text-white hover:bg-emerald-950/50 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Body */}
            <div className="space-y-4 text-xs">
              {/* Edit Username */}
              <div className="space-y-1.5">
                <label className="block text-[10px] font-extrabold text-[#10b981] uppercase tracking-wider">Nama Pengguna</label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => updateUsername(e.target.value)}
                  placeholder="Masukkan Nama Baru..."
                  className="w-full px-3 py-2 border border-emerald-800/30 rounded-xl text-xs bg-slate-950 text-slate-200 focus:border-amber-500 focus:outline-none transition-all font-bold tracking-wide"
                />
              </div>

              {/* Edit Photo / Select Preset Avatars */}
              <div className="space-y-2">
                <label className="block text-[10px] font-extrabold text-[#10b981] uppercase tracking-wider">Foto Profil (Pilih Preset)</label>
                <div className="grid grid-cols-6 gap-2">
                  {(["avatar1", "avatar2", "avatar3", "avatar4", "avatar5", "avatar6"] as const).map((avatarId) => (
                    <button
                      key={avatarId}
                      onClick={() => updateProfilePhoto(avatarId)}
                      className={`relative rounded-full p-0.5 border-2 transition-all hover:scale-110 active:scale-95 ${
                        profilePhoto === avatarId ? "border-amber-500" : "border-transparent"
                      }`}
                    >
                      {renderProfileImage(avatarId, "w-8 h-8 sm:w-9 sm:h-9")}
                      {profilePhoto === avatarId && (
                        <span className="absolute -top-1 -right-1 bg-amber-500 text-slate-950 rounded-full p-0.5 border border-slate-900 scale-75">
                          <Check className="w-2 h-2 stroke-[3]" />
                        </span>
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* File Upload Custom Photo */}
              <div className="space-y-2 pt-2 border-t border-emerald-800/30">
                <label className="block text-[10px] font-extrabold text-[#10b981] uppercase tracking-wider">Unggah Foto Sendiri</label>
                <div className="relative">
                  <label className="flex items-center justify-center gap-2 border border-dashed border-emerald-800/40 rounded-xl p-3 bg-slate-950/40 hover:bg-slate-950/80 cursor-pointer hover:border-amber-500/50 transition-all text-[11px] font-semibold text-slate-300">
                    <Upload className="w-4 h-4 text-amber-500 hover:text-white" />
                    <span>Upload file gambar...</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                  </label>
                </div>
                {profilePhoto.startsWith("data:image") && (
                  <div className="flex items-center gap-2 bg-slate-950/40 p-2 rounded-xl border border-emerald-800/20">
                    {renderProfileImage(profilePhoto, "w-8 h-8")}
                    <div className="min-w-0 flex-1">
                      <p className="text-[9px] text-slate-400 truncate font-semibold">Foto custom aktif</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => updateProfilePhoto("avatar1")}
                      className="text-[9.5px] font-extrabold text-rose-400 hover:text-rose-300 px-1.5 py-0.5 rounded hover:bg-rose-950/30 transition-colors"
                    >
                      Reset Preset
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Footer */}
            <div className="pt-2 border-t border-emerald-800/40 flex gap-2">
              <button
                onClick={() => setShowEditProfileModal(false)}
                className="flex-1 py-2 bg-gradient-to-r from-teal-700 to-emerald-600 hover:from-teal-650 hover:to-emerald-555 text-white font-black text-xs rounded-xl transition-all shadow-md cursor-pointer text-center"
              >
                Simpan &amp; Tutup
              </button>
            </div>
          </div>
        </div>
      )}

      {/* TASRIF ISTILAHI MODAL POP-UP */}
      {showIstilahiModal && (
        <div className="fixed inset-0 bg-slate-950/90 backdrop-blur-md z-50 flex flex-col p-4 animate-fade-in overflow-y-auto">
          <div className="absolute inset-0" onClick={() => setShowIstilahiModal(false)} />
          <div className={`w-full max-w-5xl mx-auto rounded-3xl p-6 shadow-2xl relative flex flex-col my-auto border-2 ${
            appTheme === 'light' 
              ? 'bg-white border-emerald-500/20 text-slate-900' 
              : 'bg-[#04291c] border-amber-500/40 text-slate-100'
          }`}>
            {/* Header */}
            <div className="flex items-center justify-between border-b border-emerald-800/40 pb-4 mb-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-amber-500/10 text-amber-500 rounded-xl border border-amber-500/20">
                  <Layers className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-extrabold text-sm md:text-base text-white tracking-tight">Tasrif Istilahi (Pola Shighot)</h3>
                  <p className="text-[10px] text-slate-400 font-mono">Pola Perubahan Kata Kerja &amp; Isim</p>
                </div>
              </div>
              <button
                onClick={() => setShowIstilahiModal(false)}
                className="p-1.5 rounded-full text-slate-400 hover:text-white hover:bg-emerald-950/50 transition-all cursor-pointer border border-emerald-800/20"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content */}
            <div className="overflow-y-auto max-h-[70vh] pr-1">
              <TasrifIstilahiView 
                tasrif={calculatedTasrif} 
                fa={activeWazanData.fa}
                ain={activeWazanData.ain}
                lam={activeWazanData.lam}
                shorof={selectedEntry.shorof}
                onShowWordInfo={(word, shighot) => setSelectedWordInfo({ word, shighot })}
                lafadzSize={lafadzSize}
                layoutMode={layoutMode}
              />
            </div>

            {/* Footer */}
            <div className="pt-4 mt-2 border-t border-emerald-800/40 flex justify-end gap-2">
              <button
                onClick={() => setShowIstilahiModal(false)}
                className="px-5 py-2 bg-gradient-to-r from-teal-700 to-emerald-600 hover:from-teal-650 hover:to-emerald-555 text-white font-black text-xs rounded-xl transition-all shadow-md cursor-pointer"
              >
                Tutup Layar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* TASRIF LUGHOWI MODAL POP-UP */}
      {showLughowiModal && (
        <div className="fixed inset-0 bg-slate-950/90 backdrop-blur-md z-50 flex flex-col p-4 animate-fade-in overflow-y-auto">
          <div className="absolute inset-0" onClick={() => setShowLughowiModal(false)} />
          <div className={`w-full max-w-5xl mx-auto rounded-3xl p-6 shadow-2xl relative flex flex-col my-auto border-2 ${
            appTheme === 'light' 
              ? 'bg-white border-emerald-500/20 text-slate-900' 
              : 'bg-[#04291c] border-amber-500/40 text-slate-100'
          }`}>
            {/* Header */}
            <div className="flex items-center justify-between border-b border-emerald-800/40 pb-4 mb-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-amber-500/10 text-amber-500 rounded-xl border border-amber-500/20">
                  <Table className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-extrabold text-sm md:text-base text-white tracking-tight">Tasrif Lughowi (Tabel Dhomir)</h3>
                  <p className="text-[10px] text-slate-400 font-mono">Tabel Konjugasi Dengan 14 Kata Ganti</p>
                </div>
              </div>
              <button
                onClick={() => setShowLughowiModal(false)}
                className="p-1.5 rounded-full text-slate-400 hover:text-white hover:bg-emerald-950/50 transition-all cursor-pointer border border-emerald-800/20"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content */}
            <div className="overflow-y-auto max-h-[70vh] pr-1">
              <TasrifLughowiView
                tasrif={calculatedTasrif}
                fa={activeWazanData.fa}
                ain={activeWazanData.ain}
                lam={activeWazanData.lam}
                bina={activeBina}
                babNum={activeBabNum}
                isPremium={isPremium}
                onUnlock={() => setShowPremiumModal(true)}
                onShowWordInfo={(word, shighot) => setSelectedWordInfo({ word, shighot })}
                lafadzSize={lafadzSize}
              />
            </div>

            {/* Footer */}
            <div className="pt-4 mt-2 border-t border-emerald-800/40 flex justify-end gap-2">
              <button
                onClick={() => setShowLughowiModal(false)}
                className="px-5 py-2 bg-gradient-to-r from-teal-700 to-emerald-600 hover:from-teal-650 hover:to-emerald-555 text-white font-black text-xs rounded-xl transition-all shadow-md cursor-pointer"
              >
                Tutup Layar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MASDAR TABLE MODAL POP-UP */}
      {showMasdarModal && (
        <div className="fixed inset-0 bg-slate-950/90 backdrop-blur-md z-50 flex flex-col p-4 animate-fade-in overflow-y-auto">
          <div className="absolute inset-0" onClick={() => setShowMasdarModal(false)} />
          <div className={`w-full max-w-5xl mx-auto rounded-3xl p-6 shadow-2xl relative flex flex-col my-auto border-2 ${
            appTheme === 'light' 
              ? 'bg-white border-emerald-500/20 text-slate-900' 
              : 'bg-[#04291c] border-amber-500/40 text-slate-100'
          }`}>
            {/* Header */}
            <div className="flex items-center justify-between border-b border-emerald-800/40 pb-4 mb-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-amber-500/10 text-amber-500 rounded-xl border border-amber-500/20">
                  <Table className="w-5 h-5 animate-pulse" />
                </div>
                <div>
                  <h3 className="font-extrabold text-sm md:text-base text-white tracking-tight">Tabel Komparasi Masdar</h3>
                  <p className="text-[10px] text-slate-400 font-mono">Sama'i, Qiyasi, Marrah &amp; Nau'</p>
                </div>
              </div>
              <button
                onClick={() => setShowMasdarModal(false)}
                className="p-1.5 rounded-full text-slate-400 hover:text-white hover:bg-emerald-950/50 transition-all cursor-pointer border border-emerald-800/20"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content */}
            <div className="overflow-y-auto max-h-[70vh] pr-1">
              {isMasdarLocked ? (
                <div className="p-6 text-center space-y-4">
                  <div className="w-12 h-12 bg-amber-500/10 text-amber-500 rounded-full flex items-center justify-center mx-auto border border-amber-500/20">
                    <Lock className="w-5 h-5 animate-pulse" />
                  </div>
                  <div className="max-w-md mx-auto space-y-1.5">
                    <h4 className="font-black text-white text-sm">Masdar Premium Terkunci</h4>
                    <p className="text-[11px] text-slate-450 leading-relaxed font-sans">
                      Akses tabel komparasi lengkap dilindungi oleh lisensi premium untuk luhuro/bina selain shohih.
                    </p>
                  </div>
                </div>
              ) : (
                <div className="space-y-6">
                  <ShorofMasdarTableView
                    entries={relatedMasdarEntries}
                    activeEntryId={selectedEntry.id}
                    onSelectEntry={handleSelectPreset}
                    isPremium={isPremium}
                    onUnlock={() => setShowPremiumModal(true)}
                    lafadzSize={lafadzSize}
                    appTheme={appTheme}
                  />

                  {/* ANALISIS JAMAK TAKSIR DI BAWAH MASDAR */}
                  <div className="pt-6 border-t border-emerald-800/40 space-y-3">
                    <div className="flex items-center gap-2">
                      <div className="p-1.5 bg-amber-500/10 text-amber-500 rounded-lg border border-amber-500/15">
                        <Sparkles className="w-4 h-4 animate-bounce" />
                      </div>
                      <div>
                        <h4 className="text-white font-extrabold text-xs md:text-sm tracking-tight uppercase font-mono">
                          Analisis Jamak Taksir (Katsroh, Qillah &amp; Muntahal) Lafadz Terpilih
                        </h4>
                        <p className="text-[10px] text-slate-400">
                          Analisis jamak taksir untuk membandingkan secara langsung dengan masdar di atas.
                        </p>
                      </div>
                    </div>
                    {renderJamakAnalysisUI()}
                  </div>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="pt-4 mt-2 border-t border-emerald-800/40 flex justify-end gap-2">
              <button
                onClick={() => setShowMasdarModal(false)}
                className="px-5 py-2 bg-gradient-to-r from-teal-700 to-emerald-600 hover:from-teal-650 hover:to-emerald-555 text-white font-black text-xs rounded-xl transition-all shadow-md cursor-pointer"
              >
                Tutup Layar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* JAMAK TAKSIR MODAL POP-UP */}
      {showJamakModal && (
        <div className="fixed inset-0 bg-slate-950/90 backdrop-blur-md z-50 flex flex-col p-4 animate-fade-in overflow-y-auto">
          <div className="absolute inset-0" onClick={() => setShowJamakModal(false)} />
          <div className={`w-full max-w-5xl mx-auto rounded-3xl p-6 shadow-2xl relative flex flex-col my-auto border-2 ${
            appTheme === 'light' 
              ? 'bg-white border-emerald-500/20 text-slate-900' 
              : 'bg-[#04291c] border-amber-500/40 text-slate-100'
          }`}>
            {/* Header */}
            <div className="flex items-center justify-between border-b border-emerald-800/40 pb-4 mb-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-indigo-500/10 text-indigo-400 rounded-xl border border-indigo-500/20">
                  <Sparkles className="w-5 h-5 animate-spin-slow" />
                </div>
                <div>
                  <h3 className="font-extrabold text-sm md:text-base text-white tracking-tight">Analisis Jamak Taksir Katsroh &amp; Qillah</h3>
                  <p className="text-[10px] text-slate-400 font-mono">Formulasi Perubahan Jamak Komparatif</p>
                </div>
              </div>
              <button
                onClick={() => setShowJamakModal(false)}
                className="p-1.5 rounded-full text-slate-400 hover:text-white hover:bg-emerald-950/50 transition-all cursor-pointer border border-emerald-800/20"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content */}
            <div className="overflow-y-auto max-h-[70vh] pr-1 space-y-6">
              {renderJamakAnalysisUI()}
            </div>

            {/* Footer */}
            <div className="pt-4 mt-2 border-t border-emerald-800/40 flex justify-end gap-2">
              <button
                onClick={() => setShowJamakModal(false)}
                className="px-5 py-2 bg-gradient-to-r from-teal-700 to-emerald-600 hover:from-teal-650 hover:to-emerald-555 text-white font-black text-xs rounded-xl transition-all shadow-md cursor-pointer"
              >
                Tutup Layar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MOBILE & DESKTOP SIDEBAR/DRAWER OVERLAY */}
      {isMobileSidebarOpen && (
        <div className="fixed inset-0 bg-slate-950/85 backdrop-blur-md z-50 flex justify-start animate-fade-in text-slate-100 select-none">
          {/* Backdrop click to close */}
          <div className="absolute inset-0" onClick={() => setIsMobileSidebarOpen(false)} />
          
          <div className="bg-[#021f14] border-r-2 border-amber-500/40 w-[340px] h-full p-5 overflow-y-auto space-y-5 relative z-10 shadow-2xl flex flex-col justify-between">
            <div className="space-y-5 flex-1 pr-1">
              {/* Header inside drawer */}
              <div className="flex items-center justify-between border-b border-emerald-800/40 pb-3">
                <div className="flex items-center gap-2">
                  <Menu className="w-5 h-5 text-amber-400 animate-pulse" />
                  <div>
                    <h3 className="font-extrabold text-sm text-white tracking-tight">Menu Utama &amp; Pengaturan</h3>
                    <p className="text-[10px] text-slate-400 font-mono">Kontrol Profil, Tema &amp; Lafadz</p>
                  </div>
                </div>
                <button
                  onClick={() => setIsMobileSidebarOpen(false)}
                  className="p-1.5 bg-slate-900 border border-slate-800 hover:text-white rounded-lg transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Contents in mobile menu */}
              <div className="space-y-4">
                
                {/* 1. Account Profile Info with Editable Username */}
                <div className="rounded-xl border p-3 relative overflow-hidden bg-[#031d13]/90 border-amber-500/25">
                  <div className="flex items-center gap-2 border-b border-emerald-800/40 pb-2 mb-2">
                    <User className="w-3.5 h-3.5 text-amber-400" />
                    <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400">Profil &amp; Akun</span>
                  </div>
                  
                  <div className="space-y-2">
                    <div>
                      <label className="text-[9px] uppercase tracking-wide text-amber-300 block font-bold mb-1">Nama Pengguna</label>
                      <input
                        type="text"
                        value={username}
                        onChange={(e) => updateUsername(e.target.value)}
                        className="w-full bg-[#021d12] border border-emerald-800/60 rounded px-2.5 py-1 text-xs text-white font-bold tracking-wide focus:outline-none focus:border-amber-500"
                        placeholder="Masukkan nama pengguna..."
                      />
                    </div>
                    {/* Premium references removed */}
                  </div>
                </div>

                {/* Link to Settings Master */}
                <button
                  type="button"
                  onClick={() => {
                    setIsMobileSidebarOpen(false);
                    setShowSettingsModal(true);
                  }}
                  className="w-full py-2.5 bg-gradient-to-r from-amber-450 via-yellow-400 to-[#eab308] hover:from-amber-400 hover:to-yellow-350 text-slate-950 font-extrabold text-xs rounded-xl flex items-center justify-center gap-2 cursor-pointer transition-all active:scale-[0.98]"
                >
                  <Settings className="w-4 h-4 animate-spin-slow text-slate-950 shrink-0" />
                  <span>BUKA PENGATURAN LENGKAP</span>
                </button>

                {/* 3. Preset Dictionary List */}
                <DictionaryList
                  selectedEntryId={selectedEntry.id}
                  onSelectEntry={(entry) => {
                    handleSelectPreset(entry);
                    setIsMobileSidebarOpen(false);
                  }}
                  onOpenMenu={() => setIsMobileSidebarOpen(true)}
                  appTheme={appTheme}
                />
              </div>
            </div>

            <div className="pt-3 border-t border-emerald-800/40">
              <button
                onClick={() => setIsMobileSidebarOpen(false)}
                className="w-full py-2 bg-gradient-to-r from-teal-700 to-emerald-600 text-white font-black text-xs rounded-xl"
              >
                Tutup Menu
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
