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
import { PreferMode } from './prefer-mode.entity.js';

@Entity("prefer")
export class Prefer extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', unique: false, nullable: false })
  choiceOne: string;

  @Column({ type: 'varchar', unique: false, nullable: false })
  choiceTwo: string;

  @CreateDateColumn({ type: 'timestamp' })
  createdDate: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedDate: Date;

  @ManyToOne(() => PreferMode, (mode) => mode.prefers, { nullable: false })
  @JoinColumn({ name: 'modeId' })
  mode: PreferMode;
}
