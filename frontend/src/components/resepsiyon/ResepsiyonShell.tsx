"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { signOut } from "next-auth/react";

const navItems = [
  { href: "/dashboard",            label: "Ana Sayfa",             icon: "pi pi-home" },
  { href: "/oda-yonetimi",         label: "Oda Y\u00f6netimi",          icon: "pi pi-th-large" },
  { href: "/rezervasyon-yonetimi", label: "Rezervasyon Y\u00f6netimi",  icon: "pi pi-calendar" },
  { href: "/bekleyen-talepler",    label: "Bekleyen Talepler",     icon: "pi pi-bell" },
  { href: "/duyuru-yonetimi",      label: "Duyuru Y\u00f6netimi",       icon: "pi pi-megaphone" },
  { href: "/kullanici-yonetimi",   label: "Kullan\u0131c\u0131 Y\u00f6netimi",    icon: "pi pi-users" },
];

const SIDEBAR_BG    = "#0f2a0f";
const SIDEBAR_ACTIVE = "rgba(255,255,255,0.18)";
const GREEN_BORDER   = "#4ade80";

export default function ResepsiyonShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [logoHata, setLogoHata]   = useState(false);
  const [agacHata, setAgacHata]   = useState(false);
  const [silHata,  setSilHata]    = useState(false);

  // Geri butonuyla (bfcache) geldiginde sayfayi yenile ki yetki kontrolu (middleware) tekrar calissin
  useEffect(() => {
    const handlePageShow = (event: PageTransitionEvent) => {
      if (event.persisted) {
        window.location.reload();
      }
    };
    window.addEventListener("pageshow", handlePageShow);
    return () => window.removeEventListener("pageshow", handlePageShow);
  }, []);

  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>

      {/* SIDEBAR */}
      <aside style={{
        position: "fixed", left: 0, top: 0,
        width: "240px", height: "100vh",
        backgroundColor: SIDEBAR_BG,
        display: "flex", flexDirection: "column",
        zIndex: 30, overflow: "hidden",
      }}>

        {/* Agac silueti arka plan */}
        {!agacHata && (
          <div style={{ position: "absolute", inset: 0, zIndex: 0, opacity: 0.12, pointerEvents: "none" }}>
            <Image
              src="/ogm.agac.avif"
              alt=""
              fill
              style={{ objectFit: "cover", objectPosition: "bottom" }}
              onError={() => setAgacHata(true)}
            />
          </div>
        )}

        {/* Logo Alani */}
        <div style={{
          position: "relative", zIndex: 1,
          display: "flex", alignItems: "center", gap: "14px",
          padding: "18px 16px",
          borderBottom: "1px solid rgba(255,255,255,0.12)",
        }}>
          {/* Logo: dosya varsa gorsel, yoksa OGM rozeti */}
          {!logoHata ? (
            <div style={{ position: "relative", width: 52, height: 52, flexShrink: 0 }}>
              <Image
                src="/ogm.logo.png"
                alt="OGM Logo"
                fill
                style={{ objectFit: "contain" }}
                onError={() => setLogoHata(true)}
              />
            </div>
          ) : (
            /* CSS Fallback rozet */
            <div style={{
              width: 52, height: 52, flexShrink: 0,
              borderRadius: "50%",
              background: "linear-gradient(135deg, #d97706, #b45309)",
              border: "2px solid #fbbf24",
              display: "flex", flexDirection: "column",
              alignItems: "center", justifyContent: "center",
            }}>
              <span style={{ color: "#fff", fontWeight: 900, fontSize: "13px", lineHeight: 1 }}>OGM</span>
              <span style={{ color: "#fef3c7", fontSize: "8px", lineHeight: 1.2 }}>1839</span>
            </div>
          )}

          <div>
            <p style={{ color: "#fff", fontWeight: 700, fontSize: "12px", lineHeight: 1.4, letterSpacing: "0.04em" }}>
              ORMAN GENEL
            </p>
            <p style={{ color: "#fff", fontWeight: 700, fontSize: "12px", lineHeight: 1.4, letterSpacing: "0.04em" }}>
              {`M\u00dcD\u00dcRL\u00dc\u011e\u00dc`}
            </p>
            <p style={{ color: "#4ade80", fontSize: "10px", marginTop: 5, textTransform: "uppercase", letterSpacing: "0.1em" }}>
              Misafirhane Sistemi
            </p>
          </div>
        </div>

        {/* Navigasyon */}
        <nav style={{
          position: "relative", zIndex: 1,
          flex: 1, overflowY: "auto",
          padding: "18px 10px",
          display: "flex", flexDirection: "column", gap: "4px",
        }}>
          {navItems.map((item) => {
            const isActive = pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                style={{
                  display: "flex", alignItems: "center", gap: "12px",
                  padding: "11px 14px",
                  borderRadius: "10px",
                  borderLeft: isActive ? `4px solid ${GREEN_BORDER}` : "4px solid transparent",
                  backgroundColor: isActive ? SIDEBAR_ACTIVE : "transparent",
                  color: isActive ? "#ffffff" : "rgba(187,247,208,0.85)",
                  fontSize: "14px",
                  fontWeight: isActive ? 600 : 500,
                  textDecoration: "none",
                  transition: "all 0.15s",
                }}
                onMouseEnter={e => {
                  if (!isActive) (e.currentTarget as HTMLElement).style.backgroundColor = "rgba(255,255,255,0.08)";
                }}
                onMouseLeave={e => {
                  if (!isActive) (e.currentTarget as HTMLElement).style.backgroundColor = "transparent";
                }}
              >
                <i className={item.icon} style={{ fontSize: "16px", width: "20px", textAlign: "center" }} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Alt bilgi */}
        <div style={{
          position: "relative", zIndex: 1,
          padding: "12px 16px",
          borderTop: "1px solid rgba(255,255,255,0.1)",
          textAlign: "center",
        }}>
          <p style={{ color: "rgba(74,222,128,0.4)", fontSize: "10px", letterSpacing: "0.12em", textTransform: "uppercase" }}>
            {"\u00a9"} 2024 OGM Misafirhane
          </p>
        </div>
      </aside>

      {/* ANA ICERIK */}
      <div style={{ marginLeft: "240px", flex: 1, display: "flex", flexDirection: "column", minHeight: "100vh" }}>

        {/* Topbar */}
        <header style={{
          position: "sticky", top: 0, zIndex: 20,
          height: "58px",
          backgroundColor: SIDEBAR_BG,
          display: "flex", alignItems: "center", justifyContent: "space-between",
          padding: "0 28px",
          boxShadow: "0 2px 8px rgba(0,0,0,0.3)",
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <i className="pi pi-building" style={{ color: "#4ade80", fontSize: "14px" }} />
            <p style={{ color: "#86efac", fontSize: "13px", textTransform: "uppercase", letterSpacing: "0.12em", fontWeight: 600 }}>
              Resepsiyon Paneli
            </p>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "9px" }}>
              <div style={{
                width: 30, height: 30, borderRadius: "50%",
                backgroundColor: "#166534",
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>
                <i className="pi pi-user" style={{ color: "#fff", fontSize: "13px" }} />
              </div>
              <span style={{ color: "#fff", fontSize: "14px", fontWeight: 500 }}>{`Ho\u015f Geldiniz`}</span>
            </div>
            <button onClick={() => signOut({ callbackUrl: "/" })} style={{
              display: "flex", alignItems: "center", gap: "7px",
              padding: "7px 14px", borderRadius: "8px",
              border: "1px solid #166534",
              backgroundColor: "transparent",
              color: "#86efac", fontSize: "13px", cursor: "pointer",
              fontWeight: 500,
            }}>
              <i className="pi pi-sign-out" style={{ fontSize: "12px" }} />
              {`\u00c7\u0131k\u0131\u015f Yap`}
            </button>
          </div>
        </header>

        {/* Sayfa Icerigi */}
        <main style={{
          position: "relative", flex: 1,
          backgroundColor: "#f8faf8", padding: "28px",
          overflow: "hidden",
        }}>
          {/* Agac silueti arka plan - cok soluk */}
          {!silHata && (
            <div style={{
              position: "absolute", inset: 0, zIndex: 0,
              pointerEvents: "none",
              backgroundImage: "url('/agac-silueti.png')",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "right bottom",
              backgroundSize: "50%",
              opacity: 0.045,
            }} />
          )}
          <div style={{ position: "relative", zIndex: 1 }}>
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
