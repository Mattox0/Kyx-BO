import { Type } from 'class-transformer';
import { IsArray, IsNotEmpty, IsString, ValidateNested } from 'class-validator';

export class ImportNeverHaveItemDto {
  @IsString()
  @IsNotEmpty()
  question: string;

  @IsString()
  @IsNotEmpty()
  modeId: string;
}

export class ImportNeverHaveDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ImportNeverHaveItemDto)
  questions: ImportNeverHaveItemDto[];
}
