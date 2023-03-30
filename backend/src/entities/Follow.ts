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

  @ManyToOne(() => Users, (users) => users.Followers, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'FollowingId', referencedColumnName: 'id' }])
  Following: Users;

  @ManyToOne(() => Users, (users) => users.Followings, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'FollowerId', referencedColumnName: 'id' }])
  Follower: Users;
}
