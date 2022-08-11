// import { Request, Response, NextFunction } from 'express';
// import { Repository } from 'sequelize-typescript';

// import { GoodsOrderTruck } from '../models';
// import { IGoodsOrderTruckController } from '../interfaces';
// import { FindOptions } from 'sequelize/types';

// export class GoodsOrderTruckController implements IGoodsOrderTruckController {
//   private readonly options: FindOptions<any> = { };

//   constructor(private readonly goodsOrderTruckRepository: Repository<GoodsOrderTruck>) {}

//   public GetAll = async (req: Request, res: Response, next: NextFunction) => {
//     try {
//       const goodsOrderTruckItems = await this.goodsOrderTruckRepository.findAll(this.options);

//       return res.status(200).json(goodsOrderTruckItems);
//     } catch (error) {
//       next(error);
//     }
//   };

//   public GetById = async (req: Request, res: Response, next: NextFunction) => {
//     try {
//       const { id } = req.params;

//       const goodsOrderTruckItem = await this.goodsOrderTruckRepository.findByPk(id, this.options);
//       if (!goodsOrderTruckItem) return res.status(404).json('id not found');

//       return res.status(200).json(goodsOrderTruckItem);
//     } catch (error) {
//       next(error);
//     }
//   };

//   public Create = async (req: Request, res: Response, next: NextFunction) => {
//     try {
//       const newGoodsOrderTruckItem = await this.goodsOrderTruckRepository.create(req.body);
//       if (!newGoodsOrderTruckItem) return res.status(500).json('could not create goods order item');
//       const newItem = await this.goodsOrderTruckRepository.findByPk(newGoodsOrderTruckItem?.id, this.options);

//       return res.status(201).json(newItem);
//     } catch (error) {
//       next(error);
//     }
//   };

//   public Update = async (req: Request, res: Response, next: NextFunction) => {
//     try {
//       const { id } = req.body;
//       await this.goodsOrderTruckRepository.update({ ...req.body }, { where: { id } });

//       const updateGoodsOrderTruckItem = await this.goodsOrderTruckRepository.findByPk(id, this.options);
//       if (!updateGoodsOrderTruckItem) return res.status(404).json('id not found');

//       res.status(200).json(updateGoodsOrderTruckItem);
//     } catch (error) {
//       next(error);
//     }
//   };

//   public Delete = async (req: Request, res: Response, next: NextFunction) => {
//     try {
//       const { id } = req.params;

//       const goodsOrderTruckItem = await this.goodsOrderTruckRepository.findByPk(id);
//       if (!goodsOrderTruckItem) return res.status(404).json(-1);

//       await goodsOrderTruckItem?.destroy();
//       const reloadGoodsOrderTruckItem = await this.goodsOrderTruckRepository.findByPk(id);

//       if (reloadGoodsOrderTruckItem) return res.status(500).json(-1);

//       return res.status(200).json(id);
//     } catch (error) {
//       next(error);
//     }
//   };
// }
