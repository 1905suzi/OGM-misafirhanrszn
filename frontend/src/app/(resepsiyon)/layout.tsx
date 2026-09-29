"use client";

import ResepsiyonShell from "@/components/resepsiyon/ResepsiyonShell";

export default function ResepsiyonLayout({ children }: { children: React.ReactNode }) {
  return <ResepsiyonShell>{children}</ResepsiyonShell>;
}
