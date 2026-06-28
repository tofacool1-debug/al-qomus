/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { TasrifIstilahi, ShighotDetail } from "../types";
import { Info, Lock, ChevronLeft, ChevronRight } from "lucide-react";
import { IilalEngine } from "../utils/iilalEngine";

interface TasrifIstilahiViewProps {
  tasrif: TasrifIstilahi;
  fa?: string;
  ain?: string;
  lam?: string;
  shorof?: any[];
  onShowWordInfo?: (word: string, shighot: string) => void;
  lafadzSize?: "small" | "medium" | "large" | "xlarge";
  layoutMode?: "scroll" | "slide";
  appTheme?: "dark" | "light" | "green";
}

export default function TasrifIstilahiView({
  tasrif,
  fa = "ف",
  ain = "ع",
  lam = "ل",
  shorof,
  onShowWordInfo,
  lafadzSize = "medium",
  layoutMode = "scroll",
  appTheme = "dark"
}: TasrifIstilahiViewProps) {
  const bina = IilalEngine.detectBina(fa, ain, lam);

  const getCustomShorof = (cardTitle: string) => {
    if (!shorof) return null;
    let targetTitle = "";
    if (cardTitle === "Isim Fail") targetTitle = "Isim Fail";
    else if (cardTitle === "Isim Maful") targetTitle = "Isim Maful";
    else if (cardTitle === "Sifat Musyabihat") targetTitle = "Sifat Musyabihat";
    else if (["Isim Zaman", "Isim Makan", "Isim Alat"].includes(cardTitle)) targetTitle = "Isim Zaman Makan Alat";
    
    if (!targetTitle) return null;
    return shorof.find((s: any) => s.title === targetTitle);
  };

  const GRID_ITEMS = [
    {
      title: "Fi'il Madhi",
      subtitle: "Kata Kerja Lampau",
      arabicLabel: "الفِعْلُ المَاضِي",
      arabicWord: tasrif.madhi,
      description: "Menunjukkan pekerjaan yang telah selesai.",
      classification: "Qiyasi",
      variant: "emerald",
    },
    {
      title: "Fi'il Mudhari",
      subtitle: "Kata Kerja Sedang/Akan",
      arabicLabel: "الفِعْلُ المُضَارِعُ",
      arabicWord: tasrif.mudhari,
      description: "Menunjukkan pekerjaan sedang/akan berkegiatan.",
      classification: "Qiyasi",
      variant: "emerald",
    },
    {
      title: "Masdar",
      subtitle: "Nomina Tindakan",
      arabicLabel: "المَصْدَرُ",
      arabicWord: tasrif.masdar,
      description: "Menunjukkan nama/benda dari aktivitas kata kerja.",
      classification: "Sama'i / Qiyasi",
      variant: "emerald",
    },
    {
      title: "Isim Fail",
      subtitle: "Aktor / Pelaku Utama",
      arabicLabel: "اِسْمُ الفَاعِلِ",
      arabicWord: tasrif.isimFail.mufrod,
      description: "Penunjuk seseorang yang melakukan suatu gerakan.",
      detailObj: tasrif.isimFail,
      classification: "Qiyasi",
      variant: "indigo",
    },
    {
      title: "Isim Maful",
      subtitle: "Objek / Penerima",
      arabicLabel: "اِسْمُ المَفْعُولِ",
      arabicWord: tasrif.isimMaful.mufrod,
      description: "Penunjuk target penderita yang dikenai aktivitas.",
      detailObj: tasrif.isimMaful,
      classification: "Qiyasi",
      variant: "indigo",
    },
    {
      title: "Sifat Musyabihat",
      subtitle: "Karakter Permanen",
      arabicLabel: "الْصِّفَةُ الْمُشَبَّهَةُ",
      arabicWord: tasrif.isimMusyabihat.mufrod,
      description: "Pensifatan menetap menyerupai bentuk Isim Fail.",
      detailObj: tasrif.isimMusyabihat,
      classification: "Sama'i",
      variant: "slate",
    },
    {
      title: "Fi'il Amar",
      subtitle: "Kata Kerja Perintah",
      arabicLabel: "فِعْلُ الأَمْرِ",
      arabicWord: tasrif.amar,
      description: "Kalimat tuntutan meminta melakukan pekerjaan.",
      classification: "Qiyasi",
      variant: "rose",
    },
    {
      title: "Fi'il Nahi",
      subtitle: "Kata Kerja Larangan",
      arabicLabel: "فِعْلُ النَّهْيِ",
      arabicWord: tasrif.nahi,
      description: "Kalimat larangan pelarangan melakukan suatu hal.",
      classification: "Qiyasi",
      variant: "rose",
    },
    {
      title: "Isim Zaman",
      subtitle: "Nomina Waktu",
      arabicLabel: "اِسْمُ الزَّمَانِ",
      arabicWord: tasrif.isimZaman.mufrod,
      description: "Petunjuk waktu berlangsungnya pekerjaan.",
      detailObj: tasrif.isimZaman,
      classification: "Qiyasi",
      variant: "amber",
    },
    {
      title: "Isim Makan",
      subtitle: "Nomina Tempat",
      arabicLabel: "اِسْمُ المَكَانِ",
      arabicWord: tasrif.isimMakan.mufrod,
      description: "Petunjuk lokasi tempat terlaksananya gerakan.",
      detailObj: tasrif.isimMakan,
      classification: "Qiyasi",
      variant: "amber",
    },
    {
      title: "Isim Alat",
      subtitle: "Instrumen Pembantu",
      arabicLabel: "اِسْمُ الآلَةِ",
      arabicWord: tasrif.isimAlat.mufrod,
      description: "Penunjuk sarana alat fisik penunjang aktivitas.",
      detailObj: tasrif.isimAlat,
      classification: "Qiyasi",
      variant: "teal",
    },
    {
      title: "Isim Tashghir",
      subtitle: "Pengecilan Diminutif",
      arabicLabel: "اِسْمُ التَّصْغِيرِ",
      arabicWord: tasrif.isimTashghir,
      description: "Modifikasi kata untuk makna penyayangan/pengecilan.",
      classification: "Qiyasi",
      variant: "slate",
    },
  ];

  const SECONDARY_ITEMS = [
    {
      title: "Isim Tafdhil",
      arabicLabel: "اِسْمُ التَّفْضِيلِ",
      desc: "Menyatakan makna 'Lebih' atau 'Paling' (Komparatif/Superlatif).",
      details: [
        { label: "Mudzakar (L)", val: tasrif.tafdhilMuzakkar },
        { label: "Muannats (P)", val: tasrif.tafdhilMuannats },
        { label: "Jamak", val: tasrif.tafdhilJamak },
      ],
    },
    {
      title: "Mubalaghoh (Sifat Hiperbolis)",
      arabicLabel: "صِيَغُ المُبَالَغَةِ",
      desc: "Kata sifat penguat intensitas tinggi ('Maha' / 'Sangat').",
      details: [
        { label: "Mubalaghoh Fa'al", val: tasrif.mubalaghohFaal.mufrod },
        { label: "Mubalaghoh Fa'il", val: tasrif.mubalaghohFa_il.mufrod },
        { label: "Mubalaghoh Mif'al", val: tasrif.mubalaghohMifal.mufrod },
      ],
    },
  ];

  const [activeSlideIdx, setActiveSlideIdx] = useState(0);

  const getArabicSizeClass = (defaultClass: string) => {
    switch (lafadzSize) {
      case "small":
        return "text-md md:text-lg";
      case "large":
        return "text-2xl md:text-3.5xl";
      case "xlarge":
        return "text-3.5xl md:text-5xl lg:text-5.5ql";
      case "medium":
      default:
        return defaultClass;
    }
  };

  const renderCard = (item: any, index: number) => {
    const customS = getCustomShorof(item.title);
    let themeClass = "";
    let textTheme = "";
    
    // Theme-aware accent colors
    switch (item.variant) {
      case "emerald":
        themeClass = appTheme === "light" ? "hover:border-emerald-350 bg-emerald-50/10" : "hover:border-emerald-450 bg-emerald-950/10";
        textTheme = appTheme === "light" ? "text-emerald-850 bg-emerald-50" : "text-emerald-300 bg-emerald-950/60";
        break;
      case "indigo":
        themeClass = appTheme === "light" ? "hover:border-indigo-350 bg-indigo-50/10" : "hover:border-indigo-405 bg-indigo-950/15";
        textTheme = appTheme === "light" ? "text-indigo-850 bg-indigo-50" : "text-indigo-300 bg-indigo-950/60";
        break;
      case "rose":
        themeClass = appTheme === "light" ? "hover:border-rose-350 bg-rose-50/10" : "hover:border-rose-405 bg-rose-950/15";
        textTheme = appTheme === "light" ? "text-rose-850 bg-rose-50" : "text-rose-300 bg-rose-950/60";
        break;
      case "amber":
        themeClass = appTheme === "light" ? "hover:border-amber-305 bg-amber-50/10" : "hover:border-amber-450 bg-amber-950/15";
        textTheme = appTheme === "light" ? "text-amber-850 bg-amber-50" : "text-amber-300 bg-amber-950/60";
        break;
      case "teal":
        themeClass = appTheme === "light" ? "hover:border-teal-350 bg-teal-50/10" : "hover:border-teal-405 bg-teal-950/15";
        textTheme = appTheme === "light" ? "text-teal-850 bg-teal-50" : "text-teal-300 bg-teal-950/60";
        break;
      default:
        themeClass = appTheme === "light" ? "hover:border-slate-350 bg-slate-50/25" : "hover:border-slate-800 bg-slate-950/15";
        textTheme = appTheme === "light" ? "text-slate-850 bg-slate-50" : "text-slate-300 bg-slate-900/60";
    }

    return (
      <div
        key={`istilahi-card-${index}`}
        className={`p-3.5 rounded-2xl border transition-all flex flex-col justify-between group h-full min-h-[175px] shadow-sm ${
          appTheme === "light"
            ? "bg-white border-gray-150 text-gray-800"
            : appTheme === "dark"
            ? "bg-[#031d13]/70 border-emerald-850/20 text-slate-100"
            : "bg-emerald-950/70 border-emerald-900/65 text-emerald-100"
        } ${themeClass}`}
      >
        <div>
          <div className="flex items-center justify-between gap-1 mb-1">
            <span className={`text-[8.5px] font-extrabold px-1.5 py-0.5 rounded-sm select-none truncate ${textTheme}`} title={item.arabicLabel}>
              {item.arabicLabel}
            </span>
            <span className={`text-[8px] font-black tracking-wide px-1 rounded uppercase select-none ${
              appTheme === "light" 
                ? "text-indigo-700 bg-indigo-50" 
                : "text-amber-300 bg-amber-950/40"
            }`}>
              {item.classification}
            </span>
          </div>
          <div className={`flex items-center justify-between mb-1.5 border-b pb-1 ${
            appTheme === "light" ? "border-slate-105" : "border-emerald-800/10"
          }`}>
            <span className={`text-[11px] font-extrabold tracking-tight ${appTheme === "light" ? "text-gray-900" : "text-white"}`}>{item.title}</span>
            <span className="text-[8.5px] text-gray-400 select-none font-medium">{item.subtitle}</span>
          </div>
        </div>

        {/* Central Arabic Word */}
        <div className="py-2 text-right mt-1">
          {item.title === "Sifat Musyabihat" && tasrif.musyabihat6 && tasrif.musyabihat6.length > 0 && !customS ? (
            <div className="space-y-1.5 text-right w-full" dir="rtl">
              <span className={`text-[8px] font-extrabold py-0.5 px-1.5 rounded block text-center mb-1 font-sans select-none ${
                appTheme === "light" ? "text-indigo-950 bg-indigo-50/70" : "text-amber-300 bg-slate-950/50"
              }`}>
                6 Wazan Sifat Musyabihat:
              </span>
              <div className="grid grid-cols-2 gap-1 col-span-2">
                {tasrif.musyabihat6.map((w, wIdx) => {
                  const labels = ["فَعِيلٌ", "فَعِلٌ", "فَعْلٌ", "فُعَالٌ", "فَعَالٌ", "أَفْعَلُ"];
                  return (
                    <div 
                      key={`musy6-${wIdx}`} 
                      title={`Salin: ${w}`}
                      className={`p-1 rounded-lg border transition-all flex flex-col items-center justify-center cursor-pointer active:scale-95 relative group/item ${
                        appTheme === "light"
                          ? "bg-slate-50 border-slate-105 hover:border-indigo-300"
                          : appTheme === "dark"
                          ? "bg-slate-950/60 border-slate-850 hover:border-amber-400"
                          : "bg-emerald-955/65 border-emerald-900/40 hover:border-amber-300"
                      }`}
                      onClick={(e) => {
                        e.stopPropagation();
                        navigator.clipboard.writeText(w);
                      }}
                    >
                      <span className={`font-arabic font-black leading-tight select-all ${getArabicSizeClass("text-[13px]")} ${
                        appTheme === "light" ? "text-slate-900" : "text-white"
                      }`}>{w}</span>
                      <div className="flex items-center gap-1 mt-0.5 select-none">
                        <span className="text-[7.5px] text-gray-400 font-mono scale-90">{labels[wIdx]}</span>
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            onShowWordInfo?.(w, `Sifat Musyabihat (${labels[wIdx]})`);
                          }}
                          className="p-0.5 text-amber-600 hover:text-amber-800 transition-colors"
                          title="Lihat Analisis"
                        >
                          <Lock className="w-2.5 h-2.5" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ) : (
            <>
              <div className="flex items-center justify-end gap-1.5 mb-1" dir="rtl">
                <div
                  className={`font-arabic font-bold transition-colors select-all cursor-pointer ${getArabicSizeClass("text-xl md:text-2xl")} ${
                    appTheme === "light"
                      ? "text-gray-955 hover:text-emerald-700"
                      : appTheme === "dark"
                      ? "text-slate-100 hover:text-amber-400"
                      : "text-emerald-100 hover:text-amber-300"
                  }`}
                  title="Klik untuk menyalin"
                  onClick={(e) => {
                    e.stopPropagation();
                    navigator.clipboard.writeText(item.arabicWord || "");
                  }}
                >
                  {item.arabicWord || "—"}
                </div>
                {item.arabicWord && item.arabicWord !== "—" && (
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onShowWordInfo?.(item.arabicWord || "", item.title);
                    }}
                    className="p-1 rounded-md bg-amber-500/10 hover:bg-amber-500 text-amber-700 hover:text-slate-950 border border-amber-500/25 transition-all cursor-pointer flex items-center justify-center shrink-0"
                    title="Analisis Lafadz & I'lal"
                  >
                    <Lock className="w-2.5 h-2.5" />
                  </button>
                )}
              </div>
              {item.title === "Fi'il Amar" && (
                <span className="block text-[8px] text-red-650 font-extrabold bg-red-50/50 px-1 py-0.5 rounded text-center my-1 select-none font-sans">
                  HURUF MUDHOROAH: DIBUANG
                </span>
              )}
              {item.title === "Fi'il Nahi" && (
                <span className="block text-[8px] text-emerald-700 font-extrabold bg-emerald-50/50 px-1 py-0.5 rounded text-center my-1 select-none font-sans">
                  HURUF MUDHOROAH: ت (TAMPIL)
                </span>
              )}
              <p className="text-[9px] text-gray-400 mt-0.5 leading-snug">
                {item.description}
              </p>
            </>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-4">
      {/* Short info bar */}
      <div className={`rounded-xl p-2.5 flex gap-2 items-start text-[11px] border ${
        appTheme === "light"
          ? "bg-emerald-50/90 border-emerald-100 text-emerald-800"
          : appTheme === "dark"
          ? "bg-emerald-950/30 border-emerald-850/40 text-emerald-350"
          : "bg-[#021f14] border-emerald-900/60 text-emerald-300"
      }`}>
        <Info className={`w-3.5 h-3.5 shrink-0 mt-0.5 ${appTheme === "light" ? "text-emerald-700" : "text-emerald-400"}`} />
        <p>
          <strong className="font-semibold">Tasrif Istilahi (12 Shighot Klasik)</strong> adalah proses pemindahan 
          akar kata menjadi bermacam struktur/shighot baik secara <strong className={`font-semibold ${appTheme === "light" ? "text-indigo-800" : "text-indigo-300"}`}>Qiyasi (terpola aturan)</strong> maupun <strong className={`font-semibold ${appTheme === "light" ? "text-amber-800" : "text-amber-300"}`}>Sama'i (riwayat dengar kamus)</strong>. Klik kata arab untuk menyalin instan.
        </p>
      </div>

      {layoutMode === "slide" ? (
        <div className="bg-slate-900 border-2 border-emerald-500/25 p-5 rounded-2xl space-y-4 animate-fade-in relative overflow-hidden shadow-md">
          <div className="absolute right-0 top-0 w-32 h-32 bg-emerald-500/5 rounded-full blur-2xl pointer-events-none" />
          
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <button
              type="button"
              onClick={() => setActiveSlideIdx((prev) => (prev > 0 ? prev - 1 : GRID_ITEMS.length - 1))}
              className="p-2 bg-slate-800 hover:bg-slate-700 rounded-xl text-slate-300 hover:text-white transition-all cursor-pointer active:scale-95"
              title="Shighot Sebelumnya"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <div className="text-center">
              <span className="text-[10px] text-amber-400 font-extrabold uppercase tracking-widest block mb-0.5">SHIGHOT {activeSlideIdx + 1} DARI {GRID_ITEMS.length}</span>
              <h4 className="text-xs font-black text-white">{GRID_ITEMS[activeSlideIdx].title} ({GRID_ITEMS[activeSlideIdx].subtitle})</h4>
            </div>
            <button
              type="button"
              onClick={() => setActiveSlideIdx((prev) => (prev < GRID_ITEMS.length - 1 ? prev + 1 : 0))}
              className="p-2 bg-slate-800 hover:bg-slate-700 rounded-xl text-slate-300 hover:text-white transition-all cursor-pointer active:scale-95"
              title="Shighot Selanjutnya"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          <div className="min-h-[190px]">
            {renderCard(GRID_ITEMS[activeSlideIdx], activeSlideIdx)}
          </div>

          <div className="flex flex-wrap justify-center gap-1 pt-2 border-t border-slate-800/40">
            {GRID_ITEMS.map((item, idx) => (
              <button
                key={`indicator-${idx}`}
                type="button"
                onClick={() => setActiveSlideIdx(idx)}
                className={`text-[9px] font-bold px-2 py-1 rounded-md transition-all cursor-pointer ${
                  activeSlideIdx === idx 
                    ? "bg-[#10b981] text-white font-extrabold shadow-sm scale-102" 
                    : "bg-slate-800 text-slate-400 hover:bg-slate-755 hover:text-white"
                }`}
                title={item.title}
              >
                {idx + 1}
              </button>
            ))}
          </div>
        </div>
      ) : (
        /* Compact Bento-Grid: 6 columns on large screen, 2 columns on mobile */
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-6 gap-2 animate-fade-in">
          {GRID_ITEMS.map((item, index) => renderCard(item, index))}
        </div>
      )}
    </div>
  );
}
