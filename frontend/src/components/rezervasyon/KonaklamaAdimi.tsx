"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { taslakYaz } from "@/lib/rezervasyonTaslak";
import MisafirShell from "./MisafirShell";
import SihirbazKarti from "./SihirbazKarti";
import Stepper from "./Stepper";

export default function KonaklamaAdimi({ taban = "/misafir" }: { taban?: string }) {
  const router = useRouter();

  const [girisTarihi, setGirisTarihi] = useState("");
  const [cikisTarihi, setCikisTarihi] = useState("");
  const [yetiskin, setYetiskin] = useState("1");
  const [cocuk, setCocuk] = useState("0");
  const [notlar, setNotlar] = useState("");
  const [hata, setHata] = useState("");

  const bugun = new Date().toISOString().split("T")[0];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setHata("");

    if (!girisTarihi || !cikisTarihi) {
      setHata("Lütfen giriş ve çıkış tarihlerini seçiniz.");
      return;
    }
    if (girisTarihi < bugun) {
      setHata("Giriş tarihi bugünden önce olamaz.");
      return;
    }
    if (cikisTarihi <= girisTarihi) {
      setHata("Çıkış tarihi giriş tarihinden sonra olmalıdır.");
      return;
    }

    taslakYaz({
      giris: girisTarihi,
      cikis: cikisTarihi,
      yetiskin: parseInt(yetiskin),
      cocuk: parseInt(cocuk),
      notlar: notlar,
      odaNo: null,
      odaTip: "",
      odaKat: "",
    } as Parameters<typeof taslakYaz>[0]);

    router.push(`${taban}/oda-secimi`);
  };

  return (
    <MisafirShell taban={taban}>
      <SihirbazKarti
        baslik="Yeni Rezervasyon Oluştur"
        aciklama="Bilgilerinizi adım adım doldurunuz"
      >
        <Stepper aktifAdim={1} />

        <div className="mb-8">
          <h2 className="text-[1.35rem] font-semibold text-[#1a3b25] mb-1.5">
            Konaklama Detayları
          </h2>
          <p className="text-[0.9rem] text-[#888]">
            Giriş/çıkış tarihlerini ve kişi sayısını belirleyin.
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 gap-x-8 mb-8">
            <div className="flex flex-col">
              <label className="text-[0.9rem] font-semibold text-[#555] mb-2">
                <span className="text-[#d9534f] mr-1">*</span>Giriş Tarihi
              </label>
              <div className="relative">
                <input
                  type="date"
                  value={girisTarihi}
                  min={bugun}
                  onChange={(e) => setGirisTarihi(e.target.value)}
                  required
                  className="w-full bg-[#2b5b3b] text-white border-none rounded-md py-3 px-[15px] pr-10 text-[0.95rem] outline-none transition-shadow focus:shadow-[0_0_0_2px_#4caf50]"
                  style={{ colorScheme: "dark" }}
                />
              </div>
            </div>

            <div className="flex flex-col">
              <label className="text-[0.9rem] font-semibold text-[#555] mb-2">
                <span className="text-[#d9534f] mr-1">*</span>Çıkış Tarihi
              </label>
              <div className="relative">
                <input
                  type="date"
                  value={cikisTarihi}
                  min={girisTarihi || bugun}
                  onChange={(e) => setCikisTarihi(e.target.value)}
                  required
                  className="w-full bg-[#2b5b3b] text-white border-none rounded-md py-3 px-[15px] pr-10 text-[0.95rem] outline-none transition-shadow focus:shadow-[0_0_0_2px_#4caf50]"
                  style={{ colorScheme: "dark" }}
                />
              </div>
            </div>

            <div className="flex flex-col">
              <label className="text-[0.9rem] font-semibold text-[#555] mb-2">
                <span className="text-[#d9534f] mr-1">*</span>Yetişkin Sayısı
              </label>
              <input
                type="number"
                min="1"
                value={yetiskin}
                onChange={(e) => setYetiskin(e.target.value)}
                required
                className="w-full bg-[#2b5b3b] text-white border-none rounded-md py-3 px-[15px] text-[0.95rem] outline-none transition-shadow focus:shadow-[0_0_0_2px_#4caf50]"
              />
            </div>

            <div className="flex flex-col">
              <label className="text-[0.9rem] font-semibold text-[#555] mb-2">
                Çocuk Sayısı
              </label>
              <input
                type="number"
                min="0"
                value={cocuk}
                onChange={(e) => setCocuk(e.target.value)}
                className="w-full bg-[#2b5b3b] text-white border-none rounded-md py-3 px-[15px] text-[0.95rem] outline-none transition-shadow focus:shadow-[0_0_0_2px_#4caf50]"
              />
            </div>

            <div className="flex flex-col md:col-span-2">
              <label className="text-[0.9rem] font-semibold text-[#555] mb-2">
                Özel İstek / Notlar
              </label>
              <textarea
                value={notlar}
                onChange={(e) => setNotlar(e.target.value)}
                placeholder="Ekstra yastık, engelli oda gereksinimi vb."
                className="w-full bg-[#2b5b3b] text-white border-none rounded-md py-3 px-[15px] text-[0.95rem] outline-none min-h-[47px] h-[47px] resize-y transition-shadow focus:shadow-[0_0_0_2px_#4caf50] placeholder:text-[#a8c1b1]"
              ></textarea>
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
              href={`${taban}/dashboard`}
              className="bg-white border border-[#ccc] text-[#555] py-2.5 px-6 rounded-md text-[0.9rem] font-medium inline-flex items-center gap-2 transition-colors hover:bg-[#f0f0f0]"
            >
              ← İptal
            </Link>
            <button
              type="submit"
              className="bg-[#1a3b25] border-none text-white py-2.5 px-10 rounded-md text-[0.9rem] font-medium cursor-pointer inline-flex items-center gap-2 transition-colors hover:bg-[#122a1a]"
            >
              İleri →
            </button>
          </div>
        </form>
      </SihirbazKarti>
    </MisafirShell>
  );
}
