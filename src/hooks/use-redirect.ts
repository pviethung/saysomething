import { useRouter } from "next/router";
import { useCallback } from "react";
let redirected = false;
const useRedirect = (to: string) => {
  const { push } = useRouter();

  const redirect = useCallback(() => {
    if (!redirected) {
      redirected = true;
      void push(to);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return redirect;
};
export { useRedirect };
