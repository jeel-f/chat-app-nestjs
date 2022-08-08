import { Controller, Get, Post, Body, Patch, Param, Delete, Res, HttpStatus, UseFilters } from '@nestjs/common';
import { Response } from 'express';
import { User } from 'src/interface/user.interface';
import { MongoExceptionFilter } from 'src/provider/mongo-exception.filter';
import { UsersService } from 'src/users/users.service';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService, private readonly userService: UsersService) { }

  @Get('login')
  login(@Res() res: Response) {
    return res.render('login')
  }

  @Get('register')
  render(@Res() res: Response) {
    return res.render('register')
  }

  @Post('register')
  @UseFilters(MongoExceptionFilter)
  async create(@Res() res: Response, @Body() AuthDto: AuthDto) {
    const newUser = await this.userService.insertUser(AuthDto as User);
    if (newUser) {
      return res.status(HttpStatus.CREATED).json(newUser);
    }
    return res.status(HttpStatus.BAD_REQUEST).send();
  }

  @Get()
  findAll() {
    return this.authService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.authService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAuthDto: UpdateAuthDto) {
    return this.authService.update(+id, updateAuthDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.authService.remove(+id);
  }
}
