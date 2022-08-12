import { ICargo, IGoods } from '../interfaces';
import { Goods } from '.';

export class Cargo implements ICargo {
  constructor(
    public id: number,
    public truckId: number | null,
    public orderId: number,
    public name: string,
    public width: number,
    public length: number,
    public weight: number,
    public quantity: number,
    public isStackable: boolean,
    public height: number,
  ) {}

  public static AsInitializeDefault = (singleGoods?: IGoods) => {
    const {name,width,length} = singleGoods ?? Goods.AsInitializeDefault('Empty');
    return new Cargo(0,null,0,name,width,length,0,0,false,0);
  };
  public static WithGoods = (id: number,
    truckId: number | null,
    orderId: number,
    singleGoods: IGoods | null,
    quantity: number,
    isStackable: boolean,
    height: number,) => {
    const {name,width,length} = singleGoods ?? Goods.AsInitializeDefault('Empty');
    return new Cargo(id,truckId,orderId,name,width,length,0,quantity,isStackable,height);
  };
}
