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
import { Gender } from '../../../types/enums/Gender.js';
import { ChallengeType } from '../../../types/enums/TruthDareChallengeType.js';
import { TruthDareMode } from './truth-dare-mode.entity.js';

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
  genre: Gender;

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

  @ManyToOne(() => TruthDareMode, (mode) => mode.truthDares, { nullable: false })
  @JoinColumn({ name: 'modeId' })
  mode: TruthDareMode;
}
