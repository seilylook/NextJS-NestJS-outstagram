/* eslint-disable @typescript-eslint/no-empty-function */
import { Injectable } from '@nestjs/common';
import { Repository, DataSource } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { Users } from '../entities/Users';
import { Posts } from '../entities/Posts';
import { Follow } from '../entities/Follow';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users)
    private userRepository: Repository<Users>,
    @InjectRepository(Posts)
    private postRepository: Repository<Posts>,
    @InjectRepository(Follow)
    private followerRepository: Repository<Follow>,
    private dataSource: DataSource,
  ) {}

  async getPosts(user: Users) {
    const posts = await this.userRepository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.posts', 'posts')
      .where('user.id = :id', { id: user.id })
      .getOne();

    return posts;
  }

  async getFollowers(user: Users) {
    const followers = await this.userRepository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.followers', 'followers')
      .where('user.id = :id', { id: user.id })
      .getOne();

    return followers;
  }

  async getFollowings(user: Users) {
    const followings = await this.userRepository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.followings', 'followings')
      .where('user.id = :id', { id: user.id })
      .getOne();

    return followings;
  }

  async signUp(email: string, nickname: string, password: string) {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    const user = await this.userRepository.findOne({
      where: { email },
    });

    if (user) {
      throw new Error('이미 존재하는 사용자입니다.');
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    try {
      const result = await queryRunner.manager.getRepository(Users).save({
        email,
        nickname,
        password: hashedPassword,
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
