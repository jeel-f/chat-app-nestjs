import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { User } from 'src/interface/user.interface';

export type UserDocument = User & Document;
@Schema({
  timestamps: true,
})
export class Users {
  @Prop()
  username: string;
  @Prop({ required: true, unique: true })
  email: string;
  @Prop({ required: true })
  password: string;
}
export const UserSchema = SchemaFactory.createForClass(Users);
