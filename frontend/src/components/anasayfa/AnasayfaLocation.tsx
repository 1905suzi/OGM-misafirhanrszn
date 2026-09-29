export default function AnasayfaLocation() {
  return (
    <section id="konum" style={{ padding: '110px 0' }}>
      <div style={{ maxWidth: '1240px', margin: '0 auto', padding: '0 40px', position: 'relative', zIndex: 1 }}>
        <div style={{ textAlign: 'center', maxWidth: '620px', margin: '0 auto 54px' }}>
          <div style={{ textTransform: 'uppercase', fontSize: '12px', fontWeight: 700, letterSpacing: '.14em', color: 'var(--mid)' }}>Konum</div>
          <h2 style={{ fontSize: '34px', fontWeight: 900, letterSpacing: '-0.02em', marginTop: '10px' }}>Bizi Bulun</h2>
          <p style={{ color: '#5b6c5c', fontSize: '15px', marginTop: '12px', lineHeight: 1.7 }}>Çankaya / Ankara'daki misafirhanemize kolayca ulaşabilirsiniz.</p>
        </div>
        <div style={{ maxWidth: '980px', margin: '0 auto', borderRadius: '24px', overflow: 'hidden', boxShadow: '0 30px 70px rgba(15,42,15,0.16)', border: '1px solid var(--line)' }}>
          <div style={{ height: '420px', width: '100%', background: 'linear-gradient(135deg, #eef5ee 0%, #dcecdd 55%, #cfe8d1 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px', color: 'var(--mid)', position: 'relative', zIndex: 2 }}>
              <div style={{ fontSize: '46px' }}>📍</div>
              <div style={{ background: '#fff', borderRadius: '12px', padding: '14px 18px', boxShadow: '0 10px 30px rgba(15,42,15,0.15)', textAlign: 'left' }}>
                <strong style={{ fontSize: '13.5px', display: 'block', marginBottom: '3px' }}>OGM Misafirhane</strong>
                <span style={{ fontSize: '12px', color: '#6b7d6b' }}>Çankaya / Ankara, Türkiye</span>
              </div>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '20px 28px', background: '#fff', flexWrap: 'wrap', gap: '14px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <span style={{ fontSize: '20px' }}>📍</span>
              <div>
                <strong style={{ display: 'block', fontSize: '14px' }}>OGM Misafirhane, Aksu</strong>
                <span style={{ fontSize: '12.5px', color: '#6b7d6b' }}>Ankara, Türkiye</span>
              </div>
            </div>
            <a href="https://maps.google.com" target="_blank" rel="noopener noreferrer" style={{
              display: 'inline-flex', alignItems: 'center', gap: '8px',
              background: 'var(--dark)', color: '#fff', fontWeight: 700, fontSize: '13px',
              padding: '11px 20px', borderRadius: '999px',
            }}>🗺️ Haritada Göster</a>
          </div>
        </div>
      </div>
    </section>
  );
}
