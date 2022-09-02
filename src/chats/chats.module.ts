import { Module } from '@nestjs/common';
import { ChatsService } from './chats.service';
import { ChatsController } from './chats.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { MessagesSchema } from 'src/schema/messages.schema';
import { ChatGateway } from 'src/provider/chat.gateway';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [MongooseModule.forFeature([{ name: "messages", schema: MessagesSchema }]), JwtModule.register({
    secret: 'chatApp',
    signOptions: { expiresIn: '30d' },
  })],
  controllers: [ChatsController],
  providers: [ChatsService,ChatGateway],
  exports: [ChatsService],
})
export class ChatsModule { }
