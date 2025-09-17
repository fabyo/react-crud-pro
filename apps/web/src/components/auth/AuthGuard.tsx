// apps/web/src/components/auth/AuthGuard.tsx
'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useAuthStore } from '@/stores/authStore';

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const token = useAuthStore((state) => state.token);
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);

   console.log(token)

  // Este efeito marca que o componente montou no navegador
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Este efeito cuida do redirecionamento
  useEffect(() => {
    console.log(isClient)
    // Só age depois de montar no navegador e se NÃO houver token
    if (isClient && !token) {
      router.replace('/login');
    }
  }, [isClient, token, router]);

  // Se o token existir (e já estamos no cliente), mostra o conteúdo da página
  if (isClient && token) {
    return <>{children}</>;
  }

  // Caso contrário (no servidor, ou no cliente antes do token ser confirmado), mostra um loading
  return <div className="flex h-screen items-center justify-center">Carregando...</div>;
}
