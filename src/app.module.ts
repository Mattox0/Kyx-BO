import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleAsyncOptions } from '@nestjs/typeorm';
import { TruthDareModule } from './truth-dare/truth-dare.module.js';
import { DataSource } from 'typeorm';
import { TruthDare } from './truth-dare/entities/truth-dare.entity.js';
import { TruthDareMode } from './truth-dare/entities/truth-dare-mode.entity.js';
import { NeverHaveModule } from './never-have/never-have.module.js';
import { PreferModule } from './prefer/prefer.module.js';
import { Prefer } from './prefer/entities/prefer.entity.js';
import { PreferMode } from './prefer/entities/prefer-mode.entity.js';
import { NeverHave } from './never-have/entities/never-have.entity.js';
import { NeverHaveMode } from './never-have/entities/never-have-mode.entity.js';
import {
  adminJsBranding,
  adminJsResources,
} from './admin/admin.config.js';

const DEFAULT_ADMIN = {
  email: 'mattox@gmail.com',
  password: 'admin123',
};

const authenticate = async (email: string, password: string) => {
  if (email === DEFAULT_ADMIN.email && password === DEFAULT_ADMIN.password) {
    return Promise.resolve(DEFAULT_ADMIN);
  }
  return null;
};

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
        entities: [TruthDare, TruthDareMode, Prefer, PreferMode, NeverHave, NeverHaveMode],
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
    import('@adminjs/nestjs').then(async ({ AdminModule }) => {
      const AdminJSTypeorm = await import('@adminjs/typeorm');
      const AdminJS = (await import('adminjs')).default;

      AdminJS.registerAdapter({
        Database: AdminJSTypeorm.Database,
        Resource: AdminJSTypeorm.Resource,
      });

      return AdminModule.createAdminAsync({
        inject: [DataSource],
        useFactory: (dataSource: DataSource) => ({
          adminJsOptions: {
            rootPath: '/admin',
            resources: adminJsResources,
            databases: [dataSource],
            branding: adminJsBranding,
          },
          /* auth: {
            authenticate,
            cookieName: 'adminjs',
            cookiePassword: 'some-secret-password-used-to-secure-cookie',
          },
          sessionOptions: {
            resave: true,
            saveUninitialized: true,
            secret: 'some-secret-session-key',
          }, */
        }),
      });
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}