import { Router } from 'express';
import { ITruckLoadingController } from '../interfaces';

export const truckLoadingRouter = (controller: ITruckLoadingController) =>
  Router()
    .get('/truckLoadings', controller.GetAll)

    .get('/truckLoadings/:id', controller.GetById)

    .put('/truckLoadings', controller.Update);
