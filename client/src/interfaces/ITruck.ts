import { IContainer } from "./IContainer";

export interface ITruck extends IContainer {
    id: number;
    vehicleIdentifier: string;
    maxWeight: number;
    loadingTime: number;
    dischargeTime: number;
    isReadonly: boolean;
  }