import { ApiProperty } from "@nestjs/swagger";
import { IsDate, IsInt, IsNotEmpty } from "class-validator";
import { Customer } from "src/schemas/customer.schema";
import { Driver } from "src/schemas/driver.schema";
import { Vehicle } from "src/schemas/vehicle.schema";
import { Location } from "src/schemas/booking.schema";
import { Type } from 'class-transformer';
export class CreateBookingDto {

    @ApiProperty()
    @IsNotEmpty()
    fromPoint: Location;

    @ApiProperty()
    @IsNotEmpty()
    toPoint: Location;
    
    @ApiProperty()
    @IsNotEmpty()
    @Type(() => Date)
    @IsDate()
    bookingDate: Date;

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
