import { Button } from '@/components/ui';
import { useUser } from '@/store/auth';
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import clsx from 'clsx';

const Header = () => {
  const supabaseClient = useSupabaseClient();
  const user = useUser();

  const handleSignOut = () => {
    supabaseClient.auth.signOut();
  };
  const handleLogin = () =>
    supabaseClient.auth.signInWithOAuth({
      provider: 'google',
      options: {
        queryParams: {
          access_type: 'offline',
          prompt: 'consent',
        },
      },
    });

  return (
    <div className={clsx('flex justify-between p-4')}>
      <h2 className="font-bold text-3xl">Say Something!!!</h2>
      {user ? (
        <Button onClick={handleSignOut}>Logout</Button>
      ) : (
        <Button
          onClick={() => {
            handleLogin();
          }}
        >
          Login
        </Button>
      )}
    </div>
  );
};
export { Header };
