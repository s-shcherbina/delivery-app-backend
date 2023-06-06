import { ImageEntity } from 'src/modules/images/entities/image.entity';
import { OrderProductEntity } from 'src/modules/order-products/entities/order-product.entity';
import { ShopEntity } from 'src/modules/shops/entities/shop.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'products' })
export class ProductEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false, unique: true })
  name: string;

  @Column({ nullable: false })
  price: string;

  @OneToMany(() => OrderProductEntity, (orderProducts) => orderProducts.product)
  orderProducts: OrderProductEntity[];

  @OneToOne(() => ImageEntity, (image) => image.product)
  image: ImageEntity;

  @ManyToOne(() => ShopEntity, (shop) => shop.products, {
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  shop: ShopEntity;
}
