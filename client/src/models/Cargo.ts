import { ICargo, IGoods } from '../interfaces';
import { Goods } from '.';

export class Cargo implements ICargo {
  constructor(
    public id: number,
    public goodsId: number,
    public orderId: number,
    public singleGoods: IGoods,
    public quantity: number,
    public isStackable: boolean,
    public height: number
  ) {}

  public static AsInitializeDefault = (singleGoods?: IGoods) => new Cargo(0,0,0,singleGoods ?? Goods.AsInitializeDefault(''), 0, false, 0);
}
