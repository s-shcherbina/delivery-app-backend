import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { TokensService } from './tokens.service';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [UsersModule],
  providers: [TokensService, JwtService],
  exports: [TokensService],
})
export class TokensModule {}
