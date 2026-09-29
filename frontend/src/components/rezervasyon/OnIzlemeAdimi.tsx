"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { taslakOku } from "@/lib/rezervasyonTaslak";
import MisafirShell from "./MisafirShell";
import SihirbazKarti from "./SihirbazKarti";
import Stepper from "./Stepper";

export default function OnIzlemeAdimi({ taban = "/misafir" }: { taban?: string }) {
  const router = useRouter();
  const [taslak, setTaslak] = useState<ReturnType<typeof taslakOku>>(null);

  useEffect(() => {
    const t = taslakOku();
    if (!t || !t.giris || !t.cikis || !t.odaNo) {
      router.replace(`${taban}/konaklama`);
      return;
    }
    setTaslak(t);
  }, [router, taban]);

  const geceSayisi = () => {
    if (!taslak) return 0;
    const g = new Date(taslak.giris);
    const c = new Date(taslak.cikis);
    return Math.round((c.getTime() - g.getTime()) / (1000 * 60 * 60 * 24));
  };

  const formatTarih = (iso: string) => {
    if (!iso) return "—";
    const [y, m, d] = iso.split("-");
    return `${d}/${m}/${y}`;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push(`${taban}/odeme`);
  };

  if (!taslak) {
    return (
      <MisafirShell taban={taban}>
        <div className="flex items-center justify-center h-full">
          <div className="w-10 h-10 border-4 border-[#e0e0e0] border-t-[#2b5e39] rounded-full animate-spin"></div>
        </div>
      </MisafirShell>
    );
  }

  return (
    <MisafirShell taban={taban}>
      <SihirbazKarti
        baslik="Yeni Rezervasyon Oluştur"
        aciklama="Bilgilerinizi adım adım doldurunuz"
      >
        <Stepper aktifAdim={3} />

        <div className="mb-8">
          <h2 className="text-[1.35rem] font-semibold text-[#1a3b25] mb-1.5">
            Ön İzleme
          </h2>
          <p className="text-[0.9rem] text-[#888]">
            Lütfen ödeme adımına geçmeden önce rezervasyon bilgilerinizi kontrol edip onaylayın.
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="border border-[#eaeaea] rounded-lg p-6 mb-6 bg-[#fcfdfc]">
            <h3 className="text-[1.05rem] text-[#1a3b25] border-b border-[#eaeaea] pb-2 mb-4 font-semibold">
              Konaklama Özeti
            </h3>
            <div className="flex justify-between mb-2 text-[0.95rem] text-[#555]">
              <span>Giriş Tarihi:</span>
              <strong className="text-[#222]">{formatTarih(taslak.giris)}</strong>
            </div>
            <div className="flex justify-between mb-2 text-[0.95rem] text-[#555]">
              <span>Çıkış Tarihi:</span>
              <strong className="text-[#222]">{formatTarih(taslak.cikis)}</strong>
            </div>
            <div className="flex justify-between mb-2 text-[0.95rem] text-[#555]">
              <span>Kişi Sayısı:</span>
              <strong className="text-[#222]">
                {taslak.yetiskin} Yetişkin
                {taslak.cocuk > 0 ? `, ${taslak.cocuk} Çocuk` : ""}
              </strong>
            </div>
            <div className="flex justify-between text-[0.95rem] text-[#555]">
              <span>Konaklama Süresi:</span>
              <strong className="text-[#222]">{geceSayisi()} Gece</strong>
            </div>
          </div>

          <div className="border border-[#eaeaea] rounded-lg p-6 mb-6 bg-[#fcfdfc]">
            <h3 className="text-[1.05rem] text-[#1a3b25] border-b border-[#eaeaea] pb-2 mb-4 font-semibold">
              Oda Bilgisi
            </h3>
            <div className="flex justify-between mb-2 text-[0.95rem] text-[#555]">
              <span>Seçilen Oda:</span>
              <strong className="text-[#222]">Oda {taslak.odaNo}</strong>
            </div>
            <div className="flex justify-between text-[0.95rem] text-[#555]">
              <span>Oda Tipi:</span>
              <strong className="text-[#222]">{taslak.odaTip}</strong>
            </div>
            {taslak.odaKat && (
              <div className="flex justify-between mt-2 text-[0.95rem] text-[#555]">
                <span>Kat:</span>
                <strong className="text-[#222]">{taslak.odaKat}</strong>
              </div>
            )}
          </div>

          <hr className="border-t border-[#eaeaea] my-8 mt-10" />

          <div className="flex justify-between items-center relative">
            <Link
              href={`${taban}/oda-secimi`}
              className="bg-white border border-[#ccc] text-[#555] py-2.5 px-6 rounded-md text-[0.9rem] font-medium inline-flex items-center gap-2 transition-colors hover:bg-[#f0f0f0]"
            >
              ← Geri
            </Link>
            <button
              type="submit"
              className="bg-[#1a3b25] border-none text-white py-2.5 px-10 rounded-md text-[0.9rem] font-medium cursor-pointer inline-flex items-center gap-2 transition-colors hover:bg-[#122a1a]"
            >
              Ödeme Adımına Geç →
            </button>
          </div>
        </form>
      </SihirbazKarti>
    </MisafirShell>
  );
}
