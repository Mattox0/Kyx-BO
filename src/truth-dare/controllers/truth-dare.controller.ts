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
import { TruthDareService } from '../service/truth-dare.service.js';
import { TruthDare } from '../entities/truth-dare.entity.js';
import { CreateTruthDareDto } from '../dto/create-truth-dare.dto.js';
import { ImportTruthDareDto } from '../dto/import-truth-dare.dto.js';
import { UpdateTruthDareDto } from '../dto/update-truth-dare.dto.js';

@Controller('truth-dare')
export class TruthDareController {
  constructor(private readonly truthDareService: TruthDareService) {}

  @Post("")
  async createTruthDare(@Body() dto: CreateTruthDareDto): Promise<TruthDare> {
    return this.truthDareService.create(dto);
  }

  @Get("")
  async findAllTruthDare(
    @Query('page') page?: string,
    @Query('limit') limit?: string,
    @Query('modeId') modeId?: string,
    @Query('search') search?: string,
  ) {
    return this.truthDareService.findAll(+(page ?? 1), +(limit ?? 50), modeId, search);
  }

  @Put(":id")
  async updateTruthDare(
    @Param('id') id: string,
    @Body() dto: UpdateTruthDareDto,
  ): Promise<TruthDare | null> {
    return this.truthDareService.update(id, dto);
  }

  @Delete(":id")
  async deleteTruthDare(@Param('id') id: string): Promise<void> {
    return this.truthDareService.remove(id);
  }

  @Get("export")
  async exportTruthDare(@Query('modeId') modeId?: string): Promise<TruthDare[]> {
    return this.truthDareService.exportAll(modeId);
  }

  @Post("import")
  async importTruthDare(@Body() dto: ImportTruthDareDto) {
    return this.truthDareService.bulkCreate(dto.questions);
  }
}