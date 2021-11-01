import { ApiProperty } from "@nestjs/swagger";
import { IsDate, IsEmail, IsInt, IsNotEmpty } from "class-validator";

export class CreateDriverDto {
    
    @ApiProperty()
    @IsNotEmpty()
    @IsInt()
    registrationNumber: string;
  
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
    @IsInt()
    licenseNo: number;
  
    @ApiProperty()
    @IsNotEmpty()
    @IsDate()
    expDate: Date;
}
