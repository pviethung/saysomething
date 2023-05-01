"use client";

import { useEffect } from "react";

import { useRedirect } from "@/hooks";
import { useAuthStatus, useUser } from "@/store/auth";

const AuthGuard = ({ children }: { children: React.ReactNode }) => {
  const loading = useAuthStatus();
  const user = useUser();
  const redirect = useRedirect("/auth/login");

  useEffect(() => {
    if (!loading && !user) {
      redirect();
    }
  }, [loading, user, redirect]);

  if (!loading || !user) {
    return <></>;
  }

  return <>{children}</>;
};
export { AuthGuard };
