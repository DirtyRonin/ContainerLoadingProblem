import { IContainer } from "../interfaces/index";

export class Container implements IContainer {
  constructor(
    public length: number,
    public width: number,
    public height: number,
  ) {}

  public static AsInitializeDefault = new Container(0, 0, 0);

}
