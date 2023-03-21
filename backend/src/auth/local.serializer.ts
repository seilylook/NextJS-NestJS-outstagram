import { Injectable } from '@nestjs/common';
import { PassportSerializer } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Users } from '../entities/Users';
import { AuthService } from './auth.service';

@Injectable()
export class LocalSerializer extends PassportSerializer {
  constructor(
    private readonly authSercie: AuthService,
    @InjectRepository(Users)
    private userRepository: Repository<Users>,
  ) {
    super();
  }

  serializeUser(user: Users, done: CallableFunction) {
    done(null, user.id);
  }

  async deserializeUser(userId: string, done: CallableFunction) {
    return await this.userRepository
      .findOne({
        where: { id: +userId },
        select: ['id', 'email', 'nickname'],
        relations: ['Posts'],
      })
      .then((user) => {
        done(null, user);
      })
      .catch((error) => done(error));
  }
}
