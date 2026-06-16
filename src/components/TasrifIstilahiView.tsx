/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { TasrifIstilahi, ShighotDetail } from "../types";
import { Info, Lock } from "lucide-react";
import { IilalEngine } from "../utils/iilalEngine";

interface TasrifIstilahiViewProps {
  tasrif: TasrifIstilahi;
  fa?: string;
  ain?: string;
  lam?: string;
  shorof?: any[];
  onShowWordInfo?: (word: string, shighot: string) => void;
}

export default function TasrifIstilahiView({
  tasrif,
  fa = "ف",
  ain = "ع",
  lam = "ل",
  shorof,
  onShowWordInfo
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

  return (
    <div className="space-y-4">
      {/* Short info bar */}
      <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-2.5 flex gap-2 items-start text-[11px] text-emerald-800">
        <Info className="w-3.5 h-3.5 shrink-0 mt-0.5 text-emerald-700" />
        <p>
          <strong className="font-semibold">Tasrif Istilahi (12 Shighot Klasik)</strong> adalah proses pemindahan 
          akar kata menjadi bermacam struktur/shighot baik secara <strong className="font-semibold text-indigo-800">Qiyasi (terpola aturan)</strong> maupun <strong className="font-semibold text-amber-800">Sama'i (riwayat dengar kamus)</strong>. Klik kata arab untuk menyalin instan.
        </p>
      </div>

      {/* Compact Bento-Grid: 6 columns on large screen, 2 columns on mobile */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-6 gap-2">
        {GRID_ITEMS.map((item, index) => {
          const customS = getCustomShorof(item.title);
          let themeClass = "";
          let textTheme = "";
          switch (item.variant) {
            case "emerald":
              themeClass = "hover:border-emerald-300 bg-emerald-50/5";
              textTheme = "text-emerald-800 bg-emerald-50";
              break;
            case "indigo":
              themeClass = "hover:border-indigo-300 bg-indigo-50/5";
              textTheme = "text-indigo-800 bg-indigo-50";
              break;
            case "rose":
              themeClass = "hover:border-rose-300 bg-rose-50/5";
              textTheme = "text-rose-800 bg-rose-50";
              break;
            case "amber":
              themeClass = "hover:border-amber-300 bg-amber-50/5";
              textTheme = "text-amber-800 bg-amber-50";
              break;
            case "teal":
              themeClass = "hover:border-teal-300 bg-teal-50/5";
              textTheme = "text-teal-800 bg-teal-50";
              break;
            default:
              themeClass = "hover:border-slate-300 bg-slate-50/25";
              textTheme = "text-slate-800 bg-slate-50";
          }

          return (
            <div
              key={`istilahi-card-${index}`}
              className={`p-2.5 rounded-xl border border-gray-100 bg-white transition-all flex flex-col justify-between group ${themeClass}`}
            >
              <div>
                <div className="flex items-center justify-between gap-1 mb-1">
                  <span className={`text-[8px] font-bold px-1.5 py-0.2 rounded-sm select-none truncate ${textTheme}`} title={item.arabicLabel}>
                    {item.arabicLabel}
                  </span>
                  <span className={`text-[7.5px] font-bold tracking-wide px-1 rounded bg-slate-100 uppercase select-none ${item.classification === "Qiyasi" ? "text-indigo-700 bg-indigo-50" : "text-amber-700 bg-amber-50"}`}>
                    {item.classification}
                  </span>
                </div>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[10px] text-gray-800 font-bold tracking-tight">{item.title}</span>
                  <span className="text-[8px] text-gray-400 select-none font-medium">{item.subtitle}</span>
                </div>
              </div>

              {/* Central Arabic Word */}
              <div className="py-1 text-right mt-1">
                {item.title === "Sifat Musyabihat" && tasrif.musyabihat6 && tasrif.musyabihat6.length > 0 && !customS ? (
                  <div className="space-y-1.5 text-right w-full" dir="rtl">
                    <span className="text-[7.5px] text-indigo-900 font-bold bg-indigo-50/70 py-0.5 px-1.5 rounded block text-center mb-1 font-sans select-none">
                      6 Wazan Sifat Musyabihat:
                    </span>
                    <div className="grid grid-cols-2 gap-1 col-span-2">
                      {tasrif.musyabihat6.map((w, wIdx) => {
                        const labels = ["فَعِيلٌ", "فَعِلٌ", "فَعْلٌ", "فُعَالٌ", "فَعَالٌ", "أَفْعَلُ"];
                        return (
                          <div 
                            key={`musy6-${wIdx}`} 
                            title={`Salin: ${w}`}
                            className="bg-slate-50 border border-slate-100/70 p-1 rounded-lg hover:border-indigo-300 transition-all flex flex-col items-center justify-center cursor-pointer active:scale-95 relative group/item"
                            onClick={(e) => {
                              e.stopPropagation();
                              navigator.clipboard.writeText(w);
                            }}
                          >
                            <span className="font-arabic text-[12px] font-black text-slate-900 leading-tight select-all">{w}</span>
                            <div className="flex items-center gap-1 mt-0.5 select-none">
                              <span className="text-[7px] text-gray-400 font-mono scale-90">{labels[wIdx]}</span>
                              <button
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  onShowWordInfo?.(w, `Sifat Musyabihat (${labels[wIdx]})`);
                                }}
                                className="p-0.5 text-amber-600 hover:text-amber-800 transition-colors"
                                title="Lihat Analisis"
                              >
                                <Lock className="w-2 h-2" />
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
                        className="font-arabic text-xl md:text-2xl font-bold text-gray-900 group-hover:text-emerald-700 transition-colors select-all cursor-pointer"
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
                          className="p-1 rounded-md bg-amber-500/10 hover:bg-amber-500 text-amber-700 hover:text-slate-950 border border-amber-500/20 transition-all cursor-pointer flex items-center justify-center shrink-0"
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
        })}
      </div>
    </div>
  );
}
