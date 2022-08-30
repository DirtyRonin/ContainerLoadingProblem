import { ICargo, IContainer, IStacking } from '../../interfaces';
import { ILoadSummary,initializeLoadSummary } from '../../interfaces/ILoadSummary';

/** Contains Data for comparing Loads with each oter */
export class LoadSummary implements ILoadSummary {
  public constructor(
    /** */
    readonly cargoId: number,
    /** e.g. a truck*/
    readonly truckId: number,
    readonly orderId: number,
    /** Data for stacking goods and handling height */
    readonly stacking: IStacking,
    /** Maximum of goods that can fit in a row next to each other  */
    readonly goodsPerRow: number,
    /** Maximum of goods in a full stacked row*/
    readonly goodsPerFullStackedRow: number,
    /** Amount of complete rows that can be build*/
    readonly fullStackedRows: number,
    /** Amount of goods that are in full stacked row. see remainingGoods */
    readonly fullStackedGoods: number,
    /** Loading meter of the complete Cargo*/
    readonly loadingMeter: number,
    /** Loading meter of a single piece of goods*/
    readonly loadingMeterBase: number,
    /** Goods that can not be stacked to a full row. see fullStackedGoods*/
    readonly remainingGoods: number,
    /** Is Cargo fitting into Container*/
    readonly isValid: boolean
  ) {}

  public static BuildInvalidLoadSummary = () =>
  initializeLoadSummary();
}
