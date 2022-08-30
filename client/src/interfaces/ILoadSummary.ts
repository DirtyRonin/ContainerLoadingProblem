import { IStacking, initializeStacking } from '.';
import { ILoadSummaryIds } from './ILoadSummaryIds';

export interface ILoadSummary extends ILoadSummaryIds {
  cargoId: number;
  truckId: number;
  orderId: number;
  stacking: IStacking;
  goodsPerRow: number;
  goodsPerFullStackedRow: number;
  fullStackedRows: number;
  fullStackedGoods: number;
  loadingMeterBase: number;
  loadingMeter: number;
  remainingGoods: number;
  isValid: boolean;
}

export const initializeLoadSummary = (): ILoadSummary => ({
  cargoId: 0,
  truckId: 0,
  orderId: 0,
  stacking: initializeStacking(),
  goodsPerRow: 0,
  goodsPerFullStackedRow: 0,
  fullStackedRows: 0,
  fullStackedGoods: 0,
  loadingMeterBase: 0,
  loadingMeter: 0,
  remainingGoods: 0,
  isValid: false,
});
