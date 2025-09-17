// apps/api/src/auth/auth.service.spec.ts

import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { PrismaService } from 'src/prisma/prisma.service'; // <-- Importe o PrismaService
import { JwtService } from '@nestjs/jwt'; // <-- Importe o JwtService

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        // Adicione os providers mockados aqui
        {
          provide: PrismaService,
          useValue: {
            // Adicione aqui mocks das funções do Prisma que seu serviço usa, se necessário
            user: {
              create: jest.fn(),
              findUnique: jest.fn(),
            },
          },
        },
        {
          provide: JwtService,
          useValue: {
            // Adicione aqui mocks das funções do JWT que seu serviço usa
            signAsync: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
