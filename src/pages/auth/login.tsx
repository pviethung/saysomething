import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useLocalStorage } from "react-use";

import { Button } from "@/components/ui";

const LoginPage = () => {
  const supabaseClient = useSupabaseClient();
  const [jwt] = useLocalStorage("jwt", null, {
    raw: true,
  });
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
    if (!jwt) {
      void router.push("/");
    }
  }, [jwt]);

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
