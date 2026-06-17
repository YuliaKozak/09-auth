"use client";

import React from "react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

type AuthLayoutProps = {
  children: React.ReactNode;
};

export default function AuthLayout({ children }: AuthLayoutProps) {
  const router = useRouter();

  useEffect(() => {
    // 🛠 Примусово оновлюємо поточні серверні маршрути та кеш при монтуванні сторінок auth
    router.refresh();
  }, [router]);

  return <>{children}</>;
}
