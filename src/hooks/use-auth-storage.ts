import { useLocalStorage } from "react-use";

import type { Auth } from "@/interface";

const useAuthStorage = () => {
  return useLocalStorage<Auth | null>("auth", null);
};
export { useAuthStorage };
