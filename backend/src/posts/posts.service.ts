import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';

import { Users } from '../entities/Users';
import { Posts } from '../entities/Posts';
import { User } from '../common/decoratos/user.decorator';

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
      .getMany();

    console.log(allPosts);
  }

  async addPost(userId: number, postData) {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    // console.log('저장할 데이터');
    // console.log(post);

    try {
      const result = await queryRunner.manager.getRepository(Posts).save({
        userId,
        content: postData.content,
      });

      await queryRunner.commitTransaction();
      return true;
    } catch (error) {
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }
  }
}
