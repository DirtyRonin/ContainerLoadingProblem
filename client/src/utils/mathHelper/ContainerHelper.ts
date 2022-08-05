import { IArea, ICargo, IContainer, IContainerHelper, IStacking } from '../../interfaces/index';
import { Stacking } from './Stacking';

export class ContainerHelper implements IContainerHelper {
  public AddContainersUp = (a: IContainer, b: IContainer) => {
    const truckA = { ...a };
    const truckB = { ...b };

    truckA.height += truckB.height;
    truckA.length += truckB.length;
    truckA.width += truckB.width;

    return { ...truckA };
  };

  public CalculateAreaForRectangle = (area: IArea): number => area.length * area.width;

  public CalculateGoodsPerRow(singleGoodsWidth: number, containerWidth: number): number {
    return Math.floor(containerWidth / singleGoodsWidth);
  }

  public CalculateLoadingMeterBase(singleGoodsOfCargo: IContainer, container: IContainer): number {
    return this.CalculateAreaForRectangle(singleGoodsOfCargo) / container.width;
  }
  public CalculateLoadingMeter(baseLoadingMeter: number, stackingFactor: number, countGoods: number): number {
    return (baseLoadingMeter / stackingFactor) * countGoods;
  }

  CalculateFullStackedRows(quantity: number, goodsPerFullStackedRow: number): number {
    return Math.floor(quantity / goodsPerFullStackedRow);
  }
  /** Based on the rule, that even if goods are stackable, the have to be placed horizontal row.
  If a row is full and stacking is allowed, the next row can be started on top of that.  
  If not all goods can be stacked in a full row and some are remaining, the miminum place the require counts as a fully vertical stacked column
  The maximum for required columns are the total goods per row. */
  public GetMinimumColumns = (goodsPerRow: number, remainingGoods: number): number => {
    return remainingGoods > goodsPerRow ? goodsPerRow : remainingGoods;
  };

  public CalculateStackingFactor = (cargo: ICargo, containerHeight: number): IStacking => {
    const { height, isStackable } = cargo;

    if (!isStackable) return Stacking.AsInitializeDefault;

    const stackingFactor = Math.floor(containerHeight / height);
    const remainingHeight = containerHeight - stackingFactor * height;

    return new Stacking(stackingFactor, remainingHeight);
  };

  public IsFitting = (container: IContainer, cargo: ICargo): boolean => {
    const {
      singleGoods: { length, width },
      height,
    } = cargo;

    if (!this.IsValidContainer(container)) return false;
    if (!this.IsValidCargo(cargo)) return false;

    if (length > container.length) {
      if (length > container.width) return false;
      if (width > container.length) return false;
    }
    if (width > container.width) {
      if (width > container.length) return false;
      if (length > container.width) return false;
    }
    if (height > container.height) return false;

    return true;
  };

  public IsValidContainer = (container: IContainer): boolean => {
    const { length, width, height } = container;

    if (length <= 0) return false;
    if (width <= 0) return false;
    if (height <= 0) return false;

    return true;
  };

  public IsValidCargo = (cargo: ICargo): boolean => {
    const { singleGoods, quantity, height } = cargo;

    if (!this.IsValidContainer({ ...singleGoods, height })) return false;
    if (quantity < 1) return false;

    return true;
  };
}
