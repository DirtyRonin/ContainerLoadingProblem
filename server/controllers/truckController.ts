import { Request, Response, NextFunction } from 'express';

import { ITruckController, ITruckLoading } from '../interfaces';
import { Model } from 'mongoose';
import { ITruck } from '../interfaces/ITruck';

export class TruckController implements ITruckController {
  constructor(
    private readonly truckRepository: Model<ITruck, {}, {}, {}, any>,
    private readonly truckLoadingRepository: Model<ITruckLoading, {}, {}, {}, any>
  ) {}

  public GetAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const trucks = await this.truckRepository.find();

      return res.status(200).json(trucks);
    } catch (error) {
      next(error);
    }
  };

  public GetById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const truck = await this.truckRepository.findById(id);
      if (!truck) return res.status(404).json('id not found');

      return res.status(200).json(truck);
    } catch (error) {
      next(error);
    }
  };

  public Create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const newTruck = await this.truckRepository.create(req.body);
      if (!newTruck) return res.status(500).json('could not create truck');

      return res.status(201).json(newTruck);
    } catch (error) {
      next(error);
    }
  };

  public Update = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { _id } = req.body;
      const updatedTruck = await this.truckRepository.findOneAndUpdate({ _id: _id }, { $set: { ...req.body } });
      if (!updatedTruck) return res.status(404).json('_id not found');

      res.status(200).json(req.body);
    } catch (error) {
      next(error);
    }
  };

  public Delete = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;

      const result = await this.truckRepository.deleteOne({ _id: id });
      if (result.deletedCount === 0) return res.status(404).json(-1);

      await this.truckLoadingRepository.deleteMany({ truckId: id });

      return res.status(200).json(id);
    } catch (error) {
      next(error);
    }
  };

  public FilterByIds = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const ids: number[] = req.body.ids;
      const trucks = await this.truckRepository.find({ _id: { $in: ids } });

      return res.status(200).json(trucks);
    } catch (error) {
      next(error);
    }
  };
}
