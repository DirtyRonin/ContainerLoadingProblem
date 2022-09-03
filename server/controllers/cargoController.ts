import { Request, Response, NextFunction } from 'express';
import { Model, Types } from 'mongoose';
import { nameof } from 'ts-simple-nameof';

import { ICargo, ICargoController, IOrder } from '../interfaces';
export class CargoController implements ICargoController {
  constructor(private readonly cargoRepository: Model<ICargo, {}, {}, {}, any>, private readonly orderRepository: Model<IOrder, {}, {}, {}, any>) {}

  public GetAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const cargos = await this.cargoRepository.find();

      return res.status(200).json(cargos);
    } catch (error) {
      next(error);
    }
  };

  public FilterByOrderId = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { orderId } = req.params;
      const orders = await this.orderRepository.findById({ _id: orderId }).populate(nameof<IOrder>((x) => x.cargos));
      if (!orders) return res.status(404).json('_id not found');
      return res.status(200).json(orders.cargos);
    } catch (error) {
      next(error);
    }
  };

  public FilterByOrderIds = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const orderIds: number[] = req.body.orderIds;
      const orders = await this.orderRepository.find({ _id: { $in: orderIds } }).populate(nameof<IOrder>((x) => x.cargos));
      if (!orders) return res.status(404).json('_ids not found');
      return res.status(200).json(orders.reduce<[Types.ObjectId][]>((prev, current) => prev.concat(current.cargos), []));
    } catch (error) {
      next(error);
    }
  };

  public GetById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const cargo = await this.cargoRepository.findById(id);
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

      return res.status(200).json(id);
    } catch (error) {
      next(error);
    }
  };
}
