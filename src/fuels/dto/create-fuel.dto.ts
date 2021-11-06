import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsIn, IsInt, IsNotEmpty } from 'class-validator';
import { Driver } from 'src/schemas/driver.schema';
import { Vehicle } from 'src/schemas/vehicle.schema';

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
  fillDate: Date;

  @ApiProperty()
  @IsNotEmpty()
  vehicle: Vehicle;

  @ApiProperty()
  @IsNotEmpty()
  driver: Driver;
}
