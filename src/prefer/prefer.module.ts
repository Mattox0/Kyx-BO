import { Module } from '@nestjs/common';
import { PreferController } from './controllers/prefer.controller.js';
import { Prefer } from './entities/prefer.entity.js';

@Module({
  imports: [Prefer],
  controllers: [PreferController],
  providers: [],
  exports: []
})
export class PreferModule {}