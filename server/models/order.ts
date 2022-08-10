import { BelongsToMany, Column, Model, Table } from 'sequelize-typescript';
import { Goods, GoodsOrder, GoodsOrderTruck, Truck } from '.';

@Table
export class Order extends Model {
  @BelongsToMany(() => Goods, () => GoodsOrder)
  goods!: Goods[];

  @BelongsToMany(() => Goods, () => GoodsOrderTruck)
  assignedGoods!: Goods[];

  @BelongsToMany(() => Truck, () => GoodsOrderTruck)
  assignedTrucks!: Truck[];

  @Column name!: string;
}
