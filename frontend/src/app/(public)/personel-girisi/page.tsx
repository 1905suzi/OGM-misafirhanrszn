"use client";
import Image from 'next/image';

import React, { useState } from 'react';
import Link from 'next/link';

export default function PersonelGirisiPage() {
  const [showInfo, setShowInfo] = useState(false);

  return (
    <div className="flex h-screen bg-[#f6f8f7] overflow-hidden">
      
      {/* SOL SIDEBAR */}
      <div className="w-[260px] bg-[#163a22] flex flex-col text-white z-20">
        <div className="pt-8">
          <div className="text-center mb-8">
            <div className="w-[85px] h-[85px] bg-white rounded-full p-1 mx-auto mb-2.5 shadow-[0_4px_10px_rgba(0,0,0,0.15)] flex items-center justify-center">
              <Image src="/ogm.logo.png" alt="OGM Logo" width={75} height={75} className="object-contain" priority />
            </div>
            <h2 className="text-[1.1rem] font-bold tracking-[0.5px]">OGM MİSAFİRHANE</h2>
            <p className="text-[0.8rem] text-[#8bb197] mt-0.5">Rezervasyon Portalı</p>
          </div>
          <div className="flex flex-col gap-1">
            <Link href="/giris" className="flex items-center gap-3 py-3.5 px-5 text-[#a8c1b1] hover:text-white hover:bg-white/5 text-[0.95rem] transition-all duration-200">
              <svg viewBox="0 0 24 24" className="w-[18px] h-[18px] fill-current"><path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/></svg>
              Ana Sayfa
            </Link>
            <Link href="/iletisim" className="flex items-center gap-3 py-3.5 px-5 text-[#a8c1b1] hover:text-white hover:bg-white/5 text-[0.95rem] transition-all duration-200">
              <svg viewBox="0 0 24 24" className="w-[18px] h-[18px] fill-current"><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>
              İletişim
            </Link>
          </div>
        </div>
      </div>

      {/* SAĞ İÇERİK */}
      <div className="flex-1 flex flex-col relative z-10">
        
        {/* ÜST HEADER */}
        <div className="h-[70px] bg-white flex justify-end items-center px-8 shadow-[0_1px_4px_rgba(0,0,0,0.05)] z-20">
          <div className="flex items-center gap-2.5 text-[0.9rem] font-medium text-[#333]">
            <div className="w-8 h-8 bg-[#163a22] text-white rounded-full flex items-center justify-center">
              <svg viewBox="0 0 24 24" width="20" height="20" fill="white"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>
            </div>
            <span>Hoş Geldiniz ˅</span>
          </div>
        </div>

        {/* ORTA KISIM */}
        <div className="flex-1 p-12 flex flex-col items-center justify-center relative z-10 overflow-y-auto">
          
          {/* BANNER */}
          <div className="bg-white w-full max-w-[440px] p-6 px-8 rounded-lg shadow-[0_4px_10px_rgba(0,0,0,0.02)] mb-6 relative z-10 text-center">
            <h1 className="text-[1.4rem] text-[#111] mb-1.5 font-bold">Personel Girişi</h1>
            <p className="text-[0.9rem] text-[#555]">E-posta adresiniz ve şifrenizle giriş yapın</p>
          </div>

          {/* BİLGİ KARTI */}
          <div className="w-full max-w-[440px] relative z-10">
            <div className="bg-white rounded-xl shadow-[0_8px_30px_rgba(0,0,0,0.08)] overflow-hidden border border-[#eaeaea]">
              
              <div className="bg-[#163a22] p-5 px-7 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 bg-white/10 rounded-full flex items-center justify-center">
                    <svg viewBox="0 0 24 24" className="w-5 h-5 fill-white"><path d="M19 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 4c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm4 12H8v-1c0-1.33 2.67-2 4-2s4 .67 4 2v1zm4-6h-4v-2h4v2zm0-4h-4V7h4v2z"/></svg>
                  </div>
                  <div>
                    <h2 className="text-base font-bold text-white m-0">Personel Girişi</h2>
                    <p className="text-xs text-white/55 m-0">OGM personeli olarak giriş yapın</p>
                  </div>
                </div>
                <Link href="/giris" className="bg-white/10 border-none text-white/75 py-1.5 px-3.5 rounded-full text-[0.78rem] cursor-pointer hover:bg-white/20 hover:text-white transition-colors whitespace-nowrap">
                  ← Giriş Ekranı
                </Link>
              </div>

              <div className="p-7 text-center">
                <div className="w-16 h-16 bg-[#f0f4f1] rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg viewBox="0 0 24 24" className="w-8 h-8 fill-[#2b5e39]"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/></svg>
                </div>
                <p className="text-[0.9rem] text-[#555] mb-4">
                  Personel girişi henüz aktif değildir. Bu akış, OGM kurumsal kimlik doğrulama sistemiyle entegrasyon tamamlandıktan sonra açılacaktır.
                </p>
                <p className="text-[0.8rem] text-[#888]">
                  Personel olarak rezervasyon yapmak için lütfen yöneticinizle iletişime geçin.
                </p>
                <button
                  onClick={() => setShowInfo(!showInfo)}
                  className="mt-4 text-[0.8rem] text-[#2b5e39] underline cursor-pointer"
                >
                  {showInfo ? 'Daha az göster' : 'Daha fazla bilgi'}
                </button>
                {showInfo && (
                  <div className="mt-3 text-[0.8rem] text-[#666] bg-[#f8faf8] p-3 rounded-lg text-left">
                    Personel reservasyonları resepsiyon paneli üzerinden STAFF/ADMIN yetkili kullanıcılar tarafından oluşturulabilmektedir.
                  </div>
                )}
              </div>

            </div>
          </div>

          {/* ARKA PLAN AĞAÇ */}
          <svg className="absolute -bottom-5 -right-5 w-[550px] h-[800px] z-0 pointer-events-none overflow-hidden blur-[10px] opacity-25 mix-blend-multiply" viewBox="0 0 500 800" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M320 800V420L295 450L275 410L250 450L220 395L190 440L150 380L110 450L70 370L20 480V800H320Z" fill="#7fa98c"/>
            <path d="M420 800V310L395 345L375 305L350 345L325 290L295 335L260 270L220 340L180 260L130 360L80 430V800H420Z" fill="#699677"/>
            <path d="M480 800V240L455 275L435 235L410 275L385 220L355 265L320 200L280 270L240 190L190 290L140 370L100 450L70 520V800H480Z" fill="#588566"/>
            <path d="M500 800V150L465 200L435 145L400 195L365 130L325 185L285 110L235 190L185 100L130 210L80 310L40 400L20 500V800H500Z" fill="#477355"/>
          </svg>

        </div>
      </div>
    </div>
  );
}
