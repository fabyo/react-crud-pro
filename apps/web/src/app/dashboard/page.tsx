// apps/web/src/app/dashboard/page.tsx
'use client'

import { useAuthGuard } from '@/hooks/useAuthGuard'
import { useAuthStore } from '@/stores/authStore'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'

export default function DashboardPage() {
  // Este hook garante que apenas usuários logados vejam esta página
  useAuthGuard()

  const { user, logout } = useAuthStore()
  const router = useRouter()

  function handleLogout() {
    logout()
    router.push('/login')
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-4xl font-bold">Dashboard</h1>
      <p className="mt-4 text-lg">
        Bem-vindo, <span className="font-semibold">{user?.email}</span>!
      </p>
      <p className="mt-2 text-gray-500">
        Esta é uma página protegida.
      </p>
      <Button onClick={handleLogout} className="mt-8">
        Sair (Logout)
      </Button>
    </div>
  )
}
