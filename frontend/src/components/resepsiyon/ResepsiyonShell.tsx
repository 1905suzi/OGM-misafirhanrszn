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
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

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
    <div className="flex min-h-screen relative">
      
      {/* MOBILE OVERLAY */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 md:hidden" 
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* SIDEBAR */}
      <aside className={`fixed inset-y-0 left-0 w-[240px] z-50 flex flex-col overflow-hidden transition-transform duration-300 ease-in-out md:translate-x-0 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`} style={{ backgroundColor: SIDEBAR_BG }}>
        
        {/* Mobil Kapat Butonu */}
        <button 
          className="absolute top-4 right-4 z-20 md:hidden text-white/70 hover:text-white"
          onClick={() => setIsSidebarOpen(false)}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
        </button>

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
                onClick={() => setIsSidebarOpen(false)}
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
      <div className="flex-1 flex flex-col min-h-screen md:ml-[240px] w-full">
        {/* Topbar */}
        <header className="sticky top-0 z-20 h-[58px] flex items-center justify-between px-4 md:px-7 shadow-md" style={{ backgroundColor: SIDEBAR_BG }}>
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setIsSidebarOpen(true)}
              className="md:hidden p-1.5 text-[#4ade80] hover:bg-white/10 rounded-md"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
            </button>
            <div className="flex items-center gap-2">
              <i className="pi pi-building text-[#4ade80] text-[13px] md:text-[14px]" />
              <p className="text-[#86efac] text-[11px] md:text-[13px] uppercase tracking-widest font-semibold truncate max-w-[120px] md:max-w-none">
                Resepsiyon Paneli
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3 md:gap-4">
            <div className="flex items-center gap-2">
              <div className="w-[26px] h-[26px] md:w-[30px] md:h-[30px] rounded-full bg-[#166534] flex items-center justify-center">
                <i className="pi pi-user text-white text-[12px] md:text-[13px]" />
              </div>
              <span className="hidden sm:inline text-white text-[13px] md:text-[14px] font-medium">{`Ho\u015f Geldiniz`}</span>
            </div>
            <button onClick={() => signOut({ callbackUrl: "/" })} className="flex items-center gap-1.5 md:gap-2 px-2.5 py-1.5 md:px-3.5 md:py-1.5 rounded-lg border border-[#166534] bg-transparent text-[#86efac] text-[12px] md:text-[13px] font-medium cursor-pointer hover:bg-[#166534] transition-colors">
              <i className="pi pi-sign-out text-[11px] md:text-[12px]" />
              <span className="hidden xs:inline">{`\u00c7\u0131k\u0131\u015f Yap`}</span>
            </button>
          </div>
        </header>

        {/* Sayfa Icerigi */}
        <main className="relative flex-1 bg-[#f8faf8] p-4 md:p-7 overflow-hidden">
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
          <div className="relative z-10 w-full overflow-x-auto pb-4">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
