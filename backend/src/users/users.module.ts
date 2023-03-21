import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

import { Users } from '../entities/Users';
import { Posts } from '../entities/Posts';
import { Follow } from '../entities/Follow';

@Module({
  controllers: [UsersController],
  providers: [UsersService],
  imports: [TypeOrmModule.forFeature([Users, Posts, Follow])],
})
export class UsersModule {}
