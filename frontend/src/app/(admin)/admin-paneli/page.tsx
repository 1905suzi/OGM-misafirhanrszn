"use client";

import React from "react";
import Image from "next/image";
import { signOut } from "next-auth/react";

export default function AdminPaneliPage() {
  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen p-5 text-center relative overflow-hidden"
      style={{ backgroundColor: "#0a192f" }}
    >
      <div className="relative z-10 bg-white/95 backdrop-blur-sm p-10 md:p-12 rounded-2xl shadow-2xl w-full max-w-2xl border border-white/20">
        <div className="flex flex-col items-center mb-6">
          <div className="w-[120px] h-[120px] rounded-full bg-white shadow-md flex items-center justify-center mb-6 border border-gray-100 p-2 overflow-hidden">
            <Image
              src="/ogm.logo.png"
              alt="OGM Logo"
              width={100}
              height={100}
              className="object-contain"
            />
          </div>
          <h1 className="text-3xl font-bold text-[#0a192f] mb-4">
            Yönetici Paneli Yapım Aşamasındadır
          </h1>
          <p className="text-gray-600 text-lg leading-relaxed mb-8">
            OGM Misafirhane Sisteminde henüz resmi bir yönetici girişi ve paneli devreye alınmamıştır. Bu sayfa şu an için kullanılamamaktadır. Tüm işlemler Resepsiyon ve Misafir panelleri üzerinden yürütülmektedir.
          </p>
          <button
            onClick={() => signOut({ callbackUrl: "/admin/login" })}
            className="px-8 py-3 bg-[#0a192f] text-white rounded-lg font-semibold shadow-lg hover:bg-[#112240] transition-colors"
          >
            Çıkış Yap
          </button>
        </div>
      </div>
    </div>
  );
}
