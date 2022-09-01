import { Types } from "mongoose"
import { IEntity } from "."

export interface IOrder extends IEntity {
    orderName:string
    cargos:[Types.ObjectId]
}