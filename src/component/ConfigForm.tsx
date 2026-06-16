import React, { useState, useEffect } from "react";
import { SyncConfig } from "../types";
import { Settings, ShieldCheck, RefreshCw, Key, Save, AlertCircle } from "lucide-react";

interface ConfigFormProps {
  onConfigSaved: () => void;
}

export default function ConfigForm({ onConfigSaved }: ConfigFormProps) {
  const [config, setConfig] = useState<any>(null);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState<SyncConfig>({
    midtransMerchantId: "",
    midtransClientKey: "",
    midtransServerKey: "",
    oneSignalAppId: "",
    oneSignalRestKey: ""
  });
  const [saving, setSaving] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const fetchConfig = async () => {
    try {
      const res = await fetch("/api/config");
      if (res.ok) {
        const data = await res.json();
        setConfig(data);
        setFormData({
          midtransMerchantId: data.fullConfigForEditing.midtransMerchantId,
          midtransClientKey: data.fullConfigForEditing.midtransClientKey,
          midtransServerKey: data.fullConfigForEditing.midtransServerKey,
          oneSignalAppId: data.fullConfigForEditing.oneSignalAppId,
          oneSignalRestKey: data.fullConfigForEditing.oneSignalRestKey
        });
      }
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    fetchConfig();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setErrorMessage("");
    setSuccessMessage("");

    try {
      const res = await fetch("/api/config", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });

      if (res.ok) {
        setSuccessMessage("Kredensial berhasil diperbarui!");
        setEditMode(false);
        fetchConfig();
        onConfigSaved();
      } else {
        const err = await res.json();
        setErrorMessage(err.error || "Gagal mengupdate kredensial.");
      }
    } catch (err) {
      setErrorMessage("Koneksi gagal ke server API.");
    } finally {
      setSaving(false);
    }
  };

  if (!config) {
    return (
      <div className="flex items-center justify-center p-8 bg-white border border-slate-100 rounded-2xl animate-pulse">
        <RefreshCw className="w-6 h-6 animate-spin text-indigo-500 mr-2" />
        <span className="text-sm text-slate-500 font-medium">Memuat konfigurasi...</span>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
      <div className="flex items-center justify-between mb-4 pb-4 border-b border-slate-100">
        <div className="flex items-center space-x-2.5">
          <Settings className="w-5 h-5 text-indigo-600" />
          <h2 className="font-semibold text-slate-800">Manajemen Kredensial</h2>
        </div>
        {!editMode ? (
          <button
            onClick={() => setEditMode(true)}
            className="text-xs font-semibold text-indigo-600 hover:text-indigo-700 bg-indigo-50 px-3 py-1.5 rounded-lg transition-colors"
          >
            Edit Kredensial
          </button>
        ) : (
          <button
            onClick={() => {
              setEditMode(false);
              setErrorMessage("");
              setSuccessMessage("");
            }}
            className="text-xs font-semibold text-slate-500 hover:text-slate-600 px-3 py-1.5 rounded-lg transition-colors border border-slate-200"
          >
            Batal
          </button>
        )}
      </div>

      {successMessage && (
        <div className="mb-4 bg-emerald-50 text-emerald-800 p-3 rounded-xl border border-emerald-100 text-xs flex items-center">
          <ShieldCheck className="w-4 h-4 mr-2" />
          {successMessage}
        </div>
      )}

      {errorMessage && (
        <div className="mb-4 bg-rose-50 text-rose-800 p-3 rounded-xl border border-rose-100 text-xs flex items-center">
          <AlertCircle className="w-4 h-4 mr-2" />
          {errorMessage}
        </div>
      )}

      {!editMode ? (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-indigo-50/40 p-4 rounded-xl border border-indigo-100/40 space-y-2.5">
              <h3 className="text-xs font-bold text-indigo-900 tracking-wider uppercase flex items-center">
                <span className="w-2 h-2 rounded-full bg-indigo-500 mr-2"></span>
                MIDTRANS MERCHANDISE
              </h3>
              <div className="text-xs space-y-1 text-slate-600">
                <p><span className="font-medium text-slate-500">Merchant ID:</span> <span className="font-mono text-indigo-900 font-semibold">{config.midtransMerchantId}</span></p>
                <p className="truncate"><span className="font-medium text-slate-500">Client Key:</span> <span className="font-mono">{config.midtransClientKey}</span></p>
                <p><span className="font-medium text-slate-500">Server Key:</span> <span className="font-mono text-slate-500">{config.midtransServerKeyMasked}</span></p>
              </div>
            </div>
            
            <div className="bg-orange-50/40 p-4 rounded-xl border border-orange-100/40 space-y-2.5">
              <h3 className="text-xs font-bold text-orange-950 tracking-wider uppercase flex items-center">
                <span className="w-2 h-2 rounded-full bg-orange-500 mr-2"></span>
                ONESIGNAL SYSTEM
              </h3>
              <div className="text-xs space-y-1 text-slate-600">
                <p className="truncate"><span className="font-medium text-slate-500">App ID:</span> <span className="font-mono text-orange-950 font-semibold">{config.oneSignalAppId}</span></p>
                <p className="truncate"><span className="font-medium text-slate-500">REST API Key:</span> <span className="font-mono text-slate-500">{config.oneSignalRestKeyMasked}</span></p>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-2 text-xs text-slate-500 mt-2">
            <ShieldCheck className="w-4 h-4 text-emerald-500" />
            <p>Parameter di atas tersinkronisasi otomatis di backend Express untuk otorisasi API aman.</p>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-3">
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">Midtrans Merchant ID</label>
              <input
                type="text"
                name="midtransMerchantId"
                value={formData.midtransMerchantId}
                onChange={handleChange}
                required
                className="w-full text-xs font-mono border border-slate-200 rounded-xl px-3 py-2 focus:ring-2 focus:ring-indigo-100 focus:border-indigo-500 outline-none transition-all"
              />
            </div>
            
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">Midtrans Client Key</label>
              <input
                type="text"
                name="midtransClientKey"
                value={formData.midtransClientKey}
                onChange={handleChange}
                required
                className="w-full text-xs font-mono border border-slate-200 rounded-xl px-3 py-2 focus:ring-2 focus:ring-indigo-100 focus:border-indigo-500 outline-none transition-all"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">Midtrans Server Key</label>
              <input
                type="text"
                name="midtransServerKey"
                value={formData.midtransServerKey}
                onChange={handleChange}
                required
                className="w-full text-xs font-mono border border-slate-200 rounded-xl px-3 py-2 focus:ring-2 focus:ring-indigo-100 focus:border-indigo-500 outline-none transition-all"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">OneSignal App ID</label>
              <input
                type="text"
                name="oneSignalAppId"
                value={formData.oneSignalAppId}
                onChange={handleChange}
                required
                className="w-full text-xs font-mono border border-slate-200 rounded-xl px-3 py-2 focus:ring-2 focus:ring-indigo-100 focus:border-indigo-500 outline-none transition-all"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">OneSignal Server Key (REST API Key)</label>
              <input
                type="password"
                name="oneSignalRestKey"
                value={formData.oneSignalRestKey}
                onChange={handleChange}
                required
                className="w-full text-xs font-mono border border-slate-200 rounded-xl px-3 py-2 focus:ring-2 focus:ring-indigo-100 focus:border-indigo-500 outline-none transition-all"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={saving}
            className="w-full flex items-center justify-center space-x-2 py-2 px-4 rounded-xl text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 transition-colors disabled:opacity-50 cursor-pointer shadow-sm shadow-indigo-200"
          >
            {saving ? (
              <RefreshCw className="w-3.5 h-3.5 animate-spin" />
            ) : (
              <Save className="w-3.5 h-3.5" />
            )}
            <span>Simpan Perubahan Kredensial</span>
          </button>
        </form>
      )}
    </div>
  );
}
