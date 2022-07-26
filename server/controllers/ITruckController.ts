import { Request, Response, NextFunction } from "express";


export interface ITruckController {
    GetTrucks: (
        req: Request,
        res: Response,
        next: NextFunction
    ) => Promise<Response<any, Record<string, any>> | undefined>;
    GetTruckById: (
        req: Request,
        res: Response,
        next: NextFunction
    ) => Promise<Response<any, Record<string, any>> | undefined>;
    CreateTruck: (
        req: Request,
        res: Response,
        next: NextFunction
    ) => Promise<Response<any, Record<string, any>> | undefined>;
    UpdateTruck: (
        req: Request,
        res: Response,
        next: NextFunction
    ) => Promise<Response<any, Record<string, any>> | undefined>;
    DeleteTruck: (
        req: Request,
        res: Response,
        next: NextFunction
    ) => Promise<Response<any, Record<string, any>> | undefined>;
}
