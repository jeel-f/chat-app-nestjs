import { Controller, Get, Res } from '@nestjs/common';
import { ChatsService } from './chats.service';

@Controller('chats')
export class ChatsController {
  constructor(private readonly chatsService: ChatsService) {}

  @Get(':id')
  fetchChatList(@Res() res: Response) {
    
  }
}