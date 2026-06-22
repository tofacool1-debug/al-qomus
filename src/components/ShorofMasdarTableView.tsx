/**
 * @license
 * SPDX-License-Identifier: Apache-2.5
 */

import React from "react";
import { DictionaryEntry } from "../types";
import { IilalEngine } from "../utils/iilalEngine";
import { getVocalizedRoot } from "../utils/dictionaryData";
import { Table, Bookmark, Lock, Sparkles, X, Info } from "lucide-react";

interface ShorofMasdarTableViewProps {
  entries: DictionaryEntry[];
  activeEntryId?: string;
  onSelectEntry?: (entry: DictionaryEntry) => void;
  isPremium?: boolean;
  onUnlock?: () => void;
  lafadzSize?: "small" | "medium" | "large" | "xlarge";
  appTheme?: "light" | "dark" | "green";
}

export default function ShorofMasdarTableView({
  entries,
  activeEntryId,
  onSelectEntry,
  isPremium = false,
  onUnlock,
  lafadzSize = "medium",
  appTheme = "light",
}: ShorofMasdarTableViewProps) {
  const [filterSearched, setFilterSearched] = React.useState(true);
  const [selectedEntryForPopup, setSelectedEntryForPopup] = React.useState<DictionaryEntry | null>(null);

  const getArabicSizeClass = (defaultClass: string) => {
    switch (lafadzSize) {
      case "small":
        return "text-[12px]";
      case "large":
        return "text-[17px] md:text-[18px]";
      case "xlarge":
        return "text-[20px] md:text-[22px]";
      case "medium":
      default:
        return defaultClass;
    }
  };
  
  const renderMasdarCell = (val: string | string[] | undefined) => {
    if (!val) return <span className="text-gray-405 font-mono text-center block">—</span>;
    
    let arr: string[] = [];
    if (Array.isArray(val)) {
      arr = val;
    } else if (typeof val === "string") {
      arr = val.split(/[,/]/).map((s) => s.trim()).filter(Boolean);
    }
    
    if (arr.length === 0) {
      return <span className="text-gray-450 font-mono text-center block">—</span>;
    }
    
    return (
      <div className="flex flex-wrap gap-1 md:gap-1.5 justify-end" dir="rtl">
        {arr.map((item, idx) => (
          <span
            key={idx}
            onClick={(e) => {
              e.stopPropagation();
              navigator.clipboard.writeText(item);
            }}
            className={`font-arabic font-black px-2 py-0.5 rounded border transition-all cursor-pointer select-all active:scale-95 inline-block ${
              appTheme === "light"
                ? "bg-emerald-50 text-emerald-950 border-emerald-100/80 hover:bg-emerald-100/50 hover:border-emerald-300"
                : "bg-emerald-950/40 text-emerald-300 border-emerald-900/40 hover:bg-emerald-900/30 hover:border-emerald-600"
            } ${getArabicSizeClass("text-[14px] md:text-[15px]")}`}
            title="Klik untuk menyalin"
          >
            {item}
          </span>
        ))}
      </div>
    );
  };

  const displayedEntries = filterSearched && activeEntryId
    ? entries.filter(e => e.id === activeEntryId)
    : entries;

  return (
    <div className={`border p-4 rounded-2xl shadow-3xs space-y-4 ${
      appTheme === "light"
        ? "bg-white border-gray-150"
        : appTheme === "dark"
        ? "bg-[#031d13]/60 border-slate-800/80 text-slate-100"
        : "bg-[#021f14]/80 border-emerald-900/60 text-emerald-100"
    }`}>
      <div className={`flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b pb-3 ${
        appTheme === "light" ? "border-gray-100" : "border-slate-800/80"
      }`}>
        <div className="flex items-center gap-2">
          <div className={`p-2 rounded-xl ${
            appTheme === "light" ? "bg-emerald-50 text-emerald-700" : "bg-emerald-950/55 text-emerald-400"
          }`}>
            <Table className="w-5 h-5" />
          </div>
          <div>
            <h3 className={`text-sm md:text-md font-extrabold tracking-tight ${
              appTheme === "light" ? "text-gray-900" : "text-white"
            }`}>
              Tabel Komparasi Masdar (Sama'i, Qiyasi, Marrah &amp; Nau')
            </h3>
            <p className="text-[10px] md:text-xs text-gray-400">
              Daftar komparatif akar kata beserta masdar khusus. Klik kata arab untuk menyalin.
            </p>
          </div>
        </div>
        
        {/* Toggle simplification filter */}
        <div className="flex items-center gap-2 self-end sm:self-auto">
          <button
            onClick={() => setFilterSearched(!filterSearched)}
            className={`text-[10px] font-extrabold px-3 py-1.5 rounded-lg border transition-all flex items-center gap-1.5 cursor-pointer select-none ${
              filterSearched
                ? "bg-emerald-600 border-emerald-650 text-white shadow-3xs font-black"
                : appTheme === "light"
                ? "bg-gray-50 text-gray-600 border-gray-200 hover:bg-gray-100"
                : "bg-slate-900 text-slate-350 border-slate-800 hover:bg-slate-800"
            }`}
          >
            {filterSearched ? "Hanya Lafadz Aktif" : "Tampilkan Semua"}
          </button>
          <span className={`text-[10px] font-bold px-2 py-1.5 rounded-md select-none ${
            appTheme === "light" ? "bg-slate-100 text-gray-505" : "bg-slate-950/60 text-slate-400"
          }`}>
            {displayedEntries.length} Item
          </span>
        </div>
      </div>

      {/* SISTEM DAFTAR UNTUK KOMPARASI MASDAR */}
      <div className="overflow-x-auto rounded-xl border border-slate-800/60 bg-slate-950/20">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className={`border-b border-slate-800 bg-slate-950/50 text-slate-400 font-bold uppercase`}>
              <th className="p-3 text-center w-12">No</th>
              <th className="p-3 text-right">Lafadz (Akar)</th>
              <th className="p-3">Arti / Terjemahan</th>
              <th className="p-3 text-center">Bina'</th>
              <th className="p-3 text-right">1. Masdar Sama'i</th>
              <th className="p-3 text-right">2. Masdar Qiyasi</th>
              <th className="p-3 text-right">3. Masdar Marrah</th>
              <th className="p-3 text-right">4. Masdar Nau'</th>
            </tr>
          </thead>
          <tbody>
            {displayedEntries.map((entry, index) => {
              const isActive = entry.id === activeEntryId;
              const bina = entry.bina || IilalEngine.detectBina(entry.root.fa, entry.root.ain, entry.root.lam);
              
              let rawMarrah = IilalEngine.buatIsimMarrah(entry.root.fa, entry.root.ain, entry.root.lam, bina);
              let rawNau = IilalEngine.buatIsimNau(entry.root.fa, entry.root.ain, entry.root.lam, bina);
              
              const marrah = IilalEngine.postProcessWord(rawMarrah, bina, entry.root.fa, entry.root.ain, entry.root.lam);
              const nau = IilalEngine.postProcessWord(rawNau, bina, entry.root.fa, entry.root.ain, entry.root.lam);

              return (
                <tr
                  key={entry.id}
                  onClick={() => {
                    onSelectEntry?.(entry);
                    setSelectedEntryForPopup(entry);
                  }}
                  className={`border-b border-slate-900 cursor-pointer transition-all duration-150 hover:bg-emerald-950/10 ${
                    isActive
                      ? appTheme === "light"
                        ? "bg-emerald-50 text-slate-900 border-emerald-200"
                        : "bg-emerald-500/10 text-emerald-300 border-emerald-990/60"
                      : appTheme === "light"
                      ? "text-gray-700 hover:bg-slate-50"
                      : "text-slate-300"
                  }`}
                >
                  <td className="p-3 text-center font-mono font-bold text-slate-500">{index + 1}</td>
                  <td className="p-3 text-right font-arabic font-extrabold text-lg select-all" dir="rtl">
                    <span className="text-amber-400">{entry.root.fa}</span>
                    <span>ـ{entry.root.ain}ـ{entry.root.lam}</span>
                  </td>
                  <td className="p-3 font-semibold text-slate-200 max-w-xs truncate">{entry.translation}</td>
                  <td className="p-3 text-center">
                    <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded font-sans border ${
                      appTheme === "light"
                        ? "bg-amber-50 text-amber-800 border-amber-100"
                        : "bg-amber-950/25 text-amber-400 border-amber-900/30"
                    }`}>
                      {bina}
                    </span>
                  </td>
                  <td className="p-3 text-right">{renderMasdarCell(entry.masdarSamai)}</td>
                  <td className="p-3 text-right">{renderMasdarCell(entry.masdarQiyasi)}</td>
                  <td className="p-3 text-right" dir="rtl">
                    <span
                      onClick={(e) => {
                        e.stopPropagation();
                        navigator.clipboard.writeText(marrah);
                      }}
                      className={`font-arabic font-black px-1.5 py-0.5 rounded border transition-all cursor-pointer select-all active:scale-95 inline-block ${
                        appTheme === "light"
                          ? "bg-blue-50 text-blue-950 border-blue-100/80 hover:bg-blue-100/50"
                          : "bg-blue-950/30 text-blue-300 border-blue-900/40 hover:bg-blue-900/20"
                      } ${getArabicSizeClass("text-[13px]")}`}
                      title="Klik untuk menyalin"
                    >
                      {marrah}
                    </span>
                  </td>
                  <td className="p-3 text-right" dir="rtl">
                    <span
                      onClick={(e) => {
                        e.stopPropagation();
                        navigator.clipboard.writeText(nau);
                      }}
                      className={`font-arabic font-black px-1.5 py-0.5 rounded border transition-all cursor-pointer select-all active:scale-95 inline-block ${
                        appTheme === "light"
                          ? "bg-purple-50 text-purple-950 border-purple-100/80 hover:bg-purple-100/50"
                          : "bg-purple-950/30 text-purple-300 border-purple-900/40 hover:bg-purple-900/20"
                      } ${getArabicSizeClass("text-[13px]")}`}
                      title="Klik untuk menyalin"
                    >
                      {nau}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Detail Pop-Up Modal */}
      {selectedEntryForPopup && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-fade-in">
          <div className={`w-full max-w-lg rounded-3xl border p-6 space-y-4 shadow-2xl relative ${
            appTheme === "light"
              ? "bg-white border-gray-150 text-slate-850"
              : "bg-slate-900 border-slate-800 text-slate-100"
          }`}>
            <button
              onClick={() => setSelectedEntryForPopup(null)}
              className="absolute top-4 right-4 p-1.5 rounded-full hover:bg-slate-800/10 transition cursor-pointer"
            >
              <X className="w-5 h-5 text-gray-500 hover:text-gray-750" />
            </button>

            <div className="flex items-center gap-3 border-b pb-3 border-dashed border-emerald-500/10">
              <div className={`p-2 rounded-xl ${
                appTheme === "light" ? "bg-emerald-50 text-emerald-700" : "bg-emerald-950/55 text-emerald-400"
              }`}>
                <Info className="w-5 h-5" />
              </div>
              <div className="text-left">
                <h4 className="text-sm font-extrabold tracking-tight">Rincian Komparasi Masdar</h4>
                <p className="text-[10px] text-gray-400">Analisis variasi masdar dari akar kata terpilih.</p>
              </div>
            </div>

            {/* Entry Header Info */}
            <div className={`p-4 rounded-2xl flex justify-between items-center ${
              appTheme === "light" ? "bg-slate-50/70 border border-slate-100" : "bg-slate-950/40 border border-slate-900"
            }`}>
              <div className="text-left">
                <span className="text-xs font-black text-emerald-500">
                  {selectedEntryForPopup.translation}
                </span>
                <span className="block text-[10px] text-gray-450 font-mono mt-0.5">
                  Bina' {selectedEntryForPopup.bina || IilalEngine.detectBina(selectedEntryForPopup.root.fa, selectedEntryForPopup.root.ain, selectedEntryForPopup.root.lam)} • Bab {selectedEntryForPopup.babNum}
                </span>
              </div>
              <div className="text-right">
                <span className="font-arabic font-extrabold text-2xl text-amber-400 select-all" dir="rtl">
                  {getVocalizedRoot(selectedEntryForPopup.root.fa, selectedEntryForPopup.root.ain, selectedEntryForPopup.root.lam, selectedEntryForPopup.root.babNum)}
                </span>
              </div>
            </div>

            {/* Masdar Grid (Sama'i, Qiyasi, Marrah, Nau') */}
            {/* Note: Columns for "Jamak Taksir" and "Qillah" are explicitly excluded/removed here as per instructions! */}
            <div className="space-y-3">
              <h5 className="text-[10px] font-black text-slate-400 uppercase tracking-widest text-left">Variasi Masdar</h5>
              <div className="grid grid-cols-2 gap-3">
                {/* 1. Masdar Sama'i */}
                <div className={`p-3 rounded-2xl border flex flex-col gap-1 text-left ${
                  appTheme === "light" ? "bg-slate-50/70 border-slate-100" : "bg-slate-900/30 border-slate-850"
                }`}>
                  <span className="text-[8.5px] font-black uppercase text-slate-500 font-mono tracking-wider">1. Masdar Sama'i</span>
                  <div className="flex justify-end pt-1">
                    {renderMasdarCell(selectedEntryForPopup.masdarSamai)}
                  </div>
                </div>

                {/* 2. Masdar Qiyasi */}
                <div className={`p-3 rounded-2xl border flex flex-col gap-1 text-left ${
                  appTheme === "light" ? "bg-slate-50/70 border-slate-100" : "bg-slate-900/30 border-slate-850"
                }`}>
                  <span className="text-[8.5px] font-black uppercase text-slate-500 font-mono tracking-wider">2. Masdar Qiyasi</span>
                  <div className="flex justify-end pt-1">
                    {renderMasdarCell(selectedEntryForPopup.masdarQiyasi)}
                  </div>
                </div>

                {/* 3. Masdar Marrah */}
                <div className={`p-3 rounded-2xl border flex flex-col gap-1 text-left relative ${
                  appTheme === "light" ? "bg-slate-50/70 border-slate-100" : "bg-slate-900/30 border-slate-850"
                }`}>
                  <span className="text-[8.5px] font-black uppercase text-slate-500 font-mono tracking-wider">3. Masdar Marrah</span>
                  <div className="flex justify-end pt-1" dir="rtl">
                    <span
                      onClick={(e) => {
                        e.stopPropagation();
                        const b = selectedEntryForPopup.bina || IilalEngine.detectBina(selectedEntryForPopup.root.fa, selectedEntryForPopup.root.ain, selectedEntryForPopup.root.lam);
                        let m = IilalEngine.buatIsimMarrah(selectedEntryForPopup.root.fa, selectedEntryForPopup.root.ain, selectedEntryForPopup.root.lam, b);
                        const v = IilalEngine.postProcessWord(m, b, selectedEntryForPopup.root.fa, selectedEntryForPopup.root.ain, selectedEntryForPopup.root.lam);
                        navigator.clipboard.writeText(v);
                      }}
                      className={`font-arabic font-black px-2 py-0.5 rounded border transition-all cursor-pointer select-all active:scale-95 inline-block ${
                        appTheme === "light"
                          ? "bg-blue-50 text-blue-950 border-blue-100/80 hover:bg-blue-100/50 hover:border-blue-300"
                          : "bg-blue-950/30 text-blue-300 border-blue-900/40 hover:bg-blue-900/25 hover:border-blue-600"
                      } ${getArabicSizeClass("text-[14px]")}`}
                      title="Klik untuk menyalin"
                    >
                      {(() => {
                        const b = selectedEntryForPopup.bina || IilalEngine.detectBina(selectedEntryForPopup.root.fa, selectedEntryForPopup.root.ain, selectedEntryForPopup.root.lam);
                        let m = IilalEngine.buatIsimMarrah(selectedEntryForPopup.root.fa, selectedEntryForPopup.root.ain, selectedEntryForPopup.root.lam, b);
                        return IilalEngine.postProcessWord(m, b, selectedEntryForPopup.root.fa, selectedEntryForPopup.root.ain, selectedEntryForPopup.root.lam);
                      })()}
                    </span>
                  </div>
                </div>

                {/* 4. Masdar Nau' */}
                <div className={`p-3 rounded-2xl border flex flex-col gap-1 text-left relative ${
                  appTheme === "light" ? "bg-slate-50/70 border-slate-100" : "bg-slate-900/30 border-slate-850"
                }`}>
                  <span className="text-[8.5px] font-black uppercase text-slate-500 font-mono tracking-wider">4. Masdar Nau'</span>
                  <div className="flex justify-end pt-1" dir="rtl">
                    <span
                      onClick={(e) => {
                        e.stopPropagation();
                        const b = selectedEntryForPopup.bina || IilalEngine.detectBina(selectedEntryForPopup.root.fa, selectedEntryForPopup.root.ain, selectedEntryForPopup.root.lam);
                        let n = IilalEngine.buatIsimNau(selectedEntryForPopup.root.fa, selectedEntryForPopup.root.ain, selectedEntryForPopup.root.lam, b);
                        const v = IilalEngine.postProcessWord(n, b, selectedEntryForPopup.root.fa, selectedEntryForPopup.root.ain, selectedEntryForPopup.root.lam);
                        navigator.clipboard.writeText(v);
                      }}
                      className={`font-arabic font-black px-2 py-0.5 rounded border transition-all cursor-pointer select-all active:scale-95 inline-block ${
                        appTheme === "light"
                          ? "bg-purple-50 text-purple-950 border-purple-100/80 hover:bg-purple-100/50 hover:border-purple-300"
                          : "bg-purple-950/30 text-purple-300 border-purple-900/40 hover:bg-purple-900/25 hover:border-purple-600"
                      } ${getArabicSizeClass("text-[14px]")}`}
                      title="Klik untuk menyalin"
                    >
                      {(() => {
                        const b = selectedEntryForPopup.bina || IilalEngine.detectBina(selectedEntryForPopup.root.fa, selectedEntryForPopup.root.ain, selectedEntryForPopup.root.lam);
                        let n = IilalEngine.buatIsimNau(selectedEntryForPopup.root.fa, selectedEntryForPopup.root.ain, selectedEntryForPopup.root.lam, b);
                        return IilalEngine.postProcessWord(n, b, selectedEntryForPopup.root.fa, selectedEntryForPopup.root.ain, selectedEntryForPopup.root.lam);
                      })()}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Explanatory Notes */}
            {selectedEntryForPopup.notes && (
              <div className={`p-3.5 rounded-2xl border text-[11px] text-left leading-relaxed ${
                appTheme === "light" ? "bg-amber-50/20 border-amber-500/10 text-gray-500" : "bg-slate-950/30 border-slate-850 text-slate-400"
              }`}>
                <span className="font-extrabold uppercase tracking-wide block mb-0.5 text-[9px] text-amber-500">Catatan Sharaf:</span>
                {selectedEntryForPopup.notes}
              </div>
            )}

            <button
              onClick={() => setSelectedEntryForPopup(null)}
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold py-2.5 rounded-xl text-xs transition active:scale-95 cursor-pointer select-none"
            >
              Tutup Rincian
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
