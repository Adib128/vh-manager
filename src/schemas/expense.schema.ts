import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import * as mongoose from 'mongoose';
import { Vehicle } from './vehicle.schema';

export type ExpenseDocument = Expense & Document;

@Schema()
export class Expense {

  @Prop()
  @ApiProperty()
  expenseDate: Date;

  @Prop()
  @ApiProperty()
  amount: number;

  @Prop()
  @ApiProperty()
  description: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Vehicle' })
  @ApiProperty()
  vehicle: Vehicle;
  
}

export const ExpenseSchema = SchemaFactory.createForClass(Expense);
