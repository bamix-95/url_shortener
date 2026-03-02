import { getCurrentUser } from "@/lib/api/auth";
import type { User } from "@/lib/types";
import { create } from "zustand";

interface AuthStoreProps {
  authUser: User | null;
  isLoading: boolean;

  setAuthUser: (user: User | null) => void;
  fetchCurrentUser: () => Promise<void>;
}

const useAuthStore = create<AuthStoreProps>((set) => ({
  authUser: null,
  isLoading: false,

  setAuthUser: (user) => set({ authUser: user }),

  fetchCurrentUser: async () => {
    set({ isLoading: true });

    try {
      const data = await getCurrentUser();

      set({
        authUser: data.data,
        isLoading: false,
      });
    } catch (error: unknown) {
      set({
        authUser: null,
        isLoading: false,
      });
      console.error("Auth check failed:", error);
    }
  },
}));

export default useAuthStore;
