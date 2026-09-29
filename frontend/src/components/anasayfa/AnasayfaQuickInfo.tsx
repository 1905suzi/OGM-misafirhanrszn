export default function AnasayfaQuickInfo() {
  const items = [
    { icon: '🏨', l1: '100 Oda', l2: 'Tek, çift ve aile odaları' },
    { icon: '📅', l1: 'Online Rezervasyon', l2: '7/24 kolayca rezervasyon yapın' },
    { icon: '🌳', l1: 'Doğa İçinde', l2: 'Orman Genel Müdürlüğü tesisleri' },
    { icon: '📞', l1: '0312 123 45 67', l2: 'Resepsiyon hattı' },
  ];
  return (
    <div style={{ position: 'relative', zIndex: 10, maxWidth: '1120px', margin: '-84px auto 0', padding: '0 40px' }}>
      <div style={{
        background: '#fff', borderRadius: '18px',
        boxShadow: '0 24px 60px rgba(15,42,15,0.18)',
        display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', padding: '8px',
      }}>
        {items.map((item, i) => (
          <div key={i} style={{
            display: 'flex', alignItems: 'center', gap: '14px',
            padding: '22px', borderRight: i < 3 ? '1px solid var(--line)' : 'none',
          }}>
            <div style={{
              width: '44px', height: '44px', borderRadius: '12px',
              background: '#e9f7ec', display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '22px', flexShrink: 0,
            }}>{item.icon}</div>
            <div>
              <div style={{ fontWeight: 700, fontSize: '14px', color: 'var(--ink)', marginBottom: '2px' }}>{item.l1}</div>
              <div style={{ fontSize: '12.5px', color: '#6b7d6b' }}>{item.l2}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
