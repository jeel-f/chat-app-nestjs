import { Controller, Get, Res } from '@nestjs/common';
import { Response } from 'express';
import { ChatsService } from './chats.service';

@Controller('chat')
export class ChatsController {
  constructor(private readonly chatsService: ChatsService) {}

  @Get('')
  index(@Res() res: Response) {
    return res.render('chat')
  }

  @Get(':id')
  fetchChatList(@Res() res: Response) {
    return res.render('chat')
  }
}
