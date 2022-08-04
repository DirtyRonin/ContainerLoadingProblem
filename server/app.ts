import 'dotenv/config'
import express = require("express");
import strongErrorHandler =require('strong-error-handler');
import {json} from 'body-parser';
const cors = require("cors")

import { sequelize } from "./config/db";
import { goodsRouter,truckRouter,orderItemRouter, goodsOrderItemRouter } from "./routes";
import { Goods, GoodsOrderItem, OrderItem, Truck } from "./models";
import { GoodsController, TruckController,OrderItemController,GoodsOrderItemController } from "./controllers";

const truckRepository = sequelize.getRepository(Truck);
const truckController = new TruckController(truckRepository);

const goodsRepository = sequelize.getRepository(Goods);
const goodsController = new GoodsController(goodsRepository);

const orderItemRepository = sequelize.getRepository(OrderItem);
const orderItemController = new OrderItemController(orderItemRepository);

const goodsOrderItemRepository = sequelize.getRepository(GoodsOrderItem);
const goodsOrderItemController = new GoodsOrderItemController(goodsOrderItemRepository);


export const app = express();
app.use(json());

app.use(cors({}))

app.use(truckRouter(truckController));
app.use(goodsRouter(goodsController));
app.use(orderItemRouter(orderItemController));
app.use(goodsOrderItemRouter(goodsOrderItemController));

app.use(strongErrorHandler({
    debug: true,
  }));