import { Request, Response, NextFunction } from "express";


export interface IGoodsController {
    GetGoodss: (
        req: Request,
        res: Response,
        next: NextFunction
    ) => Promise<Response<any, Record<string, any>> | undefined>;
    GetGoodsById: (
        req: Request,
        res: Response,
        next: NextFunction
    ) => Promise<Response<any, Record<string, any>> | undefined>;
    CreateGoods: (
        req: Request,
        res: Response,
        next: NextFunction
    ) => Promise<Response<any, Record<string, any>> | undefined>;
    UpdateGoods: (
        req: Request,
        res: Response,
        next: NextFunction
    ) => Promise<Response<any, Record<string, any>> | undefined>;
    DeleteGoods: (
        req: Request,
        res: Response,
        next: NextFunction
    ) => Promise<Response<any, Record<string, any>> | undefined>;
}
