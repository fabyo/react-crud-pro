// apps/api/app/validators/auth.ts
import vine from '@vinejs/vine'

export const registerUserValidator = vine.compile(
  vine.object({
    email: vine.string().email().normalizeEmail(),
    password: vine.string().minLength(8).confirmed(),
  })
)

export const loginUserValidator = vine.compile(
  vine.object({
    email: vine.string().email().normalizeEmail(),
    password: vine.string().minLength(8),
  })
)
