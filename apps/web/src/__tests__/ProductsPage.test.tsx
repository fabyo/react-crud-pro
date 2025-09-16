// apps/web/src/__tests__/ProductsPage.test.tsx
import { render, screen, waitFor } from '@testing-library/react'
import ProductsPage from '../app/products/page' // Assumindo que sua página está aqui
import { server } from '../mocks/server' // Servidor de mock do MSW
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

// Inicia o servidor de mock antes de todos os testes
beforeAll(() => server.listen())
// Limpa os mocks após cada teste
afterEach(() => server.resetHandlers())
// Fecha o servidor ao final
afterAll(() => server.close())

const queryClient = new QueryClient()

test('should display a list of products after loading', async () => {
  render(
    <QueryClientProvider client={queryClient}>
      <ProductsPage />
    </QueryClientProvider>
  )

  // 1. Verifica se o estado de carregamento aparece primeiro (opcional, mas bom)
  expect(screen.getByText(/carregando/i)).toBeInTheDocument()

  // 2. Espera a UI ser atualizada com os dados do mock da API
  await waitFor(() => {
    // 3. Verifica se os produtos do mock foram renderizados na tela
    expect(screen.getByText('Produto Mock 1')).toBeInTheDocument()
    expect(screen.getByText('Produto Mock 2')).toBeInTheDocument()
  })
})
