import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { PayloadToken } from 'src/types';

@Injectable()
export class TokensService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  generateJwtToken(userDataToken: PayloadToken) {
    return this.jwtService.sign(userDataToken, {
      secret: process.env.JWT_SECRET_ACCESS,
      expiresIn: process.env.JWT_ACCESS_EXPIRE,
    });
    // return token;
  }
}
