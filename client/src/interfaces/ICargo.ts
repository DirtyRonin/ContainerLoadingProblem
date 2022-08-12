import { IContainer, IEntity } from '.';

export interface ICargo extends IEntity,IContainer {
  truckId: number | null;
  orderId: number;
  name: string;
  weight: number;
  quantity: number;
  isStackable: boolean;
}
