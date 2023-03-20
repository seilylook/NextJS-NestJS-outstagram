import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Users } from './Users';
import { Posts } from './Posts';

@Entity({ schema: 'outstagram', name: 'comments' })
export class Comments {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column('text', { name: 'content', nullable: false })
  content: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  // 사용자와 댓글 1:N
  @Column('int', { name: 'UserId' })
  UserId: number | null;

  @ManyToOne(() => Users, (users) => users.id, {
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'CommentUserId', referencedColumnName: 'id' })
  CommentUserId: Users;

  // 게시글과 댓글 1:N
  @Column('int', { name: 'PostId' })
  PostId: number | null;

  @ManyToOne(() => Posts, (posts) => posts.id, {
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'CommentPostId', referencedColumnName: 'id' })
  CommentPostId: Posts;
}
