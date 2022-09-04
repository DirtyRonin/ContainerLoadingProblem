import { ICargoSummary } from "./ICargoSummary";

export interface ILoadSummaryIds extends ICargoSummary{
  truckId: string;
}

export const FindLoadSummaryIds = <T extends ILoadSummaryIds>(values: T[], b: T): T | undefined =>
  values.find((a) => a.cargoId === b.cargoId && a.truckId === b.truckId);
