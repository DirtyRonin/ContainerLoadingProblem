import { IContainer, IEntity, initializeContainer } from '.';

export interface ITruck extends IContainer, IEntity {
  vehicleIdentifier: string;
  maxWeight: number;
  loadingTime: number;
  dischargeTime: number;
}

export const initializeTruck = (): ITruck => ({
  id: 0,
  vehicleIdentifier: '',
  maxWeight: 0,
  loadingTime: 0,
  dischargeTime: 0,
  ...initializeContainer(),
});
