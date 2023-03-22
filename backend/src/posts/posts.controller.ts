import {
  Controller,
  Get,
  Post,
  Delete,
  Patch,
  Req,
  Body,
} from '@nestjs/common';
import { User } from '../common/decoratos/user.decorator';
import { PostsService } from './posts.service';

@Controller('posts')
export class PostsController {
  constructor(private postsService: PostsService) {}

  // --- mainPosts---
  // id: data.id,
  // content: data.content,
  // User: {
  //   id: 1,
  //   nickname: "kim",
  // },
  // Images: [],
  // Comments: [],
  @Post('/')
  addPost(@User() user, @Body() body) {
    console.log('유저데이터', user);
    console.log('게시물데이터', body);

    const result = {
      content: body.content,
      User: {
        id: user.id,
        nickname: user.nickname,
      },
      Images: body.image,
      Comments: [],
    };

    console.log(result);
  }
}
