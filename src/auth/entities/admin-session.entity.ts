import {
  Entity,
  PrimaryColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { AdminUser } from '../../admin-users/entities/admin-user.entity.js';

@Entity('admin-session')
export class AdminSession {
  @PrimaryColumn({ type: 'varchar' })
  id: string;

  @Column({ type: 'timestamp' })
  expiresAt: Date;

  @Column({ type: 'varchar', unique: true })
  token: string;

  @Column({ type: 'varchar', nullable: true })
  ipAddress: string;

  @Column({ type: 'varchar', nullable: true })
  userAgent: string;

  @Column({ type: 'varchar', nullable: true })
  impersonatedBy: string | null;

  @Column({ type: 'varchar' })
  userId: string;

  @ManyToOne(() => AdminUser, (user) => user.sessions, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'userId' })
  user: AdminUser;
}