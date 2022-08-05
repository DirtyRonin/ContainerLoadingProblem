import { IGoods } from './index';

export interface IOrder {
  id:number;
  goods: IGoods[];
  name: string;
}
