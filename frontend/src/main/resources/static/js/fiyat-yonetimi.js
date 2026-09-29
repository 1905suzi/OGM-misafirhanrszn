'use strict';

/* =====================================================
   OGM MİSAFİRHANE — FİYAT-YÖNETİMİ.JS
   Fiyat Bilgisi CRUD İşlemleri (Frontend Simülasyonu)
   ===================================================== */

// ----------------------------------------------------------------
// VERİ KATMANI — Örnek Fiyat Verileri
// ----------------------------------------------------------------

let fiyatlar = [
  {
    id: 1, odaTipi: 'Tek Kişilik', misafirTipi: 'OGM Personeli',
    basTarih: '01.01.2025', bitisTarih: '31.12.2025',
    gunlukFiyat: 750, durum: 'Aktif'
  },
  {
    id: 2, odaTipi: 'Çift Kişilik', misafirTipi: 'Kamu Personeli',
    basTarih: '01.01.2025', bitisTarih: '31.12.2025',
    gunlukFiyat: 1200, durum: 'Aktif'
  },
  {
    id: 3, odaTipi: 'Suit', misafirTipi: 'Sivil Misafir',
    basTarih: '01.01.2025', bitisTarih: '30.06.2025',
    gunlukFiyat: 2500, durum: 'Pasif'
  },
  {
    id: 4, odaTipi: 'Aile', misafirTipi: 'OGM Personeli',
    basTarih: '01.07.2025', bitisTarih: '31.12.2025',
    gunlukFiyat: 1800, durum: 'Aktif'
  },
  {
    id: 5, odaTipi: 'Tek Kişilik', misafirTipi: 'Kamu Personeli',
    basTarih: '01.01.2025', bitisTarih: '31.12.2025',
    gunlukFiyat: 900, durum: 'Aktif'
  },
  {
    id: 6, odaTipi: 'Çift Kişilik', misafirTipi: 'Sivil Misafir',
    basTarih: '01.01.2025', bitisTarih: '31.12.2025',
    gunlukFiyat: 1600, durum: 'Pasif'
  },
  {
    id: 7, odaTipi: 'Aile', misafirTipi: 'Kamu Personeli',
    basTarih: '01.01.2025', bitisTarih: '31.12.2025',
    gunlukFiyat: 2200, durum: 'Aktif'
  },
];

let editingId    = null;
let deleteId     = null;
let filteredData = [...fiyatlar];

// ----------------------------------------------------------------
// RENDER — Tablo Oluştur
// ----------------------------------------------------------------

function renderTable(data) {
  const tbody = document.getElementById('fiyatTbody');
  if (!tbody) return;

  updateCounter(data.length);

  if (!data.length) {
    tbody.innerHTML = `
      <tr>
        <td colspan="8" class="table-empty">
          <i class="bi bi-inbox"></i>
          Filtre kriterlerine uygun kayıt bulunamadı.
        </td>
      </tr>`;
    return;
  }

  tbody.innerHTML = data.map((f, idx) => `
    <tr data-id="${f.id}">
      <td style="color:var(--gray-400);font-size:.78rem;">${idx + 1}</td>
      <td>
        <div style="font-weight:700;color:var(--gray-900);">${odaTipiLabel(f.odaTipi)}</div>
      </td>
      <td>
        <span class="badge ${misafirBadgeClass(f.misafirTipi)}">${f.misafirTipi}</span>
      </td>
      <td style="font-size:.83rem;">${f.basTarih}</td>
      <td style="font-size:.83rem;">${f.bitisTarih}</td>
      <td>
        <strong style="font-size:.93rem;color:var(--gray-900);">
          ₺${f.gunlukFiyat.toLocaleString('tr-TR')}
        </strong>
        <span style="font-size:.72rem;color:var(--gray-400);"> / gece</span>
      </td>
      <td>
        <span class="badge ${f.durum === 'Aktif' ? 'badge-aktif' : 'badge-pasif'}">
          ${f.durum === 'Aktif' ? '● Aktif' : '○ Pasif'}
        </span>
      </td>
      <td>
        <div class="action-btns">
          <button class="btn-ogm btn-ogm-secondary btn-sm"
                  onclick="openEdit(${f.id})" title="Düzenle"
                  aria-label="Fiyat Düzenle">
            <i class="bi bi-pencil-square"></i>
          </button>
          <button class="btn-ogm btn-ogm-danger btn-sm"
                  onclick="openDeleteModal(${f.id})" title="Sil"
                  aria-label="Fiyat Sil">
            <i class="bi bi-trash3"></i>
          </button>
        </div>
      </td>
    </tr>
  `).join('');
}

// ----------------------------------------------------------------
// YARDIMCI FONKSİYONLAR
// ----------------------------------------------------------------

function updateCounter(count) {
  const el = document.getElementById('fiyatCount');
  if (el) el.textContent = count;
}

function odaTipiLabel(tip) {
  const icons = {
    'Tek Kişilik': '🛏 Tek Kişilik',
    'Çift Kişilik': '🛏🛏 Çift Kişilik',
    'Suit': '⭐ Suit',
    'Aile': '👨‍👩‍👧 Aile',
  };
  return icons[tip] || tip;
}

function misafirBadgeClass(tip) {
  if (tip === 'OGM Personeli')  return 'badge-ogm';
  if (tip === 'Kamu Personeli') return 'badge-kamu';
  return 'badge-sivil';
}

// ----------------------------------------------------------------
// FİLTRELEME
// ----------------------------------------------------------------

function applyFilter() {
  const odaTipi     = getVal('filterOdaTipi');
  const misafirTipi = getVal('filterMisafirTipi');
  const durum       = getVal('filterDurum');
  const aranan      = getVal('aramaInput').toLowerCase().trim();

  filteredData = fiyatlar.filter(f => {
    const matchOda      = !odaTipi     || f.odaTipi     === odaTipi;
    const matchMisafir  = !misafirTipi || f.misafirTipi === misafirTipi;
    const matchDurum    = !durum       || f.durum       === durum;
    const matchAranan   = !aranan      ||
      f.odaTipi.toLowerCase().includes(aranan)     ||
      f.misafirTipi.toLowerCase().includes(aranan) ||
      String(f.gunlukFiyat).includes(aranan)       ||
      f.basTarih.includes(aranan);

    return matchOda && matchMisafir && matchDurum && matchAranan;
  });

  renderTable(filteredData);
}

function resetFilter() {
  ['filterOdaTipi', 'filterMisafirTipi', 'filterDurum', 'aramaInput'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.value = '';
  });
  filteredData = [...fiyatlar];
  renderTable(filteredData);
}

// ----------------------------------------------------------------
// MODAL — Yeni Fiyat Ekle
// ----------------------------------------------------------------

function openAdd() {
  editingId = null;
  clearForm();
  setModalTitle('Yeni Fiyat Ekle', 'bi-plus-circle');
  document.getElementById('saveBtnLabel').textContent = 'Kaydet';
  openModal('fiyatModal');
  document.getElementById('frmOdaTipi')?.focus();
}

// ----------------------------------------------------------------
// MODAL — Fiyat Düzenle
// ----------------------------------------------------------------

function openEdit(id) {
  const f = fiyatlar.find(x => x.id === id);
  if (!f) return;

  editingId = id;
  setModalTitle('Fiyat Düzenle', 'bi-pencil-square');
  document.getElementById('saveBtnLabel').textContent = 'Güncelle';

  setVal2('frmOdaTipi',     f.odaTipi);
  setVal2('frmMisafirTipi', f.misafirTipi);
  setVal2('frmBasTarih',    toIso(f.basTarih));
  setVal2('frmBitisTarih',  toIso(f.bitisTarih));
  setVal2('frmFiyat',       f.gunlukFiyat);
  setVal2('frmDurum',       f.durum);

  openModal('fiyatModal');
}

// ----------------------------------------------------------------
// KAYDET / GÜNCELLE
// ----------------------------------------------------------------

function saveFiyat() {
  // Form alanlarını al
  const odaTipi     = getVal('frmOdaTipi').trim();
  const misafirTipi = getVal('frmMisafirTipi').trim();
  const basTarih    = getVal('frmBasTarih').trim();
  const bitisTarih  = getVal('frmBitisTarih').trim();
  const fiyatStr    = getVal('frmFiyat').trim();
  const durum       = getVal('frmDurum').trim();

  // Validasyon
  let valid = true;
  const required = {
    frmOdaTipi:     'Oda tipi seçiniz.',
    frmMisafirTipi: 'Misafir tipi seçiniz.',
    frmBasTarih:    'Başlangıç tarihi giriniz.',
    frmBitisTarih:  'Bitiş tarihi giriniz.',
    frmFiyat:       'Günlük fiyat giriniz.',
  };

  Object.entries(required).forEach(([id, msg]) => {
    const el = document.getElementById(id);
    if (!el) return;
    if (!el.value.trim()) {
      el.classList.add('is-invalid');
      valid = false;
    } else {
      el.classList.remove('is-invalid');
    }
  });

  if (!valid) {
    showToast('Lütfen tüm zorunlu alanları doldurunuz.', 'warn');
    return;
  }

  const fiyatNum = parseFloat(fiyatStr);
  if (isNaN(fiyatNum) || fiyatNum <= 0) {
    showToast('Günlük fiyat 0\'dan büyük bir sayı olmalıdır.', 'error');
    document.getElementById('frmFiyat')?.classList.add('is-invalid');
    return;
  }

  if (basTarih > bitisTarih) {
    showToast('Başlangıç tarihi bitiş tarihinden sonra olamaz.', 'error');
    return;
  }

  const record = {
    id:           editingId ?? (Math.max(0, ...fiyatlar.map(f => f.id)) + 1),
    odaTipi,
    misafirTipi,
    basTarih:     toDisplay(basTarih),
    bitisTarih:   toDisplay(bitisTarih),
    gunlukFiyat:  fiyatNum,
    durum,
  };

  if (editingId !== null) {
    const idx = fiyatlar.findIndex(f => f.id === editingId);
    if (idx !== -1) fiyatlar[idx] = record;
    showToast(`"${record.odaTipi} – ${record.misafirTipi}" fiyat bilgisi güncellendi.`, 'success');
  } else {
    fiyatlar.push(record);
    showToast('Yeni fiyat kaydı başarıyla oluşturuldu.', 'success');
  }

  closeModal('fiyatModal');
  filteredData = [...fiyatlar];
  applyFilter();
}

// ----------------------------------------------------------------
// SİLME MODALİ & ONAY
// ----------------------------------------------------------------

function openDeleteModal(id) {
  const f = fiyatlar.find(x => x.id === id);
  if (!f) return;

  deleteId = id;

  const infoEl = document.getElementById('deleteInfo');
  if (infoEl) {
    infoEl.innerHTML = `
      <strong>${f.odaTipi}</strong> oda tipi,
      <strong>${f.misafirTipi}</strong> misafir tipi fiyat kaydı
      kalıcı olarak silinecektir. Bu işlem geri alınamaz.
    `;
  }

  openModal('deleteModal');
}

function confirmDelete() {
  if (deleteId === null) return;

  const f = fiyatlar.find(x => x.id === deleteId);
  fiyatlar    = fiyatlar.filter(x => x.id !== deleteId);
  filteredData = filteredData.filter(x => x.id !== deleteId);
  deleteId    = null;

  closeModal('deleteModal');
  renderTable(filteredData);

  if (f) showToast(`"${f.odaTipi} – ${f.misafirTipi}" kaydı silindi.`, 'success');
}

// ----------------------------------------------------------------
// MODAL YARDIMCILARI
// ----------------------------------------------------------------

function openModal(id)  { document.getElementById(id)?.classList.add('open'); }
function closeModal(id) { document.getElementById(id)?.classList.remove('open'); }

function setModalTitle(title, iconClass) {
  const el = document.getElementById('modalTitle');
  if (el) el.innerHTML = `<i class="bi ${iconClass}"></i> ${title}`;
}

function clearForm() {
  ['frmOdaTipi','frmMisafirTipi','frmBasTarih','frmBitisTarih','frmFiyat'].forEach(id => {
    const el = document.getElementById(id);
    if (el) { el.value = ''; el.classList.remove('is-invalid'); }
  });
  // Durum varsayılan
  const durumEl = document.getElementById('frmDurum');
  if (durumEl) { durumEl.value = 'Aktif'; durumEl.classList.remove('is-invalid'); }
}

// Modal dışına tıklayınca kapat
document.addEventListener('click', e => {
  if (e.target.classList.contains('modal-overlay')) {
    document.querySelectorAll('.modal-overlay.open').forEach(m => m.classList.remove('open'));
  }
});

// ----------------------------------------------------------------
// HELPERS
// ----------------------------------------------------------------

function getVal(id)       { return document.getElementById(id)?.value ?? ''; }
function setVal2(id, val) { const el = document.getElementById(id); if (el) el.value = val ?? ''; }

/** "01.01.2025" → "2025-01-01" (ISO) */
function toIso(tr) {
  if (!tr || !tr.includes('.')) return tr || '';
  const [d, m, y] = tr.split('.');
  return `${y}-${m.padStart(2,'0')}-${d.padStart(2,'0')}`;
}

/** "2025-01-01" → "01.01.2025" (Türkçe gösterim) */
function toDisplay(iso) {
  if (!iso || !iso.includes('-')) return iso || '';
  const [y, m, d] = iso.split('-');
  return `${d}.${m}.${y}`;
}

// ----------------------------------------------------------------
// TOAST BİLDİRİMİ
// ----------------------------------------------------------------

function showToast(message, type = 'success') {
  document.getElementById('ogm-toast')?.remove();

  const palette = {
    success: { bg: '#276e31', icon: 'bi-check-circle-fill' },
    error:   { bg: '#c62828', icon: 'bi-x-circle-fill' },
    info:    { bg: '#1565c0', icon: 'bi-info-circle-fill' },
    warn:    { bg: '#b45309', icon: 'bi-exclamation-triangle-fill' },
  };

  const p = palette[type] || palette.info;
  const toast = document.createElement('div');
  toast.id = 'ogm-toast';
  toast.className = 'ogm-toast';
  toast.style.background = p.bg;
  toast.innerHTML = `<i class="bi ${p.icon}" style="font-size:1rem;flex-shrink:0;"></i><span>${message}</span>`;
  document.body.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transition = 'opacity .35s';
    setTimeout(() => toast.remove(), 350);
  }, 3500);
}

// ----------------------------------------------------------------
// DOMContentLoaded — Başlatıcı
// ----------------------------------------------------------------

document.addEventListener('DOMContentLoaded', () => {
  // İlk tablo render
  renderTable(filteredData);

  // Filtre olayları
  ['filterOdaTipi', 'filterMisafirTipi', 'filterDurum'].forEach(id => {
    document.getElementById(id)?.addEventListener('change', applyFilter);
  });

  document.getElementById('aramaInput')?.addEventListener('input', applyFilter);

  // URL parametre bildirimleri
  const params = new URLSearchParams(window.location.search);
  if (params.get('kayit') === 'basarili') showToast('Fiyat kaydedildi.', 'success');
  if (params.get('silindi') === 'true')   showToast('Fiyat silindi.', 'success');
});
