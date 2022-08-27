import { injectable } from 'inversify';

import _ from 'lodash';

import { IArea, ICargo, IContainer, IContainerHelper, ILoadSummary, IStacking } from '../../interfaces/index';
import { Stacking } from './Stacking';

@injectable()
export class ContainerHelper implements IContainerHelper {
  public AddContainersUp = (a: IContainer, b: IContainer) => {
    const truckA = { ...a };
    const truckB = { ...b };

    truckA.height += truckB.height;
    truckA.length += truckB.length;
    truckA.width += truckB.width;

    return { ...truckA };
  };

  public CompareByVolume = (a: IContainer, b: IContainer, mulitplierA = 1, mulitplierB = 1): number => {
    const volumeA = this.CalculateVolumeForRectangle(a) * mulitplierA;
    const volumeB = this.CalculateVolumeForRectangle(b) * mulitplierB;

    if (volumeA < volumeB) return 1;
    if (volumeA > volumeB) return -1;

    return 0;
  };

  public CompareByLoadingMeter = (a: ILoadSummary, b: ILoadSummary): number => {
    if (a.loadingMeter < b.loadingMeter) return 1;
    if (a.loadingMeter > b.loadingMeter) return -1;

    return 0;
  };

  public SortCargos(cargos: ICargo[]) {
    const all = [...cargos];

    const groups = _.groupBy(all, (cargo) => cargo.orderId);

    Object.keys(groups).forEach((key) =>
      groups[key].sort((a, b) =>
        this.CompareByVolume(
          { length: a.length, width: a.width, height: a.height },
          { length: b.length, width: b.width, height: b.height },
          a.quantity,
          b.quantity
        )
      )
    );

    return groups;
  }

  public CalculateVolumeForRectangle = (container: IContainer) => this.CalculateAreaForRectangle(container) * container.height;
  CalculateAreaForRectangle = (area: IArea): number => area.length * area.width;

  public CalculateGoodsPerRow(singleGoodsWidth: number, containerWidth: number): number {
    return Math.floor(containerWidth / singleGoodsWidth);
  }

  public CalculateLoadingMeterBase(singleGoodsOfCargo: IArea, container: IContainer): number {
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

    return { stackingFactor, remainingHeight };
  };

  public IsFitting = (container: IContainer, cargo: ICargo): boolean => {
    const { length, width, height } = cargo;

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
    if (!this.IsValidContainer(cargo)) return false;
    if (cargo.quantity < 1) return false;

    return true;
  };
}
