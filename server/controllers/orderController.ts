import { Request, Response, NextFunction } from 'express';
import { Model } from 'mongoose';
import { Repository, Sequelize } from 'sequelize-typescript';

import { IOrder, IOrderController } from '../interfaces';
import { CargoSeq, OrderSeq } from '../models';

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
      const order = await this.orderRepository.findById(req.params.id);
      if (!order) return res.status(404).json('id not found');

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
      const { id } = req.body;
      await this.orderRepository.update({ ...req.body }, { where: { id } });

      const updatedOrder = await this.orderRepository.findOneAndUpdate({ _id: id }, { $set: { ...req.body } });
      if (!updatedOrder) return res.status(404).json('id not found');

      res.status(200).json(req.body);
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
