import { Injectable, Post } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';

import { Users } from '../entities/Users';
import { Posts } from '../entities/Posts';
import { Comments } from '../entities/Comments';
import { Like } from '../entities/Like';
import { Images } from '../entities/Images';
import { Hashtags } from '../entities/Hashtags';
import { Posthashtag } from '../entities/Posthashtag';

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

    try {
      const allPosts = await queryRunner.manager
        .getRepository(Posts)
        .createQueryBuilder('posts')
        .leftJoinAndSelect('posts.Images', 'Images')
        .leftJoinAndSelect('posts.User', 'User')
        .leftJoinAndSelect('posts.Likes', 'Likes')
        .leftJoinAndSelect('posts.Posthashtags', 'Posthashtags')
        .leftJoinAndSelect('posts.Retweet', 'Retweet')
        .leftJoinAndSelect('posts.Comments', 'Comments')
        .leftJoinAndSelect('Comments.User', 'commentsUser')
        .select([
          'posts.id',
          'posts.content',
          'User.id',
          'User.nickname',
          'Images',
          'Likes.userId',
          'Likes.postId',
          'Posthashtags',
          'Retweet',
          'Comments',
          'commentsUser.id',
          'commentsUser.nickname',
        ])
        .orderBy('posts.createdAt', 'DESC')
        .addOrderBy('Comments.createdAt', 'DESC')
        .getMany();

      await queryRunner.commitTransaction();
      return allPosts;
    } catch (error) {
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }
  }

  async addPost(user: Users, postData) {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    // {
    //   image: '29KBYK3JT0_1_1680772821520.jpg',
    //   content: 'qwer',
    // }

    // console.log(postData);
    // { content: '#React #Nestjs #Unity #TypeORM' }

    try {
      const hashtags = postData.content.match(/#[^\s#]+/g);
      // console.log(hashtags);
      // [ '#React', '#Nestjs', '#Unity', '#TypeORM' ]

      const post = await queryRunner.manager.getRepository(Posts).save({
        userId: user.id,
        content: postData.content,
      });

      if (hashtags) {
        const newHashtags = await Promise.all(
          hashtags.map(
            async (tag) =>
              await queryRunner.manager.getRepository(Hashtags).save({
                name: tag.slice(1).toLowerCase(),
              }),
          ),
        );
        await Promise.all(
          newHashtags.map(
            async (tag) =>
              await queryRunner.manager.getRepository(Posthashtag).save({
                postId: post.id,
                hashtagId: tag.id,
              }),
          ),
        );
      }

      if (postData.image) {
        if (Array.isArray(postData.image)) {
          const images = await Promise.all(
            postData.image.map(
              async (i) =>
                await queryRunner.manager.getRepository(Images).save({
                  src: i,
                  postId: post.id,
                }),
            ),
          );
        } else {
          const image = await queryRunner.manager.getRepository(Images).save({
            src: postData.image,
            postId: post.id,
          });
        }
      }

      const fullPost = await queryRunner.manager
        .getRepository(Posts)
        .createQueryBuilder('posts')
        .leftJoinAndSelect('posts.Comments', 'Comments')
        .leftJoinAndSelect('posts.Images', 'Images')
        .leftJoinAndSelect('posts.User', 'user')
        .leftJoinAndSelect('posts.Likes', 'Likes')
        .where('posts.userId = :id', { id: user.id })
        .select([
          'posts.id',
          'posts.content',
          'user.id',
          'user.nickname',
          'Likes',
          'Comments',
          'Images',
        ])
        .orderBy('posts.createdAt', 'DESC')
        .getOne();

      await queryRunner.commitTransaction();
      return fullPost;
    } catch (error) {
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }
  }

  async removePost(postId) {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    // console.log('저장할 데이터');
    // console.log(post);

    try {
      const post = await queryRunner.manager
        .getRepository(Posts)
        .createQueryBuilder('Post')
        .where('Post.id = :id', { id: postId })
        .select(['Post.id'])
        .getOne();

      if (!post) {
        return null;
      }

      // const result = await queryRunner.manager
      //   .getRepository(Posts)
      //   .createQueryBuilder('Post')
      //   .delete()
      //   .from(Posts)
      //   .where('id = :id', { id: postId })
      //   .execute()

      await queryRunner.manager
        .getRepository(Posts)
        .createQueryBuilder('Post')
        .leftJoinAndSelect('Post.Images', 'Images')
        .leftJoinAndSelect('Post.User', 'User')
        .leftJoinAndSelect('Post.Likes', 'Likes')
        .leftJoinAndSelect('Post.Posthashtags', 'Posthashtags')
        .leftJoinAndSelect('Post.Retweet', 'Retweet')
        .leftJoinAndSelect('Post.Comments', 'Comments')
        .delete()
        .from(Posts)
        .where('id = :id', { id: postId })
        .execute();

      await queryRunner.commitTransaction();
      return post;
    } catch (error) {
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }
  }

  async addComment(user: Users, commentData) {
    // console.log('사용자 정보', user);
    // console.log('댓글 내용', commentData);
    // 사용자 정보 Users { id: 1, email: 'kim@kim.com', nickname: 'kim' }
    // 댓글 내용 { content: '123', userId: 1, postId: 1 }
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const post = await queryRunner.manager.getRepository(Posts).find({
        where: { id: commentData.postId },
      });

      if (!post) {
        return null;
      }

      await queryRunner.manager.getRepository(Comments).save({
        content: commentData.content,
        userId: commentData.userId,
        postId: commentData.postId,
      });

      const newComment = await queryRunner.manager
        .getRepository(Comments)
        .createQueryBuilder('Comment')
        .leftJoinAndSelect('Comment.User', 'User')
        .where('Comment.userId = :id', { id: user.id })
        .select([
          'Comment.id',
          'Comment.content',
          'User.id',
          'User.nickname',
          'Comment.postId',
        ])
        .orderBy('Comment.createdAt', 'DESC')
        .getOne();

      await queryRunner.commitTransaction();
      return newComment;
    } catch (error) {
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }
  }

  async like(postId, user) {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const post = await queryRunner.manager
        .getRepository(Posts)
        .createQueryBuilder('Post')
        .where('Post.id = :id', { id: postId })
        .getOne();

      if (!post) {
        return null;
      }

      const like = await queryRunner.manager.getRepository(Like).save({
        userId: user.id,
        postId: postId,
      });

      await queryRunner.commitTransaction();
      return like;
    } catch (error) {
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }
  }

  async unlike(postId, user) {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const post = await queryRunner.manager
        .getRepository(Posts)
        .createQueryBuilder('Post')
        .where('Post.id = :id', { id: postId })
        .getOne();

      if (!post) {
        return null;
      }

      const like = await queryRunner.manager
        .getRepository(Like)
        .createQueryBuilder('Like')
        .where('Like.postId = :id', { id: postId })
        .getOne();

      await queryRunner.manager
        .getRepository(Like)
        .createQueryBuilder('Like')
        .delete()
        .from(Like)
        .where('Like.postId = :id', { id: postId })
        .execute();

      await queryRunner.commitTransaction();
      return like;
    } catch (error) {
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }
  }
}
