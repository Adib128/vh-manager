import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsDate, IsEmpty, IsInt, IsNotEmpty, IsOptional } from "class-validator";

export class SearchFuelDto {
  @ApiProperty()
  @IsOptional()
  @IsInt()
  vehicleId: number;

  @ApiProperty()
  @IsOptional()
  @IsInt()
  driverId: number;

  @ApiProperty()
  @Type(() => Date)
  @IsDate()
  @IsOptional()
  fillDate: Date;
}