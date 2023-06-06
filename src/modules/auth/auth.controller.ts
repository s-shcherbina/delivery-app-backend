import { Body, Controller, Patch, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDTO } from '../users/dto';
import { AuthResponse } from 'src/types';
import { LoginUserDTO } from './dto';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { UserId } from 'src/decorators/user.id.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async registerUser(@Body() dto: CreateUserDTO): Promise<AuthResponse> {
    return this.authService.registerUser(dto);
  }

  @Post('login')
  async loginUser(@Body() dto: LoginUserDTO): Promise<AuthResponse> {
    return this.authService.loginUser(dto);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('user')
  async updateUser(
    @Body() dto: CreateUserDTO,
    @UserId() id: number,
  ): Promise<AuthResponse> {
    return this.authService.updateUser(id, dto);
  }
}
