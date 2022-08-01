import { ICargo, IContainer } from ".";

export interface ICalculateLoadingMeter {
  CalculateLoadingMeter: (
    cargo: ICargo[],
    container: IContainer
  ) => Promise<number>;
  CalculateMinimumLoadingMeter: (
    singleCargo: ICargo,
    container: IContainer
  ) => Promise<number>;
}
