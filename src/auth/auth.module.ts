import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { toNodeHandler } from 'better-auth/node';
import { User } from '../users/entities/user.entity.js';
import { Session } from './entities/session.entity.js';
import { Account } from './entities/account.entity.js';
import { createUserAuth } from '../lib/auth.js';

@Module({
  imports: [TypeOrmModule.forFeature([User, Session, Account])],
})
export class UserAuthModule implements NestModule {
  private handler: ReturnType<typeof toNodeHandler>;

  constructor(private readonly dataSource: DataSource) {
    const auth = createUserAuth(this.dataSource);
    this.handler = toNodeHandler(auth);
  }

  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply((req: any, res: any) => this.handler(req, res))
      .forRoutes('/api/auth/*path');
  }
}
