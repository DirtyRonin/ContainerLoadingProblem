import express = require("express");
import strongErrorHandler =require('strong-error-handler');
import {json} from 'body-parser';
const cors = require("cors")

import { sequelize } from "./config/db";
import { truckRouter } from "./routes/truckRoute";
import { Truck } from "./models/truck";
import { TruckController } from "./controllers/truckController";


const truckRepository = sequelize.getRepository(Truck);
const truckController = new TruckController(truckRepository);

export const app = express();

app.use(json());

app.use(cors({}))

app.use(truckRouter(truckController));

app.use(strongErrorHandler({
    debug: true,
  }));