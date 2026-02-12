import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import type { Relation } from 'typeorm';
import { Gender } from '../../../types/enums/Gender.js';
import { ChallengeType } from '../../../types/enums/TruthDareChallengeType.js';
import { Mode } from '../../mode/entities/mode.entity.js';

@Entity("truth-dare")
export class TruthDare extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', unique: true, nullable: false })
  text: string;

  @Column({
    type: 'enum',
    enum: Gender,
    nullable: false,
    default: Gender.ALL,
  })
  gender: Gender;

  @Column({
    type: 'enum',
    enum: ChallengeType,
    nullable: false,
    default: ChallengeType.ACTION,
  })
  type: ChallengeType;

  @CreateDateColumn({ type: 'timestamp' })
  createdDate: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedDate: Date;

  @ManyToOne(() => Mode, { onDelete: 'CASCADE' })
  mode: Relation<Mode>;
}
