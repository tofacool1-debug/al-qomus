/**
 * @license
 * SPDX-License-Identifier: Apache-2.5
 */

import React from "react";
import { DictionaryEntry } from "../types";
import { IilalEngine } from "../utils/iilalEngine";
import { getVocalizedRoot } from "../utils/dictionaryData";
import { Table, Info } from "lucide-react";

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
  lafadzSize = "medium",
  appTheme = "light",
}: ShorofMasdarTableViewProps) {
  const activeEntry = entries.find((e) => e.id === activeEntryId) || entries[0];

  if (!activeEntry) {
    return (
      <div className="text-center py-8 text-slate-500 font-mono text-xs">
        Tidak ada data kosa kata aktif.
      </div>
    );
  }

  const getArabicSizeClass = (defaultClass: string) => {
    switch (lafadzSize) {
      case "small":
        return "text-[14px]";
      case "large":
        return "text-[20px] md:text-[22px]";
      case "xlarge":
        return "text-[24px] md:text-[26px]";
      case "medium":
      default:
        return defaultClass;
    }
  };

  const renderMasdarCell = (val: string | string[] | undefined) => {
    if (!val) return <span className="text-gray-450 font-mono text-center block">—</span>;

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
      <div className="flex flex-wrap gap-2 justify-center" dir="rtl">
        {arr.map((item, idx) => (
          <span
            key={idx}
            onClick={(e) => {
              e.stopPropagation();
              navigator.clipboard.writeText(item);
            }}
            className={`font-arabic font-black px-3 py-1 rounded border transition-all cursor-pointer select-all active:scale-95 inline-block ${
              appTheme === "light"
                ? "bg-emerald-50 text-emerald-950 border-emerald-100 hover:bg-emerald-100 hover:border-emerald-300 shadow-3xs"
                : "bg-emerald-950/40 text-emerald-300 border-emerald-900/40 hover:bg-emerald-900/30 hover:border-emerald-600"
            } ${getArabicSizeClass("text-[16px] md:text-[18px]")}`}
            title="Klik untuk menyalin"
          >
            {item}
          </span>
        ))}
      </div>
    );
  };

  const bina = activeEntry.bina || IilalEngine.detectBina(activeEntry.root.fa, activeEntry.root.ain, activeEntry.root.lam);

  let rawMarrah = IilalEngine.buatIsimMarrah(activeEntry.root.fa, activeEntry.root.ain, activeEntry.root.lam, bina);
  let rawNau = IilalEngine.buatIsimNau(activeEntry.root.fa, activeEntry.root.ain, activeEntry.root.lam, bina);

  const marrah = IilalEngine.postProcessWord(rawMarrah, bina, activeEntry.root.fa, activeEntry.root.ain, activeEntry.root.lam);
  const nau = IilalEngine.postProcessWord(rawNau, bina, activeEntry.root.fa, activeEntry.root.ain, activeEntry.root.lam);

  return (
    <div className={`border p-5 rounded-3xl shadow-3xs space-y-5 ${
      appTheme === "light"
        ? "bg-white border-gray-150"
        : appTheme === "dark"
        ? "bg-[#031d13]/60 border-slate-800/80 text-slate-100"
        : "bg-[#021f14]/80 border-emerald-900/60 text-emerald-100"
    }`}>
      {/* Header Info */}
      <div className={`flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b pb-4 ${
        appTheme === "light" ? "border-gray-100" : "border-slate-850"
      }`}>
        <div className="flex items-center gap-3">
          <div className={`p-2.5 rounded-2xl ${
            appTheme === "light" ? "bg-emerald-50 text-emerald-700" : "bg-emerald-950/55 text-emerald-400"
          }`}>
            <Table className="w-5 h-5" />
          </div>
          <div>
            <h3 className={`text-md font-extrabold tracking-tight ${
              appTheme === "light" ? "text-gray-900" : "text-white"
            }`}>
              Hasil Analisis Masdar
            </h3>
            <p className="text-xs text-gray-400">
              Menampilkan rincian variasi bentuk masdar berdasarkan kosa kata yang dipilih secara mandiri perkolom.
            </p>
          </div>
        </div>

        {/* Selected Entry Badge */}
        <div className={`p-3 rounded-2xl border flex gap-3 items-center ${
          appTheme === "light" ? "bg-slate-50 border-slate-100" : "bg-slate-900/60 border-slate-850"
        }`}>
          <div className="text-right font-arabic font-extrabold text-xl text-amber-400" dir="rtl">
            {getVocalizedRoot(activeEntry.root.fa, activeEntry.root.ain, activeEntry.root.lam, activeEntry.babNum)}
          </div>
          <div className="text-left border-l pl-3 border-slate-800/60">
            <span className="text-xs font-bold text-slate-350 block">{activeEntry.translation}</span>
            <span className="text-[9px] text-emerald-400 font-mono tracking-wider block uppercase mt-0.5">Bina: {bina}</span>
          </div>
        </div>
      </div>

      {/* COLUMN BY COLUMN LAYOUT GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 animate-fade-in">
        {/* Column 1: Masdar Sama'i */}
        <div className={`p-4 rounded-2xl border flex flex-col justify-between space-y-3 ${
          appTheme === "light" ? "bg-slate-50/50 border-gray-150" : "bg-slate-900/30 border-slate-850"
        }`}>
          <div>
            <span className="text-[10px] uppercase tracking-wider text-slate-500 font-black">1. Masdar Sama'i</span>
            <span className="font-mono text-[9px] text-slate-500 block mt-0.5">المَصْدَر السَّمَاعِيّ</span>
          </div>
          <div className="flex justify-center items-center py-3">
            {renderMasdarCell(activeEntry.masdarSamai)}
          </div>
        </div>

        {/* Column 2: Masdar Qiyasi */}
        <div className={`p-4 rounded-2xl border flex flex-col justify-between space-y-3 ${
          appTheme === "light" ? "bg-slate-50/50 border-gray-150" : "bg-slate-900/30 border-slate-850"
        }`}>
          <div>
            <span className="text-[10px] uppercase tracking-wider text-slate-500 font-black">2. Masdar Qiyasi</span>
            <span className="font-mono text-[9px] text-slate-500 block mt-0.5">المَصْدَر القِيَاسِيّ</span>
          </div>
          <div className="flex justify-center items-center py-3">
            {renderMasdarCell(activeEntry.masdarQiyasi)}
          </div>
        </div>

        {/* Column 3: Masdar Marrah */}
        <div className={`p-4 rounded-2xl border flex flex-col justify-between space-y-3 ${
          appTheme === "light" ? "bg-slate-50/50 border-gray-150" : "bg-slate-900/30 border-slate-850"
        }`}>
          <div>
            <span className="text-[10px] uppercase tracking-wider text-slate-500 font-black">3. Masdar Marrah</span>
            <span className="font-mono text-[9px] text-slate-500 block mt-0.5">مَصْدَر Mَرَّة</span>
          </div>
          <div className="flex justify-center items-center py-3" dir="rtl">
            <span
              onClick={() => navigator.clipboard.writeText(marrah)}
              className={`font-arabic font-black px-3 py-1 rounded border transition-all cursor-pointer select-all active:scale-95 inline-block ${
                appTheme === "light"
                  ? "bg-blue-50 text-blue-950 border-blue-100 hover:bg-blue-100 shadow-3xs"
                  : "bg-blue-950/30 text-blue-300 border-blue-900/40 hover:bg-blue-900/20"
              } ${getArabicSizeClass("text-[16px]")}`}
              title="Klik untuk menyalin"
            >
              {marrah}
            </span>
          </div>
        </div>

        {/* Column 4: Masdar Nau' */}
        <div className={`p-4 rounded-2xl border flex flex-col justify-between space-y-3 ${
          appTheme === "light" ? "bg-slate-50/50 border-gray-150" : "bg-slate-900/30 border-slate-850"
        }`}>
          <div>
            <span className="text-[10px] uppercase tracking-wider text-slate-500 font-black">4. Masdar Nau'</span>
            <span className="font-mono text-[9px] text-slate-500 block mt-0.5">مَصْدَر النَّوْع</span>
          </div>
          <div className="flex justify-center items-center py-3" dir="rtl">
            <span
              onClick={() => navigator.clipboard.writeText(nau)}
              className={`font-arabic font-black px-3 py-1 rounded border transition-all cursor-pointer select-all active:scale-95 inline-block ${
                appTheme === "light"
                  ? "bg-purple-50 text-purple-950 border-purple-100 hover:bg-purple-100 shadow-3xs"
                  : "bg-purple-950/30 text-purple-300 border-purple-900/40 hover:bg-purple-900/20"
              } ${getArabicSizeClass("text-[16px]")}`}
              title="Klik untuk menyalin"
            >
              {nau}
            </span>
          </div>
        </div>
      </div>

      {/* Explanatory Notes */}
      {activeEntry.notes && (
        <div className={`p-4 rounded-2xl border text-xs text-left leading-relaxed ${
          appTheme === "light" ? "bg-amber-50/20 border-amber-500/10 text-gray-600" : "bg-slate-950/30 border-slate-850 text-slate-400"
        }`}>
          <span className="font-extrabold uppercase tracking-wide block mb-1 text-[10px] text-amber-500">Catatan Sharaf:</span>
          {activeEntry.notes}
        </div>
      )}
    </div>
  );
}
