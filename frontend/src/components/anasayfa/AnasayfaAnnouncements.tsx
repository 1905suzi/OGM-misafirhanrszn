"use client";
import { useEffect, useState } from "react";

export default function AnasayfaAnnouncements() {
  const [items, setItems] = useState<{tag: string, text: string}[]>([
    { tag: 'Duyuru', text: '2025 yaz sezonu rezervasyonları başladı! Erken rezervasyon indirimi için hemen arayın.' },
    { tag: 'Bilgi', text: 'Yeni aile odaları Haziran 2025 itibarıyla hizmete girmiştir. Kapasite 100 odaya ulaşmıştır.' },
    { tag: 'Etkinlik', text: 'Yaz dönemi doğa yürüyüşleri ve piknik etkinlikleri programı açıklandı.' },
    { tag: 'Güncelleme', text: 'Online rezervasyon sistemi güncellendi. Artık daha kolay rezervasyon yapabilirsiniz.' },
  ]);

  useEffect(() => {
    fetch("/api/duyurular")
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data) && data.length > 0) {
          setItems(data.map((d: any) => ({
            tag: d.tur || 'Duyuru',
            text: d.icerik || ''
          })));
        } else if (Array.isArray(data) && data.length === 0) {
           setItems([{ tag: 'Bilgi', text: 'Şu an için aktif bir duyuru bulunmamaktadır.' }]);
        }
      })
      .catch(err => console.error("Duyurular yüklenemedi:", err));
  }, []);

  return (
    <section style={{ background: 'var(--dark)', padding: '70px 0', position: 'relative', overflow: 'hidden' }}>
      <div style={{ maxWidth: '1240px', margin: '0 auto', padding: '0 40px', position: 'relative', zIndex: 1 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '30px' }}>
          <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'rgba(74,222,128,0.14)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--accent)', fontSize: '20px' }}>📢</div>
          <h3 style={{ color: '#fff', fontSize: '22px', fontWeight: 800 }}>Duyurular</h3>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
          {items.map((item, i) => (
            <div key={i} style={{
              background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(74,222,128,0.14)',
              borderRadius: '14px', padding: '18px 20px',
              display: 'flex', alignItems: 'center', gap: '16px',
              transition: 'background .2s ease, transform .2s ease',
            }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background='rgba(255,255,255,0.09)'; (e.currentTarget as HTMLElement).style.transform='translateX(4px)'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background='rgba(255,255,255,0.05)'; (e.currentTarget as HTMLElement).style.transform='translateX(0)'; }}
            >
              <span style={{ flexShrink: 0, fontSize: '11px', fontWeight: 700, padding: '6px 12px', borderRadius: '999px', background: 'var(--gold)', color: '#fff', whiteSpace: 'nowrap' }}>{item.tag}</span>
              <p style={{ color: 'rgba(255,255,255,0.88)', fontSize: '13.5px', lineHeight: 1.5 }}>{item.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
