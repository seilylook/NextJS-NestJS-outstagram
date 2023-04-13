import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ConfigModule } from '@nestjs/config';
import { AppService } from './app.service';
import { PostsModule } from './posts/posts.module';
import { HashtagsModule } from './hashtags/hashtags.module';
import { UsersModule } from './users/users.module';
import { PostsController } from './posts/posts.controller';
import { PostsService } from './posts/posts.service';
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
import { NestjsFormDataModule } from 'nestjs-form-data';
import { MulterModule } from '@nestjs/platform-express';
import { multerOptionsFactory } from './common/utils/multer.options.factory';
import { Posthashtag } from './entities/Posthashtag';
import { HashtagsController } from './hashtags/hashtags.controller';
import { HashtagsService } from './hashtags/hashtags.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    UsersModule,
    PostsModule,
    AuthModule,
    HashtagsModule,
    Users,
    Posts,
    Hashtags,
    Posthashtag,
    TypeOrmModule.forRoot(ormconfig),
    TypeOrmModule.forFeature([
      Users,
      Posts,
      Comments,
      Images,
      Hashtags,
      Follow,
      Posthashtag,
    ]),
    NestjsFormDataModule,
    MulterModule.registerAsync({
      useFactory: multerOptionsFactory,
    }),
  ],
  controllers: [
    AppController,
    UsersController,
    PostsController,
    HashtagsController,
  ],
  providers: [AppService, UsersService, PostsService, HashtagsService],
})
export class AppModule {}
