import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import { PassportModule } from '@nestjs/passport'; // <-- 1. ADICIONE ESTA IMPORTAÇÃO

@Module({
  imports: [
    PrismaModule,
    PassportModule, // <-- 2. ADICIONE ESTE MÓDULO À LISTA
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET || 'yl4q47SzsKp4Etn8yjnCiRBNxSu7npxO',
      signOptions: { expiresIn: '1d' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
})
export class AuthModule {}
