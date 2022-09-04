import dotenv from 'dotenv';
dotenv.config();

import express = require('express');
import strongErrorHandler = require('strong-error-handler');
import { Model, model } from 'mongoose';
import { json } from 'body-parser';
const cors = require('cors');

import { cargoRouter, truckRouter, orderRouter, routeRouter, truckLoadingRouter } from './routes';
import { cargoSchema, orderSchema, routeSchema, truckSchema, truckLoadingSchema } from './models';
import { CargoController, TruckController, OrderController, TruckLoadingController, RouteController } from './controllers';
import { ICargo, IOrder, IRoute, ITruck, ITruckLoading } from './interfaces';
import { CARGO_CONST, ORDER_CONST, ROUTE_CONST, TRUCKLOADING_CONST, TRUCK_CONST } from './config/consts';

const truckRepository: Model<ITruck, {}, {}, {}, any> = model<ITruck>(TRUCK_CONST, truckSchema);
const orderRepository: Model<IOrder, {}, {}, {}, any> = model<IOrder>(ORDER_CONST, orderSchema);
const cargoRepository: Model<ICargo, {}, {}, {}, any> = model<ICargo>(CARGO_CONST, cargoSchema);
const truckLoadingRepository: Model<ITruckLoading, {}, {}, {}, any> = model<ITruckLoading>(TRUCKLOADING_CONST, truckLoadingSchema);
const routeRepository: Model<IRoute, {}, {}, {}, any> = model<IRoute>(ROUTE_CONST, routeSchema);

const truckController = new TruckController(truckRepository, truckLoadingRepository);
const orderController = new OrderController(orderRepository, cargoRepository);
const cargoController = new CargoController(cargoRepository, orderRepository, truckLoadingRepository);
const truckLoadingController = new TruckLoadingController(truckLoadingRepository);
const routeController = new RouteController(routeRepository, truckLoadingRepository);

export const app = express();
app.use(json());

app.use(cors({}));

app.use(truckRouter(truckController));
app.use(orderRouter(orderController));
app.use(cargoRouter(cargoController));
app.use(routeRouter(routeController));
app.use(truckLoadingRouter(truckLoadingController));

app.use(
  strongErrorHandler({
    debug: true,
  })
);
