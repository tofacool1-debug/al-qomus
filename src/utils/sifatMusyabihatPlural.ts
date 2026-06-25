/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { DictionaryEntry, SifatMusyabihatPlural } from "../types";

type BinaKey = "sahih" | "ajwaf" | "mitsal" | "naqish" | "mudaaf" | "mahmuz" | "lafif_maqrun" | "lafif_mafruq" | "lafif";

function getBinaKey(bina: string): BinaKey {
  const norm = (bina || "").toLowerCase().trim();
  if (norm.includes("ajwaf")) return "ajwaf";
  if (norm.includes("mitsal")) return "mitsal";
  if (norm === "naqis" || norm.includes("naqish")) return "naqish";
  if (norm.includes("muda") || norm.includes("mudho") || norm.includes("ganda")) return "mudaaf";
  if (norm.includes("mahmuz")) return "mahmuz";
  if (norm === "lafif maqrun") return "lafif_maqrun";
  if (norm === "lafif mafruq") return "lafif_mafruq";
  if (norm.includes("lafif")) return "lafif";
  return "sahih";
}

function stripHarakat(str: string) {
  return (str || "").replace(/[\u064b-\u065f\u0670]/g, "");
}

function detectWazan(mufrod: string): string {
  const raw = (mufrod || "").trim();
  const clean = stripHarakat(raw);
  
  // Cek harakat dulu, kalau gak ada fallback ke clean
  if (/^أَفْعَل/.test(raw)) return "af'al";
  if (/فَعْلَان/.test(raw)) return "fa'lan";
  if (/فَعُولٌ/.test(raw)) return "fa'ul";
  if (/فَعِيلٌ/.test(raw)) return "fa'il";
  if (/فَاعِلٌ/.test(raw)) return "fa'il_alif";
  if (/فَعْلٌ/.test(raw)) return "fa'l";
  if (/فَعَلٌ/.test(raw)) return "fa'al";
  if (/فَعِلٌ/.test(raw)) return "fa'il_ksr";
  
  // Fallback tanpa harakat
  if (clean.startsWith("افعل")) return "af'al";
  if (clean.includes("فعلان")) return "fa'lan";
  if (clean.includes("فعول")) return "fa'ul";
  if (clean.includes("فعيل")) return "fa'il";
  if (clean.includes("فاعل")) return "fa'il_alif";
  if (clean.endsWith("فعل")) return "fa'l";
  if (clean.endsWith("فعل")) return "fa'al";
  
  return "samai";
}

function buildFaulAinLam(pattern: string, fa: string, ain: string, lam: string): string {
  return pattern.replace(/ف/g, fa).replace(/ع/g, ain).replace(/ل/g, lam);
}

function applyNaqisLafifMudaaf(pattern: string, fa: string, ain: string, lam: string): string {
  let base = pattern.replace(/ف/g, fa).replace(/ع/g, ain).replace(/ل/g, "");
  // Tasydid huruf terakhir = ain fiil
  return base.replace(/.$/, ain + "ّ");
}

export function analyzeSifatMusyabihatPlural(entry: DictionaryEntry): SifatMusyabihatPlural {
  const { fa = "", ain = "", lam = "" } = entry.root || {};
  const f = stripHarakat(fa), a = stripHarakat(ain), l = stripHarakat(lam);
  const binaKey = getBinaKey(entry.bina || "sahih");
  const mufrodMudzakkar = entry.mufrod || buildFaulAinLam("فَاعِلٌ", f, a, l);
  const wazan = detectWazan(mufrodMudzakkar);

  let mudzakkar = "—";
  let muannats = "—";
  let jamakTaksir = "—";
  let muntahal = "—";

  switch (wazan) {
    case "af'al":
      mudzakkar = buildFaulAinLam("أَفْعَلُ", f, a, l);
      muannats = buildFaulAinLam("فَعْلَاءُ", f, a, l);
      jamakTaksir = buildFaulAinLam("فُعْلٌ", f, a, l);
      muntahal = "-";
      break;

    case "fa'lan":
      mudzakkar = buildFaulAinLam("فَعْلَانُ", f, a, l);
      muannats = buildFaulAinLam("فَعْلَى", f, a, l);
      jamakTaksir = buildFaulAinLam("فِعَالٌ", f, a, l);
      muntahal = "-";
      break;

    case "fa'ul":
      mudzakkar = buildFaulAinLam("فَعُولٌ", f, a, l);
      muannats = buildFaulAinLam("فَعُولَةٌ", f, a, l);
      if (binaKey === "sahih" || binaKey === "mitsal") {
        jamakTaksir = buildFaulAinLam("فُعَلَاءُ", f, a, l);
        muntahal = buildFaulAinLam("فَعَائِلُ", f, a, l);
      } else if (binaKey === "ajwaf") {
        jamakTaksir = buildFaulAinLam("فِعَالٌ", f, a, l);
        muntahal = buildFaulAinLam("فَعَائِلُ", f, a, l);
      } else {
        jamakTaksir = applyNaqisLafifMudaaf("أَفْعِلَاءُ", f, a, l);
        muntahal = buildFaulAinLam("فَعَالَى", f, a, l);
      }
      break;

    case "fa'il":
      mudzakkar = buildFaulAinLam("فَعِيلٌ", f, a, l);
      muannats = buildFaulAinLam("فَعِيلَةٌ", f, a, l);
      if (binaKey === "sahih") {
        jamakTaksir = `${buildFaulAinLam("فُعَلَاءُ", f, a, l)} / ${buildFaulAinLam("أَفْعِلَاءُ", f, a, l)}`;
        muntahal = buildFaulAinLam("فَعَائِلُ", f, a, l);
      } else if (binaKey === "mitsal") {
        jamakTaksir = buildFaulAinLam("فُعَلَاءُ", f, a, l);
        muntahal = buildFaulAinLam("فَعَائِلُ", f, a, l);
      } else if (binaKey === "ajwaf") {
        jamakTaksir = buildFaulAinLam("فِعَالٌ", f, a, l);
        muntahal = buildFaulAinLam("فَعَائِلُ", f, a, l);
      } else {
        jamakTaksir = applyNaqisLafifMudaaf("أَفْعِلَاءُ", f, a, l);
        muntahal = buildFaulAinLam("فَعَالَى", f, a, l);
      }
      break;

    case "fa'al":
      mudzakkar = buildFaulAinLam("فَعَلٌ", f, a, l);
      muannats = buildFaulAinLam("فَعَلَةٌ", f, a, l);
      jamakTaksir = `${buildFaulAinLam("فِعَالٌ", f, a, l)} / ${buildFaulAinLam("أَفْعَالٌ", f, a, l)}`;
      muntahal = buildFaulAinLam("مَفَاعِلُ", f, a, l);
      break;

    case "fa'l":
      mudzakkar = buildFaulAinLam("فَعْلٌ", f, a, l);
      muannats = buildFaulAinLam("فَعْلَةٌ", f, a, l);
      jamakTaksir = `${buildFaulAinLam("فِعَالٌ", f, a, l)} / ${buildFaulAinLam("فُعُولٌ", f, a, l)}`;
      muntahal = "-";
      break;

    case "fa'il_ksr":
      mudzakkar = buildFaulAinLam("فَعِلٌ", f, a, l);
      muannats = buildFaulAinLam("فَعِلَةٌ", f, a, l);
      jamakTaksir = `${buildFaulAinLam("فَعِلُونَ", f, a, l)} / ${buildFaulAinLam("أَفْعَالٌ", f, a, l)}`;
      muntahal = "-";
      break;

    case "fa'il_alif":
      mudzakkar = mufrodMudzakkar;
      muannats = entry.muannats || buildFaulAinLam("فَاعِلَةٌ", f, a, l);
      if (binaKey === "sahih" || binaKey === "mudaaf") {
        jamakTaksir = buildFaulAinLam("أَفْعَالٌ", f, a, l);
      } else {
        jamakTaksir = entry.sifatMusyabbahSamai || "—";
      }
      muntahal = "-";
      break;

    default:
      mudzakkar = mufrodMudzakkar;
      muannats = entry.muannats || "—";
      jamakTaksir = entry.sifatMusyabbahSamai || "—";
      muntahal = entry.muntahalJumu || "—";
      break;
  }

  return {
    wazan: wazan === "samai" ? "samai" : mufrodMudzakkar,
    tabel: {
      mufrodMudzakkar: mudzakkar,
      mufrodMuannats: muannats,
      jamakTaksir: jamakTaksir,
      shigotMuntahalJumu: muntahal
    },
    reference: "Sharh Syudzurudz Dzahab, Tasrif Izziy, Qatrunnada"
  };
}
