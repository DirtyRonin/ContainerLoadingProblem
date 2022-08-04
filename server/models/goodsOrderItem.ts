import { Table, Model, ForeignKey, Column } from 'sequelize-typescript';
import { Goods } from './goods';
import { OrderItem } from './OrderItem';

@Table
export class GoodsOrderItem extends Model {
  @ForeignKey(() => Goods)
  @Column
  goodsId!: number;

  @ForeignKey(() => OrderItem)
  @Column
  orderItemId!: number;

  @Column
  quantity!: number;
}
