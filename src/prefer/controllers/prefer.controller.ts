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
import { CreatePreferDto } from '../dto/create-prefer.dto.js';
import { Prefer } from '../entities/prefer.entity.js';
import { PreferService } from '../service/prefer.service.js';
import { UpdatePreferDto } from '../dto/update-prefer.dto.js';

@Controller('prefer')
export class PreferController {
  constructor(private readonly preferService: PreferService) {}

  @Post("")
  async createPrefer(@Body() dto: CreatePreferDto): Promise<Prefer> {
    return this.preferService.create(dto);
  }

  @Get("")
  async findAllPrefer(
    @Query('page') page?: string,
    @Query('limit') limit?: string,
    @Query('modeId') modeId?: string,
  ) {
    return this.preferService.findAll(+(page ?? 1), +(limit ?? 50), modeId);
  }

  @Put(":id")
  async updatePrefer(
    @Param('id') id: string,
    @Body() dto: UpdatePreferDto,
  ): Promise<Prefer | null> {
    return this.preferService.update(id, dto);
  }

  @Delete(":id")
  async deletePrefer(@Param('id') id: string): Promise<void> {
    return this.preferService.remove(id);
  }
}