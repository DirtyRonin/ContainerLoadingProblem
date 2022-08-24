export interface IArea {
  length: number;
  width: number;
}

export const initializeArea = ():IArea => ({
  length: 0,
  width: 0,
});
