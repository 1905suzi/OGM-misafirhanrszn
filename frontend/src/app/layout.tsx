import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Saglayicilar from "@/components/Saglayicilar";

const inter = Inter({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "OGM Misafirhane — Rezervasyon Portalı",
  description: "Orman Genel Müdürlüğü Misafirhane Rezervasyon Sistemi",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="tr"
      className={`${inter.className} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Saglayicilar>{children}</Saglayicilar>
      </body>
    </html>
  );
}
