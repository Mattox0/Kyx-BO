import { PartialType } from '@nestjs/mapped-types';
import { CreatePreferDto } from './create-prefer.dto.js';

export class UpdatePreferDto extends PartialType(CreatePreferDto) {}
