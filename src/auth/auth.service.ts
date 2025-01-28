import { Injectable } from '@nestjs/common';
import { UserDto } from './user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../typeorm/entities';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {
  constructor(@InjectRepository(UserEntity) private readonly userRepository: Repository<UserEntity>) {}

  public async validateUser(userDto: UserDto) {
    let user = await this.userRepository.findOneBy({ email: userDto.email });
    if (!user) {
      user = this.userRepository.create(userDto);
      await this.userRepository.save(user);
    }
    console.log(user);
    return user;
  }
}
