import { Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Module({
  providers: [PrismaService],
  exports: [PrismaService], // <-- Exporta o serviço para outros módulos usarem
})
export class PrismaModule {}
