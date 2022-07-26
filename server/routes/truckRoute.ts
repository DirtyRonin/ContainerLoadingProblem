import { Router } from "express";
import { ITruckController } from "../controllers/ITruckController";

export const truckRouter = (controller: ITruckController) =>
  Router()
    .get("/trucks", controller.GetTrucks)

    .get("/trucks/:id", controller.GetTruckById)

    .post("/trucks", controller.CreateTruck)

    .put("/trucks", controller.UpdateTruck)

    .delete("/trucks/:id", controller.DeleteTruck);
