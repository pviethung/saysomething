import { Toaster } from '@/components/ui';
import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { createBrowserSupabaseClient } from '@supabase/auth-helpers-nextjs';
import { SessionContextProvider, Session } from '@supabase/auth-helpers-react';
import { useEffect, useState } from 'react';
import { Layout } from '@/components/layout';
import { useAuthActions } from '@/store/auth';
import { UserMetadata } from '@/interface';

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

  useEffect(() => {
    const {
      data: {
        subscription: { unsubscribe },
      },
    } = supabaseClient.auth.onAuthStateChange((event, session) => {
      // TODO make ultils for save local
      if (session === null) {
        localStorage.removeItem('jwt');
        removeUser();
      } else {
        localStorage.setItem('jwt', session.access_token);
        setUser({
          id: session.user.id,
          user_metadata: session.user.user_metadata as UserMetadata,
        });
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <SessionContextProvider
      supabaseClient={supabaseClient}
      initialSession={pageProps.initialSession}
    >
      <Layout>
        <Component {...pageProps} />
      </Layout>
      <Toaster />
    </SessionContextProvider>
  );
}
