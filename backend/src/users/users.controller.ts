import { Controller, Body, Post, UseGuards, Req, Res } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { User } from '../common/decoratos/user.decorator';
import { LocalAuthGuard } from '../auth/local-auth.guard';
import { NotLoggedInGuard } from '../auth/not-logged-in.guard';
import { LoggedInGuard } from '../auth/logged-in.guard';

@ApiTags('USERS')
@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @UseGuards(new NotLoggedInGuard())
  @ApiOperation({ summary: '회원가입' })
  @Post('signup')
  async signUp(@Body() body) {
    await this.userService.signUp(body.email, body.nickname, body.password);
  }

  @ApiOperation({ summary: '로그인' })
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async logIn(@User() user) {
    const posts = await this.userService.getPosts(user);
    const followers = await this.userService.getFollowers(user);
    const followings = await this.userService.getFollowings(user);

    const result = {
      id: user.id,
      email: user.email,
      nickname: user.nickname,
      Posts: posts.posts,
      Followings: followings.followings,
      Followers: followers.followers,
    };

    return result;
  }

  @ApiOperation({ summary: '로그아웃' })
  @UseGuards(new LoggedInGuard())
  @Post('logout')
  logOut(@Req() req, @Res() res) {
    req.logOut(function (err) {
      if (err) {
        res.send(err);
      }
    });
    res.clearCookie('connect.sid', { httpOnly: true });
    res.send('ok');
  }
}
