import { ICargoSummary } from './ICargoSummary';
import { IEntity } from './IEntity';

export interface ILoadSummaryIds extends ICargoSummary, IEntity {
  truckId: string;
}

export const FindLoadSummaryIds = <T extends ILoadSummaryIds>(values: T[], b: T): T | undefined =>
  values.find((a) => a.cargoId === b.cargoId && a.truckId === b.truckId);
