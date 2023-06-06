import { OrderProductEntity } from 'src/modules/order-products/entities/order-product.entity';
import { ShopEntity } from 'src/modules/shops/entities/shop.entity';
import { UserEntity } from 'src/modules/users/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'orders' })
export class OrderEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToMany(() => OrderProductEntity, (orderProducts) => orderProducts.order)
  orderProducts: OrderProductEntity[];

  @ManyToOne(() => UserEntity, (user) => user.orders, {
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  user: UserEntity;

  @ManyToOne(() => ShopEntity, (shop) => shop.orders, {
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  shop: ShopEntity;

  @CreateDateColumn()
  createdAt: Date;
}
