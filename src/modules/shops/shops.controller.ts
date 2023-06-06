import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { Role, Roles } from 'src/decorators/roles.decorator';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { RolesGuard } from 'src/guards/roles.guard';
import { ShopsService } from './shops.service';
import { CreateShopDTO } from './dto';
import { ShopEntity } from './entities/shop.entity';

@Controller('shops')
export class ShopsController {
  constructor(private readonly shopsService: ShopsService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin)
  @Post()
  createShop(@Body() dto: CreateShopDTO): Promise<void> {
    return this.shopsService.createShop(dto);
  }

  @Get()
  getShops(): Promise<ShopEntity[]> {
    return this.shopsService.getShops();
  }

  @Get(':id')
  getShop(@Param('id') id: number): Promise<ShopEntity> {
    return this.shopsService.getShop(id);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin)
  @Patch(':id')
  updateGroup(
    @Body() dto: CreateShopDTO,
    @Param('id') id: number,
  ): Promise<string> {
    return this.shopsService.updateShop(id, dto);
  }

  @Roles(Role.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin)
  @Delete(':id')
  removeShop(@Param('id') id: number): Promise<string> {
    return this.shopsService.removeShop(id);
  }
}
