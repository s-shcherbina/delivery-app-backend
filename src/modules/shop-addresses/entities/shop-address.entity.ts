import { ShopEntity } from 'src/modules/shops/entities/shop.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'shop_addresses' })
export class ShopAddressEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  address: string;

  @ManyToOne(() => ShopEntity, (shop) => shop.addresses, {
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  shop: ShopEntity;
}
