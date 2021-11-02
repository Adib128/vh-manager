import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type FuelDocument = Fuel & Document;

@Schema()
export class Fuel {
  @Prop()
  registrationNumber: string;

  @Prop()
  name: string;

  @Prop()
  email: string;

  @Prop()
  phoneNumber: number;
  
  @Prop()
  licenseNo: number;

  @Prop()
  expDate: Date;
}

export const FuelSchema = SchemaFactory.createForClass(Fuel);
