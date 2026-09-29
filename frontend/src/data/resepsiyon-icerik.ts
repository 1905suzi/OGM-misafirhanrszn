import type { Oda, Rezervasyon, Kullanici, Talep } from "@/lib/types";

// ─── ODA TİPLERİ ──────────────────────────────────────────────────────────
type OdaTipi = {
  tip: string;
  kapasite: number;
};

const ODA_TIPLERI: OdaTipi[] = [
  { tip: "Tek Kişilik",   kapasite: 1 },
  { tip: "Çift Kişilik",  kapasite: 2 },
  { tip: "Üç Kişilik",    kapasite: 3 },
  { tip: "Aile Odası",    kapasite: 4 },
];

// Sabit dağılım (seed değeri gibi çalışır — her seferinde aynı sonuç)
function odaTipiSec(odaNo: number): OdaTipi {
  // Belirli bir örüntüyle dağıt
  const pattern = [1, 0, 1, 2, 3, 1, 0, 2, 1, 3]; // 10'luk döngü
  return ODA_TIPLERI[pattern[odaNo % 10]];
}

function rastgeleDurum(odaNo: number): Oda["otomatikDurum"] {
  const durumlar: Oda["otomatikDurum"][] = [
    "Boş", "Boş", "Boş", "Dolu", "Rezerve",
    "Boş", "Temizlikte", "Boş", "Boş", "Bakımda",
  ];
  return durumlar[odaNo % 10];
}

// ─── 100 ODA ──────────────────────────────────────────────────────────────
// Çam Katı:  1 – 34  (34 oda)
// Meşe Katı: 35 – 67 (33 oda)
// Kayin Katı:68 – 100 (33 oda)

export const odalar: Oda[] = [];

// ─── REZERVASYONLAR ───────────────────────────────────────────────────────
export const rezervasyonlar: Rezervasyon[] = [];

// ─── KULLANICILAR ─────────────────────────────────────────────────────────
export const kullanicilar: Kullanici[] = [];

// ─── BEKLEYEN TALEPLER ────────────────────────────────────────────────────
export const talepler: Talep[] = [];
