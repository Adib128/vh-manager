import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsDate, IsEmail, IsInt, IsNotEmpty } from "class-validator";

export class CreateDriverDto {
    
    @ApiProperty()
    @IsNotEmpty()
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
    @Type(() => Date)
    @IsDate()
    expDate: Date;
}
