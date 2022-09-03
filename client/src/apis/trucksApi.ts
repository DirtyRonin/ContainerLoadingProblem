import { nameof } from 'ts-simple-nameof';
import { IEntity, ITruck } from '../interfaces';
import { RemoveObjectProperty } from '../utils/shared';
import api from './baseApi';

const apiName = 'trucks';
const filterTrucksByIds = 'filterTrucksByIds';

const FetchTrucks = async (): Promise<ITruck[]> => {
  const result = await api().get(apiName);
  return result.data;
};
const FetchTruckById = async (id: string): Promise<ITruck> => {
  const result = await api().get(`${apiName}/${id}`);
  return result.data;
};
const CreateTruck = async (truck: ITruck): Promise<ITruck> => {
  //remove object key for creat action
  const idlessEntity = RemoveObjectProperty(truck);
  const result = await api().post(`${apiName}`, idlessEntity);
  return result.data;
};
const UpdateTruck = async (truck: ITruck): Promise<ITruck> => {
  const result = await api().put(`${apiName}`, truck);
  return result.data;
};
const DeleteTruck = async (id: string): Promise<string> => {
  const result = await api().delete(`${apiName}/${id}`);
  return result.data;
};
const FilterTruckByIds = async (ids: string[]): Promise<ITruck[]> => {
  const result = await api().put(`${apiName}/${filterTrucksByIds}`, { ids });
  return result.data;
};

export const TruckApi = {
  FetchTrucks,
  FetchTruckById,
  CreateTruck,
  UpdateTruck,
  DeleteTruck,
  FilterTruckByIds,
};
