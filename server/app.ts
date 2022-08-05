import 'dotenv/config';
import express = require('express');
import strongErrorHandler = require('strong-error-handler');
import { json } from 'body-parser';
const cors = require('cors');

import { sequelize } from './config/db';
import { goodsRouter, truckRouter, orderRouter, goodsOrderRouter } from './routes';
import { Goods, GoodsOrder, Order, Truck } from './models';
import { GoodsController, TruckController, OrderController, GoodsOrderController } from './controllers';

const truckRepository = sequelize.getRepository(Truck);
const truckController = new TruckController(truckRepository);

const goodsRepository = sequelize.getRepository(Goods);
const goodsController = new GoodsController(goodsRepository);

const orderRepository = sequelize.getRepository(Order);
const orderController = new OrderController(orderRepository);

const goodsOrderRepository = sequelize.getRepository(GoodsOrder);
const goodsOrderController = new GoodsOrderController(goodsOrderRepository);

export const app = express();
app.use(json());

app.use(cors({}));

app.use(truckRouter(truckController));
app.use(goodsRouter(goodsController));
app.use(orderRouter(orderController));
app.use(goodsOrderRouter(goodsOrderController));

app.use(
  strongErrorHandler({
    debug: true,
  })
);
