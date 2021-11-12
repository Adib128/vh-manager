import { IsEmail, IsIn, IsInt, IsNotEmpty, MaxLength, MinLength } from "class-validator";
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
    
    @IsNotEmpty()
    @ApiProperty()
    username: string;

    @IsNotEmpty()
    @MinLength(6, { message: 'Password is too short (8 characters min)' })
    @MaxLength(20, { message: 'Password is too long (20 characters max)' })
    @ApiProperty()
    password: string;
  }