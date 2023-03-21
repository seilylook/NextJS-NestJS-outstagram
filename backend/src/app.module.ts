import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ConfigModule } from '@nestjs/config';
import { AppService } from './app.service';
import { PostsModule } from './posts/posts.module';
import { PostsController } from './posts/posts.controller';
import { PostsService } from './posts/posts.service';
import { UsersModule } from './users/users.module';
import { UsersController } from './users/users.controller';
import { UsersService } from './users/users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import * as ormconfig from '../ormconfig';
import { Users } from './entities/Users';
import { Posts } from './entities/Posts';
import { Comments } from './entities/Comments';
import { Images } from './entities/Images';
import { Hashtags } from './entities/Hashtags';
import { Follow } from './entities/Follow';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    UsersModule,
    PostsModule,
    AuthModule,
    Users,
    Posts,
    TypeOrmModule.forRoot(ormconfig),
    TypeOrmModule.forFeature([
      Users,
      Posts,
      Comments,
      Images,
      Hashtags,
      Follow,
    ]),
  ],
  controllers: [AppController, UsersController, PostsController],
  providers: [AppService, UsersService, PostsService],
})
export class AppModule {}
