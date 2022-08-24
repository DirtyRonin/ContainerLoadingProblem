import { IArea, initializeArea } from './IArea';

export interface IContainer extends IArea {
  height: number;
}

export const initializeContainer = (): IContainer => ({
  height: 0,
  ...initializeArea(),
});
