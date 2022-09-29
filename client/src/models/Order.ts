import { ICargo, IOrder } from '../interfaces';

export class Order implements IOrder {
  private constructor(public _id: string, public orderName: string,public cargos: ICargo[]) {}

  public static AsInitializeDefault = (orderName = '') => new Order('', orderName,[]);
}
