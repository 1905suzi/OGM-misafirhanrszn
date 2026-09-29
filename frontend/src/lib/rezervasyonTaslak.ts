/**
 * Rezervasyon sihirbazı taslağını sessionStorage'da saklar.
 * sessionStorage seçildi (localStorage değil): sekme kapanınca
 * yarım kalmış rezervasyon başka bir oturuma sızmasın.
 */

const TASLAK_KEY = "ogm-rez-taslak";

export type RezervasyonTaslak = {
  giris: string;      // YYYY-MM-DD
  cikis: string;      // YYYY-MM-DD
  yetiskin: number;
  cocuk: number;
  odaNo: number | null;
  odaTip: string;
  odaKat: string;
  notlar?: string;
};

const BOS_TASLAK: RezervasyonTaslak = {
  giris: "",
  cikis: "",
  yetiskin: 1,
  cocuk: 0,
  odaNo: null,
  odaTip: "",
  odaKat: "",
};

export function taslakYaz(veri: Partial<RezervasyonTaslak>): void {
  if (typeof window === "undefined") return;
  const mevcut = taslakOku() ?? BOS_TASLAK;
  sessionStorage.setItem(
    TASLAK_KEY,
    JSON.stringify({ ...mevcut, ...veri })
  );
}

export function taslakOku(): RezervasyonTaslak | null {
  if (typeof window === "undefined") return null;
  try {
    const ham = sessionStorage.getItem(TASLAK_KEY);
    if (!ham) return null;
    return JSON.parse(ham) as RezervasyonTaslak;
  } catch {
    return null;
  }
}

export function taslakTemizle(): void {
  if (typeof window === "undefined") return;
  sessionStorage.removeItem(TASLAK_KEY);
}
