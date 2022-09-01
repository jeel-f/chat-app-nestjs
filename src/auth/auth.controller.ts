import { Controller, Get, Post, Body, Res, HttpStatus, UseFilters, UsePipes } from '@nestjs/common';
import { Response } from 'express';
import { User } from 'src/interface/user.interface';
import { MongoExceptionFilter } from 'src/provider/mongo-exception.filter';
import { UsersService } from 'src/users/users.service';
import { AuthDto } from './dto/create-auth.dto';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Controller('auth')
export class AuthController {
  constructor(private readonly userService: UsersService, private jwtService: JwtService) { }

  @Get('login')
  login(@Res() res: Response) {
    return res.render('login')
  }
  @Post('login')
  async userLogin(@Res() res: Response, @Body() AuthDto: AuthDto) {
    const userData = await this.userService.findUserByEmail({ email: AuthDto.email });
    if (!userData) return res.status(HttpStatus.NOT_FOUND).send();
    const hashedPassword = await bcrypt.compare(AuthDto.password, userData.password);
    if (!hashedPassword) return res.status(HttpStatus.UNAUTHORIZED).json({ error: 'Incorrect Password', message: 'Incorrect Password' });
    const access_token = this.jwtService.sign({ _id: userData._id, email: userData.email })
    return res.status(HttpStatus.FOUND).json({ ...userData.toJSON(), access_token });
  }
  @Get('register')
  render(@Res() res: Response) {
    return res.render('register')
  }
  @Post('register')
  @UseFilters(MongoExceptionFilter)
  async create(@Res() res: Response, @Body() AuthDto: AuthDto) {
    const saltOrRounds = 10;
    const hashedPassword = await bcrypt.hash(AuthDto.password, saltOrRounds);
    const obj = {
      email: AuthDto.email,
      password: hashedPassword
    }
    const newUser = await this.userService.insertUser(obj as User);
    if (newUser) {
      return res.status(HttpStatus.CREATED).json(newUser);
    }
    return res.status(HttpStatus.BAD_REQUEST).send();
  }
}


