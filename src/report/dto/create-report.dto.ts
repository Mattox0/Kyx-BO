import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ReportReason } from '../../../types/enums/ReportReason.js';

export class CreateReportDto {
  @IsString()
  @IsNotEmpty()
  comment: string;

  @IsEnum(ReportReason)
  reason: ReportReason;

  @IsString()
  @IsOptional()
  truthDareId?: string;

  @IsString()
  @IsOptional()
  neverHaveId?: string;

  @IsString()
  @IsOptional()
  preferId?: string;
}
