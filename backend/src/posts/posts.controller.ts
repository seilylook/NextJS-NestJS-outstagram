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
  // mainPosts: [
  //   {
  //     id: 1,
  //     User: {
  //       id: 1,
  //       nickname: "kim",
  //     },
  //     content: "첫 번째 게시글. #Next #Nest",
  //     Images: [
  //       {
  //         src: "https://cdn.pixabay.com/photo/2018/01/14/23/12/nature-3082832__340.jpg",
  //       },
  //       {
  //         src: "https://cdn.pixabay.com/photo/2016/11/29/05/45/astronomy-1867616__340.jpg",
  //       },
  //       {
  //         src: "https://cdn.pixabay.com/photo/2018/08/14/13/23/ocean-3605547__340.jpg",
  //       },
  //     ],
  //     Comments: [
  //       {
  //         id: 1,
  //         User: {
  //           id: 2,
  //           nickname: "lee",
  //         },
  //         content: "첫 댓글이다",
  //       },
  //       {
  //         id: 2,
  //         User: {
  //           id: 3,
  //           nickname: "park",
  //         },
  //         content: "두번째 댓글이다.",
  //       },
  //     ],
  //   },
  // ],

  @Get('/')
  async loadAllPosts() {
    return await this.postsService.loadAllPosts();
  }

  @Post('/')
  async addPost(@User() user, @Body() body) {
    return await this.postsService.addPost(user, body);
  }
}
