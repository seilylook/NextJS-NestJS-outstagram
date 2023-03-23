import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Posts } from '../entities/Posts';
import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';

@Module({
  controllers: [PostsController],
  providers: [PostsService],
  imports: [TypeOrmModule.forFeature([Posts])],
})
export class PostsModule {}
