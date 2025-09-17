// apps/api/src/main.ts

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // ADICIONE ESTA LINHA
  app.enableCors();

  await app.listen(3001); // <-- Garanta que a porta é diferente do seu frontend!
}
bootstrap();
