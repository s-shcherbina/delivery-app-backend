import { Controller, Delete, Param, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { RolesGuard } from 'src/guards/roles.guard';
import { Role, Roles } from 'src/decorators/roles.decorator';
import { UserId } from 'src/decorators/user.id.decorator';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin)
  @Delete(':id')
  async removeUserByAdmin(@Param('id') id: number): Promise<string> {
    return this.usersService.removeUser(id);
  }

  @UseGuards(JwtAuthGuard)
  @Delete()
  async removeUser(@UserId() id: number) {
    return this.usersService.removeUser(id);
  }
}
