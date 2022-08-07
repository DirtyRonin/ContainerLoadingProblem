import { type } from 'os';
import { Table, Model, ForeignKey, Column, PrimaryKey, DataType, BelongsTo } from 'sequelize-typescript';
import { Goods } from './goods';
import { Order } from './order';

@Table
export class GoodsOrder extends Model {
  @Column({
    primaryKey: true,
    type: DataType.BIGINT,
    autoIncrement:true
  })
  id!: number;

  @ForeignKey(() => Goods)
  @Column
  goodsId!: number;

  @BelongsTo(()=>Goods)
  singleGoods!:Goods

  @ForeignKey(() => Order)
  @Column
  orderId!: number;

  @BelongsTo(()=>Order)
  order!:Order

  @Column quantity!: number;
  @Column height!: number;
  @Column isStackable!: boolean;
}
