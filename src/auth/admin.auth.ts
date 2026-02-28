import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Global, Module } from '@nestjs/common';

@Global()
@Module({
  imports: [
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_ADMIN_SECRET'),
        signOptions: { expiresIn: '7d' },
      }),
    }),
  ],
  exports: [JwtModule],
})
export class AdminAuthModule {}
