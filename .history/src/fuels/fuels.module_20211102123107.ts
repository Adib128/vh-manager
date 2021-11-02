import { Module } from '@nestjs/common';
import { FuelsService } from './fuels.service';
import { FuelsController } from './fuels.controller';

@Module({
  controllers: [FuelsController],
  providers: [FuelsService]
})
export class FuelsModule {}
