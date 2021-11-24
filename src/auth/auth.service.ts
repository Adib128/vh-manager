import {
  Body,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from 'src/schemas/user.schema';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private jwtService: JwtService,
  ) {}

  async signUp(loginDto: LoginDto){
    const { username, password } = loginDto;
    let newUser;
    let user ; 
    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      user = {
        username: username,
        password: hashedPassword,
      };
      newUser = await new this.userModel(user).save();
      const payload = { username: loginDto.username, sub: newUser._id };
      return {
        accessToken: this.jwtService.sign(payload),
      };
    } catch (error) {
      if (error.code === 11000) {
        throw new ConflictException('User already exists');
      }
      throw error;
    }
  }

  async signIn(loginDto: LoginDto) {
    const user = await this.userModel.findOne({ username: loginDto.username });
    const payload = { username: loginDto.username, sub: user._id };
    return {
      accessToken: this.jwtService.sign(payload),
    };
  }

  async validateUser(username: string, password: string): Promise<User> {
    const user = await this.userModel.findOne({ username });
    if (!user) {
      return null;
    }
    const valid = await bcrypt.compare(password, user.password);
    if (valid) {
      return user;
    }
    return null;
  }

  async edit(id: string, @Body() body) {
    let userObject;
    try {
      userObject = await this.userModel.findById(id).exec();
      const valid = await bcrypt.compare(body.oldPassword, userObject.password);
      if (!valid) {
        return { success: false, error: 'Old password incorrect' };
      }
      body.newPassword = await bcrypt.hash(body.newPassword, 10);
      await this.userModel
        .findByIdAndUpdate(
          id,
          {
            username: body.username,
            password: body.newPassword,
          },
          { new: true },
        )
        .exec();
      return { success: true };
    } catch (error) {
      throw new NotFoundException(`User with the ID ${id} is not found`);
    }
  }
}
