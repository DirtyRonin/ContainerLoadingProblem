import { Schema } from 'mongoose';
import { Column, HasMany, Model, Table } from 'sequelize-typescript';
import { CargoSeq } from '.';
import { IOrder } from '../interfaces';

export const orderSchema = new Schema<IOrder>({
  orderName: { type: String, required: true },
  cargos:[{ type: Schema.Types.ObjectId, ref: 'Cargo' }]
});

@Table
export class OrderSeq extends Model {
  @HasMany(() => CargoSeq)
  cargos!:CargoSeq[]
  
  @Column orderName!: string;
}
