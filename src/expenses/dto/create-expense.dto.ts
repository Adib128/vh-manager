import { ApiProperty } from "@nestjs/swagger";
import { Type } from 'class-transformer';
import { IsDate, IsInt, IsNotEmpty } from "class-validator";
import { Vehicle } from "src/schemas/vehicle.schema";

export class CreateExpenseDto {
    @ApiProperty()
    @IsNotEmpty()
    @Type(() => Date)
    @IsDate()
    expenseDate: Date;
  
    @ApiProperty()
    @IsNotEmpty()
    @IsInt()
    amount: number;
  
    @ApiProperty()
    @IsNotEmpty()
    description: string;
  
    @ApiProperty()
    @IsNotEmpty()
    vehicle: Vehicle;
}
