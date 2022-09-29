import { Request, Response, NextFunction } from 'express';
import { Model, Types } from 'mongoose';
import { FIELDS_TRUCKLOADING_CONST } from '../config/consts';

import { ICargo, ICargoController, IOrder, ITruckLoading } from '../interfaces';
export class CargoController implements ICargoController {
  constructor(
    private readonly cargoRepository: Model<ICargo, {}, {}, {}, any>,
    private readonly orderRepository: Model<IOrder, {}, {}, {}, any>,
    private readonly truckLoadingRepository: Model<ITruckLoading, {}, {}, {}, any>
  ) {}

  public GetAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const cargos = await this.cargoRepository.find();

      return res.status(200).json(cargos);
    } catch (error) {
      next(error);
    }
  };

  public FilterByOrderIds = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const orderIds: string[] = req.body.orderIds;
      const cargos = await this.cargoRepository.find({ orderId: { $in: orderIds } }).populate(FIELDS_TRUCKLOADING_CONST);

      if (!cargos) return res.status(404).json('_ids not found');
      return res.status(200).json(cargos);
    } catch (error) {
      next(error);
    }
  };

  public FilterIdsByOrderIds = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const orderIds: string[] = req.body.orderIds;
      const cargoIds = await this.cargoRepository.find({ orderId: { $in: orderIds } }).select('_id orderId');

      if (!cargoIds) return res.status(404).json('_ids not found');
      return res.status(200).json(cargoIds.map((x) => ({ cargoId: x._id, orderId: x.orderId })));
    } catch (error) {
      next(error);
    }
  };

  public GetById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const cargo = await this.cargoRepository.findById(id).populate(FIELDS_TRUCKLOADING_CONST);
      if (!cargo) return res.status(404).json('_id not found');

      return res.status(200).json(cargo);
    } catch (error) {
      next(error);
    }
  };

  public Create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const newCargo = await this.cargoRepository.create(req.body);
      if (!newCargo) return res.status(500).json('could not create cargo');

      return res.status(201).json(newCargo);
    } catch (error) {
      next(error);
    }
  };

  public Update = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { _id } = req.body;
      const cargo = await this.cargoRepository.findOneAndUpdate({ _id: _id }, { $set: { ...req.body } });
      if (!cargo) return res.status(404).json('_id not found');

      res.status(200).json(req.body);
    } catch (error) {
      next(error);
    }
  };

  public Delete = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;

      const result = await this.cargoRepository.deleteOne({ _id: id });
      if (result.deletedCount === 0) return res.status(404).json(-1);

      await this.truckLoadingRepository.deleteMany({ cargoId: id });

      return res.status(200).json(id);
    } catch (error) {
      next(error);
    }
  };
}
