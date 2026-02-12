import {
  IsNotEmpty,
  IsString,
} from 'class-validator';

export class CreatePreferDto {
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
