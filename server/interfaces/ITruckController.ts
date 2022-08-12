import { Request, Response, NextFunction } from 'express';
import { IController } from './IController';

export interface ITruckController extends IController {
  FilterByIds: (req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>> | undefined>;
}
