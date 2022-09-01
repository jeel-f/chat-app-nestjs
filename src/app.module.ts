import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { Users, UserSchema } from './schema/user.schema';
import { Messages, MessagesSchema } from './schema/messages.schema';
import { ChatsModule } from './chats/chats.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://chat-app-okrs:Y7IWZ9DTIsMMFXGD@cluster0.wuwpe.mongodb.net/?retryWrites=true&w=majority'),
    MongooseModule.forFeature([{ name: Users.name, schema: UserSchema }]),
    MongooseModule.forFeature([{ name: Messages.name, schema: MessagesSchema }]),
    AuthModule,
    UsersModule,
    ChatsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
