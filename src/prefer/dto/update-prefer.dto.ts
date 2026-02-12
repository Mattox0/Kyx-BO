import {
  IsString,
} from 'class-validator';

export class UpdatePreferDto {
  @IsString()
  choiceOne: string;

  @IsString()
  choiceTwo: string;

  @IsString()
  modeId: string;
}
