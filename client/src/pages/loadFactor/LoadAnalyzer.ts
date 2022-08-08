import cloneDeep from 'lodash/cloneDeep';
import { ICargo, IContainer, IContainerHelper, ILoadAnalyzer, ILoadSummary } from '../../interfaces';
import { LoadSummary } from './LoadSummary';

export class LoadAnalyzer implements ILoadAnalyzer {
  constructor(private _containerHelper: IContainerHelper) {}

  public AnalyzeLoading = async (cargos: ICargo[], containers: IContainer[]): Promise<number> => {
    let loadSummaries = 0;

    const sortedContainers = [...containers].sort( (a,b) => this._containerHelper.CompareByVolume(a,b))

    const sortedCargosDic =  this._containerHelper.SortCargos([...cargos])

    

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
    setTimeout(() => {}, 10);

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
 
}
