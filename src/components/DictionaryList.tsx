/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from "react";
import { Search, BookOpen, Star, Filter, ChevronRight, Menu } from "lucide-react";
import { DictionaryEntry } from "../types";
import { PRESET_DICTIONARY } from "../utils/dictionaryData";
import { IilalEngine } from "../utils/iilalEngine";
import { loadEntriesFromIndexedDB, saveEntriesToIndexedDB } from "../utils/indexedDb";

interface DictionaryListProps {
  selectedEntryId: string;
  onSelectEntry: (entry: DictionaryEntry) => void;
  onOpenMenu?: () => void;
  appTheme?: "dark" | "light" | "green";
}

const BAB_DETAILS_MAP: Record<number, { title: string; pattern: string; color: string; bg: string; text: string }> = {
  1: {
    title: "Fathul-Dhammi",
    pattern: "فَعَلَ - يَفْعُلُ",
    color: "emerald",
    bg: "bg-emerald-50 text-emerald-900 border-emerald-100",
    text: "text-emerald-700"
  },
  2: {
    title: "Fathul-Kasri",
    pattern: "فَعَلَ - يَفْعِلُ",
    color: "blue",
    bg: "bg-blue-50 text-blue-900 border-blue-100",
    text: "text-blue-700"
  },
  3: {
    title: "Fathatani",
    pattern: "فَعَلَ - يَفْعَلُ",
    color: "purple",
    bg: "bg-purple-50 text-purple-900 border-purple-100",
    text: "text-purple-700"
  },
  4: {
    title: "Kasrul-Fathi",
    pattern: "فَعِلَ - يَفْعَلُ",
    color: "amber",
    bg: "bg-amber-50 text-amber-900 border-amber-100",
    text: "text-amber-700"
  },
  5: {
    title: "Dhammud-Dhammi",
    pattern: "فَعُلَ - يَفْعُلُ",
    color: "rose",
    bg: "bg-rose-50 text-rose-900 border-rose-100",
    text: "text-rose-700"
  },
  6: {
    title: "Kasratani",
    pattern: "فَعِلَ - يَفْعِلُ",
    color: "indigo",
    bg: "bg-indigo-50 text-indigo-900 border-indigo-100",
    text: "text-indigo-700"
  }
};

// Helper to categorize Bina' clearly for user classes
const getBinaGroupLabel = (entry: DictionaryEntry): string => {
  if (entry.bina) {
    const b = entry.bina.toLowerCase();
    if (b === "shohih") return "Bina' Shohih";
    if (b === "mitsal") return "Bina' Mitsal";
    if (b === "ajwaf") return "Bina' Ajwaf";
    if (b === "naqis") return "Bina' Naqis";
    if (b === "mudhoaf" || b === "mudho'af") return "Bina' Mudho'af";
    if (b.startsWith("lafif")) return "Bina' Lafif";
    if (b.startsWith("mahmuz")) return "Bina' Mahmuz";
  }
  const rawBina = IilalEngine.detectBina(entry.root.fa, entry.root.ain, entry.root.lam);
  if (rawBina === "Shohih") return "Bina' Shohih";
  if (rawBina === "Mitsal") return "Bina' Mitsal";
  if (rawBina === "Ajwaf") return "Bina' Ajwaf";
  if (rawBina === "Naqis") return "Bina' Naqis";
  if (rawBina === "Mudho'af") return "Bina' Mudho'af";
  if (rawBina.startsWith("Lafif")) return "Bina' Lafif";
  if (rawBina.startsWith("Mahmuz")) return "Bina' Mahmuz";
  return "Bina' Shohih"; // default fallback
};

export default function DictionaryList({
  selectedEntryId,
  onSelectEntry,
  onOpenMenu,
  appTheme = "dark",
}: DictionaryListProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedBab, setSelectedBab] = useState<number | "all">(1);
  const [selectedBina, setSelectedBina] = useState<string | "all">("Bina' Shohih");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [expandedBabFolders, setExpandedBabFolders] = useState<Record<number, boolean>>(() => ({
    1: true, // Bab 1 open by default
  }));
  const [expandedBinaFolders, setExpandedBinaFolders] = useState<Record<string, boolean>>({});
  const [expandedFaFolders, setExpandedFaFolders] = useState<Record<string, boolean>>({});
  const [entries, setEntries] = useState<DictionaryEntry[]>(PRESET_DICTIONARY);
  const [isLoading, setIsLoading] = useState(false);

  // Load dynamically from Express /api/lafadz-db with IndexedDB caching on mount
  React.useEffect(() => {
    let active = true;
    const loadDBSources = async () => {
      setIsLoading(true);
      
      // Step 1: Load from IndexedDB immediately for instant initial rendering
      try {
        const cached = await loadEntriesFromIndexedDB();
        if (active && cached && cached.length > 0) {
          setEntries(cached);
          console.log(`Loaded ${cached.length} entries from IndexedDB cache.`);
        }
      } catch (cacheErr) {
        console.warn("Gagal memuat cache IndexedDB:", cacheErr);
      }

      // Step 2: Fetch updated elements from the server and replenish the cache
      try {
        const res = await fetch("/api/lafadz-db");
        if (res.ok) {
          const result = await res.json();
          if (result && result.success && Array.isArray(result.data)) {
            const mapped: DictionaryEntry[] = result.data.map((item: any, idx: number) => {
              const rootStr = `${item.fa}${item.ain}${item.lam}`;
              return {
                id: item.id || `db-${rootStr}-${idx}`,
                root: {
                  fa: item.fa,
                  ain: item.ain,
                  lam: item.lam
                },
                translation: item.translation,
                babNum: Number(item.babNum) || 1,
                notes: item.explanation,
                sifatMusyabihat: item.sifatMusyabihat,
                sifatMusyabihatPlural: item.sifatMusyabihatPlural,
                isimFailPlural: item.isimFailPlural,
                isimMafulPlural: item.isimMafulPlural,
                isimZamanMakanPlural: item.isimZamanMakanPlural,
                isimAlatPlural: item.isimAlatPlural,
                bina: item.bina,
                asal: item.asal,
                shorof: item.shorof
              };
            });
            if (active && mapped.length > 0) {
              setEntries(mapped);
              await saveEntriesToIndexedDB(mapped);
            }
          }
        }
      } catch (err) {
        console.warn("Gagal memuat lafadz dari database server, menggunakan preset bawaan:", err);
      } finally {
        if (active) setIsLoading(false);
      }
    };
    loadDBSources();
    return () => {
      active = false;
    };
  }, []);

  const toggleBabFolder = (babNum: number) => {
    setExpandedBabFolders((prev) => {
      const currentVal = prev[babNum] !== undefined 
        ? prev[babNum] 
        : (searchTerm.trim().length > 0 || selectedBab !== "all");
      return {
        ...prev,
        [babNum]: !currentVal,
      };
    });
  };

  const toggleBinaFolder = (babNum: number, binaGroup: string) => {
    const key = `${babNum}-${binaGroup}`;
    setExpandedBinaFolders((prev) => {
      const currentVal = prev[key] !== undefined 
        ? prev[key] 
        : (searchTerm.trim().length > 0 || selectedBina !== "all");
      return {
        ...prev,
        [key]: !currentVal,
      };
    });
  };

  const toggleFaFolder = (babNum: number, binaGroup: string, fa: string) => {
    const key = `${babNum}-${binaGroup}-${fa}`;
    setExpandedFaFolders((prev) => {
      const currentVal = prev[key] !== undefined 
        ? prev[key] 
        : (searchTerm.trim().length > 0);
      return {
        ...prev,
        [key]: !currentVal,
      };
    });
  };

  const filteredEntries = useMemo(() => {
    let list = entries;
    
    // Filter by Bab
    if (selectedBab !== "all") {
      list = list.filter((item) => item.babNum === selectedBab);
    }

    // Filter by Bina'
    if (selectedBina !== "all") {
      list = list.filter((item) => getBinaGroupLabel(item) === selectedBina);
    }

    // Filter by Search Term
    if (!searchTerm.trim()) return list;
    
    const lower = searchTerm.toLowerCase();
    return list.filter((entry) => {
      const rootStr = `${entry.root.fa}${entry.root.ain}${entry.root.lam}`;
      const rootSpaces = `${entry.root.fa} ${entry.root.ain} ${entry.root.lam}`;
      return (
        entry.translation.toLowerCase().includes(lower) ||
        entry.id.toLowerCase().includes(lower) ||
        rootStr.includes(lower) ||
        rootSpaces.includes(lower)
      );
    });
  }, [searchTerm, selectedBab, selectedBina, entries]);

  // Group filtered entries by Bab, and then by their Bina' category
  const groupedEntries = useMemo(() => {
    const groups: Record<number, Record<string, DictionaryEntry[]>> = {};
    filteredEntries.forEach((entry) => {
      const bab = entry.babNum;
      const binaGroup = getBinaGroupLabel(entry);
      if (!groups[bab]) {
        groups[bab] = {};
      }
      if (!groups[bab][binaGroup]) {
        groups[bab][binaGroup] = [];
      }
      groups[bab][binaGroup].push(entry);
    });
    return groups;
  }, [filteredEntries]);

  // Sorted Babs present in the search result
  const activeBabs = useMemo(() => {
    return Object.keys(groupedEntries)
      .map(Number)
      .sort((a, b) => a - b);
  }, [groupedEntries]);

  return (
    <div
      id="dictionary-list-card"
      className={`rounded-2xl border p-5 shadow-xs flex flex-col gap-4 ${
        appTheme === "light"
          ? "bg-white border-gray-150 text-gray-800"
          : appTheme === "dark"
          ? "bg-slate-900/60 border-slate-800/80 text-slate-100"
          : "bg-[#032216]/80 border-emerald-800/40 text-emerald-100"
      }`}
    >
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-emerald-50 rounded-lg text-emerald-600">
            <BookOpen className="w-5 h-5" />
          </div>
          <div>
            <h2 className={`font-semibold text-sm md:text-base ${appTheme === "light" ? "text-gray-900" : "text-white"}`}>
              Kamus Kata Kerja Pilihan
            </h2>
            <p className={`text-xs ${appTheme === "light" ? "text-gray-500" : "text-slate-400"}`}>Pilih akar kata (tsulatsi mujarrad)</p>
          </div>
        </div>
        {isLoading && (
          <span className="text-[9px] bg-emerald-100/70 text-emerald-800 px-2 py-0.5 rounded-full font-medium flex items-center gap-1.5 shrink-0 animate-pulse">
            <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></span>
            Cloud DB
          </span>
        )}
      </div>

      {/* Search Input */}
      <div className="relative">
        <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
        <input
          type="text"
          placeholder="Cari terjemah, latin, atau huruf Arab..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className={`w-full pl-9 pr-4 py-2 border rounded-xl text-xs md:text-sm focus:outline-hidden focus:border-emerald-500 bg-gray-50/50 focus:bg-white transition-all cursor-text ${
            appTheme === "light"
              ? "border-gray-200 text-gray-800"
              : appTheme === "dark"
              ? "border-slate-850 bg-slate-950/40 text-white focus:bg-slate-950"
              : "border-emerald-950 bg-emerald-955/65 text-emerald-105 focus:bg-emerald-955"
          }`}
        />
      </div>

      {/* TRIGGER UNTUK POP-UP FILTER BAB & BINA' */}
      <div className={`p-3 rounded-xl border flex items-center justify-between gap-2 shadow-3xs ${
        appTheme === "light"
          ? "bg-slate-50 border-slate-200"
          : appTheme === "dark"
          ? "bg-slate-950/40 border-slate-850"
          : "bg-emerald-955/40 border-emerald-900/60"
      }`}>
        <div className="flex flex-col min-w-0">
          <div className={`text-[9px] uppercase font-bold tracking-wider ${
            appTheme === "light" ? "text-slate-400" : "text-slate-500"
          }`}>
            Kategori Aktif
          </div>
          <div className={`text-[11px] font-black truncate flex items-center gap-1.5 mt-0.5 ${
            appTheme === "light" ? "text-slate-800" : "text-slate-200"
          }`}>
            <span className="text-emerald-500">
              {selectedBab === "all" ? "Semua Bab" : `Bab ${selectedBab}`}
            </span>
            <span className="text-slate-500">•</span>
            <span className="text-amber-500">
              {selectedBina === "all" ? "Semua Bina'" : selectedBina.replace("Bina' ", "")}
            </span>
          </div>
        </div>
        <button
          type="button"
          onClick={() => setIsFilterOpen(true)}
          className="px-3 py-1.5 rounded-lg text-[10px] font-extrabold bg-emerald-600 hover:bg-emerald-500 text-white flex items-center gap-1 cursor-pointer transition-all active:scale-95 border border-emerald-500/10 shadow-3xs hover:shadow-xs shrink-0"
        >
          <Filter className="w-3 h-3" />
          Filter Pop-Up
        </button>
      </div>

      {/* Grouped Entries List */}
      <div className="max-h-[420px] overflow-y-auto space-y-4 pr-1 scrollbar-thin">
        {activeBabs.length > 0 ? (
          activeBabs.map((babNum) => {
            const babInfo = BAB_DETAILS_MAP[babNum];
            const binaGroups = groupedEntries[babNum] || {};
            const binaFolders = Object.keys(binaGroups).sort();

            const isBabExpanded = expandedBabFolders[babNum] !== undefined 
              ? expandedBabFolders[babNum] 
              : (searchTerm.trim().length > 0 || selectedBab !== "all");
            return (
              <div key={`group-bab-${babNum}`} className="space-y-3">
                {/* Bab Header Folder (Buka Tutup) */}
                <button
                  type="button"
                  onClick={() => toggleBabFolder(babNum)}
                  className={`w-full p-2 rounded-xl border flex items-center justify-between shadow-xs transition-all cursor-pointer hover:scale-[1.01] active:scale-99 text-left ${babInfo.bg}`}
                >
                  <div className="flex flex-col">
                    <span className="text-[10px] font-black uppercase tracking-wider">
                      Bab {babNum}: {babInfo.title}
                    </span>
                    <span className="text-[8px] opacity-75 font-bold tracking-widest uppercase mt-0.5">
                      {isBabExpanded ? "Ketik untuk Lipat ▲" : "Ketuk untuk Buka ▼"}
                    </span>
                  </div>
                  <span className="font-arabic text-xs font-bold bg-white/75 px-2 py-0.5 rounded-md text-slate-950 shadow-3xs select-none">
                    {babInfo.pattern}
                  </span>
                </button>

                {/* Sub-groups by Bina Category */}
                {isBabExpanded && (
                  <div className="space-y-3 pl-1">
                  {binaFolders.map((binaGroup) => {
                    const groupEntries = binaGroups[binaGroup] || [];
                    const isExpanded = expandedBinaFolders[`${babNum}-${binaGroup}`] !== undefined 
                      ? expandedBinaFolders[`${babNum}-${binaGroup}`] 
                      : (searchTerm.trim().length > 0 || selectedBina !== "all");
                    return (
                      <div
                        key={`bab-${babNum}-bina-${binaGroup}`}
                        className={`space-y-2 border rounded-xl p-1.5 ${
                          appTheme === "light"
                            ? "border-slate-100/80 bg-slate-50/30"
                            : appTheme === "dark"
                            ? "border-slate-800/60 bg-slate-950/20"
                            : "border-emerald-900/60 bg-emerald-955/40"
                        }`}
                      >
                        {/* Folder Sub-header */}
                        <button
                          type="button"
                          onClick={() => toggleBinaFolder(babNum, binaGroup)}
                          className={`w-full flex items-center justify-between text-left px-2 py-1.5 rounded-lg transition-colors cursor-pointer group ${
                            appTheme === "light"
                              ? "hover:bg-slate-100"
                              : appTheme === "dark"
                              ? "hover:bg-slate-900"
                              : "hover:bg-emerald-950/50"
                          }`}
                        >
                          <div className="flex items-center gap-2">
                            <span className={`text-[10px] font-extrabold px-2.5 py-0.5 rounded-lg shadow-3xs select-none border ${
                              appTheme === "light"
                                ? "bg-indigo-50 border-indigo-100 text-indigo-800"
                                : "bg-indigo-950/50 border-indigo-900 text-indigo-300"
                            }`}>
                              {binaGroup}
                            </span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <span className={`text-[9px] px-2 py-0.5 rounded-md font-sans font-bold ${
                              appTheme === "light"
                                ? "text-emerald-700 bg-emerald-50"
                                : "text-emerald-400 bg-emerald-950/80"
                            }`}>
                              {isExpanded ? "Tutup ▲" : "Buka ▼"}
                            </span>
                          </div>
                        </button>

                        {/* Words starting with this letter (Grouping by fa' fi'il) */}
                        {isExpanded && (
                          <div className="space-y-2.5 pl-1.5 pt-1 border-l border-emerald-500/20">
                            {(() => {
                              // Group entries by fa' fi'il
                              const faGroups: Record<string, DictionaryEntry[]> = {};
                              groupEntries.forEach((entry) => {
                                const fa = entry.root.fa.trim() || "?";
                                if (!faGroups[fa]) {
                                  faGroups[fa] = [];
                                }
                                faGroups[fa].push(entry);
                              });
                              const faLetters = Object.keys(faGroups).sort();

                              return faLetters.map((faLetter) => {
                                const subEntries = faGroups[faLetter];
                                const faKey = `${babNum}-${binaGroup}-${faLetter}`;
                                const isFaExpanded = expandedFaFolders[faKey] !== undefined 
                                  ? expandedFaFolders[faKey] 
                                  : (searchTerm.trim().length > 0);

                                return (
                                  <div
                                    key={faKey}
                                    className={`space-y-1 rounded-xl p-1 border ${
                                      appTheme === "light"
                                        ? "bg-slate-50/50 border-slate-100"
                                        : appTheme === "dark"
                                        ? "bg-slate-950/40 border-slate-850"
                                        : "bg-emerald-955/50 border-emerald-900/60"
                                    }`}
                                  >
                                    {/* Fa' Fi'il Collapsible Accordion Trigger */}
                                    <button
                                      type="button"
                                      onClick={() => toggleFaFolder(babNum, binaGroup, faLetter)}
                                      className={`w-full flex items-center justify-between text-left px-2 py-1.5 rounded-lg transition-colors cursor-pointer text-[10px] font-extrabold ${
                                        appTheme === "light"
                                          ? "bg-amber-100/40 hover:bg-amber-100 text-amber-900"
                                          : appTheme === "dark"
                                          ? "bg-slate-900 hover:bg-slate-850 text-amber-300"
                                          : "bg-emerald-950 hover:bg-emerald-900 text-amber-300"
                                      }`}
                                    >
                                      <div className="flex items-center gap-1.5">
                                        <span className="opacity-75">Fa' Fi'il:</span>
                                        <span className="font-arabic text-sm text-deep-amber-500 font-extrabold select-none bg-amber-500/10 px-1.5 py-0.2 rounded border border-amber-500/10">
                                          {faLetter}
                                        </span>
                                        <span className="text-[9px] text-slate-400 font-normal">
                                          ({subEntries.length} Lafadz)
                                        </span>
                                      </div>
                                      <span className="text-[8px] font-black text-emerald-500 tracking-wider">
                                        {isFaExpanded ? "LIPAT ▲" : "BUKA ▼"}
                                      </span>
                                    </button>

                                    {/* Collapsed entries list */}
                                    {isFaExpanded && (
                                      <div className="space-y-1 pt-1.5 pl-1 pr-1 pb-1">
                                        {subEntries.map((entry) => {
                                          const isSelected = entry.id === selectedEntryId;
                                          const binaType = IilalEngine.detectBina(entry.root.fa, entry.root.ain, entry.root.lam);

                                          return (
                                            <button
                                              key={entry.id}
                                              id={`preset-btn-${entry.id}`}
                                              onClick={() => onSelectEntry(entry)}
                                              className={`w-full text-left p-2.5 rounded-xl border transition-all flex items-center justify-between group cursor-pointer ${
                                                isSelected
                                                  ? appTheme === "light"
                                                    ? "border-emerald-500 bg-emerald-50 text-emerald-950 scale-[0.99] shadow-xs"
                                                    : appTheme === "dark"
                                                    ? "border-amber-500 bg-amber-500/10 text-amber-300 scale-[0.99]"
                                                    : "border-emerald-450 bg-emerald-450/10 text-emerald-300 scale-[0.99]"
                                                  : appTheme === "light"
                                                  ? "border-gray-100 hover:border-gray-200 hover:bg-gray-50/50 text-gray-700 bg-white"
                                                  : appTheme === "dark"
                                                  ? "border-slate-850 hover:border-slate-800 hover:bg-slate-900/30 text-slate-300 bg-slate-950/30"
                                                  : "border-emerald-950/80 hover:border-emerald-900/80 hover:bg-emerald-950/30 text-emerald-200 bg-emerald-955/65"
                                              }`}
                                            >
                                              <div className="flex flex-col gap-0.5 min-w-0">
                                                <span className="font-semibold text-xs md:text-sm truncate">
                                                  {entry.translation}
                                                </span>
                                                <div className="flex items-center gap-1.5">
                                                  <span
                                                    className={`text-[8.5px] px-1.5 py-0.2 rounded font-bold ${
                                                      binaType === "Shohih"
                                                        ? "bg-slate-100/50 text-slate-600 border border-slate-200/50"
                                                        : "bg-amber-100/50 text-amber-800 border border-amber-200/40"
                                                    }`}
                                                  >
                                                    Bina {binaType}
                                                  </span>
                                                </div>
                                              </div>
                                              <div className="text-right pl-2 flex items-center gap-1.5">
                                                <div>
                                                  <div className="font-arabic text-md font-bold text-slate-200 group-hover:scale-105 transition-transform dir-rtl select-none">
                                                    <span className="text-amber-400 font-black">{entry.root.fa}</span>
                                                    <span className={appTheme === "light" ? "text-gray-800" : "text-white"}>
                                                      ـ{entry.root.ain}ـ{entry.root.lam}
                                                    </span>
                                                  </div>
                                                  <span className="text-[8px] text-gray-400 font-mono block">
                                                    {entry.root.fa}-{entry.root.ain}-{entry.root.lam}
                                                  </span>
                                                </div>
                                                <ChevronRight className={`w-3.5 h-3.5 transition-transform ${isSelected ? "text-emerald-500 translate-x-0.5" : "text-gray-300"}`} />
                                              </div>
                                            </button>
                                          );
                                        })}
                                      </div>
                                    )}
                                  </div>
                                );
                              });
                            })()}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
                )}
              </div>
            );
          })
        ) : (
          <div className="text-center py-8 text-gray-400 text-xs">
            Tidak ada kata kerja yang cocok dengan pencarian.
          </div>
        )}
      </div>

      {/* POP-UP FILTER MODAL FOR BAB & BINA' */}
      {isFilterOpen && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-xs z-[99] flex items-center justify-center p-4 animate-fade-in text-xs md:text-sm">
          <div className="absolute inset-0" onClick={() => setIsFilterOpen(false)} />
          <div className={`w-full max-w-md rounded-2xl p-5 shadow-2xl relative border flex flex-col gap-4 max-h-[90vh] overflow-y-auto ${
            appTheme === 'light' 
              ? 'bg-white border-slate-200 text-slate-800' 
              : appTheme === 'dark'
              ? 'bg-slate-900 border-slate-800 text-slate-100'
              : 'bg-[#032216] border-emerald-900/60 text-emerald-100'
          }`}>
            <div className="flex items-center justify-between border-b pb-3 border-emerald-800/10">
              <div className="flex items-center gap-2">
                <Filter className="w-4 h-4 text-emerald-500" />
                <span className="font-extrabold text-xs md:text-sm tracking-tight text-white uppercase font-mono">Pilih Filter Bab &amp; Bina' (Pop-Up)</span>
              </div>
              <button 
                onClick={() => setIsFilterOpen(false)}
                className="p-1 rounded-lg hover:bg-slate-800/20 text-slate-400 hover:text-white transition-colors cursor-pointer text-xs"
              >
                ✕
              </button>
            </div>

             {/* BAB FILTER SECTION */}
            <div className="space-y-2">
              <label className="text-[9px] font-black uppercase tracking-wider text-emerald-500 block">Kategori Bab (Wazan)</label>
              <div className="grid grid-cols-2 gap-1.5">
                {[1, 2, 3, 4, 5, 6].map((num) => {
                  const isSelected = selectedBab === num;
                  const info = BAB_DETAILS_MAP[num];
                  return (
                    <button
                      key={`filter-bab-${num}`}
                      type="button"
                      onClick={() => setSelectedBab(num)}
                      className={`p-2 rounded-xl border text-[10px] font-extrabold text-left transition-all cursor-pointer flex flex-col gap-0.5 justify-center ${
                        isSelected
                          ? "bg-emerald-600 border-emerald-505 text-white shadow-3xs"
                          : appTheme === "light"
                          ? "bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-705"
                          : "bg-slate-950 hover:bg-slate-900 border-slate-850 text-slate-400"
                      }`}
                    >
                      <span>Bab {num}: {info.title.split("-")[0]}</span>
                      <span className={`text-[8px] font-mono leading-none ${isSelected ? "text-emerald-100" : "text-emerald-500"}`}>
                        {info.pattern}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* BINA' FILTER SECTION */}
            <div className="space-y-2">
              <label className="text-[9px] font-black uppercase tracking-wider text-emerald-500 block">Kategori Bina' (Struktur Akar)</label>
              <div className="grid grid-cols-2 gap-1.5 animate-fade-in font-sans">
                <button
                  type="button"
                  onClick={() => setSelectedBina("all")}
                  className={`p-2 rounded-xl border text-[10px] font-bold text-left transition-all cursor-pointer ${
                    selectedBina === "all"
                      ? "bg-emerald-600 border-emerald-550 text-white shadow-3xs"
                      : appTheme === "light"
                      ? "bg-slate-50 hover:bg-slate-100 border-slate-205 text-slate-705"
                      : "bg-slate-950 hover:bg-slate-900 border-slate-850 text-slate-400"
                  }`}
                >
                  Semua Bina'
                </button>
                {["Bina' Shohih", "Bina' Mitsal", "Bina' Ajwaf", "Bina' Naqis", "Bina' Mudho'af", "Bina' Lafif", "Bina' Mahmuz"].map((binaName) => {
                  const isSelected = selectedBina === binaName;
                  return (
                    <button
                      key={`filter-bina-${binaName}`}
                      type="button"
                      onClick={() => setSelectedBina(binaName)}
                      className={`p-2 rounded-xl border text-[10px] font-bold text-left transition-all cursor-pointer ${
                        isSelected
                          ? "bg-emerald-600 border-emerald-550 text-white shadow-3xs"
                          : appTheme === "light"
                          ? "bg-slate-50 hover:bg-slate-100 border-slate-205 text-slate-705"
                          : "bg-slate-950 hover:bg-slate-900 border-slate-850 text-slate-400"
                      }`}
                    >
                      {binaName}
                    </button>
                  );
                })}
              </div>
              {/* Jumlah banyak nya data lafadz yang tersimpan di database */}
              <div className={`mt-3 p-3 rounded-xl border text-center ${
                appTheme === 'light'
                  ? 'bg-emerald-50/50 border-emerald-100 text-slate-800'
                  : 'bg-slate-950/40 border-slate-850 text-slate-300'
              }`}>
                <span className="text-[10px] font-black uppercase tracking-wider text-amber-500 block">Total Data Lafadz Terdaftar</span>
                <span className="text-sm font-bold font-mono mt-1 block text-emerald-405">{entries.length} Lafadz</span>
              </div>
            </div>

            {/* FOOTER */}
            <div className="flex justify-end gap-2 border-t pt-3 border-emerald-800/10">
              <button
                type="button"
                onClick={() => {
                  setSelectedBab("all");
                  setSelectedBina("all");
                }}
                className="px-3 py-1.5 rounded-lg text-[10px] font-bold bg-slate-100/10 hover:bg-slate-100/20 text-slate-400 cursor-pointer transition-colors"
              >
                Reset
              </button>
              <button
                type="button"
                onClick={() => setIsFilterOpen(false)}
                className="px-5 py-1.5 rounded-lg text-[10px] font-black bg-emerald-600 hover:bg-emerald-555 text-white shadow-xs cursor-pointer transition-colors"
              >
                Terapkan Filter
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
