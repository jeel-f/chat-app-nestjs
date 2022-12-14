import { Controller, Get, Render, Res } from '@nestjs/common';
import { Response } from 'express';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(@Res() res: Response): void {
    return res.render('index')
  }
  @Get('home')
  getHome(@Res() res: Response): void {
    return res.render('index')
  }
}
