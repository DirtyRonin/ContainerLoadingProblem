import { Request, Response, NextFunction } from "express";

import { IController } from "./IController";

export interface ICargoController extends IController{
    GetAllByOrderId: (
        req: Request,
        res: Response,
        next: NextFunction
    ) => Promise<Response<any, Record<string, any>> | undefined>;
}