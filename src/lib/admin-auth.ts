import { betterAuth } from 'better-auth';
import { admin } from 'better-auth/plugins';
import { typeormAdapter } from 'better-auth-typeorm-adapter';
import { DataSource } from 'typeorm';
import { AdminUser } from '../admin-users/entities/admin-user.entity.js';
import { AdminSession } from '../auth/entities/admin-session.entity.js';
import { AdminAccount } from '../auth/entities/admin-account.entity.js';

export const createAdminAuth = (dataSource: DataSource) => {
  return betterAuth({
    basePath: '/api/admin/auth',
    database: typeormAdapter({
      dataSource,
      debugLogs: process.env.NODE_ENV === 'development',
      entities: {
        user: AdminUser,
        session: AdminSession,
        account: AdminAccount,
      },
    }),
    emailAndPassword: {
      enabled: true,
      requireEmailVerification: false,
    },
    session: {
      expiresIn: 60 * 60 * 24 * 7 * 30,
      updateAge: 60 * 60 * 24,
    },
    trustedOrigins: [
      process.env.ADMIN_FRONTEND_URL || 'http://localhost:3000',
    ],
    plugins: [admin()],
  });
};