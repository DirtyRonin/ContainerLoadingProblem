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



export class Truck implements ITruck{
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
  public static AsDefault(vehicleIdentifier = '') {
    return new Truck(0, vehicleIdentifier, 0, 0, 0, 0, 0, 0);
  }
}
