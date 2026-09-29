import type { DefaultSession } from "next-auth";
import type { Rol } from "@/auth/roller";

declare module "next-auth" {
  interface Session {
    accessToken: string;
    user: { rol: Rol } & DefaultSession["user"];
  }
  interface User {
    rol: Rol;
    accessToken: string;
  }
}

// next-auth/jwt yalnızca @auth/core/jwt'yi yeniden dışa aktarır;
// JWT arayüzünü genişletmek için asıl modülü hedeflemek gerekiyor.
declare module "@auth/core/jwt" {
  interface JWT {
    rol: Rol;
    accessToken: string;
  }
}
