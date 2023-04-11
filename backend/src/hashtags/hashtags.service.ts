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
}
