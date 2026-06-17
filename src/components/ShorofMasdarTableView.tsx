/**
 * @license
 * SPDX-License-Identifier: Apache-2.5
 */

import React from "react";
import { DictionaryEntry } from "../types";
import { IilalEngine } from "../utils/iilalEngine";
import { Table, Bookmark, Lock, Sparkles } from "lucide-react";

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
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {displayedEntries.map((entry, index) => {
          const isActive = entry.id === activeEntryId;
          const bina = entry.bina || IilalEngine.detectBina(entry.root.fa, entry.root.ain, entry.root.lam);
          
          let rawMarrah = IilalEngine.buatIsimMarrah(entry.root.fa, entry.root.ain, entry.root.lam, bina);
          let rawNau = IilalEngine.buatIsimNau(entry.root.fa, entry.root.ain, entry.root.lam, bina);
          
          const marrah = IilalEngine.postProcessWord(rawMarrah, bina, entry.root.fa, entry.root.ain, entry.root.lam);
          const nau = IilalEngine.postProcessWord(rawNau, bina, entry.root.fa, entry.root.ain, entry.root.lam);

          return (
            <div
              key={entry.id}
              onClick={() => onSelectEntry?.(entry)}
              className={`p-4 rounded-2xl border transition-all duration-200 flex flex-col gap-3.5 relative cursor-pointer group hover:scale-[1.01] ${
                isActive
                  ? appTheme === "light"
                    ? "bg-emerald-55 border-emerald-400 text-slate-900 shadow-md"
                    : "bg-emerald-950/20 border-emerald-500/80 text-white shadow-lg"
                  : appTheme === "light"
                  ? "border-gray-150 hover:bg-slate-50 text-gray-750 bg-white"
                  : "border-slate-800 bg-slate-950/25 hover:bg-slate-900/40 text-slate-300"
              }`}
            >
              {/* Header inside the list card */}
              <div className="flex items-start justify-between gap-2 border-b border-dashed border-emerald-500/10 pb-2.5">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-[9px] font-bold text-gray-400 bg-slate-550/10 w-5 h-5 flex items-center justify-center rounded-full shrink-0">
                    {index + 1}
                  </span>
                  <div>
                    <h4 className={`text-xs md:text-sm font-black truncate ${isActive ? "text-emerald-400 font-extrabold" : ""}`}>
                      {entry.translation}
                    </h4>
                    <span className="text-[9px] text-gray-400 uppercase tracking-wide block font-mono">
                      {entry.root.fa} + {entry.root.ain} + {entry.root.lam}
                    </span>
                  </div>
                </div>

                <div className="text-right flex flex-col items-end gap-1 shrink-0">
                  <div className="font-arabic font-extrabold text-lg flex items-center gap-0.5" dir="rtl">
                    <span className="text-amber-400 font-black">{entry.root.fa}</span>
                    <span className={appTheme === "light" ? "text-slate-800" : "text-white"}>
                      ـ{entry.root.ain}ـ{entry.root.lam}
                    </span>
                  </div>
                  <span className={`text-[8px] font-bold px-1.5 py-0.2 rounded font-sans border ${
                    appTheme === "light"
                      ? "bg-amber-50 text-amber-800 border-amber-100/50"
                      : "bg-amber-950/25 text-amber-400 border-amber-900/30"
                  }`}>
                    {bina}
                  </span>
                </div>
              </div>

              {/* 4 Masdar Variations Stacked as list block */}
              <div className="grid grid-cols-2 gap-2 mt-0.5">
                {/* 1. Masdar Sama'i */}
                <div className={`p-2 rounded-xl border flex flex-col gap-1 ${
                  appTheme === "light" ? "bg-slate-50/70 border-slate-100" : "bg-slate-900/30 border-slate-850"
                }`}>
                  <span className="text-[8.5px] font-black uppercase text-slate-500 font-mono tracking-wider">1. Masdar Sama'i</span>
                  <div className="flex justify-end pt-0.5">
                    {renderMasdarCell(entry.masdarSamai)}
                  </div>
                </div>

                {/* 2. Masdar Qiyasi */}
                <div className={`p-2 rounded-xl border flex flex-col gap-1 ${
                  appTheme === "light" ? "bg-slate-50/70 border-slate-100" : "bg-slate-900/30 border-slate-850"
                }`}>
                  <span className="text-[8.5px] font-black uppercase text-slate-500 font-mono tracking-wider">2. Masdar Qiyasi</span>
                  <div className="flex justify-end pt-0.5">
                    {renderMasdarCell(entry.masdarQiyasi)}
                  </div>
                </div>

                {/* 3. Masdar Marrah */}
                <div className={`p-2 rounded-xl border flex flex-col gap-1 ${
                  appTheme === "light" ? "bg-slate-50/70 border-slate-100" : "bg-slate-900/30 border-slate-850"
                }`}>
                  <span className="text-[8.5px] font-black uppercase text-slate-500 font-mono tracking-wider">3. Masdar Marrah</span>
                  <div className="flex justify-end pt-0.5" dir="rtl">
                    <span
                      onClick={(e) => {
                        e.stopPropagation();
                        navigator.clipboard.writeText(marrah);
                      }}
                      className={`font-arabic font-black px-2 py-0.5 rounded border transition-all cursor-pointer select-all active:scale-95 inline-block ${
                        appTheme === "light"
                          ? "bg-blue-50 text-blue-950 border-blue-100/80 hover:bg-blue-100/50 hover:border-blue-300"
                          : "bg-blue-950/30 text-blue-300 border-blue-900/40 hover:bg-blue-900/20 hover:border-blue-600"
                      } ${getArabicSizeClass("text-[13px]")}`}
                      title="Klik untuk menyalin"
                    >
                      {marrah}
                    </span>
                  </div>
                </div>

                {/* 4. Masdar Nau' */}
                <div className={`p-2 rounded-xl border flex flex-col gap-1 ${
                  appTheme === "light" ? "bg-slate-50/70 border-slate-100" : "bg-slate-900/30 border-slate-850"
                }`}>
                  <span className="text-[8.5px] font-black uppercase text-slate-500 font-mono tracking-wider">4. Masdar Nau'</span>
                  <div className="flex justify-end pt-0.5" dir="rtl">
                    <span
                      onClick={(e) => {
                        e.stopPropagation();
                        navigator.clipboard.writeText(nau);
                      }}
                      className={`font-arabic font-black px-2 py-0.5 rounded border transition-all cursor-pointer select-all active:scale-95 inline-block ${
                        appTheme === "light"
                          ? "bg-purple-50 text-purple-950 border-purple-100/80 hover:bg-purple-100/50 hover:border-purple-300"
                          : "bg-purple-950/30 text-purple-300 border-purple-900/40 hover:bg-purple-900/20 hover:border-purple-600"
                      } ${getArabicSizeClass("text-[13px]")}`}
                      title="Klik untuk menyalin"
                    >
                      {nau}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
