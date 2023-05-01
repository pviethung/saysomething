import type { AppProps } from "@/interface";

import { ReactQueryProvider } from "./ReactQueryProvider";
import { SessionProvider } from "./SessionProvider";

interface Props {
  children: React.ReactNode;
  initialSession: AppProps["pageProps"]["initialSession"];
}

const AppProvider = ({ children, initialSession }: Props) => {
  return (
    <SessionProvider initialSession={initialSession}>
      <ReactQueryProvider>{children}</ReactQueryProvider>
    </SessionProvider>
  );
};
export { AppProvider };
