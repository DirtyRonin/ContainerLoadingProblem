import { Router } from "express";
import { IGoodsController } from "../interfaces";

export const goodsRouter = (controller: IGoodsController) =>
  Router()
    .get("/goods", controller.GetAll)

    .get("/goods/:id", controller.GetById)

    .post("/goods", controller.Create)

    .put("/goods", controller.Update)

    .delete("/goods/:id", controller.Delete);
