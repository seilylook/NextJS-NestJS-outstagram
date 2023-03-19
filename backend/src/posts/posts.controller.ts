import { Controller, Get, Post, Delete, Patch } from '@nestjs/common';
import { PostsService } from './posts.service';

@Controller('posts')
export class PostsController {
  constructor(private postsService: PostsService) {}

  @Get('/')
  getAllPosts() {
    return this.postsService.getAllPosts();
  }
}
