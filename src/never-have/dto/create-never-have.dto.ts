import {
  IsNotEmpty,
  IsString,
} from 'class-validator';

export class CreateNeverHaveDto {
  @IsString()
  @IsNotEmpty()
  question: string;

  @IsString()
  @IsNotEmpty()
  modeId: string;
}
