import { ICargo, IContainer, IMathHelper, ICalculateLoadingMeter } from '../../interfaces';

export class CalculateLoadingMeter implements ICalculateLoadingMeter {
  constructor(private mathHelper: IMathHelper) {}

  public CalculateLoadingMeter = async (cargo: ICargo[], container: IContainer): Promise<number> => {
    let loadingMeter = 0;

    cargo.forEach(async (singleCargo) => {
      loadingMeter += await this.CalculateMinimumLoadingMeter(singleCargo, container);
    });

    return loadingMeter;
  };

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
    if (quantity < 1) return 0;

    // loading meter for a single piece of goods
    // it takes a single column in a single row
    const baseLoadingMeter = this._getLoadingMeterForOnePiece(singleGoods, containerWidth);

    if (quantity === 1) return baseLoadingMeter;

    // console.log(`baseLoadingMeter: ${baseLoadingMeter}`);

    // how many pieces of goods can be stacked on top of each other
    const factor = this.mathHelper.CalculateStackingFactor(singleCargo, containerHeight).stackingFactor;

    // console.log(`factor: ${factor}`);

    const columnsPerRow = this._calculateColumnsPerRow(containerWidth, singleGoods.width);

    // amount of pieces of a full Row
    const countGoodsPerFullRow = factor * columnsPerRow;

    // console.log(`countGoodsPerFullRow: ${countGoodsPerFullRow}`);

    const countFullRows = Math.floor(quantity / countGoodsPerFullRow);

    // console.log(`countFullRows: ${countFullRows}`);

    // get the loading meter for the 'ground' goods
    const loadingMeterForFullRows =
      countFullRows === 0 ? 0 : this._getLoadingMeter(baseLoadingMeter, factor, countFullRows * countGoodsPerFullRow);

    // console.log(`loadingMeterForFullRows: ${loadingMeterForFullRows}`);

    const remainingPieces = quantity - countFullRows * countGoodsPerFullRow;

    // console.log(`remainingPieces: ${remainingPieces}`);
    if (remainingPieces === 0) return loadingMeterForFullRows;

    return (
      loadingMeterForFullRows + this._getLoadingMeter(baseLoadingMeter, 1, this._getMinimumColumnsFromRest(columnsPerRow, remainingPieces))
    );
  };

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

  private _getLoadingMeterForOnePiece = (singleGoods: IContainer, containerWidth: number) =>
    this.mathHelper.GetAreaRectangle(singleGoods) / containerWidth;
}
