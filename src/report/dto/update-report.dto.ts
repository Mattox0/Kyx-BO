import { PartialType } from '@nestjs/mapped-types';
import { CreateReportDto } from './create-report.dto.js';
import { IsBoolean, IsOptional } from 'class-validator';

export class UpdateReportDto extends PartialType(CreateReportDto) {
  @IsOptional()
  @IsBoolean()
  resolved: boolean;
}
