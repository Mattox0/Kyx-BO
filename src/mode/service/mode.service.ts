import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { Mode } from '../entities/mode.entity.js';
import { CreateModeDto } from '../dto/create-mode.dto.js';
import { UpdateModeDto } from '../dto/update-mode.dto.js';

@Injectable()
export class ModeService {
  constructor(private readonly dataSource: DataSource) {}

  async create(dto: CreateModeDto, iconPath?: string): Promise<Mode> {
    const result = await this.dataSource
      .createQueryBuilder()
      .insert()
      .into(Mode)
      .values({
        ...dto,
        icon: iconPath ?? undefined,
      })
      .returning('*')
      .execute();

    return result.raw[0];
  }

  async findAll(): Promise<Mode[]> {
    return this.dataSource
      .createQueryBuilder()
      .select('mode')
      .from(Mode, 'mode')
      .getMany();
  }

  async findOne(id: string): Promise<Mode | null> {
    return this.dataSource
      .createQueryBuilder()
      .select('mode')
      .from(Mode, 'mode')
      .where('mode.id = :id', { id })
      .getOne();
  }

  async findByGame(gameName: string): Promise<Mode[]> {
    const columnMap: Record<string, string> = {
      'never-have': 'mode.neverHaveId',
      'prefer': 'mode.preferId',
      'truth-dare': 'mode.truthDareId',
    };

    const column = columnMap[gameName];
    if (!column) return [];

    return this.dataSource
      .createQueryBuilder()
      .select('mode')
      .from(Mode, 'mode')
      .where(`${column} IS NOT NULL`)
      .getMany();
  }

  async update(id: string, dto: UpdateModeDto, iconPath?: string): Promise<Mode | null> {
    const updateData: Partial<Mode> = {};

    if (dto.name !== undefined) updateData.name = dto.name;
    if (dto.description !== undefined) updateData.description = dto.description;
    if (iconPath !== undefined) updateData.icon = iconPath;

    if (Object.keys(updateData).length > 0) {
      await this.dataSource
        .createQueryBuilder()
        .update(Mode)
        .set(updateData)
        .where('id = :id', { id })
        .execute();
    }

    return this.findOne(id);
  }

  async remove(id: string): Promise<void> {
    await this.dataSource
      .createQueryBuilder()
      .delete()
      .from(Mode)
      .where('id = :id', { id })
      .execute();
  }
}
