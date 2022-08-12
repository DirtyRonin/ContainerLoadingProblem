import { Cargo, Order, Truck, TruckLoading } from '../models';
import { sequelize } from './db';

export default async function seeding(): Promise<void> {
  const orderRepo = sequelize.getRepository(Order);
  await orderRepo.bulkCreate([
    { orderName: 'Erste Bestellung'},
    { orderName: 'Zweite Bestellung'},
    { orderName: 'Dritte Bestellung'},
  ]);


  const trucksRepo = sequelize.getRepository(Truck);
  await trucksRepo.bulkCreate([
    {
      vehicleIdentifier: 'Transporter 5 EP',
      loadingTime: 1000,
      dischargeTime: 500,
      height: 170,
      width: 180,
      length: 420,
      maxWeight: 1500,
      isReadonly: true,
    },
    {
      vehicleIdentifier: 'Transporter 1,5T',
      loadingTime: 1000,
      dischargeTime: 500,
      height: 230,
      width: 220,
      length: 490,
      maxWeight: 1500,
      isReadonly: true,
    },
    {
      vehicleIdentifier: 'Solo LKW 5T',
      loadingTime: 1000,
      dischargeTime: 500,
      height: 240,
      width: 245,
      length: 620,
      maxWeight: 5000,
      isReadonly: true,
    },
    {
      vehicleIdentifier: 'Solo LKW 6T',
      loadingTime: 1000,
      dischargeTime: 500,
      height: 240,
      width: 245,
      length: 720,
      maxWeight: 6000,
      isReadonly: true,
    },
    {
      vehicleIdentifier: 'Standard Sattelauflieger',
      loadingTime: 1000,
      dischargeTime: 500,
      height: 270,
      width: 245,
      length: 1360,
      maxWeight: 25000,
      isReadonly: true,
    },
  ]);
  
  const cargoRepo = sequelize.getRepository(Cargo);
  await cargoRepo.bulkCreate([
    { name: 'Auf 1/2 Europalette', width: 60, length: 40, weight: 30, quantity: 40, height: 80, isStackable: true ,orderId:1},
    { name: 'Auf 1/4 Europalette', width: 80, length: 60, weight: 30, quantity: 10, height: 110, isStackable: true,orderId:2 },
    { name: 'Auf Europalette', width: 120, length: 80, weight: 25, quantity: 10, height: 100, isStackable: true,orderId:2 },
    { name: 'Auf Industriepalette', width: 120, length: 100, weight: 30, quantity: 10, height: 120, isStackable: true,orderId:2 },
  ]);
  const truckLoadingRepo = sequelize.getRepository(TruckLoading);
  await truckLoadingRepo.bulkCreate([
    { loadingMeter: 500, truckId:1,cargoId:1},
    { loadingMeter: 500, truckId:1,cargoId:2},
    { loadingMeter: 500, truckId:2,cargoId:3},
    
  ]);
}
