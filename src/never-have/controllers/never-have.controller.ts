import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { NeverHave } from '../entities/never-have.entity.js';
import { CreateNeverHaveDto } from '../dto/create-never-have.dto.js';
import { ImportNeverHaveDto } from '../dto/import-never-have.dto.js';
import { NeverHaveService } from '../service/never-have.service.js';
import { UpdateNeverHaveDto } from '../dto/update-never-have.dto.js';
import { AdminAuthGuard } from '../../common/guards/admin-auth.guard.js';

@Controller('never-have')
export class NeverHaveController {
  constructor(private readonly neverHaveService: NeverHaveService) {}

  @Post("")
  @UseGuards(AdminAuthGuard)
  async createNeverHave(@Body() dto: CreateNeverHaveDto): Promise<NeverHave> {
    return this.neverHaveService.create(dto);
  }

  @Get("")
  async findAllNeverHave(
    @Query('page') page?: string,
    @Query('limit') limit?: string,
    @Query('modeId') modeId?: string,
    @Query('search') search?: string,
  ) {
    return this.neverHaveService.findAll(+(page ?? 1), +(limit ?? 50), modeId, search);
  }

  @Put(":id")
  @UseGuards(AdminAuthGuard)
  async updateNeverHave(
    @Param('id') id: string,
    @Body() dto: UpdateNeverHaveDto,
  ): Promise<NeverHave | null> {
    return this.neverHaveService.update(id, dto);
  }

  @Delete(":id")
  @UseGuards(AdminAuthGuard)
  async deleteNeverHave(@Param('id') id: string): Promise<void> {
    return this.neverHaveService.remove(id);
  }

  @Get("export")
  @UseGuards(AdminAuthGuard)
  async exportNeverHave(@Query('modeId') modeId?: string): Promise<NeverHave[]> {
    return this.neverHaveService.exportAll(modeId);
  }

  @Post("import")
  @UseGuards(AdminAuthGuard)
  async importNeverHave(@Body() dto: ImportNeverHaveDto) {
    return this.neverHaveService.bulkCreate(dto.questions);
  }
}
