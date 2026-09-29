"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { signIn, getSession } from 'next-auth/react';
import { rolVarsayilanRotasi } from '@/auth/roller';
import type { Rol } from '@/auth/roller';

export default function LoginPage() {
  const router = useRouter();
  const [showForm, setShowForm] = useState(false);
  const [roleTitle, setRoleTitle] = useState('Giriş Türünü Seçiniz');
  const [roleDesc, setRoleDesc] = useState('Rezervasyon oluşturmak için giriş türünüzü seçiniz');
  const [roleIcon, setRoleIcon] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [eposta, setEposta] = useState('');
  const [sifre, setSifre] = useState('');
  const [hata, setHata] = useState('');
  const [yukleniyor, setYukleniyor] = useState(false);

  const handleCardClick = (title: string, desc: string, icon: string, target: string) => {
    if (target === '/personel-yakini-dogrulama' || target === '/personel-girisi') {
      router.push(target);
      return;
    }
    setRoleTitle(title + ' Girişi');
    setRoleDesc(desc);
    setRoleIcon(icon);
    setShowForm(true);
  };

  const handleBackClick = () => {
    setShowForm(false);
    setHata('');
    setEposta('');
    setSifre('');
    setTimeout(() => {
      setRoleTitle('Giriş Türünü Seçiniz');
      setRoleDesc('Rezervasyon oluşturmak için giriş türünüzü seçiniz');
    }, 300);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setHata('');

    if (!eposta || !sifre) {
      setHata('Lütfen e-posta ve şifrenizi giriniz.');
      return;
    }

    setYukleniyor(true);
    try {
      const sonuc = await signIn('credentials', {
        email: eposta,
        password: sifre,
        redirect: false,
      });

      if (!sonuc || sonuc.error) {
        setHata('E-posta veya şifre hatalı.');
        return;
      }

      const oturum = await getSession();
      const rol = (oturum?.user as { rol?: Rol } | undefined)?.rol;
      router.push(rol ? rolVarsayilanRotasi(rol) : '/misafir/dashboard');
      router.refresh();
    } catch {
      setHata('Bir hata oluştu. Lütfen tekrar deneyiniz.');
    } finally {
      setYukleniyor(false);
    }
  };


  return (
    <div className="flex h-screen bg-[#f6f8f7] overflow-hidden">
      
      {/* SOL SIDEBAR */}
      <div className="w-[260px] bg-[#163a22] flex flex-col text-white z-20">
        <div className="pt-8">
          <div className="text-center mb-8">
            <div className="w-[85px] h-[85px] bg-white rounded-full p-1 mx-auto mb-2.5 shadow-[0_4px_10px_rgba(0,0,0,0.15)] flex items-center justify-center overflow-hidden">
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
            <Link href="/resepsiyon/login" className="flex items-center gap-3 py-3.5 px-5 text-[#a8c1b1] hover:text-white hover:bg-white/5 text-[0.95rem] transition-all duration-200 mt-2 border-t border-white/10 pt-4">
              <svg viewBox="0 0 24 24" className="w-[18px] h-[18px] fill-current"><path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V6.3l7-3.11v8.8z"/></svg>
              Resepsiyon Paneli
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
        <div className={`flex-1 flex flex-col items-center relative z-10 overflow-y-auto ${showForm ? 'p-6 justify-start pt-4' : 'p-12'}`}>
          
          {/* BANNER */}
          <div className={`bg-white w-full max-w-[900px] rounded-lg shadow-[0_4px_10px_rgba(0,0,0,0.02)] relative z-10 transition-all ${showForm ? 'p-4 px-6 mb-4 max-w-[440px]' : 'p-6 px-8 mb-10'}`}>
            <h1 className="text-[1.4rem] text-[#111] mb-1.5">{roleTitle}</h1>
            <p className="text-[0.9rem] text-[#555]">{roleDesc}</p>
          </div>

          {/* KARTLAR & KAYIT BUTONU */}
          {!showForm && (
            <div className="w-full max-w-[900px] relative z-10 transition-all duration-300 opacity-100 translate-y-0">
              <div className="flex gap-5 justify-between w-full">
                
                {/* Misafir */}
                <div 
                  className="bg-white flex-1 rounded-lg p-10 px-6 text-center shadow-[0_4px_15px_rgba(0,0,0,0.03)] border-l-[5px] border-[#2b5e39] border-t border-r border-b border-[#eaeaea] flex flex-col items-center transition-all duration-400 cursor-pointer hover:-translate-y-3 hover:scale-[1.02] hover:shadow-[0_20px_30px_rgba(0,0,0,0.08)] hover:border-l-[#1a4225] group"
                  onClick={() => handleCardClick('Misafir', 'E-posta adresiniz ve şifrenizle giriş yapın', 'M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z', '/misafir')}
                >
                  <div className="w-[65px] h-[65px] mb-5 text-[#437652] group-hover:scale-110 transition-transform duration-300">
                    <svg viewBox="0 0 24 24" className="w-full h-full fill-current"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>
                  </div>
                  <h3 className="text-[1.15rem] text-[#222] mb-2 font-semibold">Misafir</h3>
                  <p className="text-[0.85rem] text-[#666] leading-[1.4] mb-8 min-h-[40px]">Dışarıdan misafir olarak giriş yapın</p>
                  <span className="bg-[#3b6b4a] text-white px-7 py-2.5 rounded-md text-[0.9rem] font-medium transition-colors hover:bg-[#2b5e39]">Seç →</span>
                </div>

                {/* Personel Yakını */}
                <div 
                  className="bg-[#fcfffd] flex-1 rounded-lg p-10 px-6 text-center shadow-[0_6px_20px_rgba(22,58,34,0.08)] border-2 border-[#bce3cc] border-l-[5px] border-l-[#2b5e39] flex flex-col items-center transition-all duration-400 cursor-pointer hover:-translate-y-3 hover:scale-[1.02] hover:shadow-[0_20px_35px_rgba(22,58,34,0.15)] group"
                  onClick={() => handleCardClick('Personel Yakını', 'OGM personelinin yakını olarak giriş yapın', '', '/personel-yakini-dogrulama')}
                >
                  <div className="w-[65px] h-[65px] mb-5 text-[#437652] group-hover:scale-110 transition-transform duration-300">
                    <svg viewBox="0 0 24 24" className="w-full h-full fill-current"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm-3 2c-2.67 0-8 1.34-8 4v2h16v-2c0-.42.09-.81.25-1.18-.75-.4-1.7-.68-2.85-.82H9zm11 0c-1.85 0-3.15 1.5-3.15 2.5 0 2 3.15 4.5 3.15 4.5s3.15-2.5 3.15-4.5c0-1-1.3-2.5-3.15-2.5z"/></svg>
                  </div>
                  <h3 className="text-[1.15rem] text-[#222] mb-2 font-semibold">Personel Yakını</h3>
                  <p className="text-[0.85rem] text-[#666] leading-[1.4] mb-8 min-h-[40px]">OGM personelinin yakını olarak giriş yapın</p>
                  <span className="bg-[#3b6b4a] text-white px-7 py-2.5 rounded-md text-[0.9rem] font-medium transition-colors hover:bg-[#2b5e39]">Seç →</span>
                </div>



              </div>

              <div className="flex justify-center mt-6">
                <Link href="/uye-ol" className="inline-flex items-center gap-2 bg-transparent text-[#2b5e39] border-2 border-[#2b5e39] py-2.5 px-9 rounded-full text-[0.92rem] font-semibold tracking-wide transition-all duration-250 hover:bg-[#2b5e39] hover:text-white hover:-translate-y-0.5 hover:shadow-[0_6px_20px_rgba(43,94,57,0.25)] group">
                  <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current"><path d="M15 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm-9-2V7H4v3H1v2h3v3h2v-3h3v-2H6zm9 4c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>
                  Kayıt Ol
                </Link>
              </div>
            </div>
          )}

          {/* GİRİŞ FORMU */}
          {showForm && (
            <div className="w-full max-w-[440px] relative z-10 animate-[fadeSlideIn_0.35s_ease]">
              <div className="bg-white rounded-xl shadow-[0_8px_30px_rgba(0,0,0,0.08)] overflow-hidden border border-[#eaeaea]">
                
                <div className="bg-[#163a22] p-5 px-7 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 bg-white/10 rounded-full flex items-center justify-center">
                      <svg viewBox="0 0 24 24" className="w-5 h-5 fill-white"><path d={roleIcon}/></svg>
                    </div>
                    <div>
                      <h2 className="text-base font-bold text-white m-0">{roleTitle}</h2>
                      <p className="text-xs text-white/55 m-0">E-posta ve şifrenizle giriş yapın</p>
                    </div>
                  </div>
                  <button onClick={handleBackClick} className="bg-white/10 border-none text-white/75 py-1.5 px-3.5 rounded-full text-[0.78rem] cursor-pointer hover:bg-white/20 hover:text-white transition-colors whitespace-nowrap">
                    ← Geri Dön
                  </button>
                </div>

                <div className="p-7">
                  <form onSubmit={handleSubmit} noValidate>
                    <div className="mb-4.5">
                      <label className="block text-[0.83rem] font-semibold text-[#444] mb-1.5">E-posta Adresi</label>
                      <input
                        type="email"
                        placeholder="ornek@ogm.gov.tr"
                        value={eposta}
                        onChange={(e) => setEposta(e.target.value)}
                        required
                        className="w-full p-3 px-4 border-[1.5px] border-[#e0e0e0] rounded-lg text-[0.9rem] text-[#222] bg-[#fafafa] outline-none transition-all focus:border-[#2b5e39] focus:shadow-[0_0_0_3px_rgba(43,94,57,0.1)] focus:bg-white" />
                    </div>

                    <div className="mb-4.5">
                      <label className="block text-[0.83rem] font-semibold text-[#444] mb-1.5">Şifre</label>
                      <div className="relative">
                        <input
                          type={showPassword ? "text" : "password"}
                          placeholder="Şifreniz"
                          value={sifre}
                          onChange={(e) => setSifre(e.target.value)}
                          required
                          className="w-full p-3 px-4 pr-11 border-[1.5px] border-[#e0e0e0] rounded-lg text-[0.9rem] text-[#222] bg-[#fafafa] outline-none transition-all focus:border-[#2b5e39] focus:shadow-[0_0_0_3px_rgba(43,94,57,0.1)] focus:bg-white" />
                        <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 bg-transparent border-none cursor-pointer text-[#aaa] hover:text-[#2b5e39] transition-colors">
                          <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                            <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/>
                          </svg>
                        </button>
                      </div>
                    </div>

                    {hata && (
                      <p className="text-[#d9534f] text-[0.82rem] mb-2 text-center">{hata}</p>
                    )}
                    <button
                      type="submit"
                      disabled={yukleniyor}
                      className="w-full p-3 mt-2 bg-[#1e4829] text-white rounded-lg text-[0.95rem] font-semibold transition-all hover:bg-[#163a22] hover:-translate-y-[1px] disabled:opacity-60 disabled:cursor-not-allowed">
                      {yukleniyor ? 'Giriş yapılıyor...' : 'Giriş Yap →'}
                    </button>
                    <div className="mt-4 text-center text-[0.85rem] text-[#666]">
                      Hesabınız yok mu?{' '}
                      <Link href="/uye-ol" className="text-[#1e4829] font-semibold hover:underline">
                        Hemen Üye Olun
                      </Link>
                    </div>
                  </form>
                </div>

              </div>
            </div>
          )}

          {/* ARKA PLAN AĞAÇ */}
          <svg className="absolute -bottom-5 -right-5 w-[550px] h-[800px] z-0 pointer-events-none overflow-hidden blur-[10px] opacity-25 mix-blend-multiply" viewBox="0 0 500 800" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M320 800V420L295 450L275 410L250 450L220 395L190 440L150 380L110 450L70 370L20 480V800H320Z" fill="#7fa98c"/>
            <path d="M420 800V310L395 345L375 305L350 345L325 290L295 335L260 270L220 340L180 260L130 360L80 430V800H420Z" fill="#699677"/>
            <path d="M480 800V240L455 275L435 235L410 275L385 220L355 265L320 200L280 270L240 190L190 290L140 370L100 450L70 520V800H480Z" fill="#588566"/>
            <path d="M500 800V150L465 200L435 145L400 195L365 130L325 185L285 110L235 190L185 100L130 210L80 310L40 400L20 500V800H500Z" fill="#477355"/>
          </svg>

        </div>
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        @keyframes fadeSlideIn {
          from { opacity: 0; transform: translateY(18px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}} />
    </div>
  );
}
