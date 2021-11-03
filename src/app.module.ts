import { Module } from '@nestjs/common';
import { VehiclesModule } from './vehicles/vehicles.module';
import { MongooseModule } from '@nestjs/mongoose';
import { CustomersModule } from './customers/customers.module';
import { DriversModule } from './drivers/drivers.module';
import { FuelsModule } from './fuels/fuels.module';
import { BookingsModule } from './bookings/bookings.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/vehicle'),
    VehiclesModule,
    CustomersModule,
    DriversModule,
    FuelsModule,
    BookingsModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
