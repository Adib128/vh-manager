import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Vehicle } from './vehicle.schema';
import { Driver } from './driver.schema';
import { ApiProperty } from '@nestjs/swagger';

export type FuelDocument = Fuel & Document;

@Schema()
export class Fuel {

  @Prop()
  @ApiProperty()
  quantity: number;

  @Prop()
  @ApiProperty()
  price: number;

  @Prop()
  @ApiProperty()
  odometerValue: number;

  @Prop()
  @ApiProperty()
  fillDate: Date;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Vehicle' })
  @ApiProperty()
  vehicle: Vehicle;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Driver' })
  @ApiProperty()
  driver: Driver;
  
}

export const FuelSchema = SchemaFactory.createForClass(Fuel);
