import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Vehicle } from './vehicle.schema';
import { Driver } from './driver.schema';
import { Customer } from './customer.schema';

export type BookingDocument = Booking & Document;

export class Location extends Document{

  @Prop()
  @ApiProperty()
  type: "Point";

  @Prop()
  @ApiProperty()
  cordinates: [number];
}

@Schema()
export class Booking {

  @Prop()
  @ApiProperty()
  fromPoint: Location;

  @Prop()
  @ApiProperty()
  toPoint: Location;

  @Prop()
  @ApiProperty()
  distance: number;

  @Prop()
  @ApiProperty()
  bookingDate: Date;

  @Prop()
  @ApiProperty()
  amount: number;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Customer' })
  @ApiProperty()
  customer: Customer;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Vehicle' })
  @ApiProperty()
  vehicle: Vehicle;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Driver' })
  @ApiProperty()
  driver: Driver;
}

export const BookingSchema = SchemaFactory.createForClass(Booking);
