/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { TasrifIstilahi, TasrifLughowi } from "../types";
import { IilalEngine } from "../utils/iilalEngine";
import { PRONOUNS_14, PRONOUNS_6, PRONOUNS_12, PRONOUNS_ISIM_6 } from "../utils/dictionaryData";
import { Table, Copy, Lock, Sparkles } from "lucide-react";

interface TasrifLughowiViewProps {
  tasrif: TasrifIstilahi;
  fa: string;
  ain: string;
  lam: string;
  bina: string;
  babNum: number;
  isPremium?: boolean;
  onUnlock?: () => void;
  onShowWordInfo?: (word: string, shighot: string) => void;
  lafadzSize?: "small" | "medium" | "large" | "xlarge";
  appTheme?: "dark" | "light" | "green";
}

type SubTabType = "madhi" | "mudhari" | "amar_nahi" | "isims" | "sifat_musyabihat";

export default function TasrifLughowiView({
  tasrif,
  fa,
  ain,
  lam,
  bina,
  babNum,
  isPremium = false,
  onUnlock,
  onShowWordInfo,
  lafadzSize = "medium",
  appTheme = "dark",
}: TasrifLughowiViewProps) {
  const [subTab, setSubTab] = useState<SubTabType>("madhi");
  const [selectedMusyabihatIdx, setSelectedMusyabihatIdx] = useState(0);

  const getArabicSizeClass = (defaultClass: string) => {
    switch (lafadzSize) {
      case "small":
        return "text-[14px]";
      case "large":
        return "text-[23px] md:text-2xl";
      case "xlarge":
        return "text-3xl md:text-3.5xl lg:text-4xl";
      case "medium":
      default:
        return defaultClass;
    }
  };

  const isShohihOrMahmuz = React.useMemo(() => {
    if (!bina) return false;
    const lowerBina = bina.toLowerCase();
    return lowerBina.includes("shohih") || lowerBina.includes("mahmuz");
  }, [bina]);

  // Dynamically calculate the 14/6 forms
  const lughowi: TasrifLughowi = IilalEngine.tasrifLughowi(tasrif, fa, ain, lam, bina, babNum);

  // Helper to conjugate any singular noun into 6 plural/dual suffixes
  const conjugateNoun6 = (bentukMufrod: string): string[] => {
    if (!bentukMufrod || bentukMufrod === "—") return Array(6).fill("—");
    
    const FATHA = "َ";
    const DAMMA = "ُ";

    const base = bentukMufrod.replace(/[ًٌٍ]$/, ""); // remove tanwin
    
    const muzakkarMufrod = bentukMufrod;
    const muzakkarTasniyah = base + FATHA + "انِ"; // dual
    const muzakkarJama = base + DAMMA + "ونَ"; // plural
    const muannatsMufrod = base + FATHA + "ةٌ"; // feminine singular
    const muannatsTasniyah = base + FATHA + "تَانِ"; // feminine dual
    const muannatsJama = base + FATHA + "اتٌ"; // feminine plural

    return [
      muzakkarMufrod,
      muzakkarTasniyah,
      muzakkarJama,
      muannatsMufrod,
      muannatsTasniyah,
      muannatsJama,
    ];
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="space-y-6">
      {/* Short sub-tab navigation */}
      <div className={`flex flex-wrap items-center gap-1.5 p-1 rounded-xl max-w-fit ${
        appTheme === "light"
          ? "bg-slate-100"
          : appTheme === "dark"
          ? "bg-slate-950/70 border border-slate-850"
          : "bg-emerald-955 border border-emerald-900/60"
      }`}>
        <button
          onClick={() => setSubTab("madhi")}
          className={`px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer transition-colors ${
            subTab === "madhi"
              ? appTheme === "light"
                ? "bg-white text-emerald-900 shadow-xs"
                : "bg-emerald-600 text-white shadow-xs font-bold"
              : appTheme === "light"
              ? "text-gray-500 hover:text-gray-900"
              : "text-slate-400 hover:text-white"
          }`}
        >
          Fi'il Madhi (14 Dhomir)
        </button>
        <button
          onClick={() => setSubTab("mudhari")}
          className={`px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer transition-colors ${
            subTab === "mudhari"
              ? appTheme === "light"
                ? "bg-white text-emerald-900 shadow-xs"
                : "bg-emerald-600 text-white shadow-xs font-bold"
              : appTheme === "light"
              ? "text-gray-500 hover:text-gray-950"
              : "text-slate-400 hover:text-white"
          }`}
        >
          Fi'il Mudhari (14 Dhomir)
        </button>
        <button
          onClick={() => setSubTab("amar_nahi")}
          className={`px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer transition-colors ${
            subTab === "amar_nahi"
              ? appTheme === "light"
                ? "bg-white text-emerald-900 shadow-xs"
                : "bg-emerald-600 text-white shadow-xs font-bold"
              : appTheme === "light"
              ? "text-gray-500 hover:text-gray-950"
              : "text-slate-400 hover:text-white"
          }`}
        >
          Amar & Nahi (12 Dhomir)
        </button>
        <button
          onClick={() => setSubTab("isims")}
          className={`px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer transition-colors ${
            subTab === "isims"
              ? appTheme === "light"
                ? "bg-white text-emerald-900 shadow-xs font-semibold"
                : "bg-emerald-600 text-white shadow-xs font-bold"
              : appTheme === "light"
              ? "text-gray-500 hover:text-gray-950"
              : "text-slate-400 hover:text-white"
          }`}
        >
          Isim Fail & Maful (6 Bentuk)
        </button>
        <button
          onClick={() => setSubTab("sifat_musyabihat")}
          className={`px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer transition-colors ${
            subTab === "sifat_musyabihat"
              ? appTheme === "light"
                ? "bg-white text-emerald-900 shadow-xs font-semibold"
                : "bg-emerald-600 text-white shadow-xs font-bold"
              : appTheme === "light"
              ? "text-gray-500 hover:text-gray-955"
              : "text-slate-400 hover:text-white"
          }`}
        >
          Sifat Musyabihat (6 Bentuk)
        </button>
      </div>

      {/* Subtab Content */}
      <div className={`border rounded-2xl overflow-hidden shadow-xs ${
        appTheme === "light"
          ? "bg-white border-gray-150 text-gray-800"
          : appTheme === "dark"
          ? "bg-[#031d13]/60 border-slate-800/80 text-slate-100"
          : "bg-[#021f14]/80 border-emerald-900/60 text-emerald-100"
      }`}>
        {/* TAB 1: FI'IL MADHI TABLE */}
        {subTab === "madhi" && (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className={`border-b text-[10px] md:text-xs font-semibold uppercase tracking-wider ${
                  appTheme === "light"
                    ? "bg-slate-50 border-gray-100 text-gray-500"
                    : "bg-slate-950/45 border-slate-800/80 text-slate-405"
                }`}>
                  <th className="py-3 px-4 w-16">No</th>
                  <th className="py-3 px-4 w-28">Dhomir (Kata Ganti)</th>
                  <th className="py-3 px-4">Artian Dhomir</th>
                  <th className="py-3 px-4 text-right">Hasil Konjugasi Lughowi</th>
                  <th className="py-3 px-4 w-12 text-center">Salin</th>
                </tr>
              </thead>
              <tbody>
                {PRONOUNS_14.map((pronoun, index) => {
                  const val = lughowi.madhi14[index] || "—";
                  return (
                    <tr
                      key={`madhi14-${index}`}
                      className={`border-b transition-colors text-xs ${
                        appTheme === "light"
                          ? "border-slate-50 hover:bg-slate-50/50 text-gray-700"
                          : "border-slate-850/40 hover:bg-slate-900/20 text-slate-300"
                      }`}
                    >
                      <td className="py-2.5 px-4 font-mono font-medium text-gray-400">{index + 1}</td>
                      <td className="py-2.5 px-4">
                        <span className={`font-arabic text-md font-bold px-1.5 py-0.5 rounded-md select-none mt-0.5 inline-block ${
                          appTheme === "light" ? "text-slate-800 bg-slate-100/60" : "text-white bg-slate-900/60"
                        }`}>
                          {pronoun.arabic}
                        </span>
                        <span className="font-mono text-[9px] text-gray-550 block">{pronoun.translit}</span>
                      </td>
                      <td className={`py-2.5 px-4 font-medium ${appTheme === "light" ? "text-gray-500" : "text-slate-400"}`}>{pronoun.desc}</td>
                      <td className="py-2.5 px-4 text-right">
                        <div className="flex items-center justify-end gap-1.5" dir="rtl">
                          <span className={`font-arabic font-bold transition-colors select-all ${getArabicSizeClass("text-xl")} ${
                            appTheme === "light"
                              ? "text-[#111827] hover:text-emerald-700"
                              : "text-white hover:text-amber-400"
                          }`}>
                            {val}
                          </span>
                          {val && val !== "—" && (
                            <button
                              type="button"
                              onClick={() => onShowWordInfo?.(val, `Fi'il Madhi (${pronoun.arabic})`)}
                              className="p-1 rounded-md bg-amber-500/10 hover:bg-amber-550 hover:text-slate-950 text-amber-700 hover:scale-105 border border-amber-500/15 transition-all flex items-center justify-center shrink-0 cursor-pointer"
                              title="Lihat Keterangan & I'lal"
                            >
                              <Lock className="w-2.5 h-2.5" />
                            </button>
                          )}
                        </div>
                      </td>
                      <td className="py-2.5 px-4 text-center">
                        <button
                          onClick={() => copyToClipboard(val)}
                          className="p-1 hover:bg-slate-100/10 rounded-md text-gray-400 hover:text-emerald-500 transition-colors cursor-pointer"
                        >
                          <Copy className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}

        {/* TAB 2: FI'IL MUDHARI */}
        {subTab === "mudhari" && (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className={`border-b text-[10px] md:text-xs font-semibold uppercase tracking-wider ${
                  appTheme === "light"
                    ? "bg-slate-50 border-gray-100 text-gray-500"
                    : "bg-slate-950/45 border-slate-800/80 text-slate-405"
                }`}>
                  <th className="py-3 px-4 w-16">No</th>
                  <th className="py-3 px-4 w-28">Dhomir</th>
                  <th className="py-3 px-4">Artian Dhomir</th>
                  <th className="py-3 px-4 text-right">Hasil Konjugasi Lughowi</th>
                  <th className="py-3 px-4 w-12 text-center">Salin</th>
                </tr>
              </thead>
              <tbody>
                {PRONOUNS_14.map((pronoun, index) => {
                  const val = lughowi.mudhari14[index] || "—";
                  return (
                    <tr
                      key={`mudhari14-${index}`}
                      className={`border-b transition-colors text-xs ${
                        appTheme === "light"
                          ? "border-slate-50 hover:bg-slate-50/50 text-gray-700"
                          : "border-slate-850/40 hover:bg-slate-900/20 text-slate-350"
                      }`}
                    >
                      <td className="py-2.5 px-4 font-mono font-medium text-gray-400">{index + 1}</td>
                      <td className="py-2.5 px-4">
                        <span className={`font-arabic text-md font-bold px-1.5 py-0.5 rounded-md select-none mt-0.5 inline-block ${
                          appTheme === "light" ? "text-slate-800 bg-slate-100/60" : "text-white bg-slate-900/60"
                        }`}>
                          {pronoun.arabic}
                        </span>
                        <span className="font-mono text-[9px] text-gray-500 block">{pronoun.translit}</span>
                      </td>
                      <td className={`py-2.5 px-4 font-medium ${appTheme === "light" ? "text-gray-505" : "text-slate-400"}`}>{pronoun.desc}</td>
                      <td className="py-2.5 px-4 text-right">
                        <div className="flex items-center justify-end gap-1.5" dir="rtl">
                          <span className={`font-arabic font-bold transition-colors select-all ${getArabicSizeClass("text-xl")} ${
                            appTheme === "light"
                              ? "text-[#111827] hover:text-emerald-700"
                              : "text-white hover:text-amber-400"
                          }`}>
                            {val}
                          </span>
                          {val && val !== "—" && (
                            <button
                              type="button"
                              onClick={() => onShowWordInfo?.(val, `Fi'il Mudhari (${pronoun.arabic})`)}
                              className="p-1 rounded-md bg-amber-500/10 hover:bg-amber-550 hover:text-slate-950 text-amber-700 hover:scale-105 border border-amber-500/15 transition-all flex items-center justify-center shrink-0 cursor-pointer"
                              title="Lihat Keterangan & I'lal"
                            >
                              <Lock className="w-2.5 h-2.5" />
                            </button>
                          )}
                        </div>
                      </td>
                      <td className="py-2.5 px-4 text-center">
                        <button
                          onClick={() => copyToClipboard(val)}
                          className="p-1 hover:bg-slate-100/10 rounded-md text-gray-400 hover:text-emerald-500 transition-colors cursor-pointer"
                        >
                          <Copy className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}

        {/* TAB 3: AMAR & NAHI */}
        {subTab === "amar_nahi" && (
          <div className={`grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x ${
            appTheme === "light" ? "divide-gray-100" : "divide-slate-800/60"
          }`}>
            {/* AMAR SECTION */}
            <div className={`p-4 ${appTheme === "light" ? "bg-white" : "bg-transparent"}`}>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-4">
                <h4 className={`font-bold text-xs md:text-sm px-3 py-1 rounded-lg w-max select-none ${
                  appTheme === "light" ? "bg-rose-50 text-rose-800" : "bg-rose-950/30 text-rose-300"
                }`}>
                  Fi'il Amar (12 Dhomir)
                </h4>
                <span className={`text-[9px] font-extrabold px-2 py-0.5 rounded-md uppercase tracking-wider select-none ${
                  appTheme === "light" ? "bg-red-50 text-red-650" : "bg-red-950/20 text-red-400"
                }`}>
                  Huruf Mudhoroah: DIBUANG (اُنْصُرْ)
                </span>
              </div>
              <div className="space-y-2 max-h-[480px] overflow-y-auto pr-1 scrollbar-thin">
                {PRONOUNS_12.map((pronoun, index) => {
                  const val = lughowi.amar12[index] || "—";
                  const isGhaib = index < 6;
                  return (
                    <div
                      key={`amar12-${index}`}
                      className={`flex items-center justify-between p-2.5 rounded-xl border text-xs transition-all ${
                        isGhaib
                          ? appTheme === "light"
                            ? "border-amber-100/65 bg-amber-50/5 hover:bg-amber-50/20"
                            : "border-amber-950/40 bg-amber-955/10 hover:bg-amber-950/25"
                          : appTheme === "light"
                          ? "border-gray-50 hover:bg-rose-50/5 bg-transparent"
                          : "border-slate-850/40 hover:bg-rose-950/10 bg-transparent"
                      }`}
                    >
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <span className={`font-bold font-arabic text-md ${appTheme === "light" ? "text-slate-800" : "text-white"}`}>{pronoun.arabic}</span>
                          <span className="text-[10px] text-gray-400">{pronoun.translit}</span>
                          {isGhaib && (
                            <span className="text-[8px] bg-amber-100 text-amber-800 font-extrabold px-1.5 py-0.2 rounded font-sans uppercase">
                              Ghaib
                            </span>
                          )}
                        </div>
                        <span className="text-[9px] text-gray-400">{pronoun.desc}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className={`font-arabic font-bold select-all ${getArabicSizeClass("text-[18px]")} ${
                          appTheme === "light" ? "text-rose-950" : "text-amber-300"
                        }`} dir="rtl">
                          {val}
                        </span>
                        {val && val !== "—" && (
                          <button
                            type="button"
                            onClick={() => onShowWordInfo?.(val, `Fi'il Amar (${pronoun.arabic})`)}
                            className="p-1 rounded-md bg-amber-500/10 hover:bg-amber-550 hover:text-slate-950 text-amber-700 hover:scale-105 border border-amber-500/15 transition-all flex items-center justify-center shrink-0 cursor-pointer"
                            title="Lihat Keterangan & I'lal"
                          >
                            <Lock className="w-2.5 h-2.5" />
                          </button>
                        )}
                        <button
                          onClick={() => copyToClipboard(val)}
                          className="p-1 hover:bg-slate-100/10 rounded-md text-gray-400 hover:text-rose-500 transition-colors cursor-pointer"
                        >
                          <Copy className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* NAHI SECTION */}
            <div className={`p-4 ${appTheme === "light" ? "bg-white" : "bg-transparent"}`}>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-4">
                <h4 className={`font-bold text-xs md:text-sm px-3 py-1 rounded-lg w-max select-none ${
                  appTheme === "light" ? "bg-slate-50 text-slate-800" : "bg-slate-950/30 text-slate-400"
                }`}>
                  Fi'il Nahi (12 Dhomir)
                </h4>
                <span className={`text-[9px] font-extrabold px-2 py-0.5 rounded-md uppercase tracking-wider select-none ${
                  appTheme === "light" ? "bg-emerald-50 text-emerald-700" : "bg-emerald-950/20 text-emerald-400"
                }`}>
                  Huruf Mudhoroah: ت (TAMPIL/ADA)
                </span>
              </div>
              <div className="space-y-2 max-h-[480px] overflow-y-auto pr-1 scrollbar-thin">
                {PRONOUNS_12.map((pronoun, index) => {
                  const val = lughowi.nahi12[index] || "—";
                  const isGhaib = index < 6;
                  return (
                    <div
                      key={`nahi12-${index}`}
                      className={`flex items-center justify-between p-2.5 rounded-xl border text-xs transition-colors ${
                        isGhaib
                          ? appTheme === "light"
                            ? "border-amber-100/65 bg-amber-50/5 hover:bg-amber-50/20"
                            : "border-amber-950/40 bg-amber-955/10 hover:bg-amber-950/25"
                          : appTheme === "light"
                          ? "border-gray-50 hover:bg-slate-50/5 bg-transparent"
                          : "border-slate-850/40 hover:bg-slate-900/10 bg-transparent"
                      }`}
                    >
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <span className={`font-bold font-arabic text-md ${appTheme === "light" ? "text-slate-800" : "text-white"}`}>{pronoun.arabic}</span>
                          <span className="text-[10px] text-gray-400">{pronoun.translit}</span>
                          {isGhaib && (
                            <span className="text-[8px] bg-amber-100 text-amber-800 font-extrabold px-1.5 py-0.2 rounded font-sans uppercase">
                              Ghaib
                            </span>
                          )}
                        </div>
                        <span className="text-[9px] text-gray-400">{pronoun.desc}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className={`font-arabic font-bold select-all ${getArabicSizeClass("text-[18px]")} ${
                          appTheme === "light" ? "text-slate-900 hover:text-emerald-700" : "text-amber-305 hover:text-white"
                        }`} dir="rtl">
                          {val}
                        </span>
                        {val && val !== "—" && (
                          <button
                            type="button"
                            onClick={() => onShowWordInfo?.(val, `Fi'il Nahi (${pronoun.arabic})`)}
                            className="p-1 rounded-md bg-amber-500/10 hover:bg-amber-550 hover:text-slate-950 text-amber-700 hover:scale-105 border border-amber-500/15 transition-all flex items-center justify-center shrink-0 cursor-pointer"
                            title="Lihat Keterangan & I'lal"
                          >
                            <Lock className="w-2.5 h-2.5" />
                          </button>
                        )}
                        <button
                          onClick={() => copyToClipboard(val)}
                          className="p-1 hover:bg-slate-100/10 rounded-md text-gray-400 hover:text-slate-500 transition-colors cursor-pointer"
                        >
                          <Copy className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: ISIMS (FAIL & MAFUL) CARD */}
        {subTab === "isims" && (
          <div className={`grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x ${
            appTheme === "light" ? "divide-gray-100" : "divide-slate-800/60"
          }`}>
            {/* ISIM FAIL */}
            <div className={`p-4 ${appTheme === "light" ? "bg-white" : "bg-transparent"}`}>
              <h4 className={`font-bold text-xs md:text-sm mb-4 px-3 py-1 rounded-lg w-max select-none ${
                appTheme === "light" ? "bg-indigo-50 text-indigo-800" : "bg-indigo-950/30 text-indigo-300"
              }`}>
                Isim Fail (Pelaku)
              </h4>
              <div className="space-y-2">
                {PRONOUNS_ISIM_6.map((pron, idx) => {
                  const val = lughowi.isimFail6[idx] || "—";
                  return (
                    <div
                      key={`fail6-${idx}`}
                      className={`flex items-center justify-between p-2.5 rounded-xl border text-xs transition-all ${
                        appTheme === "light"
                          ? "border-gray-50 hover:bg-indigo-50/5"
                          : "border-slate-850/50 hover:bg-indigo-950/10 bg-transparent"
                      }`}
                    >
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <span className={`font-bold font-arabic text-md ${appTheme === "light" ? "text-slate-800" : "text-white"}`}>{pron.arabic}</span>
                          <span className="text-[10px] text-gray-400">{pron.translit}</span>
                        </div>
                        <span className="text-[9px] text-gray-400">{pron.desc}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className={`font-arabic font-bold select-all ${getArabicSizeClass("text-[18px]")} ${
                          appTheme === "light" ? "text-indigo-950" : "text-indigo-200"
                        }`} dir="rtl">
                          {val}
                        </span>
                        {val && val !== "—" && (
                          <button
                            type="button"
                            onClick={() => onShowWordInfo?.(val, `Isim Fail (${pron.arabic})`)}
                            className="p-1 rounded-md bg-amber-500/10 hover:bg-amber-550 hover:text-slate-950 text-amber-700 hover:scale-105 border border-amber-500/15 transition-all flex items-center justify-center shrink-0 cursor-pointer"
                            title="Lihat Keterangan & I'lal"
                          >
                            <Lock className="w-2.5 h-2.5" />
                          </button>
                        )}
                        <button
                          onClick={() => copyToClipboard(val)}
                          className="p-1 hover:bg-slate-100/10 rounded-md text-gray-400 hover:text-indigo-500 transition-colors cursor-pointer"
                        >
                          <Copy className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* ISIM MAFUL */}
            <div className={`p-4 ${appTheme === "light" ? "bg-white" : "bg-transparent"}`}>
              <h4 className={`font-bold text-xs md:text-sm mb-4 px-3 py-1 rounded-lg w-max select-none ${
                appTheme === "light" ? "bg-indigo-50 text-indigo-800" : "bg-indigo-950/30 text-indigo-300"
              }`}>
                Isim Maful (Penderita)
              </h4>
              <div className="space-y-2">
                {PRONOUNS_ISIM_6.map((pron, idx) => {
                  const val = lughowi.isimMaful6[idx] || "—";
                  return (
                    <div
                      key={`maful6-${idx}`}
                      className={`flex items-center justify-between p-2.5 rounded-xl border text-xs transition-all ${
                        appTheme === "light"
                          ? "border-gray-50 hover:bg-indigo-50/5"
                          : "border-slate-850/50 hover:bg-indigo-950/10 bg-transparent"
                      }`}
                    >
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <span className={`font-bold font-arabic text-md ${appTheme === "light" ? "text-slate-800" : "text-white"}`}>{pron.arabic}</span>
                          <span className="text-[10px] text-gray-400">{pron.translit}</span>
                        </div>
                        <span className="text-[9px] text-gray-400">{pron.desc}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className={`font-arabic font-bold select-all ${getArabicSizeClass("text-[18px]")} ${
                          appTheme === "light" ? "text-indigo-950" : "text-indigo-200"
                        }`} dir="rtl">
                          {val}
                        </span>
                        {val && val !== "—" && (
                          <button
                            type="button"
                            onClick={() => onShowWordInfo?.(val, `Isim Maful (${pron.arabic})`)}
                            className="p-1 rounded-md bg-amber-500/10 hover:bg-amber-550 hover:text-slate-950 text-amber-700 hover:scale-105 border border-amber-500/15 transition-all flex items-center justify-center shrink-0 cursor-pointer"
                            title="Lihat Keterangan & I'lal"
                          >
                            <Lock className="w-2.5 h-2.5" />
                          </button>
                        )}
                        <button
                          onClick={() => copyToClipboard(val)}
                          className="p-1 hover:bg-slate-100/10 rounded-md text-gray-400 hover:text-indigo-500 transition-colors cursor-pointer"
                        >
                          <Copy className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* TAB 5: SIFAT MUSYABIHAT */}
        {subTab === "sifat_musyabihat" && (
          <div className={`p-4 space-y-4 ${appTheme === "light" ? "bg-white" : "bg-transparent"}`}>
            {!tasrif.isimMusyabihat?.mufrod || tasrif.isimMusyabihat.mufrod === "—" || tasrif.isimMusyabihat.mufrod === "" ? (
              <div className={`py-12 text-center text-xs font-sans ${appTheme === "light" ? "text-gray-400" : "text-slate-400"}`}>
                💡 Belum ada rujukan Sifat Musyabihat untuk akar kata ini.<br />
                Pilih atau cari akar kata yang memiliki data Sifat Musyabihat, atau cari via asisten AI.
              </div>
            ) : (
              <>
                <div className={`p-3 rounded-2xl border flex flex-col gap-2 ${
                  appTheme === "light" ? "bg-slate-50 border-slate-100" : "bg-slate-950/30 border-slate-800/60"
                }`}>
                  <span className={`text-[10px] font-bold uppercase tracking-wider block ${
                    appTheme === "light" ? "text-slate-500" : "text-slate-400"
                  }`}>Pilih Wazan Sifat Musyabihat:</span>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-1.5">
                    {(tasrif.musyabihat6 || [tasrif.isimMusyabihat.mufrod]).map((w, index) => {
                      const labels = ["فَعِيلٌ", "فَعِلٌ", "فَعْلٌ", "فُعَالٌ", "فَعَالٌ", "أَفْعَلُ"];
                      const isSelected = selectedMusyabihatIdx === index;
                      return (
                        <button
                          key={`sm-btn-${index}`}
                          onClick={() => setSelectedMusyabihatIdx(index)}
                          className={`px-2 py-1.5 rounded-xl border text-center transition-all cursor-pointer flex flex-col items-center justify-center ${
                            isSelected 
                            ? "bg-indigo-600 text-white border-indigo-600 shadow-3xs font-bold" 
                            : appTheme === "light"
                            ? "bg-white text-gray-750 hover:bg-slate-100 border-gray-200"
                            : "bg-slate-900 text-slate-350 hover:bg-slate-800 border-slate-800"
                          }`}
                        >
                          <span className="font-arabic text-[12.5px] font-black">{w}</span>
                          <span className={`text-[8px] font-mono mt-0.5 ${isSelected ? "text-indigo-150" : "text-gray-400"}`}>
                            {labels[index] || "Adjektif"}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                <h4 className={`font-bold text-xs md:text-sm px-3 py-1 rounded-lg w-max select-none ${
                  appTheme === "light" ? "bg-slate-100 text-slate-900" : "bg-slate-950/45 text-slate-300 border border-slate-800"
                }`}>
                  Tasrif Lughowi Sifat Musyabihat Terpilih:
                </h4>
                
                <div className="space-y-2 animate-fade-in">
                  {(() => {
                    const activeMufrod = (tasrif.musyabihat6 && tasrif.musyabihat6[selectedMusyabihatIdx]) || tasrif.isimMusyabihat.mufrod;
                    const activeForms = conjugateNoun6(activeMufrod);
                    return PRONOUNS_ISIM_6.map((pron, idx) => {
                      const val = activeForms[idx] || "—";
                      return (
                        <div
                          key={`sifat6-form-${idx}`}
                          className={`flex items-center justify-between p-2.5 rounded-xl border text-xs transition-colors ${
                            appTheme === "light"
                              ? "border-gray-50 hover:bg-emerald-50/5"
                              : "border-slate-850/40 hover:bg-emerald-950/10 bg-transparent"
                          }`}
                        >
                          <div className="min-w-0">
                            <div className="flex items-center gap-2">
                              <span className={`font-bold font-arabic text-md ${appTheme === "light" ? "text-slate-800" : "text-white"}`}>{pron.arabic}</span>
                              <span className="text-[10px] text-gray-400">{pron.translit}</span>
                            </div>
                            <span className="text-[9px] text-gray-400">{pron.desc}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className={`font-arabic font-bold select-all ${getArabicSizeClass("text-[18px]")} ${
                              appTheme === "light" ? "text-emerald-950 hover:text-emerald-700" : "text-amber-302 hover:text-white"
                            }`} dir="rtl">
                              {val}
                            </span>
                            {val && val !== "—" && (
                              <button
                                type="button"
                                onClick={() => onShowWordInfo?.(val, `Sifat Musyabihat (${pron.arabic})`)}
                                className="p-1 rounded-md bg-amber-500/10 hover:bg-amber-550 hover:text-slate-950 text-amber-700 hover:scale-105 border border-amber-500/15 transition-all flex items-center justify-center shrink-0 cursor-pointer"
                                title="Lihat Keterangan & I'lal"
                              >
                                <Lock className="w-2.5 h-2.5" />
                              </button>
                            )}
                            <button
                              onClick={() => copyToClipboard(val)}
                              className="p-1 hover:bg-slate-100/10 rounded-md text-gray-400 hover:text-emerald-500 transition-colors cursor-pointer"
                            >
                              <Copy className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      );
                    });
                  })()}
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
