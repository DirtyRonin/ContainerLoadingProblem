import { IContainer, IEntity, initializeContainer } from '.';

export interface ICargo extends IEntity, IContainer {
  orderId:string
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
