import { ICargo, IContainer, IMathHelper, IStacking } from '../../interfaces/index';
import { Stacking } from './Stacking';

export class MathHelper implements IMathHelper {
  public GetAreaRectangle = (container: IContainer): number => container.length * container.width;

  public CalculateStackingFactor = (cargo: ICargo, containerHeight: number): IStacking => {
    const { singleGoods, isStackable } = cargo;

    if (!isStackable) return Stacking.AsInitializeDefault;

    const stackingFactor = Math.floor(containerHeight / singleGoods.height);
    const remainingHeight = containerHeight - stackingFactor * singleGoods.height;

    return new Stacking(stackingFactor, remainingHeight);
  };

  public AddContainersUp = (a: IContainer, b: IContainer) => {
    const truckA = { ...a };
    const truckB = { ...b };

    truckA.height += truckB.height;
    truckA.length += truckB.length;
    truckA.width += truckB.width;

    return { ...truckA };
  };

  public IsFitting = (container: IContainer, cargo: ICargo): boolean => {
    const {
      singleGoods: { length, width, height },
    } = cargo;

    if(length < 1) return false

    if (length > container.length && length > container.width) return false;
    if (width > container.width) return false;
    if (height > container.height) return false;

    return true;
  };
}
