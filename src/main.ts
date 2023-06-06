import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    // credentials: true,
    origin: process.env.CLIENT_URL,
  });
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(process.env.APP_PORT, process.env.APP_HOST, () => {
    console.log(`server started on port ${process.env.APP_PORT}`);
  });
}
bootstrap();
