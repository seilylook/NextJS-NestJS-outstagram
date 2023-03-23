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

  @Get('/')
  async loadAllPosts() {
    const result = await this.postsService.loadAllPosts();
  }

  @Post('/')
  async addPost(@User() user, @Body() body) {
    // console.log('글내용', body.content);
    // const result = {
    //   content: body.content,
    //   User: {
    //     id: user.id,
    //     nickname: user.nickname,
    //   },
    //   Images: body.image,
    //   Comments: [],
    // };

    await this.postsService.addPost(user.id, body);
  }
}
