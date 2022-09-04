import { Schema } from 'mongoose';
import { CARGO_CONST, ROUTE_CONST, TRUCK_CONST } from '../config/consts';
import { ITruckLoading } from '../interfaces/ITruckLoading';

export const truckLoadingSchema = new Schema<ITruckLoading>({
  cargoId: { type: Schema.Types.ObjectId, ref: CARGO_CONST },
  truckId: { type: Schema.Types.ObjectId, ref: TRUCK_CONST },
  routeId: { type: Schema.Types.ObjectId, ref: ROUTE_CONST },
});
