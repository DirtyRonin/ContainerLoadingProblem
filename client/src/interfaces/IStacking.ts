export interface IStacking {
  stackingFactor: number;
  remainingHeight: number;
}

export const initializeStacking = (): IStacking => ({
  stackingFactor: 0,
  remainingHeight: 0,
});
