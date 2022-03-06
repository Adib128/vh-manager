import { Module } from '@nestjs/common';
import { ExpensesService } from './expenses.service';
import { ExpensesController } from './expenses.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Vehicle, VehicleSchema } from 'src/schemas/vehicle.schema';
import { Expense, ExpenseSchema } from 'src/schemas/expense.schema';
import { PrismaClient } from '@prisma/client';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Expense.name, schema: ExpenseSchema }]),
    MongooseModule.forFeature([{ name: Vehicle.name, schema: VehicleSchema }])
  ],
  controllers: [ExpensesController],
  providers: [ExpensesService, PrismaClient]
})
export class ExpensesModule {}
