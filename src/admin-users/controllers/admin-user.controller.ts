import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
  Query,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { AdminUserService } from '../service/admin-user.service.js';
import { AdminUser } from '../entities/admin-user.entity.js';
import { CreateAdminUserDto } from '../dto/create-admin-user.dto.js';
import { UpdateAdminUserDto } from '../dto/update-admin-user.dto.js';
import { AdminAuthGuard } from '../../common/guards/admin-auth.guard.js';

@Controller('admin-user')
export class AdminUserController {
  constructor(
    private readonly adminUserService: AdminUserService,
    private readonly jwtService: JwtService,
  ) {}

  @Post("login")
  async login(@Body() body: { email: string; password: string }) {
    const user = await this.adminUserService.findByEmail(body.email);
    if (!user || !user.password) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordValid = await bcrypt.compare(body.password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const token = await this.jwtService.signAsync({
      sub: user.id,
      email: user.email,
    });

    return { access_token: token };
  }

  @Post("")
  async createAdminUser(@Body() dto: CreateAdminUserDto): Promise<AdminUser> {
    return this.adminUserService.create(dto);
  }

  @Get("")
  async findAll(
    @Query('page') page?: string,
    @Query('limit') limit?: string,
    @Query('search') search?: string,
  ) {
    return this.adminUserService.findAll(+(page ?? 1), +(limit ?? 50), search);
  }

  @Get(":id")
  @UseGuards(AdminAuthGuard)
  async findOneAdminUser(@Param('id') id: string): Promise<AdminUser | null> {
    return this.adminUserService.findOne(id);
  }

  @Put(":id")
  @UseGuards(AdminAuthGuard)
  async updateAdminUser(
    @Param('id') id: string,
    @Body() dto: UpdateAdminUserDto,
  ): Promise<AdminUser | null> {
    const adminUser = this.adminUserService.update(id, dto);
    if (!adminUser) throw new NotFoundException(`Admin user ${id} not found`);
    return adminUser;
  }

  @Delete(":id")
  @UseGuards(AdminAuthGuard)
  async deleteAdminUser(@Param('id') id: string): Promise<void> {
    return this.adminUserService.remove(id);
  }
}
