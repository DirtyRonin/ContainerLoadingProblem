import { ITruck } from "../interfaces/index";

export class Truck implements ITruck {
  constructor(
    public id: number,
    public vehicleIdentifier: string,
    public height: number,
    public width: number,
    public length: number,
    public maxWeight: number,
    public loadingTime: number,
    public dischargeTime: number,
    public isReadonly: boolean,
  ) {}


  public static AsInitializeDefault = (
    vehicleIdentifier = ""
  ) => new Truck(0, vehicleIdentifier, 0, 0, 0, 0, 0, 0,false);

  public static As15er = (vehicleIdentifier = "As15er") =>
    new Truck(0, vehicleIdentifier, 400, 200, 700, 15000, 3000, 1500,false);

  // public static StandardTruck = (vehicleIdentifier = "Standard Truck",helper: IMathHelper) =>
  //   new Truck(0, vehicleIdentifier, 270, 240, 1360, 20000, 100, 100, helper);
}
