import { PartialType } from '@nestjs/swagger';
import { SignupDto } from './signup.dto';

export class EditDto extends PartialType(SignupDto) {}
