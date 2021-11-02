import { Module } from '@nestjs/common';
import { BookingsService } from './bookings.service';
import { BookingsController } from './bookings.controller';

@Module({
  imports: [MongooseModule.forFeature([{ name: Fuel.name, schema: FuelSchema }])],
  controllers: [BookingsController],
  providers: [BookingsService]
})
export class BookingsModule {}
