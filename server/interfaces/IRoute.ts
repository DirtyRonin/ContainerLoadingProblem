import { Types } from 'mongoose';
import { IEntity } from './IEntity';

export interface IRoute extends IEntity {
  from: string;
  to: string;
  cargos: [Types.ObjectId];
}
