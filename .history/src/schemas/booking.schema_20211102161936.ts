import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';

export type BookingDocument = Booking & Document;

@Schema()
export class Booking {


    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Vehicle' })
    vehicle: Vehicle;
  
    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Driver' })
    driver: Driver;
    
}

export const BookingSchema = SchemaFactory.createForClass(Booking);
