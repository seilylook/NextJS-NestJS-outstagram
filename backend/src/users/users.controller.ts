import {
  Controller,
  Body,
  Post,
  UseGuards,
  Req,
  Res,
  Get,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { User } from '../common/decoratos/user.decorator';
import { LocalAuthGuard } from '../auth/local-auth.guard';
import { NotLoggedInGuard } from '../auth/not-logged-in.guard';
import { LoggedInGuard } from '../auth/logged-in.guard';
import { query } from 'express';

@ApiTags('USERS')
@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  // 여기 수정해야 된다.
  @ApiOperation({ summary: '로그인 유지' })
  @Get('/')
  async getMyInfo(@User() user) {
    return this.userService.getMyInfo(user);
  }

  @ApiOperation({ summary: '특정 사용자 정보 가져오기' })
  @Get('/:userId')
  async getUserInfo(@Param('userId') userId: number) {
    // console.log('--------');
    // console.log('찾을 사용자 데이터', userId);
    // console.log('--------');
    // 여기서 에러가 발생한다.
    // return this.userService.getUserInfo(userId);
  }

  @ApiOperation({ summary: '특정 사용자 게시물 가져오기' })
  @Get('/:userId/posts')
  async getUserPosts(@Param('userId') userId: number, @Query() query) {
    const lastId = parseInt(query.lastId, 10);
    // console.log('사용자 아이디', userId);
    return await this.userService.getUserPosts(userId, lastId);
  }

  @ApiOperation({ summary: '회원가입' })
  @UseGuards(new NotLoggedInGuard())
  @Post('signup')
  async signUp(@Body() body) {
    await this.userService.signUp(body.email, body.nickname, body.password);
  }

  @ApiOperation({ summary: '로그인' })
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async logIn(@User() user) {
    return this.userService.login(user);
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

  @ApiOperation({ summary: '닉네임 수정' })
  @Patch('nickname')
  async updateNickname(@User() user, @Body() body) {
    return await this.userService.updateNickname(user, body.nickname);
  }

  @ApiOperation({ summary: '팔로우' })
  @Patch(':targetId/follow')
  async follow(@Param('targetId') targetId: number, @User() user) {
    // return
    // data:
    // {
    //   id: action.data.id,
    //   nickname: action.data.nickname,
    // }

    // 팔로우할 대상: 2
    // 내 계정: Users { id: 1, email: 'kim@kim.com', nickname: 'kim' }
    return await this.userService.follow(targetId, user.id);
  }

  @ApiOperation({ summary: '언팔로우' })
  @Delete(':targetId/follow')
  async unfollow(@Param('targetId') targetId: number) {
    // console.log('현재 로그인 한 계정', user);
    // console.log('언팔할 계정 아이디', targetId);

    return await this.userService.unfollow(targetId);
  }

  @ApiOperation({ summary: '팔로잉 데이터 가져오기' })
  @Get('followings')
  async loadFollowings(@User() user) {
    return await this.userService.loadFollowings(user.id);
  }

  @ApiOperation({ summary: '팔로워 데이터 가져오기' })
  @Get('followers')
  async loadFollowers(@User() user) {
    return await this.userService.loadFollowers(user.id);
  }

  @ApiOperation({ summary: '팔로워 삭제하기' })
  @Delete('followers/:targetId')
  async removeFollower(@Param('targetId') targetId: number, @User() user) {
    // console.log('현재 로그인 한 유저:', user);
    // console.log('지울 사용자 아이디:', targetId);
    return await this.userService.removeFollower(targetId, user.id);
  }
}
