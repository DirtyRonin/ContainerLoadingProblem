import { Router } from "express";
import { IGoodsOrderTruckController } from "../interfaces";

export const goodsOrderTruckRouter = (controller: IGoodsOrderTruckController) =>
  Router()
    .get("/goodsordertrucks", controller.GetAll)

    .get("/goodsordertrucks/:id", controller.GetById)

    .post("/goodsordertrucks", controller.Create)

    .put("/goodsordertrucks", controller.Update)

    .delete("/goodsordertrucks/:id", controller.Delete)
