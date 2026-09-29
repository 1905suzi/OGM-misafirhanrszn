"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import {
  adminRezervasyonlar,
  adminRezervasyonOlustur,
  adminRezervasyonDurumGuncelle,
  adminRezervasyonSil,
  adminOdalar,
  ApiHatasi,
  type ApiRezervasyon,
  type ApiOda,
  type ApiRezervasyonDurumu,
} from "@/lib/api";
import { REZ_DURUM_ETIKET, REZ_DURUM_KODU } from "@/lib/eslesme";
import { tarihFormatla, rezervasyonDurumRengi, geceSayisi } from "@/lib/format";
import type { Rezervasyon, RezervasyonDurum } from "@/lib/types";

const API_DURUM_MAP: Record<string, ApiRezervasyonDurumu> = {
  Beklemede: "BEKLEMEDE",
  Onaylı: "ONAYLI",
  "Check-in": "CHECK_IN",
  "Check-out": "CHECK_OUT",
  İptal: "IPTAL",
};

function apiRezToLocal(api: ApiRezervasyon): Rezervasyon {
  return {
    id: api.id,
    rezNo: api.rezNo,
    misafirAdi: api.misafirAdi,
    odaNo: api.odaNo,
    giris: api.giris,
    cikis: api.cikis,
    gece: api.gece,
    durum: (REZ_DURUM_ETIKET[api.durum] ?? api.durum) as RezervasyonDurum,
  };
}

const TUM_DURUMLAR: RezervasyonDurum[] = [
  "Beklemede", "Onaylı", "Check-in", "Check-out", "İptal",
];

const BOS_FORM = {
  misafirAdi: "",
  odaNo: "",
  giris: "",
  cikis: "",
  durum: "Beklemede" as RezervasyonDurum,
};

export default function RezervasyonYonetimi() {
  const { data: oturum } = useSession();
  const token = (oturum as { accessToken?: string } | null)?.accessToken ?? "";

  const [rezervasyonlar, setRezervasyonlar] = useState<Rezervasyon[]>([]);
  const [odalar, setOdalar] = useState<ApiOda[]>([]);
  const [yukleniyor, setYukleniyor] = useState(true);
  const [apiHata, setApiHata] = useState("");
  const [aramaMetni, setAramaMetni] = useState("");
  const [durumFiltre, setDurumFiltre] = useState<RezervasyonDurum | "Tümü">("Tümü");
  const [panelAcik, setPanelAcik] = useState(false);
  const [duzenlemeModu, setDuzenlemeModu] = useState<Rezervasyon | null>(null);
  const [form, setForm] = useState(BOS_FORM);
  const [silOnay, setSilOnay] = useState<number | null>(null);
  const [kaydetYukleniyor, setKaydetYukleniyor] = useState(false);
  const [formHata, setFormHata] = useState("");

  useEffect(() => {
    if (!token) return;
    const yukle = async () => {
      setYukleniyor(true);
      try {
        const [rezList, odaList] = await Promise.all([
          adminRezervasyonlar(token),
          adminOdalar(token),
        ]);
        setRezervasyonlar(rezList.map(apiRezToLocal));
        setOdalar(odaList);
      } catch (err) {
        setApiHata(err instanceof ApiHatasi ? err.message : "Veriler yüklenemedi.");
      } finally {
        setYukleniyor(false);
      }
    };
    void yukle();
  }, [token]);

  // Filtreleme
  const gosterilen = rezervasyonlar.filter((r) => {
    const aramaUygun =
      r.misafirAdi.toLowerCase().includes(aramaMetni.toLowerCase()) ||
      r.rezNo.toLowerCase().includes(aramaMetni.toLowerCase());
    const durumUygun = durumFiltre === "Tümü" || r.durum === durumFiltre;
    return aramaUygun && durumUygun;
  });

  // Panel aç - yeni
  const panelAc = () => {
    setDuzenlemeModu(null);
    setForm(BOS_FORM);
    setFormHata("");
    setPanelAcik(true);
  };

  // Panel aç - düzenle
  const duzenle = (rez: Rezervasyon) => {
    setDuzenlemeModu(rez);
    setForm({
      misafirAdi: rez.misafirAdi,
      odaNo: String(rez.odaNo),
      giris: rez.giris,
      cikis: rez.cikis,
      durum: rez.durum,
    });
    setFormHata("");
    setPanelAcik(true);
  };

  // Kaydet
  const kaydet = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormHata("");
    setKaydetYukleniyor(true);
    try {
      if (duzenlemeModu) {
        const yeniApiDurum = API_DURUM_MAP[form.durum];
        if (yeniApiDurum && yeniApiDurum !== (REZ_DURUM_KODU[duzenlemeModu.durum] as string)) {
          const guncellenen = await adminRezervasyonDurumGuncelle(token, duzenlemeModu.id, yeniApiDurum);
          setRezervasyonlar((prev) =>
            prev.map((r) => (r.id === duzenlemeModu.id ? apiRezToLocal(guncellenen) : r))
          );
        } else {
          // Sadece form verilerini yerel olarak güncelle (isim/oda değişikliği backend'de desteklenmiyor)
          setRezervasyonlar((prev) =>
            prev.map((r) =>
              r.id === duzenlemeModu.id
                ? { ...r, ...form, odaNo: Number(form.odaNo), gece: geceSayisi(form.giris, form.cikis) }
                : r
            )
          );
        }
      } else {
        const yeni = await adminRezervasyonOlustur(token, {
          odaNo: Number(form.odaNo),
          giris: form.giris,
          cikis: form.cikis,
          misafirAdi: form.misafirAdi,
          durum: form.durum,
        });
        setRezervasyonlar((prev) => [apiRezToLocal(yeni), ...prev]);
      }
      setPanelAcik(false);
    } catch (err) {
      setFormHata(err instanceof ApiHatasi ? err.message : "İşlem başarısız oldu.");
    } finally {
      setKaydetYukleniyor(false);
    }
  };

  // Sil
  const sil = async (id: number) => {
    try {
      await adminRezervasyonSil(token, id);
      setRezervasyonlar((prev) => prev.filter((r) => r.id !== id));
    } catch (err) {
      setApiHata(err instanceof ApiHatasi ? err.message : "Silme işlemi başarısız.");
    }
    setSilOnay(null);
  };

  return (
    <div className="relative">
      {/* Hata mesajı */}
      {apiHata && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
          {apiHata}
        </div>
      )}

      {/* Yükleniyor */}
      {yukleniyor && (
        <div className="flex justify-center py-12">
          <div className="w-8 h-8 border-4 border-gray-200 border-t-[#1e5c1e] rounded-full animate-spin"></div>
        </div>
      )}

      {/* Başlık */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Rezervasyon Yönetimi</h1>
        <p className="text-base text-gray-500 mt-1">Rezervasyonları görüntüle, ekle, düzenle veya sil.</p>
      </div>

      {/* Araçlar */}
      <div className="flex flex-wrap items-center gap-3 mb-5">
        <div className="relative flex-1 min-w-48">
          <i className="pi pi-search absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
          <input
            type="text"
            placeholder="Misafir adı veya rez. no ara..."
            value={aramaMetni}
            onChange={(e) => setAramaMetni(e.target.value)}
            className="w-full rounded-lg border border-gray-300 pl-9 pr-4 py-2.5 text-base focus:border-ogm-500 focus:outline-none"
          />
        </div>
        <select
          value={durumFiltre}
          onChange={(e) => setDurumFiltre(e.target.value as RezervasyonDurum | "Tümü")}
          className="rounded-lg border border-gray-300 px-4 py-2.5 text-base focus:border-ogm-500 focus:outline-none bg-white"
        >
          <option value="Tümü">Tüm Durumlar</option>
          {TUM_DURUMLAR.map((d) => <option key={d} value={d}>{d}</option>)}
        </select>
        <button
          onClick={panelAc}
          className="flex items-center gap-2 rounded-lg bg-ogm-700 px-4 py-2.5 text-sm font-semibold text-white hover:bg-ogm-800 transition-colors ml-auto"
        >
          <i className="pi pi-plus text-xs" />
          Yeni Rezervasyon
        </button>
      </div>

      {/* Tablo */}
      <div className="rounded-xl bg-white border border-gray-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr style={{ backgroundColor: "#1e5c1e" }}>
                {["Rez No", "Misafir", "Oda", "Giriş", "Çıkış", "Gece", "Durum", "İşlemler"].map((h) => (
                  <th key={h} className="px-4 py-3 text-white font-semibold text-xs uppercase tracking-wide whitespace-nowrap">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {gosterilen.length === 0 ? (
                <tr>
                  <td colSpan={8} className="px-4 py-10 text-center text-gray-400">
                    <i className="pi pi-calendar text-3xl block mb-2 opacity-40" />
                    Kayıt bulunamadı.
                  </td>
                </tr>
              ) : (
                gosterilen.map((rez) => (
                  <tr key={rez.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-3 font-mono text-xs text-gray-600 whitespace-nowrap">{rez.rezNo}</td>
                    <td className="px-4 py-3 font-semibold text-gray-800 whitespace-nowrap">{rez.misafirAdi}</td>
                    <td className="px-4 py-3 text-gray-600">{rez.odaNo}</td>
                    <td className="px-4 py-3 text-gray-600 whitespace-nowrap">{tarihFormatla(rez.giris)}</td>
                    <td className="px-4 py-3 text-gray-600 whitespace-nowrap">{tarihFormatla(rez.cikis)}</td>
                    <td className="px-4 py-3 text-gray-600">{rez.gece}</td>
                    <td className="px-4 py-3">
                      <span className={`rounded-full px-2.5 py-0.5 text-xs font-bold ${rezervasyonDurumRengi(rez.durum)}`}>
                        {rez.durum}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => duzenle(rez)}
                          className="rounded-lg px-2.5 py-1.5 text-xs font-semibold text-ogm-700 hover:bg-ogm-50 transition-colors"
                          title="Düzenle"
                        >
                          <i className="pi pi-pencil" />
                        </button>
                        <button
                          onClick={() => setSilOnay(rez.id)}
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
          Toplam {gosterilen.length} kayıt
        </div>
      </div>

      {/* ── Slide-in Panel ── */}
      {panelAcik && (
        <div className="fixed inset-0 z-40 flex">
          {/* Overlay */}
          <div
            className="flex-1 bg-black/30 backdrop-blur-sm"
            onClick={() => setPanelAcik(false)}
          />
          {/* Panel */}
          <div className="w-80 bg-white shadow-2xl flex flex-col h-full overflow-y-auto">
            <div className="flex items-center justify-between px-5 py-4 bg-ogm-800">
              <h2 className="text-white font-bold text-sm">
                {duzenlemeModu ? "Rezervasyon Düzenle" : "Yeni Rezervasyon"}
              </h2>
              <button onClick={() => setPanelAcik(false)} className="text-white/70 hover:text-white">
                <i className="pi pi-times" />
              </button>
            </div>

            <form onSubmit={kaydet} className="flex-1 p-5 space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">Misafir Adı</label>
                <input
                  required
                  type="text"
                  placeholder="Ad Soyad"
                  value={form.misafirAdi}
                  onChange={(e) => setForm((f) => ({ ...f, misafirAdi: e.target.value }))}
                  className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-base focus:border-ogm-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">Oda No</label>
                <select
                  required
                  value={form.odaNo}
                  onChange={(e) => setForm((f) => ({ ...f, odaNo: e.target.value }))}
                  className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-base focus:border-ogm-500 focus:outline-none bg-white"
                >
                  <option value="">Seçiniz</option>
                  {odalar.map((o) => (
                    <option key={o.no} value={o.no}>
                      {o.no} — {o.kat} / {o.tip}
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1">Giriş</label>
                  <input
                    required
                    type="date"
                    value={form.giris}
                    onChange={(e) => setForm((f) => ({ ...f, giris: e.target.value }))}
                    className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-base focus:border-ogm-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1">Çıkış</label>
                  <input
                    required
                    type="date"
                    value={form.cikis}
                    onChange={(e) => setForm((f) => ({ ...f, cikis: e.target.value }))}
                    className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-base focus:border-ogm-500 focus:outline-none"
                  />
                </div>
              </div>

              {form.giris && form.cikis && (
                <p className="text-xs text-ogm-600 font-semibold">
                  <i className="pi pi-moon mr-1" />
                  {geceSayisi(form.giris, form.cikis)} gece konaklama
                </p>
              )}

              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">Durum</label>
                <select
                  value={form.durum}
                  onChange={(e) => setForm((f) => ({ ...f, durum: e.target.value as RezervasyonDurum }))}
                  className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-base focus:border-ogm-500 focus:outline-none bg-white"
                >
                  {TUM_DURUMLAR.map((d) => <option key={d} value={d}>{d}</option>)}
                </select>
              </div>

              {formHata && (
                <p className="text-xs text-red-600 bg-red-50 p-2 rounded">{formHata}</p>
              )}

              <div className="pt-2 space-y-2">
                <button
                  type="submit"
                  disabled={kaydetYukleniyor}
                  className="w-full rounded-lg bg-ogm-700 py-2.5 text-sm font-bold text-white hover:bg-ogm-800 transition-colors disabled:opacity-60"
                >
                  {kaydetYukleniyor ? 'İşleniyor...' : duzenlemeModu ? "Güncelle" : "Rezervasyonu Kaydet"}
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
              <i className="pi pi-trash text-red-500 text-2xl" />
            </div>
            <h3 className="font-bold text-gray-800 text-lg mb-1">Emin misiniz?</h3>
            <p className="text-sm text-gray-500 mb-5">Bu rezervasyon kalıcı olarak silinecek.</p>
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
