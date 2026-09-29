"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { rezervasyonOlustur, ApiHatasi } from "@/lib/api";
import { taslakOku, taslakTemizle } from "@/lib/rezervasyonTaslak";
import MisafirShell from "./MisafirShell";
import SihirbazKarti from "./SihirbazKarti";
import Stepper from "./Stepper";

export default function OdemeAdimi({ taban = "/misafir" }: { taban?: string }) {
  const router = useRouter();
  const { data: oturum } = useSession();
  const [taslak, setTaslak] = useState<ReturnType<typeof taslakOku>>(null);
  const [yukleniyor, setYukleniyor] = useState(false);
  const [hata, setHata] = useState("");

  useEffect(() => {
    const t = taslakOku();
    if (!t || !t.giris || !t.cikis || !t.odaNo) {
      router.replace(`${taban}/konaklama`);
      return;
    }
    setTaslak(t);
  }, [router, taban]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!taslak?.odaNo) return;
    setHata("");
    setYukleniyor(true);

    try {
      const token = (oturum as { accessToken?: string } | null)?.accessToken;
      const rez = await rezervasyonOlustur(token ?? "", {
        odaNo: taslak.odaNo,
        giris: taslak.giris,
        cikis: taslak.cikis,
        yetiskinSayisi: taslak.yetiskin,
        cocukSayisi: taslak.cocuk,
        notlar: taslak.notlar,
      });

      taslakTemizle();
      sessionStorage.setItem("ogm-son-rez-no", rez.rezNo);
      router.push(`${taban}/rezervasyon-basarili`);
    } catch (err) {
      if (err instanceof ApiHatasi) {
        setHata(err.message);
      } else {
        setHata("Rezervasyon oluşturulurken bir hata oluştu.");
      }
    } finally {
      setYukleniyor(false);
    }
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
        <Stepper aktifAdim={4} />

        <div className="mb-8">
          <h2 className="text-[1.35rem] font-semibold text-[#1a3b25] mb-1.5">
            Ödeme
          </h2>
          <p className="text-[0.9rem] text-[#888]">Rezervasyonunuzu tamamlayın.</p>
        </div>

        {/* ÖDEME ALTYAPISI NOTU */}
        <div className="bg-[#fff3cd] border border-[#ffc107] rounded-lg p-4 mb-6 flex items-start gap-3">
          <svg
            viewBox="0 0 24 24"
            className="w-5 h-5 fill-[#856404] shrink-0 mt-0.5"
          >
            <path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z" />
          </svg>
          <p className="text-[0.85rem] text-[#856404]">
            Ödeme altyapısı henüz aktif değildir. &quot;Rezervasyonu Tamamla&quot;
            butonu rezervasyonu oluşturacak, ödeme bilgileri ilerleyen güncellemede
            eklenecektir.
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 gap-x-8 mb-8 opacity-50 pointer-events-none">
            <div className="flex flex-col md:col-span-2">
              <label className="text-[0.9rem] font-semibold text-[#555] mb-2">
                <span className="text-[#d9534f] mr-1">*</span>Kart Üzerindeki İsim
              </label>
              <input
                type="text"
                placeholder="Ad Soyad"
                disabled
                className="w-full bg-white text-[#333] border border-[#ccc] rounded-md py-3 px-[15px] text-[0.95rem] outline-none"
              />
            </div>

            <div className="flex flex-col md:col-span-2">
              <label className="text-[0.9rem] font-semibold text-[#555] mb-2">
                <span className="text-[#d9534f] mr-1">*</span>Kart Numarası
              </label>
              <input
                type="text"
                placeholder="XXXX XXXX XXXX XXXX"
                disabled
                className="w-full bg-white text-[#333] border border-[#ccc] rounded-md py-3 px-[15px] text-[0.95rem] outline-none"
              />
            </div>

            <div className="flex flex-col">
              <label className="text-[0.9rem] font-semibold text-[#555] mb-2">
                <span className="text-[#d9534f] mr-1">*</span>Son Kullanma Tarihi
              </label>
              <input
                type="text"
                placeholder="AA / YY"
                disabled
                className="w-full bg-white text-[#333] border border-[#ccc] rounded-md py-3 px-[15px] text-[0.95rem] outline-none"
              />
            </div>

            <div className="flex flex-col">
              <label className="text-[0.9rem] font-semibold text-[#555] mb-2">
                <span className="text-[#d9534f] mr-1">*</span>CVC / CVV
              </label>
              <input
                type="text"
                placeholder="XXX"
                disabled
                className="w-full bg-white text-[#333] border border-[#ccc] rounded-md py-3 px-[15px] text-[0.95rem] outline-none"
              />
            </div>
          </div>

          {hata && (
            <div className="mb-4 p-3 bg-[#fff3f3] border border-[#f5c6cb] rounded-lg text-[#d9534f] text-[0.85rem]">
              {hata}
            </div>
          )}

          <hr className="border-t border-[#eaeaea] my-8 mt-10" />

          <div className="flex justify-between items-center relative">
            <Link
              href={`${taban}/on-izleme`}
              className="bg-white border border-[#ccc] text-[#555] py-2.5 px-6 rounded-md text-[0.9rem] font-medium inline-flex items-center gap-2 transition-colors hover:bg-[#f0f0f0]"
            >
              ← Geri
            </Link>
            <button
              type="submit"
              disabled={yukleniyor}
              className="bg-[#1a3b25] border-none text-white py-2.5 px-10 rounded-md text-[0.9rem] font-medium cursor-pointer inline-flex items-center gap-2 transition-colors hover:bg-[#122a1a] disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {yukleniyor ? "Rezervasyon oluşturuluyor..." : "Rezervasyonu Tamamla"}
            </button>
          </div>
        </form>
      </SihirbazKarti>
    </MisafirShell>
  );
}
