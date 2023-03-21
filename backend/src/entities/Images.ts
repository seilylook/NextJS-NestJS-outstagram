import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Posts } from './Posts';

@Index('PostId', ['postId'], {})
@Entity('images', { schema: 'react-nodebird' })
export class Images {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column('varchar', { name: 'src', length: 200 })
  src: string;

  @Column('datetime', { name: 'createdAt' })
  createdAt: Date;

  @Column('datetime', { name: 'updatedAt' })
  updatedAt: Date;

  @Column('int', { name: 'PostId', nullable: true })
  postId: number | null;

  @ManyToOne(() => Posts, (posts) => posts.images, {
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'PostId', referencedColumnName: 'id' }])
  post: Posts;
}
