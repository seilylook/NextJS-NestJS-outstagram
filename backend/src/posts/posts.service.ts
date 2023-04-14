import { Injectable } from '@nestjs/common';
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

  async loadAllPosts(lastId: number) {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      // 처음 로딩이 아닐 때
      // lastId === 가장 마지막 게시물 id: number
      if (lastId) {
        const allPosts = await queryRunner.manager
          .getRepository(Posts)
          .createQueryBuilder('Post')
          .leftJoinAndSelect('Post.User', 'User')
          .leftJoinAndSelect('Post.Images', 'Images')
          .leftJoinAndSelect('Post.Likes', 'Likes')
          .leftJoinAndSelect('Post.Posthashtags', 'Posthashtags')
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
            'Posthashtags',
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
          .orderBy('Post.createdAt', 'DESC')
          .addOrderBy('Comments.createdAt', 'DESC')
          .where('Post.id < :id', { id: lastId })
          .limit(10)
          .getMany();

        return allPosts;
      }

      // 처음 로딩할 때
      // lastId === 0
      const allPosts = await queryRunner.manager
        .getRepository(Posts)
        .createQueryBuilder('Post')
        .leftJoinAndSelect('Post.User', 'User')
        .leftJoinAndSelect('Post.Images', 'Images')
        .leftJoinAndSelect('Post.Likes', 'Likes')
        .leftJoinAndSelect('Post.Posthashtags', 'Posthashtags')
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
          'Posthashtags',
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
        .orderBy('Post.createdAt', 'DESC')
        .addOrderBy('Comments.createdAt', 'DESC')
        .limit(10)
        .getMany();

      await queryRunner.commitTransaction();
      return allPosts;
    } catch (error) {
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }
  }

  async loadSinglePost(postId: number) {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const post = await queryRunner.manager
        .getRepository(Posts)
        .createQueryBuilder('Post')
        .leftJoinAndSelect('Post.User', 'User')
        .leftJoinAndSelect('Post.Images', 'Images')
        .leftJoinAndSelect('Post.Likes', 'Likes')
        .leftJoinAndSelect('Post.Posthashtags', 'Posthashtags')
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
          'Posthashtags',
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
        .where('Post.id = :id', { id: postId })
        .getOne();

      await queryRunner.commitTransaction();
      return post;
    } catch (error) {
      console.error(error);
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }
  }

  async getUserPosts(userId: number, lastId: number) {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      // 처음 로딩이 아닐 때
      // lastId === 가장 마지막 게시물 id: number
      if (lastId) {
        const allPosts = await queryRunner.manager
          .getRepository(Posts)
          .createQueryBuilder('Post')
          .leftJoinAndSelect('Post.User', 'User')
          .leftJoinAndSelect('Post.Images', 'Images')
          .leftJoinAndSelect('Post.Likes', 'Likes')
          .leftJoinAndSelect('Post.Posthashtags', 'Posthashtags')
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
            'Posthashtags',
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
          .orderBy('Post.createdAt', 'DESC')
          .addOrderBy('Comments.createdAt', 'DESC')
          .where('Post.id < :id', { id: lastId })
          .andWhere('Post.userId = :id', { id: userId })
          .limit(10)
          .getMany();

        return allPosts;
      }

      // 처음 로딩할 때
      // lastId === 0
      const allPosts = await queryRunner.manager
        .getRepository(Posts)
        .createQueryBuilder('Post')
        .leftJoinAndSelect('Post.User', 'User')
        .leftJoinAndSelect('Post.Images', 'Images')
        .leftJoinAndSelect('Post.Likes', 'Likes')
        .leftJoinAndSelect('Post.Posthashtags', 'Posthashtags')
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
          'Posthashtags',
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
        .orderBy('Post.createdAt', 'DESC')
        .addOrderBy('Comments.createdAt', 'DESC')
        .where('Post.userId = :id', { id: userId })
        .limit(10)
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
          await Promise.all(
            postData.image.map(
              async (i) =>
                await queryRunner.manager.getRepository(Images).save({
                  src: i,
                  postId: post.id,
                }),
            ),
          );
        } else {
          await queryRunner.manager.getRepository(Images).save({
            src: postData.image,
            postId: post.id,
          });
        }
      }

      const fullPost = await queryRunner.manager
        .getRepository(Posts)
        .createQueryBuilder('Post')
        .leftJoinAndSelect('Post.Comments', 'Comments')
        .leftJoinAndSelect('Post.Images', 'Images')
        .leftJoinAndSelect('Post.User', 'user')
        .leftJoinAndSelect('Post.Likes', 'Likes')
        .where('Post.userId = :id', { id: user.id })
        .select([
          'Post.id',
          'Post.content',
          'user.id',
          'user.nickname',
          'Likes',
          'Comments',
          'Images',
        ])
        .orderBy('Post.createdAt', 'DESC')
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

  async unlike(postId) {
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

  async reTwitt(postId: number, userId: number) {
    // console.log('리트윗할 게시물 id', postId);
    // console.log('사용자 정보', userId);
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const post = await queryRunner.manager
        .getRepository(Posts)
        .createQueryBuilder('Post')
        .leftJoinAndSelect('Post.Retweet', 'Retwitt')
        .where('Post.id = :id', { id: postId })
        .select(['Post', 'Retwitt'])
        .getOne();

      if (!post) {
        return null;
      }

      if (
        userId === post.userId ||
        (post.Retweet && post.Retweet.userId === userId)
      ) {
        return null;
      }

      const retwittTargetId = post.retweetId || post.id;
      const exPost = await queryRunner.manager
        .getRepository(Posts)
        .createQueryBuilder('Post')
        .where('Post.userId = :id', { id: userId })
        .andWhere('Post.retweetId = :id', { id: retwittTargetId })
        .getOne();

      if (exPost) {
        console.log('이미 리트윗한 게시물');
        return null;
      }

      const reTwitt = await queryRunner.manager.getRepository(Posts).save({
        userId: userId,
        retweetId: retwittTargetId,
        content: 'reTwitt',
      });

      const reTwittwithExPost = await queryRunner.manager
        .getRepository(Posts)
        .createQueryBuilder('Post')
        .leftJoinAndSelect('Post.User', 'User')
        .leftJoinAndSelect('Post.Images', 'Images')
        .leftJoinAndSelect('Post.Likes', 'Likes')
        .leftJoinAndSelect('Post.Posthashtags', 'Posthashtags')
        .leftJoinAndSelect('Post.Retweet', 'Retwitt')
        .leftJoinAndSelect('Retwitt.User', 'RetwittUser')
        .leftJoinAndSelect('Retwitt.Images', 'RetwittImages')
        .leftJoinAndSelect('Retwitt.Likes', 'RetwittLikes')
        .leftJoinAndSelect('Retwitt.Posthashtags', 'RetwittPosthashtags')
        .leftJoinAndSelect('Retwitt.Comments', 'RetwittComments')
        .leftJoinAndSelect('RetwittComments.User', 'RetwittCommentsUser')
        .leftJoinAndSelect('Post.Comments', 'Comments')
        .leftJoinAndSelect('Comments.User', 'commentsUser')
        .where('Post.id = :id', { id: reTwitt.id })
        .select([
          'Post.id',
          'Post.content',
          'User.id',
          'User.nickname',
          'Images',
          'Likes.userId',
          'Likes.postId',
          'Posthashtags',
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
        .orderBy('Post.createdAt', 'DESC')
        .addOrderBy('Comments.createdAt', 'DESC')
        .getOne();

      console.log(reTwittwithExPost);
      await queryRunner.commitTransaction();
      return reTwittwithExPost;
    } catch (error) {
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }
  }
}
