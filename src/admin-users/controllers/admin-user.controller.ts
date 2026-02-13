import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
  Query,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { AdminUserService } from '../service/admin-user.service.js';
import { AdminUser } from '../entities/admin-user.entity.js';
import { CreateAdminUserDto } from '../dto/create-admin-user.dto.js';
import { UpdateAdminUserDto } from '../dto/update-admin-user.dto.js';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { FileInterceptor } from '@nestjs/platform-express';

const multerOptions = {
  storage: diskStorage({
    destination: './uploads/users',
    filename: (_req, file, cb) => {
      const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
      cb(null, `${uniqueSuffix}${extname(file.originalname)}`);
    },
  }),
};

@Controller('admin-user')
export class AdminUserController {
  constructor(private readonly adminUserService: AdminUserService) {}

  @Post("")
  @UseInterceptors(FileInterceptor('profilePicture', multerOptions))
  async createAdminUser(@Body() dto: CreateAdminUserDto, @UploadedFile() file?: Express.Multer.File,): Promise<AdminUser> {
    const profilePicturePath = file ? file.path : undefined;
    if (!profilePicturePath) {
      throw new BadRequestException('Invalid profile picture');
    }
    return this.adminUserService.create(dto, profilePicturePath);
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
  async findOneAdminUser(@Param('id') id: string): Promise<AdminUser | null> {
    return this.adminUserService.findOne(id);
  }

  @Put(":id")
  @UseInterceptors(FileInterceptor('profilePicture', multerOptions))
  async updateAdminUser(
    @Param('id') id: string,
    @Body() dto: UpdateAdminUserDto,
    @UploadedFile() file?: Express.Multer.File,
  ): Promise<AdminUser | null> {
    const profilePicturePath = file ? file.path : undefined;
    const adminUser = this.adminUserService.update(id, dto, profilePicturePath);
    if (!adminUser) throw new NotFoundException(`Admin user ${id} not found`);
    return adminUser;
  }

  @Delete(":id")
  async deleteAdminUser(@Param('id') id: string): Promise<void> {
    return this.adminUserService.remove(id);
  }
}
