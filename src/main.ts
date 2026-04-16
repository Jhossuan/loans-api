import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { envs } from './config/envs';
import { Logger, ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const logger = new Logger("Main");
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe(
    {
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
    }
  ));

  app.setGlobalPrefix('api')
  await app.listen(envs.port);
  logger.log(`Loans API is running on http://localhost:${envs.port}`);
}

bootstrap();

