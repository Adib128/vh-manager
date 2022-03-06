import { ApiProperty } from "@nestjs/swagger";
import { Type } from 'class-transformer';
import { IsDate, IsEnum, IsInt, IsNotEmpty } from "class-validator";
import { ExpenseType } from "../enums/type.enum";

export class CreateExpenseDto {
  @ApiProperty()
  @IsNotEmpty()
  @Type(() => Date)
  @IsDate()
  expenseDate: Date;

  @ApiProperty()
  @IsEnum(ExpenseType)
  expenseType: ExpenseType;

  @ApiProperty()
  @IsNotEmpty()
  @IsInt()
  amount: number;

  @ApiProperty()
  @IsNotEmpty()
  description: string;

  @ApiProperty()
  @IsNotEmpty()
  vehicleId: number;
}
