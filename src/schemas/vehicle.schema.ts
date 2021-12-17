
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Type } from '../vehicles/enums/type.enum';
import { ConsumptionType } from '../vehicles/enums/consumption.enum';
import { FuelType } from '../vehicles/enums/fuel.enum';
import { Transmission } from '../vehicles/enums/transmission.enum';
import { ApiProperty } from '@nestjs/swagger';

export type VehicleDocument = Vehicle & Document;

@Schema()
export class Vehicle {

  @Prop()
  @ApiProperty()
  registrationNumber: string;

  @Prop()
  @ApiProperty()
  make: string;

  @Prop()
  @ApiProperty()
  model: string;

  @Prop()
  @ApiProperty()
  type: Type;

  @Prop()
  @ApiProperty()
  consumptionType: ConsumptionType;

  @Prop()
  @ApiProperty()
  fuelType: FuelType;

  @Prop()
  @ApiProperty()
  transmission: Transmission;

  @Prop()
  @ApiProperty()
  purchaseDate: Date;
}

export const VehicleSchema = SchemaFactory.createForClass(Vehicle);
