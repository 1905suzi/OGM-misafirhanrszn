"use client";
import { useState } from "react";

const cards = [
  { kicker: 'Konforlu Odalar', h3: 'Tek & Çift Kişilik', desc: 'Standart ve superior oda seçeneklerimizle bireysel konaklamalar için ideal.' },
  { kicker: 'Aile Odaları', h3: 'Aile & Grup Odaları', desc: 'Geniş aile odaları ve bungalov seçenekleriyle ailenizle unutulmaz bir tatil.' },
  { kicker: 'Doğa & Aktivite', h3: 'Doğal Yaşam Alanları', desc: 'Orman yürüyüşleri, piknik alanları ve doğa aktiviteleri ile kendinizi yenileyin.' },
];

export default function AnasayfaFeatureCards() {
  const [hovered, setHovered] = useState<number | null>(null);
  return (
    <section id="odalar" style={{ padding: '40px 0 110px' }}>
      <div style={{ maxWidth: '1240px', margin: '0 auto', padding: '0 40px', position: 'relative', zIndex: 1 }}>
        <div style={{ textAlign: 'center', maxWidth: '620px', margin: '0 auto 54px' }}>
          <div style={{ textTransform: 'uppercase', fontSize: '12px', fontWeight: 700, letterSpacing: '.14em', color: 'var(--mid)' }}>Odalarımız</div>
          <h2 style={{ fontSize: '34px', fontWeight: 900, letterSpacing: '-0.02em', marginTop: '10px' }}>Konforlu Konaklama Seçenekleri</h2>
          <p style={{ color: '#5b6c5c', fontSize: '15px', marginTop: '12px', lineHeight: 1.7 }}>Her bütçe ve ihtiyaca uygun oda tiplerinde konforlu ve doğayla iç içe konaklama imkânı.</p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '26px' }}>
          {cards.map((c, i) => (
            <div key={i}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
              style={{
                position: 'relative', borderRadius: '20px', overflow: 'hidden', height: '400px',
                background: 'linear-gradient(160deg,#274d27,#0f2a0f)',
                cursor: 'pointer', boxShadow: hovered === i ? '0 26px 54px rgba(15,42,15,0.3)' : '0 18px 40px rgba(15,42,15,0.16)',
                transition: 'box-shadow .35s ease',
              }}
            >
              {/* Shade */}
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(10,20,10,0.05) 0%, rgba(8,18,8,0.92) 100%)' }} />
              {/* Body */}
              <div style={{
                position: 'absolute', left: 0, right: 0, bottom: 0, padding: '26px',
                transform: hovered === i ? 'translateY(0)' : 'translateY(58px)',
                transition: 'transform .4s cubic-bezier(.2,.7,.3,1)',
              }}>
                <div style={{ color: 'var(--accent)', fontSize: '11.5px', fontWeight: 700, letterSpacing: '.12em', textTransform: 'uppercase', marginBottom: '8px', opacity: hovered === i ? 1 : 0, transition: 'opacity .35s ease .1s' }}>
                  {c.kicker}
                </div>
                <h3 style={{ color: '#fff', fontSize: '22px', fontWeight: 800, marginBottom: '10px' }}>{c.h3}</h3>
                <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: '13.5px', lineHeight: 1.65, maxHeight: hovered === i ? '100px' : '0', overflow: 'hidden', opacity: hovered === i ? 1 : 0, transition: 'max-height .4s ease, opacity .35s ease .05s' }}>
                  {c.desc}
                </p>
                <div style={{ marginTop: '14px', display: 'inline-flex', alignItems: 'center', gap: '6px', color: 'var(--accent)', fontSize: '12.5px', fontWeight: 700, opacity: hovered === i ? 1 : 0, transform: hovered === i ? 'translateX(0)' : 'translateX(-6px)', transition: 'all .35s ease .12s' }}>
                  Detayları Gör →
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
