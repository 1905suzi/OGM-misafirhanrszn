"use client";

import { useEffect, useState, useCallback } from "react";
import { useSession } from "next-auth/react";
import { adminKullanicilar, adminKullaniciAktivasyon, adminKullaniciEkle, adminKullaniciGuncelle, adminKullaniciSil, apiError } from "@/lib/api";
import { rolRengi } from "@/lib/format";
import type { Kullanici, KullaniciRol } from "@/lib/types";

const TUM_ROLLER: KullaniciRol[] = ["Misafir", "Personel", "Yönetici"];

const BOS_FORM = {
  tcSicilNo: "",
  adSoyad: "",
  eposta: "",
  rol: "Misafir" as KullaniciRol,
  aktif: true,
};

export default function KullaniciYonetimi() {
  const [kullanicilar, setKullanicilar] = useState<Kullanici[]>([]);
  const [aramaMetni, setAramaMetni] = useState("");
  const [rolFiltre, setRolFiltre] = useState<KullaniciRol | "Tümü">("Tümü");
  const [durumFiltre, setDurumFiltre] = useState<"Tümü" | "Aktif" | "Pasif">("Tümü");
  const [panelAcik, setPanelAcik] = useState(false);
  const [duzenlemeModu, setDuzenlemeModu] = useState<Kullanici | null>(null);
  const [form, setForm] = useState(BOS_FORM);
  const [silOnay, setSilOnay] = useState<string | null>(null);
  const [hata, setHata] = useState("");

  const { data: oturum } = useSession();
  const token = (oturum as { accessToken?: string } | null)?.accessToken ?? "";

  const yukle = useCallback(async () => {
    if (!token) return;
    try {
      setHata("");
      const data = await adminKullanicilar(token);
      setKullanicilar(data.map((k: any) => ({
        id: k.id.toString(),
        tcSicilNo: k.identityNumber || "-",
        adSoyad: `${k.firstName} ${k.lastName}`,
        eposta: k.email,
        rol: k.role === "ADMIN" ? "Yönetici" : k.role === "STAFF" ? "Personel" : "Misafir",
        aktif: k.active
      })));
    } catch (error) { setHata(apiError(error, "Kullanıcılar yüklenemedi.")); }
  }, [token]);

  useEffect(() => { void yukle(); }, [yukle]);

  // Filtreleme
  const gosterilen = kullanicilar.filter((k) => {
    const aramaUygun =
      k.adSoyad.toLowerCase().includes(aramaMetni.toLowerCase()) ||
      k.tcSicilNo.toLowerCase().includes(aramaMetni.toLowerCase()) ||
      k.eposta.toLowerCase().includes(aramaMetni.toLowerCase());
    const rolUygun = rolFiltre === "Tümü" || k.rol === rolFiltre;
    const durumUygun =
      durumFiltre === "Tümü" ||
      (durumFiltre === "Aktif" && k.aktif) ||
      (durumFiltre === "Pasif" && !k.aktif);
    return aramaUygun && rolUygun && durumUygun;
  });

  // Aktivasyon toggle
  const aktivasyonDegistir = async (id: string) => {
    try { await adminKullaniciAktivasyon(token, id); await yukle(); }
    catch (error) { setHata(apiError(error)); }
  };

  // Panel aç - yeni
  const panelAc = () => {
    setDuzenlemeModu(null);
    setForm(BOS_FORM);
    setPanelAcik(true);
  };

  // Panel aç - düzenle
  const duzenle = (k: Kullanici) => {
    setDuzenlemeModu(k);
    setForm({
      tcSicilNo: k.tcSicilNo,
      adSoyad: k.adSoyad,
      eposta: k.eposta,
      rol: k.rol,
      aktif: k.aktif,
    });
    setPanelAcik(true);
  };

  // Kaydet
  const kaydet = async (e: React.FormEvent) => {
    e.preventDefault();
    const [firstName, ...lastNameParts] = form.adSoyad.trim().split(/\s+/);
    try {
      const payload = { identityNumber: form.tcSicilNo, firstName, lastName: lastNameParts.join(" ") || "-", email: form.eposta, role: form.rol === "Misafir" ? "GUEST" : form.rol === "Personel" ? "STAFF" : "ADMIN", active: form.aktif };
      if (duzenlemeModu) await adminKullaniciGuncelle(token, duzenlemeModu.id, payload);
      else await adminKullaniciEkle(token, { ...payload, password: "ChangeMe123!" });
      setPanelAcik(false); await yukle();
    } catch (error) { setHata(apiError(error)); }
  };

  // Sil
  const sil = async (id: string) => {
    try { await adminKullaniciSil(token, id); setSilOnay(null); await yukle(); }
    catch (error) { setHata(apiError(error)); }
  };

  return (
    <div className="relative">
      {/* Başlık */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Kullanıcı Yönetimi ve Aktivasyon</h1>
        <p className="text-base text-gray-500 mt-1">
          Kullanıcıları ekle, düzenle, aktif/pasif yap veya sil.
        </p>
      </div>
      {hata && <p className="mb-4 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">{hata}</p>}

      {/* Araçlar */}
      <div className="flex flex-wrap items-center gap-3 mb-5">
        <div className="relative flex-1 min-w-48">
          <i className="pi pi-search absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
          <input
            type="text"
            placeholder="Ad Soyad veya T.C. / Sicil No ara..."
            value={aramaMetni}
            onChange={(e) => setAramaMetni(e.target.value)}
            className="w-full rounded-lg border border-gray-300 pl-9 pr-4 py-2.5 text-base focus:border-ogm-500 focus:outline-none"
          />
        </div>

        <select
          value={rolFiltre}
          onChange={(e) => setRolFiltre(e.target.value as KullaniciRol | "Tümü")}
          className="rounded-lg border border-gray-300 px-4 py-2.5 text-base focus:border-ogm-500 focus:outline-none bg-white"
        >
          <option value="Tümü">Tüm Roller</option>
          {TUM_ROLLER.map((r) => <option key={r} value={r}>{r}</option>)}
        </select>

        <select
          value={durumFiltre}
          onChange={(e) => setDurumFiltre(e.target.value as "Tümü" | "Aktif" | "Pasif")}
          className="rounded-lg border border-gray-300 px-4 py-2.5 text-base focus:border-ogm-500 focus:outline-none bg-white"
        >
          <option value="Tümü">Tüm Durumlar</option>
          <option value="Aktif">Aktif</option>
          <option value="Pasif">Pasif</option>
        </select>

        <button
          onClick={panelAc}
          className="flex items-center gap-2 rounded-lg bg-ogm-700 px-4 py-2.5 text-sm font-semibold text-white hover:bg-ogm-800 transition-colors ml-auto"
        >
          <i className="pi pi-plus text-xs" />
          Yeni Kullanıcı
        </button>
      </div>

      {/* Tablo */}
      <div className="rounded-xl bg-white border border-gray-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr style={{ backgroundColor: "#1e5c1e" }}>
                {["T.C. / Sicil No", "Ad Soyad", "E-posta", "Rol", "Aktivasyon", "İşlemler"].map((h) => (
                  <th key={h} className="px-4 py-3 text-white font-semibold text-xs uppercase tracking-wide whitespace-nowrap">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {gosterilen.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-4 py-10 text-center text-gray-400">
                    <i className="pi pi-users text-3xl block mb-2 opacity-40" />
                    Kayıt bulunamadı.
                  </td>
                </tr>
              ) : (
                gosterilen.map((k) => (
                  <tr key={k.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-3 font-mono text-xs text-gray-600 whitespace-nowrap">
                      {k.tcSicilNo}
                    </td>
                    <td className="px-4 py-3 font-semibold text-gray-800 whitespace-nowrap">
                      {k.adSoyad}
                    </td>
                    <td className="px-4 py-3 text-gray-500 text-xs whitespace-nowrap">
                      {k.eposta}
                    </td>
                    <td className="px-4 py-3">
                      <span className={`rounded-full px-2.5 py-0.5 text-xs font-bold ${rolRengi(k.rol)}`}>
                        {k.rol}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      {/* Toggle Switch */}
                      <button
                        type="button"
                        role="switch"
                        aria-checked={k.aktif}
                        onClick={() => aktivasyonDegistir(k.id)}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none
                          ${k.aktif ? "bg-ogm-600" : "bg-gray-300"}`}
                      >
                        <span
                          className={`inline-block h-4 w-4 rounded-full bg-white shadow transition-transform
                            ${k.aktif ? "translate-x-6" : "translate-x-1"}`}
                        />
                      </button>
                      <span className={`ml-2 text-xs font-semibold ${k.aktif ? "text-ogm-700" : "text-gray-400"}`}>
                        {k.aktif ? "Aktif" : "Pasif"}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => duzenle(k)}
                          className="rounded-lg px-2.5 py-1.5 text-xs font-semibold text-ogm-700 hover:bg-ogm-50 transition-colors"
                          title="Düzenle"
                        >
                          <i className="pi pi-pencil" />
                        </button>
                        <button
                          onClick={() => setSilOnay(k.id)}
                          className="rounded-lg px-2.5 py-1.5 text-xs font-semibold text-red-600 hover:bg-red-50 transition-colors"
                          title="Sil"
                        >
                          <i className="pi pi-trash" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        <div className="px-4 py-2 bg-gray-50 border-t border-gray-100 text-xs text-gray-400">
          Toplam {gosterilen.length} kullanıcı
        </div>
      </div>

      {/* ── Slide-in Panel ── */}
      {panelAcik && (
        <div className="fixed inset-0 z-40 flex">
          <div
            className="flex-1 bg-black/30 backdrop-blur-sm"
            onClick={() => setPanelAcik(false)}
          />
          <div className="w-80 bg-white shadow-2xl flex flex-col h-full overflow-y-auto">
            <div className="flex items-center justify-between px-5 py-4 bg-ogm-800">
              <h2 className="text-white font-bold text-sm">
                {duzenlemeModu ? "Kullanıcı Düzenle" : "Yeni Kullanıcı"}
              </h2>
              <button onClick={() => setPanelAcik(false)} className="text-white/70 hover:text-white">
                <i className="pi pi-times" />
              </button>
            </div>

            <form onSubmit={kaydet} className="flex-1 p-5 space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">T.C. / Sicil No</label>
                <input
                  required
                  type="text"
                  placeholder="12345678901 veya SGS-00142"
                  value={form.tcSicilNo}
                  onChange={(e) => setForm((f) => ({ ...f, tcSicilNo: e.target.value }))}
                  className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-base focus:border-ogm-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">Ad Soyad</label>
                <input
                  required
                  type="text"
                  placeholder="Ad Soyad"
                  value={form.adSoyad}
                  onChange={(e) => setForm((f) => ({ ...f, adSoyad: e.target.value }))}
                  className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-base focus:border-ogm-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">E-posta</label>
                <input
                  required
                  type="email"
                  placeholder="ornek@ogm.gov.tr"
                  value={form.eposta}
                  onChange={(e) => setForm((f) => ({ ...f, eposta: e.target.value }))}
                  className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-base focus:border-ogm-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">Rol</label>
                <select
                  value={form.rol}
                  onChange={(e) => setForm((f) => ({ ...f, rol: e.target.value as KullaniciRol }))}
                  className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-base focus:border-ogm-500 focus:outline-none bg-white"
                >
                  {TUM_ROLLER.map((r) => <option key={r} value={r}>{r}</option>)}
                </select>
              </div>

              <div className="flex items-center justify-between rounded-lg border border-gray-200 bg-gray-50 px-4 py-3">
                <div>
                  <p className="text-sm font-semibold text-gray-700">Aktivasyon</p>
                  <p className="text-xs text-gray-400">Kullanıcı sisteme giriş yapabilsin mi?</p>
                </div>
                <button
                  type="button"
                  role="switch"
                  aria-checked={form.aktif}
                  onClick={() => setForm((f) => ({ ...f, aktif: !f.aktif }))}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors
                    ${form.aktif ? "bg-ogm-600" : "bg-gray-300"}`}
                >
                  <span
                    className={`inline-block h-4 w-4 rounded-full bg-white shadow transition-transform
                      ${form.aktif ? "translate-x-6" : "translate-x-1"}`}
                  />
                </button>
              </div>

              <div className="pt-2 space-y-2">
                <button
                  type="submit"
                  className="w-full rounded-lg bg-ogm-700 py-2.5 text-sm font-bold text-white hover:bg-ogm-800 transition-colors"
                >
                  {duzenlemeModu ? "Güncelle" : "Kullanıcıyı Kaydet"}
                </button>
                <button
                  type="button"
                  onClick={() => setPanelAcik(false)}
                  className="w-full rounded-lg border border-gray-300 py-2.5 text-sm text-gray-600 hover:bg-gray-50 transition-colors"
                >
                  Vazgeç
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ── Silme Onay Dialog ── */}
      {silOnay && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl p-6 w-80 text-center">
            <div className="flex items-center justify-center h-14 w-14 rounded-full bg-red-100 mx-auto mb-4">
              <i className="pi pi-user-minus text-red-500 text-2xl" />
            </div>
            <h3 className="font-bold text-gray-800 text-lg mb-1">Kullanıcı Silinsin mi?</h3>
            <p className="text-sm text-gray-500 mb-5">Bu işlem geri alınamaz.</p>
            <div className="flex gap-3">
              <button
                onClick={() => setSilOnay(null)}
                className="flex-1 rounded-lg border border-gray-300 py-2 text-sm text-gray-600 hover:bg-gray-50"
              >
                Vazgeç
              </button>
              <button
                onClick={() => sil(silOnay)}
                className="flex-1 rounded-lg bg-red-600 py-2 text-sm font-bold text-white hover:bg-red-700"
              >
                Evet, Sil
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
