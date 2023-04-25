import { Toaster } from '@/components/ui';
import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { createBrowserSupabaseClient } from '@supabase/auth-helpers-nextjs';
import { SessionContextProvider, Session } from '@supabase/auth-helpers-react';
import { useEffect, useState } from 'react';
import { Layout } from '@/components/layout';
import { useAuthActions } from '@/store/authSlice';
import { UserMetadata } from '@/interface';
import { useRouter } from 'next/router';

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

  console.log(pathname);

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

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <SessionContextProvider
      supabaseClient={supabaseClient}
      initialSession={pageProps.initialSession}
    >
      {pathname !== '/_error' ? (
        <Layout>
          <Component {...pageProps} />
        </Layout>
      ) : (
        <Component {...pageProps} />
      )}
      <Toaster />
    </SessionContextProvider>
  );
}
