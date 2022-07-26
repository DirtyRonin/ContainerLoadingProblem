import { model, Schema } from 'mongoose';

import { orderSchema } from './order';
import { ICargo, IOrder } from '../interfaces';
import { FIELDS_TRUCKLOADING_CONST, ID_CONST, ORDER_CONST, TRUCKLOADING_CARGOID_CONST, TRUCKLOADING_CONST } from '../config/consts';

export const cargoSchema = new Schema<ICargo>({
  name: { type: String, required: true },
  width: { type: Number, required: true },
  length: { type: Number, required: true },
  weight: { type: Number, required: true },
  quantity: { type: Number, required: true },
  height: { type: Number, required: true },
  isStackable: { type: Boolean, required: true },
  orderId: { type: Schema.Types.ObjectId, ref: ORDER_CONST },
},
{
  toJSON: { virtuals: true }, // So `res.json()` and other `JSON.stringify()` functions include virtuals
  toObject: { virtuals: true }, // So `console.log()` and other functions that use `toObject()` include virtuals
});

cargoSchema.virtual(FIELDS_TRUCKLOADING_CONST,{
  ref:TRUCKLOADING_CONST,
  localField: ID_CONST,
  foreignField: TRUCKLOADING_CARGOID_CONST
})

// /** saving object id on both sides, because in the app cargos will be fetched through 
//  * the order.cargos and this._id as well and where need to be always the orderID available 
//  * for grouping*/
// cargoSchema.post('save', function (doc) {
//   console.log(`add cargo 'id ${doc._id}' to order '${doc.orderId}'`);
//   const orderModel = model<IOrder>(ORDER_CONST, orderSchema);
//   orderModel.findById(doc.orderId).then((order) => {
//     if (!order) return;

//     order.cargos.push(doc._id);
//     order.save();
//   });
// });

// cargoSchema.pre('deleteOne', function (next) {

//   const keys = Object.keys(this);
//   const values = Object.values(this);
//   for (let index = 0; index < keys.length; index++) console.log(`'${keys[index]}' - '${values[index]}'`);
  
// next()
// });