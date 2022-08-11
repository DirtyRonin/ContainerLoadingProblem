import { BelongsTo, Column, ForeignKey, Model, Table } from 'sequelize-typescript';
import { Order } from './order';
import { Truck } from './truck';



@Table
export class Cargo extends Model {
  @ForeignKey(() => Truck)
  @Column({allowNull:true})
  truckId!: number;

  @BelongsTo(() => Truck)
  truck!: Truck;

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
