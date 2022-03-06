import { Module } from '@nestjs/common';
import { BookingsService } from './bookings.service';
import { BookingsController } from './bookings.controller';
import { PrismaClient } from '@prisma/client';

@Module({
  imports: [],
  controllers: [BookingsController],
  providers: [BookingsService, PrismaClient]
})
export class BookingsModule {}
