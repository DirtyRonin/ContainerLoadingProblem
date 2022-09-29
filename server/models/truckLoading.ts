import { Schema } from 'mongoose';
import { CARGO_CONST, ID_CONST, ROUTE_CONST, TRUCKLOADING_CARGOID_CONST, FIELDS_CARGOS_CONST, TRUCKLOADING_CONST, TRUCKLOADING_TRUCKID_CONST, FIELDS_TRUCKS_CONST, TRUCK_CONST, ORDER_CONST, FIELDS_ORDERS_CONST, TRUCKLOADING_ORDERID_CONST } from '../config/consts';
import { ITruckLoading } from '../interfaces/ITruckLoading';

export const truckLoadingSchema = new Schema<ITruckLoading>({
  cargoId: { type: Schema.Types.ObjectId, ref: CARGO_CONST },
  truckId: { type: Schema.Types.ObjectId, ref: TRUCK_CONST },
  routeId: { type: Schema.Types.ObjectId, ref: ROUTE_CONST },
  orderId: { type: Schema.Types.ObjectId, ref: ORDER_CONST },
},
{
  toJSON: { virtuals: true }, // So `res.json()` and other `JSON.stringify()` functions include virtuals
  toObject: { virtuals: true }, // So `console.log()` and other functions that use `toObject()` include virtuals
});

truckLoadingSchema.virtual(FIELDS_CARGOS_CONST, {
  ref: CARGO_CONST,
  localField: TRUCKLOADING_CARGOID_CONST,
  foreignField: ID_CONST,
})

truckLoadingSchema.virtual(FIELDS_TRUCKS_CONST, {
  ref: TRUCK_CONST,
  localField: TRUCKLOADING_TRUCKID_CONST,
  foreignField: ID_CONST,
});

truckLoadingSchema.virtual(FIELDS_ORDERS_CONST, {
  ref: ORDER_CONST,
  localField: TRUCKLOADING_ORDERID_CONST,
  foreignField: ID_CONST,
});
