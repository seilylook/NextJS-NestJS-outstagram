import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Comments } from './Comments';
import { Images } from './Images';
import { Like } from './Like';
import { Posthashtag } from './Posthashtag';
import { Users } from './Users';

@Index('UserId', ['userId'], {})
@Index('RetweetId', ['retweetId'], {})
@Entity({ schema: 'outstagram', name: 'posts' })
export class Posts {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column('text', { name: 'content' })
  content: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  @Column('int', { name: 'UserId', nullable: true })
  userId: number | null;

  @Column('int', { name: 'RetweetId', nullable: true })
  retweetId: number | null;

  @OneToMany(() => Comments, (comments) => comments.post)
  Comments: Comments[];

  @OneToMany(() => Images, (images) => images.post)
  Images: Images[];

  @OneToMany(() => Like, (like) => like.post)
  Likes: Like[];

  @OneToMany(() => Posthashtag, (posthashtag) => posthashtag.post)
  Posthashtags: Posthashtag[];

  @ManyToOne(() => Users, (users) => users.posts, {
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'UserId', referencedColumnName: 'id' }])
  User: Users;

  @ManyToOne(() => Posts, (posts) => posts.Posts, {
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'RetweetId', referencedColumnName: 'id' }])
  Retweet: Posts;

  @OneToMany(() => Posts, (posts) => posts.Retweet)
  Posts: Posts[];
}
