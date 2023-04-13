import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Posts } from '../entities/Posts';
import { Hashtags } from '../entities/Hashtags';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class HashtagsService {
  constructor(
    @InjectRepository(Hashtags)
    private hashtagRepository = Repository<Hashtags>,
    private dataSource: DataSource,
  ) {}

  async getHashtagPosts(content: string, lastId: number) {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const posts = await queryRunner.manager
        .getRepository(Posts)
        .createQueryBuilder('Post')
        .leftJoinAndSelect('Post.Posthashtags', 'HashtagPosts')
        .leftJoinAndSelect('HashtagPosts.Hashtag', 'Hashtag')
        .leftJoinAndSelect('Post.User', 'User')
        .leftJoinAndSelect('Post.Images', 'Images')
        .leftJoinAndSelect('Post.Likes', 'Likes')
        .leftJoinAndSelect('Post.Retweet', 'Retwitt')
        .leftJoinAndSelect('Retwitt.User', 'RetwittUser')
        .leftJoinAndSelect('Retwitt.Images', 'RetwittImages')
        .leftJoinAndSelect('Retwitt.Likes', 'RetwittLikes')
        .leftJoinAndSelect('Retwitt.Posthashtags', 'RetwittPosthashtags')
        .leftJoinAndSelect('Retwitt.Comments', 'RetwittComments')
        .leftJoinAndSelect('RetwittComments.User', 'RetwittCommentsUser')
        .leftJoinAndSelect('Post.Comments', 'Comments')
        .leftJoinAndSelect('Comments.User', 'commentsUser')
        .select([
          'Post.id',
          'Post.content',
          'User.id',
          'User.nickname',
          'Images',
          'Likes.userId',
          'Likes.postId',
          'Retwitt',
          'RetwittUser.id',
          'RetwittUser.nickname',
          'RetwittImages',
          'RetwittLikes',
          'RetwittPosthashtags',
          'RetwittComments',
          'RetwittCommentsUser.id',
          'RetwittCommentsUser.nickname',
          'Comments',
          'commentsUser.id',
          'commentsUser.nickname',
        ])
        .where('Hashtag.name = :content', { content: content })
        .getMany();

      console.log(posts);
      await queryRunner.commitTransaction();
      return posts;
    } catch (error) {
      console.error(error);
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }
  }
}
