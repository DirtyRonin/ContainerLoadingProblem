import { Request, Response, NextFunction } from 'express';
import { Repository } from 'sequelize-typescript';

import { GoodsOrder } from '../models';
import { IGoodsOrderController } from '../interfaces';

export class GoodsOrderController implements IGoodsOrderController {
  private readonly goodsOrderRepository: Repository<GoodsOrder>;

  constructor(repo: Repository<GoodsOrder>) {
    this.goodsOrderRepository = repo;
  }

  public GetAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const goodsOrderItems = await this.goodsOrderRepository.findAll();

      return res.status(200).json(goodsOrderItems);
    } catch (error) {
      next(error);
    }
  };

  public GetById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { orderitemid, goodsid } = req.params;

      const goodsOrderItem = await this.goodsOrderRepository.findOne({
        where: { orderitemid, goodsid },
      });
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

      return res.status(201).json(newGoodsOrderItem);
    } catch (error) {
      next(error);
    }
  };

  public Update = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { orderitemid, goodsid } = req.body;
      await this.goodsOrderRepository.update({ ...req.body }, { where: { orderitemid, goodsid } });

      const updateGoodsOrderItem = await this.goodsOrderRepository.findOne({
        where: { orderitemid, goodsid },
      });
      if (!updateGoodsOrderItem) return res.status(404).json('id not found');

      res.status(200).json(updateGoodsOrderItem);
    } catch (error) {
      next(error);
    }
  };

  public Delete = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { orderitemid, goodsid } = req.params;

      const goodsOrderItem = await this.goodsOrderRepository.findOne({
        where: { orderitemid, goodsid },
      });
      if (!goodsOrderItem) return res.status(404).json(-1);

      await goodsOrderItem?.destroy();
      const reloadGoodsOrderItem = await this.goodsOrderRepository.findOne({
        where: { orderitemid, goodsid },
      });

      if (reloadGoodsOrderItem) return res.status(500).json(-1);

      return res.status(200).json([orderitemid, goodsid]);
    } catch (error) {
      next(error);
    }
  };
}
