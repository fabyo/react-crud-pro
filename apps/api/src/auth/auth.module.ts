import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    PrismaModule, // <-- Importa o PrismaService
    JwtModule.register({ // <-- Configura o JWT
      global: true,
      secret: process.env.JWT_SECRET || 'seu_segredo_super_secreto_aqui', // Use uma variável de ambiente!
      signOptions: { expiresIn: '1d' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
