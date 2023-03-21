import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from 'src/entities/Users';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users)
    private userRepository: Repository<Users>,
  ) {}

  async signUp(email: string, nickname: string, password: string) {
    await this.userRepository.save({
      email,
      nickname,
      password,
    });
  }
}
