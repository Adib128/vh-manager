import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type DriverDocument = Driver & Document;

@Schema()
export class Driver {
  @Prop()
  registrationNumber: string;

  @Prop()
  name: string;

  @Prop()
  email: string;

  @Prop()
  phoneNumber: number;
  
  @Prop()
  LicenseNo: number;
  
  @Prop()
  Exp Date

}

export const DriverSchema = SchemaFactory.createForClass(Driver);
