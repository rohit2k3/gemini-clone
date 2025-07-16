import { create } from "zustand"
import { persist } from "zustand/middleware"

export interface User {
  id: string
  phone: string
  countryCode: string
  createdAt: string
}

interface AuthState {
  isAuthenticated: boolean
  user: User | null
  isLoading: boolean
  login: (user: User) => void
  logout: () => void
  initializeAuth: () => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      isAuthenticated: false,
      user: null,
      isLoading: false,
      login: (user: User) => {
        set({ isAuthenticated: true, user, isLoading: false })
      },
      logout: () => {
        set({ isAuthenticated: false, user: null, isLoading: false })
        localStorage.removeItem("chatrooms")
        localStorage.removeItem("messages")
      },
      initializeAuth: () => {
        const state = get()
        if (state.user && !state.isAuthenticated) {
          set({ isAuthenticated: true })
        }
      },
    }),
    {
      name: "auth-storage",
      partialize: (state) => ({ user: state.user, isAuthenticated: state.isAuthenticated }),
    },
  ),
)
