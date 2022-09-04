import { Schema } from 'mongoose';
import { ORDER_CARGOS_CONST, CARGO_CONST, ID_CONST, CARGO_ORDERID_CONST } from '../config/consts';
import { IOrder } from '../interfaces';

export const orderSchema = new Schema<IOrder>(
  {
    orderName: { type: String, required: true },
  },
  {
    toJSON: { virtuals: true }, // So `res.json()` and other `JSON.stringify()` functions include virtuals
    toObject: { virtuals: true }, // So `console.log()` and other functions that use `toObject()` include virtuals
  }
);

orderSchema.virtual(ORDER_CARGOS_CONST, {
  ref: CARGO_CONST,
  localField: ID_CONST,
  foreignField: CARGO_ORDERID_CONST,
});