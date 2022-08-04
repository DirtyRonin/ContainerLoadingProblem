import { BelongsToMany, Column, Model, Table } from 'sequelize-typescript';
import { Goods, GoodsOrderItem } from '.';

@Table
export class OrderItem extends Model {
  @BelongsToMany(() => Goods, () => GoodsOrderItem)
  goods!: Goods[];

  @Column name!: string;
}
