import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({transform: true}));
  const config = new DocumentBuilder()
    .setTitle('VH-Manager')
    .setDescription('VH-Manager is a RESTful API for Fleet Management System. This system enables the company to manage all the resources of the fleet and the vehicle booking.')
    .setVersion('1.0')
    .addTag('User')
    .addTag('Vehicle')
    .addTag('Driver')
    .addTag('Customer')
    .addTag('Booking')
    .addTag('Fuel')
    .addTag('Expense')
    .addBearerAuth(
      {
        description: `Please sign in and enter the returned token`,
        name: 'Authorization',
        bearerFormat: 'Bearer',
        scheme: 'Bearer',
        type: 'http',
        in: 'Header',
      },
      'access-token',
    )
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document);
  app.enableCors();
  await app.listen(process.env.PORT || 3000);
}
bootstrap();
