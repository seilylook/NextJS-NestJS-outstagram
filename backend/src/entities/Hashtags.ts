import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Posthashtag } from './Posthashtag';

@Entity('hashtags', { schema: 'react-nodebird' })
export class Hashtags {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column('varchar', { name: 'name', length: 20 })
  name: string;

  @Column('datetime', { name: 'createdAt' })
  createdAt: Date;

  @Column('datetime', { name: 'updatedAt' })
  updatedAt: Date;

  @OneToMany(() => Posthashtag, (posthashtag) => posthashtag.hashtag)
  posthashtags: Posthashtag[];
}
