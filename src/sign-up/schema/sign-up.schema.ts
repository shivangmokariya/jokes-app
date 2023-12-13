import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type Auth = signUp & Document;

@Schema()
export class signUp {
  @Prop()
  email: string;

  @Prop()
  password: string;

  @Prop()
  cPassword: string;
  
  @Prop()
  token: string;
}

export const signUpSchema = SchemaFactory.createForClass(signUp);