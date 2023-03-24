import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';

import { Users } from '../entities/Users';
import { Posts } from '../entities/Posts';
import { User } from '../common/decoratos/user.decorator';

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

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Posts)
    private postRepository: Repository<Posts>,
    private dataSource: DataSource,
  ) {}

  async loadAllPosts() {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    const allPosts = await queryRunner.manager
      .getRepository(Posts)
      .createQueryBuilder('posts')
      .leftJoinAndSelect('posts.comments', 'comments')
      .leftJoinAndSelect('posts.images', 'images')
      .leftJoinAndSelect('posts.User', 'User')
      .select([
        'posts.id',
        'posts.content',
        'User.id',
        'User.nickname',
        'comments',
        'images',
      ])
      .orderBy('posts.createdAt', 'DESC')
      .getMany();

    return allPosts;
  }

  async addPost(user: Users, postData) {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    // console.log('저장할 데이터');
    // console.log(post);

    try {
      await queryRunner.manager.getRepository(Posts).save({
        userId: user.id,
        content: postData.content,
      });

      const newPost = await queryRunner.manager
        .getRepository(Posts)
        .createQueryBuilder('posts')
        .leftJoinAndSelect('posts.comments', 'comments')
        .leftJoinAndSelect('posts.images', 'images')
        .leftJoinAndSelect('posts.User', 'user')
        .where('posts.userId = :id', { id: user.id })
        .select([
          'posts.id',
          'posts.content',
          'user.id',
          'user.nickname',
          'comments',
          'images',
        ])
        .orderBy('posts.createdAt', 'DESC')
        .getOne();

      await queryRunner.commitTransaction();
      return newPost;
    } catch (error) {
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }
  }
}
