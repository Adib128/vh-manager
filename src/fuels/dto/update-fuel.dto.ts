import { PartialType } from '@nestjs/swagger';
import { CreateFuelDto } from './create-fuel.dto';

export class UpdateFuelDto extends PartialType(CreateFuelDto) {}
