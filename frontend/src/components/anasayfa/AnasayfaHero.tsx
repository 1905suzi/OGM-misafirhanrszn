"use client";
import { useState, useEffect } from "react";
import Image from "next/image";

const slides = [
  {
    tag: '🌿 Doğayla İç İçe',
    h1: 'Ormanın Kalbinde\nHuzurlu Konaklama',
    p: 'Orman Genel Müdürlüğü misafirhanelerimizde doğayla iç içe, konforlu ve uygun fiyatlı konaklama imkânı.',
    photo: 'linear-gradient(160deg, #1a4a1a, #0a1a0a)',
  },
  {
    tag: '🏡 Ailece Dinlenin',
    h1: 'Aile Dostu\nMisafirhane Odaları',
    p: 'Tek kişilik, aile ve group odalarımızla her ihtiyaca uygun konaklama seçenekleri sunuyoruz.',
    photo: 'linear-gradient(160deg, #1e5c1e, #0f2a0f)',
  },
  {
    tag: '🌲 OGM Tesisleri',
    h1: 'Türkiye Genelinde\n100+ Misafirhane',
    p: 'Türkiye\'nin dört bir yanında doğal güzellikler içindeki misafirhanelerimizde size ev sahipliği yapıyoruz.',
    photo: 'linear-gradient(160deg, #274d27, #0f2a0f)',
  },
];

export default function AnasayfaHero() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setActive(a => (a + 1) % slides.length), 5000);
    return () => clearInterval(t);
  }, []);

  return (
    <section style={{ position: 'relative', height: '600px', overflow: 'hidden', background: 'var(--dark)' }}>
      {slides.map((s, i) => (
        <div key={i} style={{
          position: 'absolute', inset: 0,
          opacity: active === i ? 1 : 0,
          transition: 'opacity 1.1s ease',
          zIndex: active === i ? 2 : 1,
        }}>
          {/* Photo bg */}
          <div style={{
            position: 'absolute', inset: 0,
            background: s.photo,
            transform: active === i ? 'scale(1)' : 'scale(1.06)',
            transition: 'transform 7s ease',
          }}>
            {/* Ağaç silüeti */}
            <Image src="/ogm.agac.avif" alt="" fill style={{ objectFit: 'cover', opacity: 0.18, mixBlendMode: 'luminosity' }}
              onError={() => {}} />
          </div>
          {/* Veil */}
          <div style={{
            position: 'absolute', inset: 0,
            background: 'linear-gradient(180deg, rgba(10,26,10,0.55) 0%, rgba(10,26,10,0.25) 40%, rgba(8,20,8,0.85) 100%)',
          }} />
          {/* Content */}
          <div style={{
            position: 'relative', zIndex: 5,
            height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center',
            maxWidth: '1280px', margin: '0 auto', padding: '0 40px',
          }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: 'var(--accent)', fontWeight: 700, fontSize: '12.5px', letterSpacing: '.1em', textTransform: 'uppercase', marginBottom: '18px' }}>
              {s.tag}
            </div>
            <h1 style={{ fontSize: '52px', fontWeight: 900, color: '#fff', lineHeight: 1.08, letterSpacing: '-0.02em', maxWidth: '640px', marginBottom: '20px', whiteSpace: 'pre-line' }}>
              {s.h1}
            </h1>
            <p style={{ fontSize: '16.5px', color: 'rgba(255,255,255,0.85)', maxWidth: '520px', lineHeight: 1.6, marginBottom: '30px' }}>
              {s.p}
            </p>
            <a href="#odalar" style={{
              display: 'inline-flex', alignItems: 'center', gap: '9px',
              background: 'var(--accent)', color: '#0a1a0a',
              fontWeight: 700, fontSize: '14px', padding: '13px 26px',
              borderRadius: '999px', transition: 'transform .2s ease, background .2s ease',
              width: 'fit-content',
            }}
              onMouseEnter={e => { 
                (e.currentTarget as HTMLElement).style.background='#6ee79f'; 
                (e.currentTarget as HTMLElement).style.transform='translateY(-2px) scale(1.04)'; 
              }}
              onMouseLeave={e => { 
                (e.currentTarget as HTMLElement).style.background='var(--accent)'; 
                (e.currentTarget as HTMLElement).style.transform='translateY(0) scale(1)'; 
              }}
            >
              Odalarımızı Keşfedin →
            </a>
          </div>
        </div>
      ))}

      {/* Arrows */}
      <button onClick={() => setActive(a => (a - 1 + slides.length) % slides.length)} style={{
        position: 'absolute', top: '50%', left: '28px', transform: 'translateY(-50%)',
        width: '46px', height: '46px', borderRadius: '50%',
        background: 'rgba(255,255,255,0.14)', backdropFilter: 'blur(6px)',
        border: '1px solid rgba(255,255,255,0.25)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        color: '#fff', zIndex: 6,
      }}>‹</button>
      <button onClick={() => setActive(a => (a + 1) % slides.length)} style={{
        position: 'absolute', top: '50%', right: '28px', transform: 'translateY(-50%)',
        width: '46px', height: '46px', borderRadius: '50%',
        background: 'rgba(255,255,255,0.14)', backdropFilter: 'blur(6px)',
        border: '1px solid rgba(255,255,255,0.25)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        color: '#fff', zIndex: 6,
      }}>›</button>

      {/* Dots */}
      <div style={{ position: 'absolute', bottom: '130px', right: '40px', zIndex: 6, display: 'flex', gap: '9px' }}>
        {slides.map((_, i) => (
          <button key={i} onClick={() => setActive(i)} style={{
            width: active === i ? '26px' : '9px',
            height: '9px',
            borderRadius: active === i ? '5px' : '50%',
            background: active === i ? 'var(--accent)' : 'rgba(255,255,255,0.35)',
            transition: 'all .25s ease',
            border: 'none', cursor: 'pointer',
          }} />
        ))}
      </div>
    </section>
  );
}
