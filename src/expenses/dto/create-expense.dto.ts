import { ApiProperty } from "@nestjs/swagger";
import { IsIn, IsInt, IsNotEmpty } from "class-validator";
import { Vehicle } from "src/schemas/vehicle.schema";

export class CreateExpenseDto {
    @ApiProperty()
    @IsNotEmpty()
    expenseDate: string;
  
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
