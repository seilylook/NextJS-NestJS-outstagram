import { Controller, Get, Param, Query, Body, Req } from '@nestjs/common';
import { User } from '../common/decoratos/user.decorator';
import { HashtagsService } from './hashtags.service';
import { FormDataRequest } from 'nestjs-form-data';

@Controller('hashtags')
export class HashtagsController {
  constructor(private hashtagService: HashtagsService) {}

  // 해시태그 가져오기
  @Get('/:tag')
  async loadHashtagPosts(@Param('tag') param: string, @Query() query) {
    console.log('--------');
    console.log(param);
    const tag = decodeURIComponent(param);
    console.log('태그 내용', tag);

    console.log('lastId', query.lastId);
    console.log('--------');
  }
}
