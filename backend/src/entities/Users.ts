import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Comments } from './Comments';
import { Follow } from './Follow';
import { Like } from './Like';
import { Posts } from './Posts';

@Index('email', ['email'], { unique: true })
@Entity({ schema: 'outstagram', name: 'users' })
export class Users {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column('varchar', { name: 'email', unique: true, length: 30 })
  email: string;

  @Column('varchar', { name: 'nickname', length: 30 })
  nickname: string;

  @Column('varchar', { name: 'password', length: 100 })
  password: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  @OneToMany(() => Comments, (comments) => comments.User)
  Comments: Comments[];

  @OneToMany(() => Follow, (follow) => follow.Following)
  Followers: Follow[];

  @OneToMany(() => Follow, (follow) => follow.Follower)
  Followings: Follow[];

  @OneToMany(() => Like, (like) => like.user)
  Likes: Like[];

  @OneToMany(() => Posts, (posts) => posts.User)
  Posts: Posts[];
}
