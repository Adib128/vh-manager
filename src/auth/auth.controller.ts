import { Body, Request, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { User } from 'src/schemas/user.schema';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { LocalAuthGuard } from './guards/local-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/signup')
  async signup(@Body() loginDto: LoginDto): Promise<User>{
    return this.authService.signUp(loginDto);
  }

  @UseGuards(LocalAuthGuard)
  @Post('signin')
  async signIn(@Body() loginDto: LoginDto) {
    return this.authService.signIn(loginDto);
  }

}
