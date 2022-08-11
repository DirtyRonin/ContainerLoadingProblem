import 'dotenv/config';
import express = require('express');
import strongErrorHandler = require('strong-error-handler');
import { json } from 'body-parser';
const cors = require('cors');

import { sequelize } from './config/db';
import { cargoRouter, truckRouter, orderRouter } from './routes';
import { Cargo,Order, Truck } from './models';
import { CargoController, TruckController, OrderController } from './controllers';

const truckRepository = sequelize.getRepository(Truck);
const truckController = new TruckController(truckRepository);

// const goodsRepository = sequelize.getRepository(Goods);
// const goodsController = new GoodsController(goodsRepository);

const orderRepository = sequelize.getRepository(Order);
const orderController = new OrderController(orderRepository);

const cargoRepository = sequelize.getRepository(Cargo);
const cargoController = new CargoController(cargoRepository);

// const goodsOrderTruckRepository = sequelize.getRepository(GoodsOrderTruck);
// const goodsOrderTruckController = new GoodsOrderTruckController(goodsOrderTruckRepository);

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
