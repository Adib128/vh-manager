import { Module } from '@nestjs/common';
import { VehiclesService } from './vehicles.service';
import { VehiclesController } from './vehicles.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Vehicle } from './entities/vehicle.entity';
import { VehicleSchema } from 'src/schemas/vehicle.schema';
import { Fuel, FuelSchema } from 'src/schemas/fuel.schema';
import { Booking, BookingSchema } from 'src/schemas/booking.schema';
import { PrismaService } from 'prisma.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Vehicle.name, schema: VehicleSchema }]),
    MongooseModule.forFeature([{ name: Fuel.name, schema: FuelSchema }]),
    MongooseModule.forFeature([{ name: Booking.name, schema: BookingSchema }]),
  ],
  controllers: [VehiclesController],
  providers: [VehiclesService, PrismaService]
})
export class VehiclesModule {}
