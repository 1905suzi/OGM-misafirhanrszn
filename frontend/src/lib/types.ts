// ─── Oda ──────────────────────────────────────────────────────────────────
export type OdaDurumu = "Boş" | "Dolu" | "Rezerve" | "Temizlikte" | "Bakımda";

export type OdaKati = "Çam Katı" | "Meşe Katı" | "Kayin Katı";

export type Oda = {
  no: number;
  kat: OdaKati;
  tip: string;
  kapasite: number;
  otomatikDurum: OdaDurumu;   // rezervasyon motorundan
  manuelDurum: OdaDurumu | null; // personel tarafından elle set edildi
};

// ─── Rezervasyon ──────────────────────────────────────────────────────────
export type RezervasyonDurum =
  | "Beklemede"
  | "Onaylı"
  | "Check-in"
  | "Check-out"
  | "İptal";

export type Rezervasyon = {
  id: number;
  rezNo: string;
  misafirAdi: string;
  odaNo: number;
  giris: string;   // "YYYY-MM-DD"
  cikis: string;   // "YYYY-MM-DD"
  gece: number;
  durum: RezervasyonDurum;
};

// ─── Kullanıcı ────────────────────────────────────────────────────────────
export type KullaniciRol = "Misafir" | "Personel" | "Yönetici";

export type Kullanici = {
  id: string;
  tcSicilNo: string;
  adSoyad: string;
  eposta: string;
  rol: KullaniciRol;
  aktif: boolean;
};

// ─── Bekleyen Talepler ────────────────────────────────────────────────────
export type TalepTip = "İptal Talebi" | "Oda Onayı";
export type TalepDurum = "Bekliyor" | "Onaylandı" | "Reddedildi";

export type Talep = {
  id: string;
  tip: TalepTip;
  rezNo: string;
  misafirAdi: string;
  odaNo: number;
  tarih: string;
  durum: TalepDurum;
  notlar?: string;
};
