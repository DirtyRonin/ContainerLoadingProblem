import { IGoods, IEntity } from '.';

export interface IOrder extends IEntity {
  goods: IGoods[];
  name: string;
}
