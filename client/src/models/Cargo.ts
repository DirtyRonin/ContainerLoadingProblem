import { IArea,ICargo } from "../interfaces";
import { Area } from ".";



export class Cargo implements ICargo {
  constructor(
    public singleGoods: IArea,
    public quantity: number,
    public isStackable: boolean,
    public height:number
  ) {}

  public static AsInitializeDefault = (name = "") =>
    new Cargo(Area.AsInitializeDefault, 0, false,0);
}
