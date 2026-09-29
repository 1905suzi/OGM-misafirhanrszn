"use client";
import Image from 'next/image';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';

export default function IletisimPage() {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [messages, setMessages] = useState<{text: string, isBot: boolean, isQuickReply?: boolean}[]>([
    {
      text: "Merhaba! OGM Misafirhanesi asistanına hoş geldiniz. Size nasıl yardımcı olabilirim? Aşağıdaki hızlı işlemlerden birini seçebilir veya sorunuzu yazabilirsiniz.",
      isBot: true,
      isQuickReply: true
    }
  ]);
  const [inputValue, setInputValue] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isChatOpen) {
      scrollToBottom();
    }
  }, [messages, isChatOpen]);

  const getBotResponse = (rawInput: string) => {
    const input = rawInput.toLocaleLowerCase('tr-TR');

    if (input.includes('fiyat') || input.includes('ücret') || input.includes('kaç para')) {
      return "Güncel taban fiyatlarımız:<br/>- Standart Oda: 1000 ₺<br/>- Suit Oda: 1800 ₺<br/>- Aile Odası: 2500 ₺'dir.<br/><br/><i>(Personel ve Yakın indirimleri bu fiyatlara dahil değildir.)</i>";
    }
    else if (input.includes('indirim') || input.includes('personel') || input.includes('yakın')) {
      return "<b>Misafir</b> girişlerinde standart fiyatlar geçerlidir.<br/><br/><b>Personel</b> girişlerinde tüm odalarda %50, <b>Personel Yakını</b> girişlerinde ise %25 oranında indirim uygulanmaktadır. Seçtiğiniz giriş türüne göre sistem fiyatı otomatik hesaplar.";
    }
    else if (input.includes('iptal') || input.includes('iade')) {
      return "Rezervasyonunuzu oluşturduktan sonra sistemdeki <b>'Rezervasyonlarım'</b> sekmesine giderek ilgili kaydın yanındaki <b>'İptal Talebi'</b> butonuna basabilirsiniz. Talebiniz anında yönetime iletilerek işleme alınacaktır.";
    }
    else if (input.includes('saat') || input.includes('giriş') || input.includes('çıkış') || input.includes('check')) {
      return "Misafirhanemize giriş (check-in) saati en erken 14:00, çıkış (check-out) saati ise en geç 11:00'dir.";
    }
    else if (input.includes('merhaba') || input.includes('selam')) {
      return "Merhaba! Size misafirhanemizle ilgili nasıl yardımcı olabilirim?";
    }
    else if (input.includes('teşekkür') || input.includes('sağol')) {
      return "Rica ederim, başka bir sorunuz olursa buradayım. İyi günler dileriz!";
    }
    else {
      return "Üzgünüm, sorunuzu tam anlayamadım. Size oda fiyatları, indirimler veya iptal işlemleri hakkında otomatik bilgi verebilirim.<br/><br/>Farklı ve daha detaylı bir sorunuz varsa sol taraftaki <b>İletişim Bilgileri</b> (Tel: 0312 XXX XX XX, E-posta: misafirhane@ogm.gov.tr) üzerinden bize ulaşabilirsiniz.";
    }
  };

  const sendMessage = (text: string = inputValue) => {
    const msg = text.trim();
    if (msg === '') return;

    setMessages(prev => [...prev, { text: msg, isBot: false }]);
    setInputValue("");

    setTimeout(() => {
      const response = getBotResponse(msg);
      setMessages(prev => [...prev, { text: response, isBot: true }]);
    }, 500);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      sendMessage();
    }
  };

  const sendQuickReply = (text: string) => {
    sendMessage(text);
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
            <Link href="/misafir/dashboard" className="flex items-center gap-3 py-3.5 px-5 text-[#a8c1b1] hover:text-white hover:bg-white/5 text-[0.95rem] transition-all duration-200">
              <svg viewBox="0 0 24 24" className="w-[18px] h-[18px] fill-current"><path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/></svg>
              Ana Sayfa
            </Link>
            <Link href="/misafir/konaklama" className="flex items-center gap-3 py-3.5 px-5 text-[#a8c1b1] hover:text-white hover:bg-white/5 text-[0.95rem] transition-all duration-200">
              <svg viewBox="0 0 24 24" className="w-[18px] h-[18px] fill-current"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 9h-2V9H8v3H6v2h2v3h2v-3h2v-2z"/></svg>
              Rezervasyon Oluştur
            </Link>
            <Link href="/misafir/rezervasyonlarim" className="flex items-center gap-3 py-3.5 px-5 text-[#a8c1b1] hover:text-white hover:bg-white/5 text-[0.95rem] transition-all duration-200">
              <svg viewBox="0 0 24 24" className="w-[18px] h-[18px] fill-current"><path d="M4 14h4v-4H4v4zm0 5h4v-4H4v4zM4 9h4V5H4v4zm5 5h12v-4H9v4zm0 5h12v-4H9v4zM9 5v4h12V5H9z"/></svg>
              Rezervasyonlarım
            </Link>
            <Link href="/misafir/iletisim" className="flex items-center gap-3 py-3.5 px-5 bg-[#21472e] text-white border-l-4 border-[#8fbc9f] text-[0.95rem] transition-all duration-200">
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
          
          <div className="bg-white w-full max-w-[900px] p-6 px-8 rounded-lg shadow-[0_4px_10px_rgba(0,0,0,0.02)] mb-10 relative z-10">
            <h1 className="text-[1.4rem] text-[#111] mb-1.5 font-bold">İletişim & Destek</h1>
            <p className="text-[0.9rem] text-[#555]">Sistemle veya rezervasyonlarınızla ilgili her türlü soru ve destek talebiniz için bize ulaşabilirsiniz.</p>
          </div>

          <div className="flex flex-col md:flex-row gap-5 w-full max-w-[900px] justify-center relative z-10">
            
            {/* İletişim Bilgileri Kartı */}
            <div className="bg-white w-full max-w-[400px] rounded-lg p-10 px-6 text-center shadow-[0_4px_15px_rgba(0,0,0,0.03)] border-l-[5px] border-l-[#2b5e39] border-t border-r border-b border-[#eaeaea] flex flex-col items-center transition-all duration-400 hover:-translate-y-3 hover:scale-[1.02] hover:shadow-[0_20px_30px_rgba(0,0,0,0.08)] hover:border-l-[#1a4225] group">
              <div className="w-[65px] h-[65px] mb-5 text-[#437652] group-hover:scale-110 transition-transform duration-300">
                <svg viewBox="0 0 24 24" className="w-full h-full fill-current"><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>
              </div>
              <h3 className="text-[1.15rem] text-[#222] mb-3 font-semibold">İletişim Bilgileri</h3>
              <p className="text-[0.9rem] text-[#555] leading-[1.6] mb-4">Mesai saatleri içerisinde çağrı merkezimizden veya e-posta adresimizden destek alabilirsiniz.</p>
              
              <div className="text-left w-full bg-[#f4f6f5] p-4 rounded-md border border-[#eaeaea] mt-auto">
                <div className="flex items-center gap-2.5 mb-2 text-[0.9rem] text-[#333]">
                  <svg viewBox="0 0 24 24" className="w-[18px] h-[18px] fill-[#2b5e39]"><path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/></svg>
                  <strong>Tel:</strong> 0312 XXX XX XX
                </div>
                <div className="flex items-center gap-2.5 text-[0.9rem] text-[#333]">
                  <svg viewBox="0 0 24 24" className="w-[18px] h-[18px] fill-[#2b5e39]"><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>
                  <strong>E-posta:</strong> misafirhane@ogm.gov.tr
                </div>
              </div>
            </div>

            {/* Canlı Asistan Kartı */}
            <div className="bg-[#fcfffd] w-full max-w-[400px] rounded-lg p-10 px-6 text-center shadow-[0_6px_20px_rgba(22,58,34,0.08)] border-2 border-[#bce3cc] border-l-[5px] border-l-[#2b5e39] flex flex-col items-center transition-all duration-400 hover:-translate-y-3 hover:scale-[1.02] hover:shadow-[0_20px_35px_rgba(22,58,34,0.15)] group">
              <div className="w-[65px] h-[65px] mb-5 text-[#437652] group-hover:scale-110 transition-transform duration-300">
                <svg viewBox="0 0 24 24" className="w-full h-full fill-current"><path d="M21 11.5v-1c0-1.1-.9-2-2-2h-1V6c0-1.1-.9-2-2-2H8c-1.1 0-2 .9-2 2v2.5H5c-1.1 0-2 .9-2 2v1c0 1.1.9 2 2 2h1v2c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2v-2h1c1.1 0 2-.9 2-2zM15 17H9v-2h6v2zm1.5-6.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM7.5 10.5c-.83 0-1.5-.67-1.5-1.5S6.67 7.5 7.5 7.5 9 8.17 9 9s-.67 1.5-1.5 1.5z"/></svg>
              </div>
              <h3 className="text-[1.15rem] text-[#222] mb-3 font-semibold">Canlı Asistan</h3>
              <p className="text-[0.9rem] text-[#555] leading-[1.6] mb-8">Yapay zeka destekli asistanımız ile rezervasyon, fiyatlar ve sistem kuralları hakkında anında çözüm bulun.</p>
              
              <button onClick={toggleChat} className="bg-[#3b6b4a] mt-auto text-white px-7 py-2.5 rounded-md text-[0.9rem] font-medium transition-colors hover:bg-[#2b5e39]">
                Sohbete Başla →
              </button>
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

      {/* CANLI ASİSTAN SOHBET PENCERESİ (WIDGET) */}
      {isChatOpen && (
        <div className="fixed bottom-[30px] right-[30px] w-[350px] h-[500px] bg-white rounded-xl shadow-[0_10px_30px_rgba(0,0,0,0.15)] flex flex-col overflow-hidden z-[1000] border border-[#eaeaea]">
          <div className="bg-[#163a22] text-white p-[15px_20px] flex justify-between items-center">
            <div className="flex items-center gap-2.5">
              <svg viewBox="0 0 24 24" className="w-6 h-6 fill-white"><path d="M21 11.5v-1c0-1.1-.9-2-2-2h-1V6c0-1.1-.9-2-2-2H8c-1.1 0-2 .9-2 2v2.5H5c-1.1 0-2 .9-2 2v1c0 1.1.9 2 2 2h1v2c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2v-2h1c1.1 0 2-.9 2-2zM15 17H9v-2h6v2zm1.5-6.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM7.5 10.5c-.83 0-1.5-.67-1.5-1.5S6.67 7.5 7.5 7.5 9 8.17 9 9s-.67 1.5-1.5 1.5z"/></svg>
              <div className="flex flex-col">
                <h4 className="text-[1rem] font-semibold m-0 leading-tight">OGM Asistan</h4>
                <span className="text-[0.75rem] text-[#a8c1b1]">Çevrimiçi</span>
              </div>
            </div>
            <button onClick={toggleChat} className="bg-transparent border-none text-white text-[1.5rem] cursor-pointer leading-[1]">×</button>
          </div>

          <div className="flex-1 p-5 overflow-y-auto bg-[#fcfdfc] flex flex-col gap-[15px]">
            {messages.map((m, idx) => (
              <div key={idx} className={`max-w-[85%] p-[10px_15px] rounded-lg text-[0.9rem] leading-[1.4] ${m.isBot ? 'bg-[#eaf5ed] text-[#1a3b25] self-start rounded-bl-none border border-[#bce3cc]' : 'bg-[#163a22] text-white self-end rounded-br-none'}`}>
                <div dangerouslySetInnerHTML={{__html: m.text}} />
                
                {m.isQuickReply && (
                  <div className="flex flex-wrap gap-2 mt-[10px]">
                    <button onClick={() => sendQuickReply('Oda Fiyatları')} className="bg-white border border-[#163a22] text-[#163a22] px-3 py-1 rounded-full text-[0.8rem] cursor-pointer transition-colors hover:bg-[#163a22] hover:text-white">Oda Fiyatları</button>
                    <button onClick={() => sendQuickReply('İndirimler')} className="bg-white border border-[#163a22] text-[#163a22] px-3 py-1 rounded-full text-[0.8rem] cursor-pointer transition-colors hover:bg-[#163a22] hover:text-white">İndirimler</button>
                    <button onClick={() => sendQuickReply('İptal Şartları')} className="bg-white border border-[#163a22] text-[#163a22] px-3 py-1 rounded-full text-[0.8rem] cursor-pointer transition-colors hover:bg-[#163a22] hover:text-white">İptal Şartları</button>
                  </div>
                )}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          <div className="p-[15px] bg-white border-t border-[#eaeaea] flex gap-[10px]">
            <input 
              type="text" 
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Mesajınızı yazın..." 
              className="flex-1 p-[10px_15px] border border-[#ccc] rounded-full outline-none text-[0.9rem] focus:border-[#163a22]"
            />
            <button onClick={() => sendMessage()} className="bg-[#163a22] border-none rounded-full w-[40px] h-[40px] flex items-center justify-center cursor-pointer transition-colors hover:bg-[#21472e]">
              <svg viewBox="0 0 24 24" className="w-[18px] h-[18px] fill-white ml-[2px]"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/></svg>
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
