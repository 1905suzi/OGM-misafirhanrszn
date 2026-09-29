import { auth } from "@/auth";
import { NextResponse } from "next/server";
import {
  GIRIS_SAYFALARI,
  rolVarsayilanRotasi,
  rotaKuraliBul,
} from "@/auth/roller";
import type { Rol } from "@/auth/roller";

export default auth((req) => {
  const { pathname } = req.nextUrl;
  const rol = (req.auth?.user as { rol?: Rol } | undefined)?.rol ?? null;

  // DEBUG: Log every middleware call
  console.log(`[middleware] path=${pathname} rol=${rol} auth=${!!req.auth}`);

  const kural = rotaKuraliBul(pathname);
  if (kural) {
    if (!rol) {
      console.log(`[middleware] REDIRECT -> ${kural.girisSayfasi} (no role)`);
      return NextResponse.redirect(new URL(kural.girisSayfasi, req.url));
    }
    if (!(kural.roller as readonly string[]).includes(rol)) {
      console.log(`[middleware] REDIRECT -> ${rolVarsayilanRotasi(rol)} (wrong role)`);
      return NextResponse.redirect(
        new URL(rolVarsayilanRotasi(rol), req.url)
      );
    }
  }

  let response = NextResponse.next();

  // Giriş yapmış kullanıcı giriş sayfasına gitmeye çalışırsa engellemiyoruz
  // İsteyen tekrar giriş yapıp oturumunu ezebilir.


  // Çıkış sonrası "Geri" butonuyla sayfanın tekrar yüklenmesini engellemek için cache'i kapat
  response.headers.set("Cache-Control", "no-store, no-cache, must-revalidate, proxy-revalidate");
  response.headers.set("Pragma", "no-cache");
  response.headers.set("Expires", "0");
  response.headers.set("Surrogate-Control", "no-store");

  return response;
});

export const config = {
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)" ],
};