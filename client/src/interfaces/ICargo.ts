import { IGoods, IEntity } from '.';

export interface ICargo extends IEntity{
  goodsId: number;
  orderId: number;
  singleGoods: IGoods;
  quantity: number;
  height: number;
  isStackable: boolean;
}
