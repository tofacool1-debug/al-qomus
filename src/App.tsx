import React, { useState, useEffect } from "react";
import ConfigForm from "./components/ConfigForm";
import WebhookInfo from "./components/WebhookInfo";
import TransactionList from "./components/TransactionList";
import NotificationLogList from "./components/NotificationLogList";
import { Transaction, NotificationLog } from "./types";
import { ShieldCheck, Flame, BellRing, RefreshCw } from "lucide-react";

export default function App() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [logs, setLogs] = useState<NotificationLog[]>([]);
  const [refreshing, setRefreshing] = useState(false);

  const fetchTransactions = async () => {
    try {
      const res = await fetch("/api/transactions");
      if (res.ok) {
        const data = await res.json();
        setTransactions(data);
      }
    } catch (e) {
      console.error("Gagal memuat transaksi:", e);
    }
  };

  const fetchLogs = async () => {
    try {
      const res = await fetch("/api/notification-logs");
      if (res.ok) {
        const data = await res.json();
        setLogs(data);
      }
    } catch (e) {
      console.error("Gagal memuat log notifikasi:", e);
    }
  };

  const handleRefreshAll = async () => {
    setRefreshing(true);
    await Promise.all([fetchTransactions(), fetchLogs()]);
    setRefreshing(false);
  };

  useEffect(() => {
    handleRefreshAll();
  }, []);

  const handleSimulateStatus = async (id: string, status: Transaction["status"]) => {
    try {
      const res = await fetch("/api/simulate-status", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          id,
          status,
          paymentType: "gopay"
        })
      });

      if (res.ok) {
        await handleRefreshAll();
      }
    } catch (e) {
      console.error("Gagal melakukan simulasi status:", e);
    }
  };

  const handleSendCustomNotification = async (title: string, message: string): Promise<boolean> => {
    try {
      const res = await fetch("/api/send-notification", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          title,
          message
        })
      });

      if (res.ok) {
        await handleRefreshAll();
        return true;
      }
    } catch (e) {
      console.error("Gagal mengirim kustom notifikasi:", e);
    }
    return false;
  };

  return (
    <div className="min-h-screen bg-slate-50/70 text-slate-800 font-sans">
      {/* Top Stylish Header */}
      <nav id="header-nav" className="bg-white border-b border-slate-100 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-tr from-indigo-600 via-indigo-500 to-orange-500 rounded-xl flex items-center justify-center text-white font-extrabold shadow-md shadow-indigo-150">
                M
              </div>
              <div>
                <span className="font-extrabold text-[15px] sm:text-base text-slate-900 tracking-tight block leading-none">
                  Midtrans &lt;&gt; OneSignal Sync
                </span>
                <span className="text-[10px] sm:text-xs text-slate-400 font-semibold uppercase tracking-wider block mt-1">
                  Integrasi Otomatis Push Kontrol Panel
                </span>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <button
                onClick={handleRefreshAll}
                disabled={refreshing}
                className="flex items-center space-x-2 py-1.5 px-3 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-xs font-semibold text-slate-600 transition-all cursor-pointer disabled:opacity-50"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${refreshing ? "animate-spin" : ""}`} />
                <span className="hidden sm:inline">Refresh Data</span>
              </button>
              
              <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold bg-indigo-50 text-indigo-700 animate-pulse border border-indigo-100">
                <ShieldCheck className="w-3.5 h-3.5 mr-1 text-indigo-500" />
                Live Connection
              </span>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        
        {/* Banner Penjelasan */}
        <div className="bg-gradient-to-br from-slate-900 via-slate-900 to-indigo-950 text-white rounded-3xl p-6 sm:p-8 relative overflow-hidden shadow-xl border border-slate-800">
          <div className="absolute right-0 bottom-0 opacity-10 pointer-events-none transform translate-x-12 translate-y-12">
            <Flame className="w-96 h-96 text-indigo-400" />
          </div>
          <div className="relative z-10 max-w-3xl space-y-3">
            <span className="inline-flex items-center px-2.5 py-1 rounded bg-amber-400/20 text-amber-300 text-xs font-semibold uppercase tracking-wider">
              Solusi Sinkronisasi Pembayaran & Notifikasi
            </span>
            <h1 className="text-xl sm:text-3xl font-extrabold tracking-tight text-white leading-tight">
              Kirim Push Notifikasi OneSignal Instan dari Status Transaksi Midtrans
            </h1>
            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed font-normal">
              Website ini dirancang untuk menyinkronkan data pembayaran tagihan Midtrans. Setiap status pembayaran yang berubah baik melalui simulasi lokal, callback manual, ataupun Webhook nyata dari server Midtrans akan memicu notifikasi mobile / web push melalui platform OneSignal secara langsung.
            </p>
          </div>
        </div>

        {/* Baris Atas: Kredensial & Info Webhook */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ConfigForm onConfigSaved={handleRefreshAll} />
          <WebhookInfo />
        </div>

        {/* Baris Bawah: Manajemen Transaksi & Logs */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <TransactionList 
              transactions={transactions} 
              onRefresh={handleRefreshAll} 
              onSimulateStatus={handleSimulateStatus} 
            />
          </div>
          <div className="lg:col-span-1">
            <NotificationLogList 
              logs={logs} 
              onRefresh={handleRefreshAll} 
              onSendCustomNotification={handleSendCustomNotification} 
            />
          </div>
        </div>

      </main>

      <footer className="bg-white border-t border-slate-100 py-6 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400 font-semibold uppercase tracking-widest">
          <div>
            Midtrans Merchant: M167123404
          </div>
          <div>
            OneSignal Hub | Sandbox Ter-Integrasi
          </div>
        </div>
      </footer>
    </div>
  );
}
