import { Controller, Get, Param, Query, Body, Req } from '@nestjs/common';
import { User } from '../common/decoratos/user.decorator';
import { HashtagsService } from './hashtags.service';
import { FormDataRequest } from 'nestjs-form-data';

@Controller('hashtags')
export class HashtagsController {
  constructor(private hashtagService: HashtagsService) {}

  // 해시태그 가져오기
  @Get('/:tag')
  async loadHashtagPosts(@Param('tag') tag: string, @Query() query) {
    const lastId = parseInt(query.lastId, 10);
    return await this.hashtagService.getHashtagPosts(tag, lastId);
  }
}
