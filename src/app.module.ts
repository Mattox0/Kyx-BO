import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { LoggerMiddleware } from './common/middleware/logger.middleware.js';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleAsyncOptions } from '@nestjs/typeorm';
import { TruthDareModule } from './truth-dare/truth-dare.module.js';
import { TruthDare } from './truth-dare/entities/truth-dare.entity.js';
import { NeverHaveModule } from './never-have/never-have.module.js';
import { PreferModule } from './prefer/prefer.module.js';
import { Prefer } from './prefer/entities/prefer.entity.js';
import { NeverHave } from './never-have/entities/never-have.entity.js';
import { Mode } from './mode/entities/mode.entity.js';
import { ModeModule } from './mode/mode.module.js';
import { AdminUser } from './admin-users/entities/admin-user.entity.js';
import { AdminUserModule } from './admin-users/admin-user.module.js';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env', '.env.local'],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('POSTGRES_HOST'),
        port: configService.get<number>('POSTGRES_PORT'),
        username: configService.get<string>('POSTGRES_USER'),
        password: configService.get<string>('POSTGRES_PASSWORD'),
        database: configService.get<string>('POSTGRES_DATABASE'),
        entities: [TruthDare, Prefer, NeverHave, Mode, AdminUser],
        autoLoadEntities: true,
        synchronize: true, // remove prod
        extra: {
          ssl: configService.get('POSTGRES_SSL') === 'true',
        },
      }),
      inject: [ConfigService],
    } as TypeOrmModuleAsyncOptions),
    TruthDareModule,
    NeverHaveModule,
    PreferModule,
    ModeModule,
    AdminUserModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}