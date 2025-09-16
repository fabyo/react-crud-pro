// apps/web/src/mocks/handlers.ts
import { http, HttpResponse } from 'msw'

export const handlers = [
  // Intercepta a requisição GET para /products
  http.get('https://api.fabyoguimaraes.com.br/products', () => {
    // E retorna uma resposta mockada
    return HttpResponse.json([
      { id: 1, name: 'Produto Mock 1', price: 100 },
      { id: 2, name: 'Produto Mock 2', price: 200 },
    ])
  }),
]
