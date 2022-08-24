import { IContainer, IEntity,initializeContainer } from '.';

export interface ICargo extends IEntity, IContainer {
  truckId: number | null;
  orderId: number;
  name: string;
  weight: number;
  quantity: number;
  isStackable: boolean;
}

export const initializeCargo = (name = ''): ICargo => ({
  id: 0,
  truckId: null,
  orderId: 0,
  name,
  weight: 0,
  quantity: 0,
  isStackable: false,
...initializeContainer()
});
