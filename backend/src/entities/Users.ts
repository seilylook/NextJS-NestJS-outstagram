import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Posts } from './Posts';
import { Comments } from './Comments';

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

  @OneToMany(() => Comments, (comments) => comments.UserId)
  OwnedUserComments: Comments[];

  @ManyToOne(() => Posts, (posts) => posts.id, {
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'Like', referencedColumnName: 'id' })
  Like: Posts;

  @Column('int', { name: 'FollowerId' })
  FollowerId: number | null;

  @OneToMany(() => Users, (users) => users.FollowerId)
  FollowerUser: Users[];

  @Column('int', { name: 'FollowingId' })
  FollowingId: number | null;

  @OneToMany(() => Users, (users) => users.FollowingId)
  FollowingUser: Users[];
}
