import { Module } from '@nestjs/common';
import { ExpensesService } from './expenses.service';
import { ExpensesController } from './expenses.controller';
import { PrismaClient } from '@prisma/client';

@Module({
  imports: [],
  controllers: [ExpensesController],
  providers: [ExpensesService, PrismaClient]
})
export class ExpensesModule {}
