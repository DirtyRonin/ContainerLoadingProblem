import { Router } from "express";
import { IOrderController } from "../interfaces";

export const orderRouter = (controller: IOrderController) =>
  Router()
    .get("/orders", controller.GetAll)

    .get("/orders/:id", controller.GetById)

    .post("/orders", controller.Create)

    .put("/orders", controller.Update)

    .delete("/orders/:id", controller.Delete);
