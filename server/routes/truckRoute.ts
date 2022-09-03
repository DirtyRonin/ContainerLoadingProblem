import { Router } from "express";
import { ITruckController } from "../interfaces";

export const truckRouter = (controller: ITruckController) =>
  Router()
    .get("/trucks", controller.GetAll)

    .get("/trucks/:id", controller.GetById)

    .post("/trucks", controller.Create)

    .put("/trucks", controller.Update)

    .delete("/trucks/:id", controller.Delete)

    .put("/trucks/filterTrucksByIds", controller.FilterByIds)
