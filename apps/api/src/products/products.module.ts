import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { PrismaModule } from 'src/prisma/prisma.module'; // <-- 1. Importe o PrismaModule

@Module({
  imports: [PrismaModule], // <-- 2. Adicione o PrismaModule aqui
  controllers: [ProductsController],
  providers: [ProductsService],
})
export class ProductsModule {}
