import { Module } from '@nestjs/common';
import { HashtagsController } from './hashtags.controller';
import { HashtagsService } from './hashtags.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Hashtags } from '../entities/Hashtags';
import { NestjsFormDataModule } from 'nestjs-form-data';

@Module({
  controllers: [HashtagsController],
  providers: [HashtagsService],
  imports: [TypeOrmModule.forFeature([Hashtags]), NestjsFormDataModule],
})
export class HashtagsModule {}
