import { Injectable } from '@nestjs/common';
import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { DataSource } from 'typeorm';
import { Mode } from '../../mode/entities/mode.entity.js';

@Injectable()
@ValidatorConstraint({ async: true })
export class ModeExistsConstraint implements ValidatorConstraintInterface {
  constructor(private readonly dataSource: DataSource) {}

  async validate(id: string): Promise<boolean> {
    const uuidRegex =
      /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
    if (!uuidRegex.test(id)) return false;

    const mode = await this.dataSource
      .createQueryBuilder()
      .select('mode.id')
      .from(Mode, 'mode')
      .where('mode.id = :id', { id })
      .getOne();

    return !!mode;
  }

  defaultMessage(): string {
    return 'Mode does not exist';
  }
}

export function ModeExists(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName,
      options: validationOptions,
      constraints: [],
      validator: ModeExistsConstraint,
    });
  };
}
