// apps/api/src/auth/auth.service.ts

import {
  Injectable,
  UnauthorizedException,
  ConflictException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { User, Prisma } from '@prisma/client';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  /**
   * Remove a senha de um objeto de usuário antes de enviá-lo como resposta.
   * @param user - O objeto de usuário completo.
   * @returns O objeto de usuário sem a propriedade 'password'.
   */
  private excludePassword(user: User): Omit<User, 'password'> {
    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }

  /**
   * Registra um novo usuário no banco de dados.
   * @param registerDto - Contém email e senha.
   * @returns O objeto do usuário criado (sem a senha).
   * @throws ConflictException se o e-mail já existir.
   */
  async register(registerDto: LoginDto) {
    const { email, password } = registerDto;
    const hashedPassword = await bcrypt.hash(password, 10);

    try {
      const user = await this.prisma.user.create({
        data: {
          email,
          password: hashedPassword,
        },
      });
      return this.excludePassword(user);
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2002' // P2002 é o código de erro do Prisma para "unique constraint failed"
      ) {
        throw new ConflictException('Este e-mail já está em uso.');
      }
      // Se for outro tipo de erro, o NestJS o tratará como um Internal Server Error (500)
      throw error;
    }
  }

  /**
   * Autentica um usuário e retorna um token de acesso.
   * @param loginDto - Contém email e senha.
   * @returns Um objeto com os dados do usuário (sem a senha) e o accessToken.
   * @throws UnauthorizedException se as credenciais forem inválidas.
   */
  async login(loginDto: LoginDto) {
    const { email, password } = loginDto;

    const user = await this.prisma.user.findUnique({ where: { email } });

    if (!user) {
      throw new UnauthorizedException('Credenciais inválidas');
    }

    const isPasswordMatching = await bcrypt.compare(password, user.password);

    if (!isPasswordMatching) {
      throw new UnauthorizedException('Credenciais inválidas');
    }

    const payload = { sub: user.id, email: user.email };
    const accessToken = await this.jwtService.signAsync(payload);

    return {
      user: this.excludePassword(user),
      accessToken,
    };
  }
}
