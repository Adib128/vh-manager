
import {
  IsNotEmpty,
  MaxLength,
  MinLength,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Match } from '../decorators/match.decorator';

export class ChangePasswordDto {
  @IsNotEmpty()
  @ApiProperty()
  oldPassword: string;

  @IsNotEmpty()
  @MinLength(6, { message: 'Password is too short (8 characters min)' })
  @MaxLength(20, { message: 'Password is too long (20 characters max)' })
  @ApiProperty()
  password: string;

  @ApiProperty()
  @IsNotEmpty()
  @Match('password', {
    message: 'Password and confirm password does not match',
  })
  passwordConfirm: string;
}
