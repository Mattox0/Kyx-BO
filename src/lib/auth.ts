import { betterAuth } from 'better-auth';
import { typeormAdapter } from 'better-auth-typeorm-adapter';
import { DataSource } from 'typeorm';
import { User } from '../users/entities/user.entity.js';
import { Session } from '../auth/entities/session.entity.js';
import { Account } from '../auth/entities/account.entity.js';

export const createUserAuth = (dataSource: DataSource) => {
  return betterAuth({
    basePath: '/api/auth',
    database: typeormAdapter({
      dataSource,
      debugLogs: process.env.NODE_ENV === 'development',
      entities: {
        user: User,
        session: Session,
        account: Account,
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
      process.env.MOBILE_APP_URL || 'http://localhost:8081',
    ],
  });
};