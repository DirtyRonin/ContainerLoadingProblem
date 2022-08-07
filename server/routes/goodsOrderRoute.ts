import { Router } from "express";
import { IGoodsOrderController } from "../interfaces";

export const goodsOrderRouter = (controller: IGoodsOrderController) =>
  Router()
    .get("/goodsorders", controller.GetAll)

    .get("/goodsorders/:id", controller.GetById)

    .post("/goodsorders", controller.Create)

    .put("/goodsorders", controller.Update)

    .delete("/goodsorders/:id", controller.Delete)

    .get("/filterGoodsOrdersByOrderId/:id", controller.FilteredByOrderId)
