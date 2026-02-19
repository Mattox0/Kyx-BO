import { Injectable, NotFoundException } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { Suggestion } from '../entities/suggestion.entity.js';
import { CreateSuggestionDto } from '../dto/create-suggestion.dto.js';
import { UpdateSuggestionDto } from '../dto/update-suggestion.dto.js';
import { Mode } from '../../mode/entities/mode.entity.js';

@Injectable()
export class SuggestionService {
  constructor(private readonly dataSource: DataSource) {}

  async findAll(page: number, limit: number, resolved?: string, search?: string) {
    const qb = this.dataSource
      .createQueryBuilder()
      .select('suggestion')
      .from(Suggestion, 'suggestion')
      .leftJoinAndSelect('suggestion.mode', 'mode');

    if (resolved) {
      qb.where('suggestion.resolved = :resolved', { resolved: resolved });
    }

    if (search) {
      qb.andWhere(
        '(suggestion.question ILIKE :search OR CAST(suggestion.id AS TEXT) ILIKE :search)',
        { search: `%${search}%` },
      );
    }

    const [data, total] = await qb
      .orderBy('suggestion.createdAt', 'DESC')
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

  async findOne(id: string): Promise<Suggestion | null> {
    return this.dataSource
      .createQueryBuilder()
      .select('suggestion')
      .from(Suggestion, 'suggestion')
      .leftJoinAndSelect('suggestion.mode', 'mode')
      .where('suggestion.id = :id', { id })
      .getOne();
  }

  async create(dto: CreateSuggestionDto): Promise<Suggestion> {
    try {
      const result = await this.dataSource
        .createQueryBuilder()
        .insert()
        .into(Suggestion)
        .values({
          content: dto.content,
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

  async update(id: string, dto: UpdateSuggestionDto): Promise<Suggestion | null> {
    const { modeId, ...rest } = dto;
    try {
      await this.dataSource
        .createQueryBuilder()
        .update(Suggestion)
        .set({
          ...rest,
          ...(modeId !== undefined && { mode: { id: modeId } as Mode }),
        })
        .where('id = :id', { id })
        .execute();

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
      .from(Suggestion)
      .where('id = :id', { id })
      .execute();
  }
}
