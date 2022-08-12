import { HasOne,BelongsTo, Column, ForeignKey, Model, Table } from 'sequelize-typescript';
import {  } from 'sequelize/types';
import { Order } from './order';
import { TruckLoading } from './truckLoading';



@Table
export class Cargo extends Model {
  @HasOne(() => TruckLoading)
  truckLoading!: TruckLoading;

  

  @ForeignKey(() => Order)
  @Column({allowNull:false})
  orderId!: number;

  @BelongsTo(() => Order)
  order!: Order;

  @Column
  name!: string;
  @Column
  width!: number;
  @Column
  length!: number;
  @Column
  weight!: number;
  @Column
  quantity!: number;
  @Column
  height!: number;
  @Column
  isStackable!: boolean;
}
