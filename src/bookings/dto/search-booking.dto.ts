import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsInt, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';

export class SearchBookingDto {
  @ApiProperty()
  @IsOptional()
  @Type(() => Date)
  @IsDate()
  bookingDate: Date;

  @ApiProperty()
  @IsOptional()
  @IsInt()
  customerId: number;

  @ApiProperty()
  @IsOptional()
  @IsInt()
  vehicleId: number;

  @ApiProperty()
  @IsOptional()
  @IsInt()
  driverId: number;
}
