import { Injectable, NotFoundException } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { Mode } from '../entities/mode.entity.js';
import { CreateModeDto } from '../dto/create-mode.dto.js';
import { UpdateModeDto } from '../dto/update-mode.dto.js';
import { GameType } from '../../../types/enums/GameType.js';

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
    const gameTypeMap: Record<string, GameType> = {
      'never-have': GameType.NEVER_HAVE,
      'prefer': GameType.PREFER,
      'truth-dare': GameType.TRUTH_DARE,
    };

    const gameType = gameTypeMap[gameName];
    if (!gameType) {
      throw new NotFoundException(`Game type "${gameName}" not found`);
    }

    return this.dataSource
      .createQueryBuilder()
      .select('mode')
      .from(Mode, 'mode')
      .where('mode.gameType = :gameType', { gameType })
      .getMany();
  }

  async update(id: string, dto: UpdateModeDto, iconPath?: string): Promise<Mode | null> {
    await this.dataSource
      .createQueryBuilder()
      .update(Mode)
      .set({ ...dto, ...(iconPath !== undefined ? { iconPath } : {}) })
      .where('id = :id', { id })
      .execute();

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
