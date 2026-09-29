const API_TABAN =
  process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8080";

// ─── Temel tipler ─────────────────────────────────────────────────────────

type ApiZarf<T> = {
  success: boolean;
  message: string;
  data: T | null;
  errorCode: string | null;
  timestamp: string;
};

export class ApiHatasi extends Error {
  readonly kod: string | null;
  readonly durum: number;
  constructor(mesaj: string, kod: string | null, durum: number) {
    super(mesaj);
    this.name = "ApiHatasi";
    this.kod = kod;
    this.durum = durum;
  }
}

type IstekSecenekleri = {
  method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  body?: unknown;
  token?: string | null;
};

async function istek<T>(
  yol: string,
  secenekler: IstekSecenekleri = {}
): Promise<T> {
  const { method = "GET", body, token } = secenekler;
  const basliklar: Record<string, string> = {};
  if (body !== undefined) basliklar["Content-Type"] = "application/json";
  if (token) basliklar["Authorization"] = `Bearer ${token}`;

  let yanit: Response;
  try {
    yanit = await fetch(`${API_TABAN}${yol}`, {
      method,
      headers: basliklar,
      body: body === undefined ? undefined : JSON.stringify(body),
      cache: "no-store",
    });
  } catch {
    throw new ApiHatasi(
      "Sunucuya ulaşılamadı. Backend çalışıyor mu?",
      "NETWORK_ERROR",
      0
    );
  }

  // Spring Security 401/403'ü gövdesiz döndürebilir; zarfı açmadan yakala.
  if (yanit.status === 401 || yanit.status === 403) {
    throw new ApiHatasi(
      "Bu işlem için yetkiniz yok veya oturumunuz sona ermiş.",
      "UNAUTHORIZED",
      yanit.status
    );
  }

  const zarf = (await yanit
    .json()
    .catch(() => null)) as ApiZarf<T> | null;
  if (!zarf)
    throw new ApiHatasi(
      "Sunucudan beklenmeyen bir yanıt geldi.",
      "INVALID_RESPONSE",
      yanit.status
    );
  if (!zarf.success)
    throw new ApiHatasi(
      zarf.message || "İşlem başarısız oldu.",
      zarf.errorCode,
      yanit.status
    );
  return zarf.data as T;
}

// ─── API tipleri (backend DTO'larıyla eşleşen) ────────────────────────────

export type ApiOdaDurumu =
  | "BOS"
  | "DOLU"
  | "REZERVE"
  | "TEMIZLIKTE"
  | "BAKIMDA";
export type ApiKat = "CAM_KATI" | "MESE_KATI" | "KAYIN_KATI";
export type ApiRezervasyonDurumu =
  | "BEKLEMEDE"
  | "ONAYLI"
  | "CHECK_IN"
  | "CHECK_OUT"
  | "IPTAL";

export type ApiOda = {
  no: number;
  kat: ApiKat;
  tip: string;
  kapasite: number;
  otomatikDurum: ApiOdaDurumu;
  manuelDurum: ApiOdaDurumu | null;
};

export type ApiRezervasyon = {
  id: number;
  rezNo: string;
  misafirAdi: string;
  odaNo: number;
  giris: string;
  cikis: string;
  gece: number;
  durum: ApiRezervasyonDurumu;
};

export type RezervasyonVerisi = {
  odaNo: number;
  giris: string;
  cikis: string;
  yetiskinSayisi?: number;
  cocukSayisi?: number;
  notlar?: string;
};

export type KayitVerisi = {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phone: string;
  identityNumber: string;
};

// ─── Auth ─────────────────────────────────────────────────────────────────

export function kayitOlMisafir(veri: KayitVerisi) {
  return istek<{ email: string }>("/api/auth/register/guest", {
    method: "POST",
    body: veri,
  });
}

// ─── Odalar ───────────────────────────────────────────────────────────────

export function musaitOdalar(giris: string, cikis: string) {
  const sorgu = new URLSearchParams({ checkIn: giris, checkOut: cikis });
  return istek<ApiOda[]>(`/api/rooms?${sorgu.toString()}`);
}

export function adminOdalar(token: string) {
  return istek<ApiOda[]>("/api/admin/rooms", { token });
}

export function adminOdaDurumGuncelle(
  token: string,
  odaNo: number,
  manuelDurum: ApiOdaDurumu | null
) {
  return istek<ApiOda>(`/api/admin/rooms/${odaNo}/status`, {
    method: "PATCH",
    body: { manuelDurum },
    token,
  });
}

// ─── Rezervasyonlar ───────────────────────────────────────────────────────

export function rezervasyonOlustur(token: string, veri: RezervasyonVerisi) {
  return istek<ApiRezervasyon>("/api/reservations", {
    method: "POST",
    body: veri,
    token,
  });
}

export function rezervasyonlarim(token: string) {
  return istek<ApiRezervasyon[]>("/api/reservations/mine", { token });
}

export function adminRezervasyonlar(token: string) {
  return istek<ApiRezervasyon[]>("/api/admin/reservations", { token });
}

export function adminRezervasyonOlustur(
  token: string,
  veri: RezervasyonVerisi & { misafirAdi?: string; durum?: string }
) {
  return istek<ApiRezervasyon>("/api/admin/reservations", {
    method: "POST",
    body: veri,
    token,
  });
}

export function adminRezervasyonDurumGuncelle(
  token: string,
  id: number,
  durum: ApiRezervasyonDurumu
) {
  return istek<ApiRezervasyon>(
    `/api/admin/reservations/${id}/status`,
    { method: "PATCH", body: { durum }, token }
  );
}

export function adminRezervasyonSil(token: string, id: number) {
  return istek<void>(`/api/admin/reservations/${id}`, {
    method: "DELETE",
    token,
  });
}

// ─── Talepler ─────────────────────────────────────────────────────────────

export function adminTalepler(token: string) {
  return istek<any[]>("/api/admin/requests", { token });
}

export function adminTalepIslem(token: string, id: string, islem: string) {
  return istek<any>(`/api/admin/requests/${id}/${islem}`, {
    method: "PATCH",
    token,
  });
}

// ─── Kullanıcılar ─────────────────────────────────────────────────────────

export function adminKullanicilar(token: string) {
  return istek<any[]>("/api/admin/users", { token });
}

export function adminKullaniciAktivasyon(token: string, id: string) {
  return istek<any>(`/api/admin/users/${id}/toggle-active`, {
    method: "PATCH",
    token,
  });
}

export function adminKullaniciEkle(token: string, payload: any) {
  return istek<any>("/api/admin/users", {
    method: "POST",
    body: payload,
    token,
  });
}

export function adminKullaniciGuncelle(token: string, id: string, payload: any) {
  return istek<any>(`/api/admin/users/${id}`, {
    method: "PUT",
    body: payload,
    token,
  });
}

export function adminKullaniciSil(token: string, id: string) {
  return istek<void>(`/api/admin/users/${id}`, {
    method: "DELETE",
    token,
  });
}

// ─── Yardımcı Fonksiyonlar ────────────────────────────────────────────────
export function apiError(hata: unknown, varsayilan = "Bir hata oluştu"): string {
  if (hata instanceof ApiHatasi) return hata.message;
  if (hata instanceof Error) return hata.message;
  return varsayilan;
}
