"use client";
import React from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function MisafirLayout({ children }: { children: React.ReactNode }) {
  const { status } = useSession();
  const router = useRouter();

  if (status === "loading") {
    return <div className="flex h-screen items-center justify-center text-gray-500">Yükleniyor...</div>;
  }

  if (status === "unauthenticated") {
    if (typeof window !== "undefined") router.replace("/giris");
    return <div className="flex h-screen items-center justify-center text-gray-500">Yönlendiriliyor...</div>;
  }

  return <>{children}</>;
}

