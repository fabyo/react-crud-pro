// apps/api/app/controllers/auth_controller.ts
import User from '#models/user'
import { registerUserValidator, loginUserValidator } from '#validators/auth'
import type { HttpContext } from '@adonisjs/core/http'

export default class AuthController {
  /**
   * Registra um novo usuário
   */
  async register({ request, response }: HttpContext) {
    const payload = await request.validateUsing(registerUserValidator)
    const user = await User.create(payload)
    return response.created(user)
  }

  /**
   * Loga um usuário e retorna um token JWT
   */
  async login({ request, response }: HttpContext) {
    const { email, password } = await request.validateUsing(loginUserValidator)

    // Verifica as credenciais do usuário
    const user = await User.verifyCredentials(email, password)

    // Cria um token de acesso para o usuário
    const token = await User.accessTokens.create(user)

    return response.ok({
      user: user,
      token: token.value!.release(), // .release() retorna o token puro
    })
  }
}
