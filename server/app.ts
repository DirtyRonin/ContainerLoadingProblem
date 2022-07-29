import 'dotenv/config'
import express = require("express");
import strongErrorHandler =require('strong-error-handler');
import {json} from 'body-parser';
const cors = require("cors")

import { sequelize } from "./config/db";
import { goodsRouter,truckRouter } from "./routes/index";
import { Goods, Truck } from "./models/index";
import { GoodsController, TruckController } from "./controllers/index";

const truckRepository = sequelize.getRepository(Truck);
const truckController = new TruckController(truckRepository);

const goodsRepository = sequelize.getRepository(Goods);
const goodsController = new GoodsController(goodsRepository);

export const app = express();
app.use(json());

app.use(cors({}))

app.use(truckRouter(truckController));
app.use(goodsRouter(goodsController));

app.use(strongErrorHandler({
    debug: true,
  }));