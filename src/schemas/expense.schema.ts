import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Vehicle } from './vehicle.schema';

export type ExpenseDocument = Expense & Document;

@Schema()
export class Expense {

  @Prop()
  expenseDate: string;

  @Prop()
  amount: number;

  @Prop()
  description: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Vehicle' })
  vehicle: Vehicle;
  
}

export const ExpenseSchema = SchemaFactory.createForClass(Expense);
