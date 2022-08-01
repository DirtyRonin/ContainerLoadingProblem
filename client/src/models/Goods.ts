import { IGoods } from "../interfaces/index";

export class Goods implements IGoods {
  constructor(
    public id: number,
    public name: string,
    public height: number,
    public width: number,
    public length: number,
    public weight: number,
  ) {}

  public static AsInitializeDefault = (name = "") =>
    new Goods(0, name, 0, 0, 0, 0);
  public static AsSuperHeavy = (name = "Medium Sized Goods") =>
    new Goods(0, name, 100, 100, 100, 1000);
}
