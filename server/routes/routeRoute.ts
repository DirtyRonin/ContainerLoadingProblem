import { Router } from 'express';
import { IRouteController } from '../interfaces';

export const routeRouter = (controller: IRouteController) =>
  Router()
    .get('/routes', controller.GetAll)

    .get('/routes/:id', controller.GetById)

    .post('/routes', controller.Create)

    .put('/routes', controller.Update)

    .delete('/routes/:id', controller.Delete)

    .put('/routes/filterRoutesByIds', controller.FilterByIds)

    .get('/routes/GetTruckLoadingsByRouteId/:id', controller.GetTruckLoadingsByRouteId)

    // .put('/routes/AddTruckLoadingsByIds', controller.AddTruckLoadingsByIds)

    // .put('/routes/RemoveTruckLoadingsByIds', controller.RemoveTruckLoadingsByIds);
