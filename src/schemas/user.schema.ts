import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop({unique : true})
  username: string;

  @Prop()
  password: string;
  
}

export const UserSchema = SchemaFactory.createForClass(User);
