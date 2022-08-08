import _ from 'lodash';
import { ICargo, IContainer, IArea, IStacking } from './index';

export interface IContainerHelper {
  GetMinimumColumns(goodsPerRow: number, remainingGoods: number): number;
  AddContainersUp: (a: IContainer, b: IContainer) => IContainer;
  IsFitting(container: IContainer, cargo: ICargo): boolean;
  IsValidContainer(container: IContainer): boolean;
  IsValidCargo(cargo: ICargo): boolean;

  CalculateFullStackedRows(quantity: number, goodsPerFullStackedRow: number): number;
  CalculateLoadingMeterBase(singleGoodsOfCargo: IArea, container: IContainer): number;
  CalculateLoadingMeter(baseLoadingMeter: number, stackingFactor: number, countGoods: number): number;
  CalculateAreaForRectangle: (area: IArea) => number;
  CalculateVolumeForRectangle(container: IContainer): number;
  CalculateStackingFactor: (cargo: ICargo, containerHeight: number) => IStacking;
  CalculateGoodsPerRow(singleGoodsWidth: number, containerWidth: number): number;

  CompareByVolume(a: IContainer, b: IContainer, mulitplierA?: number, mulitplierB?: number): number;
  SortCargos(cargos: ICargo[]): _.Dictionary<ICargo[]>;
}
