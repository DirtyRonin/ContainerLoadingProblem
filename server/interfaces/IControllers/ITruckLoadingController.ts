import { Request, Response, NextFunction } from 'express';

import { IController } from './IController';
export interface ITruckLoadingController extends IController {
    FilterByRouteId: (req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>> | undefined>;
}
