import { IArea, ICargo, IGoods } from '../interfaces';
import { Area } from '.';

export class Cargo implements ICargo {
  constructor(
    public id: number,
    public goodsId: number,
    public orderId: number,
    public singleGoods: IArea,
    public quantity: number,
    public isStackable: boolean,
    public height: number
  ) {}

  public static AsInitializeDefault = (singleGoods?: IGoods) => new Cargo(0,0,0,singleGoods ?? Area.AsInitializeDefault, 0, false, 0);
}
