import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule as BetterAuthModule } from '@thallesp/nestjs-better-auth';
import { DataSource } from 'typeorm';
import { AdminUser } from '../admin-users/entities/admin-user.entity.js';
import { AdminSession } from './entities/admin-session.entity.js';
import { AdminAccount } from './entities/admin-account.entity.js';
import { createAdminAuth } from '../lib/admin-auth.js';

@Module({
  imports: [
    TypeOrmModule.forFeature([AdminUser, AdminSession, AdminAccount]),
    BetterAuthModule.forRootAsync({
      inject: [DataSource],
      useFactory: (dataSource: DataSource) => ({
        auth: createAdminAuth(dataSource),
        disableTrustedOriginsCors: true,
        disableGlobalAuthGuard: true,
      }),
    }),
  ],
})
export class AdminAuthModule {}