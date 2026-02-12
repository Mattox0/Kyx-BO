import {
  IsEnum,
  IsNotEmpty,
  IsString,
} from 'class-validator';
import { GameType } from '../../../types/enums/GameType.js';

export class CreateModeDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsEnum(GameType)
  @IsNotEmpty()
  gameType: GameType;
}
