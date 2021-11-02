import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
import { Vehicle } from 'src/vehicles/entities/vehicle.entity';
import { Driver } from 'src/vehicles/entities/driver.entity';

export type BookingDocument = Driver & Document;

@Schema()
export class Driver {


    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Vehicle' })
    vehicle: Vehicle;
  
    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Driver' })
    driver: Driver;
    
}

export const DriverSchema = SchemaFactory.createForClass(Driver);
