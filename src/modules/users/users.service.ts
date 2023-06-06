import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { Repository } from 'typeorm';
import { hash } from 'bcrypt';
import { CreateUserDTO } from './dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async hashPassword(password: string): Promise<string> {
    return await hash(password, 5);
  }

  async findUserByPhone(phone: string): Promise<UserEntity> {
    return await this.userRepository.findOneBy({ phone });
  }

  async findUserById(id: number): Promise<UserEntity> {
    return await this.userRepository.findOneBy({ id });
  }

  async findUserByEmail(email: string): Promise<UserEntity> {
    return await this.userRepository.findOneBy({ email });
  }

  async createUser(dto: CreateUserDTO): Promise<UserEntity> {
    return await this.userRepository.save({ ...dto });
  }

  async removeUser(id: number): Promise<string> {
    await this.userRepository.delete({ id });
    return 'Deleted';
  }

  async updateUser(id: number, dto: CreateUserDTO) {
    // const existUserPhone = await this.findUserByPhone(dto.phone);
    // if (existUserPhone)
    //   throw new BadRequestException(
    //     `${dto.phone} закріплений за (іншим користувачем)!`,
    //   );

    // const existUserEmail = await this.findUserByEmail(dto.email);
    // if (existUserEmail)
    //   throw new BadRequestException(
    //     `${dto.email} закріплений за (іншим користувачем)!`,
    //   );

    await this.userRepository.update({ id }, { ...dto });
  }
}
