import { ICargo } from "../../models";

export interface IStacking {
  stackingFactor: number;
  remainingHeight: number;
}

export class Stacking implements IStacking {
  constructor(public stackingFactor: number, public remainingHeight: number) {}

  public static AsInitializeDefault = new Stacking(1, 0);

  public static CalculateStackingFactor = (
    cargo: ICargo,
    containerHeight: number
  ): IStacking => {
    const { singleGoods, isStackable } = cargo;

    if (!isStackable) return this.AsInitializeDefault;

    const stackingFactor = Math.floor(containerHeight / singleGoods.height);
    const remainingHeight =
      containerHeight - stackingFactor * singleGoods.height;

    return new Stacking(stackingFactor, remainingHeight);
  };
}
