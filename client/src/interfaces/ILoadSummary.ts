import { ICargo, IContainer, IStacking, initializeCargo, initializeContainer, initializeStacking } from '.';

export interface ILoadSummary {
  cargo: ICargo;
  container: IContainer;
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
  cargo: initializeCargo(),
  container: initializeContainer(),
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
