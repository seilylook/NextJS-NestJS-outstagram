import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';
import { Posts } from '../entities/Posts';
import { Comments } from '../entities/Comments';
import { NestjsFormDataModule } from 'nestjs-form-data';

@Module({
  controllers: [PostsController],
  providers: [PostsService],
  imports: [TypeOrmModule.forFeature([Posts, Comments]), NestjsFormDataModule],
})
export class PostsModule {}
