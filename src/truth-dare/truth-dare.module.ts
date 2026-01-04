import { Module } from '@nestjs/common';
import { TruthDareController } from './controllers/truth-dare.controller.js';
import { TruthDare } from './entities/truth-dare.entity.js';
import { TruthDareMode } from './entities/truth-dare-mode.entity.js';

@Module({
  imports: [TruthDare, TruthDareMode],
  controllers: [TruthDareController],
  providers: [],
  exports: []
})
export class TruthDareModule {}