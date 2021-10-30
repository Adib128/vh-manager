
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type VehicleDocument = Vehicle & Document;

@Schema()
export class Vehicle {
  @Prop()
  registrationNumber: number;

  @Prop()
  make: string;

  @Prop()
  model: string;

  @Prop()
  purchaseDate: Date;
}

export const VehicleSchema = SchemaFactory.createForClass(Vehicle);