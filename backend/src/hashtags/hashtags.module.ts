import { Module } from '@nestjs/common';
import { HashtagsController } from './hashtags.controller';
import { HashtagsService } from './hashtags.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Posts } from '../entities/Posts';
import { Hashtags } from '../entities/Hashtags';
import { Posthashtag } from '../entities/Posthashtag';
import { NestjsFormDataModule } from 'nestjs-form-data';

@Module({
  controllers: [HashtagsController],
  providers: [HashtagsService],
  imports: [
    TypeOrmModule.forFeature([Posts, Hashtags, Posthashtag]),
    NestjsFormDataModule,
  ],
})
export class HashtagsModule {}
