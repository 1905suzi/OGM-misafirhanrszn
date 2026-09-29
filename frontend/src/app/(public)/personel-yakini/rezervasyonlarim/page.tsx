"use client";
import Image from 'next/image';

import React, { useState } from 'react';
import Link from 'next/link';

export default function RezervasyonlarimPage() {
  // Demo amaçlı dummy data
  const [rezervasyonListesi, setRezervasyonListesi] = useState([
    {
      islemNo: 'REZ-1001',
      oda: 'Standart Oda',
      tarih: '2026-08-08',
      durum: 'Onaylandı'
    },
    {
      islemNo: 'REZ-1002',
      oda: 'Suit Oda',
      tarih: '2026-09-12',
      durum: 'İptal Talebi Alındı'
    }
  ]);

  const [toastMessage, setToastMessage] = useState('');

  const iptalTalebi = (islemNo: string) => {
    setToastMessage(`${islemNo} numaralı rezervasyon için iptal talebiniz alınmıştır.`);
    
    // Listeyi güncelle (Durumu değiştir)
    setRezervasyonListesi(prev => prev.map(rez => 
      rez.islemNo === islemNo ? { ...rez, durum: 'İptal Talebi Alındı' } : rez
    ));

    setTimeout(() => {
      setToastMessage('');
    }, 3000);
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
            <Link href="/personel-yakini/dashboard" className="flex items-center gap-3 py-3.5 px-5 text-[#a8c1b1] hover:text-white hover:bg-white/5 text-[0.95rem] transition-all duration-200">
              <svg viewBox="0 0 24 24" className="w-[18px] h-[18px] fill-current"><path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/></svg>
              Ana Sayfa
            </Link>
            <Link href="/personel-yakini/konaklama" className="flex items-center gap-3 py-3.5 px-5 text-[#a8c1b1] hover:text-white hover:bg-white/5 text-[0.95rem] transition-all duration-200">
              <svg viewBox="0 0 24 24" className="w-[18px] h-[18px] fill-current"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 9h-2V9H8v3H6v2h2v3h2v-3h2v-2z"/></svg>
              Rezervasyon Oluştur
            </Link>
            <Link href="/personel-yakini/rezervasyonlarim" className="flex items-center gap-3 py-3.5 px-5 bg-[#21472e] text-white border-l-4 border-[#8fbc9f] text-[0.95rem] transition-all duration-200">
              <svg viewBox="0 0 24 24" className="w-[18px] h-[18px] fill-current"><path d="M4 14h4v-4H4v4zm0 5h4v-4H4v4zM4 9h4V5H4v4zm5 5h12v-4H9v4zm0 5h12v-4H9v4zM9 5v4h12V5H9z"/></svg>
              Rezervasyonlarım
            </Link>
            <Link href="/personel-yakini/iletisim" className="flex items-center gap-3 py-3.5 px-5 text-[#a8c1b1] hover:text-white hover:bg-white/5 text-[0.95rem] transition-all duration-200">
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
          
          <div className="w-full max-w-[1000px] text-[1.4rem] font-semibold text-[#111] mb-6">
            Rezervasyonlarım
          </div>

          <div className="w-full max-w-[1000px] bg-white rounded-lg shadow-[0_4px_15px_rgba(0,0,0,0.03)] overflow-hidden relative z-10 border border-[#eaeaea]">
            <table className="w-full border-collapse text-left text-[0.9rem]">
              <thead>
                <tr className="bg-[#163a22] text-white">
                  <th className="p-3.5 px-4 font-semibold text-[0.85rem] tracking-[0.5px]">REZ NO</th>
                  <th className="p-3.5 px-4 font-semibold text-[0.85rem] tracking-[0.5px]">ODA</th>
                  <th className="p-3.5 px-4 font-semibold text-[0.85rem] tracking-[0.5px]">TARİH</th>
                  <th className="p-3.5 px-4 font-semibold text-[0.85rem] tracking-[0.5px]">DURUM</th>
                  <th className="p-3.5 px-4 font-semibold text-[0.85rem] tracking-[0.5px]">İŞLEMLER</th>
                </tr>
              </thead>
              <tbody>
                {rezervasyonListesi.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="text-center text-[#666] p-12 text-[1rem]">Henüz bir rezervasyonunuz bulunmamaktadır.</td>
                  </tr>
                ) : (
                  rezervasyonListesi.map((rez) => (
                    <tr key={rez.islemNo} className="border-b border-[#eaeaea] last:border-b-0">
                      <td className="p-4 text-[#333] font-semibold align-middle">{rez.islemNo}</td>
                      <td className="p-4 text-[#333] align-middle">{rez.oda}</td>
                      <td className="p-4 text-[#333] align-middle">{rez.tarih}</td>
                      <td className="p-4 align-middle">
                        {rez.durum === 'Onaylandı' ? (
                          <span className="bg-[#d1e7dd] text-[#0f5132] py-1 px-3 rounded-full font-semibold text-[0.8rem] inline-block text-center">Aktif</span>
                        ) : (
                          <span className="bg-[#fff3cd] text-[#856404] py-1 px-3 rounded-full font-semibold text-[0.8rem] inline-block text-center">{rez.durum}</span>
                        )}
                      </td>
                      <td className="p-4 align-middle">
                        {rez.durum === 'Onaylandı' ? (
                          <button 
                            onClick={() => iptalTalebi(rez.islemNo)}
                            className="bg-white border border-[#dc3545] text-[#dc3545] py-1 px-3 rounded-md text-[0.8rem] font-medium cursor-pointer transition-colors hover:bg-[#dc3545] hover:text-white"
                          >
                            İptal Talebi
                          </button>
                        ) : (
                          <span className="text-[#888] text-[0.8rem]">İşlem Yapılamaz</span>
                        )}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* ARKA PLAN AĞAÇ */}
          <svg className="absolute -bottom-5 -right-5 w-[550px] h-[800px] z-0 pointer-events-none overflow-hidden blur-[10px] opacity-25 mix-blend-multiply" viewBox="0 0 500 800" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M320 800V420L295 450L275 410L250 450L220 395L190 440L150 380L110 450L70 370L20 480V800H320Z" fill="#7fa98c"/>
            <path d="M420 800V310L395 345L375 305L350 345L325 290L295 335L260 270L220 340L180 260L130 360L80 430V800H420Z" fill="#699677"/>
            <path d="M480 800V240L455 275L435 235L410 275L385 220L355 265L320 200L280 270L240 190L190 290L140 370L100 450L70 520V800H480Z" fill="#588566"/>
            <path d="M500 800V150L465 200L435 145L400 195L365 130L325 185L285 110L235 190L185 100L130 210L80 310L40 400L20 500V800H500Z" fill="#477355"/>
          </svg>

          {/* TOAST MESSAGE */}
          {toastMessage && (
            <div className="fixed right-[30px] bottom-[30px] bg-[rgba(209,231,221,0.95)] border border-[#a3cfbb] text-[#0f5132] p-[15px_20px] rounded-lg flex items-center gap-3 font-semibold text-[0.95rem] shadow-[0_4px_15px_rgba(0,0,0,0.1)] z-[1000]">
              <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>
              <span>{toastMessage}</span>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
