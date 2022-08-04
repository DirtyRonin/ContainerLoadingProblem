import { Request, Response, NextFunction } from "express";
import { Repository } from "sequelize-typescript";

import { Goods } from "../models/goods";
import { IGoodsController } from "../interfaces";

export class GoodsController implements IGoodsController {
  private readonly goodsRepository: Repository<Goods>;

  constructor(repo: Repository<Goods>) {
    this.goodsRepository = repo;
  }

  public GetAll = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const goodss = await this.goodsRepository.findAll();

      return res.status(200).json(goodss);
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
      const goods = await this.goodsRepository.findByPk(req.params.id);
      if (!goods) return res.status(404).json("id not found");

      return res.status(200).json(goods);
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
      const newGoods = await this.goodsRepository.create(req.body);
      if (!newGoods) return res.status(500).json("could not create goods");

      return res.status(201).json(newGoods);
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
      await this.goodsRepository.update({ ...req.body }, { where: { id } });

      const updatedGoods = await this.goodsRepository.findByPk(id);
      if (!updatedGoods) return res.status(404).json("id not found");

      res.status(200).json(updatedGoods);
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

      const goods = await this.goodsRepository.findByPk(id);
      if (!goods) return res.status(404).json(-1);

      await goods?.destroy();
      const reloadGoods = await this.goodsRepository.findByPk(id);

      if (reloadGoods) return res.status(500).json(-1);

      return res.status(200).json(id);
    } catch (error) {
      next(error);
    }
  };
}
