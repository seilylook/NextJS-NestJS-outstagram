/* eslint-disable @typescript-eslint/no-empty-function */
import { Injectable } from '@nestjs/common';
import { Repository, DataSource } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { Users } from '../entities/Users';
import { Follow } from '../entities/Follow';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users)
    private userRepository: Repository<Users>,
    private dataSource: DataSource,
  ) {}

  async getUserInfo(User: Users) {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const user = await queryRunner.manager
        .getRepository(Users)
        .createQueryBuilder('users')
        .leftJoinAndSelect('users.Posts', 'Posts')
        .leftJoinAndSelect('users.Comments', 'Comments')
        .leftJoinAndSelect('users.Followings', 'Followings')
        .leftJoinAndSelect('users.Followers', 'Followers')
        .leftJoinAndSelect('users.Likes', 'Likes')
        .where('users.id = :id', { id: User.id })
        .select([
          'users.id',
          'users.email',
          'users.nickname',
          'Posts',
          'Comments',
          'Followers',
          'Followings',
          'Likes',
        ])
        .getOne();

      await queryRunner.commitTransaction();
      return user;
    } catch (error) {
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }
  }

  async login(User: Users) {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const user = await queryRunner.manager
        .getRepository(Users)
        .createQueryBuilder('users')
        .leftJoinAndSelect('users.Posts', 'Posts')
        .leftJoinAndSelect('users.Comments', 'Comments')
        .leftJoinAndSelect('users.Followings', 'Followings')
        .leftJoinAndSelect('users.Followers', 'Followers')
        .leftJoinAndSelect('users.Likes', 'Likes')
        .where('users.id = :id', { id: User.id })
        .select([
          'users.id',
          'users.email',
          'users.nickname',
          'Posts',
          'Comments',
          'Followers',
          'Followings',
          'Likes',
        ])
        .getOne();

      await queryRunner.commitTransaction();
      return user;
    } catch (error) {
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }
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
      await queryRunner.manager.getRepository(Users).save({
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

  async updateNickname(user: Users, nickname: string) {
    // 유저정보: Users { id: 1, email: 'kim@kim.com', nickname: 'kim' }
    // 바꿀 닉네임: python

    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      await queryRunner.manager
        .getRepository(Users)
        .createQueryBuilder()
        .update(Users)
        .set({
          nickname: nickname,
        })
        .where('id = :id', { id: user.id })
        .execute();

      const newUser = await queryRunner.manager
        .getRepository(Users)
        .createQueryBuilder('User')
        .where('User.id = :id', { id: user.id })
        .select(['User.id', 'User.email', 'User.nickname'])
        .getOne();

      await queryRunner.commitTransaction();
      return newUser;
    } catch (error) {
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }
  }

  async follow(targetId: number, userId: number) {
    // 팔로우 할 대상: 2
    // 내 정보: 1
    // console.log('팔로우 할 대상:', targetId);
    // console.log('내 정보:', userId);

    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      await queryRunner.manager.getRepository(Follow).save({
        followerId: userId,
        followingId: targetId,
      });

      const user = await queryRunner.manager
        .getRepository(Users)
        .createQueryBuilder('User')
        .where('User.id = :id', { id: targetId })
        .select(['User.id', 'User.nickname'])
        .getOne();

      await queryRunner.commitTransaction();
      return user;
    } catch (error) {
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }
  }
}
