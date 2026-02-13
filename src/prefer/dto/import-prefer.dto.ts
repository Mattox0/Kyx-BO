import { Type } from 'class-transformer';
import { IsArray, IsNotEmpty, IsString, ValidateNested } from 'class-validator';

export class ImportPreferItemDto {
  @IsString()
  @IsNotEmpty()
  choiceOne: string;

  @IsString()
  @IsNotEmpty()
  choiceTwo: string;

  @IsString()
  @IsNotEmpty()
  modeId: string;
}

export class ImportPreferDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ImportPreferItemDto)
  questions: ImportPreferItemDto[];
}
