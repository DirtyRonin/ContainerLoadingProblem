import { Router } from "express";
import { IGoodsOrderController } from "../interfaces";

export const goodsOrderRouter = (controller: IGoodsOrderController) =>
  Router()
    .get("/goodsorders", controller.GetAll)

    .get("/goodsorders/:goodsid/orders/:orderid", controller.GetById)

    .post("/goodsorders", controller.Create)

    .put("/goodsorders", controller.Update)

    .delete("/goodsorders/:goodsid/orders/:orderid", controller.Delete);
