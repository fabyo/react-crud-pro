// apps/web/src/hooks/useLogin.ts
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useAuthStore } from '@/stores/authStore'
import { useRouter } from 'next/navigation'

// Define o tipo de dados que a API retorna no sucesso do login
interface LoginResponse {
  user: {
    id: number
    email: string
    created_at: string
    updated_at: string
  }
  token: string
}

// Define o tipo de dados que a função de mutação recebe (credenciais)
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
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/login`, {
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
      // Salva o token e o usuário no store global (Zustand)
      setToken(data.token)
      setUser(data.user)

      // Limpa caches de queries antigas, se houver
      queryClient.clear()
      
      // Redireciona para o dashboard
      router.push('/dashboard')
    },
    onError: (error) => {
      // Aqui você pode usar uma biblioteca de notificações (toast)
      console.error('Erro no login:', error.message)
      alert(`Erro no login: ${error.message}`)
    },
  })
}
