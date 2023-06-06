import { OrderEntity } from 'src/modules/orders/entities/order.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'users' })
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  phone: string;

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false, default: 'USER' })
  role: string;

  @Column({ nullable: false })
  email: string;

  @Column({ nullable: false })
  address: string;

  @OneToMany(() => OrderEntity, (orders) => orders.user)
  orders: OrderEntity[];

  @CreateDateColumn()
  createdAt: Date;
}
