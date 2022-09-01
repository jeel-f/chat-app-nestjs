import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { UsersModule } from 'src/users/users.module';
import { JwtModule } from '@nestjs/jwt';
@Module({
  imports: [UsersModule,  JwtModule.register({
    secret: 'chatApp',
    signOptions: { expiresIn: '30d' },
  })],
  controllers: [AuthController],
  providers: []
})
export class AuthModule { }
