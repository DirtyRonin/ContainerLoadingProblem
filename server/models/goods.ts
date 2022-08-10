import { BelongsToMany, Column, Model, Table } from 'sequelize-typescript';
import { GoodsOrder, GoodsOrderTruck, Order, Truck } from './';

@Table
export class Goods extends Model {
  @BelongsToMany(() => Goods, () => GoodsOrder)
  orders!: Order[];

  @BelongsToMany(() => Goods, () => GoodsOrderTruck)
  assignedOrders!: Order[];

  @BelongsToMany(() => Truck, () => GoodsOrderTruck)
  assignedTrucks!: Truck[];

  @Column name!: string;
  @Column width!: number;
  @Column length!: number;
  @Column weight!: number;
  @Column isReadonly!: boolean;
  
}
