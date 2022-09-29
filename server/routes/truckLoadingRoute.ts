import { Router } from 'express';
import { ITruckLoadingController } from '../interfaces';

export const truckLoadingRouter = (controller: ITruckLoadingController) =>
  Router()
    .get('/truckLoadings', controller.GetAll)

    .get('/truckLoadings/:id', controller.GetById)

    .post('/truckLoadings', controller.Create)

    .put('/truckLoadings', controller.Update)

    .delete('/truckLoadings/:id', controller.Delete)
    
    .put('/truckLoadings/FilterByRouteId', controller.FilterByRouteId);
