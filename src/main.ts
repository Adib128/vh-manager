import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule } from '@nestjs/swagger';
import { swaggerConfig } from './swagger.config';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // Using the validation pipe
  app.useGlobalPipes(new ValidationPipe({transform: true}));
  // Creating swagger documentation
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api-docs', app, document);
  // Enabling cors
  app.enableCors();
  await app.listen(process.env.PORT || 3000);
}
bootstrap();
