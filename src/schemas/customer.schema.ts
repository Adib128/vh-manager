
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';
export type CustomerDocument = Customer & Document;

@Schema()
export class Customer {

  @Prop()
  @ApiProperty()
  name: string;

  @Prop()
  @ApiProperty()
  email: string;

  @Prop()
  @ApiProperty()
  phoneNumber: number;

  @Prop()
  @ApiProperty()
  address: string;
}

export const CustomerSchema = SchemaFactory.createForClass(Customer);
