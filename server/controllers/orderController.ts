import { Request, Response, NextFunction } from 'express';
import { Model } from 'mongoose';
import { nameof } from 'ts-simple-nameof';

import { IOrder, IOrderController } from '../interfaces';

export class OrderController implements IOrderController {
  constructor(private readonly orderRepository: Model<IOrder, {}, {}, {}, any>) {}

  public GetAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const orders = await this.orderRepository.find();

      return res.status(200).json(orders);
    } catch (error) {
      next(error);
    }
  };

  public GetById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const order = await this.orderRepository.findById(id).populate(nameof<IOrder>((x) => x.cargos));
      if (!order) return res.status(404).json('_id not found');

      return res.status(200).json(order);
    } catch (error) {
      next(error);
    }
  };

  public Create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const newOrder = await this.orderRepository.create(req.body);
      if (!newOrder) return res.status(500).json('could not create order');

      return res.status(201).json(newOrder);
    } catch (error) {
      next(error);
    }
  };

  public Update = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { _id } = req.body;
      const order = await this.orderRepository.findById( _id )
      if (!order) return res.status(404).json('_id not found');

      order.orderName = req.body[nameof<IOrder>(x => x.orderName)]
      const result = await order.save()
      
      if (!result) return res.status(404).json('failed updating');

      res.status(200).json(order);
    } catch (error) {
      next(error);
    }
  };

  public Delete = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;

      const result = await this.orderRepository.deleteOne({ _id: id });
      if (result.deletedCount === 0) return res.status(404).json(-1);

      return res.status(200).json(id);
    } catch (error) {
      next(error);
    }
  };
}
