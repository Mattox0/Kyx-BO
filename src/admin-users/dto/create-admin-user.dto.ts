import {
  IsEmail,
  IsNotEmpty,
  IsString,
} from 'class-validator';

export class CreateAdminUserDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsString()
  @IsNotEmpty()
  displayName: string;
}
