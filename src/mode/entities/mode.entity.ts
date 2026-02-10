import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import type { Relation } from 'typeorm';
import { NeverHave } from '../../never-have/entities/never-have.entity.js';
import { Prefer } from '../../prefer/entities/prefer.entity.js';
import { TruthDare } from '../../truth-dare/entities/truth-dare.entity.js';

@Entity("mode")
export class Mode extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn({ type: 'timestamp' })
  createdDate: Date;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'varchar', length: 255 })
  description: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  icon: string;

  @ManyToOne(() => NeverHave, (neverHave) => neverHave.modes, { onDelete: 'CASCADE' })
  neverHave: Relation<NeverHave>;

  @ManyToOne(() => Prefer, (prefer) => prefer.modes, { onDelete: 'CASCADE' })
  prefer: Relation<Prefer>;

  @ManyToOne(() => TruthDare, (truthDare) => truthDare.modes, { onDelete: 'CASCADE' })
  truthDare: Relation<TruthDare>;
}
