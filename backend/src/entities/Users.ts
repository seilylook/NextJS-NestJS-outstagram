import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Posts } from './Posts';

@Entity({ schema: 'outstagram', name: 'users' })
export class Users {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column('varchar', {
    name: 'email',
    unique: true,
    length: 30,
    nullable: false,
  })
  email: string;

  @Column('varchar', { name: 'nickname', length: 20, nullable: false })
  nickname: string;

  @Column('varchar', { name: 'password', length: 100, nullable: false })
  password: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => Posts, (posts) => posts.UserId)
  OwnedUserPosts: Posts[];
}
