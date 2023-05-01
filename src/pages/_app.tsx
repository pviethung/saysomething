import "@/styles/globals.css";

import type { Session } from "@supabase/supabase-js";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";

import { AuthGuard } from "@/components/auth";
import { Layout } from "@/components/layout";
import { AppProvider } from "@/components/provider";
import { Toaster } from "@/components/ui";
import { excludeLayoutRoutes, protectedRoutes } from "@/constants";

export default function MyApp({
  Component,
  pageProps,
}: AppProps<{
  initialSession: Session;
}>) {
  const { pathname } = useRouter();
  let content = <Component {...pageProps} />;

  if (!excludeLayoutRoutes.includes(pathname)) {
    content = <Layout>{content}</Layout>;
  }
  if (protectedRoutes.includes(pathname)) {
    content = <AuthGuard>{content}</AuthGuard>;
  }

  return (
    <AppProvider initialSession={pageProps.initialSession}>
      <>
        {content}
        <Toaster />
      </>
    </AppProvider>
  );
}
