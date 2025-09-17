// apps/api/start/routes.ts
import router from '@adonisjs/core/services/router'
import { middleware } from './kernel.js'

// Rota raiz para teste de status
router.get('/', async () => {
  return { hello: 'world' }
})

// Rotas de Autenticação
router.post('/register', '#controllers/auth_controller.register')
router.post('/login', '#controllers/auth_controller.login')
