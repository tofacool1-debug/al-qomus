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
}: TasrifLughowiViewProps) {
  const [subTab, setSubTab] = useState<SubTabType>("madhi");
  const [selectedMusyabihatIdx, setSelectedMusyabihatIdx] = useState(0);
  const [mudhariState, setMudhariState] = useState<"marfu" | "manshub" | "majzum">("marfu");

  const isShohihOrMahmuz = React.useMemo(() => {
    if (!bina) return false;
    const lowerBina = bina.toLowerCase();
    return lowerBina.includes("shohih") || lowerBina.includes("mahmuz");
  }, [bina]);

  const makeManshubLughowi = (verb: string, idx: number): string => {
    if (!verb || verb === "—") return "—";
    if (idx === 5 || idx === 11) return verb; // Nun Niswah is mabni
    if (verb.endsWith("انِ")) return verb.replace(/انِ$/, "ا");
    if (verb.endsWith("ونَ")) return verb.replace(/ونَ$/, "وا");
    if (verb.endsWith("ينَ")) return verb.replace(/ينَ$/, "ي");

    if (verb.endsWith("َى")) return verb; // Muqaddarah

    if (verb.endsWith("ُ")) {
      return verb.slice(0, -1) + "َ";
    }
    if (verb.endsWith("ِي")) {
      return verb + "َ";
    }
    if (verb.endsWith("ُو")) {
      return verb + "َ";
    }
    return verb.replace(/ُ$/, "َ");
  };

  const makeMajzumLughowi = (verb: string, idx: number): string => {
    if (!verb || verb === "—") return "—";
    if (idx === 5 || idx === 11) return verb; // Nun Niswah is mabni
    if (verb.endsWith("انِ")) return verb.replace(/انِ$/, "ا");
    if (verb.endsWith("ونَ")) return verb.replace(/ونَ$/, "وا");
    if (verb.endsWith("ينَ")) return verb.replace(/ينَ$/, "ي");

    // Naqis/Lafif weak letter deletion
    if (bina === "Naqis" || bina === "Lafif Maqrun" || bina === "Lafif Mafruq") {
      if (verb.endsWith("ِي")) return verb.slice(0, -2) + "ِ";
      if (verb.endsWith("ُو")) return verb.slice(0, -2) + "ُ";
      if (verb.endsWith("َى")) return verb.slice(0, -2) + "َ";
      return verb.replace(/[ييوى]$/, ""); // fallback
    }

    // Ajwaf long vowel reduction due to meeting of two sakins
    if (bina === "Ajwaf") {
      let res = verb;
      if (res.endsWith("ُ")) {
        res = res.slice(0, -1) + "ْ";
      } else {
        res = res + "ْ";
      }
      res = res
        .replace(/ُو([^\u064b-\u0652])ْ$/, "ُ$1ْ")
        .replace(/ُوْ([^\u064b-\u0652])ْ$/, "ُ$1ْ")
        .replace(/ِي([^\u064b-\u0652])ْ$/, "ِ$1ْ")
        .replace(/ِيْ([^\u064b-\u0652])ْ$/, "ِ$1ْ")
        .replace(/َا([^\u064b-\u0652])ْ$/, "َ$1ْ");
      return res;
    }

    // Mudho'af fatha-on-gemination
    if (bina === "Mudho'af") {
      return verb.replace(/ُّ$/, "َّ");
    }

    // Shohih, Mitsal, etc.
    if (verb.endsWith("ُ")) {
      return verb.slice(0, -1) + "ْ";
    }
    return verb + "ْ";
  };

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
      <div className="flex flex-wrap items-center gap-1.5 p-1 bg-gray-100 rounded-xl max-w-fit">
        <button
          onClick={() => setSubTab("madhi")}
          className={`px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer transition-colors ${
            subTab === "madhi" ? "bg-white text-emerald-900 shadow-xs" : "text-gray-500 hover:text-gray-900"
          }`}
        >
          Fi'il Madhi (14 Dhomir)
        </button>
        <button
          onClick={() => setSubTab("mudhari")}
          className={`px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer transition-colors ${
            subTab === "mudhari" ? "bg-white text-emerald-900 shadow-xs" : "text-gray-500 hover:text-gray-950"
          }`}
        >
          Fi'il Mudhari (14 Dhomir)
        </button>
        <button
          onClick={() => setSubTab("amar_nahi")}
          className={`px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer transition-colors ${
            subTab === "amar_nahi" ? "bg-white text-emerald-900 shadow-xs" : "text-gray-500 hover:text-gray-950"
          }`}
        >
          Amar & Nahi (12 Dhomir)
        </button>
        <button
          onClick={() => setSubTab("isims")}
          className={`px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer transition-colors ${
            subTab === "isims" ? "bg-white text-emerald-900 shadow-xs" : "text-gray-500 hover:text-gray-950"
          }`}
        >
          Isim Fail & Maful (6 Bentuk)
        </button>
        <button
          onClick={() => setSubTab("sifat_musyabihat")}
          className={`px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer transition-colors ${
            subTab === "sifat_musyabihat" ? "bg-white text-emerald-900 shadow-xs" : "text-gray-500 hover:text-gray-950"
          }`}
        >
          Sifat Musyabihat (6 Bentuk)
        </button>
      </div>

      {/* Subtab Content */}
      <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-xs">
        {/* TAB 1: FI'IL MADHI TABLE */}
        {subTab === "madhi" && (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-100 text-[10px] md:text-xs font-semibold text-gray-500 uppercase tracking-wider">
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
                      className="border-b border-gray-50 hover:bg-slate-50/50 transition-colors text-xs text-gray-700"
                    >
                      <td className="py-2.5 px-4 font-mono font-medium text-gray-400">{index + 1}</td>
                      <td className="py-2.5 px-4">
                        <span className="font-arabic text-md font-bold text-slate-800 bg-slate-100/60 px-1.5 py-0.5 rounded-md select-none mt-0.5 inline-block">
                          {pronoun.arabic}
                        </span>
                        <span className="font-mono text-[9px] text-gray-500 block">{pronoun.translit}</span>
                      </td>
                      <td className="py-2.5 px-4 font-medium text-gray-500">{pronoun.desc}</td>
                      <td className="py-2.5 px-4 text-right">
                        <div className="flex items-center justify-end gap-1.5" dir="rtl">
                          <span className="font-arabic text-xl font-bold text-gray-900 hover:text-emerald-700 transition-colors select-all">
                            {val}
                          </span>
                          {val && val !== "—" && (
                            <button
                              type="button"
                              onClick={() => onShowWordInfo?.(val, `Fi'il Madhi (${pronoun.arabic})`)}
                              className="p-1 rounded-md bg-amber-500/10 hover:bg-amber-550 hover:text-slate-950 text-amber-700 hover:scale-105 border border-amber-500/15 transition-all flex items-center justify-center shrink-0"
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
                          className="p-1 hover:bg-gray-100 rounded-md text-gray-400 hover:text-emerald-600 transition-colors cursor-pointer"
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

        {/* TAB 2: FI'IL MUDHARI TABLE */}
        {subTab === "mudhari" && (
          <div>
            {/* Options group for Mudhari States */}
            <div className="p-4 bg-slate-50 border-b border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
              <div className="font-semibold text-gray-700">Pilih Kondisi Fi'il Mudhari:</div>
              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => setMudhariState("marfu")}
                  className={`px-3 py-1.5 rounded-lg font-medium cursor-pointer transition-all ${
                    mudhariState === "marfu"
                      ? "bg-emerald-600 text-white shadow-xs"
                      : "bg-white text-gray-650 border border-gray-200 hover:bg-gray-100"
                  }`}
                >
                  Marfu' (Normal)
                </button>
                <button
                  type="button"
                  onClick={() => setMudhariState("manshub")}
                  className={`px-3 py-1.5 rounded-lg font-medium cursor-pointer transition-all flex items-center gap-1.5 ${
                    mudhariState === "manshub"
                      ? "bg-emerald-600 text-white shadow-xs"
                      : "bg-white text-gray-650 border border-gray-200 hover:bg-gray-100"
                  }`}
                >
                  {!isPremium && !isShohihOrMahmuz && <Lock className="w-3 h-3 text-amber-500" />}
                  <span>Manshub (Dengan لَنْ)</span>
                </button>
                <button
                  type="button"
                  onClick={() => setMudhariState("majzum")}
                  className={`px-3 py-1.5 rounded-lg font-medium cursor-pointer transition-all flex items-center gap-1.5 ${
                    mudhariState === "majzum"
                      ? "bg-emerald-600 text-white shadow-xs"
                      : "bg-white text-gray-650 border border-gray-200 hover:bg-gray-100"
                  }`}
                >
                  {!isPremium && !isShohihOrMahmuz && <Lock className="w-3 h-3 text-amber-500" />}
                  <span>Majzum (Dengan لَمْ)</span>
                </button>
              </div>
            </div>

            {!isPremium && !isShohihOrMahmuz && mudhariState !== "marfu" ? (
              <div className="p-8 text-center bg-slate-900 text-slate-100 rounded-b-2xl border-t border-slate-800 space-y-4">
                <div className="w-12 h-12 bg-amber-500/10 text-amber-500 rounded-full flex items-center justify-center mx-auto border border-amber-500/20">
                  <Lock className="w-5 h-5 animate-pulse" />
                </div>
                <div className="space-y-1.5 max-w-md mx-auto">
                  <h4 className="font-extrabold text-sm text-white tracking-tight">Kondisi Fi'il Mudhari Premium Terkunci</h4>
                  <p className="text-[11px] text-slate-400 leading-relaxed">
                    Pembentukan konjugasi Manshub (dengan لَنْ) dan Majzum (dengan لَمْ) untuk Bina' <strong>{bina}</strong> dilindungi lisensi premium. Silakan hubungi pengembang untuk aktivasi.
                  </p>
                </div>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-gray-50 border-b border-gray-100 text-[10px] md:text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      <th className="py-3 px-4 w-16">No</th>
                      <th className="py-3 px-4 w-28">Dhomir</th>
                      <th className="py-3 px-4">Artian Dhomir</th>
                      <th className="py-3 px-4 text-right">Hasil Konjugasi Lughowi</th>
                      <th className="py-3 px-4 w-12 text-center">Salin</th>
                    </tr>
                  </thead>
                <tbody>
                  {PRONOUNS_14.map((pronoun, index) => {
                    const rawVal = lughowi.mudhari14[index] || "—";
                    let val = rawVal;
                    let prefix = "";
                    if (mudhariState === "manshub") {
                      val = makeManshubLughowi(rawVal, index);
                      prefix = "لَنْ ";
                    } else if (mudhariState === "majzum") {
                      val = makeMajzumLughowi(rawVal, index);
                      prefix = "لَمْ ";
                    }
                    const fullCopyText = val !== "—" ? `${prefix}${val}` : "—";
                    return (
                      <tr
                        key={`mudhari14-${index}`}
                        className="border-b border-gray-50 hover:bg-slate-50/50 transition-colors text-xs text-gray-700"
                      >
                        <td className="py-2.5 px-4 font-mono font-medium text-gray-400">{index + 1}</td>
                        <td className="py-2.5 px-4">
                          <span className="font-arabic text-md font-bold text-slate-800 bg-slate-100/60 px-1.5 py-0.5 rounded-md select-none mt-0.5 inline-block">
                            {pronoun.arabic}
                          </span>
                          <span className="font-mono text-[9px] text-gray-500 block">{pronoun.translit}</span>
                        </td>
                        <td className="py-2.5 px-4 font-medium text-gray-500">{pronoun.desc}</td>
                        <td className="py-2.5 px-4 text-right">
                          <div className="flex items-center justify-end gap-1.5" dir="rtl">
                            <span className="font-arabic text-xl font-bold text-gray-900 hover:text-emerald-700 transition-colors select-all">
                              {prefix && <span className="text-gray-400 font-medium text-md ml-1">{prefix}</span>}
                              {val}
                            </span>
                            {val && val !== "—" && (
                              <button
                                type="button"
                                onClick={() => onShowWordInfo?.(val, `Fi'il Mudhari (${pronoun.arabic})`)}
                                className="p-1 rounded-md bg-amber-500/10 hover:bg-amber-550 hover:text-slate-950 text-amber-700 hover:scale-105 border border-amber-500/15 transition-all flex items-center justify-center shrink-0"
                                title="Lihat Keterangan & I'lal"
                              >
                                <Lock className="w-2.5 h-2.5" />
                              </button>
                            )}
                          </div>
                        </td>
                        <td className="py-2.5 px-4 text-center">
                          <button
                            onClick={() => copyToClipboard(fullCopyText)}
                            className="p-1 hover:bg-gray-100 rounded-md text-gray-400 hover:text-emerald-600 transition-colors cursor-pointer"
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
          </div>
        )}

        {/* TAB 3: AMAR & NAHI */}
        {subTab === "amar_nahi" && (
          <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-gray-100">
            {/* AMAR SECTION */}
            <div className="p-4 bg-white">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-4">
                <h4 className="font-bold text-gray-800 text-xs md:text-sm bg-rose-50 text-rose-800 px-3 py-1 rounded-lg w-max select-none">
                  Fi'il Amar (12 Dhomir)
                </h4>
                <span className="text-[9px] text-red-650 font-extrabold bg-red-50 px-2 py-0.5 rounded-md uppercase tracking-wider select-none">
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
                      className={`flex items-center justify-between p-2.5 rounded-xl border text-xs transition-colors ${
                        isGhaib
                          ? "border-amber-100/65 hover:bg-amber-50/20 bg-amber-50/5"
                          : "border-gray-50 hover:bg-rose-50/5"
                      }`}
                    >
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-slate-800 font-arabic text-md">{pronoun.arabic}</span>
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
                        <span className="font-arabic text-[18px] font-bold text-rose-950 select-all" dir="rtl">
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
                          className="p-1 hover:bg-gray-100 rounded-md text-gray-400 hover:text-rose-600 transition-colors cursor-pointer"
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
            <div className="p-4 bg-white">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-4">
                <h4 className="font-bold text-gray-800 text-xs md:text-sm bg-slate-50 text-slate-800 px-3 py-1 rounded-lg w-max select-none">
                  Fi'il Nahi (12 Dhomir)
                </h4>
                <span className="text-[9px] text-emerald-700 font-extrabold bg-emerald-50 px-2 py-0.5 rounded-md uppercase tracking-wider select-none">
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
                          ? "border-amber-100/65 hover:bg-amber-50/20 bg-amber-50/5"
                          : "border-gray-50 hover:bg-slate-50/5"
                      }`}
                    >
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-slate-800 font-arabic text-md">{pronoun.arabic}</span>
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
                        <span className="font-arabic text-[18px] font-bold text-slate-900 select-all" dir="rtl">
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
                          className="p-1 hover:bg-gray-100 rounded-md text-gray-400 hover:text-slate-600 transition-colors cursor-pointer"
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
          <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-gray-100">
            {/* ISIM FAIL */}
            <div className="p-4 bg-white">
              <h4 className="font-bold text-gray-800 text-xs md:text-sm mb-4 bg-indigo-50 text-indigo-800 px-3 py-1 rounded-lg w-max select-none">
                Isim Fail (Pelaku)
              </h4>
              <div className="space-y-2">
                {PRONOUNS_ISIM_6.map((pron, idx) => {
                  const val = lughowi.isimFail6[idx] || "—";
                  return (
                    <div
                      key={`fail6-${idx}`}
                      className="flex items-center justify-between p-2.5 rounded-xl border border-gray-50 hover:bg-indigo-50/5 text-xs animate-none"
                    >
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-slate-800 font-arabic text-md">{pron.arabic}</span>
                          <span className="text-[10px] text-gray-400">{pron.translit}</span>
                        </div>
                        <span className="text-[9px] text-gray-400">{pron.desc}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="font-arabic text-[18px] font-bold text-indigo-950 select-all" dir="rtl">
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
                          className="p-1 hover:bg-gray-100 rounded-md text-gray-400 hover:text-indigo-600 transition-colors cursor-pointer"
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
            <div className="p-4 bg-white">
              <h4 className="font-bold text-gray-800 text-xs md:text-sm mb-4 bg-indigo-50 text-indigo-800 px-3 py-1 rounded-lg w-max select-none">
                Isim Maful (Penderita)
              </h4>
              <div className="space-y-2">
                {PRONOUNS_ISIM_6.map((pron, idx) => {
                  const val = lughowi.isimMaful6[idx] || "—";
                  return (
                    <div
                      key={`maful6-${idx}`}
                      className="flex items-center justify-between p-2.5 rounded-xl border border-gray-50 hover:bg-indigo-50/5 text-xs animate-none"
                    >
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-slate-800 font-arabic text-md">{pron.arabic}</span>
                          <span className="text-[10px] text-gray-400">{pron.translit}</span>
                        </div>
                        <span className="text-[9px] text-gray-400">{pron.desc}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="font-arabic text-[18px] font-bold text-indigo-950 select-all" dir="rtl">
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
                          className="p-1 hover:bg-gray-100 rounded-md text-gray-400 hover:text-indigo-600 transition-colors cursor-pointer"
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
          <div className="p-4 bg-white space-y-4">
            {!tasrif.isimMusyabihat?.mufrod || tasrif.isimMusyabihat.mufrod === "—" || tasrif.isimMusyabihat.mufrod === "" ? (
              <div className="py-12 text-center text-gray-400 text-xs font-sans">
                💡 Belum ada rujukan Sifat Musyabihat untuk akar kata ini.<br />
                Pilih atau cari akar kata yang memiliki data Sifat Musyabihat, atau cari via asisten AI.
              </div>
            ) : (
              <>
                <div className="bg-slate-50 p-3 rounded-2xl border border-slate-100 flex flex-col gap-2">
                  <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider block">Pilih Wazan Sifat Musyabihat:</span>
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
                            ? "bg-indigo-600 text-white border-indigo-600 shadow-3xs" 
                            : "bg-white text-gray-750 hover:bg-slate-100 border-gray-200"
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

                <h4 className="font-bold text-gray-800 text-xs md:text-sm bg-slate-100 text-slate-900 px-3 py-1 rounded-lg w-max select-none">
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
                          className="flex items-center justify-between p-2.5 rounded-xl border border-gray-50 hover:bg-emerald-50/5 text-xs transition-colors"
                        >
                          <div className="min-w-0">
                            <div className="flex items-center gap-2">
                              <span className="font-bold text-slate-800 font-arabic text-md">{pron.arabic}</span>
                              <span className="text-[10px] text-gray-400">{pron.translit}</span>
                            </div>
                            <span className="text-[9px] text-gray-400">{pron.desc}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="font-arabic text-[18px] font-bold text-emerald-950 select-all" dir="rtl">
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
                              className="p-1 hover:bg-gray-100 rounded-md text-gray-400 hover:text-emerald-600 transition-colors cursor-pointer"
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
