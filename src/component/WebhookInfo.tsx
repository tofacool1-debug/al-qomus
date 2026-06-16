import React, { useState } from "react";
import { Check, Copy, HelpCircle, Link2, Bell } from "lucide-react";

export default function WebhookInfo() {
  const [copied, setCopied] = useState(false);
  const currentUrl = window.location.origin;
  const webhookUrl = `${currentUrl}/api/midtrans-webhook`;

  const handleCopy = () => {
    navigator.clipboard.writeText(webhookUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm transition-all hover:shadow-md">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="p-2.5 bg-emerald-50 text-emerald-600 rounded-xl">
            <Link2 className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-semibold text-slate-800">Midtrans Webhook URL</h3>
            <p className="text-xs text-slate-500">Gunakan URL ini di Dashboard Midtrans Anda</p>
          </div>
        </div>
        <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-emerald-50 text-emerald-700">
          <span className="w-1.5 h-1.5 mr-1.5 bg-emerald-500 rounded-full animate-ping"></span>
          Aktif
        </span>
      </div>

      <div className="bg-slate-50 rounded-xl p-3 border border-slate-200/60 flex items-center justify-between mb-4">
        <code className="text-xs font-mono text-slate-600 truncate mr-2 select-all">
          {webhookUrl}
        </code>
        <button
          onClick={handleCopy}
          className="p-2 text-slate-500 hover:text-indigo-600 transition-colors bg-white hover:bg-slate-100 rounded-lg shadow-sm shrink-0 border border-slate-200"
          title="Salin Webhook URL"
        >
          {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
        </button>
      </div>

      <div className="space-y-3">
        <h4 className="text-xs font-semibold text-slate-700 uppercase tracking-wider">Langkah Sinkronisasi Webhook:</h4>
        <ol className="text-xs text-slate-600 space-y-2 list-decimal list-inside pl-1 leading-relaxed">
          <li>
            Masuk ke{" "}
            <a
              href="https://dashboard.sandbox.midtrans.com/login"
              target="_blank"
              rel="noreferrer"
              className="text-indigo-600 hover:underline font-medium"
            >
              Midtrans Sandbox Dashboard
            </a>
          </li>
          <li>
            Pilih menu <strong className="text-slate-800">Settings</strong> &gt;{" "}
            <strong className="text-slate-800">Configuration</strong>
          </li>
          <li>
            Tempelkan URL di atas ke kolom <strong className="text-slate-800">Payment Notification URL</strong>
          </li>
          <li>
            Klik tombol <strong className="text-slate-800">Save</strong>. Setiap kali transaksi dibayar, dibatalkan, atau kedaluwarsa di Midtrans, push notifikasi OneSignal akan otomatis terpicu secara langsung!
          </li>
        </ol>
      </div>
    </div>
  );
}
