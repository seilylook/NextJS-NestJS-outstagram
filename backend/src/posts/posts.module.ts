import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';
import { Posts } from '../entities/Posts';
import { Comments } from '../entities/Comments';
import { NestjsFormDataModule } from 'nestjs-form-data';
import { MulterModule } from '@nestjs/platform-express';
import { multerOptionsFactory } from '../common/utils/multer.options.factory';

@Module({
  controllers: [PostsController],
  providers: [PostsService],
  imports: [
    TypeOrmModule.forFeature([Posts, Comments]),
    NestjsFormDataModule,
    MulterModule.registerAsync({
      useFactory: multerOptionsFactory,
    }),
  ],
})
export class PostsModule {}
