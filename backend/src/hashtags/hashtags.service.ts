import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Posts } from '../entities/Posts';
import { Hashtags } from '../entities/Hashtags';
import { Posthashtag } from '../entities/Posthashtag';
import { DataSource } from 'typeorm';

@Injectable()
export class HashtagsService {
  constructor(
    @InjectRepository(Posts)
    @InjectRepository(Hashtags)
    @InjectRepository(Posthashtag)
    private dataSource: DataSource,
  ) {}

  async getHashtagPosts(content: string, lastId: number) {
    console.log('찾을 해시태그 문구', content);
    console.log('마지막 게시물 아이디', lastId);
  }
}
