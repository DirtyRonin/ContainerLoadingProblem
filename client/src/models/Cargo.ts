import { IContainer,ICargo } from "../interfaces";
import { Container } from "./index";



export class Cargo implements ICargo {
  constructor(
    public singleGoods: IContainer,
    public quantity: number,
    public isStackable: boolean
  ) {}

  public static AsInitializeDefault = (name = "") =>
    new Cargo(Container.AsInitializeDefault, 0, false);
}
