import { Schema } from 'mongoose';
import { CARGO_CONST } from '../config/consts';
import { IOrder } from '../interfaces';

export const orderSchema = new Schema<IOrder>({
  orderName: { type: String, required: true },
  cargos:[{ type: Schema.Types.ObjectId, ref: CARGO_CONST }]
});
