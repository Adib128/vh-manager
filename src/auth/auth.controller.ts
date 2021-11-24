import { Body, Request, Controller, Get, Post, UseGuards, HttpCode, Put } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { User } from 'src/schemas/user.schema';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { LocalAuthGuard } from './guards/local-auth.guard';

@Controller('auth')
@ApiTags('User')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/signup')
  async signup(@Body() loginDto: LoginDto){
    return this.authService.signUp(loginDto);
  }

  @UseGuards(LocalAuthGuard)
  @Post('signin')
  @HttpCode(200)
  async signIn(@Body() loginDto: LoginDto) {
    return this.authService.signIn(loginDto);
  }


  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access-token')
  @Post('profile/edit')
  @HttpCode(200)
  async edit(@Request() req) {
    return this.authService.edit(req.user._id,req.body);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access-token')
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }

}
