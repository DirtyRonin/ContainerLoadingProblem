import dotenv from 'dotenv';
dotenv.config();

import express = require('express');
import strongErrorHandler = require('strong-error-handler');
import { json } from 'body-parser';
const cors = require('cors');

import { sequelize } from './config/db';
import { cargoRouter, truckRouter, orderRouter } from './routes';
import { CargoSeq, OrderSeq, Truck, cargoSchema, orderSchema, truckSchema } from './models';
import { CargoController, TruckController, OrderController } from './controllers';
import { Model, model } from 'mongoose';
import { ICargo, IOrder } from './interfaces';
import { ITruck } from './interfaces/ITruck';

const truckRepository: Model<ITruck, {}, {}, {}, any> = model<ITruck>('Truck', truckSchema);
const truckController = new TruckController(truckRepository);

const orderRepository: Model<IOrder, {}, {}, {}, any> = model<IOrder>('Order', orderSchema);
const orderController = new OrderController(orderRepository);

const cargoRepository: Model<ICargo, {}, {}, {}, any> = model<ICargo>('Cargo', cargoSchema);
const cargoController = new CargoController(cargoRepository);

const seed = (
  cargoRepository: Model<ICargo, {}, {}, {}, any>,
  orderRepository: Model<IOrder, {}, {}, {}, any>,
  truckRepository: Model<ITruck, {}, {}, {}, any>
) => {
  // cargoRepository.insertMany(
  //   [
  //     { name: 'Auf 1/2 Europalette', width: 60, length: 40, weight: 30, quantity: 40, height: 80, isStackable: true },
  //     { name: 'Auf 1/4 Europalette', width: 80, length: 60, weight: 30, quantity: 10, height: 110, isStackable: true },
  //     { name: 'Auf Europalette', width: 120, length: 80, weight: 25, quantity: 10, height: 100, isStackable: true },
  //     { name: 'Auf Industriepalette', width: 120, length: 100, weight: 30, quantity: 10, height: 120, isStackable: true },
  //   ],
  //   function (error, docs) {
  //     console.log(error?.message);
  //   }
  // );

  // cargoRepository.find().then((cargosResults) => {
  //   const ids = cargosResults.map((x) => x._id);
  //   orderRepository.insertMany(
  //     [
  //       { orderName: 'Erste Bestellung', cargos: [ids[0]] },
  //       { orderName: 'Zweite Bestellung', cargos: [ids[1], ids[2], ids[3]] },
  //       { orderName: 'Dritte Bestellung', cargos: [] },
  //     ],
  //     function (error, docs) {
  //       console.log(error?.message);
  //     }
  //   );
  // });

  // truckRepository.insertMany(
  //   [
  //     {
  //       vehicleIdentifier: 'Transporter 5 EP',
  //       loadingTime: 1000,
  //       dischargeTime: 500,
  //       height: 170,
  //       width: 180,
  //       length: 420,
  //       maxWeight: 1500,
  //       isReadonly: true,
  //     },
  //     {
  //       vehicleIdentifier: 'Transporter 1,5T',
  //       loadingTime: 1000,
  //       dischargeTime: 500,
  //       height: 230,
  //       width: 220,
  //       length: 490,
  //       maxWeight: 1500,
  //       isReadonly: true,
  //     },
  //     {
  //       vehicleIdentifier: 'Solo LKW 5T',
  //       loadingTime: 1000,
  //       dischargeTime: 500,
  //       height: 240,
  //       width: 245,
  //       length: 620,
  //       maxWeight: 5000,
  //       isReadonly: true,
  //     },
  //     {
  //       vehicleIdentifier: 'Solo LKW 6T',
  //       loadingTime: 1000,
  //       dischargeTime: 500,
  //       height: 240,
  //       width: 245,
  //       length: 720,
  //       maxWeight: 6000,
  //       isReadonly: true,
  //     },
  //     {
  //       vehicleIdentifier: 'Standard Sattelauflieger',
  //       loadingTime: 1000,
  //       dischargeTime: 500,
  //       height: 270,
  //       width: 245,
  //       length: 1360,
  //       maxWeight: 25000,
  //       isReadonly: true,
  //     },
  //   ],
  //   function (error, docs) {
  //     console.log(error?.message);
  //   }
  // );
};

seed(cargoRepository, orderRepository, truckRepository);

export const app = express();
app.use(json());

app.use(cors({}));

app.use(truckRouter(truckController));
// app.use(goodsRouter(goodsController));
app.use(orderRouter(orderController));
app.use(cargoRouter(cargoController));
// app.use(goodsOrderTruckRouter(goodsOrderTruckController));

app.use(
  strongErrorHandler({
    debug: true,
  })
);
