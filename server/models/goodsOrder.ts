import { Table, Model, ForeignKey, Column } from 'sequelize-typescript';
import { Goods } from './goods';
import { Order } from './order';

@Table
export class GoodsOrder extends Model {
  @ForeignKey(() => Goods)
  @Column
  goodsId!: number;

  @ForeignKey(() => Order)
  @Column
  orderId!: number;

  @Column quantity!: number;
  @Column height!: number;
  @Column isStackable!: boolean;
}
