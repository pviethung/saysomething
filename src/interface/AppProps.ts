import type { Session } from "@supabase/auth-helpers-react";
import type { AppProps as NextAppProps } from "next/app";

export type AppProps = NextAppProps<{
  initialSession: Session;
}>;
