"use client";
import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { musaitOdalar, ApiHatasi, type ApiOda } from "@/lib/api";
import { taslakOku, taslakYaz } from "@/lib/rezervasyonTaslak";
import MisafirShell from "./MisafirShell";
import SihirbazKarti from "./SihirbazKarti";
import Stepper from "./Stepper";

export default function OdaSecimiAdimi({ taban = "/misafir" }: { taban?: string }) {
  const router = useRouter();
  const { data: oturum } = useSession();
  const [odalar, setOdalar] = useState<ApiOda[]>([]);
  const [yukleniyor, setYukleniyor] = useState(true);
  const [hata, setHata] = useState("");
  const [secilenOdaNo, setSecilenOdaNo] = useState<number | null>(null);

  const taslak = typeof window !== "undefined" ? taslakOku() : null;

  useEffect(() => {
    const t = taslakOku();
    if (!t || !t.giris || !t.cikis) {
      router.replace(`${taban}/konaklama`);
      return;
    }

    const yukle = async () => {
      setYukleniyor(true);
      setHata("");
      try {
        const liste = await musaitOdalar(t.giris, t.cikis);
        setOdalar(liste);
      } catch (err) {
        if (err instanceof ApiHatasi) {
          setHata(err.message);
        } else {
          setHata("Odalar yüklenirken bir hata oluştu.");
        }
      } finally {
        setYukleniyor(false);
      }
    };

    void yukle();
  }, [router, oturum, taban]);

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      if (!secilenOdaNo) {
        setHata("Lütfen bir oda seçiniz!");
        return;
      }
      const secilen = odalar.find((o) => o.no === secilenOdaNo);
      if (secilen) {
        taslakYaz({
          odaNo: secilen.no,
          odaTip: secilen.tip,
          odaKat: secilen.kat,
        });
      }
      router.push(`${taban}/on-izleme`);
    },
    [secilenOdaNo, odalar, router, taban]
  );

  const KAT_ETIKET: Record<string, string> = {
    CAM_KATI: "Çam Katı",
    MESE_KATI: "Meşe Katı",
    KAYIN_KATI: "Kayın Katı",
  };

  return (
    <MisafirShell taban={taban}>
      <SihirbazKarti
        baslik="Yeni Rezervasyon Oluştur"
        aciklama={
          taslak
            ? `${taslak.giris} → ${taslak.cikis} tarihleri için müsait odalar`
            : "Bilgilerinizi adım adım doldurunuz"
        }
      >
        <Stepper aktifAdim={2} />

        <div className="mb-8">
          <h2 className="text-[1.35rem] font-semibold text-[#1a3b25] mb-1.5">
            Oda Seçimi
          </h2>
          <p className="text-[0.9rem] text-[#888]">
            Tarihlere uygun, müsait odalardan birini seçin.
          </p>
        </div>

        {/* YÜKLENİYOR */}
        {yukleniyor && (
          <div className="text-center py-12 text-[#888]">
            <div className="w-10 h-10 border-4 border-[#e0e0e0] border-t-[#2b5e39] rounded-full animate-spin mx-auto mb-3"></div>
            Müsait odalar yükleniyor...
          </div>
        )}

        {/* HATA */}
        {!yukleniyor && hata && (
          <div className="p-4 bg-[#fff3f3] border border-[#f5c6cb] rounded-lg text-[#d9534f] text-[0.9rem] mb-4">
            {hata}
          </div>
        )}

        {/* BOŞ LİSTE */}
        {!yukleniyor && !hata && odalar.length === 0 && (
          <div className="text-center py-12 text-[#888]">
            <svg
              viewBox="0 0 24 24"
              className="w-12 h-12 fill-current mx-auto mb-3 opacity-30"
            >
              <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
            </svg>
            <p>Seçilen tarihlerde müsait oda bulunmamaktadır.</p>
            <Link
              href={`${taban}/konaklama`}
              className="mt-3 inline-block text-[#2b5e39] underline text-[0.9rem]"
            >
              Farklı tarih seçin
            </Link>
          </div>
        )}

        {/* ODA LİSTESİ */}
        {!yukleniyor && !hata && odalar.length > 0 && (
          <form onSubmit={handleSubmit}>
            <div className="space-y-4 mb-8">
              {odalar.map((oda) => (
                <div
                  key={oda.no}
                  className={`border rounded-[10px] p-6 flex flex-col sm:flex-row justify-between sm:items-center bg-white transition-all duration-200 hover:shadow-[0_4px_15px_rgba(0,0,0,0.03)] cursor-pointer ${
                    secilenOdaNo === oda.no
                      ? "border-[#2b5e39] bg-[#fdfefd]"
                      : "border-[#eaeaea] hover:border-[#bce3cc]"
                  }`}
                  onClick={() => setSecilenOdaNo(oda.no)}
                >
                  <div>
                    <h3 className="text-[1.15rem] text-[#1a3b25] font-semibold mb-1">
                      Oda {oda.no} — {oda.tip}
                    </h3>
                    <p className="text-[0.85rem] text-[#666] mb-3">
                      {KAT_ETIKET[oda.kat] ?? oda.kat}
                    </p>
                    <div className="flex gap-2 text-[0.8rem] text-[#444]">
                      <span className="bg-[#f1f5f2] py-1 px-2.5 rounded-[4px] border border-[#e1e8e3]">
                        {oda.kapasite} Kişilik
                      </span>
                      <span className="bg-[#f1f5f2] py-1 px-2.5 rounded-[4px] border border-[#e1e8e3]">
                        Müsait
                      </span>
                    </div>
                  </div>
                  <div className="text-right flex flex-col items-end gap-2.5 mt-4 sm:mt-0">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSecilenOdaNo(oda.no);
                      }}
                      className={`py-2 px-6 rounded-md text-[0.9rem] font-semibold transition-all duration-200 ${
                        secilenOdaNo === oda.no
                          ? "bg-[#2b5e39] border border-[#2b5e39] text-white"
                          : "bg-[#f0f4f1] border border-[#c2d6c7] text-[#2b5e39] hover:bg-[#e2ede5]"
                      }`}
                    >
                      {secilenOdaNo === oda.no ? "Seçildi ✓" : "Seç"}
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <hr className="border-t border-[#eaeaea] my-8 mt-10" />

            <div className="flex justify-between items-center relative">
              <Link
                href={`${taban}/konaklama`}
                className="bg-white border border-[#ccc] text-[#555] py-2.5 px-6 rounded-md text-[0.9rem] font-medium inline-flex items-center gap-2 transition-colors hover:bg-[#f0f0f0]"
              >
                ← Geri
              </Link>
              <button
                type="submit"
                disabled={!secilenOdaNo}
                className="bg-[#1a3b25] border-none text-white py-2.5 px-10 rounded-md text-[0.9rem] font-medium cursor-pointer inline-flex items-center gap-2 transition-colors hover:bg-[#122a1a] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Ön İzlemeye Geç →
              </button>
            </div>
          </form>
        )}
      </SihirbazKarti>
    </MisafirShell>
  );
}
