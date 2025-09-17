// apps/web/src/hooks/useRegister.ts
'use client'

import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'

export const useRegister = () => {
  const router = useRouter()

  return useMutation({
    mutationFn: async (credentials) => {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials),
      })
      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || 'Falha ao registrar')
      }
      return response.json()
    },
    onSuccess: () => {
      // Após o sucesso, redireciona para a página de login com uma mensagem
      alert('Usuário registrado com sucesso! Faça o login para continuar.')
      router.push('/login')
    },
    onError: (error) => {
      console.error('Erro no registro:', error.message)
      alert(`Erro no registro: ${error.message}`)
    },
  })
}
