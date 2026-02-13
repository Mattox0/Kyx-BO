import {
  Controller,
} from '@nestjs/common';
import { AdminUserService } from '../service/admin-user.service.js';

@Controller('admin-user')
export class AdminUserController {
  constructor(private readonly adminUserService: AdminUserService) {}
}