"use client";
import { SessionProvider } from "next-auth/react";

export default function Saglayicilar({
  children,
}: {
  children: React.ReactNode;
}) {
  return <SessionProvider>{children}</SessionProvider>;
}
