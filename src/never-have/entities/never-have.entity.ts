import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { NeverHaveMode } from './never-have-mode.entity.js';

@Entity("never-have")
export class NeverHave extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', unique: true, nullable: false })
  question: string;

  @CreateDateColumn({ type: 'timestamp' })
  createdDate: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedDate: Date;

  @ManyToOne(() => NeverHaveMode, (mode) => mode.neverHaves, { nullable: false })
  @JoinColumn({ name: 'modeId' })
  mode: NeverHaveMode;
}
