import { ConflictException, Injectable } from '@nestjs/common';
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
    private jwtService: JwtService
  ) {}

   async signUp(loginDto: LoginDto): Promise<User>{
    const { username , password}  = loginDto ; 
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = {
      username: username,
      password: hashedPassword
    }
    try {
      await new this.userModel(user).save();
      return user;
    } catch (error) {
      if (error.code === 11000) {
        throw new ConflictException('User already exists');
      }
      throw error;
    }
  }

  async signIn(loginDto: LoginDto) {
    const user = await this.userModel.findOne({ username: loginDto.username });
    const payload = { username: loginDto.username, sub: user._id};
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

}
