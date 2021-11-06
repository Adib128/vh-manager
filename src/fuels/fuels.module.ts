import { Module } from '@nestjs/common';
import { FuelsService } from './fuels.service';
import { FuelsController } from './fuels.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Fuel, FuelSchema } from 'src/schemas/fuel.schema';
import { Driver, DriverSchema } from 'src/schemas/driver.schema';
import { Vehicle, VehicleSchema } from 'src/schemas/vehicle.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Fuel.name, schema: FuelSchema }]),
    MongooseModule.forFeature([{ name: Driver.name, schema: DriverSchema }]),
    MongooseModule.forFeature([{ name: Vehicle.name, schema: VehicleSchema }])
  ],
  controllers: [FuelsController],
  providers: [FuelsService]
})
export class FuelsModule {}
