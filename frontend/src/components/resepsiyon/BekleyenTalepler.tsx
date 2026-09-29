"use client";

import { useEffect, useState, useCallback } from "react";
import { useSession } from "next-auth/react";
import { adminTalepler, adminTalepIslem, apiError } from "@/lib/api";
import { tarihFormatla } from "@/lib/format";
import type { Talep, TalepTip } from "@/lib/types";

const SEKMELER: TalepTip[] = ["İptal Talebi", "Oda Onayı"];

export default function BekleyenTalepler() {
  const [talepler, setTalepler] = useState<Talep[]>([]);
  const [aktifSekme, setAktifSekme] = useState<TalepTip>("İptal Talebi");
  const [hata, setHata] = useState("");

  const { data: oturum } = useSession();
  const token = (oturum as { accessToken?: string } | null)?.accessToken ?? "";

  const yukle = useCallback(async () => {
    if (!token) return;
    try {
      setHata("");
      const data = await adminTalepler(token);
      setTalepler(data.map((t: any) => ({
        id: t.id.toString(),
        tip: t.type === "IPTAL" ? "İptal Talebi" : "Oda Onayı",
        rezNo: t.reservationNumber || "-",
        misafirAdi: t.guestName || "-",
        odaNo: t.roomNumber || "-",
        tarih: t.requestDate || new Date().toISOString(),
        durum: t.status === "BEKLIYOR" ? "Bekliyor" : t.status === "ONAYLANDI" ? "Onaylandı" : "Reddedildi",
        notlar: t.notes
      })));
    } catch (error) { setHata(apiError(error, "Talepler yüklenemedi.")); }
  }, [token]);

  useEffect(() => { void yukle(); }, [yukle]);

  const gosterilen = talepler.filter((t) => t.tip === aktifSekme);
  const bekleyenSayi = (tip: TalepTip) =>
    talepler.filter((t) => t.tip === tip && t.durum === "Bekliyor").length;

  const islemYap = async (id: string, yeniDurum: "Onaylandı" | "Reddedildi") => {
    try {
      setHata("");
      const endpoint = yeniDurum === "Onaylandı" ? "approve" : "reject";
      await adminTalepIslem(token, id, endpoint);
      await yukle();
    } catch (error) { setHata(apiError(error)); }
  };

  return (
    <div>
      {/* Başlık */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Bekleyen Talepler</h1>
        <p className="text-base text-gray-500 mt-1">
          Misafirlerden gelen iptal ve oda onay taleplerini buradan yönetin.
        </p>
      </div>
      {hata && <p className="mb-4 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">{hata}</p>}

      {/* Sekmeler */}
      <div className="flex gap-2 mb-5 border-b border-gray-200">
        {SEKMELER.map((sekme) => {
          const sayi = bekleyenSayi(sekme);
          return (
            <button
              key={sekme}
              onClick={() => setAktifSekme(sekme)}
              className={`relative flex items-center gap-2 px-4 py-2.5 text-sm font-semibold border-b-2 transition-colors
                ${aktifSekme === sekme
                  ? "border-ogm-600 text-ogm-700"
                  : "border-transparent text-gray-500 hover:text-gray-700"
                }`}
            >
              {sekme === "İptal Talebi" ? (
                <i className="pi pi-times-circle text-base" />
              ) : (
                <i className="pi pi-check-circle text-base" />
              )}
              {sekme}
              {sayi > 0 && (
                <span className="ml-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white">
                  {sayi}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Talep Listesi */}
      {gosterilen.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 text-gray-400">
          <i className="pi pi-inbox text-5xl mb-3 opacity-40" />
          <p className="font-medium">Bekleyen talep bulunmuyor.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {gosterilen.map((talep) => {
            const bekliyor = talep.durum === "Bekliyor";
            return (
              <div
                key={talep.id}
                className={`rounded-xl border bg-white p-4 shadow-sm transition-all
                  ${bekliyor ? "border-gray-200" : "border-gray-100 opacity-60"}
                `}
              >
                <div className="flex items-start justify-between gap-4">
                  {/* Bilgiler */}
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center gap-3 flex-wrap">
                      <span className={`rounded-full px-2.5 py-0.5 text-xs font-bold
                        ${talep.tip === "İptal Talebi"
                          ? "bg-red-100 text-red-700"
                          : "bg-blue-100 text-blue-700"
                        }`}>
                        {talep.tip}
                      </span>
                      <span className="text-sm font-semibold text-gray-700">{talep.rezNo}</span>
                      <span className={`rounded-full px-2 py-0.5 text-xs font-semibold
                        ${talep.durum === "Bekliyor"   ? "bg-yellow-100 text-yellow-700" :
                          talep.durum === "Onaylandı"  ? "bg-green-100 text-green-700" :
                                                         "bg-red-100 text-red-700"}`}>
                        {talep.durum}
                      </span>
                    </div>

                    <div className="grid grid-cols-3 gap-4 text-sm">
                      <div>
                        <span className="text-gray-400 text-xs">Misafir</span>
                        <p className="font-semibold text-gray-700">{talep.misafirAdi}</p>
                      </div>
                      <div>
                        <span className="text-gray-400 text-xs">Oda No</span>
                        <p className="font-semibold text-gray-700">{talep.odaNo}</p>
                      </div>
                      <div>
                        <span className="text-gray-400 text-xs">Tarih</span>
                        <p className="font-semibold text-gray-700">{tarihFormatla(talep.tarih)}</p>
                      </div>
                    </div>

                    {talep.notlar && (
                      <p className="text-xs text-gray-500 bg-gray-50 rounded-lg px-3 py-2 border border-gray-100">
                        <i className="pi pi-comment mr-1" />
                        {talep.notlar}
                      </p>
                    )}
                  </div>

                  {/* Aksiyonlar */}
                  {bekliyor && (
                    <div className="flex flex-col gap-2 shrink-0">
                      <button
                        onClick={() => islemYap(talep.id, "Onaylandı")}
                        className="flex items-center gap-2 rounded-lg bg-ogm-700 px-4 py-2 text-sm font-semibold text-white hover:bg-ogm-800 transition-colors"
                      >
                        <i className="pi pi-check text-xs" />
                        Onayla
                      </button>
                      <button
                        onClick={() => islemYap(talep.id, "Reddedildi")}
                        className="flex items-center gap-2 rounded-lg border border-red-300 px-4 py-2 text-sm font-semibold text-red-600 hover:bg-red-50 transition-colors"
                      >
                        <i className="pi pi-times text-xs" />
                        Reddet
                      </button>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
