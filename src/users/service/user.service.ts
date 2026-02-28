import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { User } from '../entities/user.entity.js';
import { UpdateUserDto } from '../dto/update-user.dto.js';

@Injectable()
export class UserService {
  constructor(private readonly dataSource: DataSource) {}

  async findAll(page: number, limit: number, search?: string) {
    const qb = this.dataSource
      .createQueryBuilder()
      .select('user')
      .from(User, 'user');

    if (search) {
      qb.where(
        '(user.name ILIKE :search OR user.email ILIKE :search)',
        { search: `%${search}%` },
      );
    }

    const [data, total] = await qb
      .orderBy('user.createdAt', 'DESC')
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

  async findOne(id: string): Promise<User | null> {
    return this.dataSource
      .createQueryBuilder()
      .select('user')
      .from(User, 'user')
      .where('user.id = :id', { id })
      .getOne();
  }

  async update(id: string, dto: UpdateUserDto): Promise<User | null> {
    const updateData: Partial<User> = {};

    if (dto.name !== undefined) updateData.name = dto.name;
    if (dto.image !== undefined) updateData.image = dto.image;
    if (dto.gender !== undefined) updateData.gender = dto.gender;
    if (dto.avatarOptions !== undefined) updateData.avatarOptions = dto.avatarOptions;

    if (Object.keys(updateData).length > 0) {
      await this.dataSource
        .createQueryBuilder()
        .update(User)
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
      .from(User)
      .where('id = :id', { id })
      .execute();
  }
}
