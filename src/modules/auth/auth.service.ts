import { BadRequestException, Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { TokensService } from '../tokens/tokens.service';
import { UserEntity } from '../users/entities/user.entity';
import { AuthResponse } from 'src/types';
import { CreateUserDTO } from '../users/dto';
import { LoginUserDTO } from './dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly tokensService: TokensService,
  ) {}

  async createResponse(user: UserEntity): Promise<AuthResponse> {
    const { id, role, ...userData } = user;
    const token = this.tokensService.generateJwtToken({ id, role });
    return { userData: { ...userData, role }, token };
  }

  async registerUser(dto: CreateUserDTO): Promise<AuthResponse> {
    const existUserPhone = await this.usersService.findUserByPhone(dto.phone);
    if (existUserPhone)
      throw new BadRequestException(`${dto.phone} attached to another user!`);

    const existUserEmail = await this.usersService.findUserByEmail(dto.email);
    if (existUserEmail)
      throw new BadRequestException(`${dto.email} attached to another user!`);

    if (
      dto.email === process.env.ADMIN_EMAIL &&
      dto.phone === process.env.ADMIN_PHONE
    )
      dto.role = 'ADMIN';
    const user = await this.usersService.createUser(dto);

    return this.createResponse(user);
  }

  async loginUser(dto: LoginUserDTO): Promise<AuthResponse> {
    const user = await this.usersService.findUserByPhone(dto.phone);
    if (!user)
      throw new BadRequestException(`${dto.phone} not attached to any user!`);

    if (user.email !== dto.email)
      throw new BadRequestException(
        `${dto.email} does not belong ${dto.phone}`,
      );

    return this.createResponse(user);
  }

  async updateUser(id: number, dto: CreateUserDTO): Promise<AuthResponse> {
    await this.usersService.updateUser(id, dto);
    const user = await this.usersService.findUserById(id);
    return await this.createResponse(user);
  }
}
