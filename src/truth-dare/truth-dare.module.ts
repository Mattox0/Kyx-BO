import { Module } from '@nestjs/common';
import { TruthDareController } from './controllers/truth-dare.controller.js';
import { TruthDare } from './entities/truth-dare.entity.js';

@Module({
  imports: [TruthDare],
  controllers: [TruthDareController],
  providers: [],
  exports: []
})
export class TruthDareModule {}