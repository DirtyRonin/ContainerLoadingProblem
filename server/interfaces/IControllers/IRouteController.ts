import { Request, Response, NextFunction } from 'express';
import { IController } from './IController';

export interface IRouteController extends IController {
  GetTruckLoadingsByRouteId: (req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>> | undefined>;
  // AddTruckLoadingsByIds: (req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>> | undefined>;
  // RemoveTruckLoadingsByIds: (req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>> | undefined>;
  FilterByIds: (req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>> | undefined>;
}
