import { createBrowserSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { SessionContextProvider } from "@supabase/auth-helpers-react";
import { useEffect, useState } from "react";

import { useAuthStorage } from "@/hooks";
import type { AppProps, UserMetadata } from "@/interface";
import { useAuthActions } from "@/store/auth/authSlice";

interface Props {
  children: React.ReactNode;
  initialSession: AppProps["pageProps"]["initialSession"];
}

const SessionProvider = ({ initialSession, children }: Props) => {
  const [supabaseClient] = useState(() =>
    createBrowserSupabaseClient({
      supabaseKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string,
      supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL as string,
    })
  );

  const { setUser, removeUser } = useAuthActions();
  const [_, setAuthInfo, removeAuthInfo] = useAuthStorage();

  useEffect(() => {
    const {
      data: {
        subscription: { unsubscribe },
      },
    } = supabaseClient.auth.onAuthStateChange((event, session) => {
      // TODO make ultils for save local

      if (session === null) {
        removeAuthInfo();
        removeUser();
      } else {
        setAuthInfo({
          access_token: session.access_token,
          expires_at: session.expires_at,
          refresh_token: session.refresh_token,
        });
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
      initialSession={initialSession}
    >
      {children}
    </SessionContextProvider>
  );
};
export { SessionProvider };
