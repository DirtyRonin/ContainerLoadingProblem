import { Types } from 'mongoose';
import { IEntity } from '.';

export interface ICargo extends IEntity {
  orderId:Types.ObjectId
  name: string;
  width: number;
  length: number;
  weight: number;
  quantity: number;
  height: number;
  isStackable: boolean;
}
