import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Users } from './Users';
import { Posts } from './Posts';

@Index('UserId', ['userId'], {})
@Index('PostId', ['postId'], {})
@Entity('comments', { schema: 'react-nodebird' })
export class Comments {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column('text', { name: 'content' })
  content: string;

  @Column('datetime', { name: 'createdAt' })
  createdAt: Date;

  @Column('datetime', { name: 'updatedAt' })
  updatedAt: Date;

  @Column('int', { name: 'UserId', nullable: true })
  userId: number | null;

  @Column('int', { name: 'PostId', nullable: true })
  postId: number | null;

  @ManyToOne(() => Users, (users) => users.comments, {
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'UserId', referencedColumnName: 'id' }])
  user: Users;

  @ManyToOne(() => Posts, (posts) => posts.comments, {
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'PostId', referencedColumnName: 'id' }])
  post: Posts;
}
