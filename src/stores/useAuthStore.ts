import { create } from "zustand";
import { persist } from "zustand/middleware";
import { UserProfile } from "@/types";

interface AuthState {
  user: UserProfile | null;
  token: string | null;
  isAuthenticated: boolean;
  setAuth: (user: UserProfile, token: string) => void;
  updateUser: (user: Partial<UserProfile>) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: {
        id: "user-default-01",
        fullName: "Nguyễn Văn An",
        email: "an.nguyen@vitalpulse.health",
        avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
        age: 32,
        gender: "male",
        bloodType: "O+",
        heightCm: 175,
        currentWeightKg: 68.5,
        targetWeightKg: 65.0,
        targetDailyCalories: 2100,
        targetDailyWaterMl: 2500,
        allergies: ["Penicillin", "Hải sản có vỏ (Tôm, Cua)"],
        chronicConditions: ["Tiền sử đau dạ dày nhẹ"],
        emergencyContact: {
          name: "Trần Thị Mai (Vợ)",
          relationship: "Vợ",
          phoneNumber: "+84 912 345 678",
        },
      },
      token: "mock-jwt-token-vitalpulse-2026",
      isAuthenticated: true,
      setAuth: (user, token) => {
        localStorage.setItem("auth_token", token);
        set({ user, token, isAuthenticated: true });
      },
      updateUser: (partialUser) => {
        set((state) => ({
          user: state.user ? { ...state.user, ...partialUser } : null,
        }));
      },
      logout: () => {
        localStorage.removeItem("auth_token");
        set({ user: null, token: null, isAuthenticated: false });
      },
    }),
    {
      name: "vitalpulse-auth",
    }
  )
);
