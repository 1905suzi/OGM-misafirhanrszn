import type { OdaDurumu, RezervasyonDurum, KullaniciRol } from "./types";

// Tarih farkını gün cinsinden hesaplar
export function geceSayisi(giris: string, cikis: string): number {
  const g = new Date(giris).getTime();
  const c = new Date(cikis).getTime();
  return Math.max(0, Math.round((c - g) / (1000 * 60 * 60 * 24)));
}

// Tarih formatlama  "2024-07-29" → "29.07.2024"
export function tarihFormatla(tarih: string): string {
  if (!tarih) return "-";
  const [y, m, d] = tarih.split("-");
  return `${d}.${m}.${y}`;
}

// Oda durumu → Tailwind renk sınıfları
export function odaDurumRengi(durum: OdaDurumu): {
  bg: string;
  text: string;
  border: string;
} {
  switch (durum) {
    case "Boş":
      return { bg: "bg-green-100", text: "text-green-800", border: "border-green-300" };
    case "Dolu":
      return { bg: "bg-red-100", text: "text-red-800", border: "border-red-300" };
    case "Rezerve":
      return { bg: "bg-orange-100", text: "text-orange-800", border: "border-orange-300" };
    case "Temizlikte":
      return { bg: "bg-yellow-100", text: "text-yellow-800", border: "border-yellow-300" };
    case "Bakımda":
      return { bg: "bg-gray-100", text: "text-gray-600", border: "border-gray-300" };
    default:
      return { bg: "bg-gray-100", text: "text-gray-600", border: "border-gray-300" };
  }
}

// Rezervasyon durumu → badge rengi
export function rezervasyonDurumRengi(durum: RezervasyonDurum): string {
  switch (durum) {
    case "Onaylı":    return "bg-green-100 text-green-800";
    case "Check-in":  return "bg-blue-100 text-blue-800";
    case "Check-out": return "bg-purple-100 text-purple-800";
    case "İptal":     return "bg-red-100 text-red-800";
    case "Beklemede": return "bg-yellow-100 text-yellow-800";
    default:          return "bg-gray-100 text-gray-600";
  }
}

// Kullanıcı rol → badge rengi
export function rolRengi(rol: KullaniciRol): string {
  switch (rol) {
    case "Yönetici": return "bg-purple-100 text-purple-800";
    case "Personel": return "bg-blue-100 text-blue-800";
    case "Misafir":  return "bg-gray-100 text-gray-700";
    default:         return "bg-gray-100 text-gray-600";
  }
}
