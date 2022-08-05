import { BelongsToMany, Column, Model, Table } from 'sequelize-typescript';
import { GoodsOrderItem, OrderItem } from './';

@Table
export class Goods extends Model {
  @BelongsToMany(() => Goods, () => GoodsOrderItem)
  orderItems!: OrderItem[];

  @Column name!: string;
  @Column height!: number;
  @Column width!: number;
  @Column length!: number;
  @Column weight!: number;
  @Column isStackable!: boolean;
}
