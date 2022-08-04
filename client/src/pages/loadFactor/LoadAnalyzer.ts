import cloneDeep from 'lodash/cloneDeep';
import { ICargo, IContainer, IContainerHelper, ILoadAnalyzer, ILoadSummary } from '../../interfaces';
import { LoadSummary } from './LoadSummary';

export class LoadAnalyzer implements ILoadAnalyzer {
  constructor(private _containerHelper: IContainerHelper) {}

  public AnalyzeLoading = async (cargos: ICargo[], containers: IContainer[]): Promise<number> => {
    let loadSummaries = 0;

    for (let i = 0; i < containers.length; i++)
      for (let y = 0; y < cargos.length; y++) {
        loadSummaries += (await this.AnalyseSingleLoad(cargos[y], containers[i])).loadingMeter;
      }

    return loadSummaries;
  };

  // the Top-Down view of the loading area will be compared to a grid
  // the assumption is that a single Cargo holds the same type of goods
  // every column is the same ===> a single piece of goods (width, length, height)
  // row =loadingArea.Width / column.width => without a rest
  // row.length = column.length
  public AnalyseSingleLoad = async (singleCargo: ICargo, container: IContainer): Promise<ILoadSummary> => {
    // let's make this function async
    await setTimeout(() => {}, 10);

    return this.Build(this._containerHelper, singleCargo, container);
  };

  // *******************
  public Build = (containerHelper: IContainerHelper, cargo: ICargo, container: IContainer): ILoadSummary => {
    if (!containerHelper.IsValidContainer(container)) return LoadSummary.BuildInvalidLoadSummary();
    if (!containerHelper.IsValidCargo(cargo)) return LoadSummary.BuildInvalidLoadSummary();

    const stacking = containerHelper.CalculateStackingFactor(cargo, container.height);

    const goodsPerRow = containerHelper.CalculateGoodsPerRow(cargo.singleGoods.width, container.width);

    // amount of pieces of a full Row
    const goodsPerFullStackedRow = stacking.stackingFactor * goodsPerRow;

    const fullStackedRows = containerHelper.CalculateFullStackedRows(cargo.quantity, goodsPerFullStackedRow);

    const fullStackedGoods = fullStackedRows * goodsPerFullStackedRow;

    const loadingMeterBase = containerHelper.CalculateLoadingMeterBase(cargo.singleGoods, container);

    const loadingMeterFullStackedRows = containerHelper.CalculateLoadingMeter(loadingMeterBase, stacking.stackingFactor, fullStackedGoods);

    const remainingGoods = cargo.quantity - fullStackedRows * goodsPerFullStackedRow;

    const loadingMeter = this._combineAllLoadingMeters(
      remainingGoods,
      loadingMeterFullStackedRows,
      containerHelper,
      loadingMeterBase,
      goodsPerRow
    );

    // config https://www.goodloading.com/de/blog/beladung/wie-plane-ich-die-palettenplatzierung-im-fahrzeug/

    const result = new LoadSummary(
      cloneDeep(cargo),
      container,
      stacking,
      goodsPerRow,
      goodsPerFullStackedRow,
      fullStackedRows,
      fullStackedGoods,
      loadingMeter,
      loadingMeterBase,
      remainingGoods,
      true
    );

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
  // *******************

  /*
  // the Top-Down view of the loading area will be compared to a grid
  // the assumption is that a single Cargo holds the same type of goods
  // every column is the same ===> a single piece of goods (width, length, height)
  // row =loadingArea.Width / column.width => without a rest
  // row.length = column.length
  public CalculateMinimumLoadingMeter = async (singleCargo: ICargo, container: IContainer): Promise<number> => {
    // packing order
    // first fill all columns of a row
    // than start stacking

    // let'S make this function async
    await setTimeout(() => {}, 10);

    const { height: containerHeight, width: containerWidth } = container;
    const { singleGoods, quantity } = singleCargo;

    if(!this._containerHelper.IsValidContainer(container)) return 0
    if(!this._containerHelper.IsValidCargo(singleCargo)) return 0

    // loading meter for a single piece of goods
    // it takes a single column in a single row
    const baseLoadingMeter = this._containerHelper.CalculateLoadingMeterBase(singleGoods, container);

    if (quantity === 1) return baseLoadingMeter;

    // how many pieces of goods can be stacked on top of each other
    const { countFullStackedRows, countFullStackedSingleGoodsPerRow, loadingMeterForFullStackedRows, countSingleGoodsPerRow } = this.getLoadingMeterForFullStackedRows(singleCargo, containerHeight, containerWidth, singleGoods, quantity, baseLoadingMeter);

    const countRemainingSingleGoods = quantity - countFullStackedRows * countFullStackedSingleGoodsPerRow;

    if (countRemainingSingleGoods === 0) return loadingMeterForFullStackedRows;

    return (
      loadingMeterForFullStackedRows + this._getLoadingMeter(baseLoadingMeter, 1, this._getMinimumColumnsFromRest(countSingleGoodsPerRow, countRemainingSingleGoods))
    );
  };

  private getLoadingMeterForFullStackedRows(singleCargo: ICargo, containerHeight: number, containerWidth: number, singleGoods: IContainer, quantity: number, baseLoadingMeter: number) {
    const stackingFactor = this._containerHelper.CalculateStackingFactor(singleCargo, containerHeight).stackingFactor;


    const countSingleGoodsPerRow = this._calculateColumnsPerRow(containerWidth, singleGoods.width);

    // amount of pieces of a full Row
    const countFullStackedSingleGoodsPerRow = stackingFactor * countSingleGoodsPerRow;

    const countFullStackedRows = Math.floor(quantity / countFullStackedSingleGoodsPerRow);

    // get the loading meter for the 'ground' goods
    const loadingMeterForFullStackedRows = countFullStackedRows === 0 ? 0 : this._getLoadingMeter(baseLoadingMeter, stackingFactor, countFullStackedRows * countFullStackedSingleGoodsPerRow);
    return { countFullStackedRows, countFullStackedSingleGoodsPerRow, loadingMeterForFullStackedRows, countSingleGoodsPerRow };
  }

  private _getLoadingMeter(baseLoadingMeter: number, stackingFactor: number, countGoods: number) {
    return (baseLoadingMeter / stackingFactor) * countGoods;
  }

  private _calculateColumnsPerRow(containerwidth: number, singleGoodsWidth: number) {
    return Math.floor(containerwidth / singleGoodsWidth);
  }

  private _getMinimumColumnsFromRest(columnsPerRow: number, remainingPieces: number) {
    if (remainingPieces >= columnsPerRow) return columnsPerRow;

    return remainingPieces;
  }

 
 */
}
