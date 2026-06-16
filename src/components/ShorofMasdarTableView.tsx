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
}

export default function ShorofMasdarTableView({
  entries,
  activeEntryId,
  onSelectEntry,
  isPremium = false,
  onUnlock,
}: ShorofMasdarTableViewProps) {
  const [filterSearched, setFilterSearched] = React.useState(true);
  
  const renderMasdarCell = (val: string | string[] | undefined) => {
    if (!val) return <span className="text-gray-400 font-mono text-center block">—</span>;
    
    let arr: string[] = [];
    if (Array.isArray(val)) {
      arr = val;
    } else if (typeof val === "string") {
      arr = val.split(/[,/]/).map((s) => s.trim()).filter(Boolean);
    }
    
    if (arr.length === 0) {
      return <span className="text-gray-400 font-mono text-center block">—</span>;
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
            className="font-arabic text-[14px] md:text-[15px] font-black px-2 py-0.5 bg-emerald-50 text-emerald-950 rounded border border-emerald-100/80 hover:bg-emerald-100/50 hover:border-emerald-300 transition-all cursor-pointer select-all active:scale-95 inline-block"
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
    <div className="bg-white border border-gray-100 rounded-2xl p-4 shadow-3xs space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-gray-100 pb-3">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-emerald-50 text-emerald-700 rounded-xl">
            <Table className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm md:text-md font-extrabold text-gray-900 tracking-tight">
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
                ? "bg-emerald-600 border-emerald-650 text-white shadow-3xs"
                : "bg-gray-50 text-gray-600 border-gray-200 hover:bg-gray-100"
            }`}
          >
            {filterSearched ? "Hanya Lafadz Aktif" : "Tampilkan Semua"}
          </button>
          <span className="text-[10px] bg-slate-100 text-gray-500 font-bold px-2 py-1.5 rounded-md select-none">
            {displayedEntries.length} Item
          </span>
        </div>
      </div>

      <div className="relative overflow-hidden rounded-xl border border-gray-100">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50/75 border-b border-gray-100 text-[10px] md:text-xs font-bold text-gray-500 uppercase tracking-wider select-none">
                <th className="py-3 px-3 w-12 text-center">No</th>
                <th className="py-3 px-3">Akar Kata &amp; Bina</th>
                <th className="py-3 px-3 text-right">Masdar Sama'i</th>
                <th className="py-3 px-3 text-right">Masdar Qiyasi</th>
                <th className="py-3 px-3 text-right">Masdar Marrah</th>
                <th className="py-3 px-3 text-right">Masdar Nau'</th>
              </tr>
            </thead>
            <tbody>
              {displayedEntries.map((entry, index) => {
                const isActive = entry.id === activeEntryId;
                const bina = entry.bina || IilalEngine.detectBina(entry.root.fa, entry.root.ain, entry.root.lam);
                
                // Calculate Marrah & Nau live!
                let rawMarrah = IilalEngine.buatIsimMarrah(entry.root.fa, entry.root.ain, entry.root.lam, bina);
                let rawNau = IilalEngine.buatIsimNau(entry.root.fa, entry.root.ain, entry.root.lam, bina);
                
                const marrah = IilalEngine.postProcessWord(rawMarrah, bina, entry.root.fa, entry.root.ain, entry.root.lam);
                const nau = IilalEngine.postProcessWord(rawNau, bina, entry.root.fa, entry.root.ain, entry.root.lam);
  
                return (
                  <tr
                    key={entry.id}
                    onClick={() => onSelectEntry?.(entry)}
                    className={`border-b border-gray-50 transition-colors text-xs cursor-pointer ${
                      isActive 
                        ? "bg-emerald-50/40 hover:bg-emerald-50/60" 
                        : "hover:bg-slate-50/50"
                    }`}
                  >
                    {/* Column 1: No */}
                    <td className="py-3 px-3 text-center text-gray-400 font-mono font-bold">
                      {index + 1}
                    </td>
  
                    {/* Column 2: Akar Kata & Bina */}
                    <td className="py-3 px-3">
                      <div className="flex items-center gap-1.5">
                        <div className="text-right" dir="rtl">
                          <span className="font-arabic text-[15px] font-black text-slate-900 tracking-wide select-all">
                            {entry.root.fa}ـ{entry.root.ain}ـ{entry.root.lam}
                          </span>
                        </div>
                        <div className="min-w-0">
                          <span className="font-mono text-[9px] text-gray-400 block tracking-tight uppercase leading-none">
                            {entry.root.fa} + {entry.root.ain} + {entry.root.lam}
                          </span>
                          <div className="flex items-center gap-1 mt-0.5">
                            <span className="text-[8px] font-bold px-1.5 py-0.2 rounded bg-amber-50 text-amber-800 border border-amber-100/50">
                              {bina}
                            </span>
                            <span className="text-[8px] text-gray-400 truncate max-w-[120px] md:max-w-xs block" title={entry.translation}>
                              {entry.translation}
                            </span>
                          </div>
                        </div>
                      </div>
                    </td>
  
                    {/* Column 3: Masdar Sama'i */}
                    <td className="py-3 px-3 text-right">
                      {renderMasdarCell(entry.masdarSamai)}
                    </td>
  
                    {/* Column 4: Masdar Qiyasi */}
                    <td className="py-3 px-3 text-right">
                      {renderMasdarCell(entry.masdarQiyasi)}
                    </td>
  
                    {/* Column 5: Masdar Marrah */}
                    <td className="py-3 px-3 text-right">
                      <div className="flex justify-end" dir="rtl">
                        <span
                          onClick={(e) => {
                            e.stopPropagation();
                            navigator.clipboard.writeText(marrah);
                          }}
                          className="font-arabic text-[14px] md:text-[15px] font-black px-2 py-0.5 bg-blue-50 text-blue-950 rounded border border-blue-100/80 hover:bg-blue-100/50 hover:border-blue-300 transition-all cursor-pointer select-all active:scale-95 inline-block"
                          title="Klik untuk menyalin"
                        >
                          {marrah}
                        </span>
                      </div>
                    </td>
  
                    {/* Column 6: Masdar Nau' */}
                    <td className="py-3 px-3 text-right">
                      <div className="flex justify-end" dir="rtl">
                        <span
                          onClick={(e) => {
                            e.stopPropagation();
                            navigator.clipboard.writeText(nau);
                          }}
                          className="font-arabic text-[14px] md:text-[15px] font-black px-2 py-0.5 bg-purple-50 text-purple-950 rounded border border-purple-100/80 hover:bg-purple-100/50 hover:border-purple-300 transition-all cursor-pointer select-all active:scale-95 inline-block"
                          title="Klik untuk menyalin"
                        >
                          {nau}
                        </span>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
