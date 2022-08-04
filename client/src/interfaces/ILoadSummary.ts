import { ICargo, IContainer, IStacking } from '.';


export interface ILoadSummary {
  cargo: ICargo;
  container: IContainer;
  stacking: IStacking;
  goodsPerRow: number;
  goodsPerFullStackedRow: number;
  fullStackedRows: number;
  fullStackedGoods: number
  loadingMeterBase: number;
  loadingMeter: number;
  remainingGoods: number;
  isValid: boolean;
}
