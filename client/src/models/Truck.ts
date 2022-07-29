export interface ITruck {
  id: number;
  vehicleIdentifier: string;
  height: number;
  width: number;
  length: number;
  maxWeight: number;
  loadingTime: number;
  dischargeTime: number;
}

export class Truck implements ITruck {
  constructor(
    public id: number,
    public vehicleIdentifier: string,
    public height: number,
    public width: number,
    public length: number,
    public maxWeight: number,
    public loadingTime: number,
    public dischargeTime: number
  ) {}

  public static FromTruck(truck: Truck) {
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
  public static AsDefault = (vehicleIdentifier = "") =>
    new Truck(0, vehicleIdentifier, 0, 0, 0, 0, 0, 0);

  public static As15er = (vehicleIdentifier = "As15er") =>
    new Truck(0, vehicleIdentifier, 400, 200, 700, 15000, 3000, 1500);


}
