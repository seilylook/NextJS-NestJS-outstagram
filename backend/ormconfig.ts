import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Posts } from './src/entities/Posts';
import { Users } from './src/entities/Users';
import * as dotenv from 'dotenv';

dotenv.config();

const config: TypeOrmModuleOptions = {
  type: 'mysql',
  host: '127.0.0.1',
  port: 3306,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  entities: [Users, Posts],
  synchronize: true, // 처음 연결만 true 다음부터는 false 해줘야한다.
  autoLoadEntities: true,
  charset: 'utf8mb4',
  logging: true,
  keepConnectionAlive: true,
};

export = config;
