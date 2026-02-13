import { CreateTruthDareDto } from './create-truth-dare.dto.js';
import { PartialType } from '@nestjs/mapped-types';

export class UpdateTruthDareDto extends PartialType(CreateTruthDareDto) {}
