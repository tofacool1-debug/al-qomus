/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { Bookmark, Trash2, HelpCircle, ChevronDown, ChevronUp, Eye } from "lucide-react";
import { DictionaryEntry } from "../types";

interface SavedFavoritesListProps {
  favorites: DictionaryEntry[];
  selectedId: string;
  onSelectFavorite: (fav: DictionaryEntry) => void;
  onDeleteFavorite: (id: string) => void;
}

export default function SavedFavoritesList({
  favorites,
  selectedId,
  onSelectFavorite,
  onDeleteFavorite,
}: SavedFavoritesListProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div id="favorites-list-card" className="bg-white rounded-2xl border border-gray-100 p-5 shadow-xs">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-rose-50 rounded-lg text-rose-600">
            <Bookmark className="w-5 h-5 shadow-2xs" />
          </div>
          <div>
            <h2 className="font-semibold text-gray-900 text-sm md:text-base">Kamus Favorit Anda</h2>
            <p className="text-xs text-gray-500">Dibuat & disimpan oleh pengguna</p>
          </div>
        </div>
        <span className="text-xs bg-rose-50 text-rose-600 font-bold px-2.5 py-0.5 rounded-full select-none">
          {favorites.length} Item
        </span>
      </div>

      {/* Main Body */}
      {favorites.length > 0 ? (
        <div className="space-y-3">
          {/* Collapsed State Cover / Summary */}
          {!isExpanded ? (
            <div className="p-4 bg-rose-50/20 border border-rose-100/40 rounded-xl flex flex-col items-center justify-center text-center gap-3 transition-all duration-200">
              <div className="w-12 h-12 rounded-full bg-rose-100 border border-rose-200/50 flex items-center justify-center text-rose-700 font-extrabold text-base shadow-3xs select-none">
                {favorites.length}
              </div>
              <div className="space-y-0.5">
                <h3 className="font-bold text-slate-800 text-xs">Materi Tersimpan</h3>
                <p className="text-[11px] text-gray-500 leading-relaxed max-w-xs">
                  Terdapat {favorites.length} lafadz di kamus favorit. Klik tombol di bawah untuk menampilkan seluruh daftarnya.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsExpanded(true)}
                className="w-full sm:w-auto px-4 py-1.8 bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs rounded-lg flex items-center justify-center gap-1.5 transition-colors cursor-pointer shadow-3xs"
              >
                <Eye className="w-3.5 h-3.5" />
                <span>Buka Kamus Favorit ({favorites.length})</span>
                <ChevronDown className="w-3.5 h-3.5" />
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              {/* Toggle to Collapse */}
              <div className="flex items-center justify-between px-1">
                <span className="text-[10px] text-gray-400 font-medium font-mono uppercase">Detail Lafadz Favorit</span>
                <button
                  type="button"
                  onClick={() => setIsExpanded(false)}
                  className="text-xs text-rose-600 hover:text-rose-700 font-bold flex items-center gap-1 cursor-pointer hover:underline"
                >
                  <ChevronUp className="w-3.5 h-3.5" />
                  <span>Sembunyikan</span>
                </button>
              </div>

              {/* The List of Favorites */}
              <div className="max-h-[260px] overflow-y-auto space-y-2 pr-1 scrollbar-thin">
                {favorites.map((fav) => {
                  const isSelected = selectedId === fav.id;
                  return (
                    <div
                      key={fav.id}
                      className={`p-3 rounded-xl border transition-all flex items-center justify-between gap-3 group ${
                        isSelected
                          ? "border-rose-450 bg-rose-50/25"
                          : "border-gray-100 hover:border-gray-200 bg-white"
                      }`}
                    >
                      <button
                        onClick={() => onSelectFavorite(fav)}
                        className="flex-1 text-left min-w-0 cursor-pointer"
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-bold text-gray-900 text-xs md:text-sm truncate">
                            {fav.translation}
                          </span>
                          <span className="text-[16px] font-arabic font-bold text-emerald-800 select-none" dir="rtl">
                            {fav.root.fa}ـ{fav.root.ain}ـ{fav.root.lam}
                          </span>
                        </div>
                        <div className="flex items-center justify-between text-[10px] text-gray-400">
                          <span>Bab {fav.babNum} • {fav.id.startsWith("custom-") || fav.id.includes("custom") ? "Kustom" : "Preset"}</span>
                          {fav.notes && (
                            <span className="italic truncate max-w-[120px] text-gray-400 font-medium" title={fav.notes}>
                              {fav.notes}
                            </span>
                          )}
                        </div>
                      </button>
                      <button
                        onClick={() => onDeleteFavorite(fav.id)}
                        className="p-1 text-gray-400 hover:text-rose-600 hover:bg-rose-50 rounded-md transition-colors cursor-pointer"
                        title="Hapus dari Kamus Favorit"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="text-center py-6 px-4 bg-gray-50 rounded-xl border border-dashed border-gray-100 text-gray-400 text-xs text-balance">
          <HelpCircle className="w-8 h-8 mx-auto text-gray-300 mb-2" />
          Belum ada materi tersimpan. Cari kata di preset atau desain di modul kustom lalu klik tombol{" "}
          <strong className="text-gray-605 font-bold">Simpan Favorit</strong> untuk mencatatkan ke daftar ini!
        </div>
      )}
    </div>
  );
}
