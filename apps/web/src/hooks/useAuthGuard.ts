import { useEffect } from 'react';
import { useAuthStore } from '@/stores/authStore';
import { useRouter } from 'next/navigation';

export const useAuthGuard = () => {
  const token = useAuthStore((state) => state.token);
  const router = useRouter();

  useEffect(() => {
    // Se não houver token, redireciona para a página de login
    if (!token) {
      router.replace('/login');
    }
  }, [token, router]);
};
