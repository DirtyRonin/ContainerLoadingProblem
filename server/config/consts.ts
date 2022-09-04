import { nameof } from 'ts-simple-nameof';
import { ICargo, IEntity, IOrder, IRoute, ITruckLoading } from '../interfaces';

export const ID_CONST: string = nameof<IEntity>((x) => x._id);

export const CARGO_CONST: string = 'Cargo';
export const CARGO_ORDERID_CONST: string = nameof<ICargo>((x) => x.orderId);

export const TRUCK_CONST: string = 'Truck';

export const ORDER_CONST: string = 'Order';
export const ORDER_CARGOS_CONST: string = nameof<IOrder>((x) => x.cargos);

export const ROUTE_CONST: string = 'Route';
export const ROUTE_TRUCKLOADINGS_CONST: string = nameof<IRoute>((x) => x.truckLoadings);

export const TRUCKLOADING_CONST: string = 'TruckLoading';
export const TRUCKLOADING_ROUTEID_CONST: string = nameof<ITruckLoading>((x) => x.routeId);
export const TRUCKLOADING_CARGOID_CONST: string = nameof<ITruckLoading>((x) => x.cargoId);
export const TRUCKLOADING_TRUCKID_CONST: string = nameof<ITruckLoading>((x) => x.truckId);
