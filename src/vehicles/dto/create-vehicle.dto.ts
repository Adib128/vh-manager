import { IsDate, IsDateString, IsEnum, IsInt, IsNotEmpty } from "class-validator";
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'src/vehicles/enums/type.enum';
import { ConsumptionType } from 'src/vehicles/enums/consumption.enum';
import { FuelType } from 'src/vehicles/enums/fuel.enum';
import { Transmission } from 'src/vehicles/enums/transmission.enum';

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

    @ApiProperty({enum: Type})
    @IsNotEmpty()
    @IsEnum(Type)
    type: Type;

    @ApiProperty()
    @IsEnum(ConsumptionType)
    consumptionType: ConsumptionType;

    @ApiProperty()
    @IsEnum(FuelType)
    fuelType: FuelType;

    @ApiProperty()
    @IsEnum(Transmission)
    transmission: Transmission;
    
    @ApiProperty()
    @IsDateString()
    purchaseDate: Date;

}
