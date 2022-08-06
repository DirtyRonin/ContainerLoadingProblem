import { type } from 'os';
import { Table, Model, ForeignKey, Column, PrimaryKey, DataType } from 'sequelize-typescript';
import { nameof } from 'ts-simple-nameof';
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

  @ForeignKey(() => Order)
  @Column
  orderId!: number;

  @Column quantity!: number;
  @Column height!: number;
  @Column isStackable!: boolean;
}
