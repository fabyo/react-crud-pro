// apps/web/src/app/dashboard/page.tsx
'use client'

import { useAuthStore } from '@/stores/authStore'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import AuthGuard from '@/components/auth/AuthGuard' // <-- 1. Importe o componente

// Componente interno que contém a lógica da página
function DashboardContent() {
  const { user, logout } = useAuthStore()
  const router = useRouter()

  function handleLogout() {
    logout()
    router.replace('/login')
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-4xl font-bold">Dashboard</h1>
      <p className="mt-4 text-lg">
        Bem-vindo, <span className="font-semibold">{user?.email}</span>!
      </p>
      <p className="mt-2 text-gray-500">Esta é uma página protegida.</p>
      <Button onClick={handleLogout} className="mt-8">
        Sair (Logout)
      </Button>
    </div>
  )
}

// A página agora exporta o conteúdo protegido dentro do AuthGuard
export default function DashboardPage() {
  return (
    <AuthGuard>  {/* <-- 2. Envolva o conteúdo com o AuthGuard */}
      <DashboardContent />
    </AuthGuard>
  )
}
