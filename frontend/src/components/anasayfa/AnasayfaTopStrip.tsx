export default function AnasayfaTopStrip() {
  return (
    <div style={{
      background: 'var(--dark)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '6px 40px',
      fontSize: '12.5px',
      color: 'var(--nav-text)',
      borderBottom: '1px solid rgba(74,222,128,0.15)',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '18px' }}>
        <span>Her gün 08:00–22:00 açığız</span>
        <div style={{ width: '1px', height: '12px', background: 'rgba(187,247,208,0.25)' }} />
        <span>Çankaya / Ankara</span>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        <span>0312 123 45 67</span>
        <div style={{ width: '1px', height: '12px', background: 'rgba(187,247,208,0.25)' }} />
        <span>misafirhane@ogm.gov.tr</span>
      </div>
    </div>
  );
}
