import { Module } from '@nestjs/common';
import { VehiclesService } from './vehicles.service';
import { VehiclesController } from './vehicles.controller';
import { PrismaService } from 'prisma.service';

@Module({
  imports: [],
  controllers: [VehiclesController],
  providers: [VehiclesService, PrismaService]
})
export class VehiclesModule {}
