import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm';
import { Users } from './Users';

@Index('FollowerId', ['followerId'], {})
@Entity('follow', { schema: 'react-nodebird' })
export class Follow {
  @Column('datetime', { name: 'createdAt' })
  createdAt: Date;

  @Column('datetime', { name: 'updatedAt' })
  updatedAt: Date;

  @Column('int', { primary: true, name: 'FollowingId' })
  followingId: number;

  @Column('int', { primary: true, name: 'FollowerId' })
  followerId: number;

  @ManyToOne(() => Users, (users) => users.follows, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'FollowingId', referencedColumnName: 'id' }])
  following: Users;

  @ManyToOne(() => Users, (users) => users.follows2, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'FollowerId', referencedColumnName: 'id' }])
  follower: Users;
}
