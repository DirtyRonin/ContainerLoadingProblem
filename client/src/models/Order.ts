import { IGoods } from ".";

export interface IOrder {}

export class Order implements IOrder {
  constructor(public allGoods: IGoods[]) {}
}
