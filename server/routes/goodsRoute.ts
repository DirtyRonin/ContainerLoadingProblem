import { Router } from "express";
import { IGoodsController } from "../controllers/IGoodsController";

export const goodsRouter = (controller: IGoodsController) =>
  Router()
    .get("/goods", controller.GetGoodss)

    .get("/goods/:id", controller.GetGoodsById)

    .post("/goods", controller.CreateGoods)

    .put("/goods", controller.UpdateGoods)

    .delete("/goods/:id", controller.DeleteGoods);
