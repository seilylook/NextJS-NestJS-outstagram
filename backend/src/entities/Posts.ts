import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Comments } from './Comments';
import { Images } from './Images';
import { Like } from './Like';
import { Posthashtag } from './Posthashtag';
import { Users } from './Users';

@Index('UserId', ['userId'], {})
@Index('RetweetId', ['retweetId'], {})
@Entity('posts', { schema: 'react-nodebird' })
export class Posts {
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

  @Column('int', { name: 'RetweetId', nullable: true })
  retweetId: number | null;

  @OneToMany(() => Comments, (comments) => comments.post)
  comments: Comments[];

  @OneToMany(() => Images, (images) => images.post)
  images: Images[];

  @OneToMany(() => Like, (like) => like.post)
  likes: Like[];

  @OneToMany(() => Posthashtag, (posthashtag) => posthashtag.post)
  posthashtags: Posthashtag[];

  @ManyToOne(() => Users, (users) => users.posts, {
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'UserId', referencedColumnName: 'id' }])
  user: Users;

  @ManyToOne(() => Posts, (posts) => posts.posts, {
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'RetweetId', referencedColumnName: 'id' }])
  retweet: Posts;

  @OneToMany(() => Posts, (posts) => posts.retweet)
  posts: Posts[];
}
