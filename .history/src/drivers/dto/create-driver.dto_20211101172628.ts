import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsInt, IsNotEmpty } from "class-validator";

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
    
    @Prop()
    licenseNo: number;
  
    @Prop()
    expDate: Date;
}
