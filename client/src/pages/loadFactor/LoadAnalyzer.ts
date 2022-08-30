import { ICargo, ITruck, IContainer, IContainerHelper, ILoadAnalyzer, ILoadSummary } from '../../interfaces';
import { KeyValueLoadSummary } from '../../models';
import { LoadSummary } from './LoadSummary';

import { TYPES } from '../../utils/shared/registerSymbols';
import { inject, injectable } from 'inversify';
import { AsDeepCopy, SortGeneric } from '../../utils/shared/ImmutableHelper';
import { ILoadSummaryIds } from '../../interfaces/ILoadSummaryIds';

@injectable()
export class LoadAnalyzer implements ILoadAnalyzer {
  @inject(TYPES.ContainerHelper)
  private _containerHelper: IContainerHelper; // inject with an constructure doesn't work

  public AnalyzeLoading = async (cargos: ICargo[], trucks: ITruck[]): Promise<number> => {
    let loadSummaries = 0;

    const sortedContainers = SortGeneric(trucks, this._containerHelper.CompareByVolume);

    // const sortedCargosDic = this._containerHelper.SortCargos([...cargos]);

    // const loading = {};

    for (let i = 0; i < sortedContainers.length; i++)
      for (let y = 0; y < cargos.length; y++) {
        loadSummaries += (await this.AnalyseSingleLoad(cargos[y], trucks[i])).loadingMeter;
      }

    return loadSummaries;
  };

  public AnalyzeLoadingForSummaries = async (cargos: ICargo[], trucks: ITruck[], selectedLoadSummaries: ILoadSummaryIds[]): Promise<KeyValueLoadSummary[]> => {
    const loadSummaries: KeyValueLoadSummary[] = [];

    const sortedContainers = SortGeneric(trucks, this._containerHelper.CompareByVolume);

    // const sortedCargosDic =  this._containerHelper.SortCargos([...cargos])

    for (let i = 0; i < sortedContainers.length; i++) {
      const newEntry: KeyValueLoadSummary = { key: sortedContainers[i].id, values: [] };

      for (let y = 0; y < cargos.length; y++) {
        /** To make sure, that selected cargos are still available when they linked order is closed */
        /** Cargos will no longer be added to every trucks when an order is selected */

        const isSelected = selectedLoadSummaries.find((selected) => cargos[y].id === selected.cargoId);

        // if the cargo is linked to the current cargo
        // and this is not the specific truck , stop here
        if (isSelected !== undefined && isSelected.truckId !== sortedContainers[i].id) continue;

        const loadSummary = await this.AnalyseSingleLoad(cargos[y], sortedContainers[i]);
        newEntry.values.push(loadSummary);
      }
      loadSummaries.push(newEntry);
    }

    return loadSummaries;
  };

  // the Top-Down view of the loading area will be compared to a grid
  // the assumption is that a single Cargo holds the same type of goods
  // every column is the same ===> a single piece of goods (width, length, height)
  // row =loadingArea.Width / column.width => without a rest
  // row.length = column.length
  public AnalyseSingleLoad = async (singleCargo: ICargo, truck: ITruck): Promise<ILoadSummary> => {
    // let's make this function async
    setTimeout(() => {}, 10);

    return this.Build(this._containerHelper, singleCargo, truck);
  };

  // *******************
  public Build = (containerHelper: IContainerHelper, cargo: ICargo, truck: ITruck): ILoadSummary => {
    if (!containerHelper.IsValidContainer(truck)) return LoadSummary.BuildInvalidLoadSummary();
    if (!containerHelper.IsValidCargo(cargo)) return LoadSummary.BuildInvalidLoadSummary();

    const stacking = containerHelper.CalculateStackingFactor(cargo, truck.height);

    const goodsPerRow = containerHelper.CalculateGoodsPerRow(cargo.width, truck.width);

    // amount of pieces of a full Row
    const goodsPerFullStackedRow = stacking.stackingFactor * goodsPerRow;

    const fullStackedRows = containerHelper.CalculateFullStackedRows(cargo.quantity, goodsPerFullStackedRow);

    const fullStackedGoods = fullStackedRows * goodsPerFullStackedRow;

    const loadingMeterBase = containerHelper.CalculateLoadingMeterBase(cargo, truck);

    const loadingMeterFullStackedRows = containerHelper.CalculateLoadingMeter(loadingMeterBase, stacking.stackingFactor, fullStackedGoods);

    const remainingGoods = cargo.quantity - fullStackedRows * goodsPerFullStackedRow;

    const loadingMeter = this._combineAllLoadingMeters(remainingGoods, loadingMeterFullStackedRows, containerHelper, loadingMeterBase, goodsPerRow);

    // config https://www.goodloading.com/de/blog/beladung/wie-plane-ich-die-palettenplatzierung-im-fahrzeug/

    const result: ILoadSummary = {
      cargoId: cargo.id,
      truckId: truck.id,
      orderId: cargo.orderId,
      stacking,
      goodsPerRow,
      goodsPerFullStackedRow,
      fullStackedRows,
      fullStackedGoods,
      loadingMeter,
      loadingMeterBase,
      remainingGoods,
      isValid: true,
    };

    return result;
  };

  private _combineAllLoadingMeters(
    remainingGoods: number,
    loadingMeterTotalFullStackedGoods: number,
    containerHelper: IContainerHelper,
    loadingMeterBase: number,
    goodsPerRow: number
  ) {
    if (remainingGoods === 0) return loadingMeterTotalFullStackedGoods;

    const minimumColumns = containerHelper.GetMinimumColumns(goodsPerRow, remainingGoods);

    return loadingMeterTotalFullStackedGoods + containerHelper.CalculateLoadingMeter(loadingMeterBase, 1, minimumColumns);
  }
}
