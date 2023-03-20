import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  ManyToMany,
  JoinTable,
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

  @DeleteDateColumn()
  deletedAt: Date;

  // 사용자와 게시글 1:N
  @OneToMany(() => Posts, (posts) => posts.UserId)
  OwnedPostsUser: Posts[];

  // 사용자와 댓글 1:N
  @OneToMany(() => Comments, (comments) => comments.UserId)
  OwnedCommentsUser: Comments[];

  // 좋아요
  @ManyToMany(() => Posts, (posts) => posts.LikedPosts)
  @JoinTable({
    name: 'PostLikeUsers',
    joinColumn: {
      name: 'PostLikeUserId',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'UserLikedPostId',
      referencedColumnName: 'id',
    },
  })
  OwnedLikedPostUsers: Posts[];

  // 팔로우, 팔로잉
  @ManyToMany(() => Users, (users) => users.id)
  @JoinTable({
    name: 'Followers',
    joinColumn: {
      name: 'Followers',
      referencedColumnName: 'id',
    },
  })
  Followers: Users[];

  @ManyToMany(() => Users, (users) => users.id)
  @JoinTable({
    name: 'Followings',
    joinColumn: {
      name: 'Followings',
      referencedColumnName: 'id',
    },
  })
  Followings: Users[];
}
