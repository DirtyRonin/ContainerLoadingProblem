import { Request, Response, NextFunction } from "express";


export interface IController {
    GetAll: (
        req: Request,
        res: Response,
        next: NextFunction
    ) => Promise<Response<any, Record<string, any>> | undefined>;
    GetById: (
        req: Request,
        res: Response,
        next: NextFunction
    ) => Promise<Response<any, Record<string, any>> | undefined>;
    Create: (
        req: Request,
        res: Response,
        next: NextFunction
    ) => Promise<Response<any, Record<string, any>> | undefined>;
    Update: (
        req: Request,
        res: Response,
        next: NextFunction
    ) => Promise<Response<any, Record<string, any>> | undefined>;
    Delete: (
        req: Request,
        res: Response,
        next: NextFunction
    ) => Promise<Response<any, Record<string, any>> | undefined>;
}
