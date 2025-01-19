"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AuthWrapper({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  useEffect(() => {
    const token = document.cookie.includes("authToken");

    if (!token) {
      router.push("/auth/login");
    }
  }, [router]);

  return <>{children}</>;
}