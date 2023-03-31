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

  // 사용자 정보 가져오기
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
          'Followings',
          'Followers',
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

  /** 로그인 */
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

  /** 로그아웃 */
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

  /** 닉네임 변경 */
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

  /** 팔로우 */
  async follow(targetId: number, userId: number) {
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
        .leftJoinAndSelect('User.Followings', 'Followings')
        .leftJoinAndSelect('User.Followers', 'Followers')
        .where('User.id = :id', { id: userId })
        .select(['User.id', 'User.nickname', 'Followings', 'Followers'])
        .getOne();

      await queryRunner.commitTransaction();
      return user;
    } catch (error) {
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }
  }

  /** 언팔로우 */
  async unfollow(targetId: number, userId: number) {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const exist = await queryRunner.manager
        .getRepository(Users)
        .createQueryBuilder('User')
        .leftJoinAndSelect('User.Followings', 'Followings')
        .where('User.id = :id', { id: targetId })
        .select(['User.id', 'User.nickname', 'Followings'])
        .getOne();

      if (!exist) {
        return null;
      }

      await queryRunner.manager
        .getRepository(Follow)
        .createQueryBuilder('Follow')
        .delete()
        .from(Follow)
        .where('followingId = :id', { id: targetId })
        .execute();

      await queryRunner.commitTransaction();
      return targetId;
    } catch (error) {
      console.error(error);
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }
  }
}
