import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Posts } from './src/entities/Posts';
import { Users } from './src/entities/Users';
import { Comments } from 'src/entities/Comments';
import { Images } from 'src/entities/Images';
import { Followers } from 'src/entities/Followers';
import { Followings } from 'src/entities/Followings';
import { Hashtags } from 'src/entities/Hashtags';
import * as dotenv from 'dotenv';

dotenv.config();

const config: TypeOrmModuleOptions = {
  type: 'mysql',
  host: '127.0.0.1',
  port: 3306,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  entities: [Users, Posts, Comments, Images, Followers, Followings, Hashtags],
  synchronize: false, // 처음 연결만 true 다음부터는 false 해줘야한다.
  autoLoadEntities: true,
  charset: 'utf8mb4',
  logging: true,
  keepConnectionAlive: true,
};

export = config;
