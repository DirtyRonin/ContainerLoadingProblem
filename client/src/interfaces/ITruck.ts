import { IContainer,IEntity } from ".";

export interface ITruck extends IContainer,IEntity {
    vehicleIdentifier: string;
    maxWeight: number;
    loadingTime: number;
    dischargeTime: number;
  }