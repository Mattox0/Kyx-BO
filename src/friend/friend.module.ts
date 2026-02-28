import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Friend } from './entities/friend.entity.js';

@Module({
  imports: [TypeOrmModule.forFeature([Friend])],
  controllers: [],
  providers: [],
  exports: [],
})
export class FriendModule {}
