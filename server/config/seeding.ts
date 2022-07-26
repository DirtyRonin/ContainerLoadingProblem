import { model, Model } from 'mongoose';
import { IOrder, ITruck, ICargo, ITruckLoading } from '../interfaces';
import { IRoute } from '../interfaces/IRoute';
import { truckSchema, orderSchema, cargoSchema, routeSchema } from '../models';
import { truckLoadingSchema } from '../models/truckLoading';
import { CARGO_CONST, ORDER_CONST, ROUTE_CONST, TRUCKLOADING_CONST, TRUCK_CONST } from './consts';

export default async function seeding(): Promise<void> {
  const truckModel: Model<ITruck, {}, {}, {}, any> = model<ITruck>(TRUCK_CONST, truckSchema);
  const orderModel: Model<IOrder, {}, {}, {}, any> = model<IOrder>(ORDER_CONST, orderSchema);
  const cargoModel: Model<ICargo, {}, {}, {}, any> = model<ICargo>(CARGO_CONST, cargoSchema);
  const truckLoadingModel: Model<ITruckLoading, {}, {}, {}, any> = model<ITruckLoading>(TRUCKLOADING_CONST, truckLoadingSchema);
  const routeModel: Model<IRoute, {}, {}, {}, any> = model<IRoute>(ROUTE_CONST, routeSchema);

  await Promise.all([
    cargoModel.collection.drop(),
    orderModel.collection.drop(),
    truckModel.collection.drop(),
    truckLoadingModel.collection.drop(),
    routeModel.collection.drop(),
  ]);

  const orders = await Promise.all([
    new orderModel({ orderName: 'Erste Bestellung' }).save(),
    new orderModel({ orderName: 'Zweite Bestellung' }).save(),
    new orderModel({ orderName: 'Dritte Bestellung' }).save(),
  ]);

  const cargos = await Promise.all([
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

  const trucks = await Promise.all([
    new truckModel({
      vehicleIdentifier: 'Transporter 5 EP',
      loadingTime: 1000,
      dischargeTime: 500,
      height: 170,
      width: 180,
      length: 420,
      maxWeight: 1500,
    }).save(),
    new truckModel({
      vehicleIdentifier: 'Transporter 1,5T',
      loadingTime: 1000,
      dischargeTime: 500,
      height: 230,
      width: 220,
      length: 490,
      maxWeight: 1500,
    }).save(),
    new truckModel({
      vehicleIdentifier: 'Solo LKW 5T',
      loadingTime: 1000,
      dischargeTime: 500,
      height: 240,
      width: 245,
      length: 620,
      maxWeight: 5000,
    }).save(),
    new truckModel({
      vehicleIdentifier: 'Solo LKW 6T',
      loadingTime: 1000,
      dischargeTime: 500,
      height: 240,
      width: 245,
      length: 720,
      maxWeight: 6000,
    }).save(),
    new truckModel({
      vehicleIdentifier: 'Standard Sattelauflieger',
      loadingTime: 1000,
      dischargeTime: 500,
      height: 270,
      width: 245,
      length: 1360,
      maxWeight: 25000,
    }).save(),
  ]);

  const routes = await Promise.all([
    new routeModel({
      from: 'A',
      to: 'B',
    }).save(),
  ]);

  const truckLoadings = await Promise.all([
    new truckLoadingModel({
      cargoId: cargos[0]._id,
      truckId: trucks[0]._id,
      routeId: routes[0]._id,
      orderId: cargos[0].orderId,
    }).save(),
  ]);
}
