import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { RolesGuard } from 'src/guards/roles.guard';
import { CreateProductDTO } from './dto';
import { ProductEntity } from './entities/product.entity';
import { Role, Roles } from 'src/decorators/roles.decorator';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin)
  @Post()
  createProduct(@Body() dto: CreateProductDTO) {
    return this.productsService.createProduct(dto);
  }

  @Get()
  getProducts(@Query('shopId') subGroupId: number): Promise<ProductEntity[]> {
    return this.productsService.getProducts(subGroupId);
  }

  @Get(':id')
  getProduct(@Param('id') id: number): Promise<ProductEntity> {
    return this.productsService.getProduct(id);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin)
  @Patch(':id')
  updateProduct(
    @Body() dto: Omit<CreateProductDTO, 'shopId'>,
    @Param('id') id: number,
  ): Promise<string> {
    return this.productsService.updateProduct(id, dto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin)
  @Delete(':id')
  removeProduct(@Param('id') id: number): Promise<string> {
    return this.productsService.removeProduct(id);
  }
}
