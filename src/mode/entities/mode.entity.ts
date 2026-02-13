import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { GameType } from '../../../types/enums/GameType.js';

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

  @Column({
    type: 'enum',
    enum: GameType,
  })
  gameType: GameType;
}
