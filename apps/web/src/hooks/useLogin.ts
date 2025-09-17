// apps/web/src/hooks/useLogin.ts
'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useAuthStore } from '@/stores/authStore'
import { useRouter } from 'next/navigation'

interface LoginResponse {
  user: {
    id: number
    email: string
  }
  accessToken: string // O tipo correto com 'accessToken'
}

interface LoginCredentials {
  email?: string
  password?: string
}

export const useLogin = () => {
  const { setToken, setUser } = useAuthStore()
  const router = useRouter()
  const queryClient = useQueryClient()

  return useMutation<LoginResponse, Error, LoginCredentials>({
    mutationFn: async (credentials) => {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(credentials),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || 'Falha no login')
      }

      return response.json()
    },
    onSuccess: (data) => {
      console.log('Login bem-sucedido, salvando o estado...');
      console.log(data.accessToken)
      // ===============================================
      // A CORREÇÃO ESTÁ AQUI:
      setToken(data.accessToken); // <-- USANDO a propriedade correta da API
      // ===============================================

      setUser(data.user);
      queryClient.clear();

      router.replace('/dashboard');
    },
    onError: (error) => {
      console.error('Erro no login:', error.message)
      alert(`Erro no login: ${error.message}`)
    },
  })
}
