"use client";
import Link from "next/link";
import Image from "next/image";

export default function AnasayfaFooter() {
  return (
    <footer id="iletisim" style={{ 
      background: 'linear-gradient(180deg, #0a1f0a 0%, #0f2a0f 40%, #2e1b0f 100%)', 
      position: 'relative', 
      paddingTop: '70px', 
      overflow: 'hidden' 
    }}>
      {/* Sol Üst Dalga Deseni (Dekoratif) */}
      <div style={{
        position: 'absolute', top: '-20px', left: '-20px', width: '300px', height: '300px',
        border: '1px solid rgba(74,222,128,0.05)', borderRadius: '50%',
        boxShadow: 'inset 0 0 50px rgba(74,222,128,0.02)',
        pointerEvents: 'none'
      }} />
      <div style={{
        position: 'absolute', top: '-60px', left: '-60px', width: '400px', height: '400px',
        border: '1px solid rgba(74,222,128,0.03)', borderRadius: '50%',
        pointerEvents: 'none'
      }} />

      {/* Ağaç Silüeti (Sağ Alt - Topraktan yükselen) */}
      <div style={{
        position: 'absolute', bottom: 0, right: '5%', width: '450px', height: '450px',
        background: 'url(/agac-silueti.png) no-repeat bottom center',
        backgroundSize: 'contain', opacity: 0.15, zIndex: 1, pointerEvents: 'none',
        filter: 'sepia(1) hue-rotate(50deg) saturate(2)'
      }} />

      <div style={{ 
        position: 'relative', zIndex: 2, maxWidth: '1280px', margin: '0 auto', 
        padding: '0 40px 50px', display: 'grid', gridTemplateColumns: '1.4fr 0.9fr 1fr 1.1fr', gap: '40px' 
      }}>
        {/* Kolon 1: Brand & Sosyal */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <div style={{ 
              width: '40px', height: '40px', borderRadius: '50%', 
              border: '1.5px solid var(--accent)', display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: 'var(--accent)', fontSize: '20px'
            }}>
              🌲
            </div>
            <span style={{ color: '#fff', fontWeight: 800, fontSize: '16px', letterSpacing: '0.02em' }}>OGM Misafirhanesi</span>
          </div>
          <p style={{ color: 'rgba(187,247,208,0.7)', fontSize: '13.5px', lineHeight: 1.75, maxWidth: '320px' }}>
            Orman Genel Müdürlüğü Misafirhanesi olarak, doğayla iç içe konforlu ve güvenli bir konaklama deneyimi sunuyoruz.
          </p>
          <div style={{ display: 'flex', gap: '12px', marginTop: '4px' }}>
            {['f', 'in', 'tw'].map((icon, i) => (
              <a key={i} href="#" style={{ 
                width: '32px', height: '32px', borderRadius: '50%', 
                background: 'rgba(74,222,128,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', 
                color: 'var(--accent)', fontSize: '13px', fontWeight: 700, transition: 'background 0.2s'
              }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background='rgba(74,222,128,0.2)'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background='rgba(74,222,128,0.1)'; }}
              >
                {icon === 'tw' ? '𝕏' : icon}
              </a>
            ))}
          </div>
        </div>

        {/* Kolon 2: Keşfedin */}
        <div>
          <h5 style={{ color: '#fff', fontSize: '12px', fontWeight: 800, letterSpacing: '.06em', textTransform: 'uppercase', marginBottom: '22px' }}>KEŞFEDİN</h5>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {[{ href: '#hakkinda', label: 'Hakkımızda' }, { href: '#odalar', label: 'Odalarımız' }, { href: '#hizmetler', label: 'Hizmetlerimiz' }, { href: '#konum', label: 'Konum' }].map(l => (
              <a key={l.label} href={l.href} style={{ color: 'rgba(187,247,208,0.65)', fontSize: '13.5px', transition: 'color 0.2s' }}
                 onMouseEnter={e => (e.currentTarget.style.color = '#fff')}
                 onMouseLeave={e => (e.currentTarget.style.color = 'rgba(187,247,208,0.65)')}>
                {l.label}
              </a>
            ))}
          </div>
        </div>

        {/* Kolon 3: Ziyaret */}
        <div>
          <h5 style={{ color: '#fff', fontSize: '12px', fontWeight: 800, letterSpacing: '.06em', textTransform: 'uppercase', marginBottom: '22px' }}>ZİYARET</h5>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {[{ href: '/giris', label: 'Randevu Al' }, { href: '#', label: 'Rezervasyon Koşulları' }, { href: '#', label: 'Sıkça Sorulan Sorular' }, { href: '#', label: 'Gizlilik Politikası' }].map(l => (
              <a key={l.label} href={l.href} style={{ color: 'rgba(187,247,208,0.65)', fontSize: '13.5px', transition: 'color 0.2s' }}
                 onMouseEnter={e => (e.currentTarget.style.color = '#fff')}
                 onMouseLeave={e => (e.currentTarget.style.color = 'rgba(187,247,208,0.65)')}>
                {l.label}
              </a>
            ))}
          </div>
        </div>

        {/* Kolon 4: İletişim */}
        <div>
          <h5 style={{ color: '#fff', fontSize: '12px', fontWeight: 800, letterSpacing: '.06em', textTransform: 'uppercase', marginBottom: '22px' }}>İLETİŞİM</h5>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
            <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
              <span style={{ color: 'var(--accent)', fontSize: '16px', marginTop: '2px' }}>📍</span>
              <span style={{ color: 'rgba(187,247,208,0.7)', fontSize: '13.5px', lineHeight: 1.5 }}>OGM Misafirhane Tesisleri<br/>Çankaya / Ankara</span>
            </div>
            <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
              <span style={{ color: 'var(--accent)', fontSize: '16px' }}>📞</span>
              <span style={{ color: 'rgba(187,247,208,0.7)', fontSize: '13.5px' }}>0312 123 45 67</span>
            </div>
            <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
              <span style={{ color: 'var(--accent)', fontSize: '16px' }}>✉️</span>
              <span style={{ color: 'rgba(187,247,208,0.7)', fontSize: '13.5px' }}>misafirhane@ogm.gov.tr</span>
            </div>
          </div>
        </div>
      </div>

      {/* Alt Şerit */}
      <div style={{ 
        position: 'relative', zIndex: 2, 
        borderTop: '1px solid rgba(74,222,128,0.1)', 
        background: 'rgba(0,0,0,0.15)',
        padding: '20px 40px', textAlign: 'center', 
        color: 'rgba(187,247,208,0.4)', fontSize: '12px' 
      }}>
        © {new Date().getFullYear()} Orman Genel Müdürlüğü Misafirhanesi. Tüm hakları saklıdır.
      </div>
    </footer>
  );
}
