import { IGoods } from "../interfaces/index";

export interface IOrder {}

export class Order implements IOrder {
  constructor(public allGoods: IGoods[]) {}
}