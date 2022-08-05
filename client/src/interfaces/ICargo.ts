import { IArea } from '.';

export interface ICargo {
  singleGoods: IArea;
  quantity: number;
  height: number;
  isStackable: boolean;
}
