import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Driver } from 'src/drivers/entities/driver.entity';
import { Vehicle } from 'src/vehicles/entities/vehicle.entity';

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
  vehicle: Vehicle;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Driver' })
  driver: Driver;
}

export const FuelSchema = SchemaFactory.createForClass(Fuel);
