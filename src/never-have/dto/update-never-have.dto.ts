import { PartialType } from '@nestjs/mapped-types';
import { CreateNeverHaveDto } from './create-never-have.dto.js';

export class UpdateNeverHaveDto extends PartialType(CreateNeverHaveDto) {}
