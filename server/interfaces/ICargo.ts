import { IEntity } from '.';

export interface ICargo extends IEntity {
  name: string;
  width: number;
  length: number;
  weight: number;
  quantity: number;
  height: number;
  isStackable: boolean;
}
