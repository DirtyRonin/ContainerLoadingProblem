import { IGoods, IOrder } from '../interfaces';

export class Order implements IOrder {
  constructor(public id: number, public name: string, public goods: IGoods[]) {}

  public static AsInitializeDefault = (
    name = ""
  ) => new Order(0, name, []);
}
