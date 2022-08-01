import { IStacking } from "../../interfaces/IStacking";

export class Stacking implements IStacking {
  constructor(public stackingFactor: number, public remainingHeight: number) {}

  public static AsInitializeDefault = new Stacking(1, 0);
}
