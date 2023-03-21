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
import { Hashtags } from './Hashtags';
import { Posts } from './Posts';

@Index('PostId', ['postId'], {})
@Entity({ schema: 'outstagram', name: 'posthashtag' })
export class Posthashtag {
  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  @Column('int', { primary: true, name: 'HashtagId' })
  hashtagId: number;

  @Column('int', { primary: true, name: 'PostId' })
  postId: number;

  @ManyToOne(() => Hashtags, (hashtags) => hashtags.posthashtags, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'HashtagId', referencedColumnName: 'id' }])
  hashtag: Hashtags;

  @ManyToOne(() => Posts, (posts) => posts.posthashtags, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'PostId', referencedColumnName: 'id' }])
  post: Posts;
}
