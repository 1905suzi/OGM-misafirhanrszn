import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { ROLLER, type Rol } from "@/auth/roller";

const SPRING_API_URL =
  process.env.SPRING_API_URL ?? "http://localhost:8080";

type ApiZarf<T> = {
  success: boolean;
  message: string;
  data: T | null;
  errorCode: string | null;
};

type LoginVerisi = {
  token: string;
  role: Rol;
  email: string;
  fullName: string;
};

const GECERLI_ROLLER: string[] = Object.values(ROLLER);

export const { handlers, signIn, signOut, auth } = NextAuth({
  secret: process.env.AUTH_SECRET ?? process.env.NEXTAUTH_SECRET ?? "ogm-misafirhane-secret-key-2026-very-secure",
  trustHost: true,
  providers: [
    CredentialsProvider({
      name: "OGM",
      credentials: {
        email: { label: "E-posta", type: "email" },
        password: { label: "Şifre", type: "password" },
      },
      async authorize(credentials) {
        const email =
          typeof credentials?.email === "string"
            ? credentials.email.trim()
            : "";
        const password =
          typeof credentials?.password === "string"
            ? credentials.password
            : "";
        if (!email || !password) return null;

        let yanit: Response;
        try {
          yanit = await fetch(`${SPRING_API_URL}/api/auth/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password }),
            cache: "no-store",
          });
        } catch (hata) {
          console.error("[auth] Spring API'ye ulaşılamadı:", hata);
          return null;
        }

        const zarf = (await yanit
          .json()
          .catch(() => null)) as ApiZarf<LoginVerisi> | null;
        if (!yanit.ok || !zarf?.success || !zarf.data) return null;
        if (!GECERLI_ROLLER.includes(zarf.data.role)) return null;

        return {
          id: zarf.data.email,
          email: zarf.data.email,
          name: zarf.data.fullName,
          rol: zarf.data.role,
          accessToken: zarf.data.token,
        };
      },
    }),
  ],
  pages: { signIn: "/giris" },
  session: { strategy: "jwt" },
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        token.rol = (user as { rol: Rol }).rol;
        token.accessToken = (user as { accessToken: string }).accessToken;
      }
      return token;
    },
    session({ session, token }) {
      (session.user as { rol: Rol }).rol = token.rol as Rol;
      (session as { accessToken: string }).accessToken =
        token.accessToken as string;
      return session;
    },
  },
});
