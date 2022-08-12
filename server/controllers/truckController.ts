import { Request, Response, NextFunction } from "express";
import { Repository, Sequelize } from "sequelize-typescript";

import { Truck } from "../models/truck";
import { ITruckController } from "../interfaces";

export class TruckController implements ITruckController {
  ;

  constructor(private readonly truckRepository: Repository<Truck>,private readonly sequelize: Sequelize,) {  }

  public GetAll = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const trucks = await this.truckRepository.findAll({include:this.sequelize.models['TruckLoading']});

      return res.status(200).json(trucks);
    } catch (error) {
      next(error);
    }
  };

  public GetById = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const truck = await this.truckRepository.findByPk(req.params.id);
      if (!truck) return res.status(404).json("id not found");

      return res.status(200).json(truck);
    } catch (error) {
      next(error);
    }
  };

  public Create = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const newTruck = await this.truckRepository.create(req.body);
      if (!newTruck) return res.status(500).json("could not create truck");

      return res.status(201).json(newTruck);
    } catch (error) {
      next(error);
    }
  };

  public Update = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { id } = req.body;
      await this.truckRepository.update({ ...req.body }, { where: { id } });

      const updatedTruck = await this.truckRepository.findByPk(id);
      if (!updatedTruck) return res.status(404).json("id not found");

      res.status(200).json(updatedTruck);
    } catch (error) {
      next(error);
    }
  };

  public Delete = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { id } = req.params;

      const truck = await this.truckRepository.findByPk(id);
      if (!truck) return res.status(404).json(-1);

      await truck?.destroy();
      const reloadTruck = await this.truckRepository.findByPk(id);

      if (reloadTruck) return res.status(500).json(-1);

      return res.status(200).json(id);
    } catch (error) {
      next(error);
    }
  };
}
