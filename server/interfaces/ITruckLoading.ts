import { Schema } from "mongoose";
import { IEntity } from "./IEntity";

export interface ITruckLoading extends IEntity {
    cargoId: Schema.Types.ObjectId;
    truckId: Schema.Types.ObjectId;
    routeId: Schema.Types.ObjectId;
    orderId: Schema.Types.ObjectId;
}