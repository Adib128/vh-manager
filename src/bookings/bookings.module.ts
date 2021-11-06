import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios'; 
import { BookingsService } from './bookings.service';
import { BookingsController } from './bookings.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Booking, BookingSchema } from 'src/schemas/booking.schema';
import { Driver, DriverSchema } from 'src/schemas/driver.schema';
import { Vehicle, VehicleSchema } from 'src/schemas/vehicle.schema';
import { Customer, CustomerSchema } from 'src/schemas/customer.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Booking.name, schema: BookingSchema }]),
    MongooseModule.forFeature([{ name: Driver.name, schema: DriverSchema }]),
    MongooseModule.forFeature([{ name: Vehicle.name, schema: VehicleSchema }]),
    MongooseModule.forFeature([{ name: Customer.name, schema: CustomerSchema }]),
    HttpModule
],
  controllers: [BookingsController],
  providers: [BookingsService]
})
export class BookingsModule {}
