import { Module } from '@nestjs/common';
import { FuelsService } from './fuels.service';
import { FuelsController } from './fuels.controller';
import { PrismaClient } from '@prisma/client';

@Module({
  imports: [],
  controllers: [FuelsController],
  providers: [FuelsService, PrismaClient]
})
export class FuelsModule {}
