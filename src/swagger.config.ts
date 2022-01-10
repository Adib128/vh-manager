import { DocumentBuilder } from "@nestjs/swagger";

export const swaggerConfig = new DocumentBuilder()
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
