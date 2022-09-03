import { Types } from "mongoose";
import { IEntity } from "./IEntity";

export interface ITruck extends IEntity{
  vehicleIdentifier: string;
  loadingTime: number;
  dischargeTime: number;
  height: number;
  width: number;
  length: number;
  maxWeight: number;
  routes:[Types.ObjectId]
}
