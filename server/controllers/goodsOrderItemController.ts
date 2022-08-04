import { Request, Response, NextFunction } from 'express';
import { Repository } from 'sequelize-typescript';

import { GoodsOrderItem } from '../models';
import { IGoodsOrderItemController } from '../interfaces';

export class GoodsOrderItemController implements IGoodsOrderItemController {
  private readonly goodsOrderItemRepository: Repository<GoodsOrderItem>;

  constructor(repo: Repository<GoodsOrderItem>) {
    this.goodsOrderItemRepository = repo;
  }

  public GetAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const goodsOrderItems = await this.goodsOrderItemRepository.findAll();

      return res.status(200).json(goodsOrderItems);
    } catch (error) {
      next(error);
    }
  };

  public GetById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { orderitemid, goodsid } = req.params;

      const goodsOrderItem = await this.goodsOrderItemRepository.findOne({
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
      const newGoodsOrderItem = await this.goodsOrderItemRepository.create(req.body);
      if (!newGoodsOrderItem) return res.status(500).json('could not create goods order item');

      return res.status(201).json(newGoodsOrderItem);
    } catch (error) {
      next(error);
    }
  };

  public Update = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { orderitemid, goodsid } = req.body;
      await this.goodsOrderItemRepository.update({ ...req.body }, { where: { orderitemid, goodsid } });

      const updateGoodsOrderItem = await this.goodsOrderItemRepository.findOne({
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

      const goodsOrderItem = await this.goodsOrderItemRepository.findOne({
        where: { orderitemid, goodsid },
      });
      if (!goodsOrderItem) return res.status(404).json(-1);

      await goodsOrderItem?.destroy();
      const reloadGoodsOrderItem = await this.goodsOrderItemRepository.findOne({
        where: { orderitemid, goodsid },
      });

      if (reloadGoodsOrderItem) return res.status(500).json(-1);

      return res.status(200).json([orderitemid, goodsid]);
    } catch (error) {
      next(error);
    }
  };
}
