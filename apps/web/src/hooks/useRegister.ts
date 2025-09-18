'use client'

import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'

// 1. Define o tipo de dados que enviamos para a API
interface RegisterCredentials {
  email?: string
  password?: string
}

// 2. Define o tipo de dados que esperamos de volta da API
interface RegisterResponse {
  id: number
  email: string
  createdAt: string
  updatedAt: string
}

export const useRegister = () => {
  const router = useRouter()

  // 3. Adiciona os tipos genéricos ao useMutation
  return useMutation<RegisterResponse, Error, RegisterCredentials>({
    mutationFn: async (credentials) => {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials),
      })
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        throw new Error(errorData.message || 'Falha ao registrar')
      }
      return response.json()
    },
    onSuccess: () => {
      alert('Usuário registrado com sucesso! Faça o login para continuar.')
      router.push('/login')
    },
    onError: (error) => {
      console.error('Erro no registro:', error.message)
      alert(`Erro no registro: ${error.message}`)
    },
  })
}
