import { Module } from '@nestjs/common';
import { VehiclesModule } from './vehicles/vehicles.module';
import { MongooseModule } from '@nestjs/mongoose';
import { CustomersModule } from './customers/customers.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/vehicle'),
    VehiclesModule,
    CustomersModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
