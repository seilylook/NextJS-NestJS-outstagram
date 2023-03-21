import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm';
import { Hashtags } from './Hashtags';
import { Posts } from './Posts';

@Index('PostId', ['postId'], {})
@Entity('posthashtag', { schema: 'react-nodebird' })
export class Posthashtag {
  @Column('datetime', { name: 'createdAt' })
  createdAt: Date;

  @Column('datetime', { name: 'updatedAt' })
  updatedAt: Date;

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
