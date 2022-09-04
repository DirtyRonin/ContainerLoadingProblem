import { Request, Response, NextFunction } from 'express';

import { IController } from './IController';

export interface ICargoController extends IController {
  FilterIdsByOrderIds: (req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>> | undefined>;
  FilterByOrderIds: (req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>> | undefined>;
}
