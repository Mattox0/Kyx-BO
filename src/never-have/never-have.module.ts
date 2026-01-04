import { Module } from '@nestjs/common';
import { NeverHaveController } from './controllers/never-have.controller.js';
import { NeverHave } from './entities/never-have.entity.js';
import { NeverHaveMode } from './entities/never-have-mode.entity.js';

@Module({
  imports: [NeverHave, NeverHaveMode],
  controllers: [NeverHaveController],
  providers: [],
  exports: []
})
export class NeverHaveModule {}
