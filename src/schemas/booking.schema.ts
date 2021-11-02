import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
import { Vehicle } from './vehicle.schema';
import { Driver } from './driver.schema';
import { Customer } from './customer.schema';

export type BookingDocument = Booking & Document;

@Schema()
export class Booking {

    @Prop()
    fillDate: Date;

    @Prop()
    amount: number;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Customer' })
    customer: Customer;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Vehicle' })
    vehicle: Vehicle;
  
    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Driver' })
    driver: Driver;
    
}

export const BookingSchema = SchemaFactory.createForClass(Booking);
