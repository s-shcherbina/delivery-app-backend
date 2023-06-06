import { Module } from '@nestjs/common';
import { OrderProductsController } from './order-products.controller';
import { OrderProductsService } from './order-products.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderProductEntity } from './entities/order-product.entity';
import { ProductsModule } from '../products/products.module';
import { OrdersModule } from '../orders/orders.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([OrderProductEntity]),
    ProductsModule,
    OrdersModule,
  ],
  controllers: [OrderProductsController],
  providers: [OrderProductsService],
})
export class OrderProductsModule {}
