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
import { Users } from './Users';

@Index('FollowerId', ['followerId'], {})
@Entity({ schema: 'outstagram', name: 'follow' })
export class Follow {
  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  @Column('int', { primary: true, name: 'FollowingId' })
  followingId: number;

  @Column('int', { primary: true, name: 'FollowerId' })
  followerId: number;

  @ManyToOne(() => Users, (users) => users.followers, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'FollowingId', referencedColumnName: 'id' }])
  following: Users;

  @ManyToOne(() => Users, (users) => users.followings, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'FollowerId', referencedColumnName: 'id' }])
  follower: Users;
}
