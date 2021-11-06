
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type CustomerDocument = Customer & Document;

@Schema()
export class Customer {

  @Prop()
  name: string;

  @Prop()
  email: string;

  @Prop()
  phoneNumber: number;

  @Prop()
  address: string;
}

export const CustomerSchema = SchemaFactory.createForClass(Customer);
