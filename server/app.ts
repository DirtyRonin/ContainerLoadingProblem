import dotenv from 'dotenv';
dotenv.config();

import express = require('express');
import strongErrorHandler = require('strong-error-handler');
import { Model, model } from 'mongoose';
import { json } from 'body-parser';
const cors = require('cors');

import { cargoRouter, truckRouter, orderRouter } from './routes';
import { cargoSchema, orderSchema, truckSchema, RecordOfSchemas } from './models';
import { CargoController, TruckController, OrderController } from './controllers';
import { ICargo, IOrder, ITruck } from './interfaces';

const truckRepository: Model<ITruck, {}, {}, {}, any> = model<ITruck>(RecordOfSchemas.Truck, truckSchema);
const truckController = new TruckController(truckRepository);

const orderRepository: Model<IOrder, {}, {}, {}, any> = model<IOrder>(RecordOfSchemas.Order, orderSchema);
const orderController = new OrderController(orderRepository);

const cargoRepository: Model<ICargo, {}, {}, {}, any> = model<ICargo>(RecordOfSchemas.Cargo, cargoSchema);
const cargoController = new CargoController(cargoRepository, orderRepository);

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
