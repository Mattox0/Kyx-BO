import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
  Query
} from '@nestjs/common';
import { AdminUserService } from '../service/admin-user.service.js';
import { AdminUser } from '../entities/admin-user.entity.js';
import { CreateAdminUserDto } from '../dto/create-admin-user.dto.js';
import { UpdateAdminUserDto } from '../dto/update-admin-user.dto.js';
import { AllowAnonymous } from '@thallesp/nestjs-better-auth';

@Controller('admin-user')
export class AdminUserController {
  constructor(private readonly adminUserService: AdminUserService) {}

  @Post("")
  @AllowAnonymous()
  async createAdminUser(@Body() dto: CreateAdminUserDto): Promise<AdminUser> {
    return this.adminUserService.create(dto);
  }

  @Get("")
  @AllowAnonymous()
  async findAll(
    @Query('page') page?: string,
    @Query('limit') limit?: string,
    @Query('search') search?: string,
  ) {
    return this.adminUserService.findAll(+(page ?? 1), +(limit ?? 50), search);
  }

  @Get(":id")
  async findOneAdminUser(@Param('id') id: string): Promise<AdminUser | null> {
    return this.adminUserService.findOne(id);
  }

  @Put(":id")
  async updateAdminUser(
    @Param('id') id: string,
    @Body() dto: UpdateAdminUserDto,
  ): Promise<AdminUser | null> {
    const adminUser = this.adminUserService.update(id, dto);
    if (!adminUser) throw new NotFoundException(`Admin user ${id} not found`);
    return adminUser;
  }

  @Delete(":id")
  async deleteAdminUser(@Param('id') id: string): Promise<void> {
    return this.adminUserService.remove(id);
  }
}
