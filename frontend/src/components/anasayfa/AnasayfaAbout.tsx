"use client";
import Image from "next/image";

export default function AnasayfaAbout() {
  return (
    <section id="hakkinda" style={{ padding: '150px 0 100px', position: 'relative' }}>
      <div style={{ maxWidth: '1240px', margin: '0 auto', padding: '0 40px', position: 'relative', zIndex: 1 }}>
        <div style={{ display: 'grid', gridTemplateColumns: '0.9fr 1.1fr', gap: '70px', alignItems: 'center' }}>
          {/* Photo */}
          <div style={{ position: 'relative' }}>
            <div style={{
              borderRadius: '20px', overflow: 'hidden', height: '440px',
              background: 'linear-gradient(135deg,#1e5c1e,#0f2a0f)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: '0 30px 60px rgba(15,42,15,0.18)',
              position: 'relative',
            }}>
              <Image src="/ogm.agac.avif" alt="OGM Ağaç" fill style={{ objectFit: 'cover', opacity: 0.5 }}
                onError={() => {}} />
              <span style={{ color: 'rgba(255,255,255,0.7)', fontSize: '15px', fontWeight: 600, letterSpacing: '.05em', position: 'relative', zIndex: 1 }}>
                Orman Genel Müdürlüğü
              </span>
            </div>
            <div style={{
              position: 'absolute', bottom: '-26px', left: '-26px',
              background: 'var(--dark)', color: '#fff',
              borderRadius: '16px', padding: '18px 22px',
              boxShadow: '0 16px 40px rgba(15,42,15,0.3)',
              display: 'flex', alignItems: 'center', gap: '12px',
            }}>
              <span style={{ fontSize: '26px', fontWeight: 900, color: 'var(--accent)' }}>1937</span>
              <span style={{ fontSize: '11.5px', color: 'var(--nav-text)', maxWidth: '90px', lineHeight: 1.3 }}>Yılından bu yana hizmetinizdeyiz</span>
            </div>
          </div>

          {/* Body */}
          <div>
            <div style={{ textTransform: 'uppercase', fontSize: '12px', fontWeight: 700, letterSpacing: '.14em', color: 'var(--mid)' }}>Hakkımızda</div>
            <h2 style={{ fontSize: '36px', fontWeight: 900, letterSpacing: '-0.02em', margin: '12px 0 20px', color: 'var(--ink)' }}>
              Doğanın Ortasında Konforlu Konaklama
            </h2>
            <p style={{ fontSize: '15.5px', lineHeight: 1.85, color: '#48584a', marginBottom: '26px', maxWidth: '560px' }}>
              Orman Genel Müdürlüğü misafirhaneleri, Türkiye&apos;nin dört bir yanında doğal güzellikler içinde, uygun fiyatlı ve konforlu konaklama imkânı sunar. Personellerimiz ve aileleri için kurulmuş misafirhanelerimiz, artık daha geniş bir kitleye hizmet vermektedir.
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 0, marginBottom: '30px', borderTop: '1px solid var(--line)', paddingTop: '26px' }}>
              {[
                { n: '100+', l: 'Oda Kapasitesi' },
                { n: '81', l: 'İl Geneli' },
                { n: '24/7', l: 'Hizmet' },
                { n: '87 Yıl', l: 'Deneyim' },
              ].map((s, i) => (
                <div key={i}>
                  <div style={{ fontSize: '30px', fontWeight: 900, color: 'var(--mid)', letterSpacing: '-0.01em' }}>{s.n}</div>
                  <div style={{ fontSize: '12px', color: '#6b7d6b', fontWeight: 600, marginTop: '2px' }}>{s.l}</div>
                </div>
              ))}
            </div>
            <div style={{
              background: 'linear-gradient(120deg, var(--dark), var(--mid))',
              borderRadius: '16px', padding: '22px 26px',
              display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '20px',
            }}>
              <div>
                <h4 style={{ color: '#fff', fontSize: '15.5px', fontWeight: 700, marginBottom: '4px' }}>Hemen Rezervasyon Yapın</h4>
                <p style={{ color: 'var(--nav-text)', fontSize: '12.5px', margin: 0 }}>Uygun tarih ve oda seçerek kolayca rezervasyon oluşturun</p>
              </div>
              <a href="/giris" style={{
                background: 'linear-gradient(135deg, #22c55e 0%, #ffffff 130%)', color: '#0a1a0a',
                fontWeight: 700, fontSize: '13px', padding: '11px 20px',
                borderRadius: '999px', whiteSpace: 'nowrap',
                transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                boxShadow: '0 4px 14px rgba(34,197,94,0.25)',
              }}
              onMouseEnter={e => { 
                (e.currentTarget as HTMLElement).style.transform='translateY(-2px) scale(1.04)'; 
                (e.currentTarget as HTMLElement).style.boxShadow='0 8px 24px rgba(34,197,94,0.35)';
              }}
              onMouseLeave={e => { 
                (e.currentTarget as HTMLElement).style.transform='translateY(0) scale(1)'; 
                (e.currentTarget as HTMLElement).style.boxShadow='0 4px 14px rgba(34,197,94,0.25)';
              }}
              >Rezervasyon →</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
