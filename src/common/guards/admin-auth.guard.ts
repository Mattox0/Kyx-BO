import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { fromNodeHeaders } from 'better-auth/node';
import { createAdminAuth } from '../../lib/admin-auth.js';

@Injectable()
export class AdminAuthGuard implements CanActivate {
  private auth: ReturnType<typeof createAdminAuth>;

  constructor(private readonly dataSource: DataSource) {
    this.auth = createAdminAuth(this.dataSource);
  }

  async canActivate(context: ExecutionContext): boolean | Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const session = await this.auth.api.getSession({
      headers: fromNodeHeaders(request.headers),
    });

    if (!session) {
      throw new UnauthorizedException();
    }

    request.session = session;
    request.user = session.user;
    return true;
  }
}
