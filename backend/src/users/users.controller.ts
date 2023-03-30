import {
  Controller,
  Body,
  Post,
  UseGuards,
  Req,
  Res,
  Get,
  Patch,
} from '@nestjs/common';
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

  // 여기 수정해야 된다.
  @ApiOperation({ summary: '로그인 유지' })
  @Get('/')
  async getUserInfo(@User() user) {
    return this.userService.getUserInfo(user);
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
}
