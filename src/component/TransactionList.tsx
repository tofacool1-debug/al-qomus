import React, { useState, useEffect } from "react";
import { Transaction } from "../types";
import { 
  CreditCard, Plus, HelpCircle, RefreshCw, CheckCircle2, 
  Hourglass, Ban, AlertTriangle, Play, ChevronRight, Check
} from "lucide-react";

interface TransactionListProps {
  transactions: Transaction[];
  onRefresh: () => void;
  onSimulateStatus: (id: string, status: Transaction["status"]) => void;
}

export default function TransactionList({ transactions, onRefresh, onSimulateStatus }: TransactionListProps) {
  const [showAddModal, setShowAddModal] = useState(false);
  const [formData, setFormData] = useState({
    amount: "150000",
    customerName: "",
    customerEmail: "",
    itemDetails: ""
  });
  const [creating, setCreating] = useState(false);
  const [successInfo, setSuccessInfo] = useState<{ snapToken?: string; snapUrl?: string; orderId?: string } | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleCreateTransaction = async (e: React.FormEvent) => {
    e.preventDefault();
    setCreating(true);
    setSuccessInfo(null);
    try {
      const response = await fetch("/api/transactions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          amount: Number(formData.amount),
          customerName: formData.customerName,
          customerEmail: formData.customerEmail,
          itemDetails: formData.itemDetails
        })
      });

      if (response.ok) {
        const data = await response.json();
        setSuccessInfo({
          snapToken: data.snapToken,
          snapUrl: data.snapUrl,
          orderId: data.transaction?.id
        });
        onRefresh();
        setFormData({
          amount: "150000",
          customerName: "",
          customerEmail: "",
          itemDetails: ""
        });
      }
    } catch (e) {
      console.error(e);
    } finally {
      setCreating(false);
    }
  };

  const getStatusBadge = (status: Transaction["status"]) => {
    switch (status) {
      case "settlement":
      case "success":
        return (
          <span className="inline-flex items-center space-x-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-100">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Success / Settled</span>
          </span>
        );
      case "pending":
        return (
          <span className="inline-flex items-center space-x-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-50 text-amber-700 border border-amber-100">
            <Hourglass className="w-3.5 h-3.5 animate-spin-slow" />
            <span>Pending</span>
          </span>
        );
      case "expire":
        return (
          <span className="inline-flex items-center space-x-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-slate-50 text-slate-500 border border-slate-200">
            <Ban className="w-3.5 h-3.5" />
            <span>Expired</span>
          </span>
        );
      case "cancel":
        return (
          <span className="inline-flex items-center space-x-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-rose-50 text-rose-700 border border-rose-100">
            <Ban className="w-3.5 h-3.5" />
            <span>Canceled</span>
          </span>
        );
      case "deny":
        return (
          <span className="inline-flex items-center space-x-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-red-100 text-red-800 border border-red-200">
            <AlertTriangle className="w-3.5 h-3.5" />
            <span>Denied</span>
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center space-x-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-slate-100 text-slate-700">
            <span>{status}</span>
          </span>
        );
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-lg font-bold text-slate-800">Daftar Transaksi</h2>
          <p className="text-xs text-slate-500">
            Monitor, buat, dan simulasikan alur pembayaran Midtrans lokal Anda.
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={onRefresh}
            className="p-2 text-slate-600 hover:text-indigo-600 hover:bg-slate-50 border border-slate-200 bg-white rounded-xl transition-all"
            title="Refresh Data"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
          <button
            onClick={() => {
              setShowAddModal(true);
              setSuccessInfo(null);
            }}
            className="flex items-center space-x-1.5 py-2 px-3.5 rounded-xl text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 transition-colors shadow-sm shadow-indigo-100 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Buat Transaksi</span>
          </button>
        </div>
      </div>

      {transactions.length === 0 ? (
        <div className="bg-white border border-slate-100 rounded-2xl p-12 text-center">
          <CreditCard className="w-12 h-12 text-slate-300 mx-auto mb-3" />
          <p className="text-sm font-medium text-slate-600">Belum Ada Transaksi</p>
          <p className="text-xs text-slate-400 mt-1">Buat transaksi baru untuk menguji integrasi Midtrans & OneSignal.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-3">
          {transactions.map((tx) => (
            <div 
              key={tx.id} 
              className="bg-white rounded-2xl border border-slate-100 p-5 shadow-sm hover:shadow-md transition-all flex flex-col md:flex-row md:items-center justify-between gap-4"
            >
              <div className="space-y-3 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="font-mono text-xs font-bold text-slate-900 bg-slate-100 rounded-lg px-2.5 py-1">
                    {tx.id}
                  </span>
                  {getStatusBadge(tx.status)}
                  <span className="font-semibold text-xs text-slate-400">
                    {new Date(tx.createdAt).toLocaleTimeString("id", { hour: "2-digit", minute: "2-digit" })} WIB
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-y-2 gap-x-4">
                  <div>
                    <label className="block text-[10px] font-semibold text-slate-400 uppercase tracking-wider">Item</label>
                    <p className="text-sm font-medium text-slate-700 truncate">{tx.itemDetails}</p>
                  </div>
                  <div>
                    <label className="block text-[10px] font-semibold text-slate-400 uppercase tracking-wider">Pelanggan</label>
                    <p className="text-sm font-medium text-slate-700 truncate">
                      {tx.customerName} <span className="text-slate-400 font-normal text-xs">({tx.customerEmail})</span>
                    </p>
                  </div>
                  <div>
                    <label className="block text-[10px] font-semibold text-slate-400 uppercase tracking-wider font-semibold">Nominal</label>
                    <p className="text-sm font-bold text-slate-950 font-mono">
                      Rp {tx.amount.toLocaleString("id-ID")}
                    </p>
                  </div>
                </div>

                {tx.midtransTransactionId && (
                  <p className="text-[11px] text-slate-400 font-mono truncate">
                    Midtrans ID: {tx.midtransTransactionId}
                  </p>
                )}
              </div>

              {/* Simulation Actions */}
              <div className="bg-slate-50 rounded-xl p-3 border border-slate-100 flex flex-col justify-center space-y-1.5 shrink-0 min-w-[200px]">
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block text-center mb-1">
                  Kontrol Simulasi Status
                </span>
                
                {tx.status === "pending" ? (
                  <div className="grid grid-cols-2 gap-1.5">
                    <button
                      onClick={() => onSimulateStatus(tx.id, "settlement")}
                      className="flex items-center justify-center space-x-1 py-1 px-2 text-[10px] font-semibold bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
                    >
                      <Play className="w-3 h-3 fill-current" />
                      <span>Settle / Bayar</span>
                    </button>
                    <button
                      onClick={() => onSimulateStatus(tx.id, "expire")}
                      className="flex items-center justify-center space-x-1 py-1 px-2 text-[10px] font-semibold bg-slate-200 text-slate-700 rounded-lg hover:bg-slate-300 transition-colors"
                    >
                      <span>Expired</span>
                    </button>
                  </div>
                ) : (
                  <div className="text-center">
                    <span className="inline-flex text-[11px] text-slate-400 font-medium">
                      Simulasi Selesai
                    </span>
                    <button
                      onClick={() => onSimulateStatus(tx.id, "pending")}
                      className="block mx-auto mt-1 text-[11px] font-semibold text-indigo-600 hover:underline"
                    >
                      Kembalikan ke Pending
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add Transaction Modal & Success State */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center bg-slate-900/40 backdrop-blur-xs p-4">
          <div className="relative bg-white rounded-2xl max-w-md w-full p-6 shadow-xl border border-slate-100 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
              <h3 className="font-bold text-slate-800">Buat Transaksi Baru</h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-slate-400 hover:text-slate-600 font-semibold"
              >
                ✕
              </button>
            </div>

            {!successInfo ? (
              <form onSubmit={handleCreateTransaction} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">Nama Pembeli</label>
                  <input
                    type="text"
                    name="customerName"
                    value={formData.customerName}
                    onChange={handleInputChange}
                    placeholder="Contoh: Andi Wijaya"
                    required
                    className="w-full text-xs border border-slate-200 rounded-xl px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-100 focus:border-indigo-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">Email Pembeli</label>
                  <input
                    type="email"
                    name="customerEmail"
                    value={formData.customerEmail}
                    onChange={handleInputChange}
                    placeholder="Contoh: andi@email.com"
                    required
                    className="w-full text-xs border border-slate-200 rounded-xl px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-100 focus:border-indigo-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">Produk / Layanan</label>
                  <input
                    type="text"
                    name="itemDetails"
                    value={formData.itemDetails}
                    onChange={handleInputChange}
                    placeholder="Contoh: Paket Premium Design"
                    required
                    className="w-full text-xs border border-slate-200 rounded-xl px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-100 focus:border-indigo-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">Nominal Transaksi (Rupiah)</label>
                  <div className="relative">
                    <span className="absolute left-3 top-2 text-xs font-bold text-slate-400">Rp</span>
                    <input
                      type="number"
                      name="amount"
                      value={formData.amount}
                      onChange={handleInputChange}
                      required
                      min="1000"
                      className="w-full text-xs font-mono font-bold border border-slate-200 rounded-xl pl-9 pr-3 py-2 outline-none focus:ring-2 focus:ring-indigo-100 focus:border-indigo-500 text-slate-800"
                    />
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={creating}
                    className="w-full cursor-pointer py-2.5 hover:bg-indigo-700 bg-indigo-600 text-white rounded-xl text-xs font-bold transition-all flex items-center justify-center space-x-2 shadow-md shadow-indigo-155"
                  >
                    {creating && <RefreshCw className="w-3.5 h-3.5 animate-spin" />}
                    <span>Keluarkan invoice ({Number(formData.amount).toLocaleString("id-ID")})</span>
                  </button>
                </div>
              </form>
            ) : (
              <div className="space-y-4">
                <div className="bg-emerald-50 text-emerald-800 p-4 rounded-xl border border-emerald-100 text-center">
                  <Check className="w-8 h-8 mx-auto text-emerald-500 mb-2 border-2 border-emerald-500 rounded-full p-0.5" />
                  <h4 className="font-bold text-sm">Invoice Sukses Dibuat!</h4>
                  <p className="text-xs text-emerald-700 mt-1">
                    Transaksi <strong className="font-mono">{successInfo.orderId}</strong> tersimpan di sistem lokal, dan push notifikasi OneSignal awal langsung dikirim ke pelanggan!
                  </p>
                </div>

                {successInfo.snapToken && (
                  <div className="space-y-2">
                    <label className="block text-xs font-semibold text-slate-600">Midtrans Snap Sandbox Token</label>
                    <code className="block bg-slate-50 border border-slate-200 text-[10px] p-2.5 rounded-lg select-all text-slate-600 break-all font-mono">
                      {successInfo.snapToken}
                    </code>
                    
                    <a
                      href={successInfo.snapUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center justify-center space-x-2 py-2.5 bg-sky-500 hover:bg-sky-600 text-white font-bold rounded-xl text-xs transition-colors cursor-pointer text-center shadow-lg shadow-sky-100"
                    >
                      <CreditCard className="w-3.5 h-3.5" />
                      <span>Bayar via Snap Sandbox &gt;</span>
                    </a>
                  </div>
                )}

                <div className="flex space-x-2 pt-2">
                  <button
                    onClick={() => setSuccessInfo(null)}
                    className="flex-1 text-xs font-bold text-indigo-600 border border-indigo-200 hover:bg-indigo-50 py-2.5 rounded-xl transition-all"
                  >
                    Buat Lagi
                  </button>
                  <button
                    onClick={() => setShowAddModal(false)}
                    className="flex-1 text-xs font-bold bg-slate-800 text-white hover:bg-slate-900 py-2.5 rounded-xl transition-all"
                  >
                    Tutup
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
