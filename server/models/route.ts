import { Schema } from 'mongoose';
import { CARGO_CONST } from '../config/consts';
import { IRoute } from '../interfaces/IRoute';


export const routeSchema = new Schema<IRoute>({
  from: { type: String, required: true },
  to: { type: String, required: true },
  cargos:[{ type: Schema.Types.ObjectId, ref: CARGO_CONST }]
});