import { Module } from '@nestjs/common';
import { CustomersService } from './customers.service';
import { CustomersController } from './customers.controller';
import { PrismaService } from 'prisma.service';

@Module({
  imports: [],
  controllers: [CustomersController],
  providers: [CustomersService, PrismaService]
})
export class CustomersModule {}
