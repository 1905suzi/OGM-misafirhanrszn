"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { signOut } from "next-auth/react";

export default function MisafirShell({
  taban = "/misafir",
  children,
}: {
  taban?: string;
  children: React.ReactNode;
}) {
  const pathname = usePathname() || "";
  const isAktif = (path: string) => pathname.includes(path);

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Geri butonuyla (bfcache) gelindiğinde sayfayı yenile ki yetki kontrolü (middleware) tekrar çalışsın
  useEffect(() => {
    const handlePageShow = (event: PageTransitionEvent) => {
      if (event.persisted) {
        window.location.reload();
      }
    };
    window.addEventListener("pageshow", handlePageShow);
    return () => window.removeEventListener("pageshow", handlePageShow);
  }, []);

  return (
    <div className="flex h-screen bg-[#f6f8f7] overflow-hidden">
      
      {/* MOBILE OVERLAY */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 md:hidden" 
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* SOL SIDEBAR */}
      <div className={`fixed md:static inset-y-0 left-0 w-[260px] bg-[#163a22] flex flex-col text-white z-50 transition-transform duration-300 ease-in-out ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0`}>
        <div className="pt-8 relative">
          <button 
            className="absolute top-4 right-4 md:hidden text-white/70 hover:text-white"
            onClick={() => setIsSidebarOpen(false)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
          
          <div className="text-center mb-8">
            <div className="w-[85px] h-[85px] bg-white rounded-full p-1 mx-auto mb-2.5 shadow-[0_4px_10px_rgba(0,0,0,0.15)] flex items-center justify-center">
              <Image
                src="/ogm.logo.png"
                alt="OGM Logo"
                width={75}
                height={75}
                className="object-contain"
                priority
              />
            </div>
            <h2 className="text-[1.1rem] font-bold tracking-[0.5px]">
              OGM MİSAFİRHANE
            </h2>
            <p className="text-[0.8rem] text-[#8bb197] mt-0.5">
              Rezervasyon Portalı
            </p>
          </div>
          <div className="flex flex-col gap-1">
            <Link
              href={`${taban}/dashboard`}
              onClick={() => setIsSidebarOpen(false)}
              className={`flex items-center gap-3 py-3.5 px-5 text-[0.95rem] transition-all duration-200 ${
                isAktif("dashboard")
                  ? "bg-[#21472e] text-white border-l-4 border-[#8fbc9f]"
                  : "text-[#a8c1b1] hover:text-white hover:bg-white/5"
              }`}
            >
              <svg viewBox="0 0 24 24" className="w-[18px] h-[18px] fill-current">
                <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
              </svg>
              Ana Sayfa
            </Link>
            <Link
              href={`${taban}/konaklama`}
              onClick={() => setIsSidebarOpen(false)}
              className={`flex items-center gap-3 py-3.5 px-5 text-[0.95rem] transition-all duration-200 ${
                isAktif("konaklama") || isAktif("oda-secimi") || isAktif("on-izleme") || isAktif("odeme") || isAktif("rezervasyon-basarili")
                  ? "bg-[#21472e] text-white border-l-4 border-[#8fbc9f]"
                  : "text-[#a8c1b1] hover:text-white hover:bg-white/5"
              }`}
            >
              <svg viewBox="0 0 24 24" className="w-[18px] h-[18px] fill-current">
                <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 9h-2V9H8v3H6v2h2v3h2v-3h2v-2z" />
              </svg>
              Rezervasyon Oluştur
            </Link>
            <Link
              href={`${taban}/rezervasyonlarim`}
              onClick={() => setIsSidebarOpen(false)}
              className={`flex items-center gap-3 py-3.5 px-5 text-[0.95rem] transition-all duration-200 ${
                isAktif("rezervasyonlarim")
                  ? "bg-[#21472e] text-white border-l-4 border-[#8fbc9f]"
                  : "text-[#a8c1b1] hover:text-white hover:bg-white/5"
              }`}
            >
              <svg viewBox="0 0 24 24" className="w-[18px] h-[18px] fill-current">
                <path d="M4 14h4v-4H4v4zm0 5h4v-4H4v4zM4 9h4V5H4v4zm5 5h12v-4H9v4zm0 5h12v-4H9v4zM9 5v4h12V5H9z" />
              </svg>
              Rezervasyonlarım
            </Link>
            <Link
              href={`${taban}/iletisim`}
              onClick={() => setIsSidebarOpen(false)}
              className={`flex items-center gap-3 py-3.5 px-5 text-[0.95rem] transition-all duration-200 ${
                isAktif("iletisim")
                  ? "bg-[#21472e] text-white border-l-4 border-[#8fbc9f]"
                  : "text-[#a8c1b1] hover:text-white hover:bg-white/5"
              }`}
            >
              <svg viewBox="0 0 24 24" className="w-[18px] h-[18px] fill-current">
                <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
              </svg>
              İletişim
            </Link>
          </div>
        </div>
        <div className="mt-auto p-5 pb-7">
          <button
            onClick={() => signOut({ callbackUrl: "/" })}
            className="flex items-center gap-2.5 text-[#d1dcd5] hover:text-white text-[0.95rem] transition-colors"
          >
            <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
              <path d="M17 7l-1.41 1.41L18.17 11H8v2h10.17l-2.58 2.58L17 17l5-5zM4 5h8V3H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h8v-2H4V5z" />
            </svg>
            Çıkış Yap
          </button>
        </div>
      </div>

      {/* SAĞ İÇERİK */}
      <div className="flex-1 flex flex-col relative z-10 w-full md:w-auto">
        {/* ÜST HEADER */}
        <div className="h-[70px] bg-white flex justify-between items-center px-4 md:px-8 shadow-[0_1px_4px_rgba(0,0,0,0.05)] z-20">
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setIsSidebarOpen(true)}
              className="md:hidden p-1.5 text-[#163a22] hover:bg-gray-100 rounded-md"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
            </button>
            <div className="font-semibold text-[#1a3b25] text-[0.95rem] md:text-[1.1rem] truncate">
              OGM Misafirhane Portalı
            </div>
          </div>
          <div className="flex items-center gap-2 md:gap-2.5 text-[0.8rem] md:text-[0.9rem] font-medium text-[#333]">
            <div className="w-7 h-7 md:w-8 md:h-8 bg-[#163a22] text-white rounded-full flex items-center justify-center">
              <svg viewBox="0 0 24 24" className="w-[16px] h-[16px] md:w-[20px] md:h-[20px]" fill="white">
                <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm-3 2c-2.67 0-8 1.34-8 4v2h16v-2c0-.42.09-.81.25-1.18-.75-.4-1.7-.68-2.85-.82H9zm11 0c-1.85 0-3.15 1.5-3.15 2.5 0 2 3.15 4.5 3.15 4.5s3.15-2.5 3.15-4.5c0-1-1.3-2.5-3.15-2.5z" />
              </svg>
            </div>
            <span className="hidden sm:inline">Hoş Geldiniz ˅</span>
          </div>
        </div>

        {/* ORTA KISIM */}
        <div className="flex-1 p-4 md:p-12 flex flex-col items-center relative z-10 overflow-y-auto">
          {children}

          {/* ARKA PLAN AĞAÇ SVG */}
          <svg
            className="absolute -bottom-5 -right-5 w-[550px] h-[800px] z-0 pointer-events-none overflow-hidden blur-[10px] opacity-25 mix-blend-multiply"
            viewBox="0 0 500 800"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M320 800V420L295 450L275 410L250 450L220 395L190 440L150 380L110 450L70 370L20 480V800H320Z" fill="#7fa98c" />
            <path d="M420 800V310L395 345L375 305L350 345L325 290L295 335L260 270L220 340L180 260L130 360L80 430V800H420Z" fill="#699677" />
            <path d="M480 800V240L455 275L435 235L410 275L385 220L355 265L320 200L280 270L240 190L190 290L140 370L100 450L70 520V800H480Z" fill="#588566" />
            <path d="M500 800V150L465 200L435 145L400 195L365 130L325 185L285 110L235 190L185 100L130 210L80 310L40 400L20 500V800H500Z" fill="#477355" />
          </svg>
        </div>
      </div>
    </div>
  );
}
