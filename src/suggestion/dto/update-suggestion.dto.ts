import { PartialType } from '@nestjs/mapped-types';
import { CreateSuggestionDto } from './create-suggestion.dto.js';
import { IsBoolean, IsOptional } from 'class-validator';

export class UpdateSuggestionDto extends PartialType(CreateSuggestionDto) {
  @IsOptional()
  @IsBoolean()
  resolved: boolean;
}
