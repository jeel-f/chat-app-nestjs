import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/interface/user.interface';

@Injectable()
export class UsersService {
  constructor(@InjectModel('user') private readonly userModel: Model<User>) { }

  async getAllUsers() {
    return this.userModel.find({})
  }

  async insertUser(data: User) {
    const newUser = new this.userModel(data);
    return await newUser.save();
  }

  async findUserByEmail(data: { email: string}) {
    return await this.userModel.findOne(data);
  }


}
