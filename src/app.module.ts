import { Module } from '@nestjs/common';
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
        entities: [TruthDare, Prefer, NeverHave, Mode],
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
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}