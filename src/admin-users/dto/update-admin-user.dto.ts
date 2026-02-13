import { PartialType } from '@nestjs/mapped-types';
import { CreateAdminUserDto } from './create-admin-user.dto.js';

export class UpdateAdminUserDto extends PartialType(CreateAdminUserDto) {}
