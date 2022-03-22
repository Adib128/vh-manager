import {
  BadRequestException,
  Body,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { SigninDto } from './dto/signin.dto';
import * as bcrypt from 'bcrypt';
import { Prisma, PrismaClient } from '@prisma/client';
import { SignupDto } from './dto/signup.dto';
import { EditDto } from './dto/edit.dto';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaClient, private jwtService: JwtService) {}

  // Register user
  async signUp(signupDto: SignupDto) {
    try {
      // Create new user
      const user = await this.prisma.user.create({
        data: await this.transformUser(signupDto),
      });
      // Create payload for jwt
      const payload = { username: signupDto.username, sub: user.id };
      return {
        // Sign JWT and get access token
        accessToken: this.jwtService.sign(payload),
      };
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        if (e.code === 'P2002') {
          throw new ConflictException('User is already exist');
        }
      }
      throw new BadRequestException('Error on user creating');
    }
  }
  // Login user
  async signIn(signinDto: SigninDto) {
    try {
      const user = await this.prisma.user.findFirst({
        where: { username: signinDto.username },
      });
      const valid = await bcrypt.compare(signinDto.password, user.password);
      if (valid) {
        // Create payload and sign JWT access token
        const payload = { username: signinDto.username, sub: user.id };
        return {
          accessToken: this.jwtService.sign(payload),
        };
      }
    } catch (e) {
      throw new NotFoundException(`User not found`);
    }
  }

  // Validate user
  async validateUser(username: string, password: string) {
    const user = await this.prisma.user.findFirst({
      where: { username: username },
    });
    if (!user) {
      return null;
    }
    const valid = await bcrypt.compare(password, user.password);
    if (valid) {
      return user;
    }
    return null;
  }

  // Return user information by ID
  async profile(id: number) {
    try {
      let user = await this.prisma.user.findUnique({
        where: {
          id,
        },
      });
      return this.exclude(user, 'password');
    } catch (error) {
      throw new NotFoundException(`User with the ID ${id} is not found`);
    }
  }

  // Edit user profile
  async edit(id: number, editDto: EditDto) {
    try {
      await this.prisma.user.update({
        where: { id },
        data: editDto,
      });
      return await this.profile(id);
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        if (e.code === 'P2025') {
          throw new NotFoundException(`User not found`);
        }
      }
      throw new BadRequestException('Error on user updating');
    }
  }

  // Return user object with hashed password
  async transformUser(signupDto: SignupDto) {
    const { name, email, username, password } = signupDto;
    // Hash password with bcrypt
    const hashedPassword = await bcrypt.hash(password, 10);
    return {
      name,
      email,
      username,
      password: hashedPassword,
    };
  }

  // Exclude keys from user
  exclude<User, Key extends keyof User>(
    user: User,
    ...keys: Key[]
  ): Omit<User, Key> {
    for (let key of keys) {
      delete user[key];
    }
    return user;
  }
}
