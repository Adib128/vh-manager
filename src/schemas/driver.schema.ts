import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document } from 'mongoose';

export type DriverDocument = Driver & Document;

@Schema()
export class Driver {

  @Prop()
  @ApiProperty()
  registrationNumber: string;

  @Prop()
  @ApiProperty()
  name: string;

  @Prop()
  @ApiProperty()
  email: string;

  @Prop()
  @ApiProperty()
  phoneNumber: number;
  
  @Prop()
  @ApiProperty()
  licenseNo: number;

  @Prop()
  @ApiProperty()
  expDate: Date;
}

export const DriverSchema = SchemaFactory.createForClass(Driver);
