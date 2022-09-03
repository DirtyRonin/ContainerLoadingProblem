import { IGoods } from '../interfaces/index';

export class Goods implements IGoods {
  constructor(public _id: string, public name: string, public width: number, public length: number) {}

  public static AsInitializeDefault = (name = '') => new Goods('',name, 0, 0);
  public static WithValues = (length: number, width: number) => new Goods('','', width, length);
  public static AsSuperHeavy = (name = 'Medium Sized Goods') => new Goods('',name, 100, 100);
}
