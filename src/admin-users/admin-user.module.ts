import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminUser } from './entities/admin-user.entity.js';
import { AdminUserController } from './controllers/admin-user.controller.js';

@Module({
  imports: [TypeOrmModule.forFeature([AdminUser])],
  controllers: [AdminUserController],
  providers: [],
  exports: [],
})
export class AdminUserModule {}
