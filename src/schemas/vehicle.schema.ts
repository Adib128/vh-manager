
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Type } from '../vehicles/enums/type.enum';
import { ConsumptionType } from '../vehicles/enums/consumption.enum';
import { FuelType } from '../vehicles/enums/fuel.enum';
import { Transmission } from '../vehicles/enums/transmission.enum';

export type VehicleDocument = Vehicle & Document;

@Schema()
export class Vehicle {

  @Prop()
  registrationNumber: string;

  @Prop()
  make: string;

  @Prop()
  model: string;

  @Prop()
  type: Type;

  @Prop()
  consumptionType: ConsumptionType;

  @Prop()
  fuelType: FuelType;

  @Prop()
  transmission: Transmission;

  @Prop()
  purchaseDate: Date;
}

export const VehicleSchema = SchemaFactory.createForClass(Vehicle);
