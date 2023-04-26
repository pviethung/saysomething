import "@/styles/globals.css";

import { createBrowserSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { Session, SessionContextProvider } from "@supabase/auth-helpers-react";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import { Layout } from "@/components/layout";
import { Toaster } from "@/components/ui";
import { excludeLayoutRoutes } from "@/constants";
import { UserMetadata } from "@/interface";
import { useAuthActions } from "@/store/authSlice";

export default function MyApp({
  Component,
  pageProps,
}: AppProps<{
  initialSession: Session;
}>) {
  const [supabaseClient] = useState(() =>
    createBrowserSupabaseClient({
      supabaseKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string,
      supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL as string,
    })
  );

  const { setUser, removeUser } = useAuthActions();
  const { pathname } = useRouter();

  useEffect(() => {
    const {
      data: {
        subscription: { unsubscribe },
      },
    } = supabaseClient.auth.onAuthStateChange((event, session) => {
      // TODO make ultils for save local
      if (session === null) {
        localStorage.removeItem("jwt");
        removeUser();
      } else {
        localStorage.setItem("jwt", session.access_token);
        setUser({
          id: session.user.id,
          user_metadata: session.user.user_metadata as UserMetadata,
        });
      }
    });

    return () => {
      unsubscribe();
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <SessionContextProvider
      supabaseClient={supabaseClient}
      initialSession={pageProps.initialSession}
    >
      {excludeLayoutRoutes.includes(pathname) ? (
        <Component {...pageProps} />
      ) : (
        <Layout>
          <Component {...pageProps} />
        </Layout>
      )}

      <Toaster />
    </SessionContextProvider>
  );
}
