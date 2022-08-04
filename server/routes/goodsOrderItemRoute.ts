import { Router } from "express";
import { IGoodsOrderItemController } from "../interfaces";

export const goodsOrderItemRouter = (controller: IGoodsOrderItemController) =>
  Router()
    .get("/goodsOrderItems", controller.GetAll)

    .get("/goodsOrderItems/:goodsid/orderitems/:orderitemid", controller.GetById)

    .post("/goodsOrderItems", controller.Create)

    .put("/goodsOrderItems", controller.Update)

    .delete("/goodsOrderItems/:goodsid/orderitems/:orderitemid", controller.Delete);
