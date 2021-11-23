import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
exports.Configs = new DocumentBuilder()
    .setTitle('VH-Manager')
    .setDescription('The API for managing vehicle')
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