import { Request, Response, NextFunction } from 'express';
import { Repository } from 'sequelize-typescript';

import { GoodsOrder, Goods } from '../models';
import { IGoodsOrderController } from '../interfaces';
import { FindOptions } from 'sequelize/types';

export class GoodsOrderController implements IGoodsOrderController {
  // private readonly goodsOrderRepository: Repository<GoodsOrder>;

  // constructor(repo: Repository<GoodsOrder>) {
  //   this.goodsOrderRepository = repo;
  // }

  private readonly options: FindOptions<any> = { include: [this.goodsRepository] };

  constructor(private readonly goodsOrderRepository: Repository<GoodsOrder>, private readonly goodsRepository: Repository<Goods>) {}

  public GetAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const goodsOrderItems = await this.goodsOrderRepository.findAll(this.options);

      return res.status(200).json(goodsOrderItems);
    } catch (error) {
      next(error);
    }
  };

  public GetById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;

      const goodsOrderItem = await this.goodsOrderRepository.findByPk(id, this.options);
      if (!goodsOrderItem) return res.status(404).json('id not found');

      return res.status(200).json(goodsOrderItem);
    } catch (error) {
      next(error);
    }
  };

  public FilteredByOrderId = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;

      const goodsOrderItem = await this.goodsOrderRepository.findAll({ where:{ orderId : id}, include: [this.goodsRepository] });
      if (!goodsOrderItem) return res.status(404).json('id not found');

      return res.status(200).json(goodsOrderItem);
    } catch (error) {
      next(error);
    }
  };

  public Create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const newGoodsOrderItem = await this.goodsOrderRepository.create(req.body);
      if (!newGoodsOrderItem) return res.status(500).json('could not create goods order item');
      const newItem = await this.goodsOrderRepository.findByPk(newGoodsOrderItem?.id, this.options);

      return res.status(201).json(newItem);
    } catch (error) {
      next(error);
    }
  };

  public Update = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.body;
      await this.goodsOrderRepository.update({ ...req.body }, { where: { id } });

      const updateGoodsOrderItem = await this.goodsOrderRepository.findByPk(id, this.options);
      if (!updateGoodsOrderItem) return res.status(404).json('id not found');

      res.status(200).json(updateGoodsOrderItem);
    } catch (error) {
      next(error);
    }
  };

  public Delete = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;

      const goodsOrderItem = await this.goodsOrderRepository.findByPk(id);
      if (!goodsOrderItem) return res.status(404).json(-1);

      await goodsOrderItem?.destroy();
      const reloadGoodsOrderItem = await this.goodsOrderRepository.findByPk(id);

      if (reloadGoodsOrderItem) return res.status(500).json(-1);

      return res.status(200).json(id);
    } catch (error) {
      next(error);
    }
  };
}
