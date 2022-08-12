import { IOrder } from '../interfaces';

export class Order implements IOrder {
  constructor(public id: number, public orderName: string) {}

  public static AsInitializeDefault = (orderName = '') => new Order(0, orderName);
}
