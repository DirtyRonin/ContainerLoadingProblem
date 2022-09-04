import { IEntity } from "./IEntity";

export interface ITruckLoading extends IEntity {
    cargoId: string;
    truckId: string;
    routeId: string;
  }