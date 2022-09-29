import { IEntity } from './IEntity';
import { ITruckLoading } from './ITruckLoading';

export interface IRoute extends IEntity {
  from: string;
  to: string;
  truckLoadings: ITruckLoading[];
}

export const initializeRoute = (): IRoute => ({
  _id: '',
  from: '',
  to: '',
  truckLoadings: [],
});
