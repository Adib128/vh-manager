import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsDate, IsIn, IsInt, IsNotEmpty } from 'class-validator';

export class CreateFuelDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsInt()
  quantity: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsInt()
  price: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsInt()
  odometerValue: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsDate()
  @Type(() => Date)
  fillDate: Date;

  @ApiProperty()
  @IsInt()
  @IsNotEmpty()
  vehicleId: number;

  @ApiProperty()
  @IsInt()
  @IsNotEmpty()
  driverId: number;
}
