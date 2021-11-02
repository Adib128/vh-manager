import { Module } from '@nestjs/common';
import { FuelsService } from './fuels.service';
import { FuelsController } from './fuels.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Fuel, FuelSchema } from 'src/schemas/fuel.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: Fuel.name, schema: FuelSchema }])],
  controllers: [FuelsController],
  providers: [FuelsService]
})
export class FuelsModule {}
