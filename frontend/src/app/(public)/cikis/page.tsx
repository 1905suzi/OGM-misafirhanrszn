"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { signOut } from 'next-auth/react';

export default function CikisPage() {
  const router = useRouter();

  useEffect(() => {
    signOut({ callbackUrl: '/giris' });
  }, [router]);

  return null;
}
