import { Goods, IGoods } from "./Goods";

export interface ICargo {
  singleGoods: IGoods;
  quantity: number;
  isStackable: boolean;
}

export class Cargo implements ICargo {
  constructor(
    public singleGoods: IGoods,
    public quantity: number,
    public isStackable: boolean
  ) {}

  public static AsInitializeDefault = (name = "") =>
    new Cargo(Goods.AsInitializeDefault(name), 0, false);

  public static ToCargo = (cargo: ICargo): Cargo =>
    new Cargo(cargo.singleGoods, cargo.quantity, cargo.isStackable);
}
