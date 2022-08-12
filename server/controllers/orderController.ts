import { Request, Response, NextFunction } from "express";
import { Repository, Sequelize } from "sequelize-typescript";

import { IOrderController } from "../interfaces";
import { Cargo, Order } from "../models";

export class OrderController implements IOrderController {
  
  constructor(
    private readonly orderRepository: Repository<Order>,
    private readonly sequelize: Sequelize,

  ) {
    // this.orderRepository = repo;
    // private readonly sequelize: Sequelize;
  }

  public GetAll = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const orders = await this.orderRepository.findAll({include:[this.sequelize.models['Cargo']]});

      return res.status(200).json(orders);
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
      const order = await this.orderRepository.findByPk(req.params.id);
      if (!order) return res.status(404).json("id not found");

      return res.status(200).json(order);
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
      const newOrder = await this.orderRepository.create(req.body);
      if (!newOrder) return res.status(500).json("could not create order");

      return res.status(201).json(newOrder);
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
      await this.orderRepository.update({ ...req.body }, { where: { id } });

      const updatedOrder = await this.orderRepository.findByPk(id);
      if (!updatedOrder) return res.status(404).json("id not found");

      res.status(200).json(updatedOrder);
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

      const order = await this.orderRepository.findByPk(id);
      if (!order) return res.status(404).json(-1);

      await order?.destroy();
      const reloadOrder = await this.orderRepository.findByPk(id);

      if (reloadOrder) return res.status(500).json(-1);

      return res.status(200).json(id);
    } catch (error) {
      next(error);
    }
  };
}
