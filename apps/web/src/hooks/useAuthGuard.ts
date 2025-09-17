// apps/web/src/hooks/useAuthGuard.ts
'use client'

import { useEffect } from 'react'
import { useAuthStore } from '@/stores/authStore'
import { useRouter } from 'next/navigation'

export const useAuthGuard = () => {
  const { token, _hasHydrated } = useAuthStore()
  const router = useRouter()

  useEffect(() => {
    // Só toma uma decisão DEPOIS que o store foi hidratado
    if (_hasHydrated && !token) {
      router.replace('/login')
    }
  }, [token, _hasHydrated, router])

  // Retorna o status para a página poder mostrar um loading
  return { isAuthLoading: !_hasHydrated }
}
