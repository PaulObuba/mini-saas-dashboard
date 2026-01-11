"use client";

import { ReactNode, useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { isLoggedIn } from "@/lib/auth";

const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const router = useRouter();
  const pathname = usePathname();
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    const publicPaths = ["/auth/login", "/auth/forgot-password"];

    if (!isLoggedIn() && !publicPaths.includes(pathname)) {
      router.push("/auth/login");
      return;
    }

    const timer = setTimeout(() => setChecked(true), 0);
    return () => clearTimeout(timer);
  }, [pathname, router]);

  if (!checked) return null;

  return <>{children}</>;
};

export default ProtectedRoute;
