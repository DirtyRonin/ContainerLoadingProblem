import { Request, Response, NextFunction } from "express";
import { Repository } from "sequelize-typescript";

import { Cargo } from "../models/cargo";
import { ICargoController } from "../interfaces";

export class CargoController implements ICargoController {
  private readonly cargoRepository: Repository<Cargo>;

  constructor(repo: Repository<Cargo>) {
    this.cargoRepository = repo;
  }

  public GetAll = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const cargos = await this.cargoRepository.findAll();

      return res.status(200).json(cargos);
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
      const cargo = await this.cargoRepository.findByPk(req.params.id);
      if (!cargo) return res.status(404).json("id not found");

      return res.status(200).json(cargo);
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
      const newCargo = await this.cargoRepository.create(req.body);
      if (!newCargo) return res.status(500).json("could not create cargo");

      return res.status(201).json(newCargo);
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
      await this.cargoRepository.update({ ...req.body }, { where: { id } });

      const updatedCargo = await this.cargoRepository.findByPk(id);
      if (!updatedCargo) return res.status(404).json("id not found");

      res.status(200).json(updatedCargo);
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

      const cargo = await this.cargoRepository.findByPk(id);
      if (!cargo) return res.status(404).json(-1);

      await cargo?.destroy();
      const reloadCargo = await this.cargoRepository.findByPk(id);

      if (reloadCargo) return res.status(500).json(-1);

      return res.status(200).json(id);
    } catch (error) {
      next(error);
    }
  };
}
