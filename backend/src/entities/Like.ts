import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  UpdateDateColumn,
} from 'typeorm';
import { Posts } from './Posts';
import { Users } from './Users';

@Index('UserId', ['userId'], {})
@Entity({ schema: 'outstagram', name: 'like' })
export class Like {
  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  @Column('int', { primary: true, name: 'PostId' })
  postId: number;

  @Column('int', { primary: true, name: 'UserId' })
  userId: number;

  @ManyToOne(() => Posts, (posts) => posts.Likes, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'PostId', referencedColumnName: 'id' }])
  post: Posts;

  @ManyToOne(() => Users, (users) => users.likes, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'UserId', referencedColumnName: 'id' }])
  user: Users;
}
