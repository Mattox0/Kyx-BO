import {
  IsNotEmpty,
  IsString,
} from 'class-validator';

export class CreateAdminUserDto {
  @IsString()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsString()
  @IsNotEmpty()
  displayName: string;
}
