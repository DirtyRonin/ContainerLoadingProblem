import { ICargo, IGoods } from '../interfaces';
import { Goods } from '.';

export class Cargo implements ICargo {
  constructor(
    public _id: string,
    public orderId: string,
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
    return new Cargo('','',name,width,length,0,0,false,0);
  };
  public static WithGoods = (id: string,
    orderId:string,
    singleGoods: IGoods | null,
    quantity: number,
    isStackable: boolean,
    height: number,) => {
    const {name,width,length} = singleGoods ?? Goods.AsInitializeDefault('Empty');
    return new Cargo(id,orderId,name,width,length,0,quantity,isStackable,height);
  };
}
