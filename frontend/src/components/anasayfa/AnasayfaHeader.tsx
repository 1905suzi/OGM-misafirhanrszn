"use client";
import Image from "next/image";
import Link from "next/link";

export default function AnasayfaHeader() {
  return (
    <header style={{
      background: 'var(--dark)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '14px 40px',
      position: 'relative',
      zIndex: 40,
    }}>
      {/* Brand */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        <Image src="/bayrak1.png" alt="Türk Bayrağı" width={40} height={26} style={{ objectFit: 'contain' }}
          onError={(e) => { (e.target as HTMLImageElement).style.display='none'; }} />
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{
            width: '46px', height: '46px', borderRadius: '50%',
            background: 'radial-gradient(circle at 32% 28%, #2a6b2a, var(--dark) 72%)',
            border: '2px solid var(--accent)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
          }}>
            <Image src="/ogm.logo.png" alt="OGM Logo" width={32} height={32} style={{ borderRadius: '50%', objectFit: 'cover' }}
              onError={(e) => { (e.target as HTMLImageElement).style.display='none'; }} />
          </div>
          <div>
            <div style={{ fontWeight: 800, fontSize: '15px', color: '#fff', letterSpacing: '.01em', lineHeight: 1.15 }}>
              ORMAN GENEL MÜDÜRLÜĞÜ
            </div>
            <div style={{ fontSize: '11px', fontWeight: 600, letterSpacing: '.12em', color: 'var(--accent)', textTransform: 'uppercase' }}>
              Misafirhane Sistemi
            </div>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav style={{ display: 'flex', alignItems: 'center', gap: '30px' }}>
        {[
          { href: '/', label: 'Anasayfa' },
          { href: '#hakkinda', label: 'Hakkımızda' },
          { href: '#odalar', label: 'Odalarımız' },
          { href: '#hizmetler', label: 'Hizmetlerimiz' },
          { href: '#konum', label: 'Konum' },
          { href: '#iletisim', label: 'İletişim' },
        ].map(({ href, label }) => (
          <a key={href} href={href} style={{
            fontSize: '13.5px', fontWeight: 600, color: 'var(--nav-text)',
            padding: '6px 2px', position: 'relative', 
            transition: 'color .2s ease, transform .2s ease', display: 'inline-block'
          }}
            onMouseEnter={e => {
              e.currentTarget.style.color = '#fff';
              e.currentTarget.style.transform = 'scale(1.08)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.color = 'var(--nav-text)';
              e.currentTarget.style.transform = 'scale(1)';
            }}
          >
            {label}
          </a>
        ))}
      </nav>

      {/* CTA */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
        <Link href="/giris" style={{
          background: 'linear-gradient(180deg, var(--gold) 0%, var(--gold-dark) 100%)',
          color: '#fff', fontWeight: 700, fontSize: '13.5px',
          padding: '11px 22px', borderRadius: '999px',
          display: 'inline-flex', alignItems: 'center', gap: '8px',
          boxShadow: '0 6px 16px rgba(198,139,60,0.35)',
          transition: 'transform .2s ease, box-shadow .2s ease',
        }}
          onMouseEnter={e => { 
            (e.currentTarget as HTMLElement).style.transform='translateY(-2px) scale(1.04)'; 
            (e.currentTarget as HTMLElement).style.boxShadow='0 10px 24px rgba(198,139,60,0.45)';
          }}
          onMouseLeave={e => { 
            (e.currentTarget as HTMLElement).style.transform='translateY(0) scale(1)'; 
            (e.currentTarget as HTMLElement).style.boxShadow='0 6px 16px rgba(198,139,60,0.35)';
          }}
        >
          📅 Rezervasyon Oluştur
        </Link>
      </div>
    </header>
  );
}
