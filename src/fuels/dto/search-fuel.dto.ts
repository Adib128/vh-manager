import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsDate, IsEmpty, IsInt, IsNotEmpty } from "class-validator";
import { EmptyError } from "rxjs";

export class SearchFuelDto {

    @ApiProperty()
    @IsEmpty()
    vehicle: string;

    @ApiProperty()
    @IsEmpty()
    driver: string;

    @ApiProperty()
    @Type(() => Date)
    @IsDate()
    startDate: Date;

    @ApiProperty()
    @Type(() => Date)
    @IsDate()
    endDate: Date;
}