import { Module } from '@nestjs/common';
import { PreferController } from './controllers/prefer.controller.js';
import { Prefer } from './entities/prefer.entity.js';
import { PreferService } from './service/prefer.service.js';

@Module({
  imports: [Prefer],
  controllers: [PreferController],
  providers: [PreferService],
  exports: []
})
export class PreferModule {}