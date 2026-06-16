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
  CreditCard,
  QrCode,
  Smartphone,
  Upload,
  Check,
  FileText,
  User,
  Phone,
  ArrowRight
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

  // Premium States (Locked without trial)
  const [isPremium, setIsPremium] = useState<boolean>(false);
  
  // Clear any existing trial premium state on initial boot to ensure features start locked
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("sdr_premium_unlocked");
    }
  }, []);
  const [showPremiumModal, setShowPremiumModal] = useState<boolean>(false);
  const [activationCode, setActivationCode] = useState("");
  const [activationError, setActivationError] = useState("");
  const [isPaymentLoading, setIsPaymentLoading] = useState(false);
  const [paymentMessage, setPaymentMessage] = useState("");

  // States for manual payment & trial trial simulation
  const [paymentMethod, setPaymentMethod] = useState<"midtrans" | "manual">("midtrans");
  const [manualSenderName, setManualSenderName] = useState("");
  const [manualPhone, setManualPhone] = useState("");
  const [manualSelectedPackage, setManualSelectedPackage] = useState<"trial" | "3months" | "1year">("trial");
  const [manualSelectedBank, setManualSelectedBank] = useState("BSI");
  const [manualProofFileName, setManualProofFileName] = useState("");
  const [isManualSubmitting, setIsManualSubmitting] = useState(false);

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

  const handleManualPaymentConfirm = (e: React.FormEvent) => {
    e.preventDefault();
    if (!manualSenderName.trim()) {
      alert("Mohon masukkan nama pengirim transfer.");
      return;
    }
    if (!manualPhone.trim()) {
      alert("Mohon masukkan nomor WhatsApp untuk koordinasi.");
      return;
    }
    if (!manualProofFileName) {
      alert("Mohon unggah bukti transfer / screenshot transaksi terlebih dahulu.");
      return;
    }

    setIsManualSubmitting(true);
    setTimeout(() => {
      setIsManualSubmitting(false);
      setIsPremium(true);
      localStorage.setItem("sdr_premium_unlocked", "true");
      setShowPremiumModal(false);
      // Reset values
      setManualSenderName("");
      setManualPhone("");
      setManualProofFileName("");
      alert("Aktivasi Sukses via Pembayaran Manual!\n\nTim admin kami telah memproses transaksi Anda secara instan. Selamat menikmati fitur Premium!");
    }, 1800);
  };

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

  const isMasdarLocked = !isPremium && !isShohihOrMahmuz;

  const activeTranslation = useMemo(() => {
    return selectedEntry.translation;
  }, [selectedEntry]);

  const activeBabNum = useMemo(() => {
    return selectedEntry.babNum;
  }, [selectedEntry]);

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#022317] via-[#052c1e] to-[#041a12] pb-12 font-sans selection:bg-emerald-500 selection:text-white">
      {/* HEADER SECTION / DIGNIFIED COMPACT GOLDEN BANNER */}
      <header className="bg-[#031d13]/90 backdrop-blur-md border-b-2 border-amber-500/25 sticky top-0 z-40 shadow-md relative overflow-hidden backdrop-saturate-150 py-2.5">
        {/* Subtle decorative geometric overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-amber-500/5 via-teal-950/20 to-transparent pointer-events-none" />
        <div className="absolute right-0 top-0 w-64 h-64 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3 relative z-10">
          <div className="flex items-center gap-4 text-center sm:text-left flex-col sm:flex-row">
            {/* Calligraphic Embossed Floating Text (Khot Thuluts - Golden & Floating) */}
            <div className="flex flex-col items-center sm:items-start select-none">
              <span className="font-thuluth text-xl sm:text-2.5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-350 to-amber-500 tracking-wide inline-block animate-floating-gold leading-tight">
                صرف الاصطلاحي واللغوي
              </span>
              <div className="flex items-center justify-center sm:justify-start gap-1.5 mt-0.5">
                <h1 className="font-extrabold text-slate-100 text-xs sm:text-sm tracking-normal">
                  Shorof Digital Pro
                </h1>
                <span className="text-[8px] bg-amber-500/10 text-amber-300 font-extrabold px-1.5 py-0.2 rounded border border-amber-500/20 tracking-wider">
                  PRO
                </span>
                <span className="text-[8px] bg-teal-500/10 text-teal-300 font-bold px-1.5 py-0.2 rounded border border-teal-500/20 whitespace-nowrap">
                  Update 14 Lafadz/Minggu
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3 self-center sm:self-auto text-xs">
            <div className="text-right hidden md:block">
              <span className="text-[9px] text-amber-500/80 block font-semibold uppercase tracking-wider leading-none mb-0.5">
                ENGINE STATUS
              </span>
              <span className="text-[11px] text-slate-200 font-bold whitespace-nowrap flex items-center gap-1.5 justify-end">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                IilalEngine Pro v2.0
              </span>
            </div>
            {isPremium ? (
              <button
                onClick={() => {
                  setIsPremium(false);
                  localStorage.removeItem("sdr_premium_unlocked");
                  alert("Fitur Premium berhasil dikunci kembali!");
                }}
                className="bg-amber-500/10 hover:bg-amber-500/20 text-amber-450 border border-amber-500/20 text-[10px] font-black px-2.5 py-1 rounded-lg flex items-center gap-1.5 shadow-xs animate-fade-in cursor-pointer transition-all"
                title="Klik untuk mengunci kembali seluruh fitur premium"
              >
                <Sparkles className="w-3 h-3 text-amber-400" />
                <span>Premium Unlocked (Klik utk Kunci)</span>
              </button>
            ) : (
              <button
                onClick={() => setShowPremiumModal(true)}
                className="bg-slate-800 hover:bg-slate-750 text-slate-350 border border-slate-700 text-[10px] font-black px-2.5 py-1 rounded-lg flex items-center gap-1.5 shadow-xs animate-fade-in cursor-pointer transition-all"
                title="Klik untuk membuka kunci fitur premium"
              >
                <Lock className="w-3 h-3 text-gray-400" />
                <span>Premium Locked (Klik utk Unlock)</span>
              </button>
            )}
          </div>
        </div>
      </header>



      {/* WORKSPACE LAYOUT */}
      <main className="max-w-7xl mx-auto px-4 mt-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* LEFT COLUMN: CONTROLLERS (4/12 width) */}
          <section className="lg:col-span-4 space-y-6">
            
            <DictionaryList
              selectedEntryId={selectedEntry.id}
              onSelectEntry={handleSelectPreset}
            />

          </section>

          {/* RIGHT COLUMN: MAIN TASRIF WORKSPACE (8/12 width) */}
          <section className="lg:col-span-8 space-y-6">
            
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
            <div className="bg-white rounded-xl border border-gray-150 p-1 flex shadow-3xs">
              <button
                onClick={() => setWorkspaceSection("shorof")}
                className={`flex-1 py-3 text-xs font-black rounded-lg transition-all flex items-center justify-center gap-2 cursor-pointer ${
                  workspaceSection === "shorof"
                    ? "bg-slate-900 text-white shadow-xs animate-fade-in"
                    : "text-gray-400 hover:text-gray-800 hover:bg-gray-50"
                }`}
              >
                <Layers className="w-4 h-4" />
                <span>Tasrif Sharaf &amp; Masdar</span>
              </button>
              <button
                onClick={() => setWorkspaceSection("jamak")}
                className={`flex-1 py-3 text-xs font-black rounded-lg transition-all flex items-center justify-center gap-2 cursor-pointer ${
                  workspaceSection === "jamak"
                    ? "bg-slate-900 text-white shadow-xs animate-fade-in"
                    : "text-gray-400 hover:text-gray-800 hover:bg-gray-50"
                }`}
              >
                <Sparkles className="w-4 h-4 text-emerald-500 animate-pulse" />
                <span>Analisis Jamak Taksir &amp; Qillah</span>
              </button>
            </div>

            {/* RENDER DYNAMIC SEGMENTS BASED ON SECTION */}
            {workspaceSection === "shorof" ? (
              <div className="space-y-6">
                {/* TAB SELECTORS BAR */}
                <div className="border-b border-gray-200 flex flex-nowrap items-center overflow-x-auto gap-4 scrollbar-hidden">
                  <button
                    onClick={() => setActiveTab("istilahi")}
                    className={`py-3 px-1 border-b-2 font-bold text-xs md:text-sm whitespace-nowrap transition-all flex items-center gap-1.5 cursor-pointer ${
                      activeTab === "istilahi"
                        ? "border-emerald-600 text-emerald-950 scale-[1.01]"
                        : "border-transparent text-gray-400 hover:text-gray-800"
                    }`}
                  >
                    <Layers className="w-4 h-4" />
                    Tasrif Istilahi (Pola Shighot)
                  </button>

                  <button
                    onClick={() => setActiveTab("lughowi")}
                    className={`py-3 px-1 border-b-2 font-bold text-xs md:text-sm whitespace-nowrap transition-all flex items-center gap-1.5 cursor-pointer ${
                      activeTab === "lughowi"
                        ? "border-emerald-600 text-emerald-950 scale-[1.01]"
                        : "border-transparent text-gray-400 hover:text-gray-800"
                    }`}
                  >
                    <Table className="w-4 h-4" />
                    Tasrif Lughowi (Tabel Dhomir)
                  </button>
                </div>

                {/* TAB CONTENT RENDER CONTAINER */}
                <div className="py-2 pb-6">
                  {activeTab === "istilahi" && (
                    <TasrifIstilahiView 
                      tasrif={calculatedTasrif} 
                      fa={activeWazanData.fa}
                      ain={activeWazanData.ain}
                      lam={activeWazanData.lam}
                      shorof={selectedEntry.shorof}
                      onShowWordInfo={(word, shighot) => setSelectedWordInfo({ word, shighot })}
                    />
                  )}
                  {activeTab === "lughowi" && (
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
                    />
                  )}
                </div>

                {/* COMPREHENSIVE 6-COLUMN MASDAR COMPARISON TABLE SECTION */}
                {isMasdarLocked ? (
                  <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-3xs space-y-4">
                    <div className="flex items-center gap-2 border-b border-gray-100 pb-3">
                      <div className="p-2 bg-emerald-50 text-emerald-700 rounded-xl">
                        <Table className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="text-sm md:text-md font-extrabold text-gray-900 tracking-tight">
                          Tabel Komparasi Masdar (Sama'i, Qiyasi, Marrah &amp; Nau')
                        </h3>
                        <p className="text-[10px] md:text-xs text-gray-400">
                          Daftar komparatif akar kata beserta masdar khusus.
                        </p>
                      </div>
                    </div>
                    {renderPremiumLockCard(
                      "Tabel Komparasi Masdar Premium",
                      "Tabel komparasi 6-kolom Masdar Sama'i, Qiyasi, Marrah, dan Nau' dilindungi di bawah lisensi premium untuk Bina' selain Shohih dan Mahmuz."
                    )}
                  </div>
                ) : (
                  <ShorofMasdarTableView
                    entries={relatedMasdarEntries}
                    activeEntryId={selectedEntry.id}
                    onSelectEntry={handleSelectPreset}
                    isPremium={isPremium}
                    onUnlock={() => setShowPremiumModal(true)}
                  />
                )}
              </div>
            ) : (
              <div className="space-y-6">
                
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
                  if (!isPremium && !isShohihOrMahmuz) {
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
                            <Lock className="w-2.5 h-2.5" />
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
                            <Lock className="w-2.5 h-2.5" />
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
                            <Lock className="w-2.5 h-2.5" />
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
                  if (!isPremium && !isShohihOrMahmuz) {
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
                            <Lock className="w-2.5 h-2.5" />
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
                            <Lock className="w-2.5 h-2.5" />
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
                            <Lock className="w-2.5 h-2.5" />
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
                            <Lock className="w-2.5 h-2.5" />
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
                            <Lock className="w-2.5 h-2.5" />
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
                            <Lock className="w-2.5 h-2.5" />
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
                            <Lock className="w-2.5 h-2.5" />
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
                            <Lock className="w-2.5 h-2.5" />
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
                            <Lock className="w-2.5 h-2.5" />
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
                  if (!isPremium && !isShohihOrMahmuz) {
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
                            <Lock className="w-2.5 h-2.5" />
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
                            <Lock className="w-2.5 h-2.5" />
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
                            <Lock className="w-2.5 h-2.5" />
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
        <div className="fixed inset-0 bg-[#02110e]/90 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="bg-[#05291d] border-2 border-amber-500/40 rounded-3xl w-full max-w-lg p-6 shadow-2xl shadow-amber-500/20 relative overflow-hidden select-none animate-fade-in text-slate-100">
            {/* Ambient decorative glowing backdrops */}
            <div className="absolute -top-12 -right-12 w-32 h-32 bg-amber-500/10 rounded-full blur-2xl pointer-events-none" />
            <div className="absolute -bottom-12 -left-12 w-32 h-32 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none" />
            
            {/* Header */}
            <div className="flex items-center justify-between border-b border-emerald-800/40 pb-3">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-amber-400 animate-pulse" />
                <div>
                  <h3 className="font-extrabold text-sm text-white tracking-tight">Buka Fitur Premium</h3>
                  <p className="text-[10px] text-slate-400 font-mono">Formula Penyesuaian Kaidah Sharaf Lengkap</p>
                </div>
              </div>
              <button 
                onClick={() => {
                  setShowPremiumModal(false);
                  setActivationCode("");
                  setActivationError("");
                }}
                className="p-1 rounded-full text-slate-400 hover:text-white hover:bg-emerald-900/50 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="mt-4 text-[11px] text-slate-350 space-y-2 leading-relaxed">
              <p>Fitur Premium membuka seluruh kemudahan komparatif:</p>
              <ul className="grid grid-cols-2 gap-x-4 gap-y-1 text-slate-400 pl-4 list-disc">
                <li>Tabel Komparasi Masdar (6 Kolom Sempurna)</li>
                <li>Jamak Isim Fa'il (Katsroh, Qillah, Muntahal)</li>
                <li>Jamak Sifat Musyabihat Lengkap</li>
                <li>Jamak Isim Maf'ul Lengkap</li>
                <li>Mudhori Manshub &amp; Majzum untuk Bina' Mu'tal</li>
              </ul>
            </div>

            {/* Select Pricing Package */}
            <div className="mt-5 space-y-3.5">
              <span className="text-[10px] font-extrabold text-amber-400 uppercase tracking-wider block">Pilih Metode Aktivasi Paket Premium</span>

              {/* Payment Method Selector */}
              <div className="grid grid-cols-2 p-1 bg-slate-950/80 rounded-2xl border border-emerald-800/20">
                <button
                  onClick={() => setPaymentMethod("midtrans")}
                  className={`py-2 px-3 text-xs font-bold rounded-xl flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                    paymentMethod === "midtrans"
                      ? "bg-emerald-850 text-white shadow-md shadow-emerald-500/10"
                      : "text-slate-400 hover:text-slate-100"
                  }`}
                >
                  <CreditCard className="w-3.5 h-3.5" />
                  <span>Gerbang Midtrans</span>
                </button>
                <button
                  onClick={() => setPaymentMethod("manual")}
                  className={`py-2 px-3 text-xs font-bold rounded-xl flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                    paymentMethod === "manual"
                      ? "bg-amber-500 text-slate-950 shadow-md shadow-amber-500/15 font-black"
                      : "text-slate-400 hover:text-slate-100"
                  }`}
                >
                  <Smartphone className="w-3.5 h-3.5 animate-pulse" />
                  <span>Transfer Manual</span>
                </button>
              </div>

              {paymentMethod === "midtrans" ? (
                <div className="space-y-3">
                  <div className="grid grid-cols-1 gap-3">
                    {/* Package 1 */}
                    <button
                      onClick={() => handlePayMidtrans(3000, "7-days-trial", "Coba Dulu 7 Hari")}
                      disabled={isPaymentLoading}
                      className="w-full text-left bg-slate-950/70 border border-emerald-800/30 hover:border-amber-500/40 p-4 rounded-2xl flex items-center justify-between transition-all group hover:bg-slate-900/80 cursor-pointer disabled:opacity-50"
                    >
                      <div className="space-y-0.5">
                        <span className="font-bold text-slate-100 flex items-center gap-1 text-xs">
                          <span>⚡ Coba Dulu 7 Hari</span>
                        </span>
                        <span className="text-[10px] text-slate-450 block">Uji coba jangka pendek yang ekonomis</span>
                      </div>
                      <div className="text-right">
                        <span className="block font-black text-[#10b981] text-xs">Rp3.000</span>
                        <span className="text-[9px] text-[#10b981]/80 block font-semibold">Sekali bayar</span>
                      </div>
                    </button>

                    {/* Package 2 */}
                    <button
                      onClick={() => handlePayMidtrans(13000, "3-months-plan", "Paling Laris 3 Bulan")}
                      disabled={isPaymentLoading}
                      className="w-full text-left bg-[#032015] border-2 border-amber-500 hover:border-amber-400 p-4 rounded-2xl flex items-center justify-between transition-all relative overflow-hidden shadow-md shadow-amber-500/10 cursor-pointer disabled:opacity-50"
                    >
                      <div className="absolute top-0 right-0 bg-amber-500 text-slate-950 text-[8px] font-black px-2 py-0.5 rounded-bl-xl tracking-wider uppercase">
                        Paling Laris
                      </div>
                      <div className="space-y-0.5">
                        <span className="font-bold text-amber-300 flex items-center gap-1 text-xs">
                          <span>🔥 Paling Laris 3 Bulan</span>
                        </span>
                        <span className="text-[10px] text-slate-300 block font-bold">Cuma Rp4rb/bulan</span>
                      </div>
                      <div className="text-right">
                        <span className="block font-black text-amber-400 text-xs">Rp13.000</span>
                        <span className="text-[9px] text-amber-300 block font-bold">Terpopuler</span>
                      </div>
                    </button>

                    {/* Package 3 */}
                    <button
                      onClick={() => handlePayMidtrans(29000, "1-year-plan", "Hemat Banget 1 Tahun")}
                      disabled={isPaymentLoading}
                      className="w-full text-left bg-slate-950/70 border border-emerald-800/30 hover:border-amber-500/40 p-4 rounded-2xl flex items-center justify-between transition-all group hover:bg-slate-900/80 cursor-pointer disabled:opacity-50"
                    >
                      <div className="space-y-0.5">
                        <span className="font-bold text-slate-100 flex items-center gap-1 text-xs">
                          <span>💎 Hemat Banget 1 Tahun</span>
                        </span>
                        <span className="text-[10px] text-slate-450 block">Kepemilikan jangka panjang super hemat</span>
                      </div>
                      <div className="text-right">
                        <span className="block font-black text-[#10b981] text-xs">Rp29.000</span>
                        <span className="text-[9px] text-teal-400 block font-bold">Hemat 40%</span>
                      </div>
                    </button>
                  </div>

                  {/* Loader indicator & status */}
                  {isPaymentLoading && (
                    <div className="p-3 bg-emerald-950/80 border border-amber-500/25 rounded-xl flex items-center gap-2.5 justify-center animate-pulse text-xs text-amber-350">
                      <span className="w-2 h-2 bg-amber-400 rounded-full animate-ping" />
                      <span>{paymentMessage}</span>
                    </div>
                  )}
                </div>
              ) : (
                <form onSubmit={handleManualPaymentConfirm} className="space-y-3.5">
                  {/* Manual transfer accounts */}
                  <div className="bg-slate-950/80 rounded-2xl p-3 border border-amber-500/20 space-y-2">
                    <span className="text-[9px] font-black tracking-wider text-amber-400 block uppercase">REKENING TRANSFER MANUAL:</span>
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div className="bg-[#05291d] p-2 rounded-xl border border-emerald-850">
                        <span className="text-[8px] text-slate-400 font-mono block">BANK BSI</span>
                        <span className="font-black text-[11px] text-slate-100 block tracking-wide">7123-4567-89</span>
                        <span className="text-[9px] text-amber-300 block font-medium">a.n Shorof Digital Pro</span>
                      </div>
                      <div className="bg-[#05291d] p-2 rounded-xl border border-emerald-850">
                        <span className="text-[8px] text-slate-400 font-mono block">GOPAY / DANA / OVO</span>
                        <span className="font-black text-[11px] text-slate-100 block tracking-wide">0812-3456-7890</span>
                        <span className="text-[9px] text-amber-300 block font-medium">a.n Taufiq Al-Morfologi</span>
                      </div>
                    </div>
                  </div>

                  {/* Program Selector */}
                  <div className="space-y-1">
                    <label className="block text-[9px] uppercase font-extrabold text-slate-400 tracking-wider">Kategori Program Paket</label>
                    <div className="grid grid-cols-3 gap-1 px-1 py-1.5 bg-slate-100/5 rounded-xl border border-emerald-800/10">
                      <button
                        type="button"
                        onClick={() => setManualSelectedPackage("trial")}
                        className={`py-1 text-[9px] font-bold rounded-lg transition-all cursor-pointer ${
                          manualSelectedPackage === "trial"
                            ? "bg-emerald-800 text-white"
                            : "text-slate-400 hover:text-white"
                        }`}
                      >
                        7 Hari (Rp3.000)
                      </button>
                      <button
                        type="button"
                        onClick={() => setManualSelectedPackage("3months")}
                        className={`py-1 text-[9px] font-bold rounded-lg transition-all cursor-pointer ${
                          manualSelectedPackage === "3months"
                            ? "bg-amber-500 text-slate-950 font-black"
                            : "text-slate-400 hover:text-white"
                        }`}
                      >
                        3 Bulan (Rp13.000)
                      </button>
                      <button
                        type="button"
                        onClick={() => setManualSelectedPackage("1year")}
                        className={`py-1 text-[9px] font-bold rounded-lg transition-all cursor-pointer ${
                          manualSelectedPackage === "1year"
                            ? "bg-emerald-800 text-white"
                            : "text-slate-400 hover:text-white"
                        }`}
                      >
                        1 Tahun (Rp29.000)
                      </button>
                    </div>
                  </div>

                  {/* Pilihan bank transfer asal */}
                  <div className="space-y-1">
                    <label className="block text-[9px] uppercase font-extrabold text-slate-400 tracking-wider">Metode Pengiriman Anda</label>
                    <div className="grid grid-cols-3 gap-1 px-1 py-1 bg-slate-100/5 rounded-xl border border-emerald-800/10">
                      {["BSI", "DANA", "GOPAY"].map((m) => (
                        <button
                          key={m}
                          type="button"
                          onClick={() => setManualSelectedBank(m)}
                          className={`py-1 text-[9px] font-bold rounded-lg transition-all cursor-pointer ${
                            manualSelectedBank === m
                              ? "bg-slate-900 border border-amber-500/30 text-amber-400"
                              : "text-slate-400 hover:text-white"
                          }`}
                        >
                          {m}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Sender & Phone fields */}
                  <div className="grid grid-cols-2 gap-2">
                    <div className="space-y-1">
                      <label className="block text-[9px] uppercase font-extrabold text-slate-440 tracking-wider flex items-center gap-1 select-none">
                        <User className="w-3 h-3 text-amber-450" />
                        <span>Nama Rek Pengirim</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={manualSenderName}
                        onChange={(e) => setManualSenderName(e.target.value)}
                        placeholder="Contoh: Ahmad Fauzan"
                        className="w-full px-3 py-1.5 border border-emerald-800/30 rounded-xl text-[11px] bg-slate-950 text-slate-100 focus:border-amber-500 focus:outline-none transition-all placeholder:text-slate-650"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="block text-[9px] uppercase font-extrabold text-slate-440 tracking-wider flex items-center gap-1 select-none">
                        <Phone className="w-3 h-3 text-amber-455" />
                        <span>Nomor WhatsApp</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={manualPhone}
                        onChange={(e) => setManualPhone(e.target.value)}
                        placeholder="Contoh: 0812345678"
                        className="w-full px-3 py-1.5 border border-emerald-800/30 rounded-xl text-[11px] bg-slate-950 text-slate-100 focus:border-amber-500 focus:outline-none transition-all placeholder:text-slate-655"
                      />
                    </div>
                  </div>

                  {/* File Upload Box */}
                  <div className="space-y-1">
                    <div 
                      onClick={() => {
                        const rnd = Math.floor(Math.random() * 900000) + 100000;
                        setManualProofFileName(`SDR_PROOF_${manualSelectedBank}_${rnd}.PNG`);
                      }}
                      className={`border border-dashed rounded-xl p-2.5 flex items-center justify-center gap-2.5 transition-all cursor-pointer ${
                        manualProofFileName 
                          ? "border-emerald-500 bg-emerald-950/20 text-emerald-300" 
                          : "border-slate-800 hover:border-amber-500/50 bg-slate-950/40 text-slate-400"
                      }`}
                    >
                      <Upload className="w-4 h-4 text-amber-500 animate-pulse shrink-0" />
                      <div className="text-left select-none overflow-hidden">
                        {manualProofFileName ? (
                          <>
                            <span className="text-[10px] font-bold text-emerald-400 block line-clamp-1">{manualProofFileName}</span>
                            <span className="text-[8px] text-slate-400 block">Bukti terpilih! Klik lagi apabila ingin mengubah</span>
                          </>
                        ) : (
                          <>
                            <span className="text-[9.5px] font-bold text-slate-200 block">Klik untuk Simulasikan Upload Bukti</span>
                            <span className="text-[8px] text-slate-450 block">Uji coba instan tanpa file asli</span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Submission Button */}
                  <button
                    type="submit"
                    disabled={isManualSubmitting}
                    className="w-full py-2.5 bg-amber-500 hover:bg-amber-450 text-slate-950 font-black text-xs rounded-xl transition-all shadow-md shadow-amber-500/10 flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-50"
                  >
                    {isManualSubmitting ? (
                      <div className="flex items-center gap-1 text-slate-950 select-none">
                        <span className="w-1.5 h-1.5 bg-slate-900 rounded-full animate-ping" />
                        <span>Mengonfirmasi bukti &amp; sinkronisasi...</span>
                      </div>
                    ) : (
                      <div className="flex items-center gap-1">
                        <span>Aktifkan Masa Uji Coba Premium Sekarang</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </div>
                    )}
                  </button>
                </form>
              )}
            </div>

            {/* License Code Backup */}
            <div className="mt-6 pt-5 border-t border-emerald-800/40 space-y-2.5">
              <label className="block text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">Aktivasi Manual via Kode Lisensi</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={activationCode}
                  onChange={(e) => {
                    setActivationCode(e.target.value);
                    setActivationError("");
                  }}
                  placeholder="Masukkan Kode Lisensi"
                  className="flex-1 px-3.5 py-2 border border-emerald-800/30 rounded-xl text-xs font-mono uppercase bg-slate-950 text-slate-250 focus:border-amber-500 focus:outline-none transition-all placeholder:text-slate-550 mr-1"
                />
                <button
                  onClick={() => handleSavePremium(true)}
                  className="px-4 py-2 bg-amber-500 hover:bg-amber-600 active:scale-95 text-slate-950 font-black text-xs rounded-xl transition-all cursor-pointer whitespace-nowrap"
                >
                  Aktifkan
                </button>
              </div>
              {activationError && (
                <p className="text-[10px] text-rose-400 font-bold">{activationError}</p>
              )}
            </div>

            {/* Merchant Details / Secure Payment Info */}
            <div className="mt-5 border-t border-emerald-800/30 pt-3 flex items-center justify-between text-[10px] text-slate-400">
              <span className="font-semibold block">💳 Merchant ID: <strong className="text-slate-200">M167123404</strong></span>
              <span className="text-[9px] text-slate-500 block font-mono">Secure Payment by Midtrans</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
