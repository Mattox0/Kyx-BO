import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Suggestion } from './entities/suggestion.entity.js';
import { SuggestionController } from './controllers/suggestion.controller.js';
import { SuggestionService } from './service/suggestion.service.js';

@Module({
  imports: [TypeOrmModule.forFeature([Suggestion])],
  controllers: [SuggestionController],
  providers: [SuggestionService],
  exports: [SuggestionService],
})
export class SuggestionModule {}
