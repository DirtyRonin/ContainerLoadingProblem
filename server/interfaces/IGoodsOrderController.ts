import { Request, Response, NextFunction } from "express";
import { IController } from "./IController";

export interface IGoodsOrderController extends IController{
    FilteredByOrderId:(
        req: Request,
        res: Response,
        next: NextFunction
    ) => Promise<Response<any, Record<string, any>> | undefined>;
}