import { Injectable, NotFoundException } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { CreateNeverHaveDto } from '../dto/create-never-have.dto.js';
import { NeverHave } from '../entities/never-have.entity.js';
import { UpdateNeverHaveDto } from '../dto/update-never-have.dto.js';
import { Mode } from '../../mode/entities/mode.entity.js';

@Injectable()
export class NeverHaveService {
  constructor(private readonly dataSource: DataSource) {}

  async findAll(page: number, limit: number, modeId?: string) {
    const qb = this.dataSource
      .createQueryBuilder()
      .select('neverHave')
      .from(NeverHave, 'neverHave')
      .leftJoinAndSelect('neverHave.mode', 'mode');

    if (modeId) {
      qb.where('mode.id = :modeId', { modeId });
    }

    const [data, total] = await qb
      .skip((page - 1) * limit)
      .take(limit)
      .getManyAndCount();

    const totalPages = Math.ceil(total / limit);

    return {
      data,
      total,
      page,
      totalPages,
      hasPreviousPage: page > 1,
      hasNextPage: page < totalPages,
    };
  }

  async findOne(id: string): Promise<NeverHave | null> {
    return this.dataSource
      .createQueryBuilder()
      .select('neverHave')
      .from(NeverHave, 'neverHave')
      .leftJoinAndSelect('neverHave.mode', 'mode')
      .where('neverHave.id = :id', { id })
      .getOne();
  }

  async create(dto: CreateNeverHaveDto): Promise<NeverHave> {
    try {
      const result = await this.dataSource
        .createQueryBuilder()
        .insert()
        .into(NeverHave)
        .values({
          question: dto.question,
          mode: { id: dto.modeId },
        })
        .returning('*')
        .execute();

      return result.raw[0];
    } catch (error) {
      if (error.code === '23503') {
        throw new NotFoundException(`Mode with id "${dto.modeId}" not found`);
      }
      throw error;
    }
  }

  async update(id: string, dto: UpdateNeverHaveDto): Promise<NeverHave | null> {
    try {
      const updateData: Partial<NeverHave> = {};

      if (dto.question !== undefined) {
        updateData.question = dto.question;
      }

      if (dto.modeId !== undefined) {
        updateData.mode = { id: dto.modeId } as Mode;
      }

      if (Object.keys(updateData).length > 0) {
        await this.dataSource
          .createQueryBuilder()
          .update(NeverHave)
          .set(updateData)
          .where('id = :id', { id: id })
          .execute();
      }

      return this.findOne(id);
    } catch (error) {
      if (error.code === '23503') {
        throw new NotFoundException(`Mode with id "${dto.modeId}" not found`);
      }
      throw error;
    }
  }

  async remove(id: string): Promise<void> {
    await this.dataSource
      .createQueryBuilder()
      .delete()
      .from(NeverHave)
      .where('id = :id', { id })
      .execute();
  }
}
