import { KeyValueLoadSummary } from '../models';
import { ICargo } from './ICargo';
import { IContainerLoadingSummary } from './IContainerLoadingSummary';
import { ILoadSummary } from './ILoadSummary';
import { ITruck } from './ITruck';

/** split cargose on trucks.*/
export interface IContainerLoading {
  SplitCargosOnTrucks(trucks: ITruck[], summaries: KeyValueLoadSummary[]): IContainerLoadingSummary[];
  SplitCargosOnTruck(truck: ITruck, summaries: ILoadSummary[]): IContainerLoadingSummary;
}
