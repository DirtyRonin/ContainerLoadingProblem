import { IGoods, IEntity, ICargo } from '.';

export interface IOrder extends IEntity {
  orderName: string;
  cargos: ICargo[];
}

export const initializeOrder = (orderName = 'New Order'): IOrder => ({
  _id: '',
  orderName,
  cargos: [],
});
