import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type FuelDocument = Fuel & Document;

@Schema()
export class Fuel {
  @Prop()
  quantity: number;

  @Prop()
  price: number;

  @Prop()
  odometerValue: number;

  @Prop()
  fillDate: Date;

  @Prop()
  fillDate: Date;
}

export const FuelSchema = SchemaFactory.createForClass(Fuel);
