import { ProductEntity } from 'src/modules/products/entities/product.entity';
import { OrderEntity } from 'src/modules/orders/entities/order.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'order_products' })
export class OrderProductEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  number: number;

  @ManyToOne(() => ProductEntity, (product) => product.orderProducts, {
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  product: ProductEntity;

  @ManyToOne(() => OrderEntity, (order) => order.orderProducts, {
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  order: OrderEntity;
}
