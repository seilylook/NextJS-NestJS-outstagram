/* eslint-disable @typescript-eslint/no-empty-function */
import { Injectable } from '@nestjs/common';
import { Repository, DataSource } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { Users } from '../entities/Users';

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
}
