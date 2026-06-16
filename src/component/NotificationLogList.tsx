import React, { useState } from "react";
import { NotificationLog } from "../types";
import { Bell, RefreshCw, Send, ShieldAlert, CheckCircle, XCircle } from "lucide-react";

interface NotificationLogListProps {
  logs: NotificationLog[];
  onRefresh: () => void;
  onSendCustomNotification: (title: string, message: string) => Promise<boolean>;
}

export default function NotificationLogList({ logs, onRefresh, onSendCustomNotification }: NotificationLogListProps) {
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);
  const [showForm, setShowForm] = useState(false);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !message) return;
    setSending(true);
    const success = await onSendCustomNotification(title, message);
    if (success) {
      setTitle("");
      setMessage("");
      setShowForm(false);
    }
    setSending(false);
  };

  return (
    <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2.5">
          <div className="p-2 bg-orange-50 text-orange-600 rounded-xl">
            <Bell className="w-5 h-5" />
          </div>
          <div>
            <h2 className="font-semibold text-slate-800">Log Notifikasi OneSignal</h2>
            <p className="text-xs text-slate-500">Histori terkirimnya pesan push notification</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={onRefresh}
            className="p-1 px-2.5 text-slate-500 hover:text-indigo-600 border border-slate-100 rounded-lg hover:bg-slate-50 transition-all"
            title="Refresh logs"
          >
            <RefreshCw className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => setShowForm(!showForm)}
            className="text-xs font-semibold text-orange-700 bg-orange-50 hover:bg-orange-100 px-3 py-1.5 rounded-lg transition-colors cursor-pointer"
          >
            {showForm ? "Sembunyikan form" : "Kirim Test Push"}
          </button>
        </div>
      </div>

      {showForm && (
        <form onSubmit={handleSend} className="bg-slate-50 p-4 rounded-xl border border-slate-150 mb-4 space-y-3">
          <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wide">Kirim Kustom Push Notifikasi</h3>
          
          <div>
            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Judul Notifikasi</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Contoh: Info Diskon Menarik! 🔥"
              required
              className="w-full text-xs border border-slate-200 rounded-xl px-3 py-2 outline-none focus:ring-2 focus:ring-orange-100 bg-white"
            />
          </div>

          <div>
            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Pesan Notifikasi</label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Masukkan isi pesan pengingat untuk pengguna mobile / web app Anda..."
              required
              rows={2}
              className="w-full text-xs border border-slate-200 rounded-xl px-3 py-2 outline-none focus:ring-2 focus:ring-orange-100 bg-white"
            />
          </div>

          <button
            type="submit"
            disabled={sending}
            className="w-full flex items-center justify-center space-x-1.5 py-2 px-4 rounded-xl text-xs font-semibold text-white bg-orange-600 hover:bg-orange-700 transition-colors disabled:opacity-50 cursor-pointer"
          >
            <Send className="w-3.5 h-3.5" />
            <span>{sending ? "Mengirim ke OneSignal..." : "Kirim Live Push"}</span>
          </button>
        </form>
      )}

      {logs.length === 0 ? (
        <div className="text-center p-8 border border-dashed border-slate-200 rounded-2xl bg-slate-50/50">
          <Bell className="w-8 h-8 text-slate-300 mx-auto mb-2" />
          <p className="text-xs text-slate-500 font-medium">Belum ada aktivitas push log.</p>
          <p className="text-[10px] text-slate-400 mt-1">Sertakan validasi OneSignal atau coba kirim simulasi di atas.</p>
        </div>
      ) : (
        <div className="space-y-3 max-h-[350px] overflow-y-auto pr-1">
          {logs.map((log) => (
            <div key={log.id} className="border border-slate-100 rounded-xl p-3 bg-slate-50/60 hover:bg-slate-50 transition-colors">
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-2">
                  {log.status === "sent" ? (
                    <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0" />
                  ) : (
                    <XCircle className="w-4 h-4 text-rose-500 shrink-0" />
                  )}
                  <span className="font-semibold text-xs text-slate-800 truncate max-w-[200px]">
                    {log.title}
                  </span>
                </div>
                <span className="text-[9px] font-mono font-medium text-slate-400 shrink-0">
                  {new Date(log.createdAt).toLocaleTimeString("id", { hour: "2-digit", minute: "2-digit" })} WIB
                </span>
              </div>
              <p className="text-xs text-slate-600 mt-1.5 line-clamp-2 leading-relaxed">
                {log.message}
              </p>
              
              {/* Optional transactional context */}
              <div className="mt-2 pt-2 border-t border-slate-200/50 flex items-center justify-between">
                <span className="text-[9px] text-slate-500">
                  Order Ref: <strong className="font-mono text-slate-700">{log.transactionId}</strong>
                </span>
                
                <details className="text-[9px] text-slate-500 cursor-pointer hover:text-indigo-600">
                  <summary className="outline-none">Lihat Payload API Response</summary>
                  <pre className="mt-1.5 p-2 bg-slate-900 text-amber-400 font-mono text-[9px] rounded-lg overflow-x-auto max-w-full">
                    {JSON.stringify(JSON.parse(log.payload || "{}"), null, 2)}
                  </pre>
                </details>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
