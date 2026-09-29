"use client";

import React, { useState } from "react";
import Image from "next/image";
import { signIn, getSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { YONETIM_ROLLERI } from "@/auth/roller";
import type { Rol } from "@/auth/roller";

function yonetimRolu(rol?: Rol | null) {
  return rol ? YONETIM_ROLLERI.includes(rol) : false;
}

export default function ResepsiyonLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (res?.error) {
      setError("Geçersiz e-posta veya şifre.");
      return;
    } 

    const oturum = await getSession();
    if (!yonetimRolu(oturum?.user?.rol)) {
      await signOut({ redirect: false });
      setError("Bu hesabın resepsiyon paneline erişim yetkisi yok.");
      return;
    }

    router.push("/oda-yonetimi"); // Resepsiyon ana sayfasına yönlendirme
    router.refresh();
  };

  return (
    <div
      className="flex items-center justify-center min-h-screen p-5 select-none relative overflow-hidden"
      style={{ backgroundColor: "#0f2a0f" }}
    >
      {/* Ağaç Silüeti Arka Plan */}
      <div
        className="absolute inset-0 z-0 pointer-events-none opacity-10"
        style={{
          backgroundImage: "url('/agac-silueti.png')",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "right bottom",
          backgroundSize: "60%",
        }}
      />

      <div className="relative z-10 bg-white/95 backdrop-blur-sm p-8 md:p-10 rounded-2xl shadow-2xl w-full max-w-[420px] text-center box-border border border-white/20">
        {/* Logo ve Başlık Alanı */}
        <div className="flex flex-col items-center mb-8">
          <div className="w-[120px] h-[120px] rounded-full bg-white shadow-md flex items-center justify-center mb-4 border border-gray-100 p-2 overflow-hidden box-border">
            <Image
              src="/ogm.logo.png"
              alt="OGM Logo"
              width={100}
              height={100}
              className="object-contain"
            />
          </div>
          <h2 className="m-0 mb-2 text-[#0f2a0f] text-2xl font-bold tracking-tight">
            Resepsiyon Girişi
          </h2>
          <p className="m-0 text-gray-500 text-xs leading-relaxed px-2">
            İşlemlerinize devam edebilmeniz için yönetici girişi yapın
          </p>
        </div>

        {error && (
          <div className="mb-4 text-red-500 text-sm font-semibold bg-red-50 p-2 rounded border border-red-200">
            {error}
          </div>
        )}

        {/* Giriş Formu */}
        <form onSubmit={handleLogin} className="flex flex-col gap-4 text-left">
          {/* E-posta */}
          <div className="flex w-full box-border items-stretch">
            <span className="flex items-center justify-center w-12 min-w-[48px] bg-gray-50 border border-gray-300 border-r-0 rounded-l-lg text-[#0f2a0f] text-base">
              <i className="pi pi-envelope"></i>
            </span>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="E-posta Adresi"
              className="flex-1 w-full rounded-r-lg border border-gray-300 p-3 text-sm outline-none box-border focus:border-[#4ade80]"
              required
            />
          </div>

          {/* Şifre Satırı */}
          <div className="flex w-full box-border items-stretch">
            <span className="flex items-center justify-center w-12 min-w-[48px] bg-gray-50 border border-gray-300 border-r-0 rounded-l-lg text-[#0f2a0f] text-base">
              <i className="pi pi-key"></i>
            </span>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Şifreniz"
              required
              className="w-full flex-1 rounded-r-lg border border-gray-300 p-3 text-sm outline-none box-border focus:border-[#4ade80]"
            />
          </div>

          <button
            type="submit"
            className="w-full mt-4 text-white font-semibold p-3 rounded-lg cursor-pointer text-sm tracking-wide transition-colors duration-200 border-none bg-ogm-700 hover:bg-ogm-800"
            style={{ backgroundColor: "#0f2a0f" }}
          >
            GİRİŞ YAP
          </button>
        </form>
      </div>
    </div>
  );
}
