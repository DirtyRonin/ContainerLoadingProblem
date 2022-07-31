export interface IContainer {
  length: number;
  width: number;
  height: number;
}

export class Container implements IContainer {
  constructor(
    public length: number,
    public width: number,
    public height: number
  ) {}

  public GetArea = ():number => this.length * this.width;
}
