import { Module } from '@nestjs/common';
import { CouponsController } from './coupons.controller';
import { CouponsService } from './coupons.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CouponEntity } from './entities/coupon.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CouponEntity])],
  controllers: [CouponsController],
  providers: [CouponsService],
})
export class CouponsModule {}
