import { Module } from '@nestjs/common';
import { NeverHaveController } from './controllers/never-have.controller.js';
import { NeverHaveService } from './service/never-have.service.js';
import { Prefer } from '../prefer/entities/prefer.entity.js';
import { NeverHave } from './entities/never-have.entity.js';

@Module({
  imports: [NeverHave],
  controllers: [NeverHaveController],
  providers: [NeverHaveService],
  exports: [NeverHaveService]
})
export class NeverHaveModule {}
