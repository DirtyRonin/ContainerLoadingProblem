import { Schema } from 'mongoose';
import { HasOne, BelongsTo, Column, ForeignKey, Model, Table } from 'sequelize-typescript';
import {} from 'sequelize/types';
import { OrderSeq } from './order';
import { TruckLoading } from './truckLoading';
import { ICargo } from '../interfaces';

export const cargoSchema = new Schema<ICargo>({
  name: { type: String, required: true },
  width: { type: Number, required: true },
  length: { type: Number, required: true },
  weight: { type: Number, required: true },
  quantity: { type: Number, required: true },
  height: { type: Number, required: true },
  isStackable: { type: Boolean, required: true },
});


@Table
export class CargoSeq extends Model {
  @HasOne(() => TruckLoading)
  truckLoading!: TruckLoading;

  @ForeignKey(() => OrderSeq)
  @Column({ allowNull: false })
  orderId!: number;

  @BelongsTo(() => OrderSeq)
  order!: OrderSeq;

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
