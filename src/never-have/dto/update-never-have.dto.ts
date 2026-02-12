import {
  IsString,
} from 'class-validator';

export class UpdateNeverHaveDto {
  @IsString()
  question: string;

  @IsString()
  modeId: string;
}
