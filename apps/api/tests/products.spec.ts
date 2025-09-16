// apps/api/tests/functional/products.spec.ts

import { test } from '@japa/runner'
import { ProductFactory } from '#database/factories/product_factory'
import testUtils from '@adonisjs/core/services/test_utils'
import Database from '@adonisjs/lucid/services/db'

test.group('Products CRUD', (group) => {
  // Limpa e reseta o banco de dados a cada teste para garantir isolamento
  group.each.setup(() => testUtils.db().truncate())

  test('it should create a new product', async ({ client, assert }) => {
    // 1. Dados do novo produto
    const productData = {
      name: 'Macbook Pro',
      price: 15000,
    }

    // 2. Faz uma requisição POST para a rota de criação
    const response = await client.post('/products').json(productData)

    // 3. Verifica as respostas
    response.assertStatus(201) // Verifica se o status code é 201 (Created)
    response.assertBodyContains({ name: 'Macbook Pro' }) // Verifica se o corpo da resposta contém os dados

    // 4. Verifica se o produto foi realmente salvo no banco
    const productInDb = await Database.from('products').where('name', 'Macbook Pro').first()
    assert.isNotNull(productInDb)
  })

  test('it should return a list of products', async ({ client, assert }) => {
    // 1. Usa uma "Factory" para criar 2 produtos no banco de teste
    await ProductFactory.createMany(2)

    // 2. Faz uma requisição GET para a rota de listagem
    const response = await client.get('/products')

    // 3. Verifica as respostas
    response.assertStatus(200)
    assert.lengthOf(response.body(), 2) // Verifica se a lista retornada tem 2 produtos
  })
})
