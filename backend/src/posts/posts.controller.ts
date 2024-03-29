import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
  UseInterceptors,
  UploadedFiles,
  Query,
} from '@nestjs/common';
import { User } from '../common/decoratos/user.decorator';
import { PostsService } from './posts.service';
import { FilesInterceptor } from '@nestjs/platform-express';
import { FormDataRequest } from 'nestjs-form-data';
import { FormDataTestDto } from '../common/dto/FormDataTestDto';

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
  async loadAllPosts(@Query() query) {
    // console.log(query);
    // { lastId: '0' }
    const lastId = parseInt(query.lastId, 10);
    return await this.postsService.loadAllPosts(lastId);
  }

  // 특정 게시물 가져오기
  @Get('/:id')
  async loadSinglePost(@Param('id') id: number) {
    return await this.postsService.loadSinglePost(id);
  }

  // 사용자가 작성한 게시글 모두 가져오기
  @Get('/:userId/posts')
  async getUserPosts(@Param('userId') userId: number, @Query() query) {
    const lastId = parseInt(query.lastId, 10);
    console.log('사용자 아이디', userId);

    return await this.postsService.getUserPosts(userId, lastId);
  }

  // 게시글 작성
  @Post('/')
  @FormDataRequest()
  async addPost(@User() user, @Body() body: FormDataTestDto) {
    // console.log(body);
    // { image: '29KBYK3JT0_1_1680772821520.jpg', content: 'qwer' }
    return await this.postsService.addPost(user, body);
  }

  // 게시글 삭제
  @Delete(':id')
  async removePost(@Param('id') id: number) {
    return await this.postsService.removePost(id);
  }

  // 댓글 작성
  @Post(':id/comment')
  async addComment(@Param('id') id: number, @User() user, @Body() body) {
    return await this.postsService.addComment(user, body);
  }

  // 좋아요
  @Patch(':id/like')
  async like(@Param('id') id: number, @User() user) {
    return await this.postsService.like(id, user);
  }

  // 좋아요 취소
  @Delete(':id/like')
  async unlike(@Param('id') id: number) {
    return await this.postsService.unlike(id);
  }

  // 사진 게시물 작성
  @Post('/images')
  @UseInterceptors(FilesInterceptor('image'))
  async uploadImage(@UploadedFiles() files) {
    return Object.assign(files.map((v) => v.filename));
  }

  // 리트윗하기
  @Post(':id/retwitt')
  async reTwitt(@Param('id') id: number, @User() user) {
    // console.log('리트윗할 게시물 id', id);
    // console.log('사용자 정보', user);
    return await this.postsService.reTwitt(id, user.id);
  }
}
