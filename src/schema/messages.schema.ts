import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { messages } from 'src/interface/message.interface';
import { User } from 'src/interface/user.interface';

export type MessagesDocument = messages & Document;
@Schema({
  timestamps: true,
})
export class Messages {
  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'users'  })
  senderId: User;
  @Prop({ required: true,type: mongoose.Schema.Types.ObjectId, ref: 'users'  })
  reciverId: User;
  @Prop()
  message: string;
  @Prop()
  seen: boolean;
}
export const MessagesSchema = SchemaFactory.createForClass(Messages);