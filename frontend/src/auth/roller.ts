// Backend Role enum değerleriyle birebir eşleşiyor: GUEST, STAFF, ADMIN
export const ROLLER = {
  GUEST: "GUEST",
  STAFF: "STAFF",
  ADMIN: "ADMIN",
} as const;

export type Rol = (typeof ROLLER)[keyof typeof ROLLER];

export const YONETIM_ROLLERI: readonly Rol[] = [ROLLER.STAFF, ROLLER.ADMIN];

export const GIRIS_SAYFALARI: string[] = [
  "/giris",
  "/uye-ol",
  "/personel-girisi",
  "/personel-yakini-dogrulama",
  "/admin/login",
  "/resepsiyon/login",
];

export const KORUMALI_ROTALAR: {
  onEk: string;
  roller: readonly Rol[];
  girisSayfasi: string;
}[] = [
  { onEk: "/misafir", roller: [ROLLER.GUEST], girisSayfasi: "/giris" },
  {
    onEk: "/dashboard",
    roller: YONETIM_ROLLERI,
    girisSayfasi: "/resepsiyon/login",
  },
  {
    onEk: "/rezervasyon-yonetimi",
    roller: YONETIM_ROLLERI,
    girisSayfasi: "/resepsiyon/login",
  },
  {
    onEk: "/oda-yonetimi",
    roller: YONETIM_ROLLERI,
    girisSayfasi: "/resepsiyon/login",
  },
  {
    onEk: "/bekleyen-talepler",
    roller: YONETIM_ROLLERI,
    girisSayfasi: "/resepsiyon/login",
  },
  {
    onEk: "/kullanici-yonetimi",
    roller: YONETIM_ROLLERI,
    girisSayfasi: "/resepsiyon/login",
  },
  {
    onEk: "/duyuru-yonetimi",
    roller: YONETIM_ROLLERI,
    girisSayfasi: "/resepsiyon/login",
  },
  {
    onEk: "/admin-paneli",
    roller: [ROLLER.ADMIN],
    girisSayfasi: "/admin/login",
  },
] as const;

export function rotaKuraliBul(yol: string) {
  return (
    KORUMALI_ROTALAR.find(
      (k) => yol === k.onEk || yol.startsWith(`${k.onEk}/`)
    ) ?? null
  );
}

export function rolVarsayilanRotasi(rol: Rol): string {
  if (rol === ROLLER.GUEST) return "/misafir/dashboard";
  if (rol === ROLLER.ADMIN) return "/admin-paneli";
  return "/rezervasyon-yonetimi";
}

export function yonetimRolu(rol: Rol | undefined | null): boolean {
  if (!rol) return false;
  return (YONETIM_ROLLERI as readonly string[]).includes(rol);
}
