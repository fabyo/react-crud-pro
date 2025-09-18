'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import Link from 'next/link'

import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { useLogin } from '@/hooks/useLogin' // <-- Vamos usar o hook que planejamos


// 1. Definição do Schema de Validação com Zod
const formSchema = z.object({
  email: z
    .string()
    .min(1, { message: 'O e-mail é obrigatório.' }) // <-- MUDANÇA AQUI
    .email({ message: 'Por favor, insira um e-mail válido.' })
  password: z
    .string()
    .min(1, { message: 'A senha é obrigatória.' }) // <-- MUDANÇA AQUI
    .min(8, { message: 'A senha deve ter no mínimo 8 caracteres.' })
})

// Inferindo o tipo dos dados do formulário a partir do schema
type FormData = z.infer<typeof formSchema>

export default function LoginPage() {
  // Chamamos o nosso hook de mutation que se comunica com a API
  const { mutate: login, isPending } = useLogin()

  // 2. Configuração do React Hook Form
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  // 3. Função de Submissão
  function onSubmit(data: FormData) {
    console.log('Dados validados:', data)
    // Chamando a mutation para fazer o login
    login(data)
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 dark:bg-gray-950">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>
            Entre com seu e-mail e senha para acessar a plataforma.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/* 4. O Componente <Form> da shadcn/ui que envolve tudo */}
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {/* 5. Campo de E-mail */}
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>E-mail</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="seu@email.com"
                        type="email"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* 6. Campo de Senha */}
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Senha</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="********"
                        type="password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" className="w-full" disabled={isPending}>
                {isPending ? 'Entrando...' : 'Entrar'}
              </Button>
            </form>
          </Form>
        </CardContent>
    <div className="mb-4 text-center text-sm">
      Não tem uma conta?{' '}
      <Link href="/register" className="underline">
        Registre-se
      </Link>
    </div>
      </Card>
    </div>
  )
}
