import { model, Schema, Types } from 'mongoose';
import { HasOne, BelongsTo, Column, ForeignKey, Model, Table } from 'sequelize-typescript';

import {} from 'sequelize/types';
import { orderSchema, OrderSeq } from './order';
import { TruckLoading } from './truckLoading';
import { ICargo, IOrder } from '../interfaces';
import { RecordOfSchemas } from './recordOfSchemas';

export const cargoSchema = new Schema<ICargo>(
  {
    name: { type: String, required: true },
    width: { type: Number, required: true },
    length: { type: Number, required: true },
    weight: { type: Number, required: true },
    quantity: { type: Number, required: true },
    height: { type: Number, required: true },
    isStackable: { type: Boolean, required: true },
    orderId: { type: Schema.Types.ObjectId, ref: 'Order' },
  }
);

cargoSchema.post('save', function (doc) {
  console.log(`add cargo 'id ${doc._id}' to order '${doc.orderId}'`);
  const orderModel = model<IOrder>(RecordOfSchemas.Order, orderSchema);
  orderModel.findById(doc.orderId).then((order) => {
    if (!order) return;

    order.cargos.push(doc._id);
    order.save();
  });
});

cargoSchema.post('deleteOne', function (doc) {
  console.log(`remove cargo id '${doc._id}' from order '${doc.orderId}'`);
  const orderModel = model<IOrder>(RecordOfSchemas.Order, orderSchema);
  orderModel.findById(doc.orderId).then((order) => {
    if (!order) return;

    const index = order.cargos.findIndex((x) => x === doc._id);
    order.cargos.splice(index, 1);

    order.save();
  });
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
