import { Body, Request, Controller, Get, Post, UseGuards, HttpCode, Put, ClassSerializerInterceptor, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { ChangePasswordDto } from './dto/change-password.dto';
import { EditDto } from './dto/edit.dto';
import { SigninDto } from './dto/signin.dto';
import { SignupDto } from './dto/signup.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { LocalAuthGuard } from './guards/local-auth.guard';

@Controller('auth')
@ApiTags('User')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/signup')
  async signup(@Body() signupDto: SignupDto) {
    return this.authService.signUp(signupDto);
  }

  @UseGuards(LocalAuthGuard)
  @Post('signin')
  @HttpCode(200)
  async signIn(@Body() signinDto: SigninDto) {
    return this.authService.signIn(signinDto);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access-token')
  @Get('profile')
  @UseInterceptors(ClassSerializerInterceptor)
  getProfile(@Request() req) {
    return this.authService.profile(req.user.id);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access-token')
  @Put('edit')
  updateProfile(@Request() req, @Body() editDto: EditDto) {
    return this.authService.edit(req.user.id, editDto);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access-token')
  @Put('password')
  changePassword(@Request() req, @Body() changePasswordDto: ChangePasswordDto) {
    return this.authService.changePassword(req.user.id, changePasswordDto);
  }
}
