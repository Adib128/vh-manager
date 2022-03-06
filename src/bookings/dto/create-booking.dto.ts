import { ApiProperty } from "@nestjs/swagger";
import { IsDate, IsInt, IsNotEmpty } from "class-validator";
import { Type } from 'class-transformer';

export class CreateBookingDto {
  @ApiProperty()
  @IsNotEmpty()
  fromAddress: string;

  @ApiProperty()
  @IsNotEmpty()
  toAddress: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsInt()
  distance: number;

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
  customerId: number;

  @ApiProperty()
  @IsNotEmpty()
  vehicleId: number;

  @ApiProperty()
  @IsNotEmpty()
  driverId: number;
}
