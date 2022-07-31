import { IContainer } from "../../models";

export interface IMathHelper {
  GetAreaRectangle: (container: IContainer) => number;
}

export class MathHelper implements IMathHelper {
  public GetAreaRectangle = (container: IContainer): number =>
    container.length * container.width;
}
