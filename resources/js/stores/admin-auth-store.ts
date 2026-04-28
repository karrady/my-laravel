import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AdminUser {
  id: number;
  name: string;
  email: string;
}

interface AdminAuthState {
  token: string | null;
  user: AdminUser | null;
  setAuth: (token: string, user: AdminUser) => void;
  clearAuth: () => void;
  isAuthenticated: () => boolean;
}

export const useAdminAuthStore = create<AdminAuthState>()(
  persist(
    (set, get) => ({
      token: null,
      user: null,
      setAuth: (token, user) => set({ token, user }),
      clearAuth: () => set({ token: null, user: null }),
      isAuthenticated: () => !!get().token,
    }),
    { name: "yas-admin-auth" },
  ),
);
