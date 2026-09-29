import type {
  ApiOda,
  ApiOdaDurumu,
  ApiKat,
  ApiRezervasyonDurumu,
  ApiRezervasyon,
} from "./api";
import type { Oda, OdaDurumu, OdaKati, Rezervasyon, RezervasyonDurum } from "./types";

// ─── Oda durum etiketleri ─────────────────────────────────────────────────

export const ODA_DURUM_ETIKET: Record<ApiOdaDurumu, OdaDurumu> = {
  BOS: "Boş",
  DOLU: "Dolu",
  REZERVE: "Rezerve",
  TEMIZLIKTE: "Temizlikte",
  BAKIMDA: "Bakımda",
};

export const KAT_ETIKET: Record<ApiKat, OdaKati> = {
  CAM_KATI: "Çam Katı",
  MESE_KATI: "Meşe Katı",
  KAYIN_KATI: "Kayin Katı",
};

export const REZ_DURUM_ETIKET: Record<ApiRezervasyonDurumu, RezervasyonDurum> =
  {
    BEKLEMEDE: "Beklemede",
    ONAYLI: "Onaylı",
    CHECK_IN: "Check-in",
    CHECK_OUT: "Check-out",
    IPTAL: "İptal",
  };

// ─── Ters eşleşme ─────────────────────────────────────────────────────────

function tersle<A extends string, B extends string>(
  kaynak: Record<A, B>
): Record<B, A> {
  const sonuc = {} as Record<B, A>;
  (Object.keys(kaynak) as A[]).forEach((k) => {
    sonuc[kaynak[k]] = k;
  });
  return sonuc;
}

export const ODA_DURUM_KODU = tersle(ODA_DURUM_ETIKET);
export const REZ_DURUM_KODU = tersle(REZ_DURUM_ETIKET);

// ─── Dönüştürücüler ───────────────────────────────────────────────────────

export function odayaCevir(api: ApiOda): Oda {
  return {
    no: api.no,
    kat: KAT_ETIKET[api.kat],
    tip: api.tip,
    kapasite: api.kapasite,
    otomatikDurum: ODA_DURUM_ETIKET[api.otomatikDurum],
    manuelDurum: api.manuelDurum
      ? ODA_DURUM_ETIKET[api.manuelDurum]
      : null,
  };
}

export function rezervasyonaCevir(api: ApiRezervasyon): Rezervasyon {
  return {
    id: api.id,
    rezNo: api.rezNo,
    misafirAdi: api.misafirAdi,
    odaNo: api.odaNo,
    giris: api.giris,
    cikis: api.cikis,
    gece: api.gece,
    durum: REZ_DURUM_ETIKET[api.durum],
  };
}
