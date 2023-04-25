import { Button } from '@/components/ui';
import { useSupabaseClient } from '@supabase/auth-helpers-react';

const LoginPage = () => {
  const supabaseClient = useSupabaseClient();
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
    <div>
      <Button
        onClick={() => {
          handleLogin();
        }}
      >
        Login
      </Button>
    </div>
  );
};
export default LoginPage;
