import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import * as mongoose from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {

  @Prop({unique : true})
  @ApiProperty()
  username: string;

  @Prop()
  @ApiProperty()
  password: string;
  
}

export const UserSchema = SchemaFactory.createForClass(User);
