import { Toaster } from '@/components/ui';
import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { createBrowserSupabaseClient } from '@supabase/auth-helpers-nextjs';
import { SessionContextProvider, Session } from '@supabase/auth-helpers-react';
import { useEffect, useState } from 'react';

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

  useEffect(() => {
    const {
      data: {
        subscription: { unsubscribe },
      },
    } = supabaseClient.auth.onAuthStateChange((event, session) => {
      // TODO make ultils for save local
      if (event === 'SIGNED_OUT') {
        localStorage.removeItem('jwt');
      }
      if (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED') {
        if (session?.access_token) {
          localStorage.setItem('jwt', session.access_token);
        }
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
      <Component {...pageProps} />
      <Toaster />
    </SessionContextProvider>
  );
}
