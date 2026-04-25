import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { envs } from './config/envs';
import { Logger, ValidationPipe } from '@nestjs/common';
import {DocumentBuilder, SwaggerModule} from "@nestjs/swagger";

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

  const config = new DocumentBuilder()
      .setTitle('Loans')
      .setDescription('Loans API documentation')
      .setVersion('1.0')
      .addBearerAuth({
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT'
      }, 'access-token')
      .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);

  app.setGlobalPrefix('api')
  await app.listen(envs.port);
  logger.log(`Loans API is running on http://localhost:${envs.port}`);
}

bootstrap();

