import { IContainer, IEntity, initializeContainer, ITruckLoading } from '.';

export interface ICargo extends IEntity, IContainer {
  orderId: string;
  name: string;
  weight: number;
  quantity: number;
  isStackable: boolean;
}

export const initializeCargo = ({ name = 'New Cargo', orderId = '' }): ICargo => ({
  _id: '',
  orderId,
  name,
  weight: 0,
  quantity: 0,
  isStackable: false,
  ...initializeContainer(),
});

export interface IPopulatedCargo extends ICargo {
  /** every truckLoadings should only have one entry */
  truckLoadings: ITruckLoading[];
}

export const initializePopulatedCargo = (): IPopulatedCargo => ({
  ...initializeCargo({}),
  truckLoadings: [],
});


