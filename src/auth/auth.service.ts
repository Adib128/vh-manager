import {
  BadRequestException,
  Body,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcrypt';
import { Prisma, PrismaClient } from '@prisma/client';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaClient, private jwtService: JwtService) {}

  // Register user
  async signUp(loginDto: LoginDto) {
    try {
      // Create new user
      const user = await this.prisma.user.create({
        data: await this.transformUser(loginDto),
      });
      // Create payload for jwt
      const payload = { username: loginDto.username, sub: user.id };
      return {
        // Sign JWT and get access token
        accessToken: this.jwtService.sign(payload),
      };
    } catch (e) {
      // Check if error is coming from prisma client
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        // Check if the user exists by the error code P2002
        if (e.code === 'P2002') {
          throw new ConflictException('User is already exist');
        }
      }
      throw new BadRequestException('Error on user record creating');
    }
  }
  // Login user
  async signIn(loginDto: LoginDto) {
    try {
      // Query user with username
      const user = await this.prisma.user.findFirst({
        where: { username: loginDto.username }
      });
      // Create payload
      const payload = { username: loginDto.username, sub: user.id };
      return {
        // Sign JWT and get access token
        accessToken: this.jwtService.sign(payload),
      };
    } catch (e) {
      throw new NotFoundException(`User not found`);
    }
  }
  
  // Validate user
  async validateUser(username: string, password: string) {
    
    const user = await this.prisma.user.findFirst({
      where: { username: username }
    });
    // Check if user is null
    if (!user) {
      return null;
    }
    // Compare password with bcrypt
    const valid = await bcrypt.compare(password, user.password);
    if (valid) {
      return user;
    }
    return null;
  }

  // Return user information by ID
  async profile(id: number){
    try {
      // Query user iformation
      const user = await this.prisma.user.findUnique({
        where: {
          id,
        },
      });
      return user;
    } catch (error) {
      throw new NotFoundException(`User with the ID ${id} is not found`);
    }
  }

  // Edit user profile
  async edit(id: number, @Body() body) {
    try {
      // Get user information
      const user = await this.profile(id);
      // Compare old password with new password
      const valid = await bcrypt.compare(body.oldPassword, user.password);
      if (!valid) {
        return { success: false, error: 'Old password incorrect' };
      }
      // Hash new password
      body.newPassword = await bcrypt.hash(body.newPassword, 10);
      return { success: true };
    } catch (error) {
      throw new NotFoundException(`User with the ID ${id} is not found`);
    }
  }

  // Return user object with hashed password
  async transformUser(loginDto: LoginDto) {
    // Get username and password from loginDto
    const { username, password } = loginDto;
    // Hash password with bcrypt
    const hashedPassword = await bcrypt.hash(password, 10);
    // Object user with hashed password
    return {
      username: username,
      password: hashedPassword,
    };
  }
}
