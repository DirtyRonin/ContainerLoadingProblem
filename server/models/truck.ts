import { Column, Model, Table, BelongsToMany } from 'sequelize-typescript';
import { Goods } from './goods';
import { GoodsOrderTruck } from './goodsOrderTruck';
import { Order } from './order';

@Table
export class Truck extends Model {
  @Column vehicleIdentifier!: string;
  @Column loadingTime!: number;
  @Column dischargeTime!: number;
  @Column height!: number;
  @Column width!: number;
  @Column length!: number;
  @Column maxWeight!: number;
  @Column isReadonly!: boolean;

  @BelongsToMany(() => Goods, () => GoodsOrderTruck)
  assignedGoods!: Goods[];

  @BelongsToMany(() => Order, () => GoodsOrderTruck)
  assignedOrders!: Order[];
}
