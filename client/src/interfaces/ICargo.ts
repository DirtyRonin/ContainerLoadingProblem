import { IContainer } from "./IContainer";

export interface ICargo {
    singleGoods: IContainer;
    quantity: number;
    isStackable: boolean;
  }