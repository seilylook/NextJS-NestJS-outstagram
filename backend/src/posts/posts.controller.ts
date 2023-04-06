import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { User } from '../common/decoratos/user.decorator';
import { PostsService } from './posts.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { FormDataRequest } from 'nestjs-form-data';
import { FormDataTestDto } from '../common/dto/FormDataTestDto';
import * as multer from 'multer';
import * as path from 'path';

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
  upload = multer({
    storage: multer.diskStorage({
      destination(req, file, done) {
        done(null, 'uploads');
      },
      filename(req, file, done) {
        const ext = path.extname(file.originalname);
        const basename = path.basename(file.originalname, ext);
        done(null, basename + '_' + new Date().getTime() + ext); // 제로초15184712891.png
      },
    }),
    limits: { fileSize: 20 * 1024 * 1024 }, // 20MB
  });

  // 모든 게시물 가져오기
  @Get('/')
  async loadAllPosts() {
    return await this.postsService.loadAllPosts();
  }

  // 게시글 작성
  @Post('/')
  @FormDataRequest()
  async addPost(@User() user, @Body() body: FormDataTestDto) {
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
  async unlike(@Param('id') id: number, @User() user) {
    return await this.postsService.unlike(id, user);
  }

  // 사진 게시물 작성
  @Post('/images')
  @UseInterceptors(FileInterceptor('image'))
  async uploadImage(@UploadedFile() file) {
    console.log(file.filename);
  }
}
