import { Module } from '@nestjs/common';
import { PostsModule } from './posts/posts.module';
import { UsersModule } from './users/users.module';
import { UsrsService } from './usrs/usrs.service';

@Module({
  imports: [PostsModule, UsersModule],
  providers: [UsrsService],
})
export class AppModule {}
