import { Module } from '@nestjs/common';
import { ShopAddressesController } from './shop-addresses.controller';
import { ShopAddressesService } from './shop-addresses.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ShopAddressEntity } from './entities/shop-address.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ShopAddressEntity])],
  controllers: [ShopAddressesController],
  providers: [ShopAddressesService],
})
export class ShopAddressesModule {}
