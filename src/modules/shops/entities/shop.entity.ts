// import { CouponEntity } from 'src/modules/coupons/entities/coupon.entity';
import { CouponEntity } from 'src/modules/coupons/entities/coupon.entity';
import { ProductEntity } from 'src/modules/products/entities/product.entity';
import { OrderEntity } from 'src/modules/orders/entities/order.entity';
import { ShopAddressEntity } from 'src/modules/shop-addresses/entities/shop-address.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'shops' })
export class ShopEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false, unique: true })
  name: string;

  @OneToMany(() => ProductEntity, (products) => products.shop)
  products: ProductEntity[];

  @OneToMany(() => ShopAddressEntity, (addresses) => addresses.shop)
  addresses: ShopAddressEntity[];

  @OneToMany(() => OrderEntity, (orders) => orders.shop)
  orders: OrderEntity[];

  @OneToMany(() => CouponEntity, (coupons) => coupons.shop)
  coupons: CouponEntity[];
}
