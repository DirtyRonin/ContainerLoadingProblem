import { IContainer } from ".";

export interface ITruck extends IContainer {
  id: number;
  vehicleIdentifier: string;
  maxWeight: number;
  loadingTime: number;
  dischargeTime: number;
}

export class Truck implements ITruck  {
  constructor(
    public id: number,
    public vehicleIdentifier: string,
    public height: number,
    public width: number,
    public length: number,
    public maxWeight: number,
    public loadingTime: number,
    public dischargeTime: number
  ) { }

  public static ToTruck(truck: ITruck) {
    return new Truck(
      truck.id,
      truck.vehicleIdentifier,
      truck.height,
      truck.width,
      truck.length,
      truck.maxWeight,
      truck.loadingTime,
      truck.dischargeTime
    );
  }
  public static AsInitializeDefault = (vehicleIdentifier = "") =>
    new Truck(0, vehicleIdentifier, 0, 0, 0, 0, 0, 0);

  public static As15er = (vehicleIdentifier = "As15er") =>
    new Truck(0, vehicleIdentifier, 400, 200, 700, 15000, 3000, 1500);

  public static StandardTruck = (vehicleIdentifier = "Standard Truck") =>
    new Truck(0, vehicleIdentifier, 270, 240, 1360, 20000, 100, 100);
  
}
