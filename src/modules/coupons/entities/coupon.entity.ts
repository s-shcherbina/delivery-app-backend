import { ShopEntity } from 'src/modules/shops/entities/shop.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'coupons' })
export class CouponEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false })
  code: string;

  @Column()
  image: string;

  @ManyToOne(() => ShopEntity, (shop) => shop.coupons, {
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  shop: ShopEntity;
}
