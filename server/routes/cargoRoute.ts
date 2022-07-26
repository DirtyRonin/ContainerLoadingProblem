import { Router } from "express";
import { ICargoController } from "../interfaces";

export const cargoRouter = (controller: ICargoController) =>
  Router()
    .get("/cargos", controller.GetAll)

    .get("/cargos/:id", controller.GetById)

    .post("/cargos", controller.Create)

    .put("/cargos", controller.Update)

    .delete("/cargos/:id", controller.Delete)

    .put("/cargos/FilterIdsByOrderIds", controller.FilterIdsByOrderIds)

    .put("/cargos/FilterByOrderIds", controller.FilterByOrderIds)