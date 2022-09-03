import { IContainer, IEntity, initializeContainer } from '.';

export interface ITruck extends IContainer, IEntity {
  vehicleIdentifier: string;
  maxWeight: number;
  loadingTime: number;
  dischargeTime: number;
}

export const initializeTruck = (): ITruck => ({
  _id: '',
  vehicleIdentifier: '',
  maxWeight: 0,
  loadingTime: 0,
  dischargeTime: 0,
  ...initializeContainer(),
});
export const defaultTruck = (vehicleIdentifier = 'As15er'): ITruck => ({
  _id: '',
  vehicleIdentifier,
  height: 400,
  width: 200,
  length: 700,
  maxWeight: 15000,
  loadingTime: 3000,
  dischargeTime: 1500,
});
