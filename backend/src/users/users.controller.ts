import { Controller, Body, Post, Get } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UsersService } from './users.service';

@ApiTags('USERS')
@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @ApiOperation({ summary: '회원가입' })
  @Post('signup')
  async signUp(@Body() body) {
    await this.userService.signUp(body.email, body.nickname, body.password);
  }
}
