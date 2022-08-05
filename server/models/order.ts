import { BelongsToMany, Column, Model, Table } from 'sequelize-typescript';
import { Goods, GoodsOrder } from '.';

@Table
export class Order extends Model {
  @BelongsToMany(() => Goods, () => GoodsOrder)
  goods!: Goods[];

  @Column name!: string;
}
