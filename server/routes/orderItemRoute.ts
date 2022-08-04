import { Router } from "express";
import { IOrderItemController } from "../interfaces";

export const orderItemRouter = (controller: IOrderItemController) =>
  Router()
    .get("/orderItems", controller.GetAll)

    .get("/orderItems/:id", controller.GetById)

    .post("/orderItems", controller.Create)

    .put("/orderItems", controller.Update)

    .delete("/orderItems/:id", controller.Delete);
