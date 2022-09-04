import { Schema } from 'mongoose';
import { ID_CONST, ROUTE_TRUCKLOADINGS_CONST, TRUCKLOADING_CONST, TRUCKLOADING_ROUTEID_CONST } from '../config/consts';
import { IRoute } from '../interfaces/IRoute';

export const routeSchema = new Schema<IRoute>(
  {
    from: { type: String, required: true },
    to: { type: String, required: true },
    // truckLoadings: [{ type: Schema.Types.ObjectId, ref: TRUCKLOADING_CONST }],
  },
  {
    toJSON: { virtuals: true }, // So `res.json()` and other `JSON.stringify()` functions include virtuals
    toObject: { virtuals: true }, // So `console.log()` and other functions that use `toObject()` include virtuals
  }
);

routeSchema.virtual(ROUTE_TRUCKLOADINGS_CONST, {
  ref: TRUCKLOADING_CONST,
  localField: ID_CONST,
  foreignField: TRUCKLOADING_ROUTEID_CONST,
});
