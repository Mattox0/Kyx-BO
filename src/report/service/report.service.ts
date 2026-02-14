import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { Report } from '../entities/report.entity.js';
import { CreateReportDto } from '../dto/create-report.dto.js';
import { UpdateReportDto } from '../dto/update-report.dto.js';

@Injectable()
export class ReportService {
  constructor(private readonly dataSource: DataSource) {}

  async findAll(page: number, limit: number, search?: string) {
    const qb = this.dataSource
      .createQueryBuilder()
      .select('report')
      .from(Report, 'report')
      .leftJoinAndSelect('report.truthDare', 'truthDare')
      .leftJoinAndSelect('report.neverHave', 'neverHave')
      .leftJoinAndSelect('report.prefer', 'prefer')
      .leftJoinAndSelect('report.user', 'user');

    if (search) {
      qb.where('report.comment ILIKE :search', { search: `%${search}%` });
    }

    const [data, total] = await qb
      .orderBy('report.createdAt', 'DESC')
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

  async findOne(id: string): Promise<Report | null> {
    return this.dataSource
      .createQueryBuilder()
      .select('report')
      .from(Report, 'report')
      .leftJoinAndSelect('report.truthDare', 'truthDare')
      .leftJoinAndSelect('report.neverHave', 'neverHave')
      .leftJoinAndSelect('report.prefer', 'prefer')
      .leftJoinAndSelect('report.user', 'user')
      .where('report.id = :id', { id })
      .getOne();
  }

  async create(dto: CreateReportDto): Promise<Report> {
    const result = await this.dataSource
      .createQueryBuilder()
      .insert()
      .into(Report)
      .values({
        comment: dto.comment,
        reason: dto.reason,
        ...(dto.truthDareId ? { truthDare: { id: dto.truthDareId } } : {}),
        ...(dto.neverHaveId ? { neverHave: { id: dto.neverHaveId } } : {}),
        ...(dto.preferId ? { prefer: { id: dto.preferId } } : {}),
      })
      .returning('*')
      .execute();

    return result.raw[0];
  }

  async update(id: string, dto: UpdateReportDto): Promise<Report | null> {
    const updateData: any = {};

    if (dto.comment !== undefined) updateData.comment = dto.comment;
    if (dto.reason !== undefined) updateData.reason = dto.reason;
    if (dto.truthDareId !== undefined) updateData.truthDare = { id: dto.truthDareId };
    if (dto.neverHaveId !== undefined) updateData.neverHave = { id: dto.neverHaveId };
    if (dto.preferId !== undefined) updateData.prefer = { id: dto.preferId };

    if (Object.keys(updateData).length > 0) {
      await this.dataSource
        .createQueryBuilder()
        .update(Report)
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
      .from(Report)
      .where('id = :id', { id })
      .execute();
  }
}
