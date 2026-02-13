import { PartialType } from '@nestjs/mapped-types';
import { CreateModeDto } from './create-mode.dto.js';

export class UpdateModeDto extends PartialType(CreateModeDto)  {}
