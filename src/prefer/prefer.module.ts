import { Module } from '@nestjs/common';
import { PreferController } from './controllers/prefer.controller.js';
import { Prefer } from './entities/prefer.entity.js';
import { PreferMode } from './entities/prefer-mode.entity.js';

@Module({
  imports: [Prefer, PreferMode],
  controllers: [PreferController],
  providers: [],
  exports: []
})
export class PreferModule {}