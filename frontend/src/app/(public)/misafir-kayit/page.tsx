"use client";
import Image from 'next/image';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function MisafirKayitPage() {
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push('/misafir/konaklama');
  };

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
            <Link href="/giris" className="flex items-center gap-3 py-3.5 px-5 bg-[#21472e] text-white border-l-4 border-[#8fbc9f] text-[0.95rem] transition-all duration-200">
              <svg viewBox="0 0 24 24" className="w-[18px] h-[18px] fill-current"><path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/></svg>
              Ana Sayfa
            </Link>
            <Link href="/iletisim" className="flex items-center gap-3 py-3.5 px-5 text-[#a8c1b1] hover:text-white hover:bg-white/5 text-[0.95rem] transition-all duration-200">
              <svg viewBox="0 0 24 24" className="w-[18px] h-[18px] fill-current"><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>
              İletişim
            </Link>
          </div>
        </div>
        <div className="mt-auto p-5 pb-7">
          <Link href="/cikis" className="flex items-center gap-2.5 text-[#d1dcd5] hover:text-white text-[0.95rem] transition-colors">
            <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M17 7l-1.41 1.41L18.17 11H8v2h10.17l-2.58 2.58L17 17l5-5zM4 5h8V3H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h8v-2H4V5z"/></svg>
            Çıkış Yap
          </Link>
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
            <span>Misafir ˅</span>
          </div>
        </div>

        {/* ORTA KISIM */}
        <div className="flex-1 p-12 flex flex-col items-center relative z-10 overflow-y-auto">
          
          {/* FORM KARTI */}
          <div className="bg-white w-full max-w-[850px] rounded-xl p-6 shadow-[0_8px_24px_rgba(0,0,0,0.04)] relative z-10">
            
            <div className="bg-[#1a3b25] rounded-lg p-5 flex items-center gap-4 mb-8 text-white">
              <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                <svg viewBox="0 0 24 24" className="w-[22px] h-[22px] fill-[#1a3b25]"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>
              </div>
              <div>
                <h2 className="text-[1.25rem] font-semibold mb-1">Misafir Bilgileri</h2>
                <p className="text-[0.85rem] text-[#a8c1b1] m-0">Lütfen bilgilerinizi eksiksiz doldurunuz</p>
              </div>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                
                <div className="flex flex-col">
                  <label className="text-[0.9rem] font-semibold text-[#333] mb-2"><span className="text-[#d9534f] mr-1">*</span>T.C. Kimlik No</label>
                  <div className="relative">
                    <svg className="absolute left-[15px] top-1/2 -translate-y-1/2 w-[18px] h-[18px] fill-white pointer-events-none" viewBox="0 0 24 24"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>
                    <input type="text" placeholder="T.C. Kimlik Numaranız" maxLength={11} className="w-full bg-[#2b5b3b] text-white border-none rounded-md py-3 pr-[15px] pl-[42px] text-[0.95rem] outline-none transition-shadow focus:shadow-[0_0_0_2px_#4caf50] placeholder:text-[#a3c1ad]" required />
                  </div>
                </div>

                <div className="flex flex-col">
                  <label className="text-[0.9rem] font-semibold text-[#333] mb-2"><span className="text-[#d9534f] mr-1">*</span>Ad Soyad</label>
                  <div className="relative">
                    <svg className="absolute left-[15px] top-1/2 -translate-y-1/2 w-[18px] h-[18px] fill-white pointer-events-none" viewBox="0 0 24 24"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>
                    <input type="text" placeholder="Ad ve Soyadınız" className="w-full bg-[#2b5b3b] text-white border-none rounded-md py-3 pr-[15px] pl-[42px] text-[0.95rem] outline-none transition-shadow focus:shadow-[0_0_0_2px_#4caf50] placeholder:text-[#a3c1ad]" required />
                  </div>
                </div>

                <div className="flex flex-col">
                  <label className="text-[0.9rem] font-semibold text-[#333] mb-2"><span className="text-[#d9534f] mr-1">*</span>Doğum Tarihi</label>
                  <div className="relative">
                    <svg className="absolute left-[15px] top-1/2 -translate-y-1/2 w-[18px] h-[18px] fill-white pointer-events-none" viewBox="0 0 24 24"><path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11z"/></svg>
                    <input type="date" className="w-full bg-[#2b5b3b] text-white border-none rounded-md py-3 pr-[15px] pl-[42px] text-[0.95rem] outline-none transition-shadow focus:shadow-[0_0_0_2px_#4caf50]" style={{ colorScheme: 'dark' }} required />
                  </div>
                </div>

                <div className="flex flex-col">
                  <label className="text-[0.9rem] font-semibold text-[#333] mb-2"><span className="text-[#d9534f] mr-1">*</span>Telefon</label>
                  <div className="relative">
                    <svg className="absolute left-[15px] top-1/2 -translate-y-1/2 w-[18px] h-[18px] fill-white pointer-events-none" viewBox="0 0 24 24"><path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/></svg>
                    <input type="tel" placeholder="05XX XXX XX XX" className="w-full bg-[#2b5b3b] text-white border-none rounded-md py-3 pr-[15px] pl-[42px] text-[0.95rem] outline-none transition-shadow focus:shadow-[0_0_0_2px_#4caf50] placeholder:text-[#a3c1ad]" required />
                  </div>
                </div>

                <div className="flex flex-col md:col-span-2">
                  <label className="text-[0.9rem] font-semibold text-[#333] mb-2"><span className="text-[#d9534f] mr-1">*</span>E-posta</label>
                  <div className="relative">
                    <svg className="absolute left-[15px] top-1/2 -translate-y-1/2 w-[18px] h-[18px] fill-white pointer-events-none" viewBox="0 0 24 24"><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>
                    <input type="email" placeholder="ornek@email.com" className="w-full bg-[#2b5b3b] text-white border-none rounded-md py-3 pr-[15px] pl-[42px] text-[0.95rem] outline-none transition-shadow focus:shadow-[0_0_0_2px_#4caf50] placeholder:text-[#a3c1ad]" required />
                  </div>
                </div>

              </div>

              <div className="flex justify-between items-center relative">
                <Link href="/giris" className="bg-white border border-[#555] text-[#333] py-2.5 px-6 rounded-md text-[0.9rem] font-medium inline-flex items-center gap-2 transition-colors hover:bg-[#f0f0f0]">
                  ← Geri Dön
                </Link>
                <button type="submit" className="bg-[#1a3b25] border-none text-white py-2.5 px-8 rounded-md text-[0.9rem] font-medium cursor-pointer inline-flex items-center gap-2 transition-colors hover:bg-[#122a1a]">
                  İleri →
                </button>
              </div>

            </form>
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
