import { nameof } from 'ts-simple-nameof';
import { IEntity, IPopulatedTruckLoading, ITruckLoading } from '../interfaces';
import { RemoveObjectProperty } from '../utils/shared';
import api from './baseApi';

const apiName = 'truckloadings';
const filterTruckLoadingByRouteId = 'FilterByRouteId';

const FetchTruckLoadings = async (): Promise<ITruckLoading[]> => {
  const result = await api().get(apiName);
  return result.data;
};
const FetchTruckLoadingById = async (id: string): Promise<ITruckLoading> => {
  const result = await api().get(`${apiName}/${id}`);
  return result.data;
};
const CreateTruckLoading = async (truckLoading: ITruckLoading): Promise<ITruckLoading> => {
  //remove object key for creat action
  const idlessEntity = RemoveObjectProperty(truckLoading);
  const result = await api().post(`${apiName}`, idlessEntity);
  return result.data;
};
const UpdateTruckLoading = async (truckLoading: ITruckLoading): Promise<ITruckLoading> => {
  const result = await api().put(`${apiName}`, truckLoading);
  return result.data;
};
const DeleteTruckLoading = async (id: string): Promise<string> => {
  const result = await api().delete(`${apiName}/${id}`);
  return result.data;
};

const FilterTruckLoadingByRouteId = async (id: string): Promise<IPopulatedTruckLoading[]> => {
  const result = await api().put(`${apiName}/${filterTruckLoadingByRouteId}`, { routeId: id });
  return result.data;
};

export const TruckLoadingApi = {
  FetchTruckLoadings,
  FetchTruckLoadingById,
  CreateTruckLoading,
  UpdateTruckLoading,
  DeleteTruckLoading,
  FilterTruckLoadingByRouteId,
};
