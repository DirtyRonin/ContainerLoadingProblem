import { IArea } from ".";


export interface IGoods extends IArea {
  id: number;
  name: string;
  isReadonly: boolean;
}
