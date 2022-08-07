import { IArea, IEntity } from '.';

export interface ICargo extends IEntity{
  goodsId: number;
  orderId: number;
  singleGoods: IArea;
  quantity: number;
  height: number;
  isStackable: boolean;
}
