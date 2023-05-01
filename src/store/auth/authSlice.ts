import { create } from "zustand";

import type { User } from "@/interface";

interface AuthState {
  user: User | null;
  loading: boolean;
  actions: {
    setUser: (user: User) => void;
    removeUser: () => void;
  };
}

const authStore = create<AuthState>((set) => ({
  user: null,
  loading: true,
  actions: {
    setUser: (user: User) =>
      set((_) => ({
        user,
        loading: false,
      })),
    removeUser: () => {
      set(() => ({
        user: null,
        loading: false,
      }));
    },
  },
}));

// atomic selectors
const useUser = () => authStore((state) => state.user);
const useAuthStatus = () => authStore((state) => state.loading);

// combine all actions
const useAuthActions = () => authStore((state) => state.actions);

export { useAuthActions, useAuthStatus, useUser };
