import { Schema } from 'mongoose';
import { ITruck } from '../interfaces/ITruck';

export const truckSchema = new Schema<ITruck>({
  vehicleIdentifier: { type: String, required: true },
  loadingTime: { type: Number, required: true },
  dischargeTime: { type: Number, required: true },
  height: { type: Number, required: true },
  width: { type: Number, required: true },
  length: { type: Number, required: true },
  maxWeight: { type: Number, required: true },
});
