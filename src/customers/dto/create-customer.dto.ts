import { IsEmail, IsIn, IsInt, IsNotEmpty } from "class-validator";

export class CreateCustomerDto {
  
  @IsNotEmpty()  
  name: string;

  @IsNotEmpty()
  @IsEmail()  
  email: string;

  @IsNotEmpty()
  @IsInt()
  phoneNumber: number;

  @IsNotEmpty()
  address: string;
}
