"use client";
import Image from 'next/image';

import React, { useRef } from 'react';
import Link from 'next/link';

export default function PersonelYakiniPage() {
  const otpRefs = [
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null)
  ];

  const handleOtpChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length >= 1 && index < 3) {
      otpRefs[index + 1].current?.focus();
    }
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
        <div className="h-[70px] bg-white flex justify-between items-center px-8 shadow-[0_1px_4px_rgba(0,0,0,0.05)] z-20">
          <div className="font-semibold text-[#1a3b25] text-[1.1rem]">OGM Misafirhane Rezervasyon Portalı</div>
          <div className="flex items-center gap-2.5 text-[0.9rem] font-medium text-[#333]">
            <div className="w-8 h-8 bg-[#163a22] text-white rounded-full flex items-center justify-center">
              <svg viewBox="0 0 24 24" width="20" height="20" fill="white"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm-3 2c-2.67 0-8 1.34-8 4v2h16v-2c0-.42.09-.81.25-1.18-.75-.4-1.7-.68-2.85-.82H9zm11 0c-1.85 0-3.15 1.5-3.15 2.5 0 2 3.15 4.5 3.15 4.5s3.15-2.5 3.15-4.5c0-1-1.3-2.5-3.15-2.5z"/></svg>
            </div>
            <span>Personel Yakını ˅</span>
          </div>
        </div>

        {/* ORTA KISIM */}
        <div className="flex-1 p-12 flex flex-col items-center relative z-10 overflow-y-auto">
          
          {/* FORM KARTI */}
          <div className="bg-white w-full max-w-[800px] rounded-xl p-6 shadow-[0_8px_24px_rgba(0,0,0,0.04)] relative z-10">
            
            <div className="bg-[#1a3b25] rounded-lg p-5 flex items-center gap-4 mb-8 text-white">
              <div className="w-10 h-10 border-2 border-white rounded-full flex items-center justify-center">
                <svg viewBox="0 0 24 24" className="w-5 h-5 fill-white"><path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z"/></svg>
              </div>
              <div>
                <h2 className="text-[1.25rem] font-semibold mb-1">Personel Yakını Doğrulama</h2>
                <p className="text-[0.85rem] text-[#a8c1b1] m-0">Lütfen kimlik bilgilerinizi girerek doğrulama yapınız</p>
              </div>
            </div>

            {/* BİLGİ MESAJI — Bu akış henüz aktif değil */}
            <div className="bg-[#fff3cd] border border-[#ffc107] rounded-lg p-5 mb-6 flex items-start gap-3">
              <svg viewBox="0 0 24 24" className="w-5 h-5 fill-[#856404] shrink-0 mt-0.5"><path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z"/></svg>
              <div>
                <p className="text-[0.9rem] text-[#856404] font-semibold mb-1">Bu akış henüz aktif değil</p>
                <p className="text-[0.85rem] text-[#856404]">
                  Personel yakını doğrulama, kurumsal kimlik sistemiyle entegrasyon tamamlandıktan sonra aktif edilecektir. 
                  Lütfen daha sonra tekrar deneyiniz veya iletişim sayfamızdan destek alınız.
                </p>
              </div>
            </div>

            <form>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6 opacity-50 pointer-events-none">
                
                <div className="flex flex-col">
                  <label className="text-[0.9rem] font-semibold text-[#333] mb-2"><span className="text-[#d9534f] mr-1">*</span>Kullanıcı Adı (Yakın ID)</label>
                  <div className="relative">
                    <svg className="absolute left-[15px] top-1/2 -translate-y-1/2 w-[18px] h-[18px] fill-white pointer-events-none" viewBox="0 0 24 24"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>
                    <input type="text" placeholder="Personel Kullanıcı Adı" disabled className="w-full bg-[#2b5b3b] text-white border-none rounded-md py-3 pr-[15px] pl-[42px] text-[0.95rem] outline-none placeholder:text-[#a3c1ad]" />
                  </div>
                </div>

                <div className="flex flex-col">
                  <label className="text-[0.9rem] font-semibold text-[#333] mb-2"><span className="text-[#d9534f] mr-1">*</span>E-mail Adresi</label>
                  <div className="relative">
                    <svg className="absolute left-[15px] top-1/2 -translate-y-1/2 w-[18px] h-[18px] fill-white pointer-events-none" viewBox="0 0 24 24"><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>
                    <input type="email" placeholder="Personel E-mail Adresi" disabled className="w-full bg-[#2b5b3b] text-white border-none rounded-md py-3 pr-[15px] pl-[42px] text-[0.95rem] outline-none placeholder:text-[#a3c1ad]" />
                  </div>
                </div>

              </div>

              <div className="bg-[#eaf5ed] border border-[#a8c1b1] rounded-lg p-6 mb-6 opacity-50 pointer-events-none">
                <div className="flex items-center gap-2 font-semibold text-[#1a3b25] mb-2.5">
                  <svg viewBox="0 0 24 24" className="w-[18px] h-[18px] fill-[#1a3b25]"><path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z"/></svg>
                  Doğrulama Kodu
                </div>
                <div className="flex gap-2.5">
                  {[0, 1, 2, 3].map((i) => (
                    <input 
                      key={i}
                      ref={otpRefs[i]}
                      type="text" 
                      maxLength={1} 
                      disabled
                      onChange={(e) => handleOtpChange(i, e)}
                      className="w-[45px] h-[55px] text-[1.5rem] text-center border-2 border-[#2b5b3b] rounded-md text-[#1a3b25] font-bold bg-white outline-none" 
                    />
                  ))}
                </div>
                <div className="text-[0.75rem] text-[#555] mt-2">SMS/e-posta ile gönderilen 4 haneli kodu giriniz</div>
              </div>

              <div className="flex justify-between items-center relative">
                <Link href="/giris" className="bg-white border border-[#ccc] text-[#333] py-2.5 px-6 rounded-md text-[0.9rem] font-medium inline-flex items-center gap-2 transition-colors hover:bg-[#f0f0f0]">
                  ← Geri Dön
                </Link>
                <Link href="/iletisim" className="bg-white border border-[#ccc] text-[#333] py-2.5 px-6 rounded-md text-[0.9rem] font-medium inline-flex items-center gap-2 transition-colors hover:bg-[#f0f0f0]">
                  ❔ Yardım
                </Link>
                <button 
                  type="button" 
                  disabled
                  title="Bu akış henüz aktif değil"
                  className="bg-[#1a3b25]/40 border-none text-white py-2.5 px-8 rounded-md text-[0.9rem] font-medium cursor-not-allowed inline-flex items-center gap-2"
                >
                  Doğrula →
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
