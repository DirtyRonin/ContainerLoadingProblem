import { IArea } from '../interfaces';

export class Area implements IArea {
  constructor(public length: number, public width: number) {}

  public static AsInitializeDefault = new Area(0, 0);
}
