/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { DictionaryEntry } from "../types";

const DB_NAME = "ShorofKamusDB";
const STORE_NAME = "dictionary_entries";
const DB_VERSION = 1;

/**
 * Initializes the IndexedDB instance for local dictionary caching.
 */
export const initIndexedDB = (): Promise<IDBDatabase> => {
  return new Promise((resolve, reject) => {
    if (typeof window === "undefined" || !window.indexedDB) {
      reject(new Error("IndexedDB is not supported in this environment"));
      return;
    }

    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onerror = () => {
      console.error("IndexedDB failed to open:", request.error);
      reject(request.error);
    };

    request.onsuccess = () => {
      resolve(request.result);
    };

    request.onupgradeneeded = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: "id" });
      }
    };
  });
};

/**
 * Saves all dictionary entries into IndexedDB (clears previous data first).
 */
export const saveEntriesToIndexedDB = async (entries: DictionaryEntry[]): Promise<void> => {
  try {
    const db = await initIndexedDB();
    return new Promise<void>((resolve, reject) => {
      const transaction = db.transaction(STORE_NAME, "readwrite");
      const store = transaction.objectStore(STORE_NAME);

      const clearRequest = store.clear();
      clearRequest.onsuccess = () => {
        entries.forEach((item) => {
          store.put(item);
        });
      };

      transaction.oncomplete = () => {
        console.log(`Berhasil menyimpan ${entries.length} entri kamus ke IndexedDB caching.`);
        resolve();
      };

      transaction.onerror = () => {
        console.error("Transaksi IndexedDB gagal:", transaction.error);
        reject(transaction.error);
      };
    });
  } catch (err) {
    console.warn("IndexedDB save warning:", err);
  }
};

/**
 * Retrieves all cached dictionary entries from IndexedDB.
 */
export const loadEntriesFromIndexedDB = async (): Promise<DictionaryEntry[]> => {
  try {
    const db = await initIndexedDB();
    return new Promise<DictionaryEntry[]>((resolve, reject) => {
      const transaction = db.transaction(STORE_NAME, "readonly");
      const store = transaction.objectStore(STORE_NAME);
      const request = store.getAll();

      request.onsuccess = () => {
        resolve(request.result || []);
      };

      request.onerror = () => {
        console.error("Gagal memuat data dari IndexedDB:", request.error);
        reject(request.error);
      };
    });
  } catch (err) {
    console.warn("IndexedDB load warning:", err);
    return [];
  }
};
