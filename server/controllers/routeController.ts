import { Request, Response, NextFunction } from 'express';

import { ICargo, IRouteController } from '../interfaces';
import { Model, ObjectId } from 'mongoose';
import { IRoute } from '../interfaces/IRoute';
import { nameof } from 'ts-simple-nameof';
import { ITruckLoading } from '../interfaces/ITruckLoading';
import { ROUTE_TRUCKLOADINGS_CONST, TRUCKLOADING_CARGOID_CONST, TRUCKLOADING_ROUTEID_CONST, TRUCKLOADING_TRUCKID_CONST } from '../config/consts';

export class RouteController implements IRouteController {
  constructor(
    private readonly routeRepository: Model<IRoute, {}, {}, {}, any>,
    private readonly truckLoadingRepository: Model<ITruckLoading, {}, {}, {}, any>
  ) {}

  public GetAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const routes = await this.routeRepository.find().populate(ROUTE_TRUCKLOADINGS_CONST);

      return res.status(200).json(routes);
    } catch (error) {
      next(error);
    }
  };

  public GetById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const route = await this.routeRepository.findById(id).populate(ROUTE_TRUCKLOADINGS_CONST);
      if (!route) return res.status(404).json('id not found');

      return res.status(200).json(route);
    } catch (error) {
      next(error);
    }
  };

  public Create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const newRoute = await this.routeRepository.create(req.body);
      if (!newRoute) return res.status(500).json('could not create route');

      return res.status(201).json(newRoute);
    } catch (error) {
      next(error);
    }
  };

  public Update = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { _id } = req.body;
      const route = await this.routeRepository.findById(_id);
      if (!route) return res.status(404).json('_id not found');

      route.to = req.body[nameof<IRoute>((x) => x.to)];
      route.from = req.body[nameof<IRoute>((x) => x.from)];
      const result = await route.save();

      if (!result) return res.status(404).json('failed updating');

      res.status(200).json(route);
    } catch (error) {
      next(error);
    }
  };

  public GetTruckLoadingsByRouteId = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const route = await this.routeRepository.findById(id).populate({
        path: ROUTE_TRUCKLOADINGS_CONST,
        populate: [{ path: TRUCKLOADING_CARGOID_CONST }, { path: TRUCKLOADING_TRUCKID_CONST }, { path: TRUCKLOADING_ROUTEID_CONST }],
      });

      if (!route) return res.status(404).json('_id not found');

      res.status(200).json(route.truckLoadings);
    } catch (error) {
      next(error);
    }
  };

  public Delete = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;

      const result = await this.routeRepository.deleteOne({ _id: id });
      if (result.deletedCount === 0) return res.status(404).json(-1);

      await this.truckLoadingRepository.deleteMany({ routeId: id });

      return res.status(200).json(id);
    } catch (error) {
      next(error);
    }
  };

  public FilterByIds = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const ids: number[] = req.body.ids;
      const routes = await this.routeRepository.find({ _id: { $in: ids } });

      return res.status(200).json(routes);
    } catch (error) {
      next(error);
    }
  };
}
