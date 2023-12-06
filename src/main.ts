import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: 'http://localhost:5173',
    methods: 'GET,PATCH,POST',
    allowedHeaders: [
      'Accept',
      'Authorization',
      'Cache-Control',
      'Content-Length',
      'Content-Security-Policy',
      'Content-Type',
      'Server',
      'User-Agent',
    ],
    exposedHeaders: [],
    credentials: true,
  });

  await app.listen(3002);
}
bootstrap();