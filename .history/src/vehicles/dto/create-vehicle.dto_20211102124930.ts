import { IsDate, IsDateString, IsInt, IsNotEmpty } from "class-validator";
import { ApiProperty } from '@nestjs/swagger';

export class CreateVehicleDto {
    
    @ApiProperty()
    @IsNotEmpty()
    registrationNumber: string;

    @ApiProperty()
    @IsNotEmpty()
    make: string;

    @ApiProperty()
    @IsNotEmpty()
    model: string;
    
    @ApiProperty()
    purchaseDate: string;

}
