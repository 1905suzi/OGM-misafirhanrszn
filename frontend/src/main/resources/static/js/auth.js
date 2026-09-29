'use strict';

/* =====================================================
   OGM MİSAFİRHANE — AUTH.JS
   Sadece UI yardımcı fonksiyonları — Validasyon YOK
   Tüm doğrulama işlemleri backend tarafından yapılır.
   ===================================================== */

// ----------------------------------------------------------------
// ŞİFRE GÖSTER / GİZLE
// ----------------------------------------------------------------
function togglePassword(inputId, btn) {
  const input = document.getElementById(inputId);
  if (!input) return;
  const isHidden = input.type === 'password';
  input.type = isHidden ? 'text' : 'password';
  const icon = btn.querySelector('i');
  if (icon) icon.className = isHidden ? 'bi bi-eye-slash' : 'bi bi-eye';
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
  Object.assign(toast.style, {
    position: 'fixed', bottom: '1.5rem', right: '1.5rem', zIndex: '9999',
    background: p.bg, color: '#fff',
    padding: '.85rem 1.25rem',
    borderRadius: '10px',
    display: 'flex', alignItems: 'center', gap: '10px',
    fontSize: '.87rem', fontWeight: '500',
    boxShadow: '0 10px 25px rgba(0,0,0,.25)',
    maxWidth: '340px',
    fontFamily: 'Inter, system-ui, sans-serif',
  });

  toast.innerHTML = `<i class="bi ${p.icon}" style="font-size:1rem;flex-shrink:0;"></i><span>${message}</span>`;
  document.body.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transition = 'opacity .35s ease';
    setTimeout(() => toast.remove(), 350);
  }, 3500);
}

// ----------------------------------------------------------------
// INIT — URL Parametre Bildirimleri
// ----------------------------------------------------------------
document.addEventListener('DOMContentLoaded', () => {
  const params = new URLSearchParams(window.location.search);

  if (params.get('registered') === 'true') {
    showToast('Kayıt başarıyla oluşturuldu. Giriş yapabilirsiniz.', 'success');
  }
  if (params.get('logout') === 'true') {
    showToast('Güvenli şekilde çıkış yaptınız.', 'info');
  }
  if (params.get('hata') === 'true') {
    showToast('Giriş bilgileri hatalı. Lütfen tekrar deneyiniz.', 'error');
  }
});
