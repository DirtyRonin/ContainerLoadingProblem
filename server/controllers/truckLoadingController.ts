import { Request, Response, NextFunction } from 'express';

import { ITruckLoadingController } from '../interfaces';
import { Model } from 'mongoose';
import { ITruckLoading } from '../interfaces/ITruckLoading';

export class TruckLoadingController implements ITruckLoadingController {
  constructor(private readonly truckLoadingRepository: Model<ITruckLoading, {}, {}, {}, any>) {}

  public GetAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const truckLoadings = await this.truckLoadingRepository.find();

      return res.status(200).json(truckLoadings);
    } catch (error) {
      next(error);
    }
  };

  public GetById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const truckLoading = await this.truckLoadingRepository.findById(id);
      if (!truckLoading) return res.status(404).json('id not found');

      return res.status(200).json(truckLoading);
    } catch (error) {
      next(error);
    }
  };

  public Update = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { _id } = req.body;
      const updatedTruckLoading = await this.truckLoadingRepository.findOneAndUpdate({ _id: _id }, { $set: { ...req.body } });
      if (!updatedTruckLoading) return res.status(404).json('_id not found');

      res.status(200).json(req.body);
    } catch (error) {
      next(error);
    }
  };
  public Create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const created = await this.truckLoadingRepository.create(req.body);
      if (!created) return res.status(500).json('could not create order');

      return res.status(201).json(created);
    } catch (error) {
      next(error);
    }
  };
  public Delete = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;

      const result = await this.truckLoadingRepository.deleteOne({ _id: id });
      if (result.deletedCount === 0) return res.status(404).json(-1);

      return res.status(200).json(id);
    } catch (error) {
      next(error);
    }
  };
}
