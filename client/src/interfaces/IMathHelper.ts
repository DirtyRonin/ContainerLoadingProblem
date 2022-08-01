import { ICargo, IContainer, IStacking } from "./index";

export interface IMathHelper {
  GetAreaRectangle: (container: IContainer) => number;
  CalculateStackingFactor: (cargo: ICargo, containerHeight: number) => IStacking;
  AddContainersUp: (a: IContainer, b: IContainer) => IContainer;
  IsFitting(container:IContainer, cargo:ICargo):boolean
}
