import { User } from '@/interface';
import { create } from 'zustand';

interface AuthState {
  user: User | null;
  loggedIn: boolean | null;
  actions: {
    setUser: (user: User) => void;
    removeUser: () => void;
  };
}

const authStore = create<AuthState>((set) => ({
  user: null,
  loggedIn: null,
  actions: {
    setUser: (user: User) =>
      set((_) => ({
        user: user,
        loggedIn: true,
      })),
    removeUser: () => {
      set(() => ({
        user: null,
        loggedIn: false,
      }));
    },
  },
}));

// atomic selectors
export const useUser = () => authStore((state) => state.user);
export const useLoginStatus = () => authStore((state) => state.loggedIn);

// combine all actions
export const useAuthActions = () => authStore((state) => state.actions);
