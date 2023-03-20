import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Comments } from './Comments';
import { Users } from './Users';
import { Images } from './Images';
import { Hashtags } from './Hashtags';

@Entity({ schema: 'outstagram', name: 'posts' })
export class Posts {
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

  @Column('int', { name: 'UserId' })
  UserId: number | null;

  // 사용자가 작성한 게시글 1:N
  @ManyToOne(() => Users, (users) => users.id, {
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'postUserId', referencedColumnName: 'id' })
  PostUserId: Users;

  // 게시물에 대한 댓글 1:N
  @OneToMany(() => Comments, (comments) => comments.PostId)
  OwnedCommentsPosts: Comments[];

  // 좋아요 누른 게시물 N:N
  @ManyToMany(() => Users, (users) => users.OwnedLikedPostsUsers)
  LikedPosts: Users[];

  // 게스글과 사진 1:N
  @OneToMany(() => Images, (images) => images.PostId)
  OwnedImagesPosts: Images[];

  // 게시글과 해시태크 N:N
  @ManyToMany(() => Hashtags, (hashtags) => hashtags.Hashtags)
  @JoinTable({
    name: 'PostHashtags',
    joinColumn: {
      name: 'PostHashtag',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'HashtagPosts',
      referencedColumnName: 'id',
    },
  })
  OwnedHashtagPosts: Hashtags[];
}
