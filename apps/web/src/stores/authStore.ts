// apps/web/src/stores/authStore.ts
import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

// Definimos a "forma" do nosso estado
interface User {
  id: number
  email: string
  created_at: string
  updated_at: string
}

interface AuthState {
  token: string | null
  user: User | null
  setToken: (token: string) => void
  setUser: (user: User) => void
  logout: () => void
}

// Criamos o store com persistência no localStorage
export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      token: null,
      user: null,
      setToken: (token) => set({ token }),
      setUser: (user) => set({ user }),
      logout: () => {
        set({ token: null, user: null })
        // Limpa o localStorage ao deslogar
        useAuthStore.persist.clearStorage()
      },
    }),
    {
      name: 'auth-storage', // nome da chave no localStorage
      storage: createJSONStorage(() => localStorage), // (opcional) por padrão já é o localStorage
    }
  )
)
