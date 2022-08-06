import { Goods, Truck } from '../models';
import { sequelize } from './db';

export default async function seeding(): Promise<void> {
  const goodsRepo = sequelize.getRepository(Goods);
  await goodsRepo.bulkCreate([
    { name: '1/2 Europalette', width: 600, length: 400, weight: 30, isReadonly: true },
    { name: '1/4 Europalette', width: 800, length: 600, weight: 30, isReadonly: true },
    { name: 'Europalette', width: 1200, length: 800, weight: 25, isReadonly: true },
    { name: 'Industriepalette', width: 1200, length: 1000, weight: 30, isReadonly: true },
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
}
