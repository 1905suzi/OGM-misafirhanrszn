"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import MisafirShell from "./MisafirShell";

export default function BasariliAdimi({ taban = "/misafir" }: { taban?: string }) {
  const [rezNo, setRezNo] = useState("");

  useEffect(() => {
    const no = sessionStorage.getItem("ogm-son-rez-no");
    if (no) {
      setRezNo(no);
      // sessionStorage temizle — yalnızca bir kez gösterilmeli
      sessionStorage.removeItem("ogm-son-rez-no");
    }
  }, []);

  return (
    <MisafirShell taban={taban}>
      <div className="bg-white rounded-xl p-12 shadow-[0_2px_8px_rgba(0,0,0,0.04)] text-center w-full max-w-[550px] mt-10">
        <div className="w-[80px] h-[80px] bg-[#245332] rounded-full flex items-center justify-center mx-auto mb-6">
          <svg viewBox="0 0 24 24" className="w-[50px] h-[50px] fill-white">
            <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
          </svg>
        </div>
        <h2 className="text-[1.5rem] font-bold text-[#111] mb-2">
          Rezervasyonunuz Oluşturulmuştur
        </h2>
        <p className="text-[#666] text-[0.9rem] mb-4">
          Rezervasyon işleminiz başarıyla tamamlanmıştır.<br />
          Dilediğiniz zaman Rezervasyonlarım sayfasından durumunu takip
          edebilirsiniz.
        </p>

        {rezNo && (
          <div className="bg-[#f0f9f4] border border-[#bbf7d0] rounded-lg p-4 mb-6 inline-block">
            <p className="text-[0.8rem] text-[#555] mb-1">Rezervasyon Numaranız</p>
            <p className="text-[1.1rem] font-bold text-[#245332]">{rezNo}</p>
          </div>
        )}

        {/* YÖNLENDİRME BUTONLARI */}
        <div className="flex gap-4">
          <Link
            href={`${taban}/rezervasyonlarim`}
            className="flex-1 bg-[#1c4227] text-white text-center py-4 rounded-lg font-semibold text-[1rem] transition-colors hover:bg-[#122a1a]"
          >
            Rezervasyonlarıma Git
          </Link>
          <Link
            href={`${taban}/dashboard`}
            className="flex-1 bg-white text-[#333] border border-[#ddd] text-center py-4 rounded-lg font-semibold text-[1rem] transition-colors hover:bg-[#f0f0f0]"
          >
            Ana Sayfaya Dön
          </Link>
        </div>
      </div>
    </MisafirShell>
  );
}
