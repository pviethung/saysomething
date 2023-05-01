import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useRouter } from "next/router";
import { useEffect } from "react";

import { Button } from "@/components/ui";
import { useAuthStorage } from "@/hooks";

const LoginContainer = () => {
  const supabaseClient = useSupabaseClient();
  const [auth] = useAuthStorage();
  const router = useRouter();

  const handleLogin = () => {
    void supabaseClient.auth.signInWithOAuth({
      provider: "google",
      options: {
        queryParams: {
          access_type: "offline",
          prompt: "consent",
        },
      },
    });
  };

  useEffect(() => {
    if (auth) {
      void router.push("/");
    }
  }, [auth, router]);

  if (auth) {
    return <></>;
  }

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
  return <div>LoginContainer</div>;
};
export { LoginContainer };
