import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { Gender } from '../../../types/enums/Gender.js';
import { ChallengeType } from '../../../types/enums/TruthDareChallengeType.js';

export class UpdateTruthDareDto {
  @IsString()
  text: string;

  @IsEnum(Gender)
  gender: Gender;

  @IsEnum(ChallengeType)
  type: ChallengeType;

  @IsString()
  modeId: string;
}
