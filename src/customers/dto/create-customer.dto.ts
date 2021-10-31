import { IsEmail, IsIn, IsInt, IsNotEmpty } from "class-validator";
import { ApiProperty } from '@nestjs/swagger';

export class CreateCustomerDto {
  
  @ApiProperty()
  @IsNotEmpty()  
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsEmail()  
  email: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsInt()
  phoneNumber: number;

  @ApiProperty()
  @IsNotEmpty()
  address: string;
}
