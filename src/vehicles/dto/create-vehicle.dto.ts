import { IsDate, IsDateString, IsInt, IsNotEmpty } from "class-validator";

export class CreateVehicleDto {
    
    @IsNotEmpty()
    registrationNumber: string;

    @IsNotEmpty()
    make: string;

    @IsNotEmpty()
    model: string;

    @IsDateString()
    purchaseDate: Date;

}
