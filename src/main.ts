import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: 'http://localhost:3000', // Allow Next.js frontend
    credentials: true,              // If you're using cookies/auth
  });

  await app.listen(process.env.PORT ?? 3001);
}
bootstrap();
