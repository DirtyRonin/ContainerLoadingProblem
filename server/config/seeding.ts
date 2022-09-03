import { model, Model } from 'mongoose';
import { IOrder, ITruck, ICargo } from '../interfaces';
import { truckSchema, orderSchema, cargoSchema } from '../models';
import { CARGO_CONST, ORDER_CONST, TRUCK_CONST } from './consts';

export default async function seeding(): Promise<void> {
  const truckModel: Model<ITruck, {}, {}, {}, any> = model<ITruck>(TRUCK_CONST, truckSchema);
  const orderModel: Model<IOrder, {}, {}, {}, any> = model<IOrder>(ORDER_CONST, orderSchema);
  const cargoModel: Model<ICargo, {}, {}, {}, any> = model<ICargo>(CARGO_CONST, cargoSchema);

  await Promise.all([cargoModel.collection.drop(), orderModel.collection.drop(), truckModel.collection.drop()]);

  const orders = await Promise.all([
    new orderModel({ orderName: 'Erste Bestellung', cargos: [] }).save(),
    new orderModel({ orderName: 'Zweite Bestellung', cargos: [] }).save(),
    new orderModel({ orderName: 'Dritte Bestellung', cargos: [] }).save(),
  ]);

  await Promise.all([
    new cargoModel({
      name: 'Auf 1/2 Europalette',
      width: 60,
      length: 40,
      weight: 30,
      quantity: 40,
      height: 80,
      isStackable: true,
      orderId: orders[0]._id,
    }).save(),
    new cargoModel({
      name: 'Auf 1/4 Europalette',
      width: 80,
      length: 60,
      weight: 30,
      quantity: 10,
      height: 110,
      isStackable: true,
      orderId: orders[1]._id,
    }).save(),
    new cargoModel({
      name: 'Auf Europalette',
      width: 120,
      length: 80,
      weight: 25,
      quantity: 10,
      height: 100,
      isStackable: true,
      orderId: orders[1]._id,
    }).save(),
    new cargoModel({
      name: 'Auf Industriepalette',
      width: 120,
      length: 100,
      weight: 30,
      quantity: 10,
      height: 120,
      isStackable: true,
      orderId: orders[1]._id,
    }).save(),
  ]);

  await truckModel.insertMany([
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
