import { nameof } from 'ts-simple-nameof';
import { IEntity, IRoute } from '../interfaces';
import { RemoveObjectProperty } from '../utils/shared';
import api from './baseApi';

const apiName = 'routes';
const filterRoutesByIds = 'filterRoutesByIds';

const FetchRoutes = async (): Promise<IRoute[]> => {
  const result = await api().get(apiName);
  return result.data;
};
const FetchRouteById = async (id: string): Promise<IRoute> => {
  const result = await api().get(`${apiName}/${id}`);
  return result.data;
};
const CreateRoute = async (route: IRoute): Promise<IRoute> => {
  //remove object key for creat action
  const idlessEntity = RemoveObjectProperty(route);
  const result = await api().post(`${apiName}`, idlessEntity);
  return result.data;
};
const UpdateRoute = async (route: IRoute): Promise<IRoute> => {
  const result = await api().put(`${apiName}`, route);
  return result.data;
};
const DeleteRoute = async (id: string): Promise<string> => {
  const result = await api().delete(`${apiName}/${id}`);
  return result.data;
};
const FilterRouteByIds = async (ids: string[]): Promise<IRoute[]> => {
  const result = await api().put(`${apiName}/${filterRoutesByIds}`, { ids });
  return result.data;
};

export const RouteApi = {
  FetchRoutes,
  FetchRouteById,
  CreateRoute,
  UpdateRoute,
  DeleteRoute,
  FilterRouteByIds,
};
