import { Module } from '@nestjs/common';
import { NeverHaveController } from './controllers/never-have.controller.js';
import { NeverHave } from './entities/never-have.entity.js';

@Module({
  imports: [NeverHave],
  controllers: [NeverHaveController],
  providers: [],
  exports: []
})
export class NeverHaveModule {}
