import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Comments } from './Comments';
import { Follow } from './Follow';
import { Like } from './Like';
import { Posts } from './Posts';

@Index('email', ['email'], { unique: true })
@Entity('users', { schema: 'react-nodebird' })
export class Users {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column('varchar', { name: 'email', unique: true, length: 30 })
  email: string;

  @Column('varchar', { name: 'nickname', length: 30 })
  nickname: string;

  @Column('varchar', { name: 'password', length: 100 })
  password: string;

  @Column('datetime', { name: 'createdAt' })
  createdAt: Date;

  @Column('datetime', { name: 'updatedAt' })
  updatedAt: Date;

  @OneToMany(() => Comments, (comments) => comments.user)
  comments: Comments[];

  @OneToMany(() => Follow, (follow) => follow.following)
  follows: Follow[];

  @OneToMany(() => Follow, (follow) => follow.follower)
  follows2: Follow[];

  @OneToMany(() => Like, (like) => like.user)
  likes: Like[];

  @OneToMany(() => Posts, (posts) => posts.user)
  posts: Posts[];
}
