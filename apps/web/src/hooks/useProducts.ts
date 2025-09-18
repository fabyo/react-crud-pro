// apps/web/src/hooks/useProducts.ts
import { useQuery } from '@tanstack/react-query';
import { useAuthStore } from '@/stores/authStore';

export const useProducts = () => {
  const token = useAuthStore((state) => state.token);

  return useQuery({
    queryKey: ['products'], // Chave de cache
    queryFn: async () => {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products`, {
        headers: {
          // Envia o token para rotas protegidas, se houver
          Authorization: `Bearer ${token}`, 
        },
      });
      if (!response.ok) {
        throw new Error('Falha ao buscar produtos');
      }
      return response.json();
    },
    // A query só será executada se o token existir (opcional, mas bom)
    enabled: !!token,
  });
};
