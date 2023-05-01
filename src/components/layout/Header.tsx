import { useSupabaseClient } from "@supabase/auth-helpers-react";
import clsx from "clsx";

import { Button } from "@/components/ui";
import { useUser } from "@/store/auth/authSlice";

const Header = () => {
  const supabaseClient = useSupabaseClient();
  const user = useUser();

  const handleSignOut = () => {
    void supabaseClient.auth.signOut();
  };

  return (
    <div className={clsx("flex justify-between py-4")}>
      <h2 className="font-bold text-3xl">Say Something!!!</h2>
      {user && <Button onClick={handleSignOut}>Logout</Button>}
    </div>
  );
};
export { Header };
