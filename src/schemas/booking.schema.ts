import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
import { Vehicle } from './vehicle.schema';
import { Driver } from './driver.schema';
import { Customer } from './customer.schema';

export type BookingDocument = Booking & Document;

export class Location extends Document{
  @Prop()
  type: "Point";

  @Prop()
  cordinates: [number];
}

@Schema()
export class Booking {

  @Prop()
  fromPoint: Location;

  @Prop()
  toPoint: Location;

  @Prop()
  bookingDate: Date;

  @Prop()
  amount: number;

  @Prop()
  distance: number;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Customer' })
  customer: Customer;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Vehicle' })
  vehicle: Vehicle;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Driver' })
  driver: Driver;
}

export const BookingSchema = SchemaFactory.createForClass(Booking);
