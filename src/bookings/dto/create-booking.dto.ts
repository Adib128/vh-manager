import { ApiProperty } from "@nestjs/swagger";
import { IsDate, IsInt, IsNotEmpty } from "class-validator";
import { Customer } from "src/schemas/customer.schema";
import { Driver } from "src/schemas/driver.schema";
import { Vehicle } from "src/schemas/vehicle.schema";

export class CreateBookingDto {
    
    @ApiProperty()
    @IsNotEmpty()
    fillDate: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsInt()
    amount: number;

    @ApiProperty()
    @IsNotEmpty()
    customer: Customer;

    @ApiProperty()
    @IsNotEmpty()
    vehicle: Vehicle;
  
    @ApiProperty()
    @IsNotEmpty()
    driver: Driver;
}
