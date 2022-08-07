import { IArea } from '.';

export interface ICargo {
  id: number;
  goodsId: number;
  orderId: number;
  singleGoods: IArea;
  quantity: number;
  height: number;
  isStackable: boolean;
}
