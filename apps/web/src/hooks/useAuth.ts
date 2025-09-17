// apps/web/src/hooks/useAuth.ts
import { useState, useEffect } from 'react'
import { useAuthStore } from '@/stores/authStore'

// Este tipo extrai o tipo do estado do nosso store
type AuthState = ReturnType<typeof useAuthStore.getState>

/**
 * Hook customizado que lida com a hidratação do Zustand em ambientes SSR como o Next.js.
 * Ele garante que o estado só seja retornado após o componente ter sido montado no cliente,
 * evitando que o estado inicial do servidor (sempre deslogado) seja usado indevidamente.
 */
export const useAuth = <T>(selector: (state: AuthState) => T): T => {
  // Pega o estado do store usando o seletor fornecido
  const storeState = useAuthStore(selector)

  // Estado para controlar a hidratação
  const [hydrated, setHydrated] = useState(false)

  useEffect(() => {
    // Marca como hidratado após a primeira renderização no cliente
    setHydrated(true)
  }, [])

  // Se não estiver hidratado, retorna undefined para o token/user.
  // Se estiver hidratado, retorna o estado real do store.
  return hydrated ? storeState : (selector({ token: null, user: null }) as T)
}
