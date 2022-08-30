export interface ILoadSummaryIds {
  cargoId: number;
  truckId: number;
  orderId: number;
}

export const FindLoadSummaryIds = <T extends ILoadSummaryIds>(values: T[], b: T): T | undefined =>
  values.find((a) => a.cargoId === b.cargoId && a.orderId === b.orderId && a.truckId === b.truckId);
