import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { SuggestionService } from '../service/suggestion.service.js';
import { Suggestion } from '../entities/suggestion.entity.js';
import { CreateSuggestionDto } from '../dto/create-suggestion.dto.js';
import { UpdateSuggestionDto } from '../dto/update-suggestion.dto.js';

@Controller('suggestion')
export class SuggestionController {
  constructor(private readonly suggestionService: SuggestionService) {}

  @Post()
  async createSuggestion(@Body() dto: CreateSuggestionDto): Promise<Suggestion> {
    // METTRE LE USER CONNECTE SI IL L'EST
    return this.suggestionService.create(dto);
  }

  @Get()
  async findAllSuggestions(
    @Query('page') page?: string,
    @Query('limit') limit?: string,
    @Query('resolved') resolved?: string,
    @Query('search') search?: string,
  ) {
    return this.suggestionService.findAll(+(page ?? 1), +(limit ?? 50), resolved, search);
  }

  @Get(':id')
  async findOneSuggestion(@Param('id') id: string): Promise<Suggestion | null> {
    return this.suggestionService.findOne(id);
  }

  @Put(':id')
  async updateSuggestion(
    @Param('id') id: string,
    @Body() dto: UpdateSuggestionDto,
  ): Promise<Suggestion | null> {
    return this.suggestionService.update(id, dto);
  }

  @Delete(':id')
  async deleteSuggestion(@Param('id') id: string): Promise<void> {
    return this.suggestionService.remove(id);
  }
}
