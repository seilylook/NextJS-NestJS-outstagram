import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';
import { User } from '../common/decoratos/user.decorator';
import { PostsService } from './posts.service';

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
@Controller('posts')
export class PostsController {
  constructor(private postsService: PostsService) {}

  // 모든 게시물 가져오기
  @Get('/')
  async loadAllPosts() {
    return await this.postsService.loadAllPosts();
  }

  // 게시글 작성
  @Post('/')
  async addPost(@User() user, @Body() body) {
    return await this.postsService.addPost(user, body);
  }

  // 댓글 작성
  @Post(':id/comment')
  async addComment(@Param('id') id: number, @User() user, @Body() body) {
    return await this.postsService.addComment(user, body);
  }

  @Patch(':id/like')
  async like(@Param('id') id: number, @User() user) {
    // console.log('사용자정보', user);
    // console.log('게시글 정보', id);
    return await this.postsService.like(id, user);
  }

  @Delete(':id/like')
  async unlike(@Param('id') id: number, @User() user) {
    return await this.postsService.unlike(id, user);
  }
}
