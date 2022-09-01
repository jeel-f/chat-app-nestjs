import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { messages } from 'src/interface/message.interface';

@Injectable()
export class ChatsService {
  constructor(@InjectModel('messages') private readonly messagesModel: Model<messages>) { }

  fetchMessageList(senderId: string, reciverId: string) {
  return this.messagesModel.find({ $or:[{ senderId, reciverId }, { senderId: reciverId, reciverId: senderId }]}).sort({ timestamp: -1 }).lean()
  }
}
