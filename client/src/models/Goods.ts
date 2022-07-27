export interface IGoods {
  id: number;
  name: string;
  height: number;
  width: number;
  length: number;
  weight: number;
  quantity:number;
}

export class Goods implements IGoods {
  constructor(
    public id: number,
    public name: string,
    public height: number,
    public width: number,
    public length: number,
    public weight: number,
    public quantity:number
  ) {}

  public static AsDefault = (name = "") => new Goods(0, name, 0, 0, 0, 0,0);
}
