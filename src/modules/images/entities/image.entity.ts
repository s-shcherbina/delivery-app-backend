import { ProductEntity } from 'src/modules/products/entities/product.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'images' })
export class ImageEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  name: string;

  @OneToOne(() => ProductEntity, (product) => product.image, {
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  product: ProductEntity;
}
