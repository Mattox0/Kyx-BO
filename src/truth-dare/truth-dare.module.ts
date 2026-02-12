import { Module } from '@nestjs/common';
import { TruthDareController } from './controllers/truth-dare.controller.js';
import { TruthDare } from './entities/truth-dare.entity.js';
import { TruthDareService } from './service/truth-dare.service.js';

@Module({
  imports: [TruthDare],
  controllers: [TruthDareController],
  providers: [TruthDareService],
  exports: [TruthDareService]
})
export class TruthDareModule {}