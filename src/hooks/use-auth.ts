import {
  useSessionContext,
  useSupabaseClient,
  useUser,
} from '@supabase/auth-helpers-react';
import { useCallback } from 'react';

export const useAuth = () => {
  const supabaseClient = useSupabaseClient();
  const user = useUser();
  const session = useSessionContext();
  const logOut = useCallback(() => supabaseClient.auth.signOut(), [session]);
  const logIn = () =>
    supabaseClient.auth.signInWithOAuth({
      provider: 'google',
      options: {
        queryParams: {
          access_type: 'offline',
          prompt: 'consent',
        },
      },
    });

  return {
    session,
    supabaseClient,
    user,
    logOut,
    logIn,
  };
};
