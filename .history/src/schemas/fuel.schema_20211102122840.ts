import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';

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

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Vehicle' })
  owner: Owner;
}

export const FuelSchema = SchemaFactory.createForClass(Fuel);
